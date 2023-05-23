export default function Header() {
  return (
    <>
      <header>
        <h1 className="title">AIデートプラン提案アプリ</h1>
      </header>
      <style jsx>{`
        header {
          background-color: pink;
          .title {
            margin: 0;
          }
        }
      `}</style>
    </>
  );
}
