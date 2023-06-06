import { useRouter } from 'next/router';
import Header from './components/Header';
import Footer from './components/Footer';
import Plans from './components/Plans';
import { SpotContext } from '../contexts/SpotContext';
import { useContext } from 'react';


const ResultPage = () => {
  const router = useRouter();
  const spotIndex = parseInt(router.query.spotIndex as string, 10);
  const area = router.query.area as string;
  const { spots, setSpots } = useContext(SpotContext)

  return (
    <>
      <Header></Header>
      <main>
        {
          spots[spotIndex] == undefined &&
          <p>スポットが指定されていません</p>
        }
        {
          spots[spotIndex] !== undefined &&
          <Plans spot={spots[spotIndex]} area={area}></Plans>
        }
        <style jsx>{`
        main {
          min - height: calc(100vh - 7rem);
          width: 50%;
          margin: 0 auto;
        }
          @media screen and (max-width: 768px) {
            main {
            width: 90%;
          }
        }
      `}</style>
      </main>
      <Footer></Footer>
    </>
  );
};

export default ResultPage;
