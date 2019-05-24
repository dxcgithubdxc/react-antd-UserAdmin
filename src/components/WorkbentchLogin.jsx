import React from 'react';
import {
    Form, Icon, Input, Button, message,
} from 'antd';
import './css/components.css';

const storage = require('store');
/**
 * WorkbentchName:项目名称
 * LoginUrl：登录接口的url
 * pushFirstRuter：登录时跳转页面的方法
 * 返回父组件：data:服务器的响应数据,username:用户输入的用户名
 */

export default class WorkbentchLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            validateStatus1: '',
            help1: '',
            validateStatus2: '',
            help2: '',
            username: '',
            pasword: '',
        };
    }

    componentWillMount() {
        console.log(this.props);
        const username = storage.get('username');
        if (username) { storage.remove('username'); }
    }

    componentDidMount() {}

    Login() {
        const { username, pasword } = this.state;
        if (username === '') {
            this.setState({
                validateStatus1: 'error',
                help1: '*请输入您的用户名',
            });
            return;
        }
        if (pasword === ' ') {
            this.setState({
                validateStatus2: 'error',
                help2: '*请输入您的密码',
            });
            return;
        }
        const sbdata = {
            user_name: username,
            pass_word: pasword,
        };
        const content = this;
        const { LoginUrl } = this.props;

        const data = {
            resCode: 1,
            resStatus: true,
            resMsg: '登陆成功！！',
        };
        const { pushFirstRuter } = content.props;
        pushFirstRuter(data, username);
        // fetch(LoginUrl, {
        //     method: 'POST',
        //     dataType: 'json',
        //     body: JSON.stringify(sbdata),
        //     headers: new Headers({
        //         Accept: 'application/json',
        //         'Content-Type': 'text/plain;charset=UTF-8',
        //     }),
        // }).then((res) => {
        //     res.json().then((data) => {
        //         console.log(data);
        //         const { pushFirstRuter } = content.props;
        //         pushFirstRuter(data, username);
        //     }, (error) => {
        //         console.log(error);
        //         const { pushFirstRuter } = content.props;
        //         pushFirstRuter(error, username);
        //     });
        // });
    }

    render() {
        const FormItem = Form.Item;
        const {
            help1, help2, validateStatus1, username, validateStatus2, pasword,
        } = this.state;
        const { WorkbentchName } = this.props;
        return (
            <div>
                <div style={{
                    width: '400px', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
                }}
                >
                    <Form className="login-form">
                        <FormItem>
                            <h2 style={{ textAlign: 'center' }}>{WorkbentchName}</h2>
                        </FormItem>
                        <FormItem
                            validateStatus={validateStatus1}
                            help={help1}
                        >
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="用户名"
                                value={username}
                                onChange={(e) => {
                                    this.setState({
                                        validateStatus1: '',
                                        help1: '',
                                        username: e.target.value,
                                    });
                                }}
                            />
                        </FormItem>
                        <FormItem
                            validateStatus={validateStatus2}
                            help={help2}
                        >
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                value={pasword}
                                type="password"
                                placeholder="密码"
                                onChange={(e) => {
                                    this.setState({
                                        validateStatus2: '',
                                        help2: '',
                                        pasword: e.target.value,
                                    });
                                }}
                            />
                        </FormItem>
                        <FormItem>
                            <Button type="primary" block onClick={() => { this.Login(); }}>登 录</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}
