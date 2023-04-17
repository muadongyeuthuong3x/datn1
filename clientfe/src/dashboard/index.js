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
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const checkRole = JSON.parse(localStorage.getItem('datawebkma')).role || '';
    const [stateRenderClickId, setRenderClickId] = useState(-1)


    const items = [
        {
            link: "/dashboard",
            text: "Danh sách user",
            icon: < UserOutlined />,
            isAdmin: true,
            key: 0
        },
        {
            link: "/department",
            text: "Danh  sách Khoa",
            icon: < UserOutlined />,
            isAdmin: false,
            key: 1
        },
        {
            link: "/list-teacher",
            text: "Danh sách  giáo viên",
            icon: < UserOutlined />,
            isAdmin: false,
            key: 2
        },
        {
            link: "/list-khoi",
            text: "Danh sách khối",
            icon: < UserOutlined />,
            isAdmin: false,
            key: 3
        },
        {
            link: "/list-exam",
            text: "Môn Thi",
            icon: < UserOutlined />,
            isAdmin: false,
            key: 4
        },
        {
            link: "/exam-form",
            text: "Hình thức thi",
            icon: < UserOutlined />,
            isAdmin: false,
            key: 5
        },
        {
            link: "/form-room",
            text: "Phòng thi",
            icon: < UserOutlined />,
            isAdmin: false,
            key: 6
        },
        {
            link: "/exam-block",
            text: "Môn Thi Của Khối",
            icon: < UserOutlined />,
            isAdmin: false,
            key: 7
        },
      
        {
            link: "/student-score",
            text: "Lên Điểm Thi",
            icon: < UserOutlined />,
            isAdmin: false,
            key: 8
        },
        {
            link: "/edit-score",
            text: "Sửa điểm thi",
            icon: < UserOutlined />,
            isAdmin: false,
            key: 9
        },
       
        {
            link: "/tt-score-student",
            text: "Thống kế điểm thi",
            icon: < UserOutlined />,
            isAdmin: false,
            key: 10
        },
        {
            link: "/schedule-test",
            text: "Lên Lịch Thi",
            icon: < UserOutlined />,
            isAdmin: false,
            key: 11
        },
        {
            link: "/tt-teacher",
            text: "Thống kê phân công thi",
            icon: < UserOutlined />,
            isAdmin: false,
            key: 12
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