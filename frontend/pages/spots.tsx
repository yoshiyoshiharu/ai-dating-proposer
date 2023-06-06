import Head from 'next/head'
import Header from './components/Header'
import Footer from './components/Footer'
import Cards from './components/Cards'
import Loading from './components/Loading'
import Share from './components/Share'
import { Spot } from '../entity/spot'
import { SpotContext } from '../context/SpotContext'
import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Spots = () => {
  const router = useRouter();
  const { spots, setSpots } = useContext(SpotContext)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (spots.length == 0) {
      router.push('/');
    }
  }, [])

  return (
    <>
      {
        loading &&
        <Loading top_desc='デートスポットを考えています' bottom_desc='10秒ほどかかります'></Loading>
      }

      <Head>
        <title>AIデートプラン提案アプリ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header></Header>
      <main>
        <Share></Share>
        {
          spots.length == 0 &&
          <p>デートスポットが見つかりませんでした。もう一度お試しください。</p>
        }
        {
          spots.length > 0 &&
          <Cards></Cards>
        }
      </main>
      <Footer></Footer>
      <style jsx>{`
        main {
          min-height: calc(100vh - 9rem);
          width: 50%;
          margin: 0 auto;
        }
        @media screen and (max-width: 768px) {
          main {
            width: 90%;
          }
        }
      `}</style>
    </>
  )
}

export default Spots
