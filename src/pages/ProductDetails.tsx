import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductGallery from "../components/ProductGallery";
import ProductInfo from "../components/ProductInfo";

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  available_colors: string[];
  available_sizes: string[];
  quantity: number;
  brand?: { name: string; image: string };
};

const API_URL = "https://api.redseam.redberryinternship.ge/api" + "/products";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  // shared state between gallery & info
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    fetch(API_URL + `/${id}`, {
      headers: { Accept: "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setProduct(data));
    setSelectedIndex(0); // reset to first when product loads
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="px-[100px]">
      <p className="mt-8 mb-12 text-primary text-[0.875rem] font-light capitalize">
        <Link to={"/"}>Listing</Link> / Product
      </p>
      <div className="grid grid-cols-2 gap-40 justify-between">
        {/* left side: gallery */}
        <ProductGallery
          product={product}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />

        {/* right side: details */}
        <ProductInfo
          product={product}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      </div>
    </div>
  );
}
