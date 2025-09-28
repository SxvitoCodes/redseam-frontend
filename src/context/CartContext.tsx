import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://api.redseam.redberryinternship.ge/api";

type CartItem = {
  id: number;
  name: string;
  cover_image: string;
  price: number;
  total_price: number;
  quantity: number;
  brand: { id: number; name: string; image: string };
  color?: string;
  size?: string;
};

type CartContextType = {
  cart: CartItem[];
  loading: boolean;
  getCart: () => Promise<void>;
  addToCart: (
    productId: number,
    quantity: number,
    size?: string,
    color?: string
  ) => Promise<void>;
  updateCartItem: (productId: number, quantity: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  checkout: (formData: {
    name: string;
    surname: string;
    email: string;
    zip_code: string;
    address: string;
  }) => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const token = localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const getCart = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(API_URL + "/cart", {
        headers: {
          Accept: "application/json",
        },
      });
      setCart(data);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (
    productId: number,
    quantity: number,
    size?: string,
    color?: string
  ) => {
    await axios.post(API_URL + `/cart/products/${productId}`, {
      quantity,
      size,
      color,
    });
    await getCart();
  };

  const updateCartItem = async (productId: number, quantity: number) => {
    await axios.patch(API_URL + `/cart/products/${productId}`, { quantity });
    await getCart();
  };

  const removeFromCart = async (productId: number) => {
    await axios.delete(API_URL + `/cart/products/${productId}`);
    await getCart();
  };

  const checkout = async (formData: {
    name: string;
    surname: string;
    email: string;
    zip_code: string;
    address: string;
  }) => {
    setLoading(true);
    try {
      await axios.post(API_URL + "/cart/checkout", formData);
      await getCart(); // clear cart
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        getCart,
        addToCart,
        updateCartItem,
        removeFromCart,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
