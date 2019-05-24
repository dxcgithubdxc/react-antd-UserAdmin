import React from 'react';
import {
    Row, Col, Input, Tree,
} from 'antd';

const { TreeNode } = Tree;
const Search = Input.Search;
export default class TreePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            treeData: [],
            expandedKeys: [],
            autoExpandParent: true,
            checkedKeys: [],
            selectedKeys: [],
            searchValue: '', // 搜索的值
            dataList: [], // 单列的树节点
        };
    }

    componentWillMount() {
        // console.log(this.props);
        const content = this;
        const treeData = [{
            title: '0-0',
            id: '0-0',
            children: [{
                title: '0-0-0',
                id: '0-0-0',
                children: [
                    { title: '0-0-0-0', id: '0-0-0-0' },
                    { title: '0-0-0-1', id: '0-0-0-1' },
                    { title: '0-0-0-2', id: '0-0-0-2' },
                ],
            }, {
                title: '0-0-1',
                id: '0-0-1',
                children: [
                    { title: '0-0-1-0', id: '0-0-1-0' },
                    { title: '0-0-1-1', id: '0-0-1-1' },
                    { title: '0-0-1-2', id: '0-0-1-2' },
                ],
            }, {
                title: '0-0-2',
                id: '0-0-2',
                children: [],
            }],
        }, {
            title: '0-1',
            id: '0-1',
            children: [
                { title: '0-1-0-0', id: '0-1-0-0', children: [] },
                { title: '0-1-0-1', id: '0-1-0-1', children: [] },
                { title: '0-1-0-2', id: '0-1-0-2', children: [] },
            ],
        }, {
            title: '0-2',
            id: '0-2',
            children: [],
        }];
        // 打破树结构，把所有的树节点单列出来。
        const dataList = [];
        function generateList(data) {
            for (let i = 0; i < data.length; i++) {
                const node = data[i];
                const id = node.id;
                dataList.push({ id, title: id });
                if (node.children) {
                    generateList(node.children);
                }
            }
        }
        generateList(treeData);
        console.log(dataList);
        const arr = [];
        dataList.forEach((item) => { arr.push(item.id); });
        this.setState({ treeData, dataList, expandedKeys: arr });
    }

    filterTreeData(data) {
        const tree = JSON.parse(JSON.stringify(data));
        tree.forEach((item) => {
            const node = item;
            if (node.children && node.children.length === 0) {
                delete node.children;
            }
            else if (node.children && node.children.length !== 0) {
                this.filterTreeData(node.children);
            }
        });
        return tree;
    }

    componentDidMount() {
        const treeData = [{
            title: '0-0',
            id: '0-0',
            children: [{
                title: '0-0-0',
                id: '0-0-0',
                children: [
                    { title: '0-0-0-0', id: '0-0-0-0' },
                    { title: '0-0-0-1', id: '0-0-0-1' },
                    { title: '0-0-0-2', id: '0-0-0-2' },
                ],
            }, {
                title: '0-0-1',
                id: '0-0-1',
                children: [
                    { title: '0-0-1-0', id: '0-0-1-0' },
                    { title: '0-0-1-1', id: '0-0-1-1' },
                    { title: '0-0-1-2', id: '0-0-1-2' },
                ],
            }, {
                title: '0-0-2',
                id: '0-0-2',
                children: [],
            }],
        }, {
            title: '0-1',
            id: '0-1',
            children: [
                { title: '0-1-0-0', id: '0-1-0-0', children: [] },
                { title: '0-1-0-1', id: '0-1-0-1', children: [] },
                { title: '0-1-0-2', id: '0-1-0-2', children: [] },
            ],
        }, {
            title: '0-2',
            id: '0-2',
            children: [],
        }];

        const filterData = this.filterTreeData(treeData);

        const a = 1;
        let b = a;
        b = 2;
        const obj1 = { a: 1 };
        const obj2 = { ...obj1 };
        obj1.a = 2;

        const arr = [1, 2, 3];
        let copy = [...arr];
        copy = [0, 0, 0];
    }

    // 搜索树节点
    onSearchTree(e) {
        const value = e.target.value;
        const { treeData, dataList } = this.state;
        const keys = dataList.map((item) => {
            if (item.title.indexOf(value) > -1) {
                return this.getParentKey(item.id, treeData);
            }
            return null;
        }).filter((item, i, self) => item && self.indexOf(item) === i);
        console.log('parentKey', keys);
        this.setState({
            expandedKeys: keys,
            searchValue: value,
            autoExpandParent: true,
        });
    }

    // 获取父节点
    getParentKey(id, tree) {
        let parentKey;
        for (let i = 0; i < tree.length; i++) {
            const node = tree[i];
            if (node.children) {
                if (node.children.some(item => item.id === id)) {
                    parentKey = node.id;
                }
                else if (this.getParentKey(id, node.children)) {
                    parentKey = this.getParentKey(id, node.children);
                }
            }
        }
        return parentKey;
    }

    onExpand(keys) {
        // console.log('onExpand', keys);
        this.setState({
            expandedKeys: keys,
            autoExpandParent: false,
        });
    }

    onCheck(keys) {
        // console.log('onCheck', keys);
        this.setState({ checkedKeys: keys });
    }

    onSelect(keys, info) {
        // console.log('onSelect', keys);
        this.setState({ selectedKeys: keys });
    }

    renderTreeNodes(data) {
        const { searchValue } = this.state;
        return data.map((item) => {
            const index = item.title.indexOf(searchValue);
            const beforeStr = item.title.substr(0, index);
            const afterStr = item.title.substr(index + searchValue.length);
            const title = index > -1 ? (
                <span>
                    {beforeStr}
                    <span style={{ color: '#f50' }}>{searchValue}</span>
                    {afterStr}
                </span>
            ) : <span>{item.title}</span>;
            if (item.children) {
                return (
                    <TreeNode key={item.id} title={title}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.id} title={title} />;
        });
    }

    render() {
        const {
            treeData,
            expandedKeys,
            checkedKeys,
            selectedKeys,
            autoExpandParent,
        } = this.state;
        return (
            <div className="asd">
                <style>
                    {`
                .searchDiv{ border-bottom: 1px solid #CCCCCC;margin-bottom: 10px;margin-top: -10px;}
                .ConditionCol{padding: 10px 0;}
                `}
                </style>
                <div className="searchDiv">
                    <Row gutter={16}>
                        <Col span={4} className="ConditionCol">
                            <Search style={{ height: 32, marginBottom: 8 }} placeholder="搜索成员" onChange={(e) => { this.onSearchTree(e); }} />
                            <Tree
                                checkable
                                onExpand={(keys) => { this.onExpand(keys); }}
                                expandedKeys={expandedKeys}
                                autoExpandParent={autoExpandParent}
                                onCheck={(keys) => { this.onCheck(keys); }}
                                checkedKeys={checkedKeys}
                                onSelect={(keys) => { this.onSelect(keys); }}
                                selectedKeys={selectedKeys}
                            >
                                {this.renderTreeNodes(treeData)}
                            </Tree>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}
