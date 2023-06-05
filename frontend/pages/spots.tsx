import Head from 'next/head'
import Header from './components/Header'
import Footer from './components/Footer'
import Form from './components/Form'
import Cards from './components/Cards'
import Loading from './components/Loading'
import { Spot } from '../entity/spot'
import { SpotContext } from '../context/SpotContext'
import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Spots = () => {
  const router = useRouter();
  const { spots, setSpots } = useContext(SpotContext)
  const [loading, setLoading] = useState(false)

  const fetchSpots = async (area: string): Promise<Spot[]> => {
    try {
      const res = await fetch("/api/spot?area=" + area)
      if (!res.ok) {
        throw new Error("API response was not ok");
      }

      const spots = await res.json();
      return spots
    } catch {
      return []
    }
  }

  const area = router.query.area as string;

  useEffect(() => {
    if (area !== undefined && spots.length == 0) {
      setLoading(true)
      fetchSpots(area).then((spots: Spot[]) => {
        setSpots(spots)
        setLoading(false)
      })
    }
  }, []);

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
        <Form area={area}></Form>
        <Cards area={area}></Cards>
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
