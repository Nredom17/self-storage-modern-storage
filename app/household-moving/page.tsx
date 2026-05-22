import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Household Storage & Moving in Arkansas',
  description:
    'Household self-storage for moving, downsizing, renovating, seasonal items, and life transitions. Free moving truck with new rentals at participating Modern Storage locations.',
  alternates: { canonical: SITE_URL + '/household-moving' },
}

export default function HouseholdMovingPage() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-20">
      <Link href="/" className="text-sm font-bold text-modern-red hover:text-modern-red-hover transition-colors">
        ← Back to all storage options
      </Link>
      <h1 className="text-4xl lg:text-5xl font-black text-charcoal tracking-tight mt-6 mb-4">
        Household Storage &amp; Moving in Arkansas
      </h1>
      <p className="text-gray-600 text-lg leading-relaxed">
        Page content coming soon. In the meantime, return to the{' '}
        <Link href="/" className="text-modern-red font-bold hover:underline">
          Modern Storage hub
        </Link>{' '}
        to find a location near you.
      </p>
    </section>
  )
}
