import { useState } from 'react'

const Images = ({ imageUrls }: { imageUrls: string[] }) => {
  const [errorImages, setErrorImages] = useState<number[]>([]);

  const handleImageError = (imageIndex: number) => {
    setErrorImages(prevErrorImages => [...prevErrorImages, imageIndex]);
  };

  return (
    <>
      <div className="images">
        {imageUrls !== undefined && imageUrls.length > 0 && imageUrls.map((imageUrl, index) => (
          !errorImages.includes(index) &&
          <img className="image" src={imageUrl} key={index} alt="建物写真" onError={() => handleImageError(index)} />
        ))}
      </div>
      <style jsx>{`
        .images {
          display: flex;
          width: 100%;
          overflow: scroll;

        }
        .image {
          width: 250px;
          height: 250px;
          margin: 0 10px;
          border-radius: 10px;
        }
        @media screen and (max-width: 768px) {
          .image {
            width: 150px;
            height: 150px;
          }
        }
        `}</style>
    </>
  )
}

export default Images
