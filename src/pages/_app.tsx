import type { AppProps, NextWebVitalsMetric } from 'next/app'

import '../styles.css'

function PokeServerless({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
  console.log(metric)
}

export default PokeServerless
