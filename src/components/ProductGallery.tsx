import type { Product } from "../pages/ProductDetails";

export default function ProductGallery({
  product,
  selectedIndex,
  setSelectedIndex,
}: {
  product: Product;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}) {
  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div className="flex gap-4">
      {/* thumbnails */}
      <div className="flex flex-col gap-2">
        {product.images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`thumb-${i}`}
            className={`w-32 h-auto max-h-40 object-cover cursor-pointer rounded ${
              selectedIndex === i ? "border border-dark-blue" : ""
            }`}
            onClick={() => handleThumbnailClick(i)}
          />
        ))}
      </div>

      {/* main image */}
      <div className="flex-1">
        <img
          src={product.images[selectedIndex]}
          alt="main"
          className="flex-1 object-contain rounded"
        />
      </div>
    </div>
  );
}
