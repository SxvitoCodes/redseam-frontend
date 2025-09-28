import React, { createContext, useContext, useState, useEffect } from "react";
import { authRequest } from "../helpers/authRequest";

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
  removeFromCart: (
    productId: number,
    color?: string,
    size?: string
  ) => Promise<void>; // 👈 updated
  checkout: (formData: {
    name: string;
    surname: string;
    email: string;
    zip_code: string;
    address: string;
  }) => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const getCart = async () => {
    setLoading(true);
    try {
      const data = await authRequest<CartItem[]>({
        url: "/cart",
        method: "GET",
      });
      if (data) setCart(data);
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
    await authRequest<CartItem[]>({
      url: `/cart/products/${productId}`,
      method: "POST",
      data: { quantity, size, color },
    });
    await getCart();
  };

  const updateCartItem = async (productId: number, quantity: number) => {
    await authRequest<CartItem[]>({
      url: `/cart/products/${productId}`,
      method: "PATCH",
      data: { quantity },
    });
    await getCart();
  };

  const removeFromCart = async (
    productId: number,
    color?: string,
    size?: string
  ) => {
    await authRequest<void>({
      url: `/cart/products/${productId}`,
      method: "DELETE",
      data: { color, size },
    });
    await getCart();
  };

  const checkout = async (formData: {
    name: string;
    surname: string;
    email: string;
    zip_code: string;
    address: string;
  }) => {
    await authRequest<{ message: string }>({
      url: "/cart/checkout",
      method: "POST",
      data: formData,
    });
    await getCart();
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
