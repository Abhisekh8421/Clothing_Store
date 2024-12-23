import { createContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "₹";
  const delivery_fee = 40;
  const [search, setSearch] = useState("");
  const [showsearch, setShowsearch] = useState(false);

  const [cartitems, setcartitems] = useState({});

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }
    let cartData = structuredClone(cartitems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setcartitems(cartData);

    // ex:-  :{
    //   item1: { M: 2 }
    // }
  };

  //main logic for getcartcount
  const getcartCount = () => {
    let totalcount = 0;
    for (const items in cartitems) {
      for (const item in cartitems[items]) {
        try {
          if (cartitems[items][item] > 0) {
            totalcount += cartitems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalcount;
  };

  //update cart quantity function
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartitems);
    cartData[itemId][size] = quantity;
    setcartitems(cartData);
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showsearch,
    setShowsearch,
    addToCart,
    cartitems,
    getcartCount,
    updateQuantity,
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
