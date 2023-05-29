import Image from "next/image";

export default function Header() {
  return (
    <>
      <header>
        <Image src="/icon2.png" alt="icon" className="header-icon" width="64" height="64" />
        <h1 className="title">
          AIデートプラン提案アプリ
        </h1>
      </header>
      <style jsx>{`
        header {
          background-color: #ffaaaa;
          display: flex;
          align-items: center;
          .title {
            margin: 0;
            font-family: "TsukuARdGothic-Regular", sans-serif;
          }
        }
      `}</style>
    </>
  );
}
