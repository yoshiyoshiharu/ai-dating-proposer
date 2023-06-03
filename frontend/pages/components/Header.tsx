import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <header>
        <Image src="/icon.png" alt="icon" className="header-icon" width="64" height="64" />
        <h1 className="title">
          <Link href="/">
            AIデートプラン提案アプリ
          </Link>
        </h1>
      </header>
      <style jsx>{`
        header {
          background-color: #ffaaaa;
          display: flex;
          align-items: center;
        }
        .title {
          margin: 0;
          font-family: "TsukuARdGothic-Regular", ヒラギノ丸ゴ Pro, sans-serif;
        }
        @media screen and (max-width: 768px) {
          .title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </>
  );
}
