import { useState } from "react";
import type { Product } from "../pages/ProductDetails";
import { colorMap } from "../helpers/colorMap";
import Button from "./Button";
import whiteCartSvg from "../assets/shopping-cart-white.svg";
import { useCart } from "../context/CartContext";

export default function ProductInfo({
  product,
  selectedIndex,
  setSelectedIndex,
}: {
  product: Product;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}) {
  const selectedColor = product.available_colors[selectedIndex];

  const [selectedSize, setSelectedSize] = useState(product.available_sizes[0]);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product.id, quantity, selectedSize, selectedColor,);
  };

  return (
    <div>
      <h1 className="text-primary text-[2rem] font-semibold">{product.name}</h1>
      <p className="mt-5 text-primary text-[2rem] font-semibold">
        ${product.price}
      </p>

      {/* Colors */}
      <div className="mt-14">
        <h3 className="text-primary">Color: {selectedColor}</h3>
        <div className="mt-4 flex gap-3">
          {product.available_colors.map((color, i) => {
            const bg = colorMap[color] || "#ddd";
            const isGradient = bg.startsWith("linear-gradient");

            return (
              <button
                key={color}
                className={`w-[38px] h-[38px] p-[5px] rounded-full ring-offset-4 ${
                  i === selectedIndex ? "ring-1 ring-grey-2" : ""
                }`}
                style={{
                  background: isGradient ? undefined : bg,
                  backgroundImage: isGradient ? bg : undefined,
                }}
                onClick={() => setSelectedIndex(i)}
              />
            );
          })}
        </div>
      </div>

      {/* Sizes */}
      <div className="mt-12">
        <h3 className="text-primary">Size: {selectedSize}</h3>
        <div className="mt-4 flex gap-2">
          {product.available_sizes.map((size) => (
            <button
              key={size}
              className={`w-[70px] h-[42px] rounded-[10px] border ${
                size === selectedSize ? "border-dark-blue" : "border-grey-2"
              }`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div className="mt-12">
        <h3 className="text-primary mb-4">Quantity:</h3>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-[70px] h-[42px] py-2 px-4 border border-grey-2 rounded-[10px]"
        >
          {Array.from({ length: product.quantity }, (_, i) => i + 1).map(
            (num) => (
              <option key={num} value={num}>
                {num}
              </option>
            )
          )}
        </select>
      </div>

      <Button
        variant="primary"
        onClick={handleAddToCart}
        className="mt-14 w-full"
      >
        <img src={whiteCartSvg} alt="cart svg white" />
        Add to Cart
      </Button>

      <hr className="my-14 text-grey-2 h-[1px]" />

      {/* Description */}
      <div className="">
        <div className="flex items-center justify-between">
          <h3 className="text-primary text-[1.25rem] font-medium">Details:</h3>
          {product.brand?.image && (
            <img
              src={product.brand.image}
              alt={product.brand.name + " logo"}
              className="h-16 object-contain"
            />
          )}
        </div>
        {product.brand?.name && (
          <h4 className="mt-2 text-secondary capitalize">
            Brand: {product.brand?.name}
          </h4>
        )}
        <p className="my-5 text-secondary">{product.description}</p>
      </div>
    </div>
  );
}
