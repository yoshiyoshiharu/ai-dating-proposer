import { useEffect, useState } from "react"
import { Trivia } from "../../entity/trivia"
import { TRIVIAS } from "../../consts/trivias"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faForward } from "@fortawesome/free-solid-svg-icons"

export default function Trivia () {
  const [trivia, setTrivia] = useState<Trivia>()
  const [showTrivia, setShowTrivia] = useState(true);

  const fetchTrivia = () => {
    setShowTrivia(false)

    setTimeout(() => {
      setTrivia(TRIVIAS[Math.floor(Math.random() * TRIVIAS.length)])
      setShowTrivia(true)
    }, 500);
  }

  useEffect(() => {
    setTrivia(TRIVIAS[Math.floor(Math.random() * TRIVIAS.length)])
  }, [])

  return (
    <>
      {
        trivia &&
        <div className='trivia'>
          <div className="trivia-header">
            <h3>デートを成功させよう</h3>
            <button onClick={fetchTrivia} className="next-trivia"><FontAwesomeIcon icon={faForward}/></button>
          </div>
          {
            <div className={showTrivia ? "trivia-detail active" : "trivia-detail"}>
              <h4 className='trivia-title'>{trivia.title}</h4>
              <p className='tirivia-detail'>{trivia.description}</p>
            </div>
          }
        </div>
      }
      <style jsx>{`
        .trivia {
          width: 50%;
          margin: 0 auto;
          padding: 20px;
          border-radius: 50px;
          font-size: 1rem;
          color: #fff;
          background-color: #faa;
          margin-top: 1.5rem;
          height: 275px;
        }
        @media screen and (max-width: 768px) {
          .trivia {
            width: 80%;
          }
        }
        .trivia-header{
          text-align: center;
          position: relative;
        }
        .trivia-header > h3 {
          font-size: 1.2rem;
        }
        .next-trivia {
          position: absolute;
          top: 0;
          right: 0;
          width: 2rem;
          background-color: rgba(0,0,0,0);
          border: none;
          color: #fff;
          cursor: pointer;
        }
        .next-trivia:hover {
          opacity: 0.7;
        }
        .trivia-detail {
          transition: 0.5s;
          opacity: 0;
        }
        .trivia-detail.active {
          opacity: 1;
        }
        .trivia-title {
          transition: 0.5s;
          text-align: left;
        }
      `}</style>
    </>
  )
}
