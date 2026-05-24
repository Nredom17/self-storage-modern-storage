'use client'

import { useState } from 'react'

// ─── ANALYTICS ───────────────────────────────────────────────────────────────
// Fires window.gtag if GA4 is installed; no-op otherwise. Centralized so all
// four events follow the same shape and we can swap providers later by
// editing one function.
type GtagFn = (...args: unknown[]) => void
function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return
  const w = window as unknown as { gtag?: GtagFn }
  if (typeof w.gtag === 'function') {
    w.gtag('event', event, params)
  }
}

// ─── DATA ────────────────────────────────────────────────────────────────────
type Situation = { id: string; label: string; icon: string; baseCuft: number }
type Density = { id: string; label: string; sub: string; mult: number }
type AddOnItem = { id: string; label: string; icon: string; cuft: number }
type Unit = {
  size: string
  sqft: number
  cuft: number
  label: string
  bestFor: string
  rooms: string
}

const LIVING_SITUATIONS: Situation[] = [
  { id: 'studio', label: 'Studio', icon: '🏠', baseCuft: 250 },
  { id: '1bed', label: '1 Bedroom', icon: '🛏', baseCuft: 450 },
  { id: '2bed', label: '2 Bedroom', icon: '🛏', baseCuft: 700 },
  { id: '3bed', label: '3 Bedroom', icon: '🏡', baseCuft: 1000 },
  { id: 'house', label: 'Full House', icon: '🏘', baseCuft: 1400 },
  { id: 'office', label: 'Office', icon: '💼', baseCuft: 500 },
  { id: 'inventory', label: 'Business Inventory', icon: '📦', baseCuft: 800 },
]

const DENSITY: Density[] = [
  { id: 'light', label: 'Lightly', sub: 'Just the essentials', mult: 0.65 },
  { id: 'normal', label: 'Normally', sub: 'A full household load', mult: 1.0 },
  { id: 'packed', label: 'Packed Tight', sub: 'Everything, including the garage', mult: 1.35 },
]

const ADD_ONS: AddOnItem[] = [
  { id: 'bed_king', label: 'King/Queen Bed', icon: '🛏', cuft: 70 },
  { id: 'bed_single', label: 'Twin/Single Bed', icon: '🛏', cuft: 40 },
  { id: 'sofa', label: 'Sofa', icon: '🛋', cuft: 70 },
  { id: 'dining', label: 'Dining Table', icon: '🍽', cuft: 40 },
  { id: 'washer', label: 'Washer / Dryer', icon: '🫧', cuft: 50 },
  { id: 'fridge', label: 'Refrigerator', icon: '🧊', cuft: 40 },
  { id: 'desk', label: 'Desk + Chair', icon: '🖥', cuft: 55 },
  { id: 'boxes', label: 'Extra Boxes (10)', icon: '📦', cuft: 50 },
  { id: 'bike', label: 'Bikes (2)', icon: '🚲', cuft: 30 },
  { id: 'patio', label: 'Patio Set', icon: '☀️', cuft: 80 },
]

const UNITS: Unit[] = [
  { size: '5x5', sqft: 25, cuft: 200, label: 'Closet Sized', bestFor: 'Boxes, seasonal items, small furniture', rooms: 'Closet or less' },
  { size: '5x10', sqft: 50, cuft: 400, label: 'Walk-In Closet', bestFor: 'Studio or dorm contents', rooms: 'Studio apartment' },
  { size: '5x15', sqft: 75, cuft: 600, label: 'Large Walk-In', bestFor: 'Small apartment contents', rooms: '1-bedroom apartment' },
  { size: '10x10', sqft: 100, cuft: 800, label: 'Half Garage', bestFor: '1-bedroom apartment', rooms: '2-bedroom apartment' },
  { size: '10x15', sqft: 150, cuft: 1200, label: 'Full Garage', bestFor: '2-bedroom apartment or small house', rooms: '2-3 bedroom home' },
  { size: '10x20', sqft: 200, cuft: 1600, label: 'One-Car Garage', bestFor: 'Full house or vehicle storage', rooms: '3-4 bedroom home' },
  { size: '10x25', sqft: 250, cuft: 2000, label: 'Large Garage', bestFor: 'Large home or commercial use', rooms: '4-5 bedroom home' },
  { size: '10x30', sqft: 300, cuft: 2400, label: 'Extra Large', bestFor: 'Business inventory or full estate', rooms: 'Large home / commercial' },
]

