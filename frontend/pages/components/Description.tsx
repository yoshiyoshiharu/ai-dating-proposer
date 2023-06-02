export default function Description() {
  return (
    <>
      <div className="description">
        <h2>これはなに</h2>
        <p>AIがあなたのデートプランを提案します。</p>
      </div>
     <style jsx>{`
        .description {
          width: 50%;
          margin: 0 auto;
        }
        @media screen and (max-width: 768px) {
          .description {
            width: 90%;
          }
        }
      `}</style>
    </>
  );
}
