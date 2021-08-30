import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import axios from "axios";

export default function HomeScreen() {

  const[data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:5000/api/product/getallproduct"
      );
      setData(response.data);
    };
    fetchData();
  }, []);

  if (!data.success) {
    return (
      <div>
        Không tìm thấy sản phẩm
        <div> {data.error} </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="row center">
          {data.result.map((product) => (
            <Product key={product._id} product={product}></Product>
          ))}
        </div>
      </div>
    );
  }
}
