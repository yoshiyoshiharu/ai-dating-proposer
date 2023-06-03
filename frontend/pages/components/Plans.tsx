import { Plan } from '../../entity/plan';
import { Spot } from '../../entity/spot';
import Images from './Images';

export default function Plans({ spot }: { spot: Spot }) {
  const plan = [
    {
      time: '12:00',
      plan: 'ランチ',
      description: 'ランチの説明'
    },
  ]

  return (
    <>
      {
        spot != undefined &&
        <div className='plan'>
          <h2>{spot.place}周辺でのデートプラン</h2>
          <Images imageUrls={spot.image_urls}></Images>
          {plan.length == 0 && <p>プランが見つかりませんでした。もう一度試してください。</p>}
          {plan.length > 0 && plan.map((plan: Plan) => (
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
