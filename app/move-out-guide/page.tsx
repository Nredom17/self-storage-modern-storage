// Move-Out Guide — Phase 3 SEO/AEO gap page.
//
// Section 8 of Alexandra's SEO/AEO plan flagged the storage move-out
// process as a competitor weak point: most operators bury the
// closeout flow behind a phone call, and customers fear surprise
// fees. Publishing an honest, step-by-step move-out walkthrough is
// both a brand trust signal and a direct AEO target for "how to
// move out of storage" / "storage move-out fees" / "storage
// closeout process" searches.
//
// Page intentionally lean. No marketing fluff — just the honest
// step-by-step, the fee disclosure, and the FAQ. Customers reading
// this are at the END of their rental, not shopping for one.

import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/site'
import { getSiteSettings } from '@/lib/data'
import FaqAccordion from '@/components/FaqAccordion'

export const revalidate = 60

const PAGE_PATH = '/move-out-guide'

export const metadata: Metadata = {
  title: {
    absolute: 'Storage Unit Move-Out Guide | No Surprise Fees | Modern Storage®',
  },
  description:
    'How to close out a Modern Storage® storage unit, step by step. No move-out fee, no early-termination penalty, no cleaning fee for normal use. Written notice, clean out, remove your lock — done.',
  alternates: { canonical: SITE_URL + PAGE_PATH },
  openGraph: {
    title: 'Storage Unit Move-Out Guide | Modern Storage®',
    description:
      'Honest step-by-step move-out process for Modern Storage® tenants — no surprise fees, no early-termination penalty.',
    url: SITE_URL + PAGE_PATH,
    siteName: 'Modern Storage®',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Storage Unit Move-Out Guide | Modern Storage®',
    description: 'Step-by-step move-out — no surprise fees.',
  },
}

// ── Move-out steps. Five concrete actions, ordered. Each step has a
// title, the action to take, and "what to expect" so the customer
// knows what counts as done. ───────────────────────────────────────
type Step = {
  number: string
  title: string
  action: string
  expect: string
}

const STEPS: Step[] = [
  {
    number: '01',
    title: 'Give written notice',
    action:
      'Email or call your local Modern Storage® facility and let the team know your planned move-out date. Most leases ask for written notice before the end of your current billing cycle — confirm the specific notice window in your rental agreement.',
    expect:
      'You\'ll get a confirmation that your notice is on file, plus the date your unit needs to be cleared by to avoid the next month\'s rent posting.',
  },
  {
    number: '02',
    title: 'Schedule your final visit',
    action:
      'Pick a day to come clear the unit. The facility doesn\'t require an appointment for move-out — gated tenant access (6:00 AM to 10:00 PM, every day) lets you handle it on your schedule. If you want the on-site team to walk through with you, drop by during office hours instead.',
    expect:
      'You\'ll plan around your own timing — moving truck, helpers, weather. The facility gate is yours whenever you\'re ready inside the 6 AM – 10 PM window.',
  },
  {
    number: '03',
    title: 'Clear out the unit completely',
    action:
      'Take everything with you. Furniture, boxes, packing materials, leftover hardware — all of it. If you\'re donating items, drop them with a local Goodwill or Salvation Army rather than leaving them in the unit; abandoned items can result in disposal fees being charged to your account.',
    expect:
      'The unit should be empty at the end of this step. A broom-clean state (sweep out dust, loose packing material) is appreciated but not required for a no-fee closeout.',
  },
  {
    number: '04',
    title: 'Remove your disc lock',
    action:
      'Take your lock off the door and bring it with you. Modern Storage® does not retain customer lock keys, so the facility team can\'t remove it for you — leaving the lock on signals the unit is still occupied and may delay closeout.',
    expect:
      'Once your lock is off and the unit is empty, the facility can re-rent the space immediately.',
  },
  {
    number: '05',
    title: 'Confirm closeout with the team',
    action:
      'Call or stop by the office to confirm the unit is empty and your lock is removed. The team will verify the unit, close your rental in the system, and send a closeout confirmation to your email on file.',
    expect:
      'Your final billing is settled, your tenant protection plan is automatically cancelled, and your move-out is officially complete. No more charges post.',
  },
]

// ── Fee transparency. The whole point of this page: what you DON'T
// pay at move-out vs the narrow situations that can trigger fees. ──
type FeeRow = {
  fee: string
  status: 'no' | 'maybe'
  detail: string
}

