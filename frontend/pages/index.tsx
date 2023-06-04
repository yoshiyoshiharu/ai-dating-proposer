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
        { spots.length == 0 && <Description></Description> }
        <Form></Form>
      </main>
      <Footer></Footer>
      <style jsx>{`
        main {
          min-height: calc(100vh - 7rem);
      `}</style>
    </>
  )
}

export default Main
