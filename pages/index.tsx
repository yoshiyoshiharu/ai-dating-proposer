import Head from 'next/head'
import Header from './components/Header'
import Footer from './components/Footer'

const Main = () => {
  return (
    <>
      <Head>
        <title>AIデートプラン提案アプリ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header></Header>
      <Footer></Footer>
    </>
  )
}

export default Main
