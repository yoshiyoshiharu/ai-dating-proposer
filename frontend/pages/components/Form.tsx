import { useState } from "react";

type PlanCondition = {
  area: string;
}

type Plan = {
  place: string;
  description: string;
}

const fetchPlans = async (planCondition: PlanCondition): Promise<Plan[]> => {
  const JSONdata = JSON.stringify(planCondition);

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSONdata,
  };

  const res = await fetch("/api/client", options);
  const jsonRes = await res.json();
  const plans = jsonRes.plans;
  return plans;
}

const Form = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const planCondition = {
      area: event.target.area.value,
    };

    setLoading(true);
    const plans = await fetchPlans(planCondition);
    setPlans(plans);
    setLoading(false);

    console.dir(plans)
  };

  return (
    <>
      {
        loading &&
        <div className="loading">
        </div>
      }

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label" htmlFor="area">エリア</label>
          <input className="input" type="text" id="area" name="area"/>
        </div>

        <button className="submit-button" type="submit">提案してもらう</button>
      </form>

      <div className="cards">
        {
          loading || plans.map((plan) => (
            <div className="card" key={plan.place}>
              <h2>{plan.place}</h2>
              <p>{plan.description}</p>
            </div>
          ))
        }
      </div>
      <style jsx>{`
      form {
        width: 50%;
        margin: 0 auto;
        text-align: center;
        .form-group {
          display: flex;
          margin: 10px;
          .label {
            width: 20%;
          }
          .input {
            width: 100%;
          }
        }
        .submit-button {
          width: 100%;
          margin: 10px auto;
          padding: 10px;
          border-radius: 10px;
          border: 1px solid #333;
          cursor: pointer;
          &:hover {
            background-color: pink;
          }
        }
      }
      .cards {
        .card {
          width: 50%;
          margin: 10px auto;
          padding: 10px;
          border: 1px solid #333;
          border-radius: 10px;
        }
      }
      .loading {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: #333;
        opacity: 0.7;
      }
      `}</style>
    </>
  )
}

export default Form;
