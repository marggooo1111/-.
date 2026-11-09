import { useLang } from '../i18n'
import type { Key } from '../data/translations'

export default function ComingSoon({ k }: { k: Key }) {
  const { t } = useLang()
  return (
    <main className="grid min-h-svh place-items-center bg-indigo px-6 pt-24">
      <section className="glass max-w-xl rounded-3xl p-10 text-center">
        <h1 className="font-serif text-4xl font-bold text-gold md:text-5xl">{t(k)}</h1>
        <p className="mt-4 text-cream/85">{t('soon.text')}</p>
      </section>
    </main>
  )
}
