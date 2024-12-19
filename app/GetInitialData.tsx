import React from 'react'
import GetFavorite from './(home)/(getInitData)/GetFavorite'
import GetCartItems from './(home)/(getInitData)/GetCartItems'
import SetCategoriesInLocalStorage from './(home)/(getInitData)/SetCategoriesInLocalStorage'
import { getApi } from '@/lib/http';
import { MainCategory } from '@/types/storeTypes';

 async function GetInitialData() {

    const AllCategoriesWithSub = await getApi<{data:{items:MainCategory[]}}>(
        "Categories/GetAllMainCategoriesWithSubCategories/1/10000"
      );

  return <>
    <SetCategoriesInLocalStorage AllCategoriesWihtSubcategories={AllCategoriesWithSub?.data?.items} />
    <GetCartItems/>
    <GetFavorite/>
  </>
}

export default GetInitialData