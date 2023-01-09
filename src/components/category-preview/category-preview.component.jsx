import { Link } from 'react-router-dom';
import ProductCard from '../product-card/product-card.component';
import {CategoryPreviewContainer, PreviewContainer, TitleContainer} from './category-preview.styles.jsx';

const CategoryPreview = ({ title, products }) => {
    return (
        <CategoryPreviewContainer>
            <h2>
                <Link className='nav-link' to={title}>
                    <TitleContainer as='span'>{title.toUpperCase()}</TitleContainer>
                </Link>
            </h2>
            <PreviewContainer>
                {
                    products.filter((_, index) => index < 4)
                        .map(product => <ProductCard key={product.id} product={product}></ProductCard>)
                }
            </PreviewContainer>
        </CategoryPreviewContainer>
    )
}

export default CategoryPreview;