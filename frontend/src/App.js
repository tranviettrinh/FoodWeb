import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import SigninScreen from './screens/SigninScreen';
import AdminScreen from './screens/AdminScreen';

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              🍝 Food Web 🍱
            </Link>
          </div>

          <div>
            <Link to="/cart">
              Giỏ hàng 🛒
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            <Link to="/signin">Đăng nhập 🔒</Link>
          </div>
        </header>
        <main>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/admin" component={AdminScreen}></Route>

        </main>
        <footer className="row center">
          <div>Phát triển bởi  <a href="https://github.com/tranviettrinh">Trần Việt Trinh</a>  và <a href="https://github.com/macduong">Mạc Tùng Dương</a></div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
