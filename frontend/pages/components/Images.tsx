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
            width: 30%;
            height: 250px;
            margin: 0 10px;
            border-radius: 10px;
          }
        }
        `}</style>
    </>
  )
}

export default Images
