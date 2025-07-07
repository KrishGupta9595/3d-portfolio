"use client"

import React from "react"

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("3D Scene Error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="w-full h-full bg-gradient-to-br from-blue-900/20 to-purple-900/20 relative overflow-hidden">
            {/* Animated CSS-only background as fallback */}
            <div className="absolute inset-0">
              {/* Floating geometric shapes */}
              <div className="absolute top-1/4 left-1/4 w-16 h-16 border-2 border-blue-500/30 rotate-45 animate-pulse"></div>
              <div className="absolute top-3/4 right-1/4 w-12 h-12 border-2 border-purple-500/30 rounded-full animate-bounce"></div>
              <div className="absolute top-1/2 left-3/4 w-8 h-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rotate-12 animate-spin"></div>

              {/* Grid pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="grid grid-cols-6 grid-rows-6 h-full w-full gap-4 p-4">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div
                      key={i}
                      className="border border-blue-500/20 animate-pulse"
                      style={{
                        animationDelay: `${i * 0.1}s`,
                        animationDuration: "2s",
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating code elements */}
            <div className="absolute top-1/3 left-1/6 text-blue-400/60 font-mono text-sm animate-float">
              {"<code />"}
            </div>
            <div className="absolute bottom-1/3 right-1/6 text-purple-400/60 font-mono text-sm animate-float-delayed">
              {"{ dev }"}
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}
