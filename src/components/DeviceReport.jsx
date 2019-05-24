
import {
    Button, Col, Row, Table,
} from 'antd';
import React from 'react';
import ConditionInput from './ConditionInput';
import ConditionRegionDatePicker from './ConditionRegionDatePicker';
import ConditionSelect from './ConditionSelect';
import ConditionTree from './ConditionTree';
import * as formatData from '../utils/formatData';

export default class DeviceReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            DeviceArr: [], // 设备列表
            columsArr: [],
            SAMNumber: '', // SAM卡号
            SAMNumberContent: 'SAM物理卡号',
            SAMNumberPlaceholder: '请输入SAM物理卡号',
            MatchTypeContent: '匹配状态',
            MatchTypeArr: [{ // 匹配状态表
                label: '正常',
                key: 1,
            },
            {
                label: '异常',
                key: 0,
            },
            ],
            MatchTypeValue: {
                key: 1,
                label: '正常',
            },
            regionDateContent: '上传起止日期',
            dateArr: [], // 起止日期
            dataValueArr: [],
            // TtreeData
            expandedKeys: [],
            autoExpandParent: true,
            checkedKeys: [],
            selectedKeys: [],
            treeData: [], // 设备网络拓扑结构
        };
    }

    componentWillMount() {
        const content = this;
    }

    componentDidMount() {
        const columsArr = [
            {
                title: 'SAM物理卡号', dataIndex: 'SAMNumber', align: 'center', render: (text, record) => (<span>{record.SAMNumber}</span>),
            },
        ];
        //  this.setState({ columsArr });
    }


    // 查询
    search(MatchTypeValue, SAMNumber, dateArr) {
        const sbdata = {
            MatchType: MatchTypeValue.key, // 匹配状态（Number）：0 1
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
            MatchTypeValue: {
                key: 1,
                label: '正常',
            },

        });
    }

    render() {
        const {
            DeviceArr,
            columsArr,

            SAMNumber,
            SAMNumberContent,
            SAMNumberPlaceholder,

            MatchTypeContent,
            MatchTypeArr,
            MatchTypeValue,
            dateArr,
            dataValueArr,
            regionDateContent,
            treeData,
            expandedKeys,
            autoExpandParent,
            checkedKeys,
            selectedKeys,
        } = this.state;
        return (
            <div className="Device">
                <style>
                    {`
            .searchDiv{ border-bottom:1px solid #CCCCCC;margin-bottom: 10px;margin-top:-10px;}
            .ConditionCol{padding:10px 0;}
            .searchButtomCol{text-align: right;}
            .DevicetableDiv{margin: 0 auto;padding:10px 0;}
            `}
                </style>
                <Row>
                    <Col span={4}>
                        <div style={{
                            height: '100%', border: '1px solid #ccc', padding: '10px', marginRight: '5px', overflow: 'scroll',
                        }}
                        >
                            <ConditionTree
                                ConditiontreeData={treeData}
                                ConditionexpandedKeys={expandedKeys}
                                ConditionautoExpandParent={autoExpandParent}
                                ConditionselectedKeys={selectedKeys}
                                ConditionchectedKeys={checkedKeys}
                                ConditionTreeCheck={(keys) => {
                                    // console.log('onCheck', keys);
                                    this.setState({ checkedKeys: keys });
                                }}
                                ConditionTreeExpand={(keys) => {
                                    // console.log('onExpand:', keys)
                                    this.setState({
                                        expandedKeys: keys,
                                        autoExpandParent: false,
                                    });
                                }}
                                ConditionTreeSelect={(keys, info) => {
                                    // // console.log('onSelect', info);
                                    this.setState({ selectedKeys: keys });
                                }}
                            />
                        </div>
                    </Col>
                    <Col span={20}>
                        <div style={{
                            height: '100%', border: '1px solid #ccc', padding: '10px', marginLeft: '5px',
                        }}
                        >
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
                                        <ConditionSelect
                                            ConditionSelectValue={MatchTypeValue}
                                            ConditionSelectArr={MatchTypeArr}
                                            ConditionSelectContent={MatchTypeContent}
                                            ConditionSelectFun={(value) => { this.setState({ MatchTypeValue: value }); }}
                                        />
                                    </Col>
                                </Row>

                                <Row gutter={20}>
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
                                    <Col span={12} className="ConditionCol" />
                                </Row>

                                <Row>
                                    <Col span={20} />
                                    <Col span={2} className="searchButtomCol ConditionCol">
                                        <Button type="primary" onClick={() => { this.search(MatchTypeValue, SAMNumber, dateArr); }}>查询</Button>
                                    </Col>
                                    <Col span={2} className="searchButtomCol ConditionCol">
                                        <Button type="primary" onClick={() => { this.reset(); }}>重置</Button>
                                    </Col>
                                </Row>
                            </div>
                            <div className="DevicetableDiv"><Table columns={columsArr} dataSource={DeviceArr} pagination={false} /></div>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
