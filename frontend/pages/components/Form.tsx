import { PREFECTURES } from "../../consts/prefectures";
import { useRouter } from "next/router";
import { Spot } from "../../entity/spot";
import Loading from "./Loading";
import { useState } from "react";
import { useContext } from "react";
import { SpotContext } from "../../contexts/SpotContext";

const Form = ({ area }: { area: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const { spots, setSpots } = useContext(SpotContext)
  const [spotFound, setSpotFound] = useState(true)

  const fetchSpots = async (area: string): Promise<Spot[]> => {
    try {
      const res = await fetch("/api/spot?area=" + area)
      if (!res.ok) {
        throw new Error("API response was not ok");
      }

      const spots = await res.json();
      return spots
    } catch {
      return []
    }
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const area = event.target.area.value

    setLoading(true)
    const spots = await fetchSpots(area)
    setSpots(spots)
    setLoading(false)

    if (spots.length > 0) {
      setSpotFound(true)
      router.push('/spots?area=' + area);
    } else {
      setSpotFound(false)
    }
  };

  return (
    <>
      {
        loading &&
        <Loading top_desc='デートスポットを考えています' bottom_desc='10秒ほどかかります'></Loading>
      }
      {
        !spotFound &&
        <p className="error-message">デートスポットが見つかりませんでした。もう一度お試しください。</p>
      }
      <form onSubmit={handleSubmit}>
        <h3 className="form-title">デートスポットの提案</h3>
        <div className="form-group">
          <label className="label" htmlFor="area">エリア</label>
          <select className="select" name="area" id="area" defaultValue={area} required>
            <option value="">エリアを選択してください</option>
            <>
              {
                PREFECTURES.map((prefecture) => (
                  <option key={prefecture.label} value={prefecture.value}>
                    {prefecture.label}
                  </option>
                ))
              }
            </>
          </select>
        </div>

        <button className="submit-button" type="submit">提案してもらう</button>
      </form>

      <style jsx>{`
        .error-message {
          color: #f44336;
          text-align: center;
        }
        form {
          background-color: #ffaaaa;
          padding: 30px;
          border-radius: 10px;
          margin-bottom: 20px;
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
