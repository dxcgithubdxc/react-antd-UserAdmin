import React from 'react';
import { Tabs } from 'antd';
import SAMtrack from '../components/SAMtrack';
import SAMbind from '../components/SAMbind';
import DeviceReport from '../components/DeviceReport';
import './css/routes.css';

export default class SAM extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount() {
    // console.log(this.props);
    }

    componentDidMount() {}

    render() {
        const { TabPane } = Tabs;
        return (
            <div>
                <Tabs defaultActiveKey="1" onChange={(key) => { }}>
                    <TabPane tab="SAM卡跟踪管理" key="1"><SAMtrack /></TabPane>
                    <TabPane tab="SAM卡绑定设备管理" key="2"><SAMbind /></TabPane>
                    <TabPane tab="SAM卡黑名单" key="3">Content of Tab Pane 3</TabPane>
                    <TabPane tab="设备上报状态查询" key="4"><DeviceReport /></TabPane>
                </Tabs>
            </div>
        );
    }
}
