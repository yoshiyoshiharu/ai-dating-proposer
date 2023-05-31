export default function Photo({ photoUrl }: { photoUrl: string }) {
  return (
    <>
    <img src={photoUrl} className="photo" />
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
