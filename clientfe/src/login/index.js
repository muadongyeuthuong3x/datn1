import { useState } from 'react';
import "./css/style.css";
import "./css/font-awesome.css";
import { useDispatch } from 'react-redux'
import { apiLoginWeb } from '../slices/login'

const Login = () => {
    const [iconShowPass, setIconShowPass] = useState(false);
    const [formLogin, setFormLogin] = useState(false);
    const dispatch = useDispatch()
    const onCLickShowPass = () => {
        setIconShowPass(!iconShowPass)
    }

    const onChangeInput = (e) => {
        setFormLogin(prev => {
            return {
                ...prev,
                [e.target.key]: e.target.value

            }
        })
    }
    const onClickButtonLogin = () => {
        dispatch(apiLoginWeb(formLogin))
    }
    return (
        <div className="center-container">

            <div className="header-w3l">
                <h1> Học viện kĩ thuật mật mã</h1>
            </div>

            <div className="main-content-agile">
                <div className="sub-main-w3">
                    <div className="wthree-pro">
                        <h2> Đăng nhập</h2>
                    </div>
                    <form action="#" method="post">
                        <div className="pom-agile">
                            <input placeholder="E-mail" name="Name" className="user" type="email" required="" onChange={onChangeInput} />
                            <span className="icon1"><i className="fa fa-user" aria-hidden="true"></i></span>
                        </div>
                        <div className="pom-agile">
                            <input placeholder="Password" name="Password" className="pass" type={iconShowPass ? "text" : "password"} required="" onChange={onChangeInput} />
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