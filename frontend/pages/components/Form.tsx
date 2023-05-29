import { useState } from "react";
import Loading from "./Loading";
import Image from "./Image";

type PlanCondition = {
  area: string;
}

type Plan = {
  place: string;
  description: string;
  photo_references: string[];
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

    console.log(plans)
    const photoReference = "AZose0lfwCvUMojakGDQRyWq2IU_0yXu5S9TFMFrGGtQrzvo8l1Lq8i8efk5mMEuVFgGbvxjzs7xWsft6q8xir-gsrq7LSrDAC0hPmqMpfCcWFdBE5-fOb2naKCrh0ET3ijW-wAH1oI-TTHaq5d2oradJr15ABNxxAuzz8KICJ1rCYNFrubA"
    const objectUrl = await getPhotoUrl(photoReference);
    setImageData(objectUrl);
  };

  const getPhotoUrl = async (photoReference: string)  => {
    const res = await fetch(`http://localhost:8080/api/place_photo?photo_reference=${photoReference}`);
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
        justify-content: space-between;
      }
      `}</style>
    </>
  )
}

export default Form;
