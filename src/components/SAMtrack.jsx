import {
    Button, Col, Input, message, Modal, Row, Select, Table, Upload,
} from 'antd';
import React from 'react';
import ConditionInput from './ConditionInput';
import ConditionRegionDatePicker from './ConditionRegionDatePicker';
import ConditionSelect from './ConditionSelect';

export default class SAMtrack extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SAMtrackingArr: [], // SAM卡列表
            columsArr: [],
            SAMNumber: '', // 物理卡号
            SAMNumberContent: 'SAM物理卡号[HEX]',
            SAMNumberPlaceholder: '请输入SAM物理卡号',
            SAMTypeContent: 'SAM卡类型',
            SAMTypeArr: [{ // SAM卡类型表
                label: 'PSAM卡',
                key: 0,
            },
            {
                label: 'ISAM卡',
                key: 1,
            },
            ],
            actionTypeContent: '操作类型',
            SAMTypeValue: {
                key: 0,
                label: 'PSAM卡',
            }, // SAM卡Obj
            actionTypeArr: [{ // 操作类型表
                label: '登记',
                key: 0,
            },
            {
                label: '领用',
                key: 1,
            },
            {
                label: '退还',
                key: 2,
            },
            {
                label: '注销',
                key: 3,
            },
            ],
            actionTypeValue: {
                key: 0,
                label: '登记',
            }, // 操作类型Obj

            regionDateContent: '操作起止日期',
            dateArr: [], // 起止日期
            dataValueArr: [],
            modalVisible: false, // modal对话框
            salesman: '', // 业务员
            remark: '', // 备注
            fileList: [],
        };
    }

    componentWillMount() {
        // console.log(this.props);
    }

    componentDidMount() {
        const columsArr = [
            {
                title: 'SAM物理卡号', className: 'tableTh', dataIndex: 'SAMNumber', align: 'center', render: (text, record) => (<span>{record.SAMNumber}</span>),
            },
            {
                title: 'SAM卡类型', className: 'tableTh', dataIndex: 'SAMType', align: 'center', render: (text, record) => (<span>{record.SAMType === 0 ? 'PSAM卡' : 'ISAM卡'}</span>),
            },
            {
                title: '操作时间', className: 'tableTh', dataIndex: 'actionDateStr', align: 'center', render: (text, record) => (<span>{record.actionDateStr}</span>),
            },
            {
                title: '业务员', className: 'tableTh', dataIndex: 'salesman', align: 'center', render: (text, record) => (<span>{record.salesman}</span>),
            },
            {
                title: '操作类型',
                dataIndex: 'actionType',
                className: 'tableTh',
                align: 'center',
                render: (text, record) => {
                    let str = '';
                    if (record.actionType === 0) { str = '登记'; }
                    else if (record.actionType === 1) { str = '领用'; }
                    else if (record.actionType === 2) { str = '退还'; }
                    else if (record.actionType === 3) { str = '注销'; }
                    return (<span>{str}</span>);
                },
            },
            {
                title: 'SAM卡状态',
                dataIndex: 'SAMstatus',
                align: 'center',
                className: 'tableTh',
                render: (text, record) => {
                    let str = '';
                    if (record.SAMstatus === 0) { str = '已发行'; }
                    else if (record.SAMstatus === 1) { str = '已领用'; }
                    else if (record.SAMstatus === 2) { str = '已启用'; }
                    else if (record.SAMstatus === 3) { str = '已退回'; }
                    else if (record.SAMstatus === 3) { str = '已注销'; }
                    return (<span>{str}</span>);
                },
            },
            {
                title: '操作人员名称/编号', className: 'tableTh', dataIndex: 'operateType', align: 'center', render: (text, record) => (<span>{record.operateType}</span>),
            },
            {
                title: '备注', className: 'tableTh', dataIndex: 'remark', align: 'center', render: (text, record) => (<span>{record.remark}</span>),
            },
            {
                title: '操作', className: 'tableTh', dataIndex: 'action', align: 'center', render: (text, record) => (<Button type="primary" onClick={() => { this.revise(record); }}>修改</Button>),
            },
        ];
        this.setState({ columsArr });
    }

    // 跟踪登记
    followRegister() {
        this.setState({ modalVisible: true });
    }

    // 修改
    revise(record) {
        // console.log(record);
        this.setState({
            modalVisible: true,
            SAMNumber: record.SAMNumber,
            SAMTypeValue: {
                key: record.SAMType,
                label: record.SAMType === 0 ? 'PSAM卡' : 'ISAM卡',
            },
            salesman: record.salesman,
            remark: record.remark === null ? '' : record.remark,
        });
        if (record.actionType === 0) { this.setState({ actionTypeValue: { key: record.actionType, label: '登记' } }); }
        else if (record.actionType === 1) { this.setState({ actionTypeValue: { key: record.actionType, label: '领用' } }); }
        else if (record.actionType === 2) { this.setState({ actionTypeValue: { key: record.actionType, label: '退还' } }); }
        else if (record.actionType === 3) { this.setState({ actionTypeValue: { key: record.actionType, label: '注销' } }); }
    }

    // 查询
    search(SAMTypeValue, actionTypeValue, SAMNumber, dateArr) {
        // console.log('查询');
        const sbdata = {
            SAMType: SAMTypeValue.key, // SAM卡类型（Number）：0 1 2
            actionType: actionTypeValue.key, // 操作类型（Number）：0 1  2 3
            SAMNumber, // SAM物理卡号（String）
            startDateStr: dateArr[0] === undefined ? '' : dateArr[0], // 开始日期（String）
            endDateStr: dateArr[1] === undefined ? '' : dateArr[1], // 结束日期（String）
        };
        // console.log(sbdata);
    }

    // 重置查询条件
    reset() {
        this.setState({
            SAMNumber: '',
            dateArr: [],
            dataValueArr: [],
            SAMTypeValue: {
                key: 0,
                label: 'PSAM卡',
            },
            actionTypeValue: {
                key: 0,
                label: '登记',
            },

        });
    }

    // 确定登记
    handleOk() {
        // 联网
        this.setState({
            modalVisible: false,
            SAMNumber: '',
            SAMTypeValue: {
                key: 0,
                label: 'PSAM卡',
            },
            actionTypeValue: {
                key: 0,
                label: '登记',
            },
            remark: '',
            salesman: '',
        });
        message.success('确认登记成功！！');
    }

    // 取消登记
    handleCancel() {
        this.setState({
            modalVisible: false,
            SAMNumber: '',
            SAMTypeValue: {
                key: 0,
                label: 'PSAM卡',
            },
            actionTypeValue: {
                key: 0,
                label: '登记',
            },
            remark: '',
            salesman: '',
        });
    }

    render() {
        const {
            SAMtrackingArr,
            columsArr,

            SAMNumber,
            SAMNumberContent,
            SAMNumberPlaceholder,

            SAMTypeContent,
            SAMTypeArr,
            SAMTypeValue,

            actionTypeContent,
            actionTypeArr,
            actionTypeValue,

            regionDateContent,
            dateArr,
            dataValueArr,
            salesman,
            remark,
            modalVisible,
            fileList,
        } = this.state;
        const { Option } = Select;
        return (
            <div className="SAMtracking">
                <style>
                    {`
                    .tableTh{font-size:12px}
                .searchDiv{ border-bottom:1px solid #CCCCCC;margin-bottom: 10px;margin-top:-10px;}
                .ConditionCol{padding:10px 0;line-height:32px;}
                .searchButtomCol{text-align: right;}
                .SAMtrackingtableDiv{margin: 0 auto;padding:10px 0;}
                  `}
                </style>
                <div className="searchDiv">
                    <Row gutter={20}>
                        <Col span={12} className="ConditionCol">
                            <ConditionInput
                                ConditionInputValue={SAMNumber}
                                ConditionInputPlaceholder={SAMNumberPlaceholder}
                                ConditionInputContent={SAMNumberContent}
                                ConditionInputFun={(e) => {
                                    this.setState({ SAMNumber: e.target.value });
                                }

                                }
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
                                ConditionSelectFun={(value) => { this.setState({ SAMTypeValue: value }); }}
                            />
                        </Col>
                        <Col span={12} className="ConditionCol">
                            <ConditionSelect
                                ConditionSelectValue={actionTypeValue}
                                ConditionSelectArr={actionTypeArr}
                                ConditionSelectContent={actionTypeContent}
                                ConditionSelectFun={(value) => { this.setState({ actionTypeValue: value }); }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={14} />
                        <Col span={4} className="searchButtomCol ConditionCol">
                            <Upload
                                beforeUpload={(file, fieList) => {
                                    console.log('file', file);
                                    console.log('fieList', fieList);
                                }}
                                onChange={(file) => {
                                    console.log('file', file);
                                }}
                                fileList={fileList}
                            >
                                <Button>上传文件</Button>
                            </Upload>
                        </Col>
                        <Col span={2} className="searchButtomCol ConditionCol">
                            <Button type="primary" onClick={() => { this.setState({ modalVisible: true }); }}>跟踪登记</Button>
                        </Col>
                        <Col span={2} className="searchButtomCol ConditionCol">
                            <Button type="primary" onClick={() => { this.search(SAMTypeValue, actionTypeValue, SAMNumber, dateArr); }}>查询</Button>
                        </Col>
                        <Col span={2} className="searchButtomCol ConditionCol">
                            <Button type="primary" onClick={() => { this.reset(); }}>重置</Button>
                        </Col>
                    </Row>
                </div>
                <div className="SAMtrackingtableDiv">
                    <Table columns={columsArr} dataSource={SAMtrackingArr} pagination={false} />
                </div>
                {/* 登记Modal */}
                <Modal
                    closable={false}
                    title="跟踪登记"
                    okText="确认登记"
                    cancelText="取消登记"
                    visible={modalVisible}
                    onOk={() => { this.handleOk(); }}
                    onCancel={() => { this.handleCancel(); }}
                >
                    <Row>
                        <Col span={6} className="ConditionCol">SAM物理卡号</Col>
                        <Col span={18} className="ConditionCol">
                            <Input value={SAMNumber} onChange={(e) => { this.setState({ SAMNumber: e.target.value }); }} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6} className="ConditionCol">业务员</Col>
                        <Col span={18} className="ConditionCol">
                            <Input value={salesman} onChange={(e) => { this.setState({ salesman: e.target.value }); }} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6} className="ConditionCol">SAM卡类型</Col>
                        <Col span={18} className="ConditionCol">
                            <Select className="item" labelInValue value={SAMTypeValue} onChange={(value) => { this.setState({ SAMTypeValue: value }); }}>
                                {SAMTypeArr.map((item, index) => (
                                    <Option value={item.key} key={item.key}>{item.label}</Option>
                                ))}
                            </Select>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6} className="ConditionCol">操作类型</Col>
                        <Col span={18} className="ConditionCol">
                            <Select className="item" labelInValue value={actionTypeValue} onChange={(value) => { this.setState({ actionTypeValue: value }); }}>
                                {actionTypeArr.map((item, index) => (
                                    <Option value={item.key} key={item.key}>{item.label}</Option>
                                ))}
                            </Select>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6} className="ConditionCol">备注</Col>
                        <Col span={18} className="ConditionCol">
                            <Input value={remark} onChange={(e) => { this.setState({ remark: e.target.value }); }} />
                        </Col>
                    </Row>
                </Modal>
                {/* 登记Modal */}
            </div>
        );
    }
}
