import React from 'react';
import {
    Table,
} from 'antd';
import { Resizable } from 'react-resizable';

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

export default class TablePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            columns: [],
        };
    }

    componentWillMount() {
        // console.log(this.props);
        const dataSource = [{
            key: 0,
            date: '2018-02-11',
            amount: 120,
            type: 'income',
            note: 'transfertransfertransfertransfertransfertransfertransfertransfertransfertransfertransfertransfertransfertransfertransfertransfertransfertransfertransfertransfertransfertransfertransfer',
        }, {
            key: 1,
            date: '2018-03-11',
            amount: 243,
            type: 'income',
            note: 'transfertransfertransfertransfertransfertransfertransfertransfertransfertransfertransfertransfertransfertransfertransfertransfertransfertransfertransfertransfertransfertransfertransfer',
        }, {
            key: 2,
            date: '2018-04-11',
            amount: 98,
            type: 'income',
            note: 'transfer,transfer,transfer,transfer,transfer,transfer,transfer,transfer,transfer,transfer,transfer,transfer,transfer,transfer,transfer,transfer,transfer,transfer,transfer,transfer,transfer,',
        }];
        this.setState({ dataSource });
    }


    componentDidMount() {
        const columns = [{
            title: 'Date',
            dataIndex: 'date',
            width: 200,
        }, {
            title: 'Amount',
            dataIndex: 'amount',
            width: 200,
            sorter: (a, b) => Number(a.amount) - Number(b.amount),
        }, {
            title: 'Type',
            dataIndex: 'type',
            width: 100,
        },
        {
            title: 'Note',
            dataIndex: 'note',
            width: 300,
            render: (text, record) => (<div className="tab">{record.note}</div>),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            // width: 300,
            render: () => (
                <span>Delete</span>
            ),
        }];
        this.setState({ columns });
    }

    handleResize(index) {
        return (e, { size }) => this.setState(({ columns }) => {
            const nextColumns = [...columns];
            nextColumns[index] = {
                ...nextColumns[index],
                width: size.width,
            };
            return { columns: nextColumns };
        });
    }

    render() {
        const {
            dataSource,
            columns,
        } = this.state;

        const resizeColumn = columns.map((col, index) => ({
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
                    .aaa{color:red}
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
                  .tab{
                    width:250px;
                    height:38px;
                    line-height:38px;
                    overflow: hidden; /*自动隐藏文字*/
                    text-overflow: ellipsis;/*文字隐藏后添加省略号*/
                    white-space: nowrap;/*强制不换行，不允许出现半汉字截断*/
                  }
                `}
                </style>
                <h1> 可伸缩表格 </h1>
                <div className="aaa">123123</div>
                <Table
                    bordered
                    components={resizeComponments}
                    columns={resizeColumn}
                    dataSource={dataSource}
                />
            </div>
        );
    }
}
