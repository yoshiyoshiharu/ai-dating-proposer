import React, { useState, useContext } from 'react';
import { Spot } from '../../entity/spot';
import Images from './Images';
import Loading from './Loading';
import Link from 'next/link';
import router from 'next/router';
import { SpotContext } from '../../contexts/SpotContext';
import { Plan } from '../../entity/plan';



const Cards = () => {
  const area = router.query.area
  const { spots, setSpots } = useContext(SpotContext)
  const [loading, setLoading] = useState<boolean>(false);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [planFound, setPlanFound] = useState(true)

  const fetchPlan = async (place: string): Promise<Plan[]> => {
    try {
      const res = await fetch("/api/plan?spot=" + place)

      if (!res.ok) {
        throw new Error("Plan API response was not ok");
      }

      const plans: Plan[] = await res.json();
      return plans
    } catch {
      return []
    }
  }

  const handleClick = async (spotIndex: number) => {
    const spot = spots[spotIndex]
    setLoading(true)
    const plans = await fetchPlan(spot.place)
    setPlans(plans)
    setLoading(false)

    if (plans.length > 0) {
      router.push({
        pathname: '/result',
        query: { spotIndex: spotIndex, area: area }
      })
    } else {
      setPlanFound(false)
    }
  };

  return (
    <>
      {
        loading &&
        <Loading top_desc='デートプランを考えています' bottom_desc='10秒ほどかかります'></Loading>
      }
      {
        !planFound &&
        <p className="error-message">デートプランが見つかりませんでした。もう一度お試しください。</p>
      }
      <div className="cards">
        {
          spots !== undefined && spots.map((spot: Spot, index: number) => (
            <div className="card" key={index}>
              <div className='card-header'>
                <Link href={"https://www.google.co.jp/maps?q=" + spot.place + " " + area} target='_blank'>
                  <span className='place'>{spot.place}</span>
                </Link>
                <button type="button" className="fetch-plan-button" onClick={() => handleClick(index)}>
                  デートプランを組んでもらう
                </button>
              </div>
              <Images imageUrls={spot.image_urls}></Images>
            </div>
          ))
        }
      </div>
      <style jsx>{`
          .card {
            background-color: #fff;
            margin: 10px auto;
            padding: 10px;
            border: 1px solid #333;
            border-radius: 10px;
          }
          .place {
            display: inline-block;
            margin-left: 10px;
            font-size: 1rem;
            border-bottom: 1px solid #333;
            color: #333;
            font-weight: bold;
          }
          .place:hover {
            opacity: 0.5;
          }
          .card-header {
            display: flex;
            margin-bottom: 10px;
            justify-content: space-between;
          }
          @media screen and (max-width: 768px) {
            .card-header {
              display: block;
            }
            .fetch-plan-button {
              margin-top: 10px;
              margin-left: 10px;
            }
          }
          .fetch-plan-button {
            display: block;
            background-color: lightblue;
            color: #333;
            font-weight: bold;
            border-radius: 10px;
            border: none;
            padding: 5px 10px;
            cursor: pointer;
          }
          .fetch-plan-button:hover {
            opacity: 0.8;
          }
        `}</style>
    </>
  )
}

export default Cards;