const RESERVE_HREF = '/#locations'

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function getUnit(cuft: number): Unit {
  const target = cuft / 0.78
  return UNITS.find((u) => u.cuft >= target) || UNITS[UNITS.length - 1]
}

function getConfidence(totalCuft: number, unit: Unit): number {
  const pct = Math.round((totalCuft / unit.cuft) * 100)
  return Math.min(pct, 100)
}

function buildExplanation(
  situationId: string | null,
  densityId: string | null,
  recSize: string,
): string {
  const sitMap: Record<string, string> = {
    studio: 'studio',
    '1bed': '1-bedroom apartment',
    '2bed': '2-bedroom apartment',
    '3bed': '3-bedroom home',
    house: 'full house',
    office: 'office',
    inventory: 'set of business inventory',
  }
  const densMap: Record<string, string> = {
    light: 'lightly packed',
    normal: 'normally packed',
    packed: 'tightly packed',
  }
  const sit = (situationId && sitMap[situationId]) || 'space'
  const dens = (densityId && densMap[densityId]) || ''
  return `Based on a ${dens} ${sit}, your best fit is a ${recSize}.`
}

function buildUpsell(conf: number, bigger: Unit | null): string | null {
  if (conf < 85 || !bigger) return null
  return `Because your unit is over 85% full, we recommend stepping up to a ${bigger.size} if you want easier access to your items.`
}

// ─── UNIT VISUAL ─────────────────────────────────────────────────────────────
function UnitVisual({ size, fillPct }: { size: string; fillPct: number }) {
  const [w, h] = size.split('x').map(Number)
  const aspect = h / (w + h)
  const floorW = 120
  const floorH = Math.round(floorW * 0.45)
  const wallH = Math.round(floorW * 0.55)
  const depth = Math.round(floorW * 0.22 * aspect * 2.2)
  const filled = Math.min(fillPct / 100, 0.92)
  const boxH = Math.round(wallH * filled)

  return (
    <svg
      width={floorW + depth}
      height={wallH + floorH + depth}
      viewBox={`0 0 ${floorW + depth} ${wallH + floorH + depth}`}
      aria-hidden="true"
    >
      <polygon points={`${depth},${wallH + depth} ${depth + floorW},${wallH + depth} ${depth + floorW},${wallH + depth + floorH} ${depth},${wallH + depth + floorH}`} fill="#D0D0D0" stroke="#aaa" strokeWidth="1" />
      <rect x={depth} y={depth} width={floorW} height={wallH} fill="#E8E8E8" stroke="#aaa" strokeWidth="1" />
      <polygon points={`0,0 ${depth},${depth} ${depth},${depth + wallH} 0,${wallH}`} fill="#D5D5D5" stroke="#aaa" strokeWidth="1" />
      <polygon points={`0,0 ${depth},${depth} ${depth + floorW},${depth} ${floorW},0`} fill="#F0F0F0" stroke="#aaa" strokeWidth="1" />
      {fillPct > 0 && (
        <>
          <rect x={depth + 4} y={depth + wallH - boxH + 4} width={floorW - 8} height={boxH - 4} fill="#F60001" opacity={0.18} rx="2" />
          {[...Array(Math.min(Math.ceil(filled * 5), 5))].map((_, i) => (
            <rect key={i} x={depth + 8 + i * 20} y={depth + wallH - Math.min(boxH - 8, wallH - 8)} width={16} height={Math.min(boxH - 8, wallH - 8)} fill="#F60001" opacity={0.35 + i * 0.06} rx="2" />
          ))}
        </>
      )}
      <rect x={depth + floorW * 0.35} y={depth + wallH * 0.2} width={floorW * 0.3} height={wallH * 0.8} fill="#C8C8C8" stroke="#aaa" strokeWidth="0.5" />
    </svg>
  )
}

