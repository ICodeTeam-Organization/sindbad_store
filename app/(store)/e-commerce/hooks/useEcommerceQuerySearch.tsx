import { useQueryState, parseAsInteger } from "nuqs";

export default function useEcommerceQuerySearch() {
 
  const [categoryId, setCategoryId] = useQueryState("catId", {
    defaultValue: null,
    parse: (value) => {
      return ( value ? parseAsInteger.parse(value) : null)
    },
    history: "push",
  });

  const [ecommerceName, setEcommerceName] = useQueryState("search", {
    defaultValue: '',
    parse: (value) => {
      return ( value ? value : '')
    },
    history: "push",
  });

  return {
    categoryId,
    setCategoryId,
    ecommerceName, 
    setEcommerceName
  };
}
