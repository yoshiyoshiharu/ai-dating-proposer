import Head from 'next/head'
import Header from './components/Header'
import Footer from './components/Footer'
import Form from './components/Form'
import Description from './components/Description'

const Main = () => {
  return (
    <>
      <Head>
        <title>AIデートプラン提案アプリ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header></Header>
      <Description></Description>
      <Form></Form>
      <Footer></Footer>
    </>
  )
}

export default Main
