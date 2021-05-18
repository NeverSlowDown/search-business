import { useRouter } from "next/router";
import Link from "next/link";

const BusinessDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <section>
      <h1>Post: {id}</h1>
    </section>
  );
};

export default BusinessDetail;
