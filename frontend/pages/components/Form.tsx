import { useState } from "react";
import Loading from "./Loading";
import Cards from "./Cards";
import { PREFECTURES } from "../../consts/prefectures";
import { Plan } from "../../entity/plan";

type PlanCondition = {
  area: string;
}

const fetchPlans = async (planCondition: PlanCondition): Promise<Plan[]> => {
  try {
    const res = await fetch("http://localhost:8080/api/plans?area=" + planCondition.area)
    const plans = await res.json();
    return plans
  } catch {
    return []
  }
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
          </select>
        </div>

        <button className="submit-button" type="submit">提案してもらう</button>
      </form>

      <Cards plans={plans}></Cards>
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
      `}</style>
    </>
  )
}

export default Form;
