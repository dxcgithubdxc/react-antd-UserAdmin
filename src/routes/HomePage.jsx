import React from 'react';
import {
    Row, Col, Tree, Table, Button, Modal, Input, Icon,
} from 'antd';
import { Resizable } from 'react-resizable';
import Highlighter from 'react-highlight-words';
import _ from 'lodash';

const resizeableTitle = (props) => {
    const { onResize, width, ...restProps } = props;

    if (!width) {
        return <th {...restProps} />;
    }
    return (
        <Resizable width={width} height={0} onResize={onResize}>
            <th {...restProps} />
        </Resizable>
    );
};

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableLoading: true,
            name: '',
            age: 0,
            address: '',
            Email: '',
            dataSource: [],
            columnsArr: [],
            selectedRowKeys: [],
            expandedRowKeys: [],
            modalVisible: false,
            searchText: '',
        };
    }

    componentWillMount() {
        const dataSource = [
            {
                key: '1',
                orderNmber: '1',
                name: '胡彦斌',
                Email: 'huyanbin@example.com',
                deployNameList: ['成都1号线', '成都3号线', '成都4号线'],
                age: 32,
                address: '西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号',
                ifValid: true,
            }, {
                key: '2',
                orderNmber: '2',
                name: '胡彦祖',
                Email: 'wuyanzu@example.com',
                deployNameList: ['成都1号线', '成都3号线', '成都4号线', '火车北站', '454545', '6666'],
                age: 42,
                address: '西湖区湖底公园1号',
                ifValid: false,
            }, {
                key: '3',
                orderNmber: '3',
                name: 'Jim Green',
                Email: 'JimGeen@example.com',
                deployNameList: ['成都1号线', '成都3号线', '成都4号线', '火车北站', '454545', '6666'],
                age: 53,
                address: '北京市宣武区北纬路甲1号',
                ifValid: true,
            }, {
                key: '4',
                orderNmber: '4',
                name: 'Joe Black',
                Email: 'JoeBlack@example.com',
                deployNameList: ['成都1号线', '成都3号线', '成都4号线', '火车北站', '454545', '6666'],
                age: 20,
                address: 'Sidney No. 1 Lake Park',
                ifValid: false,
            }, {
                key: '5',
                orderNmber: '5',
                name: 'noémie chu',
                Email: 'noémiechu@example.com',
                deployNameList: ['成都1号线', '成都3号线', '成都4号线', '火车北站', '454545', '6666'],
                age: 10,
                address: 'Sidney No. 1 Lake Park',
                ifValid: false,
            },
            {
                key: '6',
                orderNmber: '6',
                name: '李连杰',
                Email: 'lilianjie@example.com',
                deployNameList: ['成都1号线', '成都3号线', '成都4号线', '火车北站', '454545', '6666'],
                age: 32,
                address: '李连杰热心公益慈善。2007年创建公益组织壹基金。2009年担任世界卫生组织亲善大使。2010年担任国际红十字会亲善大使。2014年在《中国慈善家》“中国慈善名人榜”中排名第二位',
                ifValid: true,
            },
            // {
            //     key: '7',
            //     orderNmber: '7',
            //     name: '成龙',
            //     Email: 'JackChen@example.com',
            //     deployNameList: ['成都1号线', '成都3号线', '成都4号线', '火车北站', '454545', '6666'],
            //     age: 42,
            //     address: '成龙，1954年4月7日出生于香港中西区，祖籍安徽省芜湖，中国香港男演员、导演、动作指导、制作人、编剧、歌手。',
            //    ifValid: true,
            // }, {
            //     key: '8',
            //     orderNmber: '8',
            //     name: 'David Beckham',
            //     Email: 'Beckham@example.com',
            //     deployNameList: ['成都1号线', '成都3号线', '成都4号线', '火车北站', '454545', '6666'],
            //     age: 53,
            //     address: '大卫·贝克汉姆（David Beckham），1975年5月2日出生于英国伦敦雷顿斯通，前英国职业足球运动员，司职中场',
            // }, {
            //     key: '9',
            //     orderNmber: '9',
            //     name: '迈克尔杰克逊',
            //     Email: 'Michael@example.com',
            //     deployNameList: ['成都1号线', '成都3号线', '成都4号线', '火车北站', '454545', '6666'],
            //     age: 20,
            //     address: 'Michael，1958年8月29日在美国印第安纳州加里市出生，美国歌手、词曲创作人、舞蹈家、表演家、慈善家、音乐家、人道主义者、和平主义者、慈善机构创办人。',
            //    ifValid: false,
            // }, {
            //     key: '10',
            //     orderNmber: '10',
            //     name: '马云',
            //     Email: 'mayun@example.com',
            //     deployNameList: ['成都1号线', '成都3号线', '成都4号线', '火车北站', '454545', '6666'],
            //     age: 10,
            //     address: '马云，男，汉族，中共党员，1964年9月10日生于浙江省杭州市，祖籍浙江省嵊州市谷来镇， 阿里巴巴集团主要创始人，现担任阿里巴巴集团董事局主席、日本软银董事、大自然保护协会中国理事会主席兼全球董事会成员、华谊兄弟董事、生命科学突破奖基金会董事、联合国数字合作高级别小组联合主席。',
            // },
            //    ifValid: true,
            // {
            //     key: '11',
            //     orderNmber: '11',
            //     name: '王健林',
            //     Email: 'wangjianlin@example.com',
            //     deployNameList: ['成都1号线', '成都3号线', '成都4号线', '火车北站', '454545', '6666'],
            //     age: 32,
            //     address: '王健林，男，1954年10月24日生于四川省广元市苍溪县，1989年起担任大连万达集团股份有限公司董事长。',
            //    ifValid: false,
            // }, {
            //     key: '12',
            //     orderNmber: '12',
            //     name: '刘强东',
            //     Email: 'liuqiangdong@example.com',
            //     deployNameList: ['成都1号线', '成都3号线', '成都4号线', '火车北站', '454545', '6666'],
            //     age: 42,
            //    ifValid: true,
            //     address: '刘强东，男，汉族，1973年3月10日生（另一说法：1974年2月14日），江苏宿迁人，祖籍湖南湘潭。京东集团董事局主席兼首席执行官，本科毕业于中国人民大学，民建会员，全国政协委员。河北省阜平县平石头村名誉村长。',
            // }, {
            //     key: '13',
            //     orderNmber: '13',
            //     name: '董明珠',
            //     Email: 'dongmingzhu@example.com',
            //     deployNameList: ['成都1号线', '成都3号线', '成都4号线', '火车北站', '454545', '6666'],
            //     age: 53,
            //    ifValid: true,
            //     address: '董明珠，出生于江苏南京，企业家，先后毕业于安徽芜湖职业技术学院、中南财经政法大学EMBA2008级、中国社会科学院经济学系研究生班、中欧国际工商学院EMBA。',
            // }, {
            //     key: '14',
            //     orderNmber: '14',
            //     name: '马化腾',
            //     Email: 'mahuateng@example.com',
            //     deployNameList: ['成都1号线', '成都3号线', '成都4号线', '火车北站', '454545', '6666'],
            //     age: 20,
            //    ifValid: false,
            //     address: '马化腾，1971年10月29日生于原广东省海南岛东方市八所港（今海南省东方市），祖籍广东省汕头市。腾讯公司主要创办人之一。现任腾讯公司董事会主席兼首席执行官；全国青联副主席；全国人大代表。',
            // }, {
            //     key: '15',
            //     orderNmber: '15',
            //     name: '王思聪',
            //     Email: 'wangsicong@example.com',
            //     deployNameList: ['成都1号线', '成都3号线', '成都4号线', '火车北站', '454545', '6666'],
            //     age: 10,
            //    ifValid: false,
            //     address: '王思聪，1988年1月3日出生于辽宁省大连市，毕业于伦敦大学学院哲学系， [1]  万达集团董事长王健林的独子，北京普思投资有限公司董事长、IG电子竞技俱乐部创始人、万达集团董事。',
            // },
        ];
        console.log(dataSource[0].deployNameList.constructor.name === 'Array');
        this.setState({ dataSource });
        const content = this;
        setTimeout(() => {
            content.setState({ tableLoading: false });
        }, 2000);
    }

    componentDidMount() {
        const columns = [{
            title: '序号',
            dataIndex: 'orderNmber',
            sorter: (a, b) => Number(a.orderNmber) - Number(b.orderNmber),
            width: 200,
        }, {
            title: '姓名',
            dataIndex: 'name',
            width: 200,
            ...this.getColumnSearchProps('name'),
        }, {
            title: '年龄',
            dataIndex: 'age',
            width: 140,
            sorter: (a, b) => a.age - b.age,
            filters: [{
                text: '32',
                value: 32,
            }, {
                text: '18',
                value: 18,
            }, {
                text: '42',
                value: 42,
            }],
            filterMultiple: false,
            onFilter: (value, record) => record.age === Number(value),
        }, {
            title: '邮箱',
            dataIndex: 'Email',
            width: 230,
            render: (text, record) => {
                const str = `${record.Email}666`;
                return (<div>{str}</div>);
            },
            onHeaderCell: (record, rowIndex) => {
                const str = `${record.Email}666`;
                return this.getColumnSearchProps('Email');
            },
        },
        {
            title: '线路/车站',
            dataIndex: 'deployNameList',
            width: 400,
            // render: (text, record) => {
            //     // deployNameList
            //     const str = _.join(record.deployNameList, ',');
            //     return (<div className="tableRemark">{str}</div>);
            // },
            ...this.getColumnSearchProps('deployNameList'),
        },
        {
            title: '住址',
            dataIndex: 'address',
            width: 400,
            render: (text, record) => <div className="tableRemark">{record.address}</div>,
            ...this.getColumnSearchProps('address'),
        },
        {
            title: '是否启用',
            dataIndex: 'ifValid: ',
            width: 100,
            render: (text, record) => <div className="tableRemark">{record.ifValid ? '是' : '否'}</div>,
            sorter: (a, b) => Number(a.ifValid) - Number(b.ifValid),
        },
        {
            // className: 'tableRemark',
            title: '操作',
            dataIndex: 'action',
            render: (text, record) => {
                const renderElement = (
                    <div className="tableRemark">
                        <span className="cationBtn cationBtn1" onClick={() => { this.see(record); }}>查看</span>
                        <span className="cationBtn" onClick={() => { this.delete(record); }}>删除</span>
                    </div>
                );
                return renderElement;
            },
        }];
        this.setState({ columnsArr: columns });
    }


    expandedRowRender(record, index, indent, expanded) {
        // console.log('record:', record, 'index:', index, 'indent:', indent, 'expanded:', expanded);
        let renderElement = null;
        renderElement = (<p style={{ margin: 0 }}>{record.address}</p>);
        return renderElement;
    }

    see(record) {
        // console.log(record);
        this.setState({
            modalVisible: true,
            name: record.name,
            age: record.age,
            Email: record.Email,
            address: record.address,
        });
    }

    handleOk() {
        return this.emptyState();
    }

    handleCancel() {
        return this.emptyState();
    }

    emptyState() {
        this.setState({
            modalVisible: false,
            name: '',
            age: 0,
            address: '',
            Email: '',
        });
    }

    delete(record) {
        Modal.confirm({
            title: '删除确认',
            content: '确认删除吗？',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                // 异步
                // return new Promise((resolve, reject) => {
                //     setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                // }).catch(() => console.log('Oops errors!'));
            },
            onCancel() {},
        });
    }

    tableChange(pagination, filters, sorter) {
        // console.log(pagination);
    }

    handleResize(index) {
        return (e, { size }) => {
            this.setState((col) => {
                const { columnsArr } = col;
                const nextColumns = [...columnsArr];
                nextColumns[index] = {
                    ...nextColumns[index],
                    width: size.width,
                };
                return { columnsArr: nextColumns };
            });
        };
    }

    getColumnSearchProps(dataIndex) {
        return ({
            filterDropdown: ({
                setSelectedKeys, selectedKeys, confirm, clearFilters,
            }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        // ref={(node) => { this.searchInput = node; }}
                        placeholder={`搜索 ${dataIndex}`}
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                        style={{ width: 188, marginBottom: 8, display: 'block' }}
                    />
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm)}
                        icon="search"
                        size="small"
                        style={{ width: 90, marginRight: 8 }}
                    >
                        <span>搜索</span>
                    </Button>
                    <Button
                        onClick={() => this.handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        <span>重置</span>
                    </Button>
                </div>
            ),
            filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
            onFilter: (value, record) => {
                let bo = null;
                if (typeof (record[dataIndex]) === 'object') {
                    const str = _.join(record[dataIndex], ',');
                    bo = str.includes(value.toLowerCase());
                }
                else {
                    bo = record[dataIndex].toString().toLowerCase().includes(value.toLowerCase());
                }
                return bo;
            },
            // onFilterDropdownVisibleChange: (visible) => {
            //     if (visible) {
            //         // setTimeout(() => this.searchInput.select());
            //     }
            // },
            render: (text, record) => {
                let textStr = null;
                if (typeof (record[dataIndex]) === 'object') {
                    textStr = _.join(record[dataIndex], ',');
                }
                else {
                    textStr = text;
                }
                const { searchText } = this.state;
                const reEl = (
                    <Highlighter
                        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                        searchWords={[searchText]}
                        autoEscape
                        textToHighlight={textStr}
                    />
                );
                return reEl;
            },
        });
    }

    handleSearch(selectedKeys, confirm) {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    }

    handleReset(clearFilters) {
        clearFilters();
        this.setState({ searchText: '' });
    }

    render() {
        const {
            name,
            age,
            address,
            dataSource,
            columnsArr,
            selectedRowKeys,
            expandedRowKeys,
            modalVisible,
            Email,
            tableLoading,
            searchText,
        } = this.state;
        // console.log('expandedRowKeys', expandedRowKeys);
        const rowSelection = {
            selectedRowKeys,
            onChange: (Keys, rows) => {
                this.setState({ selectedRowKeys: Keys });
            },
        };

        const resizeColumn = columnsArr.map((col, index) => ({
            ...col,
            onHeaderCell: column => ({
                width: column.width,
                onResize: this.handleResize(index),
            }),
        }));

        const resizeComponments = {
            header: {
                cell: resizeableTitle,
            },
        };

        return (
            <div className="asd">
                <style>
                    {` 
                   .ConditionCol{padding:10px 0;}
                   .tableRemark{
                       width:300px;
                       height:38px;
                       line-height:38px;
                       overflow: hidden; /*自动隐藏文字*/
                       text-overflow: ellipsis;/*文字隐藏后添加省略号*/
                       white-space: nowrap;/*强制不换行，不允许出现半汉字截断*/
                   }
                   .ant-pagination-item-link{padding-top:5px;}
                   .cationBtn{color: #1890ff;cursor:pointer;}
                   .cationBtn1{margin-right:10px;}
                   .addressP{line-height:20px;}
                   .react-resizable {
                    position: relative;
                  }
                  
                  .react-resizable-handle {
                    position: absolute;
                    width: 10px;
                    height: 100%;
                    bottom: 0;
                    right: -5px;
                    cursor: col-resize;
                  }
                `}
                </style>
                <h1> 表格Demo </h1>
                <Table
                    dataSource={dataSource}
                    columns={resizeColumn}
                    components={resizeComponments}
                    bordered
                    size="small"
                    title={() => (<Button type="primary" disabled={expandedRowKeys.length === 0} onClick={() => { this.setState({ expandedRowKeys: [] }); }}>收缩展的开项</Button>)}
                    rowSelection={rowSelection}
                    expandedRowKeys={expandedRowKeys}
                    onExpandedRowsChange={(expandedRows) => { this.setState({ expandedRowKeys: expandedRows }); }}
                    expandedRowRender={(record, index, indent, expanded) => this.expandedRowRender(record, index, indent, expanded)}
                    onChange={(pagination, filters, sorter) => { this.tableChange(pagination, filters, sorter); }}
                    loading={tableLoading}
                />
                <Modal
                    closable
                    okText="确认"
                    cancelText="取消"
                    title="查看"
                    visible={modalVisible}
                    onOk={() => { this.handleOk(); }}
                    onCancel={() => { this.handleCancel(); }}
                >
                    <Row>
                        <Col span={2}><p>姓名</p></Col>
                        <Col span={5}><p>{name}</p></Col>
                    </Row>
                    <Row>
                        <Col span={2}><p>年龄</p></Col>
                        <Col span={5}><p>{age}</p></Col>
                    </Row>
                    <Row>
                        <Col span={2}><p>邮箱</p></Col>
                        <Col span={10}><p>{Email}</p></Col>
                    </Row>
                    <Row>
                        <Col span={2}><p>地址</p></Col>
                        <Col span={20}><p className="addressP">{address}</p></Col>
                    </Row>
                </Modal>
            </div>
        );
    }
}
