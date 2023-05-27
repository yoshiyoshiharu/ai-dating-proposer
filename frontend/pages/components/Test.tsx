import { useState, useEffect } from 'react';

export default function Test() {
  const [imageData, setImageData] = useState<string>("");

  const handleSubmit = async (event) => {
    console.log("start")
    const res = await fetch('http://localhost:8080/api/place_photo')
    // const res = await fetch('https://i.imgur.com/uSvshvJ.jpg')
    console.log(res);
    const blob = await res.blob();
    console.log(blob);
    setImageData(URL.createObjectURL(blob));
  }
  return (
    <>
      <div className="test">
        <h1>テスト</h1>
      </div>

      <button onClick={handleSubmit}>button</button>
      <img id="img" src={imageData} alt="Binary Image" />;
      <style jsx>{`
        .test {
          background-color: pink;
        }
      `}</style>
    </>
  )
}
