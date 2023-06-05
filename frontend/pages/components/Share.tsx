import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Share() {
  return (
    <>
      <div className="shares">
        <a href="https://github.com/yoshiyoshiharu/ai-dating-proposer" className='github-button'>
          <div className='button-inner'>
            <div className='github-icon'>
              <FontAwesomeIcon icon={faGithub} />
            </div>
            <div>Github</div>
          </div>
        </a>
        <a href="https://twitter.com/intent/tweet?url=https://ai-dating-proposer.vercel.app&text=AIデートプラン提案アプリ" data-show-count="false" target='_blank' className='twitter-share-button'>
          <div className='button-inner'>
            <div className='twitter-icon'>
              <FontAwesomeIcon icon={faTwitter} />
            </div>
            <div>Twitterでシェア</div>
          </div>
        </a>
      </div>
      <style jsx>{`
        .shares {
          margin: 0 auto;
          margin-top: 10px;
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
        .github-button {
          display: inline-block;
          background-color: #333;
          color: #fff;
          padding: 5px 10px;
          border-radius: 10px;
          margin-right: 10px;
        }
        .twitter-share-button a,
        .github-button a {
          display: block;
        }
        .button-inner {
          display: flex;
          align-items: center;
        }
        .twitter-icon,
        .github-icon {
          display: inline-block;
          width: 15px;
          margin-right: 10px;
          padding-top: 2px;
        }
      `}</style>
    </>
  );
}
