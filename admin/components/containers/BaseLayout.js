import {Breadcrumb, Layout, Menu} from 'antd';
import {LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons';
import {getAuth} from "firebase/auth";
import firebaseApp from "../../net/firebaseApp";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import SignIn from "../views/SignIn";
import Loading from "../views/Loading";

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

export default function BaseLayout({children}) {
    const auth = getAuth(firebaseApp);
    const router = useRouter();
    const [loaded, setLoaded] = useState(false);
    const [credential, setCredential] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged(credential => {
            // TODO: 허용된 사용자만 로그인 유지
            if( credential ) {
                switch( credential.email ) {
                    case "codelab@grotesq.com":
                        setCredential(credential);
                        break;
                    default:
                        alert( '관리자만 로그인 할 수 있습니다.' );
                }
            }
            else {
                setCredential( null );
            }
            setLoaded(true);
        });
    }, []);

    if (!loaded) {
        return <Loading/>;
    }

    if (!credential) {
        return <SignIn/>;
    }

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Header className="header">
                <div className="logo" style={{
                    float: 'left',
                    width: 120,
                    height: 31,
                    margin: '16px 24px 16px 0',
                    background: 'rgba(255, 255, 255, 0.3)',
                }}/>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                    <Menu.Item key="sign-out" onClick={() => {
                        auth.signOut();
                    }}>로그아웃</Menu.Item>
                </Menu>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{height: '100%', borderRight: 0}}
                    >
                        <SubMenu key="sub1" icon={<UserOutlined/>} title="subnav 1">
                            <Menu.Item key="1">option1</Menu.Item>
                            <Menu.Item key="2">option2</Menu.Item>
                            <Menu.Item key="3">option3</Menu.Item>
                            <Menu.Item key="4">option4</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<LaptopOutlined/>} title="subnav 2">
                            <Menu.Item key="5">option5</Menu.Item>
                            <Menu.Item key="6">option6</Menu.Item>
                            <Menu.Item key="7">option7</Menu.Item>
                            <Menu.Item key="8">option8</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" icon={<NotificationOutlined/>} title="subnav 3">
                            <Menu.Item key="9">option9</Menu.Item>
                            <Menu.Item key="10">option10</Menu.Item>
                            <Menu.Item key="11">option11</Menu.Item>
                            <Menu.Item key="12">option12</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout style={{padding: '0 24px 24px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: '#fff'
                        }}
                    >
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}
