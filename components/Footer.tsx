import Link from 'next/link'

const STORAGE_OPTIONS = [
  { label: 'Climate-Controlled Storage', href: '/climate-controlled' },
  { label: 'Household Storage', href: '/household-moving' },
  { label: 'Boat and RV Storage', href: '/boat-rv-vehicle' },
  { label: 'Business Storage', href: '/business' },
]

const LOCATIONS = [
  { label: 'Little Rock', href: '/#locations' },
  { label: 'North Little Rock', href: '/#locations' },
  { label: 'Bentonville', href: '/#locations' },
  { label: 'Springdale', href: '/#locations' },
  { label: 'Hot Springs', href: '/#locations' },
  { label: 'Bryant', href: '/#locations' },
  { label: 'Maumelle', href: '/#locations' },
  { label: 'Lowell', href: '/#locations' },
]

const RESOURCES = [
  { label: 'Size Guide', href: '/#size-guide' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Free Moving Truck', href: '/#moving-truck' },
  { label: 'Storage Tips', href: 'https://www.modernstorage.com/blog' },
]

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/modern.storage' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@modernstorage' },
  { label: 'Facebook', href: 'https://www.facebook.com/modernstorage' },
]

export default function Footer({
  phoneDisplay,
  phoneHref,
}: {
  phoneDisplay: string
  phoneHref: string
}) {
  const PHONE_NUMBER_DISPLAY = phoneDisplay
  const PHONE_NUMBER_HREF = phoneHref
  return (
    <footer className="bg-charcoal text-white border-t border-white/10 mt-20">
      {/* Top CTA strip */}
      <div className="border-b border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-lg font-black text-white">Ready to find your storage unit?</p>
            <p className="text-sm text-gray-400 mt-0.5">Reserve online in minutes or talk to our team.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/#locations"
              className="bg-modern-red hover:bg-modern-red-hover text-white text-sm font-bold px-5 py-2.5 rounded-full transition-colors"
            >
              Find a Unit Near You
            </Link>
            <a
              href={PHONE_NUMBER_HREF}
              className="bg-white/10 hover:bg-white/20 text-white text-sm font-bold px-5 py-2.5 rounded-full transition-colors border border-white/20"
            >
              Call {PHONE_NUMBER_DISPLAY}
            </a>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand column */}
          <div className="md:col-span-4">
            <Link href="/" className="inline-block mb-5 leading-none">
              <span className="font-bebas text-modern-red text-2xl tracking-wide leading-none">
                MODERN STORAGE® Self Storage
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Clean, convenient self-storage units across Arkansas — climate-controlled, household, business, boat, RV, and vehicle storage.
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-5">
              {SOCIAL_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-500 hover:text-modern-red transition-colors font-medium"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Storage Options */}
          <div className="md:col-span-2">
            <h2 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-5">Storage Options</h2>
            <nav className="flex flex-col gap-3">
              {STORAGE_OPTIONS.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Locations */}
          <div className="md:col-span-2">
            <h2 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-5">Locations</h2>
            <nav className="flex flex-col gap-3">
              {LOCATIONS.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Resources */}
          <div className="md:col-span-2">
            <h2 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-5">Resources</h2>
            <nav className="flex flex-col gap-3">
              {RESOURCES.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="md:col-span-2">
            <h2 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-5">Contact</h2>
            <nav className="flex flex-col gap-3">
              <a
                href={PHONE_NUMBER_HREF}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {PHONE_NUMBER_DISPLAY}
              </a>
              <Link
                href="/#locations"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Reserve online
              </Link>
              <a
                href="https://www.modernstorage.com/pay"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Pay bill
              </a>
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} Modern Storage®. All rights reserved.
          </p>
          <p className="text-xs text-gray-700">
            Self-storage facilities serving Arkansas.
          </p>
        </div>
      </div>
    </footer>
  )
}