const FEE_TRANSPARENCY: FeeRow[] = [
  {
    fee: 'Move-out fee',
    status: 'no',
    detail:
      'There is no move-out fee at Modern Storage®. Closing your unit costs nothing — give notice, clear out, remove your lock.',
  },
  {
    fee: 'Early-termination fee',
    status: 'no',
    detail:
      'There is no early-termination fee. Modern Storage® rentals are month-to-month — every month is its own choice, and moving out sooner than expected doesn\'t cost anything beyond the rent you already paid.',
  },
  {
    fee: 'Cleaning fee (normal use)',
    status: 'no',
    detail:
      'There is no cleaning fee for normal storage use. A broom-clean state is appreciated but not required — the team handles standard dust and minor debris as part of unit turnover.',
  },
  {
    fee: 'Final inspection fee',
    status: 'no',
    detail:
      'There is no final inspection fee. The facility team verifies the unit is empty at closeout as part of standard operations — no charge for the walkthrough.',
  },
  {
    fee: 'Prorated refund for partial month',
    status: 'maybe',
    detail:
      'Modern Storage® bills monthly, not daily, so partial-month rent is generally not refunded. If you move out mid-cycle, you\'ve already paid for the full month — plan your final visit accordingly. Refund policy specifics are in your rental agreement.',
  },
  {
    fee: 'Damage to the unit',
    status: 'maybe',
    detail:
      'Physical damage to the unit beyond normal wear (e.g., drilled holes, oil-stained floor, broken door) can result in repair charges. Standard storage use — dings, dust, minor scuffs — does not.',
  },
  {
    fee: 'Abandoned items disposal',
    status: 'maybe',
    detail:
      'If you leave items in the unit at closeout, the facility may charge a disposal fee for removing and disposing of them. Donate, recycle, or take items with you instead.',
  },
  {
    fee: 'Late notice past billing date',
    status: 'maybe',
    detail:
      'If you don\'t move out before your next billing cycle posts, you\'re responsible for that month\'s rent. Provide written notice before the end of the current cycle to avoid the next month\'s charge.',
  },
]

// ── FAQs in concise→detailed→bullets format for AEO extraction. ───
type FaqRow = { q: string; a: string; aHtml?: string }

