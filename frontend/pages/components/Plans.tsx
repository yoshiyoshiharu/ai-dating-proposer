import { Plan } from '../../entity/plan';
import Images from './Images';
import Link from 'next/link';
import Share from './Share';
import { Spot } from '../../entity/spot';
import { SpotContext } from '../../contexts/SpotContext';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import Loading from './Loading';

export default function Plans({ spot }: { spot: Spot }) {
  const router = useRouter();
  const spotIndex = Number(router.query.spot_index)

  const area = router.query.area
  const { spots, setSpots } = useContext(SpotContext)
  const [loading, setLoading] = useState<boolean>(false);
  const [planFound, setPlanFound] = useState(true)

  const fetchPlans = async (place: string): Promise<Plan[]> => {
    try {
      const res = await fetch("/api/plan?spot=" + place + "&area=" + area)

      if (!res.ok) {
        throw new Error("Plan API response was not ok");
      }

      const plans: Plan[] = await res.json();
      return plans
    } catch {
      return []
    }
  }

  const updatePlans = (index: number, newPlans: Plan[]) => {
    setSpots(Spots => {
      Spots[index].plans = newPlans;
      return Spots;
    });
  };

  const handleClick = async () => {
    const spot = spots[spotIndex]
    setLoading(true)
    const newPlans = await fetchPlans(spot.place)
    updatePlans(spotIndex, newPlans)
    setLoading(false)

    const plans = spots[spotIndex].plans

    if (plans !== undefined && plans.length > 0) {
      router.push({
        pathname: '/result',
        query: { spot_index: spotIndex, area: area }
      })
    } else {
      setPlanFound(false)
    }
  }

  return (
    <>
      {
        loading &&
        <Loading top_desc='デートプランを考えています' bottom_desc='20秒ほどかかります'></Loading>
      }
      {
        spot != undefined &&
        <div className='plan'>
          <div className='plan-header'>
            <h2 className='plan-title'>{spot.place}周辺でのデートプラン</h2>
            <Link className='back-link' href={"/spots?area=" + spot.area}>スポット一覧に戻る</Link>
          </div>
          <Images imageUrls={spot.image_urls}></Images>
          {
            spot.plans == undefined || spot.plans.length == 0 &&
            <p className='error-message'>プランが見つかりませんでした。もう一度試してください。</p>
          }
          <Share></Share>
          <ul className="time-schedule">
          {spot.plans.length > 0 && spot.plans.map((plan: Plan) => (
              <li key={plan.time}>
                <span className="time">{plan.time}</span>
                <div className="sch_box"><p className="sch_title">{plan.plan}</p>
              </div>
            </li>
          ))}
          </ul>
          <button className='try-again' onClick={handleClick}>もう一度試す</button>
        </div>
      }
      <style jsx>{`
        .plan-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .plan-header > a {
          border-bottom: 1px solid #333;
        }
        @media screen and (max-width: 768px) {
          .plan-header {
            display: block;
            margin-bottom: 10px;
          }
          .plan-header > a {
            display: inline-block;
            margin: 10px 0;
          }
          .plan-title {
            font-size: 1.3rem;
            margin-bottom: 0;
          }
          .title {
            font-size: 1.2rem;
          }
        }
        .plan {
          margin: 30px auto;
          background-color: #fff;
          padding: 20px;
          border-radius: 10px;
        }
        .time {
          font-size: 1rem;
        }
        .time-schedule {
          width: 80%;
          list-style: none;
          margin: 3rem auto 0 5rem;
          padding-left: 20px;
          border-left: 6px solid #faa;
          box-sizing: border-box;
        }
        .time-schedule li {
          width: 100%;
          margin: 0 0;
          padding: 5px 0;
          position: relative;
        }
        .time-schedule span.time {
          width: 5em;
          display: inline-block;
          margin-left: -8em;
          padding: 0 0 5px;
          margin-top: 15px;
          vertical-align: top;
          position: relative;
          text-align: right;
          box-sizing: border-box;
        }
        .time-schedule span.time::after {
          content: "";
          position: absolute;
          right: -35px;
          top: 0;
          background: #faa;
          width: 20px;
          height: 20px;
          border-radius: 10px;
        }
        .time-schedule .sch_box {
          display: inline-block;
          width: 100%;
          margin-left: 30px;
          padding: 15px 10px 15px 10px;
          vertical-align: middle;
          background: #efefef;
          box-sizing: border-box;
          border-radius: 6px;
        }
        .time-schedule .sch_title {
          font-size: 0.9rem;
          font-weight: 700;
        }
        .time-schedule .sch_tx {
          font-size: 14px;
          font-weight: normal;
        }
        .error-message {
          color: #f44336;
          text-align: center;
        }
        .description {
          font-size: 1rem;
          margin: 10px;
        }
        .try-again {
          display: block;
          width: 100%;
          padding: 10px 20px;
          margin-top: 20px;
          border-radius: 20px;
          background-color: #faa;
          color: #fff;
          border: none;
          font-size: 1rem;
          cursor: pointer;
        }
        .try-again:hover {
          opacity: 0.8;
        }
      `}</style>
    </>
  )
}
