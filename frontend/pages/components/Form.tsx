import { useState } from "react";
import Loading from "./Loading";

type PlanCondition = {
  area: string;
}

type Plan = {
  place: string;
  description: string;
}

const fetchPlans = async (planCondition: PlanCondition): Promise<Plan[]> => {
  const res = await fetch("/api/client");
  const jsonRes = await res.json();
  const plans = jsonRes.plans;
  return plans;
}

const Form = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [fetchingPlan, setFetchingPlan] = useState<boolean>(false);
  const [imageData, setImageData] = useState<string>("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const planCondition = {
      area: event.target.area.value,
    };

    setFetchingPlan(true);
    const plans = await fetchPlans(planCondition);
    setPlans(plans);
    setFetchingPlan(false);

    const objectUrl = await getPhotoUrl();
    setImageData(objectUrl);
  };

  const getPhotoUrl = async ()  => {
    const res = await fetch("http://localhost:8080/api/place_photo");
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  }

  return (
    <>
      {
        fetchingPlan &&
        <Loading></Loading>
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
          fetchingPlan || plans.map((plan) => (
            <div className="card" key={plan.place}>
              <h2>{plan.place}</h2>
              <img src={imageData}></img>
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
      `}</style>
    </>
  )
}

export default Form;
