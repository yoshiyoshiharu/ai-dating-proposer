import { useState } from "react"; import Loading from "./Loading"; import Cards from "./Cards";
import { PREFECTURES } from "../../consts/prefectures";
import { Plan } from "../../entity/plan";

type PlanCondition = {
  area: string;
}

const fetchPlans = async (planCondition: PlanCondition): Promise<Plan[]> => {
  try {
    const res = await fetch("https://plan-hisx7j6zla-an.a.run.app/api/plans?area=" + planCondition.area)
    if (!res.ok) {
      throw new Error("API response was not ok");
    }

    const plans = await res.json();
    return plans
  } catch {
    return []
  }
}


const Form = () => {
  const [submited, setSubmited] = useState<boolean>(false);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [fetchingPlan, setFetchingPlan] = useState<boolean>(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setSubmited(true);

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
          <select className="select" name="area" id="area" required>
            <option value="">エリアを選択してください</option>
            <>
              {
                PREFECTURES.map((prefecture) => (
                  <option key={prefecture.label} value={prefecture.value}>{prefecture.label}</option>
                ))
              }
            </>
          </select>
        </div>

        <button className="submit-button" type="submit">提案してもらう</button>
      </form>

      <Cards plans={plans} submited={submited}></Cards>
      <style jsx>{`
      form {
        width: 50%;
        margin: 0 auto;
        background-color: #ffaaaa;
        padding: 30px;
        border-radius: 10px;
        margin-bottom: 20px;
        .form-group {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .label {
            width: 60px;
            white-space: nowrap;
          }
          .select {
            width: 90%;
            box-sizing: border-box;
            padding: 10px;
            height: 40px;
            border-radius: 10px;
            color: #555;
          }
        }
        .submit-button {
          width: 100%;
          margin: 20px auto 0 auto;
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
