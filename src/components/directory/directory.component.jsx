import '../category-item/category-item.component';
import './directory.style.scss';
import CategoryItem from '../category-item/category-item.component';

const Directory = ({categories}) => (
      <div className="directory-container">
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category}/>
        ))}
      </div>
    );
  
  export default Directory;