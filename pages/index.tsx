import { GetServerSideProps } from "next";
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

type Image = {
  url: string;
}

const fetchImage = async (): Promise<Image> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await res.json();
  console.log(images);
  return images[0];
};

export const getServerSideProps: GetServerSideProps = async () => {
  const image = await fetchImage();
  return {
    props: {
      initialimageUrl: image.url,
    },
  };
}
