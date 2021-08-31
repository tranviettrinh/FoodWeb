import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              Food Web
            </Link>
          </div>

          <div>
            <Link to="/cart">
              Giỏ hàng 🛒
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            <Link to="/login">Đăng nhập 🔒</Link>
          </div>
        </header>
        <main>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">
          <div>Phát triển bởi TranVietTrinh và MacTungDuong</div>
          <div>Thông tin:</div>
          <div>TranVietTrinh: B17DCAT191: https://github.com/tranviettrinh</div>
          <div>MacTungDuong: B17DCAT056: https://github.com/macduong</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
