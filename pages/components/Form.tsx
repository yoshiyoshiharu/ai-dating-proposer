import { useState } from "react";

type PlanCase = {
  area: string;
}

type Plan = {
  area: string;
  description: string;
}

const fetchPlans = async (planCase: PlanCase): Promise<Plan[]> => {
  const JSONdata = JSON.stringify(planCase);

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
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      area: event.target.area.value,
    };

    const plans = fetchPlans(data);

    console.dir(plans)
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="area">エリア</label>
        <input type="text" id="area" name="area"/>

        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default Form;
