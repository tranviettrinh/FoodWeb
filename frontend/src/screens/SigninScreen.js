import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AlertMessage from '../components/AlertMessage';
import { LOCAL_STORAGE_TOKEN_NAME } from '../constants/LoginConstants';
import { useHistory } from 'react-router-dom';


export default function SigninScreen() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(null);

        const history = useHistory();

  const submitHandler = async  (e) => {
    e.preventDefault();

    try {
      const data = await axios.post(`http://localhost:5000/api/user/signin`, {
        username,password
      });

      console.log(data.data)
                  if (data.data.success) {
                localStorage.setItem(
                    LOCAL_STORAGE_TOKEN_NAME,
                    data.data.result.accessToken
                );  history.push("/admin");  

            } else {
              
                setAlert({
                    type: 'warning',
                    message: data.data.error
                })
                setTimeout(() => {
                    setAlert(null)
                }, 5000);
            }
    } catch (error) {
      console.log(error);
    }
  };


return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
                  <AlertMessage info={alert}></AlertMessage>
        </div>

        <div>
          <h1>Đăng nhập</h1>
        </div>
        <div>
          <label htmlFor="username">Tên đăng nhập</label>
          <input
            type="username"
            id="username"
            placeholder="Tên đăng nhập"
            required
            onChange={(e) => setUserName(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Mật khẩu</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Đăng nhập
          </button>
        </div>
        <div>
          <label />
          <div>
            Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
          </div>
        </div>
      </form>
    </div>
  );

}