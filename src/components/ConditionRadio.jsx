import React from 'react';
import { Radio, Checkbox } from 'antd';
import './css/components.css';
/** ConditionRadio
 * ConditionRadioContent:复选框的汉语文字
 * ConditionRadioType：Radio的内容
 * ConditionRadioFun：选择的方法
 * 返回父组件值：e，父组件通过e.target.value获取（0/1）
 */

export default class ConditionRadio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: true,
        };
    }

    componentWillMount() {
        //      console.log(this.props)；
    }

    componentDidMount() {

    }

    render() {
        const RadioGroup = Radio.Group;
        const { ConditionRadioContent, ConditionRadioType } = this.props;
        const { disabled } = this.state;
        return (
            <div>
                <div className="ConditionRadio_mormal">
                    <Checkbox className="ConditionRadio_che" onChange={(e) => { this.setState({ disabled: !e.target.checked }); }}>{ConditionRadioContent}</Checkbox>
                    <RadioGroup
                        onChange={(e) => {
                            const { ConditionRadioFun } = this.props;
                            ConditionRadioFun(e);
                        }}
                        value={ConditionRadioType}
                        disabled={disabled}
                        style={{ paddingTop: '8px', marginLeft: '-50px' }}
                    >
                        <Radio value={1}>是</Radio>
                        <Radio value={0}>否</Radio>
                    </RadioGroup>
                </div>
            </div>
        );
    }
}
