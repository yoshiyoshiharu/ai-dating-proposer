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
            plans.map((plan) => (
              <div className="card" key={plan.place}>
                <h2>{plan.place}</h2>
                <Images imageUrls={plan.image_urls}></Images>
              </div>
            ))
          }
        </div>
        <style jsx>{`
          .cards {
            .card {
              width: 50%;
              background-color: #fff;
              margin: 10px auto;
              padding: 10px;
              border: 1px solid #333;
              border-radius: 10px;
            }
          }
        `}</style>
      </>
    )
  }
}

export default Cards;
