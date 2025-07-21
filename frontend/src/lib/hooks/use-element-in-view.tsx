import { useEffect, useRef, useState } from 'react'

export const useElementInView = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const callback = (entrities: IntersectionObserverEntry[]) => {
    const [entry] = entrities
    setIsVisible(entry.isIntersecting)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callback, {
      root: null,
      rootMargin: '50px',
      threshold: 1
    })
    if(containerRef.current) observer.observe(containerRef.current)
    
    
    return () => {
      if(containerRef.current) observer.unobserve(containerRef.current)
    }
  }, [containerRef])

  return { isVisible, containerRef }
}