import { useState } from "react";
import { useCart } from "../context/CartContext";
import Button from "../components/Button";
import Input from "../components/Input";
import plusSvg from "../assets/plus.svg";
import minusSvg from "../assets/minus.svg";
import checkmarkSvg from "../assets/checkmark.svg";
import Xsvg from "../assets/x-mark.svg";
import { Link } from "react-router-dom";

export default function CheckoutPage() {
  const { cart, updateCartItem, removeFromCart, checkout } = useCart();

  // form state
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "", // will be prefilled later
    zip_code: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const delivery = 10; // dummy fixed delivery fee
  const total = subtotal + delivery;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await checkout(form);
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-[100px] py-18 flex-1">
      <h1 className="text-primary text-[2.625rem] font-semibold">Checkout</h1>
      <div className="mt-11 grid grid-cols-3 gap-32">
        {/* LEFT: FORM */}
        <div className="bg-grey py-18 px-12 col-span-2">
          <h2 className="text-secondary text-[1.375rem] font-medium mb-12">
            Order Details
          </h2>
          <form id="checkoutForm" onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <Input
                type="text"
                name="name"
                placeholder="First Name"
                value={form.name}
                onChange={handleChange}
                className="w-full bg-white"
                required
              />
              <Input
                type="text"
                name="surname"
                placeholder="Last Name"
                value={form.surname}
                onChange={handleChange}
                className="w-full bg-white"
                required
              />
            </div>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-white"
              required
            />
            <div className="grid grid-cols-2 gap-6">
              <Input
                type="number"
                name="zip_code"
                placeholder="ZIP Code"
                value={form.zip_code}
                onChange={handleChange}
                className="w-full bg-white"
                required
              />
              <Input
                type="text"
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                className="w-full bg-white"
                required
              />
            </div>
          </form>
        </div>

        {/* RIGHT: CART SUMMARY */}
        <div>
          <h2 className="text-xl font-medium mb-6">Your Order</h2>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
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
                        <img src={plusSvg} alt="plus svg" className="w-4 h-4" />
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
          <div className="mt-6 space-y-2 text-secondary">
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
          </div>

          <Button
            type="submit"
            form="checkoutForm"
            className="mt-[81px] w-full"
            disabled={loading}
          >
            {loading ? "Processing..." : "Pay"}
          </Button>
        </div>

        {/* Confirmation modal */}
        {showModal && (
          <div className="fixed w-full h-full inset-0 flex items-center justify-center bg-dark-blue/30 z-50">
            <div className="relative flex flex-col justify-center items-center bg-white rounded-lg px-10 py-[145px] text-center w-4xl z-60">
              <button
                onClick={() => setShowModal(false)}
                className="cursor-pointer"
              >
                <img
                  src={Xsvg}
                  alt="x svg"
                  className="w-10 h-10 absolute top-6 right-6"
                />
              </button>
              <img
                src={checkmarkSvg}
                alt="checkmark svg"
                className="w-[76px] h-[76px]"
              />
              <h2 className="mt-10 text-primary text-[2.625rem] font-semibold">
                Congrats!
              </h2>
              <p className="text-secondary text-[0.875rem] mt-4">
                Your order is placed successfully.
              </p>
              <Link to="/">
                <Button className="mt-[74px]">Continue Shopping</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
