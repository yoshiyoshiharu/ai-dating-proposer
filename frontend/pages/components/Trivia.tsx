import { useEffect, useState } from "react"
import { Trivia } from "../../entity/trivia"
import { TRIVIAS } from "../../consts/trivias"

export default function Trivia () {
  const [triviaIndex, setTriviaIndex] = useState<number>(0)
  const [trivia, setTrivia] = useState<Trivia>()

  const fetchTrivia = () => {
    const randomIndex = Math.floor(Math.random() * TRIVIAS.length)
    const randomeTrivia = TRIVIAS[randomIndex]
    setTrivia(randomeTrivia)
  }

  useEffect(() => {
    fetchTrivia()
  }, [])

  return (
    <>
      {
        trivia &&
        <div className='trivia'>
          <h3 className='trivia-header'>デートを成功させよう</h3>
          <button onClick={fetchTrivia}>次のトリビア</button>
          <h4 className='trivia-title'>{trivia.title}</h4>
          <p className='tirivia-detail'>{trivia.description}</p>
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
          margin-top: 50px;
        }
        @media screen and (max-width: 768px) {
          .trivia {
            width: 80%;
          }
        }
        .trivia-header {
          text-align: center;
        }
        .trivia-title {
          text-align: left;
        }
      `}</style>
    </>
  )
}
