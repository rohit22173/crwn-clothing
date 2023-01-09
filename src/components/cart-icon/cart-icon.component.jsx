import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import {CartIconContainer, ItemCountContainer, ShoppingIconContainer} from './cart-icon.styles.jsx';

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIconContainer/>
            <ItemCountContainer>{cartCount}</ItemCountContainer>
        </CartIconContainer>
    )
}

export default CartIcon;