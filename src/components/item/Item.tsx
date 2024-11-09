import React from "react";
import { Button, Typography } from "@mui/material";
import { CartItemType } from "../../App";
import { Wrapper } from "./ItemStyle";

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart }) => (
  <Wrapper>
    <div className="mx-auto">
      <img src={item.image} alt={`Product: ${item.title}`} />
    </div>
    <div>
      <Typography
        variant="body1"
        sx={{ fontWeight: "bold", padding: "0 0 2px 0" }}
      >
        {item.title}
      </Typography>

      <Typography
        variant="body2" // Smaller text style for description
        sx={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          WebkitLineClamp: 3, // Limits text to 3 lines
        }}
      >
        {item.description}
      </Typography>
      <Typography
        variant="body1"
        sx={{ fontWeight: "bold", padding: "4px 0 2px 0" }}
      >
        ${item.price.toFixed(2)}
      </Typography>
    </div>
    <Button
      variant="contained"
      color="primary"
      onClick={() => handleAddToCart(item)}
    >
      Add to cart
    </Button>
  </Wrapper>
);

export default Item;
