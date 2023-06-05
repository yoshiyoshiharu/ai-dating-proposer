import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <>
      <footer>
        <span>created by</span>
        <span className="me">Haruki Yoshdia</span>
        <Link href="https://github.com/yoshiyoshiharu" target="_blank">
          <span className="github-icon">
            <FontAwesomeIcon icon={faGithub} />
          </span>
        </Link>
      </footer>
      <style jsx>{`
        footer {
          background-color: #333;
          height: 3rem;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 1rem;
        }
        .me {
          margin-left: 5px;
        }
       .github-icon {
          display: inline-block;
          width: 15px;
          margin-left: 10px;
        }
      `}</style>
    </>
  );
}
