import { createContext, useState, useEffect } from 'react';
import { addCollectionAndDocuments, getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';
// import SHOP_DATA from '../shop-data.js'; //One time required to populate the collection

export const CategoriesContext = createContext({
    categoriesMap: {},
    setCategoriesMap: () => null
});

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    // One time required to populate the collection
    // useEffect(()=>{
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, []);
    useEffect(() => {
        const getCategoriesMap = async()=> {
         const categoryMap = await getCategoriesAndDocuments();
         setCategoriesMap(categoryMap);
        }
        getCategoriesMap();
    }, []);
    const value = { categoriesMap, setCategoriesMap };
    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}