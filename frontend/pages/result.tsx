import { useRouter } from 'next/router';
import Header from './components/Header';
import Footer from './components/Footer';
import Plans from './components/Plans';
import { SpotContext } from './components/SpotContext';
import { useState, useEffect, useContext } from 'react';


const ResultPage = () => {
  const router = useRouter();
  const { spot_index } = router.query as { spot_index: string };
  const { spots, setSpots } = useContext(SpotContext)

  return (
    <>
      <Header></Header>
      {
        spots[spot_index] == undefined &&
        <h1>スポットが指定されていません</h1>
      }
      {
        spots[spot_index] !== undefined &&
        <Plans spot={spots[spot_index]}></Plans>
      }
      <Footer></Footer>
    </>
  );
};

export default ResultPage;
