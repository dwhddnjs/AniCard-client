import { useEffect, MutableRefObject } from "react"

interface UseObserverProps {
  target: MutableRefObject<Element | null>
  root?: Element | null
  rootMargin?: string
  threshold?: number
  onIntersect: IntersectionObserverCallback
}

export const useObserver = ({
  target,
  root = null,
  rootMargin = "0px",
  threshold = 1.0,
  onIntersect,
}: UseObserverProps): void => {
  useEffect(() => {
    let observer: IntersectionObserver | null = null

    if (target.current) {
      observer = new IntersectionObserver(onIntersect, {
        root,
        rootMargin,
        threshold,
      })
      observer.observe(target.current)
    }

    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [target, root, rootMargin, threshold, onIntersect])
}
