import { Plan } from '../../entity/plan';
import Images from './Images';
import Link from 'next/link';
import Share from './Share';
import { Spot } from '../../entity/spot';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faClockFour } from '@fortawesome/free-solid-svg-icons';

export default function Plans({ spot }: { spot: Spot }) {
  return (
    <>
      {
        spot != undefined &&
        <div className='plan'>
          <div className='plan-header'>
            <h2 className='plan-title'>{spot.place}周辺でのデートプラン</h2>
            <Link href={"/spots?area=" + spot.area}>スポット一覧に戻る</Link>
          </div>
          <Images imageUrls={spot.image_urls}></Images>
          {
            spot.plans == undefined || spot.plans.length == 0 &&
            <p className='error-message'>プランが見つかりませんでした。もう一度試してください。</p>
          }
          <Share></Share>
          <ul className="time-schedule">
          {spot.plans.length > 0 && spot.plans.map((plan: Plan) => (
              <li>
                <span className="time">{plan.time}</span>
                <div className="sch_box"><p className="sch_title">{plan.plan}</p>
              </div>
            </li>
          ))}
          </ul>
        </div>
      }
      <style jsx>{`
        .plan {
          margin: 30px auto;
          background-color: #fff;
          padding: 20px;
          border-radius: 10px;
        }
        .time-schedule {
          width: 80%;
          list-style: none;
          margin: 3rem auto 0 6em;
          padding-left: 20px;
          border-left: 6px solid #a7be18;
          box-sizing: border-box;
        }
        .time-schedule li {
          width: 100%;
          margin: 0 0;
          padding: 5px 0;
          position: relative;
        }
        .time-schedule span.time {
          width: 5em;
          display: inline-block;
          margin-left: -8em;
          padding: 0 0 5px;
          margin-top: 15px;
          vertical-align: top;
          position: relative;
          text-align: right;
          box-sizing: border-box;
        }
        .time-schedule span.time::after {
          content: "";
          position: absolute;
          right: -35px;
          top: 0;
          background: #a7be18;
          width: 20px;
          height: 20px;
          border-radius: 10px;
        }
        .time-schedule .sch_box {
          display: inline-block;
          width: 100%;
          margin-left: 30px;
          padding: 15px 10px 15px 10px;
          vertical-align: middle;
          background: #efefef;
          box-sizing: border-box;
          border-radius: 6px;
        }
        .time-schedule .sch_title {
          font-size: 16px;
          font-weight: 700;
        }
        .time-schedule .sch_tx {
          font-size: 14px;
          font-weight: normal;
        }
        .error-message {
          font-size: 0.8rem;
        }
        @media screen and (max-width: 768px) {
          .plan-header {
            display: block;
            margin-bottom: 10px;
          }
          .plan-title {
            margin-bottom: 0;
          }
          .title {
            font-size: 1.2rem;
          }
        }
        .description {
          font-size: 1rem;
          margin: 10px;
        }
      `}</style>
    </>
  )
}
