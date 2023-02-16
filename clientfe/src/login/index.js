import { useState } from 'react';
import "./css/style.modules.scss";
import "./css/font-awesome.modules.scss";
import { useDispatch } from 'react-redux'
import { apiLoginWeb } from '../slices/login'
import {toast ,ToastContainer } from 'react-toastify';

const Login = () => {
    const [iconShowPass, setIconShowPass] = useState(false);
    const [formLogin, setFormLogin] = useState({
        email: "",
        password: "",
    });
    const dispatch = useDispatch()
    const onCLickShowPass = () => {
        setIconShowPass(!iconShowPass)
    }

    const onChangeInput = (e) => {
        setFormLogin(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value

            }
        })
    }

    const onClickButtonLogin = () => {
        dispatch(apiLoginWeb(formLogin, toast));
    }
    return (
        <div className="center-container">
            <div className="header-w3l">
                <h1> Học viện kĩ thuật mật mã</h1>
            </div>
               <ToastContainer/>
            <div className="main-content-agile">
                <div className="sub-main-w3">
                    <div className="wthree-pro">
                        <h2> Đăng nhập</h2>
                    </div>
                    <form action="#" method="post">
                        <div className="pom-agile">
                            <input placeholder="E-mail" name="email" className="user" type="email" required="" onChange={onChangeInput} value={formLogin.email} />
                            <span className="icon1"><i className="fa fa-user" aria-hidden="true"></i></span>
                        </div>
                        <div className="pom-agile">
                            <input placeholder="Password" name="password" className="pass" type={iconShowPass ? "text" : "password"} required="" onChange={onChangeInput} value={formLogin.password} />
                            <span className="icon2" onClick={onCLickShowPass}>  {iconShowPass ? <i className="fa fa-unlock" aria-hidden="true"></i> : <i className="fa fa-lock" aria-hidden="true"></i>}  </span>
                        </div>
                        <div className="sub-w3l">
                            <h6><a href="#">Forgot Password?</a></h6>
                            <div className="right-w3l" onClick={onClickButtonLogin}>
                                <input type="button" value="Login" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Login;