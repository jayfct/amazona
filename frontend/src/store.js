import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
  cart: {
    cartItems: [],
  },
};
function reducer(state, action) {
  switch (action.type) {
    case "CART_ADD_ITEM":
      // add to cart
      const newItem = action.payload; //new item added
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      ); //if the new added item id already in cart, find it from cart
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : //map through the cart and match the id, if found, add the
          //new quantity(new item): if id not found, just keep the existing item in the cart
          [...state.cart.cartItems, newItem];
      //if not found in eixisting product, add the new item in cart
      return { ...state, cart: { ...state.cart, cartItems } };
    //update the store with  the previous state and the updated cart
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children} </Store.Provider>;
}
