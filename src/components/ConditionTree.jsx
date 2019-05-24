import React from 'react';
import { Tree } from 'antd';
import './css/components.css';

/** ConditionTree
 * ConditiontreeData:被遍历的数组：Tree类型
 * ConditionchectedKeys：复选框个选中的数组的key组成的数组，String类型
 * ConditionselectedKeys：点击每一项选择的数组的key组成的数组，String类型
 * ConditionexpandedKeys：展开的项：数组形式，String类型
 * ConditionautoExpandParent：默认展开的父节点，可以不用传
 * ConditionTreeExpand：展开节点的方法
 * ConditionTreeCheck：点击复选框的方法
 * ConditionTreeSelect：点击每一项选择的方法
 * 返回父组件的值：以上3种方法都会返回一个数组，String类型
 */
const { TreeNode } = Tree;
export default class ConditionTree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount() {
        // console.log(this.props);
    }

    componentDidMount() {}

    //  渲染TreeNodes
    renderTreeNodes(data) {
        return data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} />;
        });
    }

    render() {
        const {
            ConditiontreeData, ConditionchectedKeys, ConditionselectedKeys, ConditionexpandedKeys, ConditionautoExpandParent,
        } = this.props;
        return (
            <div>
                <div>
                    <div className="ConditionTree_treeTitle">选择网络拓扑结构</div>
                    <Tree
                        checkable
                        onExpand={(keys) => {
                            const { ConditionTreeExpand } = this.props;
                            ConditionTreeExpand(keys);
                        }}
                        expandedKeys={ConditionexpandedKeys}
                        autoExpandParent={ConditionautoExpandParent}
                        onCheck={(ConditioncheckedKeys) => {
                            const { ConditionTreeCheck } = this.props;
                            ConditionTreeCheck(ConditioncheckedKeys);
                        }}
                        chectedKeys={ConditionchectedKeys}
                        onSelect={(selectedKeys, info) => {
                            const { ConditionTreeSelect } = this.props;
                            ConditionTreeSelect(selectedKeys, info);
                        }}
                        selectedKeys={ConditionselectedKeys}
                    >
                        {this.renderTreeNodes(ConditiontreeData)}
                    </Tree>
                </div>
            </div>
        );
    }
}
