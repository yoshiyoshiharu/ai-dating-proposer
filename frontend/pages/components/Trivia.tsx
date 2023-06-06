export default function Trivia () {
  return (
    <>
      <div className='trivia'>
        <h3 className='trivia-header'>デートを成功させよう</h3>
        <h4 className='trivia-title'>相手と目を合わせよう</h4>
        <p className='tirivia-detail'>デート中、相手の目を見ることは重要です。目の接触は相手とのつながりを深めるのに役立ちます。相手の目を見ながら話すことで、興味を示していることや尊重していることを伝えることができます。</p>
      </div>
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
