import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from '@bolio-ui/icons'
import styles from './IconsGallery.module.css'

interface Option<T extends string> {
  value: T
  count: number
}

interface Props<T extends string> {
  options: Option<T>[]
  value: T
  onChange: (value: T) => void
}

// Pixels the pointer must travel before a press counts as a drag, not a click
const DRAG_THRESHOLD = 5
// Share of the visible width the arrows scroll by
const SCROLL_STEP = 0.8

function CategoryCarousel<T extends string>({
  options,
  value,
  onChange
}: Props<T>) {
  const trackRef = useRef<HTMLDivElement>(null)
  const drag = useRef({ active: false, moved: false, startX: 0, scrollLeft: 0 })
  const [edges, setEdges] = useState({ start: false, end: false })
  const [dragging, setDragging] = useState(false)

  // Which arrows make sense: none when everything fits, and each one only
  // while there is something left to scroll to on its side.
  const updateEdges = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const max = track.scrollWidth - track.clientWidth
    setEdges({
      start: track.scrollLeft > 1,
      end: track.scrollLeft < max - 1
    })
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    updateEdges()
    const observer = new ResizeObserver(updateEdges)
    observer.observe(track)
    Array.from(track.children).forEach((child) => observer.observe(child))
    return () => observer.disconnect()
  }, [updateEdges, options.length])

  // The active chip is brought into view, e.g. after a keyboard selection
  // or when the list was scrolled away from it.
  useEffect(() => {
    const track = trackRef.current
    const active = track?.querySelector<HTMLElement>('[aria-pressed="true"]')
    if (!track || !active) return
    const left =
      active.offsetLeft - (track.clientWidth - active.offsetWidth) / 2
    track.scrollTo({ left, behavior: 'smooth' })
  }, [value])

  const scrollByStep = (direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({
      left: direction * track.clientWidth * SCROLL_STEP,
      behavior: 'smooth'
    })
  }

  // Dragging is for mouse only: touch and pen already scroll natively
  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (!track || event.pointerType !== 'mouse' || event.button !== 0) return
    drag.current = {
      active: true,
      moved: false,
      startX: event.clientX,
      scrollLeft: track.scrollLeft
    }
  }

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (!track || !drag.current.active) return
    const distance = event.clientX - drag.current.startX
    if (!drag.current.moved && Math.abs(distance) < DRAG_THRESHOLD) return
    if (!drag.current.moved) {
      drag.current.moved = true
      setDragging(true)
    }
    track.scrollLeft = drag.current.scrollLeft - distance
  }

  const endDrag = () => {
    if (!drag.current.active) return
    drag.current.active = false
    setDragging(false)
  }

  // A drag ends with a click on the chip under the pointer: swallow it
  const onClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!drag.current.moved) return
    event.preventDefault()
    event.stopPropagation()
    drag.current.moved = false
  }

  // Left and right move between chips, Home and End jump to the ends
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const buttons = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>('button')
    )
    const current = buttons.indexOf(document.activeElement as HTMLButtonElement)
    if (current === -1) return
    const next = {
      ArrowRight: Math.min(current + 1, buttons.length - 1),
      ArrowLeft: Math.max(current - 1, 0),
      Home: 0,
      End: buttons.length - 1
    }[event.key]
    if (next === undefined) return
    event.preventDefault()
    buttons[next].focus()
  }

  const classes = [
    styles.carousel,
    edges.start ? styles.fadeStart : '',
    edges.end ? styles.fadeEnd : ''
  ].join(' ')

  return (
    <div className={classes}>
      {(edges.start || edges.end) && (
        <button
          type="button"
          className={styles.arrow}
          aria-label="Scroll categories left"
          disabled={!edges.start}
          onClick={() => scrollByStep(-1)}
        >
          <ChevronLeft fontSize={16} />
        </button>
      )}
      <div
        ref={trackRef}
        className={`${styles.track} ${dragging ? styles.dragging : ''}`}
        role="group"
        aria-label="Categories"
        onScroll={updateEdges}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        onKeyDown={onKeyDown}
      >
        {options.map(({ value: option, count }) => (
          <button
            key={option}
            type="button"
            className={styles.chip}
            aria-pressed={value === option}
            onClick={() => onChange(option)}
          >
            {option}
            <span className={styles.count}>{count}</span>
          </button>
        ))}
      </div>
      {(edges.start || edges.end) && (
        <button
          type="button"
          className={styles.arrow}
          aria-label="Scroll categories right"
          disabled={!edges.end}
          onClick={() => scrollByStep(1)}
        >
          <ChevronRight fontSize={16} />
        </button>
      )}
    </div>
  )
}

export default CategoryCarousel
