
import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, decreaseCart, removeFromCart, clearCart } from '../../features/order/cartSlice';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import { removeItemFromCartWithRestock } from '../../features/order/cartSlice';
import { addItemToCartWithServerUpdate } from '../../features/order/cartSlice';
import { getProductById } from '../../features/product/productAPI';
import { updateQuantity } from '../../features/product/productAPI';
const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const totalAmount = useSelector((state) => state.cart.totalAmount);
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);
    const navigate = useNavigate();
    const handleAdd = async (item) => {
        try {
            const product = await getProductById(item.id);

            if (!product || product.quantity <= 0) {
                alert("מוצר לא נמצא במלאי");
                return;
            }
            dispatch(addItemToCartWithServerUpdate(item, 1));
        } catch (error) {
            console.error("שגיאה בהוספת פריט לעגלה:", error);
            alert("שגיאה בעת עדכון המלאי");
        }
    };
    const handleDecrease = async (item) => {
        try {
            const product = await getProductById(item.id);

            if (!product) {
                alert("המוצר לא נמצא במלאי");
                return;
            }

            // מוסיפים למלאי יחידה אחת כי הורדנו פריט מהעגלה
            const updatedStock = product.quantity + 1;

            await updateQuantity(item.id, updatedStock);

            dispatch(decreaseCart(item));
        } catch (error) {
            console.error("שגיאה בהפחתת כמות מהמוצר:", error);
            alert("שגיאה בעת עדכון המלאי");
        }
    };

    const handleRemove = async (item) => {
        try {
            const product = await getProductById(item.id);
            if (!product) {
                alert("המוצר לא נמצא במלאי");
                return;
            }
            const updatedStock = product.quantity + item.cartQuantity;
            await updateQuantity(item.id, updatedStock);
            dispatch(removeFromCart(item));
        } catch (error) {
            console.error("שגיאה בהסרת פריט מהעגלה ועדכון מלאי:", error);
            alert("שגיאה בעת הסרת פריט מהעגלה");
        }
    };
    const handleClear = async () => {
        try {
            await Promise.all(cartItems.map(async (item) => {
                const product = await getProductById(item.id);
                if (!product) {
                    alert(`המוצר ${item.name} לא נמצא במלאי`);
                    return;
                }
                const updatedStock = product.quantity + item.cartQuantity;
                await updateQuantity(item.id, updatedStock);
            }));
            dispatch(clearCart());
        } catch (error) {
            console.error("שגיאה בניקוי העגלה ועדכון מלאי:", error);
            alert("שגיאה בעת ניקוי העגלה, נסה שוב");
        }
    };
    const handleOrder = () => navigate('/order');

    return (
        <div className="cart-container">
            <h2 className="cart-title">🛒 העגלה שלך</h2>
            {cartItems.length === 0 ? (
                <p className="empty-cart">העגלה ריקה</p>
            ) : (
                <>
                    <ul className="cart-list">
                        {cartItems.map(item => (
                            <li key={item.id} className="cart-item">
                                <div className="item-info">
                                    <span className="item-name">{item.name}</span>
                                    <span className="item-price">{item.price} ₪ × {item.cartQuantity}</span>
                                    <span className="item-total">= {(item.price * item.cartQuantity).toFixed(2)} ₪</span>
                                </div>
                                <div className="item-actions">
                                    <button className="cart-btn" onClick={() => handleAdd(item)}>+</button>
                                    <button className="cart-btn" onClick={() => handleDecrease(item)}>-</button>
                                    <button className="cart-remove" onClick={() => handleRemove(item)}>🗑️</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="cart-summary">
                        <p><strong>סה״כ פריטים:</strong> {totalQuantity}</p>
                        <p><strong>סה״כ לתשלום:</strong> {totalAmount.toFixed(2)} ₪</p>
                    </div>
                    <div className="cart-buttons">
                        <button className="clear-btn" onClick={handleClear}>נקה עגלה</button>
                        <button className="order-btn" onClick={handleOrder}>להזמנה</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
