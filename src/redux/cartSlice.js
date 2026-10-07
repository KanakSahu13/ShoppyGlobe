import { createSlice } from "@reduxjs/toolkit";

// the cart stores complete product snapshots plus the local quantity
const initialState = { items: [] };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existing = state.items.find((item) => item.id === product.id);

            if (existing) existing.quantity += 1;
            else state.items.push({ ...product, quantity: 1 });
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
        increaseQuantity: (state, action) => {
            const item = state.items.find((product) => product.id === action.payload);
            if (item) item.quantity += 1;
        },
        decreaseQuantity: (state, action) => {
            const item = state.items. find((product) => product.id === action.payload);

            // quantity is intentionally never allowed to go below one.
            if (item && item.quantity > 1) item.quantity -= 1;
        },
        clearCart: (state) => {
            state.items = [];
        }
    }
})

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) => state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotal = (state) => state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
export default cartSlice.reducer;