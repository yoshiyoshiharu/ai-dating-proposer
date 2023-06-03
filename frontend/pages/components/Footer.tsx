import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Header() {
  return (
    <>
      <footer>
        <span>created by</span>
        <span className="me">Haruki Yoshdia</span>
        <Link href="https://github.com/yoshiyoshiharu/ai-dating-proposer" target="_blank">
          <span className="github-icon">
            <FontAwesomeIcon icon={faGithub} />
          </span>
        </Link>
      </footer>
      <style jsx>{`
        footer {
          background-color: #333;
          height: 50px;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .me {
          margin-left: 5px;
        }
        .github-icon {
          margin-left: 10px;
          font-size: 20px;
        }
      `}</style>
    </>
  );
}
