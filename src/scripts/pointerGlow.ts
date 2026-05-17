export type PointerGlowOptions = {
  activeClass?: string
  xVar?: string
  yVar?: string
  disabled?: () => boolean
}

const noop = () => {}
const clampPercent = (value: number) =>
  `${Math.min(100, Math.max(0, value)).toFixed(2)}%`

const pointerGlowDisabled = (disabled?: () => boolean) =>
  disabled?.() ||
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
  window.matchMedia('(hover: none)').matches

export function initPointerGlow(
  owner: HTMLElement,
  glow: HTMLElement,
  options: PointerGlowOptions = {}
): () => void {
  const {
    activeClass = 'is-glow-active',
    xVar = '--glow-x',
    yVar = '--glow-y',
    disabled
  } = options

  if (pointerGlowDisabled(disabled)) {
    return noop
  }

  let frameId: number | undefined
  let latestEvent: PointerEvent | undefined

  const reset = () => glow.classList.remove(activeClass)

  const applyPosition = () => {
    frameId = undefined
    if (!latestEvent) return

    const rect = owner.getBoundingClientRect()
    const x = ((latestEvent.clientX - rect.left) / rect.width) * 100
    const y = ((latestEvent.clientY - rect.top) / rect.height) * 100

    glow.style.setProperty(xVar, clampPercent(x))
    glow.style.setProperty(yVar, clampPercent(y))
    glow.classList.add(activeClass)
  }

  const onPointerMove = (event: PointerEvent) => {
    latestEvent = event
    if (frameId === undefined) {
      frameId = window.requestAnimationFrame(applyPosition)
    }
  }

  const onPointerLeave = () => {
    latestEvent = undefined
    if (frameId !== undefined) window.cancelAnimationFrame(frameId)
    frameId = undefined
    reset()
  }

  owner.addEventListener('pointermove', onPointerMove, { passive: true })
  owner.addEventListener('pointerleave', onPointerLeave, { passive: true })

  return () => {
    owner.removeEventListener('pointermove', onPointerMove)
    owner.removeEventListener('pointerleave', onPointerLeave)
    if (frameId !== undefined) window.cancelAnimationFrame(frameId)
    frameId = undefined
    latestEvent = undefined
    glow.style.removeProperty(xVar)
    glow.style.removeProperty(yVar)
    reset()
  }
}

export function initViewportPointerGlow(
  glow: HTMLElement,
  options: PointerGlowOptions = {}
): () => void {
  const {
    activeClass = 'is-glow-active',
    xVar = '--page-glow-x',
    yVar = '--page-glow-y',
    disabled
  } = options

  if (pointerGlowDisabled(disabled)) {
    return noop
  }

  let frameId: number | undefined
  let latestEvent: PointerEvent | undefined

  const reset = () => glow.classList.remove(activeClass)

  const applyPosition = () => {
    frameId = undefined
    if (!latestEvent) return

    glow.style.setProperty(xVar, `${latestEvent.clientX.toFixed(1)}px`)
    glow.style.setProperty(yVar, `${latestEvent.clientY.toFixed(1)}px`)
    glow.classList.add(activeClass)
  }

  const onPointerMove = (event: PointerEvent) => {
    latestEvent = event
    if (frameId === undefined) {
      frameId = window.requestAnimationFrame(applyPosition)
    }
  }

  const onPointerLeave = () => {
    latestEvent = undefined
    if (frameId !== undefined) window.cancelAnimationFrame(frameId)
    frameId = undefined
    reset()
  }

  window.addEventListener('pointermove', onPointerMove, { passive: true })
  document.documentElement.addEventListener('pointerleave', onPointerLeave, {
    passive: true
  })

  return () => {
    window.removeEventListener('pointermove', onPointerMove)
    document.documentElement.removeEventListener('pointerleave', onPointerLeave)
    if (frameId !== undefined) window.cancelAnimationFrame(frameId)
    frameId = undefined
    latestEvent = undefined
    glow.style.removeProperty(xVar)
    glow.style.removeProperty(yVar)
    reset()
  }
}
