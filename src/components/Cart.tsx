import { useCart } from "../context/CartContext";
import Xsvg from "../assets/x-mark.svg";
import BigCart from "../assets/big-cart.svg";
import Button from "./Button";
import plusSvg from "../assets/plus.svg";
import minusSvg from "../assets/minus.svg";
import { Link } from "react-router-dom";

type Props = { isOpen: boolean; onClose: () => void };

export default function CartPanel({ isOpen, onClose }: Props) {
  const { cart, updateCartItem, removeFromCart } = useCart();

  const subtotal = cart.reduce((sum, item) => sum + item.total_price, 0);
  const delivery = subtotal > 0 ? 10 : 0;
  const total = subtotal + delivery;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-dark-blue opacity-30 z-40"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-screen w-[540px] overflow-y-auto bg-white z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-10">
          <h2 className="text-primary text-[1.25rem] font-medium">
            Shopping Cart ({cart.length})
          </h2>
          <button onClick={onClose} className="cursor-pointer">
            <img src={Xsvg} alt="X close svg" className="w-8 h-8" />
          </button>
        </div>

        {/* Empty */}
        {cart.length === 0 ? (
          <div className="flex flex-col items-center gap-6 p-10 text-center">
            <img
              src={BigCart}
              alt="Shopping cart SVG"
              className="w-[170px] h-[135px]"
            />
            <div>
              <p className="text-primary text-[1.5rem] font-semibold capitalize">
                ooops!
              </p>
              <p className="mt-3 text-secondary text-[0.875rem]">
                Uh-oh, you&apos;ve got nothin in your cart just yet...
              </p>
            </div>
            <Button className="w-1/2 mt-9">Start Shopping</Button>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="overflow-y-auto max-h-[calc(100vh-200px)] p-10 space-y-4">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.color ?? "default"}-${
                    item.size ?? "default"
                  }`}
                  className="flex gap-4 pb-4"
                >
                  <img
                    src={item.cover_image}
                    alt={item.name}
                    className="w-[100px] h-[134px] object-contain rounded-[10px] border border-grey-2"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="text-primary text-[0.875rem] font-medium">
                        {item.name}
                      </p>
                      <p className="text-primary text-[1.125rem] font-medium">
                        ${item.price}
                      </p>
                    </div>
                    <p className="mt-2 text-secondary text-[0.75rem]">
                      {item.color}
                    </p>
                    <p className="mt-2 text-secondary text-[0.75rem]">
                      {item.size}
                    </p>
                    <div className="mt-3 flex justify-between items-center">
                      {/* Quantity controls */}
                      <div className="flex justify-center items-center gap-2 border border-grey-2 rounded-full w-[70px] h-[26px]">
                        <button
                          onClick={() =>
                            updateCartItem(
                              item.id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className=""
                        >
                          <img
                            src={minusSvg}
                            alt="plus svg"
                            className="w-4 h-4"
                          />
                        </button>
                        <span className="text-secondary text-[0.75rem]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateCartItem(item.id, item.quantity + 1)
                          }
                          className=""
                        >
                          <img
                            src={plusSvg}
                            alt="plus svg"
                            className="w-4 h-4"
                          />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-secondary text-[0.75rem] capitalize"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="p-10 space-y-2 text-secondary">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="mt-4 flex justify-between">
                <span>Delivery</span>
                <span>${delivery.toFixed(2)}</span>
              </div>
              <div className="mt-4 flex justify-between font-semibold text-primary text-[1.25rem]">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Link to={"/cart/checkout"} onClick={onClose}>
                <Button className="w-full mt-[102px]">Go to Checkout</Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
