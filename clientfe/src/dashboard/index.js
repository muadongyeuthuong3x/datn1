import { FormOutlined, UserOutlined } from '@ant-design/icons';
import './Dashboard.modules.scss'
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
    const [stateRenderClickId , setRenderClickId] = useState(1)
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const items = [
        {
            slider: getItem(<Link to="/dashboard">
                Danh sách user
            </Link>, '1', < UserOutlined />), isAdmin: true
        },
        {
            slider: getItem(<Link to="/list-teacher">
                Danh sách  giáo viên
            </Link>, '7', <FormOutlined />), isAdmin: false
        },
        {
            slider: getItem(<Link to="/list-khoi">
                Danh sách khối
            </Link>, '2', <FormOutlined />), isAdmin: false
        },
        {
            slider: getItem(<Link to="/list-exam">
              Môn Học
            </Link>, '3', <FormOutlined />), isAdmin: false
        },
        {
            slider: getItem(<Link to="/exam-form">
                Hình thức thi
            </Link>, '4', <FormOutlined />), isAdmin: false
        },
        {
            slider: getItem(<Link to="/form-room">
               Phòng Thi
            </Link>, '5', <FormOutlined />), isAdmin: false
        },
          {
            slider: getItem(<Link to="/schedule-test">
               Lên Lịch Thi
            </Link>, '6', <FormOutlined />), isAdmin: false
        },
        {
            slider: getItem(<Link to="/student-score">
               Lên Điểm Thi
            </Link>, '8', <FormOutlined />), isAdmin: false
        },

        {
            slider: getItem(<Link to="/exam-block">
                Môn Thi Của Khối
            </Link>, '9', <FormOutlined />), isAdmin: false
        },
        
    ];


    const listData = useMemo(() => {
        if (checkRole.length < 0) {
            return
        }
        const itemsList = [];
        // eslint-disable-next-line array-callback-return
        items.map(data => {
            const { isAdmin } = data
            if (checkRole === "admin" && isAdmin) {
                itemsList.push(data.slider)
            } else if ((checkRole === "user" && !isAdmin) || checkRole === "admin") {
                itemsList.push(data.slider)
            }
        })
        return itemsList;
    }, [checkRole ,items])



    const openTabMenu = (e) => {
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


                    <Menu theme="dark" onClick={openTabMenu}  defaultSelectedKeys={listData[0].key}    mode="inline" items={listData} />
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