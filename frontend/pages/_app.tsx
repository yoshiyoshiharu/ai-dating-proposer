import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SpotContext } from '../contexts/SpotContext'
import { useState } from 'react'
import { Spot } from '../entity/spot'

function MyApp({ Component, pageProps }: AppProps) {
  const [spots, setSpots] = useState<Spot[]>([]);

  return (
    <SpotContext.Provider value={{ spots, setSpots }}>
      <Component {...pageProps} />
    </SpotContext.Provider>
  )
}

export default MyApp
