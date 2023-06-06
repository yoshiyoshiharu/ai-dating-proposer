import { useEffect, useState } from 'react';
import { Plan } from '../../entity/plan';
import { Spot } from '../../entity/spot';
import Images from './Images';
import Loading from './Loading';
import Link from 'next/link';
import Share from './Share';

export default function Plans({ plans, area, spot }: { plans: Plan[], area: string, spot: Spot }) {
  return (
    <>
      {
        spot != undefined &&
        <div className='plan'>
          <div className='plan-header'>
            <h2 className='plan-title'>{spot.place}周辺でのデートプラン</h2>
            <Link href={"/spots?area=" + area}>スポット一覧に戻る</Link>
          </div>
          <Images imageUrls={spot.image_urls}></Images>
          {
            plans.length == 0 &&
            <p className='error-message'>プランが見つかりませんでした。もう一度試してください。</p>
          }
          <Share></Share>
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
          margin: 30px auto;
          background-color: #fff;
          padding: 20px;
          border-radius: 10px;
        }
        .plan-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .plan-title {
          font-size: 1.2rem;
        }
        .title {
          font-size: 1.4rem;
          border-bottom: 1px solid #333;
          color: #F77;
        }
        .error-message {
          font-size: 0.8rem;
        }
        @media screen and (max-width: 768px) {
          .plan-header {
            display: block;
            margin-bottom: 10px;
          }
          .plan-title {
            margin-bottom: 0;
          }
          .title {
            font-size: 1.2rem;
          }
        }
        .description {
          font-size: 1rem;
          margin: 10px;
        }
     `}</style>
    </>
  )
}
