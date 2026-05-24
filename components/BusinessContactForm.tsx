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
}

const INITIAL: FormState = {
  name: '',
  company: '',
  email: '',
  phone: '',
  useCase: '',
  location: '',
  notes: '',
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
  'Modern Storage® Maumelle',
  'Modern Storage® Bryant',
  'Modern Storage® Hot Springs',
  'Modern Storage® Bentonville',
  'Modern Storage® Springdale',
  'Modern Storage® Lowell',
  'Not sure — please recommend',
]

export default function BusinessContactForm({ inboxEmail }: { inboxEmail: string }) {
  const [form, setForm] = useState<FormState>(INITIAL)
  const [submitted, setSubmitted] = useState(false)

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const subject = `Business Storage Inquiry — ${form.company || form.name || 'New lead'}`
    const lines = [
      `Name: ${form.name}`,
      `Company: ${form.company}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Use case: ${form.useCase}`,
      `Preferred location: ${form.location}`,
      '',
      'Notes:',
      form.notes,
    ].join('\n')
    const href = `mailto:${inboxEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines)}`
    window.location.href = href
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-gray-200 text-center">
        <div className="w-12 h-12 rounded-full bg-modern-red/10 text-modern-red flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-black text-charcoal mb-2">Thanks — your email client should be opening</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          If nothing opens, email <a href={`mailto:${inboxEmail}`} className="text-modern-red font-bold hover:underline">{inboxEmail}</a> directly and we&apos;ll get back to you with options.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-4"
      aria-label="Business storage inquiry form"
    >
      <Field label="Name" required>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
          autoComplete="name"
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-modern-red focus:ring-2 focus:ring-modern-red/30 focus:outline-none text-sm"
        />
      </Field>
      <Field label="Company">
        <input
          type="text"
          value={form.company}
          onChange={(e) => update('company', e.target.value)}
          autoComplete="organization"
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-modern-red focus:ring-2 focus:ring-modern-red/30 focus:outline-none text-sm"
        />
      </Field>
      <Field label="Email" required>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
          autoComplete="email"
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-modern-red focus:ring-2 focus:ring-modern-red/30 focus:outline-none text-sm"
        />
      </Field>
      <Field label="Phone">
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => update('phone', e.target.value)}
          autoComplete="tel"
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-modern-red focus:ring-2 focus:ring-modern-red/30 focus:outline-none text-sm"
        />
      </Field>
      <Field label="Use case">
        <select
          value={form.useCase}
          onChange={(e) => update('useCase', e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-modern-red focus:ring-2 focus:ring-modern-red/30 focus:outline-none text-sm bg-white"
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
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-modern-red focus:ring-2 focus:ring-modern-red/30 focus:outline-none text-sm bg-white"
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
            placeholder="e.g., ~400 sq ft for e-commerce inventory, weekly UPS pickups, occasional after-hours access"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-modern-red focus:ring-2 focus:ring-modern-red/30 focus:outline-none text-sm resize-y"
          />
        </Field>
      </div>
      <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
        <p className="text-xs text-gray-500">
          Submitting opens your email client with the details pre-filled — we&apos;ll reply with options at the Modern Storage® location that fits.
        </p>
        <button
          type="submit"
          className="bg-modern-red hover:bg-modern-red-hover text-white font-black px-7 py-3 rounded-full transition-colors text-sm inline-flex items-center justify-center gap-2 shrink-0"
        >
          Send Business Inquiry
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
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
