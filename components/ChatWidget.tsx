'use client'

// Modern Storage® guided chatbot widget.
//
// SAFETY: this is a guided, button-driven flow backed by approved data in
// lib/chatbot.ts. It never generates free-form answers — it routes visitors to
// approved location links / contact info, or shows the fallback line. It cannot
// invent pricing, availability, discounts, policies, or legal statements.

import { useEffect, useRef, useState } from 'react'
import {
  CHAT_LOCATIONS,
  CHAT_FAQS,
  CHATBOT_TEXT,
  byKey,
  matchLocation,
  matchFaq,
  isHoursQuestion,
  isPaymentQuestion,
  isContactQuestion,
  isGoodbye,
  isMessageRequest,
  locationHours,
  normalizePhone,
  type ChatLocation,
  type ChatFaq,
} from '@/lib/chatbot'

type LinkBtn = { label: string; href: string }
type Msg = { role: 'bot' | 'user'; text: string; links?: LinkBtn[] }
type Option = { label: string; value: string }
type View = 'prompt' | 'launcher' | 'chat'
// What a chosen location should do next.
type Purpose = 'decide' | 'explore' | 'page' | 'contact' | 'hours' | 'faq'
type Step =
  | 'name'
  | 'phone'
  | 'menu'
  | 'location'
  | 'decide-size'
  | 'decide-bedrooms'
  | 'tenant-menu'
  | 'message'

const MENU_OPTIONS: Option[] = [
  { label: 'I need help deciding', value: 'decide' },
  { label: 'I would like to explore options myself', value: 'explore' },
  { label: 'I am an existing tenant', value: 'tenant' },
  { label: 'I need to pay my bill', value: 'pay' },
  { label: 'I need a phone number or address', value: 'contact' },
]
const TENANT_OPTIONS: Option[] = [
  { label: 'Make a payment', value: 'payment' },
  { label: 'Contact my location', value: 'contact' },
  { label: 'Access or gate question', value: 'access' },
  { label: 'Move-out question', value: 'moveout' },
  { label: 'Other tenant support', value: 'other' },
]
const SIZE_OPTIONS: Option[] = [
  { label: 'Yes, I know the size', value: 'yes' },
  { label: 'No, I’m not sure', value: 'no' },
  { label: 'I know how many bedrooms or rooms I’m storing', value: 'bedrooms' },
]
const BEDROOM_OPTIONS: Option[] = [
  { label: 'Studio or small amount', value: 'studio' },
  { label: '1 bedroom', value: '1' },
  { label: '2 bedrooms', value: '2' },
  { label: '3 bedrooms', value: '3' },
  { label: '4+ bedrooms', value: '4' },
]
const ALL_LOC: Option[] = CHAT_LOCATIONS.map((l) => ({ label: l.shortName, value: l.key }))
const LR_SUBSET: Option[] = CHAT_LOCATIONS.filter((l) =>
  ['west-little-rock', 'shackleford', 'riverdale', 'north-little-rock'].includes(l.key),
).map((l) => ({ label: l.shortName, value: l.key }))
const NWA_SUBSET: Option[] = CHAT_LOCATIONS.filter((l) =>
  ['bentonville', 'springdale', 'lowell'].includes(l.key),
).map((l) => ({ label: l.shortName, value: l.key }))

// A "Main menu" escape appended to every sub-flow option list so a visitor is
// never stuck inside a follow-up question (e.g. "which location?").
const BACK_OPTION: Option = { label: '← Main menu', value: '__home__' }
const withHome = (opts: Option[]): Option[] => [...opts, BACK_OPTION]
// "Send us a message" — lets a visitor type a note that's emailed to the team.
const MESSAGE_OPTION: Option = { label: '✉ Send us a message', value: '__message__' }

