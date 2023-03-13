import { FormOutlined, UserOutlined } from '@ant-design/icons';
import './Dashboard.modules.scss'
import { NavLink, useLocation } from 'react-router-dom';
import { Breadcrumb, Layout, Menu, theme, Image } from 'antd';
import Loadding from '../loadding/index'
import {
    useState,
    useMemo,
} from 'react';
import { Link } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
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
    const location = useLocation();
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const checkRole = JSON.parse(localStorage.getItem('datawebkma')).role || '';
    const [stateRenderClickId, setRenderClickId] = useState(-1)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    // const items = [
    //     {
    //         slider: getItem(<NavLink to="/dashboard">
    //             Danh sách user
    //         </NavLink >, '1', < UserOutlined />), isAdmin: true
    //     },
    //     {
    //         slider: getItem(<NavLink to="/list-teacher">
    //             Danh sách  giáo viên
    //         </NavLink >, '7', <FormOutlined />), isAdmin: false
    //     },
    //     {
    //         slider: getItem(<NavLink to="/list-khoi">
    //             Danh sách khối
    //         </NavLink >, '2', <FormOutlined />), isAdmin: false
    //     },
    //     {
    //         slider: getItem(<NavLink to="/list-exam">
    //             Môn Học
    //         </NavLink >, '3', <FormOutlined />), isAdmin: false
    //     },
    //     {
    //         slider: getItem(<NavLink to="/exam-form">
    //             Hình thức thi
    //         </NavLink >, '4', <FormOutlined />), isAdmin: false
    //     },
    //     {
    //         slider: getItem(<NavLink to="/form-room">
    //             Phòng Thi
    //         </NavLink >, '5', <FormOutlined />), isAdmin: false
    //     },
    //     {
    //         slider: getItem(<NavLink to="/schedule-test">
    //             Lên Lịch Thi
    //         </NavLink >, '6', <FormOutlined />), isAdmin: false
    //     },
    //     {
    //         slider: getItem(<NavLink to="/student-score">
    //             Lên Điểm Thi
    //         </NavLink >, '8', <FormOutlined />), isAdmin: false
    //     },

    //     {
    //         slider: getItem(<NavLink to="/exam-block">
    //             Môn Thi Của Khối
    //         </NavLink >, '9', <FormOutlined />), isAdmin: false
    //     },
    //     {
    //         slider: getItem(<NavLink to="/edit-score">
    //             Sửa điểm thi
    //         </NavLink >, '10', <FormOutlined />), isAdmin: false
    //     },
    //     {
    //         slider: getItem(<NavLink to="/tt-score-student">
    //             Thống kế điểm thi sinh viên
    //         </NavLink >, '11', <FormOutlined />), isAdmin: false
    //     },

    // ];

    const items = [
        {
            link: "/dashboard",
            text: "Danh sách user",
            icon: < UserOutlined />,
            isAdmin: true,
            key: 0
        },
        {
            link: "/list-teacher",
            text: "Danh sách  giáo viên",
            icon: < UserOutlined />,
            isAdmin: false,
            key: 1
        },
        {
            link: "/list-khoi",
            text: "Danh sách khối",
            icon: < UserOutlined />,
            isAdmin: false,
            key: 2
        },
        {
            link: "/list-exam",
            text: "Môn Học",
            icon: < UserOutlined />,
            isAdmin: false,
            key: 3
        },
        {
            link: "/exam-form",
            text: "Hình thức thi",
            icon: < UserOutlined />,
            isAdmin: false,
            key: 4
        },
        {
            link: "/form-room",
            text: "Phòng Thi",
            icon: < UserOutlined />,
            isAdmin: false,
            key: 5
        },
        {
            link: "/schedule-test",
            text: "Lên Lịch Thi",
            icon: < UserOutlined />,
            isAdmin: false,
            key: 6
        },
        {
            link: "/student-score",
            text: "Lên Điểm Thi",
            icon: < UserOutlined />,
            isAdmin: false,
            key: 7
        },
        {
            link: "/edit-score",
            text: "Sửa điểm thi",
            icon: < UserOutlined />,
            isAdmin: false,
            key: 8
        },
        {
            link: "/exam-block",
            text: "Môn Thi Của Khối",
            icon: < UserOutlined />,
            isAdmin: false,
            key: 9
        },
        {
            link: "/tt-score-student",
            text: "Thống kế điểm thi sinh viên",
            icon: < UserOutlined />,
            isAdmin: false,
            key: 10
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
            if (checkRole === "admin" && isAdmin) {
                itemsList.push({
                    link: link,
                    text: text,
                    icon: icon,
                    key: key
                })
            } else if ((checkRole === "user" && !isAdmin) || checkRole === "admin") {
                itemsList.push({
                    link: link,
                    text: text,
                    icon: icon,
                    key: key
                })
            }
        })
        return itemsList;
    }, [checkRole, items])

    // const listData = useMemo(() => {
    //     if (checkRole.length < 0) {
    //         return
    //     }
    //     const itemsList = [];
    //     // eslint-disable-next-line array-callback-return
    //     items.map(data => {
    //         const { isAdmin } = data
    //         if (checkRole === "admin" && isAdmin) {
    //             itemsList.push(data.slider)
    //         } else if ((checkRole === "user" && !isAdmin) || checkRole === "admin") {
    //             itemsList.push(data.slider)
    //         }
    //     })
    //     return itemsList;
    // }, [checkRole, items])


    const openTabMenu = (e) => {
        console.log(e)
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


                    {/* <Menu theme="dark" onClick={openTabMenu} defaultSelectedKeys={stateRenderClickId < 0 ? listData[0].key : stateRenderClickId} selectedKeys={stateRenderClickId < 0 ? listData[0].key : stateRenderClickId} mode="inline" items={listData} /> */}
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={[stateRenderClickId]}
                        style={{ width: 250 }}
                        selectedKeys={[stateRenderClickId]}
                    >
                        {
                            listData.map(e => {
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
                        }}
                    />
                    <Content
                        style={{
                            margin: '0 16px',
                        }}

                    >
                        <Breadcrumb
                            style={{
                                margin: '16px 0',
                            }}
                        >
                        </Breadcrumb>
                        <div
                            style={{
                                padding: 24,
                                minHeight: 360,
                                background: colorBgContainer,
                            }}
                            className="content"
                        >
                            <ComponentProps />
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