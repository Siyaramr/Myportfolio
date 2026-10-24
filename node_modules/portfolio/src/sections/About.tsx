import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import portraitOne from '../assets/Images/IMG_1816-01.jpg'
const portraitTwo = new URL('../assets/Images/IMG_0187.JPG', import.meta.url).href
import portraitThree from '../assets/Images/1721141287186.jpg'

const photos = [
  { src: portraitOne, alt: 'Portrait of Siyaram Rana', rotation: -7 },
  { src: portraitTwo, alt: 'Siyaram Rana', rotation: 5 },
  { src: portraitThree, alt: 'Siyaram Rana', rotation: -3 },
]

type Position = { x: number; y: number }
type DragState = {
  index: number
  pointerId: number
  pointerX: number
  pointerY: number
  startX: number
  startY: number
  startLeft: number
  startTop: number
}

const initialPositions: Position[] = photos.map(() => ({ x: 0, y: 0 }))

export const About = () => {
  const [positions, setPositions] = useState(initialPositions)
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const [galleryVisible, setGalleryVisible] = useState(false)
  const galleryRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<DragState | null>(null)

  useEffect(() => {
    const gallery = galleryRef.current
    if (!gallery) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGalleryVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(gallery)
    return () => observer.disconnect()
  }, [])

  const startDrag = (index: number, event: PointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0) return

    const gallery = galleryRef.current
    if (!gallery) return

    const card = event.currentTarget
    const position = positions[index]

    dragRef.current = {
      index,
      pointerId: event.pointerId,
      pointerX: event.clientX,
      pointerY: event.clientY,
      startX: position.x,
      startY: position.y,
      startLeft: card.offsetLeft + position.x,
      startTop: card.offsetTop + position.y,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
    setActiveCard(index)
  }

  const moveCard = (index: number, event: PointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current
    const gallery = galleryRef.current
    if (!drag || drag.index !== index || drag.pointerId !== event.pointerId || !gallery) return

    const card = event.currentTarget
    const maxLeft = Math.max(0, gallery.clientWidth - card.offsetWidth)
    const maxTop = Math.max(0, gallery.clientHeight - card.offsetHeight)
    const left = Math.min(maxLeft, Math.max(0, drag.startLeft + event.clientX - drag.pointerX))
    const top = Math.min(maxTop, Math.max(0, drag.startTop + event.clientY - drag.pointerY))

    setPositions((current) =>
      current.map((position, cardIndex) =>
        cardIndex === index
          ? { x: drag.startX + left - drag.startLeft, y: drag.startY + top - drag.startTop }
          : position,
      ),
    )
  }

  const stopDrag = (index: number, event: PointerEvent<HTMLButtonElement>) => {
    if (dragRef.current?.index !== index || dragRef.current.pointerId !== event.pointerId) return
    dragRef.current = null
    setActiveCard(null)
  }

  const moveWithKeyboard = (index: number, event: KeyboardEvent<HTMLButtonElement>) => {
    const directions: Record<string, Position> = {
      ArrowUp: { x: 0, y: -12 },
      ArrowDown: { x: 0, y: 12 },
      ArrowLeft: { x: -12, y: 0 },
      ArrowRight: { x: 12, y: 0 },
    }
    const direction = directions[event.key]
    if (!direction || !galleryRef.current) return

    event.preventDefault()
    const gallery = galleryRef.current
    const card = event.currentTarget
    const position = positions[index]
    const currentLeft = card.offsetLeft + position.x
    const currentTop = card.offsetTop + position.y
    const left = Math.min(
      Math.max(0, gallery.clientWidth - card.offsetWidth),
      Math.max(0, currentLeft + direction.x),
    )
    const top = Math.min(
      Math.max(0, gallery.clientHeight - card.offsetHeight),
      Math.max(0, currentTop + direction.y),
    )

    setPositions((current) =>
      current.map((currentPosition, cardIndex) =>
        cardIndex === index
          ? {
              x: position.x + left - currentLeft,
              y: position.y + top - currentTop,
            }
          : currentPosition,
      ),
    )
    setActiveCard(index)
  }

  return (
    <section id="about" className="about-section">
      <div
        className={`about-gallery${galleryVisible ? ' is-visible' : ''}`}
        ref={galleryRef}
        role="group"
        aria-label="Draggable photos"
      >
        {photos.map((photo, index) => (
          <button
            className={`about-gallery__card${activeCard === index ? ' is-active' : ''}`}
            key={photo.src}
            type="button"
            aria-label={`${photo.alt}. Drag to move, or use the arrow keys.`}
            style={{
              transform: `translate3d(${positions[index].x}px, ${positions[index].y}px, 0) rotate(${photo.rotation}deg)`,
            }}
            onPointerDown={(event) => startDrag(index, event)}
            onPointerMove={(event) => moveCard(index, event)}
            onPointerUp={(event) => stopDrag(index, event)}
            onPointerCancel={(event) => stopDrag(index, event)}
            onLostPointerCapture={(event) => stopDrag(index, event)}
            onKeyDown={(event) => moveWithKeyboard(index, event)}
            onBlur={() => {
              if (activeCard === index) setActiveCard(null)
            }}
          >
            <img src={photo.src} alt={photo.alt} draggable={false} />
          </button>
        ))}
      </div>
      <div className="about-section__content">
        <h2>About Me</h2>
        <div className="about-terminal">
          <p className="about-terminal__command">
            <span>[ root@portfolio ] $</span> cat about.txt
          </p>
          <div className="about-terminal__text">
            <p>
              Hi, I am Siyaram Rana from Kathmandu, Nepal.
            </p>
            <p>
              I work in IT support. I have worked with internet networks, customer support, and
              software problems. I like finding the cause of a problem and fixing it step by step.
            </p>
            <p>
              My goal is to become a <strong>System Administrator</strong> and later grow into{' '}
              <strong>Cyber Security</strong>. To reach this goal, I am learning Red Hat Enterprise
              Linux and preparing for the <strong>RHCSA</strong> certification.
            </p>
            <p>
              I also build websites, and I enjoy learning new technology and improving my practical
              IT skills every day.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
