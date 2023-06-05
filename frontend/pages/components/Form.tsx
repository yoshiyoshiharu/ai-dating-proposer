import { PREFECTURES } from "../../consts/prefectures";
import Share from "./Share";
import { useRouter } from "next/router";

const Form = ({ area }: { area: string }) => {
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const spotCondition = {
      area: event.target.area.value,
    };

    router.push('/spots?area=' + spotCondition.area);
  };

  return (
    <>
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

      <Share></Share>

      <style jsx>{`
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
