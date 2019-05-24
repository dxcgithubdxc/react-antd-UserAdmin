import React from 'react';
import { Checkbox, DatePicker } from 'antd';
import './css/components.css';
/** ConditionRegionDatePicker
 * ConditionDateSelectContent:复选框汉语文字
 * ConditionDateValueArr：moment类型的时间数组（传空数组[]）
 * ConditionDateSelect：选择的方法
 * 返回父组件值：value：时间数组：moment类型, dateArr：时间数组，String类型
 */
export default class ConditionRegionDatePicker extends React.Component {
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

    onOk(value) {
        //      console.log('onOk: ', value);
    }

    render() {
        const { RangePicker } = DatePicker;
        const { ConditionDateSelectContent, ConditionDateValueArr } = this.props;
        const { disabled } = this.state;
        return (
            <div>
                <div className="ConditionRegionDatePicker_mormal">
                    <Checkbox className="ConditionRegionDatePicker_che" onChange={(e) => { this.setState({ disabled: !e.target.checked }); }}>{ConditionDateSelectContent}</Checkbox>
                    <RangePicker
                        style={{ width: '100%', marginLeft: '-12px', marginRight: '-8px' }}
                        disabled={disabled}
                        value={ConditionDateValueArr}
                        showTime={{ format: 'HH:mm' }}
                        format="YYYY-MM-DD HH:mm"
                        placeholder={['开始时间', '结束时间']}
                        onChange={(value, dateArr) => {
                            const { ConditionDateSelect } = this.props;
                            //  console.log('Selected Time: ', value);
                            //  console.log('Formatted Selected Time: ', dateArr);
                            ConditionDateSelect(value, dateArr);
                        }
                        }
                        onOk={this.onOk}
                    />
                </div>
            </div>
        );
    }
}
