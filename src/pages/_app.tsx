import type { AppProps, NextWebVitalsMetric } from 'next/app'

import '@/src/styles.css'

function PokeServerless({ Component, pageProps }: AppProps) {
  // @ts-ignore
  return <Component {...pageProps} />
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
  switch (metric.name) {
    case 'FCP':
      // handle FCP results
      console.log("FCP: ", metric.value)
      break
    case 'LCP':
      // handle LCP results
      console.log("LCP: ",metric.value)
      break
    case 'CLS':
      // handle CLS results
      console.log("CLS: ",metric.value)
      break
    case 'FID':
      // handle FID results
      console.log("FID: ",metric.value)
      break
    case 'TTFB':
      // handle TTFB results
      console.log("TTFB: ",metric.value)
      break
    // case 'INP':
    // handle INP results (note: INP is still an experimental metric)
    //   break
    case 'Next.js-hydration':
      // handle hydration results
      console.log("Hydration: ",metric.value)
      break
    case 'Next.js-route-change-to-render':
      // handle route-change to render results
      console.log("Router Change to Render: ", metric.value)
      break
    case 'Next.js-render':
      // handle render results
      console.log("Render: ",metric.value)
      break
    default:
      break
  }
}

export default PokeServerless