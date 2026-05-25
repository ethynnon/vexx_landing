"use client"

import {
  useState,
  useCallback,
  useRef,
  useEffect,
  type ReactNode,
  type CSSProperties,
} from "react"
import { MoonIcon, SunIcon } from "lucide-react"

export type Theme = "light" | "dark"

export interface AppBarProps {
  logo?: ReactNode
  appName?: string
  onSearch?: (query: string) => void
  userAvatar?: ReactNode
  userName?: string
}

export interface ThemeToggleProps {
  variant?: "default" | "appbar" | "icon"
  appBarProps?: AppBarProps
  defaultTheme?: Theme
  barHeight?: number
  buttonSize?: number
  duration?: number
  onThemeChange?: (theme: Theme) => void
  children?: ReactNode
}

const TOKENS: Record<Theme, Record<string, string>> = {
  light: {
    pageBg:    "#c9c6c1",
    barBg:     "#FEF9F0",
    barText:   "#171616",
    barBorder: "rgba(0,0,0,0.1)",
    btnBg:     "#c9c6c1",
    btnText:   "#171616",
    btnRing:   "rgba(0,0,0,0.15)",
  },
  dark: {
    pageBg:    "#171616",
    barBg:     "#2d2b28",
    barText:   "#e7e6e4",
    barBorder: "rgba(255,255,255,0.1)",
    btnBg:     "#171616",
    btnText:   "#e7e6e4",
    btnRing:   "rgba(255,255,255,0.25)",
  },
}

type CurtainPhase = "idle" | "falling" | "rising"
const EASING = "cubic-bezier(0.76, 0, 0.24, 1)"

export function ThemeToggle({
  variant = "default",
  appBarProps,
  defaultTheme = "dark",
  barHeight: explicitBarHeight,
  buttonSize = 36,
  duration = 550,
  onThemeChange,
  children,
}: ThemeToggleProps) {
  const isAppBar = variant === "appbar"
  const barHeight = explicitBarHeight ?? (isAppBar ? 60 : 44)

  const [theme, setTheme]     = useState<Theme>(defaultTheme)
  const [phase, setPhase]     = useState<CurtainPhase>("idle")
  const [hovered, setHovered] = useState(false)
  const [pressed, setPressed] = useState(false)
  const curtainColorRef       = useRef<string>("")
  const t                     = TOKENS[theme]

  useEffect(() => {
    if (typeof document !== "undefined") {
      const isDark = document.documentElement.classList.contains("dark")
      if (isDark && theme !== "dark") setTheme("dark")
      else if (!isDark && theme !== "light") setTheme("light")
      else if (defaultTheme === "dark") {
        document.documentElement.classList.add("dark")
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggle = useCallback(() => {
    if (phase !== "idle") return
    const next: Theme = theme === "light" ? "dark" : "light"
    curtainColorRef.current = TOKENS[next].pageBg
    setPhase("falling")

    setTimeout(() => {
      setTheme(next)
      onThemeChange?.(next)
      
      if (typeof document !== "undefined") {
        if (next === "dark") document.documentElement.classList.add("dark")
        else document.documentElement.classList.remove("dark")
      }

      setPhase("rising")
      setTimeout(() => setPhase("idle"), duration + 60)
    }, duration)
  }, [phase, theme, duration, onThemeChange])

  const barStyle: CSSProperties = {
    position: "fixed",
    top: 0, left: 0, right: 0,
    height: barHeight,
    background: t.barBg,
    color: t.barText,
    borderBottom: `1px solid ${t.barBorder}`,
    zIndex: 9998,
    display: isAppBar ? "flex" : "block",
    alignItems: "center",
    justifyContent: "space-between",
    padding: isAppBar ? "0 24px" : "0",
    transition: "background 0.3s ease, border-color 0.3s ease, color 0.3s ease",
  }

  const btnScale = pressed ? 0.96 : hovered ? 1.1 : 1
  const btnStyle: CSSProperties = {
    position: isAppBar ? "relative" : "absolute",
    transform: `scale(${btnScale})`,
    width: buttonSize,
    height: buttonSize,
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: t.btnBg,
    color: t.btnText,
    boxShadow: `0 0 0 1.5px ${t.btnRing}`,
    zIndex: 9999,
    outline: "none",
    transition: "background 0.3s ease, color 0.3s ease, transform 0.15s ease, box-shadow 0.3s ease",
    flexShrink: 0,
  }

  const curtainStyle: CSSProperties = {
    position: "fixed",
    inset: 0,
    background: curtainColorRef.current,
    transformOrigin: "top",
    transform: phase === "falling" ? "scaleY(1)" : "scaleY(0)",
    transition: phase !== "idle" ? `transform ${duration}ms ${EASING}` : "none",
    zIndex: 9997,
    pointerEvents: "none",
  }

  return (
    <div style={{ paddingTop: barHeight }}>
      <div aria-hidden="true" style={curtainStyle} />
      
      <div style={barStyle}>
        {isAppBar && (
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1 }}>
            {appBarProps?.logo && (
              <div style={{ display: "flex", alignItems: "center" }}>
                {appBarProps.logo}
              </div>
            )}
            {appBarProps?.appName && (
              <span style={{ fontWeight: 600, fontSize: "1.1rem" }}>
                {appBarProps.appName}
              </span>
            )}
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1, justifyContent: "flex-end" }}>
          {appBarProps?.userAvatar}
          <button
            style={btnStyle}
            onClick={toggle}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => { setHovered(false); setPressed(false); }}
            onMouseDown={() => setPressed(true)}
            onMouseUp={() => setPressed(false)}
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            aria-pressed={theme === "dark"}
          >
            {theme === "light" ? <MoonIcon size={18} /> : <SunIcon size={18} />}
          </button>
        </div>
      </div>

      {children}
    </div>
  )
}
