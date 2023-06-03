import { useRouter } from 'next/router';
import Header from './components/Header';
import Footer from './components/Footer';
import Plans from './components/Plans';

const ResultPage = () => {
  const router = useRouter();
  const { plans, spot } = router.query as { plans: string, spot: string };
  const parsedPlan = plans != undefined ? JSON.parse(plans) : undefined;
  const parsedSpot = spot != undefined ? JSON.parse(spot) : undefined;

  return (
    <>
      <Header></Header>
      { parsedPlan != undefined && parsedPlan.length > 0 &&
        <Plans plan={parsedPlan} spot={parsedSpot}></Plans>
      }
      <Footer></Footer>
    </>
  );
};

export default ResultPage;
