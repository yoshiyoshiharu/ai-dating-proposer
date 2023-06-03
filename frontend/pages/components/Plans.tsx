import { useEffect, useState } from 'react';
import { Plan } from '../../entity/plan';
import { Spot } from '../../entity/spot';
import Images from './Images';
import Loading from './Loading';

export default function Plans({ spot }: { spot: Spot }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [plans, setPlans] = useState<Plan[]>([]);

  const fetchPlan = async (spot: string): Promise<Plan[]> => {
    try {
      setLoading(true);
      const res = await fetch("/api/plan?spot=" + spot)
      setLoading(false);

      if (!res.ok) {
        throw new Error("Plan API response was not ok");
      }

      const plans: Plan[] = await res.json();
      return plans
    } catch {
      return []
    }
  }

  useEffect(() => {
    fetchPlan(spot.place).then((plans: Plan[]) => {
      setPlans(plans)
    })
  }, [])

  return (
    <>
      {
        spot != undefined &&
        <div className='plan'>
          <h2>{spot.place}周辺でのデートプラン</h2>
          <Images imageUrls={spot.image_urls}></Images>
          {
            loading &&
            <Loading top_desc='デートプランを考えています' bottom_desc='20秒ほどかかります'></Loading>
          }
          {plans.length == 0 && <p>プランが見つかりませんでした。もう一度試してください。</p>}
          {plans.length > 0 && plans.map((plan: Plan) => (
            <div key="plan.time">
              <p className='title'>{plan.time} : {plan.plan}</p>
              <p className='description'>{plan.description}</p>
            </div>
          ))}
        </div>
      }
      <style jsx>{`
      .plan {
        width: 50%;
        margin: 30px auto;
        background-color: #fff;
        padding: 20px;
        border-radius: 10px;
      }
      @media screen and (max-width: 768px) {
        .plan {
          width: 90%;
        }
      }
      .title {
        font-size: 1.4rem;
        border-bottom: 1px solid #333;
        color: #F88;
      }
      .description {
        font-size: 1rem;
        margin: 10px;
      }
    `}</style>
    </>
  )
}