const FAQS: FaqRow[] = [
  {
    q: 'Are there any fees to move out of a Modern Storage® unit?',
    a: `No — there are no move-out fees, no early-termination fees, no cleaning fees for normal storage use, and no final inspection fees at Modern Storage®. Closing your unit costs nothing as long as you give written notice before your next billing cycle, clear the unit completely, and remove your disc lock. The only situations that can result in a charge at move-out are: physical damage to the unit beyond normal wear, abandoned items left behind (disposal fee), or late notice past the billing date (next month's rent posts). Fees you will NOT see at move-out: move-out fee — none; early-termination fee — none, rentals are month-to-month; cleaning fee for normal use — none; final inspection fee — none; situations that CAN result in a fee: physical damage to the unit beyond normal wear; abandoned items left in the unit (disposal charge); failing to give notice before the next billing cycle (next month's rent applies).`,
    aHtml: `<p>No — there are <strong>no move-out fees, no early-termination fees, no cleaning fees</strong> for normal storage use, and no final inspection fees at Modern Storage®. Closing your unit costs nothing as long as you give written notice before your next billing cycle, clear the unit completely, and remove your disc lock.</p><p><strong>Fees you will NOT see at move-out:</strong></p><ul><li>Move-out fee — <strong>none</strong></li><li>Early-termination fee — <strong>none</strong>, rentals are month-to-month</li><li>Cleaning fee for normal use — <strong>none</strong></li><li>Final inspection fee — <strong>none</strong></li></ul><p><strong>Situations that CAN result in a fee:</strong></p><ul><li>Physical damage to the unit beyond normal wear</li><li>Abandoned items left in the unit (disposal charge)</li><li>Failing to give notice before the next billing cycle (next month's rent applies)</li></ul>`,
  },
  {
    q: 'How much notice do I need to give before moving out?',
    a: `Most Modern Storage® rentals ask for written notice before the end of your current billing cycle — so if your billing date is the 15th, you need to give notice and clear the unit by the 15th to avoid the next month posting. Specific notice requirements are in your rental agreement and vary slightly by location. Email or call your facility as soon as you know your move-out date — there's no penalty for giving notice early. Quick notice timing reference: notice before the end of current billing cycle — avoid next month's rent; notice and unit cleared on or before your billing date — closeout complete, no additional charges; notice after billing cycle posts — that month's rent is already owed; verbal notice — may be accepted but written notice (email, in-person signed) creates a paper trail; no penalty for giving notice early — give notice as soon as you know your move-out date.`,
    aHtml: `<p>Most Modern Storage® rentals ask for <strong>written notice before the end of your current billing cycle</strong> — so if your billing date is the 15th, you need to give notice and clear the unit by the 15th to avoid the next month posting. Specific notice requirements are in your rental agreement and vary slightly by location.</p><p>Email or call your facility as soon as you know your move-out date — there's no penalty for giving notice early.</p><p><strong>Quick notice timing reference:</strong></p><ul><li><strong>Notice before the end of current billing cycle</strong> — avoid next month's rent</li><li><strong>Notice and unit cleared on or before your billing date</strong> — closeout complete, no additional charges</li><li><strong>Notice after billing cycle posts</strong> — that month's rent is already owed</li><li>Verbal notice may be accepted but <strong>written notice</strong> (email or signed at the office) creates a paper trail</li><li><strong>No penalty for giving notice early</strong> — give notice as soon as you know your move-out date</li></ul>`,
  },
  {
    q: 'Do I get a prorated refund if I move out mid-month?',
    a: `Modern Storage® bills monthly, not daily, so partial-month rent is generally not refunded. If you move out mid-cycle, you've already paid for the full month and the remaining days are yours. To get the most out of what you paid, plan your final visit close to (but before) your next billing date. The specific refund policy is stated in your rental agreement — confirm with the team if you're unsure how it applies to your situation.`,
  },
  {
    q: 'What happens if I leave items in the unit?',
    a: `Abandoned items left in the unit at closeout can result in a disposal fee charged to your account. The facility doesn't keep, sort, or donate left-behind items on your behalf. If you have items you don't want, drop them with a local Goodwill, Salvation Army, or another donation point before your final visit, recycle what's recyclable, and take the rest to a disposal site. Cleaner closeout = no surprise charges.`,
  },
  {
    q: 'Do I have to be there in person to move out?',
    a: `No appointment is required. Gated tenant access at every Modern Storage® facility runs 7 days a week from 6:00 AM to 10:00 PM, so you can clear the unit on your own schedule. The only step that benefits from being there in person is the final confirmation — stop by the office during business hours (typically Mon-Sat 8:30 AM – 5:30 PM) or call to confirm the unit is empty and your lock is off so the team can close your rental in the system.`,
  },
  {
    q: 'What happens to my tenant protection plan when I move out?',
    a: `Your tenant protection plan is automatically cancelled when the facility closes your rental in the system. There's no separate step to cancel it — once the unit is empty, your lock is off, and the team verifies the closeout, the plan ends with the rental. If your coverage came from your own homeowners or renters policy instead (off-premises storage extension), notify your insurance provider separately if you want to drop that piece.`,
  },
  {
    q: 'Can I move out and come back to the same unit later?',
    a: `Yes — but the unit you had may be rented to someone else by then. Modern Storage® re-rents units as soon as they're cleared, so the specific space you had is not held for you. If you know you'll be back, ask the team about whether to keep the rental active during the gap (cheapest if it's short) or close out and reserve a new unit when you return.`,
  },
  {
    q: 'Do I need to give notice to move down to a smaller unit?',
    a: `If you're transferring within the same Modern Storage® facility — moving down from a 10x10 to a 5x10, for example — the team handles it as an internal transfer rather than a move-out and a new rental. There's no closeout penalty, and you typically only pay rent at the new size from the transfer date forward. Call or stop by the office to coordinate the swap.`,
  },
]

function buildJsonLd() {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: 'Move-Out Guide', item: SITE_URL + PAGE_PATH },
    ],
  }
  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  const howTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': SITE_URL + PAGE_PATH + '#howto',
    name: 'How to Move Out of a Modern Storage® Unit',
    description:
      'Step-by-step process for closing out a Modern Storage® self-storage rental without surprise fees.',
    totalTime: 'PT1H',
    step: STEPS.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.title,
      text: s.action,
    })),
  }
  return [breadcrumb, faqPage, howTo]
}

