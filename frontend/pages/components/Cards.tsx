import React, { useState, useContext } from 'react';
import { Spot } from '../../entity/spot';
import Images from './Images';
import Link from 'next/link';
import router from 'next/router';
import { SpotContext } from '../../context/SpotContext';


const Cards = ({ submited }: { submited: boolean }) => {
  const { spots, setSpots } = useContext(SpotContext)

  const handleClick = async (spotIndex: number) => {
    router.push({
      pathname: '/result',
      query: { spotIndex: spotIndex }
    })
  };

  if (submited && spots.length == 0) {
    return (
      <>
        <h2>デートスポットが見つかりませんでした。もう一度試してください。</h2>
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
            spots !== undefined && spots.map((spot: Spot, index: number) => (
              <div className="card" key={index}>
                <div className='card-header'>
                  <Link href={"https://www.google.co.jp/maps?q=" + spot.place} target='_blank'>
                    <span className='place'>{spot.place}</span>
                  </Link>
                  <button type="button" className="fetch-plan-button" onClick={() => handleClick(index)}>
                    デートプランを組んでもらう
                  </button>
                </div>
                <Images imageUrls={spot.image_urls}></Images>
              </div>
            ))
          }
        </div>
        <style jsx>{`
          .card {
            background-color: #fff;
            margin: 10px auto;
            padding: 10px;
            border: 1px solid #333;
            border-radius: 10px;
          }
          .place {
            display: inline-block;
            margin-left: 10px;
            font-size: 1rem;
            border-bottom: 1px solid #333;
            color: #333;
            font-weight: bold;
          }
          .place:hover {
            opacity: 0.5;
          }
          .card-header {
            display: flex;
            margin-bottom: 10px;
            justify-content: space-between;
          }
          @media screen and (max-width: 768px) {
            .card-header {
              display: block;
            }
            .fetch-plan-button {
              margin-top: 10px;
              margin-left: 10px;
            }
          }
          .fetch-plan-button {
            display: block;
            background-color: lightblue;
            color: #333;
            font-weight: bold;
            border-radius: 10px;
            border: none;
            padding: 5px 10px;
            cursor: pointer;
          }
          .fetch-plan-button:hover {
            opacity: 0.8;
          }
        `}</style>
      </>
    )
  }
}

export default Cards;