// ─── STEP DOTS ───────────────────────────────────────────────────────────────
function StepDots({ step, total }: { step: number; total: number }) {
  return (
    <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 24 }}>
      {[...Array(total)].map((_, i) => (
        <div key={i} style={{ width: i === step ? 20 : 7, height: 7, borderRadius: 99, background: i === step ? '#F60001' : i < step ? '#1A1A1A' : '#DDD', transition: 'all 0.3s' }} />
      ))}
    </div>
  )
}

// ─── ADD-ON PANEL ────────────────────────────────────────────────────────────
function AddOnPanel({ addOns, setAddOns }: { addOns: string[]; setAddOns: React.Dispatch<React.SetStateAction<string[]>> }) {
  const toggle = (id: string) => {
    setAddOns((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A', marginBottom: 10, fontFamily: "'DM Sans', sans-serif" }}>
        Any of these?
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {ADD_ONS.map((item) => {
          const on = addOns.includes(item.id)
          return (
            <button
              key={item.id}
              onClick={() => toggle(item.id)}
              style={{
                background: on ? '#1A1A1A' : '#F5F5F5',
                border: on ? '2px solid #F60001' : '2px solid transparent',
                borderRadius: 12,
                padding: '10px 12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: "'DM Sans', sans-serif",
                textAlign: 'left',
              }}
            >
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: on ? '#fff' : '#1A1A1A' }}>{item.label}</div>
                <div style={{ fontSize: 10, color: on ? '#aaa' : '#999' }}>+{item.cuft} cu ft</div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── RESULT ──────────────────────────────────────────────────────────────────
function ResultScreen({
  totalCuft,
  situationId,
  densityId,
  onReset,
  addOns,
  setAddOns,
  showAddOns,
  setShowAddOns,
}: {
  totalCuft: number
  situationId: string | null
  densityId: string | null
  onReset: () => void
  addOns: string[]
  setAddOns: React.Dispatch<React.SetStateAction<string[]>>
  showAddOns: boolean
  setShowAddOns: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const rec = getUnit(totalCuft)
  const recIdx = UNITS.indexOf(rec)
  const bigger = UNITS[recIdx + 1] || null
  const conf = getConfidence(totalCuft, rec)
  const explanation = buildExplanation(situationId, densityId, rec.size)
  const upsellMsg = buildUpsell(conf, bigger)

  return (
    <div>
      {/* AI-style personalized explanation */}
      <div style={{ background: '#fff', border: '2px solid #1A1A1A', borderRadius: 16, padding: '14px 16px', marginBottom: 14, fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#F60001', letterSpacing: '0.12em', marginBottom: 6, textTransform: 'uppercase' }}>
          AI Analysis
        </div>
        <div style={{ fontSize: 14, color: '#1A1A1A', lineHeight: 1.5 }}>{explanation}</div>
      </div>

      {/* Confidence meter */}
      <div style={{ background: '#1A1A1A', borderRadius: 20, padding: '20px 20px 16px', marginBottom: 16 }}>
        <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 13, color: '#F60001', letterSpacing: '0.12em', marginBottom: 2 }}>
          YOUR BEST FIT
        </div>
        <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 48, color: '#fff', lineHeight: 1 }}>{rec.size}</div>
        <div style={{ fontSize: 13, color: '#aaa', marginBottom: 14 }}>
          {rec.label} &bull; {rec.sqft} sq ft
        </div>

        <div style={{ marginBottom: 6 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: '#888', fontFamily: "'DM Sans', sans-serif" }}>Confidence meter</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: conf >= 85 ? '#f97316' : '#4ade80', fontFamily: "'DM Sans', sans-serif" }}>
              {conf >= 85 ? 'Tight fit' : 'Comfortable fit'} &bull; {100 - conf}% breathing room
            </span>
          </div>
          <div style={{ background: '#333', borderRadius: 99, height: 10, overflow: 'hidden' }}>
            <div style={{ width: `${conf}%`, height: '100%', borderRadius: 99, background: conf >= 85 ? 'linear-gradient(90deg,#f97316,#ef4444)' : 'linear-gradient(90deg,#22c55e,#4ade80)', transition: 'width 0.6s cubic-bezier(0.34,1.56,0.64,1)' }} />
          </div>
        </div>

        {upsellMsg && (
          <div style={{ background: '#2a1a00', border: '1px solid #f97316', borderRadius: 10, padding: '10px 12px', marginTop: 8 }}>
            <div style={{ fontSize: 12, color: '#f97316', fontFamily: "'DM Sans', sans-serif", lineHeight: 1.4 }}>⚠️ {upsellMsg}</div>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        {[rec, bigger].filter((u): u is Unit => Boolean(u)).map((unit, i) => (
          <div key={unit.size} style={{ flex: 1, background: '#fff', border: i === 0 ? '2px solid #F60001' : '2px solid #E8E8E8', borderRadius: 16, padding: '16px 14px', position: 'relative' }}>
            {i === 0 && (
              <div style={{ position: 'absolute', top: 10, right: 10, background: '#F60001', color: '#fff', fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', padding: '2px 7px', borderRadius: 99, fontFamily: "'DM Sans', sans-serif", textTransform: 'uppercase' }}>Best fit</div>
            )}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
              <UnitVisual size={unit.size} fillPct={i === 0 ? conf : getConfidence(totalCuft, unit)} />
            </div>
            <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 28, color: '#1A1A1A', lineHeight: 1 }}>{unit.size}</div>
            <div style={{ fontSize: 11, color: '#888', marginBottom: 6, fontFamily: "'DM Sans', sans-serif" }}>{unit.label}</div>
            <div style={{ fontSize: 12, color: '#555', lineHeight: 1.4, fontFamily: "'DM Sans', sans-serif" }}>{unit.bestFor}</div>
          </div>
        ))}
      </div>

      {!showAddOns ? (
        <button
          onClick={() => setShowAddOns(true)}
          style={{ width: '100%', background: 'transparent', border: '2px solid #1A1A1A', borderRadius: 14, padding: '14px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#1A1A1A', fontFamily: "'DM Sans', sans-serif", marginBottom: 12 }}
        >
          Want a more exact estimate? Add major items →
        </button>
      ) : (
        <AddOnPanel addOns={addOns} setAddOns={setAddOns} />
      )}

      <a
        href={RESERVE_HREF}
        onClick={() => track('size_finder_reserve_click', { recommended_size: rec.size, total_cuft: totalCuft, confidence: conf })}
        style={{ display: 'block', textAlign: 'center', textDecoration: 'none', width: '100%', boxSizing: 'border-box', background: '#F60001', border: 'none', borderRadius: 14, padding: '18px', color: '#fff', fontFamily: "'Bebas Neue', cursive", fontSize: 22, letterSpacing: '0.08em', cursor: 'pointer', marginBottom: 10 }}
        onMouseEnter={(e) => (e.currentTarget.style.background = '#C40001')}
        onMouseLeave={(e) => (e.currentTarget.style.background = '#F60001')}
      >
        Reserve This Size
      </a>

      <button
        onClick={onReset}
        style={{ width: '100%', background: 'transparent', border: '2px solid #E0E0E0', borderRadius: 14, padding: '12px', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#aaa', fontFamily: "'DM Sans', sans-serif" }}
      >
        Start over
      </button>
    </div>
  )
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
export default function AIStorageSizeFinder() {
  const [step, setStep] = useState(0)
  const [situation, setSituation] = useState<string | null>(null)
  const [density, setDensity] = useState<string | null>(null)
  const [addOns, setAddOns] = useState<string[]>([])
  const [showAddOns, setShowAddOns] = useState(false)
  const [startedFired, setStartedFired] = useState(false)

  const totalCuft = (() => {
    if (!situation || !density) return 0
    const base = LIVING_SITUATIONS.find((s) => s.id === situation)?.baseCuft || 0
    const mult = DENSITY.find((d) => d.id === density)?.mult || 1
    const extras = ADD_ONS.filter((a) => addOns.includes(a.id)).reduce((s, a) => s + a.cuft, 0)
    return Math.round(base * mult + extras)
  })()

  const reset = () => {
    setStep(0)
    setSituation(null)
    setDensity(null)
    setAddOns([])
    setShowAddOns(false)
  }

  const goNext = () => {
    const next = step + 1
    setStep(next)
    if (next === 2) {
      const rec = getUnit(totalCuft)
      track('size_finder_completed', { recommended_size: rec.size, situation, density, total_cuft: totalCuft, add_ons: addOns })
    }
  }

  const selectSituation = (id: string) => {
    setSituation(id)
    if (!startedFired) {
      track('size_finder_started', { entry_point: 'situation' })
      setStartedFired(true)
    }
  }

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', fontFamily: "'DM Sans', sans-serif" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
        rel="stylesheet"
      />

      <div style={{ background: '#FAFAFA', borderRadius: 24, padding: '20px 20px 28px', border: '1px solid #E8E8E8' }}>
        {step < 2 && <StepDots step={step} total={3} />}

        {step === 0 && (
          <div>
            <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 22, color: '#1A1A1A', marginBottom: 6, letterSpacing: '0.04em' }}>
              Where are you moving from?
            </div>
            <div style={{ fontSize: 13, color: '#888', marginBottom: 18 }}>Pick what fits best.</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
              {LIVING_SITUATIONS.map((opt) => {
                const active = situation === opt.id
                return (
                  <button
                    key={opt.id}
                    onClick={() => selectSituation(opt.id)}
                    style={{ background: active ? '#1A1A1A' : '#fff', border: active ? '2px solid #F60001' : '2px solid #E8E8E8', borderRadius: 16, padding: '18px 12px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.18s', fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <div style={{ fontSize: 26, marginBottom: 6 }}>{opt.icon}</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: active ? '#fff' : '#1A1A1A', lineHeight: 1.2 }}>{opt.label}</div>
                  </button>
                )
              })}
            </div>
            <button
              disabled={!situation}
              onClick={goNext}
              style={{ marginTop: 20, width: '100%', background: situation ? '#F60001' : '#EEE', border: 'none', borderRadius: 14, padding: '18px', color: situation ? '#fff' : '#bbb', fontFamily: "'Bebas Neue', cursive", fontSize: 20, letterSpacing: '0.08em', cursor: situation ? 'pointer' : 'default', transition: 'background 0.2s' }}
            >
              Find My Size →
            </button>
          </div>
        )}

        {step === 1 && (
          <div>
            <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 22, color: '#1A1A1A', marginBottom: 6, letterSpacing: '0.04em' }}>
              How much stuff are we talking?
            </div>
            <div style={{ fontSize: 13, color: '#888', marginBottom: 18 }}>Be honest. This matters.</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {DENSITY.map((opt) => {
                const active = density === opt.id
                return (
                  <button
                    key={opt.id}
                    onClick={() => setDensity(opt.id)}
                    style={{ background: active ? '#1A1A1A' : '#fff', border: active ? '2px solid #F60001' : '2px solid #E8E8E8', borderRadius: 16, padding: '18px 20px', cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.18s', fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: active ? '#fff' : '#1A1A1A' }}>{opt.label}</div>
                      <div style={{ fontSize: 12, color: active ? '#aaa' : '#999', marginTop: 2 }}>{opt.sub}</div>
                    </div>
                    {active && <div style={{ color: '#F60001', fontSize: 20 }}>✓</div>}
                  </button>
                )
              })}
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <button
                onClick={() => setStep(0)}
                style={{ flex: 1, background: 'transparent', border: '2px solid #E0E0E0', borderRadius: 14, padding: '14px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#aaa', fontFamily: "'DM Sans', sans-serif" }}
              >
                ← Back
              </button>
              <button
                disabled={!density}
                onClick={goNext}
                style={{ flex: 2, background: density ? '#F60001' : '#EEE', border: 'none', borderRadius: 14, padding: '14px', color: density ? '#fff' : '#bbb', fontFamily: "'Bebas Neue', cursive", fontSize: 20, letterSpacing: '0.08em', cursor: density ? 'pointer' : 'default' }}
              >
                Find My Size →
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <ResultScreen
            totalCuft={totalCuft}
            situationId={situation}
            densityId={density}
            onReset={reset}
            addOns={addOns}
            setAddOns={setAddOns}
            showAddOns={showAddOns}
            setShowAddOns={setShowAddOns}
          />
        )}
      </div>
    </div>
  )
}
