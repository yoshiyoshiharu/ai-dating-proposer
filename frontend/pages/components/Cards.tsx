import React, { useState } from 'react';
import { Spot } from '../../entity/spot';
import { Plan } from '../../entity/plan';
import Images from './Images';
import Link from 'next/link';
import Loading from './Loading';

const fetchPlan = async (spot: string): Promise<Plan[]> => {
  try {
    const res = await fetch("/api/plan?spot=" + spot)

    if (!res.ok) {
      throw new Error("Plan API response was not ok");
    }

    const plans = await res.json();

    return plans
  } catch {
    return []
  }
}

const Cards = ({ spots, submited }: { spots: Spot[], submited: boolean }) => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [fetchingPlan, setFetchingPlan] = useState<boolean>(false);

  const handleClick = async (spot: string) => {
    setFetchingPlan(true);
    const plans = await fetchPlan(spot)
    setPlans(plans);
    setFetchingPlan(false);
    console.log(plans)
  };

  if (submited && spots.length == 0) {
    return (
      <>
        <h2>プランが見つかりませんでした。もう一度試してください。</h2>
        <style jsx>{`
         h2 {
            text-align: center;
         }
      `}</style>
      </>
    )
  } else {
    return (
      <>
        {
          fetchingPlan &&
          <Loading></Loading>
        }
        <div className="cards">
          {
            spots !== undefined && spots.map((spot) => (
              <div className="card" key={spot.place}>
                <div className='card-header'>
                  <Link href={"https://www.google.co.jp/maps?q=" + spot.place} target='_blank'>
                    <span className='place'>{spot.place}</span>
                  </Link>
                  <button type="button" className="fetch-plan-button" onClick={() => handleClick(spot.place)}>
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
            width: 50%;
            background-color: #fff;
            margin: 10px auto;
            padding: 10px;
            border: 1px solid #333;
            border-radius: 10px;
          }
          @media screen and (max-width: 768px) {
            .card {
              width: 90%;
            }
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
}

export default Cards;
