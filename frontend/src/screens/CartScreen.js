import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToCart,
  removeAllCart,
  removeFromCart,
} from "../actions/cartActions";
import MessageBox from "../components/MessageBox";

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const sl = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, sl));
    }
  }, [dispatch, productId, sl]);

  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mail, setMail] = useState("");

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = async () => {
    // console.log(cartItems);
    await axios.post(`http://localhost:5000/api/mail/sendmail/`, {
      cartItems,
      phone,
      name,
      address,
      mail,
    });
    window.location.href = "/";
    dispatch(removeAllCart());
  };

  return (
    <div className="row top">
      <div className="col-2">
        <h1>Giỏ hàng</h1>
        {cartItems.length === 0 ? (
          <MessageBox>
            Giỏ hàng trống{" "}
            <div>
              <Link to="/">Trở về trang chủ</Link>
            </div>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={cartItems.product}>
                <div className="row">
                  <div>
                    <img src={item.img} alt={item.name} className="small"></img>
                  </div>
                  <div className="min-30">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div>
                    <select
                      value={item.sl}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      <option key={1} value={1}>
                        {1}
                      </option>
                      <option key={2} value={2}>
                        {2}
                      </option>
                      <option key={3} value={3}>
                        {3}
                      </option>
                      <option key={4} value={4}>
                        {4}
                      </option>
                      <option key={5} value={5}>
                        {5}
                      </option>
                    </select>
                  </div>
                  <div>{item.price} VND</div>
                  <div>
                    <button
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Xóa khỏi giỏ hàng
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h3>
                Tổng đơn hàng: ({cartItems.reduce((a, c) => a + c.sl, 0)} sản
                phẩm) : {cartItems.reduce((a, c) => a + c.price * c.sl, 0)} VND
              </h3>
            </li>
            <li>
              <h3>
                Quý khách vui lòng nhập đầy đủ thông tin trước khi đặt hàng:
              </h3>
            </li>
            <li>
              <div className="row">
                Tên Khách Hàng*:
                <input
                  type="text"
                  pattern="[a-zA-Z]*"
                  className="name-input"
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </li>
            <li>
              <div className="row">
                Số điện thoại*:
                <input
                  type="number"
                  className="phone-input"
                  id="phone"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </li>
            <li>
              <div className="row">
                Địa chỉ mail:
                <input
                  type="text"
                  className="phone-input"
                  id="mail"
                  pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}"
                  onChange={(e) => setMail(e.target.value)}
                />
              </div>
            </li>
            <li>
              <div className="row">
                Địa chỉ giao hàng*:
                <input
                  type="text"
                  className="address-input"
                  id="address"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </li>
            {
              <li>
                {" "}
                <button
                  type="button"
                  onClick={checkoutHandler}
                  className="primary block"
                  disabled={
                    cartItems.length === 0 ||
                    phone === "" ||
                    name === "" ||
                    address === ""
                  }
                >
                  Thanh toán đơn hàng
                </button>
              </li>
            }
          </ul>
        </div>
      </div>
    </div>
  );
}
