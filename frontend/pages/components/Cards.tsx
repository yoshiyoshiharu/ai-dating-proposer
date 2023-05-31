import { Plan } from '../../entity/plan';
import Images from './Images';

const Cards = ({ plans, submited }: { plans: Plan[], submited: boolean }) => {
  if (submited && plans.length == 0) {
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
        <div className="cards">
          {
            plans !== undefined && plans.map((plan) => (
              <div className="card" key={plan.place}>
                <h2 className="place">{plan.place}</h2>
                <Images imageUrls={plan.image_urls}></Images>
              </div>
            ))
          }
        </div>
        <style jsx>{`
          .cards {
            .card {
              .place {
                font-size: 1rem;
              }
              width: 50%;
              background-color: #fff;
              margin: 10px auto;
              padding: 10px;
              border: 1px solid #333;
              border-radius: 10px;
              @media screen and (max-width: 768px) {
                width: 90%;
              }
            }
          }
        `}</style>
      </>
    )
  }
}

export default Cards;
