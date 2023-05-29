import { useState } from "react";
import Loading from "./Loading";
import Image from "./Image";
import { PREFECTURES } from "../consts/prefectures";

type PlanCondition = {
  area: string;
}

type Plan = {
  place: string;
  description: string;
  photo_references: string[];
}

const fetchPlans = async (planCondition: PlanCondition): Promise<Plan[]> => {
  const res = await fetch("http://localhost:8080/api/plans?area=" + planCondition.area)
  const plans = await res.json();
  return plans
}

const Form = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [fetchingPlan, setFetchingPlan] = useState<boolean>(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const planCondition = {
      area: event.target.area.value,
    };

    setFetchingPlan(true);
    const plans = await fetchPlans(planCondition);
    setPlans(plans);
    setFetchingPlan(false);
  };

  return (
    <>
      {
        fetchingPlan &&
        <Loading></Loading>
      }

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label" htmlFor="area">エリア</label>
          <select name="area" id="area" required>
            <option value="">エリアを選択してください</option>
            <>
            {
              PREFECTURES.map((prefecture) => (
                <option value={prefecture.value}>{prefecture.label}</option>
              ))
            }
            </>
            <option value="東京都">東京都</option>
            <option value="大阪府">大阪府</option>
          </select>
        </div>

        <button className="submit-button" type="submit">提案してもらう</button>
      </form>

      <div className="cards">
        {
          fetchingPlan || plans.map((plan) => (
            <div className="card" key={plan.place}>
              <h2>{plan.place}</h2>
              <div className="photos">
                {
                  plan.photo_references.map((photoReference) => (
                    <Image photoReference={photoReference}></Image>
                  ))
                }
              </div>
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
      .photos {
        display: flex;
        width: 100%;
        overflow: scroll;
        justify-content: space-between;
      }
      `}</style>
    </>
  )
}

export default Form;
