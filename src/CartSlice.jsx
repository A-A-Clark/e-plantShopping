import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity:0, // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find((item) => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
      state.totalQuantity++;
    },
    removeItem: (state, action) => {
      const { name } = action.payload;
      const itemToRemove = state.items.find((item) => item.name === name);
      if (itemToRemove) {
        state.items = state.items.filter((item) => item.name !== name); // Return all elements except the item to be removed
        state.totalQuantity -= itemToRemove.quantity;
      }
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item.name === name);
      if (itemToUpdate) {
        state.totalQuantity += (quantity - itemToUpdate.quantity);
        itemToUpdate.quantity = quantity;
        
      }
    },
  },
});
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export const calcTotalQuantity = (state) => state.cart.totalQuantity;

export default CartSlice.reducer;
