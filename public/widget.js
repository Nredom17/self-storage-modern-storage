/*!
 * Modern Storage® Chat Widget — Standalone Embed
 *
 * Drop-in vanilla JS port of the React ChatWidget that lives at
 * self-storage.modernstorage.com. No framework, no dependencies — paste a
 * single <script> tag on any site and the widget appears in the corner.
 *
 *   <script src="https://self-storage.modernstorage.com/widget.js" defer></script>
 *
 * SAFETY: button-driven, backed by the same approved data. Never invents
 * pricing, availability, discounts, policies, or legal statements. Routes
 * everything to approved location URLs or the team via email.
 *
 * Transcripts POST to https://self-storage.modernstorage.com/api/chat-lead
 * which is CORS-enabled for cross-origin embedding.
 */
(function () {
  'use strict'

  // Don't double-mount if the script is included twice.
  if (window.__MS_CHAT_LOADED__) return
  window.__MS_CHAT_LOADED__ = true

  // ────────────────────────────────────────────────────────────────────────
  // CONFIG
  // ────────────────────────────────────────────────────────────────────────
  var API_BASE = 'https://self-storage.modernstorage.com'
  var API_ENDPOINT = API_BASE + '/api/chat-lead'
  var AVATAR_URL = API_BASE + '/images/chat-avatar.jpg'
  var REDDIT_PIXEL_ID = 'a2_j41lj6z9iw28'

  // Fan a Lead conversion out to Reddit, OpenAI, and GTM. Mirrors
  // lib/analytics.ts on the React side so any site embedding widget.js
  // gets the same attribution as visitors to self-storage.modernstorage.com.
  // Wrapped in try/catch — analytics failures must never block the chat.
  function trackLead(params) {
    if (typeof window === 'undefined') return
    var phone = params.phone ? String(params.phone).replace(/\D/g, '') : null
    var email = params.email ? String(params.email).trim().toLowerCase() : null
    try {
      if (typeof window.rdt === 'function') {
        var matchKeys = {}
        if (email) matchKeys.email = email
        if (phone) matchKeys.phoneNumber = phone
        var keys = Object.keys(matchKeys)
        if (keys.length > 0) window.rdt('init', REDDIT_PIXEL_ID, matchKeys)
        window.rdt('track', 'Lead', { conversionId: params.source })
      }
    } catch (e) {}
    try {
      if (typeof window.oaiq === 'function') {
        window.oaiq('event', 'lead', {
          type: 'customer_action',
          amount: params.value || 0,
          currency: 'USD',
          source: params.source,
        })
      }
    } catch (e) {}
    try {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({ event: 'lead', lead_source: params.source })
    } catch (e) {}
  }

  // ────────────────────────────────────────────────────────────────────────
  // DATA — locations, FAQs, copy. Mirrors lib/chatbot.ts.
  // ────────────────────────────────────────────────────────────────────────
  var CHAT_LOCATIONS = [
    { key: 'west-little-rock', name: 'Modern Storage® West Little Rock', shortName: 'West Little Rock', phone: '(501) 812-6500', address: '601 Autumn Rd, Little Rock, AR 72211', url: 'https://www.modernstorage.com/self-storage-little-rock-ar-f5198', region: 'little-rock', aliases: ['west little rock', 'wlr', 'chenal', 'little rock west'] },
    { key: 'shackleford', name: 'Modern Storage® Shackleford', shortName: 'Shackleford', phone: '(501) 500-5467', address: '3400 South Shackleford Road, Little Rock, AR 72205', url: 'https://www.modernstorage.com/3400-south-shackleford-road-little-rock-ar-72205', region: 'little-rock', aliases: ['shackleford', 'little rock shackleford'] },
    { key: 'maumelle', name: 'Modern Storage® Maumelle Blvd', shortName: 'Maumelle Blvd', phone: '(501) 791-0080', address: '9100 Maumelle Blvd, North Little Rock, AR 72113', url: 'https://www.modernstorage.com/self-storage-maumelle-ar-f9458', region: 'little-rock', aliases: ['maumelle blvd', 'maumelle', 'north little rock maumelle'] },
    { key: 'riverdale', name: 'Modern Storage® Riverdale', shortName: 'Riverdale', phone: '(501) 632-7770', address: '2510 Cantrell Rd, Little Rock, AR 72202', url: 'https://www.modernstorage.com/2510-cantrell-rd-little-rock-ar-72202', region: 'little-rock', aliases: ['riverdale', 'cantrell', 'cammack village', 'camack village', 'the heights', 'heights', 'hillcrest', 'pulaski heights'] },
    { key: 'bryant', name: 'Modern Storage® Bryant', shortName: 'Bryant', phone: '(501) 302-5000', address: '300 Dell Dr, Bryant, AR 72022', url: 'https://www.modernstorage.com/self-storage-bryant-ar-f8249', region: 'other', aliases: ['bryant'] },
    { key: 'north-little-rock', name: 'Modern Storage® North Little Rock', shortName: 'North Little Rock', phone: '(501) 441-5333', address: '3100 North Hills Blvd, North Little Rock, AR 72116', url: 'https://www.modernstorage.com/self-storage-north-little-rock-ar-f8184', region: 'little-rock', aliases: ['north little rock', 'nlr', 'north hills'] },
    { key: 'hot-springs', name: 'Modern Storage® Hot Springs', shortName: 'Hot Springs', phone: '(501) 302-1400', address: '1238 Higdon Ferry Rd, Hot Springs, AR 71913', url: 'https://www.modernstorage.com/self-storage-hot-springs-ar-f5404', region: 'other', aliases: ['hot springs'] },
    { key: 'springdale', name: 'Modern Storage® Springdale', shortName: 'Springdale', phone: '(479) 480-7600', address: '4555 W Sunset Ave, Springdale, AR 72762', url: 'https://www.modernstorage.com/self-storage-springdale-ar-f2741', region: 'nwa', aliases: ['springdale'] },
    { key: 'lowell', name: 'Modern Storage® Lowell', shortName: 'Lowell', phone: '(479) 485-2299', address: '1407 W Monroe Ave, Lowell, AR 72745', url: 'https://www.modernstorage.com/1407-w-monroe-ave-lowell-ar-72745', region: 'nwa', aliases: ['lowell'] },
    { key: 'bentonville', name: 'Modern Storage® Bentonville', shortName: 'Bentonville', phone: '(479) 316-2500', address: '700 SW 14th St, Bentonville, AR 72712', url: 'https://www.modernstorage.com/self-storage-bentonville-ar-f3125', region: 'nwa', aliases: ['bentonville'] },
  ]

  var TEXT = {
    prompt: 'Can I help you?',
    agentName: 'Modern Storage® Help',
    welcome: 'Welcome to Modern Storage®! I’m here to help with your storage needs. Please type your question below, and I’ll help you get the answer.',
    askName: 'First, What’s your name?',
    askPhone: 'Thanks. Lastly, what is your phone number?',
    phonePlaceholder: 'Enter your phone number',
    menuIntro: 'Great, thank you. How can we help today? You can type a question — like “What are your hours?” — or pick an option below.',
    fallback: 'I don’t have an answer for that one. For more information, please contact your Modern Storage® office directly and our team will be glad to help — or pick an option below.',
    goodbye: 'You’re welcome! Thanks for chatting with Modern Storage®. If you think of anything else, our team is just a tap away — or reserve online from any location page. Have a great day!',
    noLocationMatch: 'I’m not sure which location you mean. Please choose one of these Modern Storage® locations:',
    hoursPrompt: 'Which Modern Storage® location are you interested in?',
    sizeFinderUrl: API_BASE + '/ai-storage-size-finder',
    sizeGuideUrl: API_BASE + '/size-guide',
    newCustomersPhone: '501-910-0096',
    newCustomersTel: 'tel:+15019100096',
    existingTenantsUrl: 'https://www.modernstorage.com/self-storage',
    payOnlineUrl: 'https://www.modernstorage.com/payonline',
  }

  var CHAT_FAQS = [
    { question: 'Climate-controlled units?', keywords: ['climate', 'climate controlled', 'temperature', 'air conditioned', 'air conditioning', 'heated', 'cooled'], answer: 'Many Modern Storage® locations offer climate-controlled units, though availability and sizes vary by facility. You can learn more about climate-controlled storage below, or tell me which location you’re interested in.', links: [{ label: 'Climate-controlled storage', href: API_BASE + '/climate-controlled' }] },
    { question: 'What size do I need?', keywords: ['size', 'sizes', 'how big', 'how large', 'dimensions', 'what size', 'square feet'], answer: 'Not sure what size you need? Our AI Storage Size Finder and Size Guide can help you choose the right unit.', links: [{ label: 'AI Storage Size Finder', href: TEXT.sizeFinderUrl }, { label: 'Size Guide', href: TEXT.sizeGuideUrl }] },
    { question: 'How do I reserve?', keywords: ['reserve', 'reservation', 'rent online', 'book', 'sign up', 'how do i rent'], answer: 'You can view available units and reserve online for any Modern Storage® location. Tell me which location you’re interested in and I’ll send you the right link.' },
    { question: 'RV / boat / vehicle storage?', keywords: ['boat', 'rv', 'camper', 'vehicle', 'car storage', 'trailer', 'motorhome'], answer: 'Select Modern Storage® locations offer boat, RV, and vehicle storage. Availability varies by facility — let me know which area you’re in and I can point you to the right location.', links: [{ label: 'Boat, RV & vehicle storage', href: API_BASE + '/rv-boat-vehicle' }] },
    { question: 'Can I live or sleep in my unit?', keywords: ['live', 'living', 'sleep', 'sleeping', 'reside', 'residence', 'stay overnight', 'sleep in', 'dwelling', 'occupancy', 'habitation', 'move in to', 'move into'], answer: 'No. Modern Storage® units are for storage only — they cannot be used as a residence, for sleeping, or for any kind of overnight occupancy. State and local fire codes, building regulations, and your rental agreement all prohibit anyone from living in a storage unit, for safety reasons. If you’re between homes and need short-term housing options, our team can still help you store your belongings while you arrange other accommodations.' },
    { question: 'How long can I rent a storage unit?', keywords: ['how long', 'how long can i rent', 'how long can i', 'rent for', 'rental period', 'rental length', 'length of rental', 'duration', 'minimum rental', 'minimum stay', 'how short', 'shortest rental', 'longest rental', 'maximum rental'], answer: 'Modern Storage® rentals are month-to-month with no long-term lease commitment. You can rent for as little as one month, and there is no maximum — many customers stay for years. Written notice is required before move-out, and tenants are responsible for cleaning out the unit and removing their lock at the end of occupancy.' },
  ]

  // Office hours (mirrors lib/chatbot.ts).
  var SUNDAY_CLOSED = ['lowell', 'maumelle']
  function locationHours(loc) {
    var weekday = 'Monday–Saturday: 8:30 AM – 5:30 PM'
    var sunday = SUNDAY_CLOSED.indexOf(loc.key) >= 0 ? 'Sunday: Closed' : 'Sunday: 1:00 PM – 6:00 PM'
    return weekday + '\n' + sunday
  }

  // ────────────────────────────────────────────────────────────────────────
  // MATCHING (ported from lib/chatbot.ts)
  // ────────────────────────────────────────────────────────────────────────
  function normalize(text) {
    return (text || '').toLowerCase().replace(/[^a-z0-9\s']/g, ' ').replace(/\s+/g, ' ').trim()
  }
  function normalizePhone(raw) {
    var d = (raw || '').replace(/\D/g, '')
    if (d.length === 11 && d.charAt(0) === '1') d = d.slice(1)
    return d.length === 10 ? d : null
  }
  var HOURS_KEYWORDS = ['hours', 'hour', 'open', 'opening', 'close', 'closing', 'closed', 'what time']
  var PAYMENT_KEYWORDS = ['payment', 'pay my bill', 'pay bill', 'pay my rent', 'pay rent', 'pay online', 'make a payment', 'autopay', 'invoice']
  function isHoursQuestion(text) {
    var t = ' ' + normalize(text) + ' '
    for (var i = 0; i < HOURS_KEYWORDS.length; i++) if (t.indexOf(' ' + HOURS_KEYWORDS[i] + ' ') >= 0) return true
    return false
  }
  function isPaymentQuestion(text) {
    var t = ' ' + normalize(text) + ' '
    for (var i = 0; i < PAYMENT_KEYWORDS.length; i++) if (t.indexOf(' ' + PAYMENT_KEYWORDS[i] + ' ') >= 0) return true
    return false
  }
  // Contact-info intent detection — "whats wlr number", "address for
  // shackleford", "phone for bryant", etc.
  var CONTACT_PHRASES = ['phone number', 'phone for', 'phone of', 'number for', 'number of', 'the number', 'whats the number', "what's the number", 'whats their number', 'address for', 'address of', 'the address', 'whats the address', "what's the address", 'contact info', 'contact information', 'contact number', 'where is', 'how do i contact', 'how can i contact', 'how do i reach', 'how can i reach', 'call them']
  var CONTACT_SINGLE = ['address']
  function isContactQuestion(text) {
    var t = ' ' + normalize(text) + ' '
    for (var i = 0; i < CONTACT_SINGLE.length; i++) if (t.indexOf(' ' + CONTACT_SINGLE[i] + ' ') >= 0) return true
    for (var j = 0; j < CONTACT_PHRASES.length; j++) if (t.indexOf(' ' + CONTACT_PHRASES[j] + ' ') >= 0) return true
    return false
  }
  var SHORT_GOODBYES = ['thanks', 'thx', 'ty', 'bye', 'goodbye', 'cya', 'later', 'done', 'okay', 'ok', 'cool', 'great', 'awesome', 'perfect', 'nope', 'no']
  var GOODBYE_PHRASES = ['thank you', 'thanks so much', 'thanks a lot', 'thanks for your help', 'thank you so much', 'thank you for your help', 'that is all', "that's all", 'that is it', "that's it", 'all good', 'no thanks', 'no thank you', "i'm good", 'im good', 'i am good', 'got it', 'sounds good', 'have a good day', 'have a great day', 'see you', 'see ya', 'talk later', 'all set', 'i am all set', "i'm all set"]
  function isGoodbye(text) {
    var t = normalize(text)
    if (!t) return false
    if (SHORT_GOODBYES.indexOf(t) >= 0) return true
    var padded = ' ' + t + ' '
    for (var i = 0; i < GOODBYE_PHRASES.length; i++) if (padded.indexOf(' ' + GOODBYE_PHRASES[i] + ' ') >= 0) return true
    return false
  }
  var SHORT_MESSAGE = ['agent', 'human', 'representative', 'rep', 'help', 'message']
  var MESSAGE_PHRASES = ['send message', 'send a message', 'send us a message', 'leave a message', 'send email', 'send an email', 'contact me', 'contact us', 'talk to a human', 'talk to someone', 'talk to a person', 'talk to a real person', 'talk to an agent', 'speak to a human', 'speak to someone', 'speak to an agent', 'real person', 'live agent', 'live person', 'customer service', 'customer support', 'get in touch']
  function isMessageRequest(text) {
    var t = normalize(text)
    if (!t) return false
    if (SHORT_MESSAGE.indexOf(t) >= 0) return true
    var padded = ' ' + t + ' '
    for (var i = 0; i < MESSAGE_PHRASES.length; i++) if (padded.indexOf(' ' + MESSAGE_PHRASES[i] + ' ') >= 0) return true
    return false
  }
  var STOPWORDS = ['the', 'a', 'an', 'and', 'or', 'for', 'to', 'of', 'in', 'on', 'at', 'is', 'are', 'do', 'does', 'you', 'your', 'i', 'my', 'me', 'we', 'it', 'can', 'how', 'what', 'where', 'when', 'which', 'need', 'want', 'help', 'please', 'with', 'have', 'about', 'this', 'that', 'near', 'get', 'storage', 'store', 'stored', 'unit', 'units', 'modern', 'rent', 'rental']
  // Sequence-match helper — does kwTokens appear in order within inputTokens,
  // allowing other tokens between them? Lets "live in unit" match "live in
  // my unit" because the three tokens appear in order.
  function keywordTokensInOrder(kwTokens, inputTokens) {
    var ki = 0
    for (var i = 0; i < inputTokens.length; i++) {
      if (inputTokens[i] === kwTokens[ki]) ki++
      if (ki === kwTokens.length) return true
    }
    return false
  }

  // Score one FAQ against a typed input. See lib/chatbot.ts for the long
  // rationale — same algorithm ported verbatim. Combines verbatim phrase
  // matches, phrase-with-gaps, question-title overlap, and single-token
  // overlap into a single score; matchFaq picks the highest above threshold.
  function scoreFaq(input, faq) {
    var norm = normalize(input)
    if (!norm) return 0
    var padded = ' ' + norm + ' '
    var inputTokensAll = norm.split(' ').filter(function (w) { return w.length > 0 })
    var distinct = {}
    for (var d = 0; d < inputTokensAll.length; d++) {
      var dw = inputTokensAll[d]
      if (dw.length >= 3 && STOPWORDS.indexOf(dw) < 0) distinct[dw] = true
    }
    var score = 0
    for (var ki = 0; ki < faq.keywords.length; ki++) {
      var k = (faq.keywords[ki] || '').trim().toLowerCase()
      if (!k) continue
      if (padded.indexOf(' ' + k + ' ') >= 0) {
        score += 12 + Math.min(k.length, 30) * 0.3
        continue
      }
      var kwTokens = k.split(/\s+/).filter(function (w) { return w.length > 0 })
      if (kwTokens.length >= 2 && keywordTokensInOrder(kwTokens, inputTokensAll)) {
        score += 8 + kwTokens.length
        continue
      }
      for (var kp = 0; kp < kwTokens.length; kp++) {
        var w = kwTokens[kp]
        if (w.length >= 3 && STOPWORDS.indexOf(w) < 0 && distinct[w]) score += 1
      }
    }
    // Question-title overlap — distinctive words from the FAQ's question
    // that also appear in the input.
    var titleParts = normalize(faq.question || '').split(' ')
    var titleSeen = {}
    for (var t = 0; t < titleParts.length; t++) {
      var tw = titleParts[t]
      if (tw.length >= 3 && STOPWORDS.indexOf(tw) < 0 && distinct[tw] && !titleSeen[tw]) {
        score += 1.5
        titleSeen[tw] = true
      }
    }
    return score
  }

  function matchFaq(text) {
    if (!normalize(text)) return null
    var best = null
    var bestScore = 0
    for (var i = 0; i < CHAT_FAQS.length; i++) {
      var s = scoreFaq(text, CHAT_FAQS[i])
      if (s > bestScore) { bestScore = s; best = CHAT_FAQS[i] }
    }
    return bestScore >= 3 ? best : null
  }
  function matchLocation(text) {
    var t = ' ' + normalize(text) + ' '
    var pairs = []
    for (var i = 0; i < CHAT_LOCATIONS.length; i++) {
      var loc = CHAT_LOCATIONS[i]
      for (var j = 0; j < loc.aliases.length; j++) pairs.push({ loc: loc, a: loc.aliases[j] })
    }
    pairs.sort(function (a, b) { return b.a.length - a.a.length })
    for (var p = 0; p < pairs.length; p++) {
      var pa = pairs[p].a
      if (t.indexOf(' ' + pa + ' ') >= 0 || t.indexOf(pa) >= 0) return { type: 'location', loc: pairs[p].loc, fromAlias: true }
    }
    if (/\bnwa\b/.test(t) || t.indexOf('northwest arkansas') >= 0) return { type: 'ambiguous-nwa' }
    if (t.indexOf('little rock') >= 0) return { type: 'ambiguous-lr' }
    return { type: 'none' }
  }
  function byKey(key) {
    for (var i = 0; i < CHAT_LOCATIONS.length; i++) if (CHAT_LOCATIONS[i].key === key) return CHAT_LOCATIONS[i]
    return null
  }

  // ────────────────────────────────────────────────────────────────────────
  // MENU OPTIONS
  // ────────────────────────────────────────────────────────────────────────
  var MENU_OPTIONS = [
    { label: 'I need help deciding', value: 'decide' },
    { label: 'I would like to explore options myself', value: 'explore' },
    { label: 'I am an existing tenant', value: 'tenant' },
    { label: 'I need to pay my bill', value: 'pay' },
    { label: 'I need a phone number or address', value: 'contact' },
  ]
  var TENANT_OPTIONS = [
    { label: 'Make a payment', value: 'payment' },
    { label: 'Contact my location', value: 'contact' },
    { label: 'Access or gate question', value: 'access' },
    { label: 'Move-out question', value: 'moveout' },
    { label: 'Other tenant support', value: 'other' },
  ]
  var SIZE_OPTIONS = [
    { label: 'Yes, I know the size', value: 'yes' },
    { label: 'No, I’m not sure', value: 'no' },
    { label: 'I know how many bedrooms or rooms I’m storing', value: 'bedrooms' },
  ]
  var BEDROOM_OPTIONS = [
    { label: 'Studio or small amount', value: 'studio' },
    { label: '1 bedroom', value: '1' },
    { label: '2 bedrooms', value: '2' },
    { label: '3 bedrooms', value: '3' },
    { label: '4+ bedrooms', value: '4' },
  ]
  var BACK_OPTION = { label: '← Main menu', value: '__home__' }
  var MESSAGE_OPTION = { label: '✉ Send us a message', value: '__message__' }
  function withHome(opts) { return opts.concat([BACK_OPTION]) }
  function allLocOptions() { return CHAT_LOCATIONS.map(function (l) { return { label: l.shortName, value: l.key } }) }
  function lrSubset() {
    var keys = ['west-little-rock', 'shackleford', 'riverdale', 'north-little-rock']
    return CHAT_LOCATIONS.filter(function (l) { return keys.indexOf(l.key) >= 0 }).map(function (l) { return { label: l.shortName, value: l.key } })
  }
  function nwaSubset() {
    var keys = ['bentonville', 'springdale', 'lowell']
    return CHAT_LOCATIONS.filter(function (l) { return keys.indexOf(l.key) >= 0 }).map(function (l) { return { label: l.shortName, value: l.key } })
  }

  // ────────────────────────────────────────────────────────────────────────
  // STYLES — scoped under `.ms-chat` so they don't leak into the host site
  // ────────────────────────────────────────────────────────────────────────
  var CSS = ''
    + '.ms-chat,.ms-chat *{box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif}'
    + '.ms-chat{position:fixed;z-index:2147483647;bottom:24px;right:24px}'
    + '@media (max-width:1024px){.ms-chat{bottom:96px;right:16px}}'
    + '.ms-chat button{font-family:inherit;cursor:pointer;border:0;background:transparent}'
    + '.ms-chat input{font-family:inherit}'
    + '.ms-chat a{text-decoration:none}'
    /* Launcher button */
    + '.ms-chat-launcher{width:56px;height:56px;border-radius:9999px;background:#F60001;color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 24px rgba(0,0,0,.25);transition:background .15s}'
    + '.ms-chat-launcher:hover{background:#C40001}'
    + '.ms-chat-launcher svg{width:24px;height:24px}'
    /* Prompt bubble — now a <button>, so we need text-align + cursor */
    + '.ms-chat-prompt{display:flex;align-items:center;gap:12px;background:#fff;border:1px solid #e5e7eb;border-radius:9999px;padding:8px 8px 8px 20px;box-shadow:0 8px 24px rgba(0,0,0,.2);position:relative;cursor:pointer;text-align:left;transition:box-shadow .15s}'
    + '.ms-chat-prompt:hover{box-shadow:0 12px 30px rgba(0,0,0,.28)}'
    + '.ms-chat-prompt-close{position:absolute;top:-8px;left:-8px;z-index:1;width:24px;height:24px;border-radius:9999px;background:#fff;border:1px solid #e5e7eb;color:#6b7280;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 4px rgba(0,0,0,.05);cursor:pointer}'
    + '.ms-chat-prompt-close svg{width:14px;height:14px}'
    + '.ms-chat-prompt-text{font-size:12px;color:#4b5563;margin:0 0 4px;line-height:1.2}'
    + '.ms-chat-prompt-avatar{width:48px;height:48px;border-radius:9999px;object-fit:cover;border:1px solid #f3f4f6;flex-shrink:0}'
    /* Panel */
    + '.ms-chat-panel{width:calc(100vw - 32px);max-width:384px;height:min(544px,76vh);background:#fff;border-radius:16px;box-shadow:0 16px 50px rgba(0,0,0,.3);border:1px solid #f3f4f6;display:flex;flex-direction:column;overflow:hidden}'
    + '.ms-chat-header{display:flex;align-items:center;gap:12px;background:#1A1A1A;color:#fff;padding:12px 16px}'
    + '.ms-chat-header-avatar{width:36px;height:36px;border-radius:9999px;object-fit:cover;border:1px solid rgba(255,255,255,.2)}'
    + '.ms-chat-header-name{font-size:14px;font-weight:900;line-height:1.1;margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'
    + '.ms-chat-header-sub{font-size:11px;color:#9ca3af;line-height:1.1;margin:0}'
    + '.ms-chat-header-info{flex:1;min-width:0}'
    + '.ms-chat-icon-btn{height:32px;width:32px;border-radius:9999px;color:#fff;display:flex;align-items:center;justify-content:center;transition:background .15s}'
    + '.ms-chat-icon-btn:hover{background:rgba(255,255,255,.1)}'
    + '.ms-chat-menu-btn{height:32px;padding:0 10px;border-radius:9999px;color:#fff;display:inline-flex;align-items:center;gap:4px;font-size:12px;font-weight:700;transition:background .15s}'
    + '.ms-chat-menu-btn:hover{background:rgba(255,255,255,.1)}'
    + '.ms-chat-icon-btn svg,.ms-chat-menu-btn svg{width:16px;height:16px}'
    + '.ms-chat-scroll{flex:1;overflow-y:auto;padding:16px;background:#f9fafb;display:flex;flex-direction:column;gap:12px}'
    + '.ms-chat-row{display:flex}'
    + '.ms-chat-row.bot{justify-content:flex-start}'
    + '.ms-chat-row.user{justify-content:flex-end}'
    + '.ms-chat-bubble{font-size:14px;border-radius:16px;padding:8px 14px;max-width:88%;white-space:pre-line;line-height:1.4}'
    + '.ms-chat-bubble.bot{background:#fff;color:#1A1A1A;border:1px solid #e5e7eb;border-bottom-left-radius:4px}'
    + '.ms-chat-bubble.user{background:#F60001;color:#fff;border-bottom-right-radius:4px;max-width:80%}'
    + '.ms-chat-bubble-links{display:flex;flex-direction:column;gap:6px;margin-top:8px}'
    + '.ms-chat-bubble-link{display:inline-flex;align-items:center;justify-content:center;gap:6px;background:#F60001;color:#fff;font-size:12px;font-weight:700;padding:8px 12px;border-radius:9999px;transition:background .15s}'
    + '.ms-chat-bubble-link:hover{background:#C40001}'
    + '.ms-chat-options{display:flex;flex-direction:column;gap:8px;padding-top:4px}'
    + '.ms-chat-option{text-align:left;font-size:14px;font-weight:600;color:#1A1A1A;background:#fff;border:1px solid #d1d5db;border-radius:12px;padding:8px 14px;transition:border-color .15s,color .15s}'
    + '.ms-chat-option:hover{border-color:#F60001;color:#F60001}'
    + '.ms-chat-menu-toggle{display:inline-flex;align-items:center;gap:8px;font-size:14px;font-weight:700;color:#F60001;background:#fff;border:1px solid #d1d5db;border-radius:12px;padding:8px 14px;align-self:flex-start;transition:border-color .15s,color .15s}'
    + '.ms-chat-menu-toggle:hover{border-color:#F60001;color:#C40001}'
    + '.ms-chat-menu-toggle svg{width:16px;height:16px}'
    + '.ms-chat-quick{display:flex;gap:8px;padding:12px 12px 4px;background:#fff}'
    + '.ms-chat-quick a{flex:1;display:inline-flex;align-items:center;justify-content:center;gap:6px;font-size:12px;font-weight:900;padding:10px 12px;border-radius:9999px;transition:background .15s,border-color .15s,color .15s}'
    + '.ms-chat-quick-call{background:#F60001;color:#fff}'
    + '.ms-chat-quick-call:hover{background:#C40001}'
    + '.ms-chat-quick-call svg{width:14px;height:14px;fill:#fff}'
    + '.ms-chat-quick-tenant{background:#fff;color:#1A1A1A;border:1px solid #d1d5db}'
    + '.ms-chat-quick-tenant:hover{border-color:#F60001;color:#F60001}'
    + '.ms-chat-form{display:flex;align-items:center;gap:8px;padding:12px;border-top:1px solid #f3f4f6;background:#fff}'
    + '.ms-chat-input{flex:1;min-width:0;font-size:16px;border:1px solid #d1d5db;border-radius:9999px;padding:11px 16px;outline:none;color:#1A1A1A}'
    + '.ms-chat-input:focus{border-color:#F60001}'
    /* Send button — 44x44 hits the iOS recommended tap target and stays
     * visible above keyboards. font-size:16px on input avoids the iOS
     * auto-zoom-in-on-focus behavior that can push UI off-screen. */
    + '.ms-chat-send{width:44px;height:44px;border-radius:9999px;background:#F60001;color:#fff;display:flex;align-items:center;justify-content:center;transition:background .15s;flex-shrink:0}'
    + '.ms-chat-send:hover{background:#C40001}'
    + '.ms-chat-send:active{background:#a00001}'
    + '.ms-chat-send svg{width:18px;height:18px}'

  // ────────────────────────────────────────────────────────────────────────
  // ICONS
  // ────────────────────────────────────────────────────────────────────────
  var ICON_CHAT = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4-.8L3 20l1.4-3.6A8.97 8.97 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>'
  var ICON_X = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>'
  var ICON_HOME = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10"/></svg>'
  var ICON_PHONE = '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.24.2 2.45.57 3.57a1 1 0 01-.24 1.02l-2.2 2.2z"/></svg>'
  var ICON_SEND = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 12h14M13 6l6 6-6 6"/></svg>'
  var ICON_MENU = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>'

  // ────────────────────────────────────────────────────────────────────────
  // RUNTIME STATE
  // ────────────────────────────────────────────────────────────────────────
  var state = {
    view: 'prompt',                // prompt | launcher | chat
    step: 'name',                  // name | phone | menu | location | decide-size | decide-bedrooms | tenant-menu | message
    purpose: 'explore',
    selectedLoc: null,
    selectedFaq: null,
    messages: [],
    options: [],
    input: '',
    name: '',
    phone: '',
    menuCollapsed: false,
  }
  var sentLen = 0
  var rootEl = null

  // ────────────────────────────────────────────────────────────────────────
  // TRANSCRIPT FLUSH
  // ────────────────────────────────────────────────────────────────────────
  function flushTranscript(useBeacon, force) {
    if (!normalizePhone(state.phone)) return
    if (state.messages.length <= sentLen) return
    if (!force) {
      var userTurns = 0
      for (var i = 0; i < state.messages.length; i++) if (state.messages[i].role === 'user') userTurns++
      if (userTurns < 2) return
    }
    sentLen = state.messages.length
    var payload = JSON.stringify({
      name: state.name,
      phone: state.phone,
      transcript: state.messages.map(function (m) { return { role: m.role, text: m.text } }),
    })
    if (useBeacon && navigator.sendBeacon) {
      try { navigator.sendBeacon(API_ENDPOINT, new Blob([payload], { type: 'application/json' })) } catch (e) {}
    } else {
      try { fetch(API_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: payload, keepalive: true, mode: 'cors' }).catch(function () {}) } catch (e) {}
    }
  }
  window.addEventListener('pagehide', function () { flushTranscript(true, false) })
  document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'hidden') flushTranscript(true, false) })

  // ────────────────────────────────────────────────────────────────────────
  // DOM HELPERS
  // ────────────────────────────────────────────────────────────────────────
  function el(tag, attrs, children) {
    var node = document.createElement(tag)
    if (attrs) {
      for (var k in attrs) {
        if (k === 'class') node.className = attrs[k]
        else if (k === 'html') node.innerHTML = attrs[k]
        else if (k.indexOf('on') === 0) node.addEventListener(k.slice(2).toLowerCase(), attrs[k])
        else node.setAttribute(k, attrs[k])
      }
    }
    if (children) {
      for (var i = 0; i < children.length; i++) {
        var c = children[i]
        if (c == null) continue
        if (typeof c === 'string') node.appendChild(document.createTextNode(c))
        else node.appendChild(c)
      }
    }
    return node
  }

  // ────────────────────────────────────────────────────────────────────────
  // CONVERSATION HELPERS
  // ────────────────────────────────────────────────────────────────────────
  function bot(text, links) { state.messages.push({ role: 'bot', text: text, links: links || null }); render() }
  function user(text) { state.messages.push({ role: 'user', text: text }); render() }
  function setOptions(opts) { state.options = opts; render() }

  function startChat() {
    state.messages = [{ role: 'bot', text: TEXT.welcome }, { role: 'bot', text: TEXT.askName }]
    state.options = []
    state.menuCollapsed = false
    state.step = 'name'
    state.selectedLoc = null
    state.view = 'chat'
    render()
  }

  function closeChat() {
    flushTranscript(false, true)
    state.view = 'launcher'
    render()
  }

  function enterLocation(purpose, intro, opts) {
    state.purpose = purpose
    state.messages.push({ role: 'bot', text: intro })
    state.options = withHome(opts || allLocOptions())
    state.step = 'location'
    render()
  }

  function backToMenu() {
    state.messages.push({ role: 'bot', text: 'Is there anything else I can help with? Type your question, or open the menu.' })
    state.options = MENU_OPTIONS
    state.menuCollapsed = true
    state.step = 'menu'
    render()
  }

  function goHome() {
    state.selectedLoc = null
    state.selectedFaq = null
    state.purpose = 'explore'
    state.messages.push({ role: 'bot', text: 'Main menu — how can we help today?' })
    state.options = MENU_OPTIONS
    state.menuCollapsed = false
    state.step = 'menu'
    render()
  }

  function startMessage() {
    state.messages.push({ role: 'bot', text: 'Sure — type your message below and our team will get back to you by email.' })
    state.options = []
    state.menuCollapsed = false
    state.step = 'message'
    render()
  }

  function paymentAnswer() {
    bot('You can pay your bill and manage your Modern Storage® account online here:', [{ label: 'Pay my bill online', href: TEXT.payOnlineUrl }])
    backToMenu()
  }
  // Move-out walkthrough — answers the question instead of bouncing the
  // visitor to a location picker. Mirrors the admin FAQs for move-out
  // process + 10-day notice + no-refund policy.
  function moveoutAnswer() {
    bot(
      'To move out of your Modern Storage® unit:\n\n' +
      '• Give your location 10 days’ written move-out notice\n' +
      '• Remove all belongings from the unit\n' +
      '• Clean the unit and remove your lock\n' +
      '• Our team finalizes the move-out in our system and emails you a confirmation\n\n' +
      'Rent is non-refundable and not prorated for early move-outs, so plan your final date accordingly. If you need to confirm details with your specific facility, type the location name below or send us a message.'
    )
    backToMenu()
  }
  // Gate / access walkthrough — explains posted access hours and the
  // typical reasons a gate code stops working before offering the
  // location follow-up.
  function accessAnswer() {
    bot(
      'Modern Storage® gate access is open 6:00 AM – 10:00 PM at all locations. If your gate code isn’t working:\n\n' +
      '• Make sure your account is current — past-due balances can restrict access\n' +
      '• If your account is current and the code still isn’t accepted, contact your specific location during office hours\n\n' +
      'You can pay your bill below, or type the location name to get its phone number and address.',
      [{ label: 'Pay my bill online', href: TEXT.payOnlineUrl }]
    )
    backToMenu()
  }
  function reserveAnswer(loc, fromAlias) {
    var lead = fromAlias ? 'Modern Storage® ' + loc.shortName + ' is the closest fit for that area. ' : ''
    bot(lead + 'Great. You can view available units, sizes, and pricing for ' + loc.name + ' here:', [{ label: 'View available units', href: loc.url }])
    backToMenu()
  }
  function contactAnswer(loc) {
    bot(loc.name + '\nPhone: ' + TEXT.newCustomersPhone + '\nAddress: ' + loc.address, [{ label: 'View location page', href: loc.url }])
    backToMenu()
  }
  function hoursAnswer(loc) {
    bot(loc.name + ' office hours:\n' + locationHours(loc), [{ label: 'View location page', href: loc.url }])
    backToMenu()
  }
  function faqAnswer(loc) {
    var f = state.selectedFaq
    var text = (f && f.locationAnswers && f.locationAnswers[loc.key]) || (f && f.answer) || ''
    bot(loc.shortName + ': ' + text, f && f.links)
    state.selectedFaq = null
    backToMenu()
  }
  function resolveLocation(loc, fromAlias) {
    if (state.purpose === 'explore') return reserveAnswer(loc, fromAlias)
    if (state.purpose === 'contact') return contactAnswer(loc)
    if (state.purpose === 'hours') return hoursAnswer(loc)
    if (state.purpose === 'faq') return faqAnswer(loc)
    if (state.purpose === 'page') {
      bot('You can access your location page here:', [{ label: 'Open location page', href: loc.url }])
      return backToMenu()
    }
    state.selectedLoc = loc
    bot('Do you already know what size storage unit you need?')
    setOptions(withHome(SIZE_OPTIONS))
    state.step = 'decide-size'
    render()
  }
  function handleLocationInput(text) {
    var m = matchLocation(text)
    if (m.type === 'location') return resolveLocation(m.loc, m.fromAlias)
    if (m.type === 'ambiguous-lr') { bot('Modern Storage® has several Little Rock area locations. Which one would you like?'); setOptions(withHome(lrSubset())); return }
    if (m.type === 'ambiguous-nwa') { bot('Modern Storage® has several Northwest Arkansas locations. Which one would you like?'); setOptions(withHome(nwaSubset())); return }
    bot(TEXT.noLocationMatch); setOptions(withHome(allLocOptions()))
  }
  function tryAnswerFreeText(value) {
    if (isGoodbye(value)) { bot(TEXT.goodbye); backToMenu(); return true }
    if (isMessageRequest(value)) { startMessage(); return true }
    // Pre-detect a named location so "what time does wlr close" answers
    // immediately with West Little Rock hours instead of re-asking.
    var locInMessage = matchLocation(value)
    var namedLocation = locInMessage.type === 'location' ? locInMessage.loc : null
    if (isHoursQuestion(value)) {
      if (namedLocation) { hoursAnswer(namedLocation); return true }
      enterLocation('hours', TEXT.hoursPrompt); return true
    }
    if (isPaymentQuestion(value)) { paymentAnswer(); return true }
    if (isContactQuestion(value)) {
      if (namedLocation) { contactAnswer(namedLocation); return true }
      enterLocation('contact', 'Which store do you need the phone number or address for?')
      return true
    }
    var faq = matchFaq(value)
    if (faq) {
      var hasPerLocation = faq.locationAnswers && Object.keys(faq.locationAnswers).length > 0
      if (hasPerLocation && namedLocation) {
        var perLocText = (faq.locationAnswers && faq.locationAnswers[namedLocation.key]) || faq.answer
        bot(namedLocation.shortName + ': ' + perLocText, faq.links)
        backToMenu()
        return true
      }
      if (hasPerLocation) {
        state.selectedFaq = faq
        enterLocation('faq', 'Which Modern Storage® location are you asking about?')
        return true
      }
      bot(faq.answer, faq.links); backToMenu(); return true
    }
    return false
  }

  function handle(value, label, isButton) {
    user(label)
    state.input = ''
    state.menuCollapsed = false

    if (isButton && value === '__home__') return goHome()
    if (isButton && value === '__message__') return startMessage()

    switch (state.step) {
      case 'name': {
        var nm = String(value || '').trim(); if (!nm) return
        state.name = nm
        bot(TEXT.askPhone); state.step = 'phone'; render(); return
      }
      case 'phone': {
        var ten = normalizePhone(value)
        if (!ten) { bot('Please enter a valid 10-digit phone number so our team can reach you.'); return }
        state.phone = ten
        try { fetch(API_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: state.name, phone: ten }), mode: 'cors' }).catch(function () {}) } catch (e) {}
        // Fire conversion to Reddit + OpenAI + GTM. The widget runs on
        // any site that includes widget.js, so the host site's pixels
        // (if installed) all receive the event.
        trackLead({ source: 'chat_widget', phone: ten, name: state.name })
        bot(TEXT.menuIntro); state.options = MENU_OPTIONS; state.step = 'menu'; render(); return
      }
      case 'message': {
        var msg = String(value || '').trim(); if (!msg) return
        try { fetch(API_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: state.name, phone: state.phone, message: msg }), mode: 'cors' }).catch(function () {}) } catch (e) {}
        bot('Thanks' + (state.name ? ', ' + state.name : '') + '! Your message has been sent to our team and we’ll follow up using the phone number you provided.')
        return backToMenu()
      }
      case 'menu': {
        if (isButton) {
          if (value === 'decide') return enterLocation('decide', 'Great, I can help with that. Which Modern Storage® location are you interested in?')
          if (value === 'explore') return enterLocation('explore', 'Absolutely. Which Modern Storage® location would you like to view?')
          if (value === 'pay') return paymentAnswer()
          if (value === 'contact') return enterLocation('contact', 'Which store or city do you need the phone number or address for?')
          if (value === 'tenant') { bot('What do you need help with today?'); setOptions(withHome(TENANT_OPTIONS)); state.step = 'tenant-menu'; render(); return }
        }
        if (tryAnswerFreeText(value)) return
        var m = matchLocation(value)
        if (m.type === 'location') { state.purpose = 'contact'; state.step = 'location'; return contactAnswer(m.loc) }
        bot(TEXT.fallback)
        state.options = [MESSAGE_OPTION].concat(MENU_OPTIONS)
        state.menuCollapsed = false; render(); return
      }
      case 'location': {
        if (isButton) {
          var loc = byKey(value)
          if (loc) return resolveLocation(loc, false)
        }
        return handleLocationInput(value)
      }
      case 'decide-size': {
        if (value === 'yes' && state.selectedLoc) return reserveAnswer(state.selectedLoc, false)
        if (value === 'no') {
          bot('No problem. You can use our AI Storage Size Finder or view our Size Guide to help choose the right unit.', [
            { label: 'AI Storage Size Finder', href: TEXT.sizeFinderUrl },
            { label: 'Size Guide', href: TEXT.sizeGuideUrl },
          ])
          return backToMenu()
        }
        if (value === 'bedrooms') { bot('How many bedrooms or rooms are you storing?'); setOptions(withHome(BEDROOM_OPTIONS)); state.step = 'decide-bedrooms'; render(); return }
        return
      }
      case 'decide-bedrooms': {
        var links = [{ label: 'Size Guide', href: TEXT.sizeGuideUrl }]
        if (state.selectedLoc) links.unshift({ label: 'View ' + state.selectedLoc.shortName + ' units', href: state.selectedLoc.url })
        bot('Thanks. Based on that, the next step is to view available units at your preferred location or use our Size Guide for a better estimate.', links)
        return backToMenu()
      }
      case 'tenant-menu': {
        if (value === 'payment') return paymentAnswer()
        if (value === 'contact') return enterLocation('contact', 'Which Modern Storage® location do you need to contact?')
        // Access + move-out now explain the process inline rather than
        // sending the visitor straight into a location picker.
        if (value === 'access') return accessAnswer()
        if (value === 'moveout') return moveoutAnswer()
        if (isButton) return enterLocation('contact', TEXT.fallback + ' Which location do you need?')
        if (tryAnswerFreeText(value)) return
        return enterLocation('contact', TEXT.fallback + ' Which location do you need?')
      }
    }
  }

  // ────────────────────────────────────────────────────────────────────────
  // RENDER
  // ────────────────────────────────────────────────────────────────────────
  function render() {
    if (!rootEl) return
    rootEl.innerHTML = ''
    if (state.view === 'launcher') return renderLauncher()
    if (state.view === 'prompt') return renderPrompt()
    return renderPanel()
  }

  function renderLauncher() {
    var btn = el('button', {
      class: 'ms-chat-launcher',
      type: 'button',
      'aria-label': 'Open chat — can I help you?',
      html: ICON_CHAT,
      onclick: function () { if (state.messages.length) { state.view = 'chat'; render() } else { startChat() } },
    })
    rootEl.appendChild(btn)
  }

  function renderPrompt() {
    // Whole pill is one button so a tap anywhere starts the chat. The X
    // close-button is a sibling positioned absolutely; stopPropagation on
    // its click prevents the parent button from firing.
    var close = el('button', {
      class: 'ms-chat-prompt-close',
      type: 'button',
      'aria-label': 'Dismiss chat prompt',
      html: ICON_X,
      onclick: function (e) { e.stopPropagation(); state.view = 'launcher'; render() },
    })
    var promptText = el('span', { class: 'ms-chat-prompt-text' }, [TEXT.prompt])
    // Inline backgroundColor on the "Start Chat" pill ensures it paints
    // even if a host site's CSS clashes with the .ms-chat-prompt-btn rule.
    var startPill = el('span', {
      class: 'ms-chat-prompt-btn',
      style: 'background:#F60001;color:#fff;font-weight:900;font-size:14px;padding:6px 14px;border-radius:9999px;display:inline-block;',
    }, ['Start Chat →'])
    var col = el('span', { style: 'display:flex;flex-direction:column;align-items:flex-start' }, [promptText, startPill])
    var avatar = el('img', { class: 'ms-chat-prompt-avatar', src: AVATAR_URL, alt: '', 'aria-hidden': 'true' })
    var bubble = el('button', {
      class: 'ms-chat-prompt',
      type: 'button',
      'aria-label': 'Start chat — ' + TEXT.prompt,
      onclick: startChat,
    }, [close, col, avatar])
    rootEl.appendChild(bubble)
  }

  function renderPanel() {
    var panel = el('div', { class: 'ms-chat-panel', role: 'dialog', 'aria-label': 'Chat with Modern Storage' })

    // Header
    var headerAvatar = el('img', { class: 'ms-chat-header-avatar', src: AVATAR_URL, alt: '', 'aria-hidden': 'true' })
    var headerInfo = el('div', { class: 'ms-chat-header-info' }, [
      el('p', { class: 'ms-chat-header-name' }, [TEXT.agentName]),
      el('p', { class: 'ms-chat-header-sub' }, ['Typically replies in a moment']),
    ])
    var headerKids = [headerAvatar, headerInfo]
    if (state.step !== 'name' && state.step !== 'phone') {
      var menuBtn = el('button', { class: 'ms-chat-menu-btn', type: 'button', 'aria-label': 'Back to main menu', onclick: goHome })
      menuBtn.innerHTML = ICON_HOME + '<span>Menu</span>'
      headerKids.push(menuBtn)
    }
    headerKids.push(el('button', { class: 'ms-chat-icon-btn', type: 'button', 'aria-label': 'Close chat', html: ICON_X, onclick: closeChat }))
    panel.appendChild(el('div', { class: 'ms-chat-header' }, headerKids))

    // Scroll area
    var scroll = el('div', { class: 'ms-chat-scroll' })
    var lastUserIdx = -1
    for (var li = state.messages.length - 1; li >= 0; li--) { if (state.messages[li].role === 'user') { lastUserIdx = li; break } }

    state.messages.forEach(function (m, i) {
      var bubble = el('div', { class: 'ms-chat-bubble ' + m.role }, [m.text])
      if (m.links && m.links.length) {
        var linksWrap = el('div', { class: 'ms-chat-bubble-links' })
        m.links.forEach(function (l) {
          linksWrap.appendChild(el('a', { class: 'ms-chat-bubble-link', href: l.href, target: '_blank', rel: 'noopener noreferrer' }, [l.label + ' →']))
        })
        bubble.appendChild(linksWrap)
      }
      var row = el('div', { class: 'ms-chat-row ' + m.role }, [bubble])
      if (i === lastUserIdx) row.setAttribute('data-last-user', '1')
      scroll.appendChild(row)
    })

    if (state.options.length > 0) {
      if (state.menuCollapsed) {
        var toggle = el('button', { class: 'ms-chat-menu-toggle', type: 'button', onclick: function () { state.menuCollapsed = false; render() } })
        toggle.innerHTML = ICON_MENU + '<span>Show menu options</span>'
        scroll.appendChild(el('div', { style: 'padding-top:4px' }, [toggle]))
      } else {
        var optsWrap = el('div', { class: 'ms-chat-options' })
        state.options.forEach(function (o) {
          optsWrap.appendChild(el('button', { class: 'ms-chat-option', type: 'button', onclick: function () { handle(o.value, o.label, true) } }, [o.label]))
        })
        scroll.appendChild(optsWrap)
      }
    }

    panel.appendChild(scroll)

    // Quick actions
    if (state.step !== 'name' && state.step !== 'phone') {
      var quick = el('div', { class: 'ms-chat-quick' })
      var callBtn = el('a', { class: 'ms-chat-quick-call', href: TEXT.newCustomersTel })
      callBtn.innerHTML = ICON_PHONE + '<span>New Customers</span>'
      var tenantBtn = el('a', { class: 'ms-chat-quick-tenant', href: TEXT.existingTenantsUrl, target: '_blank', rel: 'noopener noreferrer' }, ['Existing Tenants →'])
      quick.appendChild(callBtn)
      quick.appendChild(tenantBtn)
      panel.appendChild(quick)
    }

    // Input form. On iOS, type="tel" opens the number pad which has NO
    // return/send key, so the user is stuck unless the visual send button
    // is unmistakable AND stays above the keyboard. We address both:
    //  • enterKeyHint hints the keyboard to label its return key "send"
    //    where applicable (does nothing on the number pad, harmless).
    //  • The send button below is larger now (44x44) so it lands above
    //    the standard iOS 44pt tap target threshold and stays visible.
    //  • A visualViewport listener (further down in boot) shrinks the
    //    panel max-height when the keyboard opens so the form never gets
    //    clipped behind the keyboard.
    var placeholder = state.step === 'name' ? 'Enter your name'
      : state.step === 'phone' ? TEXT.phonePlaceholder
        : state.step === 'message' ? 'Type your message…'
          : 'Type or pick an option…'
    var inputAttrs = {
      class: 'ms-chat-input',
      type: state.step === 'phone' ? 'tel' : 'text',
      placeholder: placeholder,
      'aria-label': placeholder,
      value: state.input,
      enterkeyhint: state.step === 'name' ? 'next' : 'send',
      autocomplete: state.step === 'phone' ? 'tel' : (state.step === 'name' ? 'given-name' : 'off'),
    }
    if (state.step === 'phone') inputAttrs.inputmode = 'tel'
    var input = el('input', inputAttrs)
    input.addEventListener('input', function (e) { state.input = e.target.value })
    var send = el('button', { class: 'ms-chat-send', type: 'submit', 'aria-label': 'Send', html: ICON_SEND })
    var form = el('form', { class: 'ms-chat-form', onsubmit: function (e) { e.preventDefault(); var v = String(input.value || '').trim(); if (!v) return; handle(v, v, false) } }, [input, send])
    panel.appendChild(form)

    rootEl.appendChild(panel)

    // Right-size the panel against the visual viewport in case the iOS
    // keyboard is already open when we render (the user re-focused the
    // input). Without this, the panel uses its default height and the
    // send button sits behind the keyboard.
    applyViewportHeight()

    // Pin most recent user message near top so the answer beneath it stays in view.
    setTimeout(function () {
      var lastUser = scroll.querySelector('[data-last-user="1"]')
      if (lastUser) {
        var offset = lastUser.getBoundingClientRect().top - scroll.getBoundingClientRect().top
        scroll.scrollTop += offset - 8
      } else {
        scroll.scrollTop = scroll.scrollHeight
      }
    }, 0)
  }

  // ────────────────────────────────────────────────────────────────────────
  // BOOT
  // ────────────────────────────────────────────────────────────────────────
  function refreshFaqs() {
    try {
      fetch(API_BASE + '/api/chat-faqs', { mode: 'cors' })
        .then(function (r) { return r.json() })
        .then(function (data) {
          if (data && data.ok && Array.isArray(data.faqs) && data.faqs.length > 0) {
            // Replace baked-in CHAT_FAQS so the matcher sees the latest
            // admin-approved Q&A — even if this widget bundle is months old.
            CHAT_FAQS = data.faqs
          }
        })
        .catch(function () { /* non-fatal, keep baked-in defaults */ })
    } catch (e) { /* fetch unavailable */ }
  }

  // Track the visual viewport so we can shrink the chat panel when the
  // iOS keyboard opens. Without this, the keyboard covers the bottom of
  // the panel — including the input row and the send button — leaving
  // the user unable to submit. Resizing the panel to fit ABOVE the
  // keyboard keeps the form visible and tappable.
  function applyViewportHeight() {
    if (!rootEl) return
    var vv = window.visualViewport
    if (!vv) return
    var panel = rootEl.querySelector('.ms-chat-panel')
    if (!panel) return
    // Available height = visual viewport minus a small buffer for the
    // bubble's bottom offset (96px on mobile per the CSS rule).
    var maxH = Math.max(280, vv.height - 96 - 16)
    panel.style.height = Math.min(544, maxH) + 'px'
  }

  function boot() {
    // Inject styles once.
    var style = document.createElement('style')
    style.setAttribute('data-ms-chat', '1')
    style.textContent = CSS
    document.head.appendChild(style)

    // Mount root.
    rootEl = document.createElement('div')
    rootEl.className = 'ms-chat'
    document.body.appendChild(rootEl)
    render()

    // visualViewport keyboard handling (iOS Safari, Android Chrome).
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', applyViewportHeight)
      window.visualViewport.addEventListener('scroll', applyViewportHeight)
    }

    // Pull the latest admin-managed FAQ list from the live API — keeps
    // every site loading the embed in sync with /admin/chatbot changes
    // without anyone redeploying the widget bundle.
    refreshFaqs()
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot)
  } else {
    boot()
  }
})()
