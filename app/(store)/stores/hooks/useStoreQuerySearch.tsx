import { useQueryState, parseAsInteger } from "nuqs";

export default function useStoreQuerySearch() {
 
  const [categoryId, setCategoryId] = useQueryState("catId", {
    defaultValue: null,
    parse: (value) => {
      return ( value ? parseAsInteger.parse(value) : null)
    },
    history: "replace",
  });

  const [storeName, setStoreName] = useQueryState("search", {
    defaultValue: '',
    parse: (value) => {
      return ( value ? value : '')
    },
    history: "replace",
  });

  return {
    categoryId,
    setCategoryId,
    storeName, 
    setStoreName
  };
}
