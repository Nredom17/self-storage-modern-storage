'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  CHECKLIST_DATA,
  STORAGE_TYPES,
  UNIT_SIZES,
} from '@/lib/move-in-checklist'

// Lead-gate persistence key — once a customer has submitted their info, we
// don't ask again on this browser. They can clear localStorage to re-test.
const LEAD_STORAGE_KEY = 'modernstorage_checklist_lead_submitted_v1'

// Same set of Modern Storage® locations used elsewhere on the site, surfaced
// as an optional preferred-facility dropdown on the lead form. Kept inline
// here so we don't have to import the full LOCATIONS object client-side.
const FACILITY_OPTIONS = [
  'Not sure yet',
  'Modern Storage® Riverdale (Little Rock)',
  'Modern Storage® Shackleford (Little Rock)',
  'Modern Storage® West Little Rock',
  'Modern Storage® North Little Rock',
  'Modern Storage® Maumelle Blvd',
  'Modern Storage® Bryant',
  'Modern Storage® Hot Springs',
  'Modern Storage® Bentonville',
  'Modern Storage® Springdale',
  'Modern Storage® Lowell',
]

// ─── ANALYTICS ───────────────────────────────────────────────────────────────
// Fires window.gtag if GA4 is installed; no-op otherwise. Centralized so the
// four events follow the same shape and we can swap providers later.
type GtagFn = (...args: unknown[]) => void
function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return
  const w = window as unknown as { gtag?: GtagFn }
  if (typeof w.gtag === 'function') {
    w.gtag('event', event, params)
  }
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function formatDate(dateStr: string): string | null {
  if (!dateStr) return null
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

const RESERVE_HREF = 'https://modernstorage.com'

// ─── STEP DOTS ───────────────────────────────────────────────────────────────
function StepDots({ current, total }: { current: number; total: number }) {
  return (
    <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 24 }}>
      {[...Array(total)].map((_, i) => (
        <div
          key={i}
          style={{
            width: i === current ? 20 : 7,
            height: 7,
            borderRadius: 99,
            background: i === current ? '#F60001' : i < current ? '#1A1A1A' : '#DDD',
            transition: 'all 0.3s',
          }}
        />
      ))}
    </div>
  )
}

