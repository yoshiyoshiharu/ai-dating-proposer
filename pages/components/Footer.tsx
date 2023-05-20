import Link from "next/link";

export default function Header() {
  return (
    <>
      <footer>
        created by
        <Link href="https://github.com/yoshiyoshiharu" target="_blank">
          <span className="my-github">Haruki Yoshdia</span>
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
          .my-github {
            margin-left: 5px;
          }
       }
      `}</style>
    </>
  );
}
