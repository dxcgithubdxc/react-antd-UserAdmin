import React from 'react';
import { Checkbox, Input } from 'antd';
import './css/components.css';
/** ConditionInput
 * 传递参数
 * @ params ConditionInputFun:父组件取值的方法
 * ConditionInputPlaceholder：汉语文字
 * ConditionInputValue：输入框内容
 * ConditionInputContent复选框的汉语文字
 * 返回父组件值：e，父组件通过e.target.value获取（0/1）
*/

//  ConditionInputPlaceholder ConditionInputValue ConditionInputContent

export default class ConditionInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: true,
        };
    }

    componentWillMount() {
        // console.log(this.props);
    }

    componentDidMount() { }

    render() {
        const { ConditionInputContent, ConditionInputPlaceholder, ConditionInputValue } = this.props;
        const { disabled } = this.state;
        return (
            <div>
                <div className="ConditionInput_mormal">
                    <Checkbox
                        className="ConditionInput_che"
                        onChange={(e) => { this.setState({ disabled: !e.target.checked }); }}
                    >
                        {ConditionInputContent}
                    </Checkbox>
                    <Input
                        className="ConditionInput_item"
                        placeholder={ConditionInputPlaceholder}
                        value={ConditionInputValue}
                        onChange={(e) => {
                            const { ConditionInputFun } = this.props;
                            ConditionInputFun(e);
                        }
                        }
                        disabled={disabled}
                    />
                </div>
            </div>
        );
    }
}
