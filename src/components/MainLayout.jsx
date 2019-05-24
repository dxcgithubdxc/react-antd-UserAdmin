import React from 'react';
import { Link } from 'react-router-dom';
import {
    Layout, Menu, Icon, Modal,
} from 'antd';

// const storage = require('store');
import storage from 'store';

// const { SubMenu, MenuItemGroup } = Menu;
export default class MainLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPath: '/home',
            dateString: ' ',
            collapsed: false,
        };
    }

    componentWillMount() {
        // console.log(this.props);
        const { location } = this.props;
        const { pathname } = location;
        this.setState({
            currentPath: pathname,
        });
    }

    componentDidMount() {
        const spaceStr = '   ';
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const nowDate = date.getDate();
        let day;
        if (date.getDay() === 0) { day = '日'; }
        else if (date.getDay() === 1) { day = '一'; }
        else if (date.getDay() === 2) { day = '二'; }
        else if (date.getDay() === 3) { day = '三'; }
        else if (date.getDay() === 4) { day = '四'; }
        else if (date.getDay() === 5) { day = '五'; }
        else if (date.getDay() === 6) { day = '六'; }
        const dateString = `${year}年${month}月${nowDate}日${spaceStr}星期${day}`;
        this.setState({ dateString });
    }


    //  退出登录
    Logout() {
        Modal.confirm({
            title: '确定要退出系统吗?',
            content: '将会退出登录',
            okText: '确认',
            okType: 'danger',
            cancelText: '返回',
            onOk() {
                const username = storage.get('username');
                if (username) {
                    storage.remove('username');
                }
                window.location.href = window.location.origin;
            },
            onCancel() { },
        });
    }

    render() {
        const { Header, Sider, Content } = Layout;
        const SubMenu = Menu.SubMenu;
        const MenuItemGroup = Menu.ItemGroup;
        const { children } = this.props;
        const { dateString, collapsed, currentPath } = this.state;
        return (
            <div>
                <style>
                    {`
              .mainLayout{ height:100vh; }
              .mainLayoutSlider{overflow:scroll;}
              .logo{ height: 32px;line-height:32px;text-align:center;color:white;background: rgba(255,255,255,.2); margin: 16px;}
              .Header{ background: #fff; padding:0 40px 0 15px;position:relative;}
              .HeaderMenu{ line-height:64px; width:100%;}
              .headerMenuItem{ float:right;}
              .content{margin: 10px 10px 0; overflow: initial;}
              .contentItem{ padding: 10px; background: #fff; /*height:100%; text-align: center;*/ }
              .trigger {font-size: 26px;cursor: pointer; transition: color .3s; position:absolute;top:20px;}
               `}
                </style>
                <Layout className="mainLayout">
                    <Sider trigger={null} collapsible collapsed={collapsed} className="mainLayoutSlider">
                        <div className="logo">{collapsed ? '' : 'WorkBentch-BS'}</div>
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['sub1']} selectedKeys={[currentPath]} onClick={(e) => { this.setState({ currentPath: e.key }); }}>
                            <Menu.Item key="/home">
                                <Link to="/home">
                                    <Icon type="home" />
                                    <span>主页</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/tablepage">
                                <Link to="/tablepage">
                                    <Icon type="home" />
                                    <span>可伸缩表格</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/sam">
                                <Link to="/sam">
                                    <Icon type="save" />
                                    <span>SAM卡管理</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/treepage">
                                <Link to="/treepage">
                                    <Icon type="exception" />
                                    <span>Tree</span>
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>

                    <Layout>
                        <Header className="Header">
                            <Icon
                                className="trigger"
                                type={collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={() => {
                                    this.setState({ collapsed: !collapsed });
                                }}
                            />
                            <Menu mode="horizontal" className="HeaderMenu">
                                <Menu.Item
                                    className="headerMenuItem"
                                    key="setting:5"
                                    onClick={() => {
                                        Modal.confirm({
                                            title: '确定要退出系统吗?',
                                            content: '将会退出登录',
                                            okText: '确认',
                                            okType: 'danger',
                                            cancelText: '返回',
                                            onOk() {
                                                const username = storage.get('username');
                                                if (username) {
                                                    storage.remove('username');
                                                }
                                                window.location.href = window.location.origin;
                                            },
                                            onCancel() { },
                                        });
                                    }}
                                >
                                    <Icon type="logout" theme="outlined" />
                                    <span>退出登录</span>
                                </Menu.Item>
                                <Menu.Item key="mail" className="headerMenuItem">
                                    <Icon type="calendar" theme="outlined" />
                                    {dateString}
                                </Menu.Item>
                            </Menu>
                        </Header>

                        <Content className="content">
                            <div className="contentItem">
                                <div className="container">
                                    {children}
                                </div>
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        );
    }
}