export default function ChatWidget({ faqs: initialFaqs = CHAT_FAQS }: { faqs?: ChatFaq[] }) {
  // Live FAQ list. Seeded with whatever the server rendered with (could be
  // stale by minutes due to Vercel ISR), then refreshed from /api/chat-faqs
  // on mount so admin edits propagate within seconds without a redeploy.
  const [faqs, setFaqs] = useState<ChatFaq[]>(initialFaqs)
  useEffect(() => {
    let aborted = false
    fetch('/api/chat-faqs', { cache: 'no-store' })
      .then((r) => r.json())
      .then((data: { ok?: boolean; faqs?: ChatFaq[] }) => {
        if (aborted) return
        if (data && data.ok && Array.isArray(data.faqs) && data.faqs.length > 0) {
          setFaqs(data.faqs)
        }
      })
      .catch(() => {
        /* Non-fatal — we keep the SSR-rendered initialFaqs. */
      })
    return () => {
      aborted = true
    }
  }, [])

  const [view, setView] = useState<View>('prompt')
  const [step, setStep] = useState<Step>('name')
  const [purpose, setPurpose] = useState<Purpose>('explore')
  const [selectedLoc, setSelectedLoc] = useState<ChatLocation | null>(null)
  const [selectedFaq, setSelectedFaq] = useState<ChatFaq | null>(null)
  const [messages, setMessages] = useState<Msg[]>([])
  const [options, setOptions] = useState<Option[]>([])
  const [input, setInput] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  // After an answer the main menu collapses to a small chip so it doesn't bury
  // the conversation; the visitor expands it on demand.
  const [menuCollapsed, setMenuCollapsed] = useState(false)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const lastUserRef = useRef<HTMLDivElement | null>(null)
  // Mirror of the latest state so the pagehide/close handlers can read it.
  const stateRef = useRef({ name: '', phone: '', messages: [] as Msg[] })
  // Number of messages already emailed to the team, to avoid duplicates.
  const sentLenRef = useRef(0)

  useEffect(() => {
    if (view !== 'chat') return
    const container = scrollRef.current
    if (!container) return
    const el = lastUserRef.current
    if (el) {
      // Pin the visitor's most recent question near the top of the panel so the
      // answer below it stays visible — instead of scrolling all the way down to
      // the menu buttons and pushing the answer out of view.
      const offset = el.getBoundingClientRect().top - container.getBoundingClientRect().top
      container.scrollTop += offset - 8
    } else {
      container.scrollTop = container.scrollHeight
    }
  }, [messages, options, view])

  useEffect(() => {
    stateRef.current = { name, phone, messages }
  }, [name, phone, messages])

  // Email the conversation transcript to the team (info@modernstorage.com via
  // the API route). Fires when the visitor closes the chat or leaves the page.
  // Only sends when there's a real conversation beyond the name + phone prompts,
  // and never sends the same messages twice.
  //
  // `forceFlush` skips the userTurns threshold — used by closeChat() so that an
  // X-button click ALWAYS sends whatever transcript exists. Without this, a
  // visitor who entered name+phone and immediately closed produced only the
  // lead email and the team never saw the bot's automatic greeting or any
  // partial interaction.
  function flushTranscript(useBeacon: boolean, forceFlush = false) {
    const { name: nm, phone: ph, messages: msgs } = stateRef.current
    if (!normalizePhone(ph)) return
    if (msgs.length <= sentLenRef.current) return
    if (!forceFlush) {
      const userTurns = msgs.filter((m) => m.role === 'user').length
      // Threshold lowered from 3 → 2 so any post-phone interaction (button
      // click or typed question) triggers a transcript on the next auto-flush
      // event (pagehide / visibilitychange). closeChat() bypasses this check
      // entirely via forceFlush=true.
      if (userTurns < 2) return
    }
    sentLenRef.current = msgs.length
    const payload = JSON.stringify({
      name: nm,
      phone: ph,
      transcript: msgs.map((m) => ({ role: m.role, text: m.text })),
    })
    if (useBeacon && typeof navigator !== 'undefined' && navigator.sendBeacon) {
      navigator.sendBeacon('/api/chat-lead', new Blob([payload], { type: 'application/json' }))
    } else {
      void fetch('/api/chat-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
      }).catch(() => {})
    }
  }

  // Capture the conversation if the visitor closes the tab or navigates away
  // without clicking the close button.
  useEffect(() => {
    const onHide = () => flushTranscript(true)
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') flushTranscript(true)
    }
    window.addEventListener('pagehide', onHide)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      window.removeEventListener('pagehide', onHide)
      document.removeEventListener('visibilitychange', onVisibility)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function closeChat() {
    // Force-flush — an X-click means the visitor is done, so send whatever
    // transcript exists regardless of the userTurns threshold. Previously a
    // close after just name+phone never produced a transcript email.
    flushTranscript(false, true)
    setView('launcher')
  }

  const bot = (text: string, links?: LinkBtn[]) =>
    setMessages((m) => [...m, { role: 'bot', text, links }])
  const user = (text: string) => setMessages((m) => [...m, { role: 'user', text }])

  function startChat() {
    setMessages([
      { role: 'bot', text: CHATBOT_TEXT.welcome },
      { role: 'bot', text: CHATBOT_TEXT.askName },
    ])
    setOptions([])
    setMenuCollapsed(false)
    setStep('name')
    setSelectedLoc(null)
    setView('chat')
  }

  function enterLocation(p: Purpose, intro: string, opts: Option[] = ALL_LOC) {
    setPurpose(p)
    bot(intro)
    setOptions(withHome(opts))
    setStep('location')
  }

  function backToMenu() {
    bot('Is there anything else I can help with? Type your question, or open the menu.')
    setOptions(MENU_OPTIONS)
    setMenuCollapsed(true)
    setStep('menu')
  }

  // "Main menu" / home — available any time after the name + email step.
  function goHome() {
    setSelectedLoc(null)
    setSelectedFaq(null)
    setPurpose('explore')
    bot('Main menu — how can we help today?')
    setOptions(MENU_OPTIONS)
    setMenuCollapsed(false)
    setStep('menu')
  }

  function startMessage() {
    bot('Sure — type your message below and our team will get back to you by email.')
    setOptions([])
    setMenuCollapsed(false)
    setStep('message')
  }

  function paymentAnswer() {
    bot('You can pay your bill and manage your Modern Storage® account online here:', [
      { label: 'Pay my bill online', href: CHATBOT_TEXT.payOnlineUrl },
    ])
    backToMenu()
  }

  // Try to answer a freely-typed question from the approved Q&A (hours, payment,
  // then keyword/FAQ match). Returns true if it handled the message. Used from
  // every step so a visitor can type a question at any point in the flow.
  //
  // When the message contains BOTH an intent AND a location ("what time does
  // wlr close"), we resolve them together and answer directly without the
  // "Which location?" follow-up. Only when the message has the intent alone
  // do we drop into the location picker.
  function tryAnswerFreeText(value: string): boolean {
    // Polite-ending check FIRST — so a sign-off like "thanks" or "that's
    // all" gets the warm goodbye instead of the generic "I don't have an
    // answer for that one" fallback. We still leave the home menu visible
    // (collapsed) so the visitor can re-engage if they think of something.
    if (isGoodbye(value)) {
      bot(CHATBOT_TEXT.goodbye)
      backToMenu()
      return true
    }
    // "I need a human" / "send a message" shortcuts — auto-open the same
    // free-text message form that the "✉ Send us a message" button opens,
    // instead of routing the visitor through the menu first.
    if (isMessageRequest(value)) {
      startMessage()
      return true
    }
    // Did the visitor name a specific store in the same message? If so we
    // can answer immediately ("what time does wlr close?" → West Little
    // Rock hours) instead of asking them to pick a location.
    const locInMessage = matchLocation(value)
    const namedLocation = locInMessage.type === 'location' ? locInMessage.loc : null

    if (isHoursQuestion(value)) {
      if (namedLocation) {
        hoursAnswer(namedLocation)
        return true
      }
      enterLocation('hours', CHATBOT_TEXT.hoursPrompt)
      return true
    }
    if (isPaymentQuestion(value)) {
      paymentAnswer()
      return true
    }
    // Contact intent — "whats wlr number", "address for shackleford", etc.
    if (isContactQuestion(value)) {
      if (namedLocation) {
        contactAnswer(namedLocation)
        return true
      }
      enterLocation('contact', 'Which store do you need the phone number or address for?')
      return true
    }
    const faq = matchFaq(value, faqs)
    if (faq) {
      const hasPerLocation = faq.locationAnswers && Object.keys(faq.locationAnswers).length > 0
      if (hasPerLocation && namedLocation) {
        // Per-location FAQ + location named in message → answer directly.
        const perLocText =
          (faq.locationAnswers && faq.locationAnswers[namedLocation.key]) || faq.answer
        bot(`${namedLocation.shortName}: ${perLocText}`, faq.links)
        backToMenu()
        return true
      }
      if (hasPerLocation) {
        setSelectedFaq(faq)
        enterLocation('faq', 'Which Modern Storage® location are you asking about?')
        return true
      }
      bot(faq.answer, faq.links)
      backToMenu()
      return true
    }
    return false
  }

  function reserveAnswer(loc: ChatLocation, fromAlias: boolean) {
    const lead = fromAlias ? `Modern Storage® ${loc.shortName} is the closest fit for that area. ` : ''
    bot(`${lead}Great. You can view available units, sizes, and pricing for ${loc.name} here:`, [
      { label: 'View available units', href: loc.url },
    ])
    backToMenu()
  }
  function contactAnswer(loc: ChatLocation) {
    // Phone policy: show the centralized number for every location (one number,
    // one funnel) — never the per-location GBP number in visible content.
    bot(`${loc.name}\nPhone: ${CHATBOT_TEXT.newCustomersPhone}\nAddress: ${loc.address}`, [
      { label: 'View location page', href: loc.url },
    ])
    backToMenu()
  }
  function hoursAnswer(loc: ChatLocation) {
    bot(`${loc.name} office hours:\n${locationHours(loc)}`, [
      { label: 'View location page', href: loc.url },
    ])
    backToMenu()
  }

  function faqAnswer(loc: ChatLocation) {
    const f = selectedFaq
    const text = (f?.locationAnswers && f.locationAnswers[loc.key]) || f?.answer || ''
    bot(`${loc.shortName}: ${text}`, f?.links)
    setSelectedFaq(null)
    backToMenu()
  }

  function resolveLocation(loc: ChatLocation, fromAlias: boolean) {
    if (purpose === 'explore') return reserveAnswer(loc, fromAlias)
    if (purpose === 'contact') return contactAnswer(loc)
    if (purpose === 'hours') return hoursAnswer(loc)
    if (purpose === 'faq') return faqAnswer(loc)
    if (purpose === 'page') {
      bot('You can access your location page here:', [{ label: 'Open location page', href: loc.url }])
      return backToMenu()
    }
    // purpose === 'decide' → ask the size question next
    setSelectedLoc(loc)
    bot('Do you already know what size storage unit you need?')
    setOptions(withHome(SIZE_OPTIONS))
    setStep('decide-size')
  }

  function handleLocationInput(text: string) {
    const m = matchLocation(text)
    if (m.type === 'location') return resolveLocation(m.loc, m.fromAlias)
    if (m.type === 'ambiguous-lr') {
      bot('Modern Storage® has several Little Rock area locations. Which one would you like?')
      setOptions(withHome(LR_SUBSET))
      return
    }
    if (m.type === 'ambiguous-nwa') {
      bot('Modern Storage® has several Northwest Arkansas locations. Which one would you like?')
      setOptions(withHome(NWA_SUBSET))
      return
    }
    bot(CHATBOT_TEXT.noLocationMatch)
    setOptions(withHome(ALL_LOC))
  }

  // Central handler for every user action (button click or typed text).
  function handle(value: string, label: string, isButton: boolean) {
    user(label)
    setInput('')
    // Any navigation expands the menu again; an answer step re-collapses it after.
    setMenuCollapsed(false)

    // "Main menu" escape works from any step.
    if (isButton && value === '__home__') return goHome()
    // "Send us a message" works from any step.
    if (isButton && value === '__message__') return startMessage()

    switch (step) {
      case 'name': {
        const nm = value.trim()
        if (!nm) return
        setName(nm)
        bot(CHATBOT_TEXT.askPhone)
        setStep('phone')
        return
      }
      case 'phone': {
        const tenDigits = normalizePhone(value)
        if (!tenDigits) {
          bot('Please enter a valid 10-digit phone number so our team can reach you.')
          return
        }
        setPhone(tenDigits)
        // Best-effort lead capture; chat proceeds regardless.
        void fetch('/api/chat-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, phone: tenDigits }),
        }).catch(() => {})
        bot(CHATBOT_TEXT.menuIntro)
        setOptions(MENU_OPTIONS)
        setStep('menu')
        return
      }
      case 'message': {
        const msg = value.trim()
        if (!msg) return
        // Email the typed message to the team (best-effort; never blocks chat).
        void fetch('/api/chat-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, phone, message: msg }),
        }).catch(() => {})
        bot(
          `Thanks${name ? ', ' + name : ''}! Your message has been sent to our team and we’ll follow up using the phone number you provided.`,
        )
        return backToMenu()
      }
      case 'menu': {
        if (isButton) {
          if (value === 'decide')
            return enterLocation(
              'decide',
              'Great, I can help with that. Which Modern Storage® location are you interested in?',
            )
          if (value === 'explore')
            return enterLocation(
              'explore',
              'Absolutely. Which Modern Storage® location would you like to view?',
            )
          if (value === 'pay') return paymentAnswer()
          if (value === 'contact')
            return enterLocation(
              'contact',
              'Which store or city do you need the phone number or address for?',
            )
          if (value === 'tenant') {
            bot('What do you need help with today?')
            setOptions(withHome(TENANT_OPTIONS))
            setStep('tenant-menu')
            return
          }
        }
        // typed free text at the menu — hours, then approved Q&A, then a
        // location lookup, else the fallback (which re-offers the home menu).
        if (tryAnswerFreeText(value)) return
        const m = matchLocation(value)
        if (m.type === 'location') {
          setPurpose('contact')
          setStep('location')
          return contactAnswer(m.loc)
        }
        bot(CHATBOT_TEXT.fallback)
        // Offer a direct "Send us a message" path (emailed to the team) plus
        // the menu — shown expanded since this is a dead-end the bot can't answer.
        setOptions([MESSAGE_OPTION, ...MENU_OPTIONS])
        setMenuCollapsed(false)
        return
      }
      case 'location': {
        if (isButton) {
          const loc = byKey(value)
          if (loc) return resolveLocation(loc, false)
        }
        return handleLocationInput(value)
      }
      case 'decide-size': {
        if (value === 'yes' && selectedLoc) return reserveAnswer(selectedLoc, false)
        if (value === 'no') {
          bot(
            'No problem. You can use our AI Storage Size Finder or view our Size Guide to help choose the right unit.',
            [
              { label: 'AI Storage Size Finder', href: CHATBOT_TEXT.sizeFinderUrl },
              { label: 'Size Guide', href: CHATBOT_TEXT.sizeGuideUrl },
            ],
          )
          return backToMenu()
        }
        if (value === 'bedrooms') {
          bot('How many bedrooms or rooms are you storing?')
          setOptions(withHome(BEDROOM_OPTIONS))
          setStep('decide-bedrooms')
          return
        }
        return
      }
      case 'decide-bedrooms': {
        const links: LinkBtn[] = [{ label: 'Size Guide', href: CHATBOT_TEXT.sizeGuideUrl }]
        if (selectedLoc) links.unshift({ label: `View ${selectedLoc.shortName} units`, href: selectedLoc.url })
        bot(
          'Thanks. Based on that, the next step is to view available units at your preferred location or use our Size Guide for a better estimate.',
          links,
        )
        return backToMenu()
      }
      case 'tenant-menu': {
        if (value === 'payment') return paymentAnswer()
        if (value === 'contact')
          return enterLocation('contact', 'Which Modern Storage® location do you need to contact?')
        if (value === 'access')
          return enterLocation(
            'contact',
            'Access and gate details can vary by location and account. Please contact your Modern Storage® location directly so our team can help. Which location do you need?',
          )
        if (value === 'moveout')
          return enterLocation(
            'contact',
            'Move-out details may vary by location and rental agreement. Please contact your Modern Storage® location directly so our team can help. Which location do you need?',
          )
        // "Other tenant support" button → straight to the contact fallback.
        if (isButton) {
          return enterLocation('contact', `${CHATBOT_TEXT.fallback} Which location do you need?`)
        }
        // A freely-typed tenant question — try the approved Q&A, else contact.
        if (tryAnswerFreeText(value)) return
        return enterLocation('contact', `${CHATBOT_TEXT.fallback} Which location do you need?`)
      }
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const v = input.trim()
    if (!v) return
    handle(v, v, false)
  }

  const placeholder =
    step === 'name'
      ? 'Enter your name'
      : step === 'phone'
        ? CHATBOT_TEXT.phonePlaceholder
        : step === 'message'
          ? 'Type your message…'
          : 'Type or pick an option…'

  // Index of the visitor's most recent message — used to keep their question
  // pinned near the top so the answer beneath it stays in view.
  let lastUserIndex = -1
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].role === 'user') {
      lastUserIndex = i
      break
    }
  }

  // ── Collapsed launcher ──
  if (view === 'launcher') {
    return (
      <button
        type="button"
        onClick={() => (messages.length ? setView('chat') : startChat())}
        aria-label="Open chat — can I help you?"
        className="fixed bottom-24 right-4 lg:bottom-6 lg:right-6 z-50 w-14 h-14 rounded-full bg-modern-red hover:bg-modern-red-hover text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] flex items-center justify-center transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4-.8L3 20l1.4-3.6A8.97 8.97 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>
    )
  }

  // ── "Can I help you?" prompt bubble ──
  // Whole bubble is now a single clickable button so a tap ANYWHERE on the
  // pill starts the chat — works even if Tailwind variants on the inner
  // pill don't paint correctly on first render. The X close-button is a
  // sibling positioned absolutely so its click doesn't bubble into the
  // parent button.
  if (view === 'prompt') {
    return (
      <div className="fixed bottom-24 right-4 lg:bottom-6 lg:right-6 z-50">
        <div className="relative">
          <button
            type="button"
            onClick={() => setView('launcher')}
            aria-label="Dismiss chat prompt"
            className="absolute -top-2 -left-2 z-10 w-6 h-6 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-charcoal shadow-sm flex items-center justify-center"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button
            type="button"
            onClick={startChat}
            aria-label="Start chat — Can I help you?"
            className="group flex items-center gap-3 bg-white rounded-full pl-5 pr-2 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.2)] border border-gray-100 hover:shadow-[0_12px_30px_rgba(0,0,0,0.28)] transition-shadow text-left"
          >
            <span className="flex flex-col items-start">
              <span className="text-xs text-gray-600 leading-tight mb-1">{CHATBOT_TEXT.prompt}</span>
              <span
                className="inline-flex items-center gap-1 text-white text-sm font-black px-4 py-1.5 rounded-full"
                style={{ backgroundColor: '#F60001' }}
              >
                Start Chat →
              </span>
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={CHATBOT_TEXT.avatar}
              alt=""
              aria-hidden="true"
              className="w-12 h-12 rounded-full object-cover border border-gray-100 shrink-0"
            />
          </button>
        </div>
      </div>
    )
  }

  // ── Open chat panel ──
  return (
    <div
      role="dialog"
      aria-label="Chat with Modern Storage"
      className="fixed bottom-24 right-4 lg:bottom-6 lg:right-6 z-50 w-[calc(100vw-2rem)] max-w-sm bg-white rounded-2xl shadow-[0_16px_50px_rgba(0,0,0,0.3)] border border-gray-100 flex flex-col overflow-hidden"
      style={{ height: 'min(34rem, 76vh)' }}
    >
      <div className="flex items-center gap-3 bg-charcoal text-white px-4 py-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={CHATBOT_TEXT.avatar} alt="" aria-hidden="true" className="w-9 h-9 rounded-full object-cover border border-white/20" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-black leading-tight truncate">{CHATBOT_TEXT.agentName}</p>
          <p className="text-[11px] text-gray-400 leading-tight">Typically replies in a moment</p>
        </div>
        {step !== 'name' && step !== 'phone' && (
          <button
            type="button"
            onClick={goHome}
            aria-label="Back to main menu"
            className="h-8 px-2.5 rounded-full hover:bg-white/10 flex items-center justify-center gap-1 text-xs font-bold transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10" />
            </svg>
            Menu
          </button>
        )}
        <button
          type="button"
          onClick={closeChat}
          aria-label="Close chat"
          className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
        {messages.map((m, i) => (
          <div
            key={i}
            ref={i === lastUserIndex ? lastUserRef : undefined}
            className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}
          >
            <div
              className={
                m.role === 'user'
                  ? 'bg-modern-red text-white text-sm rounded-2xl rounded-br-sm px-3.5 py-2 max-w-[80%] whitespace-pre-line'
                  : 'bg-white text-charcoal text-sm rounded-2xl rounded-bl-sm px-3.5 py-2 max-w-[88%] border border-gray-200 whitespace-pre-line'
              }
            >
              {m.text}
              {m.links && m.links.length > 0 && (
                <span className="mt-2 flex flex-col gap-1.5">
                  {m.links.map((l) => (
                    <a
                      key={l.href + l.label}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 bg-modern-red hover:bg-modern-red-hover text-white text-xs font-bold px-3 py-2 rounded-full transition-colors"
                    >
                      {l.label} →
                    </a>
                  ))}
                </span>
              )}
            </div>
          </div>
        ))}

        {options.length > 0 &&
          (menuCollapsed ? (
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setMenuCollapsed(false)}
                className="inline-flex items-center gap-2 text-sm font-bold text-modern-red hover:text-modern-red-hover bg-white border border-gray-300 hover:border-modern-red rounded-xl px-3.5 py-2 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                Show menu options
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 pt-1">
              {options.map((o) => (
                <button
                  key={o.value + o.label}
                  type="button"
                  onClick={() => handle(o.value, o.label, true)}
                  className="text-left text-sm font-semibold text-charcoal bg-white border border-gray-300 hover:border-modern-red hover:text-modern-red rounded-xl px-3.5 py-2 transition-colors"
                >
                  {o.label}
                </button>
              ))}
            </div>
          ))}
      </div>

      {/* Persistent quick actions — shown under the conversation once we're
          past the name/email step. New customers call; existing tenants are
          sent to the account / reservations site. */}
      {step !== 'name' && step !== 'phone' && (
        <div className="flex items-stretch gap-2 px-3 pt-3 pb-1 bg-white">
          <a
            href={CHATBOT_TEXT.newCustomersTel}
            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-modern-red hover:bg-modern-red-hover text-white text-xs font-black px-3 py-2.5 rounded-full transition-colors"
          >
            <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.24.2 2.45.57 3.57a1 1 0 01-.24 1.02l-2.2 2.2z" />
            </svg>
            New Customers
          </a>
          <a
            href={CHATBOT_TEXT.existingTenantsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-white text-charcoal hover:border-modern-red hover:text-modern-red text-xs font-black px-3 py-2.5 rounded-full border border-gray-300 transition-colors"
          >
            Existing Tenants →
          </a>
        </div>
      )}

      <form onSubmit={onSubmit} className="flex items-center gap-2 p-3 border-t border-gray-100 bg-white">
        <input
          type={step === 'phone' ? 'tel' : 'text'}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
          className="flex-1 text-sm rounded-full border border-gray-300 px-4 py-2.5 focus:outline-none focus:border-modern-red"
        />
        <button
          type="submit"
          aria-label="Send"
          className="w-10 h-10 rounded-full bg-modern-red hover:bg-modern-red-hover text-white flex items-center justify-center transition-colors shrink-0"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </form>
    </div>
  )
}
