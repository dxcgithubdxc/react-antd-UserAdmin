import React from 'react';
import { Checkbox, Select } from 'antd';
import './css/components.css';

/** ConditionMultipleSelect
 * ConditionMultipleSelectContent：复选框框的汉语文字
 * ConditionMultipleSelectArr：选择的数组:对象数组的形式（[{},{}]）
 * ConditionMultipleSelectValue：多选框的内容
 * ConditionMultipleSelectFun：选择的方法
 * 返回父组件的值：value：对象数组
 * */
export default class ConditionMultipleSelect extends React.Component {
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

    render() {
        const {
            ConditionMultipleSelectContent, ConditionMultipleSelectPlaceholder, ConditionMultipleSelectArr, ConditionMultipleSelectValue,
        } = this.props;
        const { disabled } = this.state;
        const { Option } = Select;
        return (
            <div>
                <div className="ConditionMultipleSelect_mormal">
                    <Checkbox
                        className="ConditionMultipleSelect_che"
                        onChange={(e) => { this.setState({ disabled: !e.target.checked }); }}
                    >
                        {ConditionMultipleSelectContent}
                    </Checkbox>
                    <Select
                        mode="multiple"
                        className="ConditionMultipleSelect_item"
                        labelInValue
                        placeholder={ConditionMultipleSelectPlaceholder}
                        value={ConditionMultipleSelectValue}
                        onChange={(value) => {
                            const { ConditionMultipleSelectFun } = this.props;
                            ConditionMultipleSelectFun(value);
                        }}
                        disabled={disabled}
                    >
                        {ConditionMultipleSelectArr.map((item, index) => (
                            <Option value={item.key} key={item.key}>{item.label}</Option>
                        ))}
                    </Select>
                </div>
            </div>
        );
    }
}
