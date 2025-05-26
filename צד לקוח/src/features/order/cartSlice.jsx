import { createSlice } from '@reduxjs/toolkit';
const savedCart = JSON.parse(localStorage.getItem('cart')) || {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: savedCart,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
      const newQuantity = action.payload.cartQuantity; // הכמות המדויקת שהעגלה צריכה להכיל
      const quantity = action.payload.quantity;

      if (newQuantity >= 0) {
        if (itemIndex >= 0) {
          const oldQuantity = state.cartItems[itemIndex].cartQuantity;
          state.totalQuantity = state.totalQuantity - oldQuantity + newQuantity;
          state.totalAmount = state.totalAmount - (state.cartItems[itemIndex].price * oldQuantity) + (action.payload.price * newQuantity);
          state.cartItems[itemIndex].cartQuantity = newQuantity;
        } else {
          state.cartItems.push({
            id: action.payload.id,
            name: action.payload.name,
            price: action.payload.price,
            image: action.payload.image,
            category: action.payload.category,
            cartQuantity: newQuantity
          });
          state.totalQuantity += newQuantity;
          state.totalAmount += action.payload.price * newQuantity;
        }
      } else {
        alert("כמות מוגזמת ביחס למלאי");
      }
      localStorage.setItem('cart', JSON.stringify({
        cartItems: state.cartItems,
        totalAmount: state.totalAmount,
        totalQuantity: state.totalQuantity
      }));
    },

    decreaseCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
      if (itemIndex >= 0) {
        const item = state.cartItems[itemIndex];
        if (item.cartQuantity > 1) {
          item.cartQuantity -= 1;
          state.totalQuantity -= 1;
          state.totalAmount -= item.price;
        } else {
          state.cartItems.splice(itemIndex, 1);
          state.totalQuantity -= 1;
          state.totalAmount -= item.price;
        }
        localStorage.setItem('cart', JSON.stringify({
          cartItems: state.cartItems,
          totalAmount: state.totalAmount,
          totalQuantity: state.totalQuantity
        }));
      }
    },
    removeFromCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
      if (itemIndex >= 0) {
        const item = state.cartItems[itemIndex];
        state.totalQuantity -= item.cartQuantity;
        state.totalAmount -= item.price * item.cartQuantity;
        state.cartItems.splice(itemIndex, 1);
        // שמור נכון ב־localStorage
        localStorage.setItem('cart', JSON.stringify({
          cartItems: state.cartItems,
          totalAmount: state.totalAmount,
          totalQuantity: state.totalQuantity,
        }));
      }
    },


    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
      localStorage.removeItem('cart');
      // קריאת updateQuantity מחוץ ל־reducer
    },
  },
});


export const { addToCart, removeFromCart, decreaseCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;


import { updateQuantity } from "../product/productAPI"; // ודאי שהנתיב נכון
import { getProductById } from "../product/productAPI"; // הנתיב תלוי במבנה התיקיות שלך

export const addItemToCartWithServerUpdate = (item, quantityToAdd) => async (dispatch, getState) => {
  try {
    const updatedProduct = await getProductById(item.id); // שליפת כמות עדכנית
    const availableStock = updatedProduct.quantity;

    const cartItem = getState().cart.cartItems.find((i) => i.id === item.id);
    const currentQuantityInCart = cartItem ? cartItem.cartQuantity : 0;

    const totalQuantityAfterAdd = currentQuantityInCart + quantityToAdd;
    if (quantityToAdd > availableStock) {
      alert("אין מספיק מלאי זמין עבור הכמות שביקשת");
      return;
    }
    const newQuantityInStock = availableStock - quantityToAdd;

    await updateQuantity(item.id, newQuantityInStock);

    dispatch(addToCart({ ...updatedProduct, cartQuantity: totalQuantityAfterAdd, quantity: newQuantityInStock }));
  } catch (e) {
    console.error("שגיאה בהוספה לעגלה:", e);
    alert("שגיאה בעדכון המלאי או בשליפת מידע מהשרת");
  }
};

export const removeItemFromCartWithRestock = (itemId) => async (dispatch, getState) => {
  const state = getState();
  const cartItem = state.cart.cartItems.find(item => item.id === itemId);
  if (!cartItem) return;

  try {
    // מוצאים את הפריט במוצרים
    const product = state.product.products.find(p => p.id === itemId);
    if (!product) return;

    // מחזירים למלאי את הכמות שנמצאת בעגלה
    const newQuantity = product.quantity + cartItem.cartQuantity;

    await updateQuantity(itemId, newQuantity);
    dispatch(updateProductQuantity({ id: itemId, quantity: newQuantity }));

    dispatch(removeFromCart(itemId));  // פעולה שמסירה את הפריט מהעגלה ב-Redux
  } catch (e) {
    console.error("שגיאה בעת מחיקת פריט והחזרת מלאי:", e);
    alert("מחיקת הפריט מהעגלה נכשלה, נסה שוב");
  }
};
