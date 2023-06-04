export default function Description() {
  return (
    <>
      <div className="descriptions">
        <div className="description">
          <h2>これはなに</h2>
          <p>AIがあなたの一日のデートプランを提案します。</p>
        </div>
        <div className="description">
          <h2>使い方</h2>
          <p>1. 選択したエリアからデートスポットを提案します。</p>
          <p>2. デートスポットを選択し、あなたの一日のデートプランを時系列で提案します。</p>
        </div>
        <div className="description">
          <h2>注意事項</h2>
          <p>※ このサービスは、ChatGPTを活用しています。誤った情報が表示される可能性がありますのでご了承ください。</p>
        </div>

      </div>
     <style jsx>{`
        .descriptions {
          width: 50%;
          margin: 0 auto;
          padding: 30px 0 20px 0;
        }
        @media screen and (max-width: 768px) {
          .descriptions {
            width: 90%;
          }
        }
        .description > h2 {
          font-size: 1.5rem;
        }
        .description > p {
          margin-left: 20px;
        }
      `}</style>
    </>
  );
}
