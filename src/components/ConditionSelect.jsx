import React from 'react';
import { Checkbox, Select } from 'antd';
import './css/components.css';

/** ConditionSelect
 * ConditionSelectContent：复选框汉语文字
 * ConditionSelectArr：备选的数组，对象数组
 * ConditionSelectValue：选择的内容：Object类型
 * ConditionSelectFun：选择的方法
 * 返回父组件的值：value：Object类型
 *  */
export default class ConditionSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: true,
        };
    }

    componentWillMount() {
    //   console.log(this.props);
    }

    componentDidMount() {}

    selectChange(value) {
    //  console.log(value)
        const { ConditionSelectFun } = this.props;
        ConditionSelectFun(value);
    }

    render() {
        const { ConditionSelectContent, ConditionSelectArr, ConditionSelectValue } = this.props;
        const { disabled } = this.state;
        const { Option } = Select;
        return (
            <div>
                <div className="ConditionSelect_mormal">
                    <Checkbox
                        className="ConditionSelect_che"
                        onChange={(e) => { this.setState({ disabled: !e.target.checked }); }}
                    >
                        {ConditionSelectContent}
                    </Checkbox>
                    <Select
                        className="ConditionSelect_item"
                        labelInValue
                        value={ConditionSelectValue}
                        onChange={(value) => {
                            const { ConditionSelectFun } = this.props;
                            ConditionSelectFun(value);
                        }}
                        disabled={disabled}
                    >
                        {ConditionSelectArr.map((item, index) => (
                            <Option value={item.key} key={item.key}>{item.label}</Option>
                        ))}
                    </Select>
                </div>
            </div>
        );
    }
}
