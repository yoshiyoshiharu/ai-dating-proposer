import Head from 'next/head'
import Header from './components/Header'
import Footer from './components/Footer'
import Form from './components/Form'
import Description from './components/Description'
import { SpotContext } from '../context/SpotContext'
import { useContext } from 'react'

const Main = () => {
  const { spots, setSpots } = useContext(SpotContext)

  return (
    <>
      <Head>
        <title>AIデートプラン提案アプリ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header></Header>
      <main>
        <Description></Description>
        <Form area=""></Form>
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

export default Main
