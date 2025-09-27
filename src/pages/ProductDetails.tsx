// Todo: Implement fetching and displaying real product details using the id param
import { useParams } from "react-router-dom";

export default function ProductDetailPage() {
  const { id } = useParams();
  return (
    <div className="px-[100px] py-10">
      <h1 className="text-xl font-bold">Product #{id}</h1>
    </div>
  );
}
