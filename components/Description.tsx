import Skeleton from "./Skeleton";

const Description = ({ bookInfo }: any) => {
  if (!bookInfo)  return <Skeleton />;

  if (!bookInfo.description) return <p>No hay informacion sobre este libro.</p>;

  return (bookInfo?.description?.value || bookInfo?.description)
}

export default Description;
