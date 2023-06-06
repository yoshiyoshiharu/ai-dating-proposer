import Header from './Header';

export default function Loading({ top_desc, bottom_desc }: { top_desc: string, bottom_desc: string }) {
  return (
    <div className='loading'>
      <Header></Header>
      <div className="loader-wrap">
        <div className="wrapper">
          <div className="circles">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
          </div>
          <div className="description">
            <div className="description-detail">{top_desc}</div>
            <div className="description-detail">{bottom_desc}</div>
          </div>
          <div className='trivia'>
            <h3 className='trivia-header'>デートを成功させよう</h3>
            <h4 className='trivia-title'>相手と目を合わせよう</h4>
            <p className='tirivia-detail'>デート中、相手の目を見ることは重要です。目の接触は相手とのつながりを深めるのに役立ちます。相手の目を見ながら話すことで、興味を示していることや尊重していることを伝えることができます。</p>
          </div>
        </div>
      </div >
      <style jsx>{`
        .loading {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: pink;
          z-index: 1000;
        }
        .wrapper {
          position: absolute;
          width: 100%;
          top:30%;
        }
        .circles{
          width:200px;
          height:60px;
          position: absolute;
          left:50%;
          transform: translate(-50%, -50%);
        }
        .description {
          text-align: center;
          margin: 0 auto;
          margin-top: 70px;
          font-family: 'Lato';
          font-size: 16px;
          letter-spacing: 12px;
          color: #fff;
        }
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

        .circle{
            width:20px;
            height:20px;
            position: absolute;
            border-radius: 50%;
            background-color: #fff;
            left:15%;
            transform-origin: 50%;
            animation: circle .5s alternate infinite ease;
        }

        @keyframes circle{
            0%{
                top:60px;
                height:5px;
                border-radius: 50px 50px 25px 25px;
                transform: scaleX(1.7);
            }
            40%{
                height:20px;
                border-radius: 50%;
                transform: scaleX(1);
            }
            100%{
                top:0%;
            }
        }
        .circle:nth-child(2){
            left:45%;
            animation-delay: .2s;
        }
        .circle:nth-child(3){
            left:auto;
            right:15%;
            animation-delay: .3s;
        }
        .shadow{
            width:20px;
            height:4px;
            border-radius: 50%;
            background-color: rgba(0,0,0,.5);
            position: absolute;
            top:62px;
            transform-origin: 50%;
            z-index: -1;
            left:15%;
            filter: blur(1px);
            animation: shadow .5s alternate infinite ease;
        }

        @keyframes shadow{
            0%{
                transform: scaleX(1.5);
            }
            40%{
                transform: scaleX(1);
                opacity: .7;
            }
            100%{
                transform: scaleX(.2);
                opacity: .4;
            }
        }
        .shadow:nth-child(4){
            left: 45%;
            animation-delay: .2s
        }
        .shadow:nth-child(5){
            left:auto;
            right:15%;
            animation-delay: .3s;
        }
      `}</style>
    </div>
  );
}
