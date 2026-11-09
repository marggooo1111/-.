import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { translations } from './data/translations'
import type { Key, Lang } from './data/translations'

interface Ctx {
  lang: Lang
  setLang: (l: Lang) => void
  t: (k: Key) => string
}
const LangContext = createContext<Ctx | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const s = localStorage.getItem('lang')
      if (s === 'ru' || s === 'hy' || s === 'en') return s
    } catch { /* storage unavailable */ }
    return 'ru'
  })
  useEffect(() => {
    try { localStorage.setItem('lang', lang) } catch { /* storage unavailable */ }
    document.documentElement.lang = lang
  }, [lang])
  const t = (k: Key) => translations[lang][k]
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>
}

export function useLang() {
  const c = useContext(LangContext)
  if (!c) throw new Error('LangProvider is missing')
  return c
}
