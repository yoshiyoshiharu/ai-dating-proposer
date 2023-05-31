const Images = ({ imageUrls }: { imageUrls: string[] }) => {
  return (
    <>
      <div className="images">
        {imageUrls !== undefined && imageUrls.length > 0 && imageUrls.map((imageUrl) => (
          <img className="image" src={imageUrl} key={imageUrl} />
        ))}
      </div>
      <style jsx>{`
        .images {
          display: flex;
          width: 100%;
          overflow: scroll;
          .image {
            width: 250px;
            height: 250px;
            margin: 0 10px;
            border-radius: 10px;
            @media screen and (max-width: 768px) {
              width: 150px;
              height: 150px;
            }
          }
        }
         _:lang(x)+_:-webkit-full-screen-document, .image {
            width: 100px;
            height: 100px;
            margin: 0 5px;
            border-radius: 10px;
          }
        `}</style>
    </>
  )
}

export default Images
