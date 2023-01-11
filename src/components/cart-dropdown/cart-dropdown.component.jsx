import { useNavigate } from 'react-router-dom';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';

import { CartDropdownContainer, CartItemContainer, EmptyMessage } from './cart-dropdown.styles.jsx';

const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();
    const gotoCheckoutHandler = () => {
        navigate('/checkout');
    }
    return (
        <CartDropdownContainer>
            <CartItemContainer>
                {
                    cartItems.length ? ( 
                        cartItems.map(cartItem => <CartItem key={cartItem.id} cartItem={cartItem} />)
                        )
                    : (<EmptyMessage>Your cart is empty</EmptyMessage>)
                }
            </CartItemContainer>
            <Button onClick={gotoCheckoutHandler}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown;