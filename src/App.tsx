import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { StyledButton, Wrapper } from "./components/AppStyle";
import { Badge, Drawer, Grid, LinearProgress } from "@mui/material";
import Item from "./components/item/Item";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Cart from "./cart/Cart";

export type CartItemType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  amount: number;
};

// Function to fetch products
const fetchProducts = async (): Promise<CartItemType[]> => {
  const response = await axios.get("https://fakestoreapi.com/products");
  return response.data;
};

function App() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Using react-query's useQuery to fetch products
  const {
    data: products,
    isLoading,
    error,
  } = useQuery<CartItemType[]>("products", fetchProducts);

  console.log(products);

  // Total items in cart
  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  // Adding an item to the cart
  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  // Removing an item from the cart
  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  // Handle loading and error states from react-query
  if (isLoading) return <LinearProgress />;
  if (error instanceof Error) return <h2>Error: {error.message}</h2>;

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <ShoppingCartIcon />
        </Badge>
      </StyledButton>

      <div></div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-w-screen-lg mx-auto">
        {products?.map((item) => (
          <div>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </div>
        ))}
      </div>
    </Wrapper>
  );
}

export default App;
