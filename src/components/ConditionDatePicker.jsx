import React from 'react';
import { Checkbox, DatePicker } from 'antd';
import './css/components.css';
/** ConditionDatePicker
 * dateSelectContent复选框汉语文字
 * dateSelect:选择日期的方法
 * 返回父组件的值：dateString：时间数组，String类型
*/

export default class ConditionDatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: true,
        };
    }

    componentWillMount() {
    // console.log(this.props);
    }

    componentDidMount() {}

    onOk(value) {}

    render() {
        const { dateSelectContent } = this.props;
        const { disabled } = this.state;
        return (
            <div>
                <div className="ConditionDatePicker_mormal">
                    <Checkbox
                        className="ConditionDatePicker_che"
                        onChange={(e) => { this.setState({ disabled: !e.target.checked }); }}
                    >
                        {dateSelectContent}
                    </Checkbox>
                    <DatePicker
                        style={{ width: '100%', marginLeft: '-12px', marginRight: '-8px' }}
                        disabled={disabled}
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="请选择时间"
                        onChange={(value, dateString) => {
                            const { dateSelect } = this.props;
                            dateSelect(dateString);
                        }
                        }
                        onOk={this.onOk}
                    />
                </div>
            </div>
        );
    }
}
