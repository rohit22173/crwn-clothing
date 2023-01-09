
import {CartItemContainer, ImgContainer, ItemDetailContainer, NameContainer} from './cart-item.styles.jsx';

const CartItem = ({ cartItem }) => {
    const { name, imageUrl, quantity, price } = cartItem;
    return (
        <CartItemContainer>
            <ImgContainer as='img' src={imageUrl} alt={name} />
            <ItemDetailContainer>
                <NameContainer as='span'>{name}</NameContainer>
                <span>{quantity} x ${price}</span>
            </ItemDetailContainer>
        </CartItemContainer>
    )
}

export default CartItem;