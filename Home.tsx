import { lazy, Suspense, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLang } from '../i18n'

const ArtistStudio = lazy(() => import('../three/ArtistStudio'))

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

export default function Home() {
  const { t } = useLang()
  const navigate = useNavigate()
  const gl = useMemo(hasWebGL, [])
  const [entering, setEntering] = useState(false)

  const enter = () => {
    setEntering(true)
    setTimeout(() => navigate('/museum'), gl ? 1800 : 0)
  }

  return (
    <main className="relative h-svh overflow-hidden bg-indigo">
      <div className="absolute inset-0">
        {gl ? (
          <Suspense fallback={null}>
            <ArtistStudio entering={entering} />
          </Suspense>
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-terracotta via-gold to-turquoise opacity-80" />
        )}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-indigo/95 via-transparent to-indigo/50" />

      <motion.div
        className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-end px-6 pb-14 text-center"
        animate={{ opacity: entering ? 0 : 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="font-serif text-4xl font-bold tracking-[0.18em] text-cream drop-shadow-lg sm:text-6xl md:text-8xl">
          MARTIROS SARYAN
        </h1>
        <p className="mt-3 font-serif text-xl italic text-gold md:text-3xl">{t('home.quote')}</p>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-cream/85 md:text-base">{t('home.subtitle')}</p>
        <p className="glass mt-5 rounded-full px-4 py-1.5 text-xs text-cream/90">{t('home.dates')}</p>
        <button onClick={enter} className="btn-3d pointer-events-auto mt-7 text-sm">
          {t('home.enter')}
        </button>
      </motion.div>
    </main>
  )
}
