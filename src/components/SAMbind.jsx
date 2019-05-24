import React from 'react';
import {
    Row, Col, Button, Modal, Input, Select,
} from 'antd';
import ConditionInput from './ConditionInput';
import ConditionSelect from './ConditionSelect';
import ConditionRegionDatePicker from './ConditionRegionDatePicker';

export default class SAMbind extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SAMNumber: '',
            SAMNumberContent: 'SAM物理卡号[HEX]',
            SAMNumberPlaceholder: '请输入SAM物理卡号',
            SAMTypeContent: 'SAM卡类型',
            SAMTypeArr: [{ //  SAM卡类型表
                label: 'PSAM卡1',
                key: 1,
            },
            {
                label: 'PSAM卡2',
                key: 2,
            },
            {
                label: 'PSAM卡3',
                key: 3,
            },
            ],
            SAMTypeValue: {
                key: 1,
                label: 'PSAM卡1',
            }, // SAM卡Obj
            SAMStatusContent: 'SAM卡状态',
            SAMStatusArr: [{ //  SAM卡状态表
                label: '绑定',
                key: 1,
            },
            {
                label: '已用',
                key: 2,
            },
            {
                abel: '注销',
                key: 3,
            },
            ],
            actionStatusValue: {
                key: 1,
                label: '绑定',
            }, //  操作类型Obj
            regionDateContent: '起止日期',
            dateArr: [], //  起止日期
            dataValueArr: [],
            bindingDevicePlaceholder: '请输入绑定设备',
            bindingDeviceContent: '绑定设备[BCD]',
            bindingDevice: '', //  绑定设备
            modalVisible: false, //  modal对话框
        };
    }

    componentWillMount() {
        // console.log(this.props);
    }

    componentDidMount() {}


    //  选择SAM卡类型Obj
    SAMTypeSelect(value) {
        // console.log('SAM卡类型：', value);
        this.setState({ SAMTypeValue: value });
    }


    //  跟踪绑定
    followRegister() {
        this.setState({
            modalVisible: true,
        });
    }

    //  查询
    search() {
        // console.log('查询');
    }

    //  重置查询条件
    reset() {
        this.setState({
            SAMNumber: '',
            bindingDevice: '',
            dateArr: [],
            dataValueArr: [],
            SAMTypeValue: {
                key: 1,
                label: 'PSAM卡1',
            },
            actionStatusValue: {
                key: 1,
                label: '绑定',
            },

        });
    }

    render() {
        const {
            modalVisible,
            SAMNumber,
            SAMNumberContent,
            SAMNumberPlaceholder,

            SAMTypeContent,
            SAMTypeArr,
            SAMTypeValue,

            SAMStatusContent,
            SAMStatusArr,
            actionStatusValue,
            dateArr,
            dataValueArr,
            regionDateContent,
            bindingDevicePlaceholder,
            bindingDeviceContent,
            bindingDevice, //  绑定设备
        } = this.state;
        return (
            <div className="SAMtracking">
                <div className="searchDiv">
                    <Row gutter={20}>
                        <Col span={12} className="ConditionCol">
                            <ConditionInput
                                ConditionInputValue={SAMNumber}
                                ConditionInputPlaceholder={SAMNumberPlaceholder}
                                ConditionInputContent={SAMNumberContent}
                                ConditionInputFun={(e) => { this.setState({ SAMNumber: e.target.value }); }}
                            />
                        </Col>
                        <Col span={12} className="ConditionCol">
                            <ConditionRegionDatePicker
                                ConditionDateSelect={(valueArr, datearr) => {
                                    this.setState({
                                        dateArr: datearr,
                                        dataValueArr: valueArr,
                                    });
                                }}
                                ConditionDateSelectContent={regionDateContent}
                                ConditionDateValueArr={dataValueArr}
                            />
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col span={12} className="ConditionCol">
                            <ConditionSelect
                                ConditionSelectValue={SAMTypeValue}
                                ConditionSelectArr={SAMTypeArr}
                                ConditionSelectContent={SAMTypeContent}
                                ConditionSelectFun={(value) => {
                                // console.log('SAM卡类型：', value);
                                    this.setState({ SAMTypeValue: value });
                                }
                                }
                            />
                        </Col>
                        <Col span={12} className="ConditionCol">
                            <ConditionSelect
                                ConditionSelectValue={actionStatusValue}
                                ConditionSelectArr={SAMStatusArr}
                                ConditionSelectContent={SAMStatusContent}
                                ConditionSelectFun={(value) => { this.setState({ actionStatusValue: value }); }}
                            />
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col span={12} className="ConditionCol">
                            <ConditionInput
                                ConditionInputValue={bindingDevice}
                                ConditionInputPlaceholder={bindingDevicePlaceholder}
                                ConditionInputContent={bindingDeviceContent}
                                ConditionInputFun={(e) => { this.setState({ bindingDevice: e.target.value }); }}
                            />
                        </Col>
                        <Col span={12} className="ConditionCol" />
                    </Row>
                    <Row>
                        <Col span={16} />
                        <Col span={4} className="searchButtomCol ConditionCol">
                            <Button type="primary">导入已绑定SAM卡数据</Button>
                        </Col>
                        <Col span={2} className="searchButtomCol ConditionCol">
                            <Button type="primary" onClick={this.search}>查询</Button>
                        </Col>
                        <Col span={2} className="searchButtomCol ConditionCol">
                            <Button type="primary" onClick={this.reset}>重置</Button>
                        </Col>
                    </Row>
                </div>

            </div>
        );
    }
}
