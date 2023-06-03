import { useRouter } from 'next/router';
import Header from './components/Header';
import Footer from './components/Footer';
import Plans from './components/Plans';

const ResultPage = () => {
  const router = useRouter();
  const { plans } = router.query as { plans: string };
  const parsedPlan = plans != undefined ? JSON.parse(plans) : undefined;

  return (
    <>
      <Header></Header>
      { parsedPlan != undefined && parsedPlan.length > 0 &&
        <Plans plan={parsedPlan}></Plans>
      }
      <Footer></Footer>
    </>
  );
};

export default ResultPage;
