import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";

type Image = {
  url: string;
}

const fetchImage = async (): Promise<Image> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await res.json();
  console.log(images);
  return images[0];
};

const Result: NextPage<Props> = ({ initialimageUrl }) => {
  const [imageUrl, setImageUrl] = useState(initialimageUrl);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const newImage = await fetchImage();
    setImageUrl(newImage.url);
    setLoading(false);
  }

  return(
    <div>
      <button onClick={handleClick}>他のにゃんこも見る</button>
      <div>{loading || <img src={imageUrl} />}</div>
    </div>
  );
};

export default Result;

type Props = {
  initialimageUrl: string;
}

export const getServerSideProps : GetServerSideProps<Props> = async () => {
  const image = await fetchImage();
  return {
    props: {
      initialimageUrl: image.url,
    },
  };
}
