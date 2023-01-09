import { createContext, useState, useEffect } from 'react';
import { addCollectionAndDocuments, getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';
// import SHOP_DATA from '../shop-data.js'; //One time required to populate the collection

export const ProductsContext = createContext({
    products: [],
    setProducts: () => null
});

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    // One time required to populate the collection
    // useEffect(()=>{
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, []);
    useEffect(() => {
        const getCategoriesMap = async()=> {
         const categoryMap = await getCategoriesAndDocuments();
        }
        categoryMap();
    }, []);
    const value = { products, setProducts };
    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}