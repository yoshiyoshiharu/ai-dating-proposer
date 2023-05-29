import { Plan } from '../../entity/plan';
import Image from './Image';

const Cards = ({ plans }: { plans: Plan[] }) => {
  return (
    <>
      <div className="cards">
        {
          plans.length == 0 || plans.map((plan) => (
            <div className="card" key={plan.place}>
              <h2>{plan.place}</h2>
              <div className="photos">
                {
                  plan.photo_references?.map((photoReference: string) => (
                    <Image photoReference={photoReference}></Image>
                  ))
                }
              </div>
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
        .photos {
          display: flex;
          width: 100%;
          overflow: scroll;
        }
      `}</style>
    </>
  )
}

export default Cards;
