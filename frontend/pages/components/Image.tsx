import { useEffect, useState } from "react";

export default function Image({ photoReference }: { photoReference: string }) {
  const [imageData, setImageData] = useState<string>("");

  useEffect(() => {
    const fetchPhotoImage = async (photoReference: string) => {
      const res = await fetch(`http://localhost:8080/api/place_photo?photo_reference=${photoReference}`);
      const blob = await res.blob();
      const objectUrl =  URL.createObjectURL(blob);
      setImageData(objectUrl);
    }

    fetchPhotoImage(photoReference);
  }, []);


  return (
    <>
    <img src={imageData} alt="イメージ" className="photo" />
      <style jsx>{`
        .photo {
          width: 30%;
          height: 250px;
          margin: 0 10px;
          border-radius: 10px;
        }
      `}</style>
    </>
  );
}
