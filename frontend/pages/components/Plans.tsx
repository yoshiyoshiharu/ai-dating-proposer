import { Plan } from '../../entity/plan';

export default function Plans({ plan }: { plan: Plan[] }) {
  return (
    <>
    <div className='plan'>
      {plan.map((plan: Plan) => (
        <div>
          <p className='title'>{plan.time} : {plan.plan}</p>
          <p className='description'>{plan.description}</p>
        </div>
      ))}
    </div>
    <style jsx>{`
      .plan {
        width: 50%;
        margin: 30px auto;
        background-color: #fff;
        padding: 10px;
        border-radius: 10px;
      }
      .title {
        font-size: 1.5rem;
        border-bottom: 1px solid #333;
        color: #FF9999;
      }
      .description {

      }
    `}</style>
    </>
  )
}
