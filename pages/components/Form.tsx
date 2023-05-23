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
      <form onSubmit={handleSubmit}>
        <label htmlFor="area">エリア</label>
        <input type="text" id="area" name="area"/>

        <button type="submit">Submit</button>
      </form>

      <div>
        {
          loading &&
          <p>loading...</p>
        }
      </div>
      <div>
        {
          loading || plans.map((plan) => (
            <div key={plan.place}>
              <h2>{plan.place}</h2>
              <p>{plan.description}</p>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default Form;
