import { FormOutlined, UserOutlined } from '@ant-design/icons';
import './Dashboard.modules.scss'
import { NavLink, useLocation } from 'react-router-dom';
import { Breadcrumb, Layout, Menu, theme, Image } from 'antd';
import Loadding from '../loadding/index'
import {
    useState,
    useMemo,
    useEffect,
} from 'react';
import { Link } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const DashBoard = ({ ComponentProps, loading }) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const checkRole = JSON.parse(localStorage.getItem('datawebkma'))?.role || '';
    const [stateRenderClickId, setRenderClickId] = useState(-1)
    const token = Cookies.get("tokenwebkma");
    const navigate = useNavigate();
    if(!token){
        navigate("/login");
    }
    const items = [
        {
            link: "/dashboard",
            text: "Danh sách user",
            icon: '',
            isAdmin: true,
            key: 0
        },
        {
            link: "/department",
            text: "Danh  sách Khoa",
            icon: '',
            isAdmin: false,
            key: 1
        },
        {
            link: "/list-teacher",
            text: "Danh sách  giáo viên",
            icon: '',
            isAdmin: false,
            key: 2
        },
        {
            link: "/list-khoi",
            text: "Danh sách khối",
            icon: '',
            isAdmin: false,
            key: 3
        },
        {
            link: "/list-exam",
            text: "Môn Thi",
            icon: '',
            isAdmin: false,
            key: 4
        },
        {
            link: "/exam-form",
            text: "Hình thức thi",
            icon: '',
            isAdmin: false,
            key: 5
        },
        {
            link: "/form-room",
            text: "Phòng thi",
            icon: '',
            isAdmin: false,
            key: 6
        },
        {
            link: "/exam-block",
            text: "Môn Thi Của Khối",
            icon: '',
            isAdmin: false,
            key: 7
        },
      
        {
            link: "/student-score",
            text: "Lên Điểm Thi",
            icon: '',
            isAdmin: 'score',
            key: 8
        },
        {
            link: "/edit-score",
            text: "Sửa điểm thi",
            icon: '',
            isAdmin: 'score',
            key: 9
        },
       
        {
            link: "/tt-score-student",
            text: "Thống kế điểm thi",
            icon: '',
            isAdmin: false,
            key: 10
        },
        {
            link: "/schedule-test",
            text: "Lên Lịch Thi",
            icon: '',
            isAdmin: false,
            key: 11
        },
        {
            link: "/tt-teacher",
            text: "Thống kê phân công thi",
            icon: '',
            isAdmin: false,
            key: 12
        },
        {
            link: "/login",
            text: "Đăng xuất",
            icon: '',
            isAdmin: false,
            key: 13
        },
        
    ]
    

    const listData = useMemo(() => {
        if (checkRole.length < 0) {
            return
        }
        const itemsList = [];
        // eslint-disable-next-line array-callback-return
        items.map(data => {
            const { isAdmin, link, text, icon, key } = data
            if (checkRole === "admin" && isAdmin !=='score' ) {
                console.log(text)
                itemsList.push({
                    link: link,
                    text: text,
                    icon: icon,
                    key: key
                })
            } else if ((checkRole === "user" && isAdmin !='score' && ! isAdmin) || checkRole === "admin" && isAdmin != 'score') {
                itemsList.push({
                    link: link,
                    text: text,
                    icon: icon,
                    key: key
                })
            }else if ((checkRole === "score" && isAdmin == 'score') || link == '/login') {
                itemsList.push({
                    link: link,
                    text: text,
                    icon: icon,
                    key: key
                })
            }
        })
        console.log(itemsList)
        return itemsList;
    }, [])


    const openTabMenu = (e) => {
        console.log(e)
        const {key} = e
        if(key == "13"){
            localStorage.removeItem("datawebkma")
            Cookies.remove("tokenwebkma")
        }
        setRenderClickId(e.key)
    }
    return (
        <div>
            <ToastContainer />
            <Loadding ld={loading} />
            <Layout
                style={{
                    minHeight: '100vh',
                }}
            >
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div
                        style={{
                            height: 32,
                            margin: 16,
                        }}
                    >
                        <Image
                            width={100}
                            preview={false}
                            className="image_kma"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlJzy0MD4G986o9IyoW8knywFzLU4s_Q70anV69BUp&s"
                        />
                    </div>


                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={[stateRenderClickId]}
                        style={{ maxWidth: 250 }}
                        selectedKeys={[stateRenderClickId]}
                    >
                        {
                            listData.map((e ,index) => {
                                return <Menu.Item key={e.key} onClick={openTabMenu} className={({ isActive }) => (isActive ? 'active' : 'inactive')} >
                                    <NavLink to={e.link}  className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                                        <div className='flexLink'>
                                            <span>  {e.icon}</span>
                                            <span className='text_link'>{e.text} </span>
                                        </div>
                                    </NavLink>
                                </Menu.Item>
                            })
                        }
                    </Menu>


                </Sider>
                <Layout className="site-layout">
                    <Header
                        style={{
                            padding: 0,
                            background: colorBgContainer,
                            overflow : 'hidden'
                        }}
                    >
                           <div className='animation_noti'> Hãy để mỗi ngày trôi qua đều trở nên đáng nhớ và ý nghĩa. Chúc bạn có một ngày làm việc tuyệt vời!  </div>
                        </Header>
                    <Content
                        style={{
                            margin: '0 16px',
                        }}

                    >
                        {/* <Breadcrumb
                            style={{
                                margin: '16px 0',
                            }}
                        >
                        </Breadcrumb> */}
                        <div
                            style={{
                                padding: 24,
                                minHeight: 360,
                                background: colorBgContainer,
                            }}
                            className="content"
                        >  
                        <div className='scrool_x'> 
                        <ComponentProps />
                        </div>
                           
                        </div>
                    </Content>
                    <Footer
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        Học Viện Kĩ Thuật Mật Mã
                    </Footer>
                </Layout>
            </Layout >
        </div>

    );
};
export default DashBoard;