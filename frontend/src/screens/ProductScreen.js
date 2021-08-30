import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";

export default function ProductScreen(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/product/getproductbyid/${props.match.params.id}`
      );
      setData(response.data);
    };
    fetchData();
  }, [props.match.params.id]);

  const [sl, setQty] = useState(1);
  const [rate, setRating] = useState(1);

  let product = data.result;

  if (!product) {
    return <div>Không tìm thấy sản phẩm</div>;
  } else {
    const addtoCartHandler = () => {
      props.history.push(`/cart/${data.result._id}?sl=${sl}`);
    };
    const sendRating = async (e) => {
      let numReviews1 = product.numReviews + 1;

      let rating = (
        (product.rating * product.numReviews + Number(rate)) /
        numReviews1
      ).toFixed(1);

      product = { ...product, rating, numReviews: numReviews1 };
      await axios.post(`http://localhost:5000/api/product/updateproduct/`, {
        ...product,
      });
      window.location.reload(false);
    };

    return (
      <div>
        {" "}
        <Link to="/">Trở về trang chủ</Link>
        <div className="row top">
          <div className="col-2">
            <img
              className="large"
              src={`http://localhost:5000${product.img}`}
              alt={product.name}
            ></img>
            <div className="card-rating">
              <h3>ĐÁNH GIÁ SẢN PHẨM</h3>
              <div className="card-center">
                <select
                  value={rate}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option key={1} value={1}>
                    1 ⭐
                  </option>
                  <option key={2} value={2}>
                    2 ⭐
                  </option>
                  <option key={3} value={3}>
                    3 ⭐
                  </option>
                  <option key={4} value={4}>
                    4 ⭐
                  </option>
                  <option key={5} value={5}>
                    5 ⭐
                  </option>
                </select>
                <button onClick={sendRating} className="secondary block2">
                  GỬI ĐÁNH GIÁ
                </button>
              </div>
            </div>
          </div>
          <div className="col-1">
            <ul>
              <li>
                <h1>{product.name}</h1>
              </li>
              <li>
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                ></Rating>
              </li>
              <li>Giá: {product.price} VND</li>
              <li>
                <p>
                  Thông tin sản phẩm: <p>{product.description}</p>
                </p>
              </li>
            </ul>
          </div>
          <div className="col-1">
            <div className="card card-body">
              <ul>
                <li>
                  <div className="row">
                    <div>Giá</div>
                    <div className="price">{product.price} VND</div>
                  </div>
                </li>
                {
                  <>
                    <li>
                      <div className="row">
                        <div>Số lượng:</div>
                        <div>
                          <select
                            value={sl}
                            onChange={(e) => setQty(e.target.value)}
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
                      </div>
                    </li>

                    <li>
                      <button
                        onClick={addtoCartHandler}
                        className="primary block"
                      >
                        Thêm vào giỏ hàng
                      </button>
                    </li>
                  </>
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
