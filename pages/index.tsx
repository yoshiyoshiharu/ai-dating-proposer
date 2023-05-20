import Head from 'next/head'
import Header from './components/Header'
import Result  from './components/Result'
import Footer from './components/Footer'
import Form from './components/Form'

const Main = () => {
  return (
    <>
      <Head>
        <title>AIデートプラン提案アプリ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header></Header>
      <Result></Result>
      <Form></Form>
      <Footer></Footer>
    </>
  )
}

export default Main
