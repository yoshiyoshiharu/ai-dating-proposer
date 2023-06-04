import { useContext, useState } from "react"; import Loading from "./Loading"; import Cards from "./Cards";
import { PREFECTURES } from "../../consts/prefectures";
import { Spot } from "../../entity/spot";
import { SpotContext } from "../../context/SpotContext";
import Share from "./Share";

type SpotCondition = {
  area: string;
}

const fetchSpots = async (spotCondition: SpotCondition): Promise<Spot[]> => {
  try {
    const res = await fetch("/api/spot?area=" + spotCondition.area)
    if (!res.ok) {
      throw new Error("API response was not ok");
    }

    const spots = await res.json();
    return spots
  } catch {
    return []
  }
}


const Form = () => {
  const [submited, setSubmited] = useState<boolean>(false);
  const { spots, setSpots } = useContext(SpotContext)
  const [fetchingSpot, setFetchingSpot] = useState<boolean>(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setSubmited(true);

    const spotCondition = {
      area: event.target.area.value,
    };

    setFetchingSpot(true);
    const spots = await fetchSpots(spotCondition);
    setSpots(spots);
    setFetchingSpot(false);
  };

  return (
    <>
      {
        fetchingSpot &&
        <Loading top_desc='デートスポットを考えています' bottom_desc='10秒ほどかかります'></Loading>
      }

      <form onSubmit={handleSubmit}>
        <h3 className="form-title">デートスポットの提案</h3>
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

      <Share></Share>

      <Cards submited={submited}></Cards>
      <style jsx>{`
        form {
          width: 50%;
          margin: 30px auto;
          background-color: #ffaaaa;
          padding: 30px;
          border-radius: 10px;
          margin-bottom: 20px;
        }
        @media screen and (max-width: 768px) {
          form {
            width: 90%;
          }
        }
        .form-title {
          font-size: 1rem;
          margin-top: 0;
        }
        .form-group {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
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
        .submit-button {
          width: 100%;
          margin: 20px auto 0 auto;
          padding: 10px;
          border-radius: 10px;
          border: 1px solid #333;
          cursor: pointer;
        }
        .submit-button:hover {
          background-color: pink;
        }
      `}</style>
    </>
  )
}

export default Form;
