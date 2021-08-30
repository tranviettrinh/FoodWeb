import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_EMPTY,
  CART_GET_ALL,
  CART_REMOVE_ITEM,
} from "../constants/CartConstants";

export const addToCart = (productId, sl) => async (dispatch, getState) => {
  const { data } = await axios.get(
    `http://localhost:5000/api/product/getproductbyid/${productId}`
  );
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      name: data.result.name,
      price: data.result.price,
      img: data.result.img,
      product: data.result._id,
      sl,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  localStorage.removeItem("cartItems");
};

export const removeAllCart = () => (dispatch, getState) => {
  dispatch({ type: CART_EMPTY });
  localStorage.removeItem("cartItems");
};
export const getAllCart = () => (dispatch, getState) => {
  dispatch({ type: CART_GET_ALL });
};
