import { Spot } from '../../entity/spot';
import Images from './Images';
import Link from 'next/link';

const Cards = ({ spots, submited }: { spots: Spot[], submited: boolean }) => {
  if (submited && spots.length == 0) {
    return (
      <>
        <h2>プランが見つかりませんでした。もう一度試してください。</h2>
        <style jsx>{`
         h2 {
            text-align: center;
         }
      `}</style>
      </>
    )
  } else {
    return (
      <>
        <div className="cards">
          {
            spots !== undefined && spots.map((spot) => (
              <div className="card" key={spot.place}>
                <Link href={"https://www.google.co.jp/maps?q=" + spot.place} target='_blank'>
                  <span className='place'>{spot.place}</span>
                </Link>
                <Images imageUrls={spot.image_urls}></Images>
              </div>
            ))
          }
        </div>
        <style jsx>{`
          .card {
            width: 50%;
            background-color: #fff;
            margin: 10px auto;
            padding: 10px;
            border: 1px solid #333;
            border-radius: 10px;
          }
          @media screen and (max-width: 768px) {
            .card {
              width: 90%;
            }
          }
          .place {
            display: inline-block;
            margin-bottom: 20px;
            margin-left: 10px;
            font-size: 1rem;
            border-bottom: 1px solid #333;
            color: #333;
            font-weight: bold;
          }
          .place:hover {
            opacity: 0.5;
          }
        `}</style>
      </>
    )
  }
}

export default Cards;
