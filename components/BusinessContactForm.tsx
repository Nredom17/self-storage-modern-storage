'use client'

import { useState } from 'react'

type FormState = {
  name: string
  company: string
  email: string
  phone: string
  useCase: string
  location: string
  notes: string
  // Honeypot — visually hidden, real users leave empty.
  website: string
}

const INITIAL: FormState = {
  name: '',
  company: '',
  email: '',
  phone: '',
  useCase: '',
  location: '',
  notes: '',
  website: '',
}

const USE_CASES = [
  'E-commerce inventory',
  'Contractor tools and materials',
  'Restoration / disaster response',
  'Staging inventory',
  'Moving company overflow',
  'Document archive',
  'Other',
]

const LOCATIONS = [
  'Modern Storage® Riverdale (lead business location)',
  'Modern Storage® Shackleford',
  'Modern Storage® West Little Rock',
  'Modern Storage® North Little Rock',
  'Modern Storage® Maumelle Blvd',
  'Modern Storage® Bryant',
  'Modern Storage® Hot Springs',
  'Modern Storage® Bentonville',
  'Modern Storage® Springdale',
  'Modern Storage® Lowell',
  'Not sure — please recommend',
]

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function BusinessContactForm({ inboxEmail }: { inboxEmail: string }) {
  const [form, setForm] = useState<FormState>(INITIAL)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg(null)
    try {
      const res = await fetch('/api/business-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean
        error?: string
      }
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Could not send your inquiry. Please try again.')
      }
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Could not send your inquiry. Please try again.',
      )
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-white rounded-2xl p-8 border border-gray-200 text-center">
        <div className="w-12 h-12 rounded-full bg-modern-red/10 text-modern-red flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-black text-charcoal mb-2">Inquiry sent — we&apos;ll be in touch</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Your business storage inquiry has been delivered to the Modern Storage® team at{' '}
          <a href={`mailto:${inboxEmail}`} className="text-modern-red font-bold hover:underline">
            {inboxEmail}
          </a>
          . Expect a reply during business hours.
        </p>
      </div>
    )
  }

  const isSubmitting = status === 'submitting'

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-4"
      aria-label="Business storage inquiry form"
    >
      {/* Honeypot — visually hidden, real users never see or tab into this. */}
      <div className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden" aria-hidden="true">
        <label>
          Website (leave empty)
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(e) => update('website', e.target.value)}
          />
        </label>
      </div>

      <Field label="Name" required>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
          autoComplete="name"
          disabled={isSubmitting}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-modern-red focus:ring-2 focus:ring-modern-red/30 focus:outline-none text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
        />
      </Field>
      <Field label="Company">
        <input
          type="text"
          value={form.company}
          onChange={(e) => update('company', e.target.value)}
          autoComplete="organization"
          disabled={isSubmitting}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-modern-red focus:ring-2 focus:ring-modern-red/30 focus:outline-none text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
        />
      </Field>
      <Field label="Email" required>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
          autoComplete="email"
          disabled={isSubmitting}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-modern-red focus:ring-2 focus:ring-modern-red/30 focus:outline-none text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
        />
      </Field>
      <Field label="Phone">
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => update('phone', e.target.value)}
          autoComplete="tel"
          disabled={isSubmitting}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-modern-red focus:ring-2 focus:ring-modern-red/30 focus:outline-none text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
        />
      </Field>
      <Field label="Use case">
        <select
          value={form.useCase}
          onChange={(e) => update('useCase', e.target.value)}
          disabled={isSubmitting}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-modern-red focus:ring-2 focus:ring-modern-red/30 focus:outline-none text-sm bg-white disabled:bg-gray-50 disabled:cursor-not-allowed"
        >
          <option value="">Select a use case…</option>
          {USE_CASES.map((u) => (
            <option key={u} value={u}>{u}</option>
          ))}
        </select>
      </Field>
      <Field label="Preferred location">
        <select
          value={form.location}
          onChange={(e) => update('location', e.target.value)}
          disabled={isSubmitting}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-modern-red focus:ring-2 focus:ring-modern-red/30 focus:outline-none text-sm bg-white disabled:bg-gray-50 disabled:cursor-not-allowed"
        >
          <option value="">Select a location…</option>
          {LOCATIONS.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </Field>
      <div className="sm:col-span-2">
        <Field label="What do you need to store and roughly how much space?">
          <textarea
            value={form.notes}
            onChange={(e) => update('notes', e.target.value)}
            rows={4}
            disabled={isSubmitting}
            placeholder="e.g., ~400 sq ft for e-commerce inventory, weekly UPS pickups, occasional after-hours access"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-modern-red focus:ring-2 focus:ring-modern-red/30 focus:outline-none text-sm resize-y disabled:bg-gray-50 disabled:cursor-not-allowed"
          />
        </Field>
      </div>

      {status === 'error' && errorMsg && (
        <div
          role="alert"
          className="sm:col-span-2 bg-modern-red/5 border border-modern-red/30 rounded-lg p-4 text-sm text-charcoal"
        >
          <p className="font-bold text-modern-red mb-1">Couldn&apos;t send your inquiry</p>
          <p className="text-gray-700">{errorMsg}</p>
          <p className="text-gray-500 mt-2 text-xs">
            You can also email us directly at{' '}
            <a href={`mailto:${inboxEmail}`} className="text-modern-red font-bold hover:underline">
              {inboxEmail}
            </a>
            .
          </p>
        </div>
      )}

      <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
        <p className="text-xs text-gray-500">
          We&apos;ll reply with options at the Modern Storage® location that fits.
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-modern-red hover:bg-modern-red-hover disabled:bg-modern-red/60 disabled:cursor-wait text-white font-black px-7 py-3 rounded-full transition-colors text-sm inline-flex items-center justify-center gap-2 shrink-0"
        >
          {isSubmitting ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="4" />
                <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
              Sending…
            </>
          ) : (
            <>
              Send Business Inquiry
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </>
          )}
        </button>
      </div>
    </form>
  )
}

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="block text-xs font-black uppercase tracking-widest text-charcoal mb-1.5">
        {label}{required ? <span className="text-modern-red"> *</span> : null}
      </span>
      {children}
    </label>
  )
}
