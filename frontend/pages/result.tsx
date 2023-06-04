import { useRouter } from 'next/router';
import Header from './components/Header';
import Footer from './components/Footer';
import Plans from './components/Plans';
import { SpotContext } from '../context/SpotContext';
import { useContext } from 'react';


const ResultPage = () => {
  const router = useRouter();
  const spotIndex = parseInt(router.query.spotIndex as string, 10);
  const { spots, setSpots } = useContext(SpotContext)

  return (
    <>
      <Header></Header>
      {
        spots[spotIndex] == undefined &&
        <h1>スポットが指定されていません</h1>
      }
      {
        spots[spotIndex] !== undefined &&
        <Plans spot={spots[spotIndex]}></Plans>
      }
      <Footer></Footer>
    </>
  );
};

export default ResultPage;