export default async function MoveOutGuidePage() {
  const settings = await getSiteSettings()
  const jsonLd = buildJsonLd()

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="bg-charcoal text-white">
        <div className="h-1 w-full bg-modern-red" />
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
          <nav aria-label="Breadcrumb" className="mb-8 text-xs font-semibold text-gray-500">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-modern-red transition-colors">
                  Self Storage
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-300">Move-Out Guide</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-4">
              Move-out guide
            </p>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
              How to <span className="text-modern-red">Move Out</span> of a Storage Unit
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              The honest step-by-step for closing a Modern Storage® rental — no surprise fees, no early-termination penalty, no cleaning fee for normal use. Five steps, an empty unit, and your closeout is done.
            </p>
          </div>
        </div>
      </section>

      {/* ── QUICK ANSWER ─────────────────────────────────────────
          Answer-first aside positioned immediately so AI extractors
          and customers get the bottom line without scrolling. */}
      <section className="bg-modern-red/5 py-10 border-b border-modern-red/20">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
            Quick answer
          </p>
          <p className="text-charcoal text-lg leading-relaxed">
            <strong>There are no move-out fees, no early-termination fees, and no cleaning fees for normal storage use at Modern Storage®.</strong> Give written notice before the end of your current billing cycle, clear the unit completely, remove your disc lock, and confirm with the office. Closeout is done — no more charges post.
          </p>
        </div>
      </section>

      {/* ── 5-STEP MOVE-OUT PROCESS ────────────────────────────── */}
      <section className="bg-white py-16 lg:py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
              The process
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Five Steps to Close Your Storage Unit
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Every Modern Storage® move-out follows the same five steps. None of them are complicated, and none of them require an appointment — except step 5, which benefits from a quick stop at the office or a phone call.
            </p>
          </div>

          <ol className="space-y-6">
            {STEPS.map((s) => (
              <li
                key={s.number}
                className="bg-gray-50 hover:bg-white rounded-2xl p-6 lg:p-8 border border-gray-200 transition-colors flex flex-col lg:flex-row gap-6"
              >
                <div className="lg:w-32 shrink-0">
                  <span className="font-bebas text-5xl lg:text-6xl text-modern-red leading-none">
                    {s.number}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-black text-charcoal text-xl lg:text-2xl leading-tight mb-3">
                    {s.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">{s.action}</p>
                  <div className="bg-white border-l-4 border-modern-red rounded-r-xl px-5 py-3">
                    <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-1">
                      What to expect
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed">{s.expect}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── FEE TRANSPARENCY ─────────────────────────────────────
          The main reason this page exists. Tells customers what
          they will NOT be charged for, and the narrow situations
          that CAN trigger a fee, so there are no surprises. */}
      <section className="bg-gray-50 py-16 lg:py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
              No surprise fees
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              What You Will (and Won&apos;t) Be Charged at Move-Out
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Most storage operators are vague about the move-out process — customers fear a hidden cleaning fee, a final inspection charge, or an early-termination penalty. Here&apos;s the honest list of every fee a Modern Storage® closeout can and cannot involve. See the{' '}
              <Link href="/pricing" className="text-modern-red font-semibold hover:underline">
                pricing page
              </Link>
              {' '}for the full fee schedule across your entire rental.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-charcoal text-white">
                  <tr>
                    <th scope="col" className="px-4 sm:px-6 py-4 font-black uppercase tracking-widest text-xs w-1/3">
                      Fee
                    </th>
                    <th scope="col" className="px-4 sm:px-6 py-4 font-black uppercase tracking-widest text-xs w-32 hidden sm:table-cell">
                      Status
                    </th>
                    <th scope="col" className="px-4 sm:px-6 py-4 font-black uppercase tracking-widest text-xs">
                      Detail
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {FEE_TRANSPARENCY.map((row) => (
                    <tr key={row.fee} className="bg-white align-top">
                      <th scope="row" className="px-4 sm:px-6 py-4 font-black text-charcoal text-sm leading-tight">
                        {row.fee}
                      </th>
                      <td className="px-4 sm:px-6 py-4 hidden sm:table-cell">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wide px-3 py-1 rounded-full whitespace-nowrap ${
                            row.status === 'no'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {row.status === 'no' ? 'No fee' : 'Possible'}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-sm text-gray-700 leading-relaxed">
                        <span
                          className={`sm:hidden inline-flex items-center text-xs font-black uppercase tracking-wide px-2 py-0.5 rounded-full whitespace-nowrap mb-2 ${
                            row.status === 'no'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {row.status === 'no' ? 'No fee' : 'Possible'}
                        </span>
                        {row.detail}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
              FAQ
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight">
              Move-Out FAQ
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mt-4 max-w-2xl mx-auto">
              The questions Modern Storage® tenants ask most about closing out a unit.
            </p>
          </div>
          <FaqAccordion items={FAQS} columns={2} />
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────────────────
          For tenants whose move-out is upcoming — point to their
          local facility for the actual closeout conversation. */}
      <section className="bg-modern-red py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-5 tracking-tight">
            Ready to close out your unit?
          </h2>
          <p className="text-red-100 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Give written notice to your local Modern Storage® facility and the team will walk you through the final steps. No appointment needed.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/locations"
              className="bg-white text-modern-red font-black px-8 py-3.5 rounded-full hover:bg-red-50 transition-colors text-sm shadow-md inline-flex items-center gap-2"
            >
              Find Your Facility
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <a
              href={settings.phoneHref}
              className="bg-charcoal text-white font-black px-8 py-3.5 rounded-full hover:bg-gray-800 transition-colors text-sm shadow-md inline-flex items-center gap-2"
            >
              Call to Give Notice
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
