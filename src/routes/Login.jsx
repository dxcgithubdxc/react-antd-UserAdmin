import React from 'react';
import {
    Form, Icon, Input, Button, message,
} from 'antd';

import WorkbentchLogin from '../components/WorkbentchLogin';

const storage = require('store');

// console.log(WorkbentchLogin);
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            WorkbentchName: 'WorkBentch-BS',
            LoginUrl: '/authority/user/login',
            FirstPageRouterPath: '/home',
        };
    }

    componentWillMount() {}

    componentDidMount() {}

    render() {
        const {
            WorkbentchName,
            LoginUrl,
            FirstPageRouterPath,
        } = this.state;
        return (
            <div>
                <WorkbentchLogin
                    WorkbentchName={WorkbentchName}
                    LoginUrl={LoginUrl}
                    pushFirstRuter={(data, username) => {
                        console.log(data, username);
                        if (data.resStatus === true) {
                            storage.set('username', username);
                            const { history } = this.props;
                            history.push({ pathname: FirstPageRouterPath });
                            message.success('登录成功！');
                        }
                        else {
                            message.warning(data.resMsg);
                        }
                    }}
                />
            </div>
        );
    }
}