// ─── BACK / NEXT ─────────────────────────────────────────────────────────────
function BackNext({
  onBack,
  onNext,
  nextLabel = 'Next →',
  nextDisabled = false,
}: {
  onBack?: () => void
  onNext: () => void
  nextLabel?: string
  nextDisabled?: boolean
}) {
  return (
    <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
      {onBack && (
        <button
          onClick={onBack}
          style={{
            flex: 1,
            background: 'transparent',
            border: '2px solid #E0E0E0',
            borderRadius: 14,
            padding: '14px',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 600,
            color: '#aaa',
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          ← Back
        </button>
      )}
      <button
        disabled={nextDisabled}
        onClick={onNext}
        style={{
          flex: 2,
          background: nextDisabled ? '#EEE' : '#F60001',
          border: 'none',
          borderRadius: 14,
          padding: '14px',
          color: nextDisabled ? '#bbb' : '#fff',
          fontFamily: "'Bebas Neue', cursive",
          fontSize: 20,
          letterSpacing: '0.08em',
          cursor: nextDisabled ? 'default' : 'pointer',
          transition: 'background 0.2s',
        }}
        onMouseEnter={(e) => {
          if (!nextDisabled) e.currentTarget.style.background = '#C40001'
        }}
        onMouseLeave={(e) => {
          if (!nextDisabled) e.currentTarget.style.background = '#F60001'
        }}
      >
        {nextLabel}
      </button>
    </div>
  )
}

// ─── LEAD GATE FORM ──────────────────────────────────────────────────────────
function ChecklistLeadGate({
  context,
  onSubmitted,
  onCancel,
}: {
  context: { checklistType: string; unitSize: string; moveDate: string }
  onSubmitted: () => void
  onCancel: () => void
}) {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [zip, setZip] = useState('')
  const [phone, setPhone] = useState('')
  const [facility, setFacility] = useState('')
  const [consent, setConsent] = useState(false)
  const [website, setWebsite] = useState('') // honeypot
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const submitting = status === 'submitting'

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg(null)
    try {
      const res = await fetch('/api/checklist-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          email,
          zip,
          phone,
          facility,
          consent,
          website,
          checklistType: context.checklistType,
          unitSize: context.unitSize,
          moveDate: context.moveDate,
          source:
            typeof window !== 'undefined'
              ? window.location.pathname + window.location.search
              : '/move-in-checklist',
        }),
      })
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string }
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Could not save your info. Please try again.')
      }
      track('checklist_lead_submit', {
        checklistType: context.checklistType,
        unitSize: context.unitSize,
        hasPhone: Boolean(phone),
        hasFacility: Boolean(facility),
      })
      onSubmitted()
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Could not save your info.')
      track('checklist_lead_submit_error')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    boxSizing: 'border-box',
    border: '2px solid #E8E8E8',
    borderRadius: 10,
    padding: '11px 12px',
    fontSize: 14,
    fontFamily: "'DM Sans', sans-serif",
    color: '#1A1A1A',
    background: '#fff',
    outline: 'none',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: 11,
    fontWeight: 700,
    color: '#1A1A1A',
    fontFamily: "'DM Sans', sans-serif",
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    marginBottom: 5,
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-label="Save and print my Modern Storage® move-in checklist"
      style={{
        background: '#fff',
        border: '2px solid #1A1A1A',
        borderRadius: 16,
        padding: '18px',
        marginBottom: 16,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Honeypot — visually hidden, real users never see or tab into this. */}
      <div
        style={{ position: 'absolute', left: -9999, top: 'auto', width: 1, height: 1, overflow: 'hidden' }}
        aria-hidden="true"
      >
        <label>
          Website (leave empty)
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </label>
      </div>

      <div
        style={{
          fontFamily: "'Bebas Neue', cursive",
          fontSize: 11,
          letterSpacing: '0.18em',
          color: '#F60001',
          marginBottom: 4,
        }}
      >
        ALMOST THERE
      </div>
      <div
        style={{
          fontFamily: "'Bebas Neue', cursive",
          fontSize: 22,
          color: '#1A1A1A',
          lineHeight: 1.1,
          marginBottom: 6,
        }}
      >
        Save and print your checklist
      </div>
      <p style={{ fontSize: 12, color: '#666', lineHeight: 1.5, marginBottom: 16 }}>
        We&apos;ll email you a copy of your personalized checklist and unlock the
        print / save-as-PDF version below.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
        <label>
          <span style={labelStyle}>First name *</span>
          <input
            type="text"
            required
            disabled={submitting}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            autoComplete="given-name"
            style={inputStyle}
          />
        </label>
        <label>
          <span style={labelStyle}>ZIP code *</span>
          <input
            type="text"
            required
            disabled={submitting}
            inputMode="numeric"
            maxLength={10}
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            autoComplete="postal-code"
            style={inputStyle}
          />
        </label>
      </div>
      <label style={{ display: 'block', marginBottom: 10 }}>
        <span style={labelStyle}>Email *</span>
        <input
          type="email"
          required
          disabled={submitting}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          style={inputStyle}
        />
      </label>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
        <label>
          <span style={labelStyle}>Phone (optional)</span>
          <input
            type="tel"
            disabled={submitting}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
            style={inputStyle}
          />
        </label>
        <label>
          <span style={labelStyle}>Preferred facility (optional)</span>
          <select
            disabled={submitting}
            value={facility}
            onChange={(e) => setFacility(e.target.value)}
            style={{ ...inputStyle, background: '#fff' }}
          >
            <option value="">Select…</option>
            {FACILITY_OPTIONS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 10,
          padding: '10px 12px',
          background: '#F7F7F7',
          borderRadius: 10,
          marginBottom: 14,
          cursor: 'pointer',
        }}
      >
        <input
          type="checkbox"
          required
          disabled={submitting}
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          style={{ marginTop: 3, width: 16, height: 16, accentColor: '#F60001' }}
        />
        <span style={{ fontSize: 12, lineHeight: 1.4, color: '#1A1A1A' }}>
          I agree to receive storage tips, offers, and follow-up messages from Modern Storage®.
        </span>
      </label>

      {status === 'error' && errorMsg && (
        <div
          role="alert"
          style={{
            background: '#FEF2F2',
            border: '1px solid #F60001',
            borderRadius: 10,
            padding: '10px 12px',
            marginBottom: 12,
            fontSize: 12,
            color: '#1A1A1A',
          }}
        >
          <strong style={{ color: '#F60001' }}>Hmm — </strong>
          {errorMsg}
        </div>
      )}

      <div style={{ display: 'flex', gap: 10 }}>
        <button
          type="button"
          onClick={onCancel}
          disabled={submitting}
          style={{
            flex: 1,
            background: 'transparent',
            border: '2px solid #E0E0E0',
            borderRadius: 12,
            padding: '13px',
            cursor: submitting ? 'wait' : 'pointer',
            fontSize: 13,
            fontWeight: 600,
            color: '#888',
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          style={{
            flex: 2,
            background: submitting ? '#F60001AA' : '#F60001',
            border: 'none',
            borderRadius: 12,
            padding: '13px',
            color: '#fff',
            fontFamily: "'Bebas Neue', cursive",
            fontSize: 18,
            letterSpacing: '0.08em',
            cursor: submitting ? 'wait' : 'pointer',
          }}
        >
          {submitting ? 'Sending…' : 'Email me my printable checklist →'}
        </button>
      </div>
    </form>
  )
}

