import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

export default function Information() {
  return (
    <>
      <div className="informations">
        <div className="information">
          <a href="https://twitter.com/intent/tweet?url=https://ai-dating-proposer.vercel.app&text=AIデートプラン提案アプリ" data-show-count="false" target='_blank' className='twitter-share-button'>
            <div className='button-inner'>
              <span className='twitter-icon'>
                <FontAwesomeIcon icon={faTwitter}/>
              </span>
              Twitterでシェア
            </div>
          </a>
        </div>
      </div>
      <style jsx>{`
        .informations {
          width: 50%;
          margin: 0 auto;
        }
        @media screen and (max-width: 768px) {
          .informations {
            width: 90%;
          }
        }
        .information {
          display: flex;
          justify-content: flex-end;
        }
        .twitter-share-button {
          display: inline-block;
          background-color: #1da1f2;
          color: #fff;
          padding: 5px 10px;
          border-radius: 10px;
        }
        .twitter-share-button a {
          display: block;
        }
        .twitter-icon {
          display: inline-block;
          width: 15px;
          margin-right: 10px;
          padding-top: 5px;
        }
      `}</style>
    </>
  );
}
