import { useState, useEffect, useRef, useCallback } from 'react'

// Hook for cursor tracking
export function useCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY })
    const down = () => setClicking(true)
    const up = () => setClicking(false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)

    const hoverEls = document.querySelectorAll('a, button, .btn, input, textarea, select, [data-hover]')
    const enter = () => setHovering(true)
    const leave = () => setHovering(false)
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', enter)
      el.addEventListener('mouseleave', leave)
    })

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
    }
  }, [])

  return { pos, hovering, clicking, setHovering }
}

// Hook for intersection observer (scroll animations)
export function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        observer.disconnect()
      }
    }, { threshold: 0.15, ...options })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return [ref, inView]
}

// Hook for typewriter effect
export function useTypewriter(texts, speed = 60, pause = 1800) {
  const [display, setDisplay] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = texts[textIndex]
    const delay = deleting ? speed / 2 : speed

    const timer = setTimeout(() => {
      if (!deleting) {
        if (charIndex < current.length) {
          setDisplay(current.slice(0, charIndex + 1))
          setCharIndex(c => c + 1)
        } else {
          setTimeout(() => setDeleting(true), pause)
        }
      } else {
        if (charIndex > 0) {
          setDisplay(current.slice(0, charIndex - 1))
          setCharIndex(c => c - 1)
        } else {
          setDeleting(false)
          setTextIndex(i => (i + 1) % texts.length)
        }
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [charIndex, deleting, textIndex, texts, speed, pause])

  return display
}

// Hook for counter animation
export function useCounter(target, duration = 2000, inView = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target, duration])

  return count
}

// Hook for form state management
export function useForm(initialState, validate) {
  const [values, setValues] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setValues(v => ({ ...v, [name]: value }))
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }))
  }, [errors])

  const handleSubmit = useCallback(async (onSubmit) => {
    const validationErrors = validate ? validate(values) : {}
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setSubmitting(true)
    try {
      await onSubmit(values)
      setSubmitted(true)
      setValues(initialState)
    } catch (err) {
      setErrors({ form: 'Error al enviar. Intenta de nuevo.' })
    } finally {
      setSubmitting(false)
    }
  }, [values, validate, initialState])

  return { values, errors, submitting, submitted, handleChange, handleSubmit, setSubmitted }
}