// ─── CHECKLIST VIEW ──────────────────────────────────────────────────────────
function ChecklistView({
  type,
  unitSize,
  moveDate,
  onReset,
}: {
  type: string
  unitSize: string
  moveDate: string
  onReset: () => void
}) {
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const checklist = CHECKLIST_DATA[type] || CHECKLIST_DATA.household
  const typeLabel = STORAGE_TYPES.find((t) => t.id === type)?.label || 'Storage'
  const unitLabel = UNIT_SIZES.find((u) => u.id === unitSize)?.label || unitSize
  const formattedDate = formatDate(moveDate)

  // Lead gate: only unlock window.print() once the user has submitted name +
  // email + zip + consent. Persisted in localStorage so a returning visitor
  // doesn't have to refill the form.
  const [leadSubmitted, setLeadSubmitted] = useState(false)
  const [showLeadForm, setShowLeadForm] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      if (window.localStorage.getItem(LEAD_STORAGE_KEY) === 'true') {
        setLeadSubmitted(true)
      }
    } catch {
      /* localStorage blocked or unavailable — fall through, user will refill */
    }
  }, [])

  const allItems = Object.values(checklist).flat()
  const doneCount = Object.values(checked).filter(Boolean).length
  // Guard against divide-by-zero if a checklist ends up empty for any reason.
  const pct = allItems.length ? Math.round((doneCount / allItems.length) * 100) : 0

  const toggleItem = (key: string) => {
    setChecked((prev) => {
      const next = { ...prev, [key]: !prev[key] }
      const newDone = Object.values(next).filter(Boolean).length
      // Fire a single completion event the first time the user hits 100%.
      if (allItems.length && newDone === allItems.length && doneCount < allItems.length) {
        track('checklist_completed', { type, unitSize, totalItems: allItems.length })
      }
      return next
    })
  }

  // Browser-native print, gated on the lead form. window.print() is the only
  // path to PDF here and we hard-block it server-of-truth: if the lead hasn't
  // been captured yet, the call is a no-op regardless of how the UI is
  // manipulated, so the gate can't be bypassed by enabling the hidden button
  // via devtools.
  const handlePrint = () => {
    if (!leadSubmitted) {
      // Open the form instead of firing print. Belt-and-suspenders — the
      // button shouldn't even be visible when leadSubmitted=false, but if
      // someone manipulates state, print still won't fire.
      setShowLeadForm(true)
      return
    }
    track('checklist_print', {
      type,
      unitSize,
      hasMoveDate: Boolean(moveDate),
      doneCount,
      totalItems: allItems.length,
    })
    if (typeof window !== 'undefined') {
      window.print()
    }
  }

  // Called when the lead form POSTs to /api/checklist-lead successfully.
  // Persists the unlock flag and immediately triggers the browser print
  // dialog so the customer doesn't have to click again.
  const handleLeadSubmitted = () => {
    setLeadSubmitted(true)
    setShowLeadForm(false)
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(LEAD_STORAGE_KEY, 'true')
      }
    } catch {
      /* localStorage blocked — that's fine, the in-memory unlock still works
       * for this session. */
    }
    track('checklist_print', {
      type,
      unitSize,
      hasMoveDate: Boolean(moveDate),
      doneCount,
      totalItems: allItems.length,
      autoTriggered: true,
    })
    // Tiny delay so React paints the unlocked state before the print dialog
    // takes over (avoids printing a half-rendered state on slow devices).
    if (typeof window !== 'undefined') {
      setTimeout(() => window.print(), 250)
    }
  }

  return (
    <div className="checklist-print-area">
      {/* Print-only header — hidden on screen, only renders in the printout.
       * Gives the printed sheet a clear Modern Storage® brand line plus the
       * customer's unit/type/date so it's a useful artifact on its own. */}
      <div
        className="print-only"
        style={{
          marginBottom: 16,
          paddingBottom: 12,
          borderBottom: '2px solid #F60001',
        }}
      >
        <div
          style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: 14,
            letterSpacing: '0.18em',
            color: '#F60001',
          }}
        >
          MODERN STORAGE®
        </div>
        <div
          style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: 28,
            color: '#1A1A1A',
            lineHeight: 1,
            margin: '4px 0',
          }}
        >
          Move-In Checklist
        </div>
        <div style={{ fontSize: 12, color: '#555' }}>
          {unitLabel} unit · {typeLabel}
          {formattedDate ? ` · Move-in: ${formattedDate}` : ''}
        </div>
        <div style={{ fontSize: 10, color: '#999', marginTop: 4 }}>
          Generated at self-storage.modernstorage.com/move-in-checklist
        </div>
      </div>

      {/* Print / lead-gate UI — three states:
       *   1. Lead NOT submitted, form NOT open: "Save and Print" button
       *      that opens the inline lead form.
       *   2. Lead NOT submitted, form IS open: the inline lead form.
       *   3. Lead submitted: unlocked Print/PDF button + "saved" confirmation.
       * All wrapped in .print-hide so none of this UI appears in the
       * printout itself. */}
      <div className="print-hide" style={{ marginBottom: 16 }}>
        {!leadSubmitted && !showLeadForm && (
          <button
            type="button"
            onClick={() => {
              setShowLeadForm(true)
              track('checklist_lead_form_shown', { type, unitSize })
            }}
            style={{
              width: '100%',
              background: '#1A1A1A',
              border: '2px solid #1A1A1A',
              borderRadius: 14,
              padding: '14px',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 700,
              color: '#fff',
              fontFamily: "'DM Sans', sans-serif",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#333')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#1A1A1A')}
            aria-label="Save your information and print the checklist"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M6 9V2h12v7" />
              <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" rx="1" />
            </svg>
            Save and print my checklist
          </button>
        )}

        {!leadSubmitted && showLeadForm && (
          <ChecklistLeadGate
            context={{ checklistType: type, unitSize, moveDate }}
            onSubmitted={handleLeadSubmitted}
            onCancel={() => setShowLeadForm(false)}
          />
        )}

        {leadSubmitted && (
          <div>
            <button
              type="button"
              onClick={handlePrint}
              style={{
                width: '100%',
                background: '#fff',
                border: '2px solid #1A1A1A',
                borderRadius: 14,
                padding: '14px',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 700,
                color: '#1A1A1A',
                fontFamily: "'DM Sans', sans-serif",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1A1A1A'
                e.currentTarget.style.color = '#fff'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#fff'
                e.currentTarget.style.color = '#1A1A1A'
              }}
              aria-label="Print or save the checklist as a PDF"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M6 9V2h12v7" />
                <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" rx="1" />
              </svg>
              Print or Save as PDF
            </button>
            <p
              style={{
                fontSize: 11,
                color: '#22c55e',
                marginTop: 6,
                fontFamily: "'DM Sans', sans-serif",
                textAlign: 'center',
              }}
            >
              ✓ Your info is saved — print as many times as you need.
            </p>
          </div>
        )}
      </div>

      {/* Summary card (screen). Print version is restyled by globals.css. */}
      <div
        className="checklist-print-summary"
        style={{
          background: '#1A1A1A',
          borderRadius: 20,
          padding: '20px',
          marginBottom: 20,
          border: '2px solid #F60001',
        }}
      >
        <div
          className="checklist-print-eyebrow"
          style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: 11,
            letterSpacing: '0.18em',
            color: '#F60001',
            marginBottom: 4,
          }}
        >
          YOUR PERSONALIZED CHECKLIST
        </div>
        <div
          style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: 32,
            color: '#fff',
            lineHeight: 1,
            marginBottom: 2,
          }}
        >
          {unitLabel} Unit — {typeLabel}
        </div>
        {formattedDate && (
          <div
            style={{
              fontSize: 12,
              color: '#888',
              marginBottom: 14,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Move-in: {formattedDate}
          </div>
        )}

        <div
          className="checklist-print-progress-track"
          style={{
            background: '#333',
            borderRadius: 99,
            height: 8,
            overflow: 'hidden',
            marginBottom: 6,
            marginTop: 12,
          }}
        >
          <div
            className="checklist-print-progress-fill"
            style={{
              width: `${pct}%`,
              height: '100%',
              borderRadius: 99,
              background: pct === 100 ? '#22c55e' : '#F60001',
              transition: 'width 0.4s ease',
            }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
          }}
        >
          <span style={{ color: '#666' }}>
            {doneCount} of {allItems.length} complete
          </span>
          <span style={{ color: pct === 100 ? '#22c55e' : '#F60001', fontWeight: 700 }}>
            {pct}%
          </span>
        </div>
      </div>

      {/* Sections */}
      {Object.entries(checklist).map(([section, items]) => (
        <div key={section} className="checklist-print-section" style={{ marginBottom: 20 }}>
          <div
            className="checklist-print-section-title"
            style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: 16,
              letterSpacing: '0.1em',
              color: '#1A1A1A',
              borderBottom: '2px solid #F60001',
              paddingBottom: 6,
              marginBottom: 12,
            }}
          >
            {section}
          </div>
          <div className="checklist-print-items" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {items.map((item, i) => {
              const key = `${section}-${i}`
              const done = checked[key]
              return (
                <button
                  key={key}
                  onClick={() => toggleItem(key)}
                  className="checklist-print-item"
                  style={{
                    background: done ? '#F0FDF4' : '#fff',
                    border: done ? '2px solid #22c55e' : '2px solid #E8E8E8',
                    borderRadius: 12,
                    padding: '12px 14px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 12,
                    transition: 'all 0.15s',
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  <div
                    className={
                      'checklist-print-checkbox' + (done ? ' checklist-print-checkbox--done' : '')
                    }
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 6,
                      flexShrink: 0,
                      background: done ? '#22c55e' : '#F0F0F0',
                      border: done ? '2px solid #22c55e' : '2px solid #D0D0D0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 1,
                      transition: 'all 0.15s',
                    }}
                  >
                    {done && (
                      <span style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>✓</span>
                    )}
                  </div>
                  <span
                    className="checklist-print-item-text"
                    style={{
                      fontSize: 14,
                      lineHeight: 1.45,
                      color: done ? '#666' : '#1A1A1A',
                      textDecoration: done ? 'line-through' : 'none',
                      transition: 'all 0.15s',
                    }}
                  >
                    {item}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      ))}

      {/* CTA block — hidden in print */}
      <div
        className="print-hide"
        style={{
          background: '#1A1A1A',
          borderRadius: 20,
          padding: '20px',
          marginTop: 8,
          marginBottom: 12,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: 20,
            color: '#fff',
            marginBottom: 4,
          }}
        >
          Ready to reserve your unit?
        </div>
        <div
          style={{
            fontSize: 13,
            color: '#777',
            marginBottom: 16,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Lock in your {unitLabel} today before it&apos;s gone.
        </div>
        <a
          href={RESERVE_HREF}
          onClick={() =>
            track('checklist_reserve_click', { type, unitSize, doneCount, totalItems: allItems.length })
          }
          style={{
            display: 'block',
            textDecoration: 'none',
            width: '100%',
            boxSizing: 'border-box',
            background: '#F60001',
            border: 'none',
            borderRadius: 12,
            padding: '16px',
            color: '#fff',
            fontFamily: "'Bebas Neue', cursive",
            fontSize: 20,
            letterSpacing: '0.08em',
            cursor: 'pointer',
            textAlign: 'center',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#C40001')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#F60001')}
        >
          Reserve Your {unitLabel} — Modern Storage®
        </a>
      </div>

      {/* Start over — hidden in print */}
      <button
        type="button"
        onClick={onReset}
        className="print-hide"
        style={{
          width: '100%',
          background: 'transparent',
          border: '2px solid #E0E0E0',
          borderRadius: 12,
          padding: '12px',
          cursor: 'pointer',
          fontSize: 13,
          fontWeight: 600,
          color: '#aaa',
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        Start over
      </button>
    </div>
  )
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
export default function MoveInChecklist() {
  const [step, setStep] = useState(0)
  const [storageType, setStorageType] = useState<string | null>(null)
  const [unitSize, setUnitSize] = useState<string | null>(null)
  const [moveDate, setMoveDate] = useState('')
  const [startedFired, setStartedFired] = useState(false)

  const reset = () => {
    setStep(0)
    setStorageType(null)
    setUnitSize(null)
    setMoveDate('')
  }

  const selectStorageType = (id: string) => {
    setStorageType(id)
    if (!startedFired) {
      track('checklist_started', { entry_point: 'storage_type' })
      setStartedFired(true)
    }
  }

  const buildChecklist = () => {
    setStep(3)
    track('checklist_built', { type: storageType, unitSize, hasMoveDate: Boolean(moveDate) })
  }

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', fontFamily: "'DM Sans', sans-serif" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div style={{ background: '#FAFAFA', borderRadius: 24, padding: '20px 20px 28px', border: '1px solid #E8E8E8' }}>
        {/* Step 0: Storage type */}
        {step === 0 && (
          <div>
            <StepDots current={0} total={3} />
            <div
              style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: 22,
                color: '#1A1A1A',
                marginBottom: 6,
                letterSpacing: '0.04em',
              }}
            >
              What are you storing?
            </div>
            <div style={{ fontSize: 13, color: '#888', marginBottom: 18 }}>
              Pick the closest match.
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {STORAGE_TYPES.map((opt) => {
                const active = storageType === opt.id
                return (
                  <button
                    key={opt.id}
                    onClick={() => selectStorageType(opt.id)}
                    style={{
                      background: active ? '#1A1A1A' : '#fff',
                      border: active ? '2px solid #F60001' : '2px solid #E8E8E8',
                      borderRadius: 16,
                      padding: '18px 14px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.18s',
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    <div style={{ fontSize: 28, marginBottom: 8 }}>{opt.icon}</div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: active ? '#fff' : '#1A1A1A',
                      }}
                    >
                      {opt.label}
                    </div>
                  </button>
                )
              })}
            </div>
            <BackNext onNext={() => setStep(1)} nextDisabled={!storageType} />
          </div>
        )}

        {/* Step 1: Unit size */}
        {step === 1 && (
          <div>
            <StepDots current={1} total={3} />
            <div
              style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: 22,
                color: '#1A1A1A',
                marginBottom: 6,
                letterSpacing: '0.04em',
              }}
            >
              What size is your unit?
            </div>
            <div style={{ fontSize: 13, color: '#888', marginBottom: 18 }}>
              Not sure?{' '}
              <Link
                href="/ai-storage-size-finder"
                style={{ color: '#F60001', fontWeight: 600, textDecoration: 'none' }}
              >
                Use our size finder.
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {UNIT_SIZES.map((u) => {
                const active = unitSize === u.id
                return (
                  <button
                    key={u.id}
                    onClick={() => setUnitSize(u.id)}
                    style={{
                      background: active ? '#1A1A1A' : '#fff',
                      border: active ? '2px solid #F60001' : '2px solid #E8E8E8',
                      borderRadius: 16,
                      padding: '16px 14px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.18s',
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Bebas Neue', cursive",
                        fontSize: 26,
                        color: active ? '#F60001' : '#1A1A1A',
                        lineHeight: 1,
                        marginBottom: 4,
                      }}
                    >
                      {u.label}
                    </div>
                    <div style={{ fontSize: 11, color: active ? '#aaa' : '#999' }}>{u.sub}</div>
                  </button>
                )
              })}
            </div>
            <BackNext
              onBack={() => setStep(0)}
              onNext={() => setStep(2)}
              nextDisabled={!unitSize}
            />
          </div>
        )}

        {/* Step 2: Move date */}
        {step === 2 && (
          <div>
            <StepDots current={2} total={3} />
            <div
              style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: 22,
                color: '#1A1A1A',
                marginBottom: 6,
                letterSpacing: '0.04em',
              }}
            >
              When are you moving in?
            </div>
            <div style={{ fontSize: 13, color: '#888', marginBottom: 18 }}>
              Optional. Adds your date to the checklist.
            </div>
            <input
              type="date"
              value={moveDate}
              onChange={(e) => setMoveDate(e.target.value)}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                border: '2px solid #E8E8E8',
                borderRadius: 14,
                padding: '16px',
                fontSize: 16,
                fontFamily: "'DM Sans', sans-serif",
                color: '#1A1A1A',
                background: '#fff',
                outline: 'none',
              }}
            />
            <div style={{ marginTop: 10 }}>
              <button
                onClick={buildChecklist}
                style={{
                  width: '100%',
                  background: '#888',
                  border: 'none',
                  borderRadius: 14,
                  padding: '12px',
                  color: '#fff',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Skip — build my checklist
              </button>
            </div>
            <BackNext
              onBack={() => setStep(1)}
              onNext={buildChecklist}
              nextLabel="Build My Checklist →"
            />
          </div>
        )}

        {/* Step 3: Checklist */}
        {step === 3 && storageType && unitSize && (
          <ChecklistView
            type={storageType}
            unitSize={unitSize}
            moveDate={moveDate}
            onReset={reset}
          />
        )}
      </div>
    </div>
  )
}
