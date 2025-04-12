
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    // Initialize with current window width if available
    return typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false
  })

  React.useEffect(() => {
    if (typeof window === 'undefined') return
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Add event listener
    window.addEventListener('resize', handleResize)
    
    // Call handler right away to set initial state
    handleResize()
    
    // Clean up on unmount
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isMobile
}

// Custom hook to get viewport dimensions
export function useViewport() {
  const [viewport, setViewport] = React.useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })
  
  React.useEffect(() => {
    if (typeof window === 'undefined') return
    
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    
    window.addEventListener('resize', handleResize)
    handleResize()
    
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  return viewport
}
