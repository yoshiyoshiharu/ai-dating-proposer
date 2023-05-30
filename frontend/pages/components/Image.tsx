export default function Image({ imageUrl }: { imageUrl: string }) {
  return (
    <>
    <img src={imageUrl} className="photo" />
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
