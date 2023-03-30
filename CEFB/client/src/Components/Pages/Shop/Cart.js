import '../Shop/Cart.css';
import React from 'react';


function Cart(props) {
    const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = props;
    return (
        <div className='Cart'>
            <h1 className='cart-title'>Cart Page</h1>
            <div className="cart-items">
                {cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                        <img className='cart-image' style={{ width: "200px", height: "200px" }} src={item.image} alt={item.name} />
                        <h2 className='cart-item-name'>{item.name}</h2>
                        <p className='cart-item-price'>£{item.price}</p>
                        <p className='cart-item-quantity'>Quantity: {item.quantity}</p>
                        <button className='cart-increase-button' onClick={() => increaseQuantity(item)}>+</button>
                        <button className='cart-decrease-button' onClick={() => decreaseQuantity(item)}>-</button>
                        <button className='cart-remove-button' onClick={() => removeFromCart(item)}>Remove</button>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Cart;

