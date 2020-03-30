import React from 'react';
import Recordheader from './recordheader'
import { DatePicker, List, Button, WhiteSpace,Checkbox } from 'antd-mobile';
import { createForm } from 'rc-form';
const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;
class fillview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            recordData:{
                repayDate: ''
            }
        }
    }

    render() {
        const { getFieldProps, getFieldError } = this.props.form;
        return(
            <div style={{ height:'100%',width:'100%'}}>
             <Recordheader recordData={ this.state.recordData}></Recordheader>
                <WhiteSpace></WhiteSpace>
                <DatePicker mode={'date'}
                    {...getFieldProps('dp', {
                        initialValue: this.state.dpValue,
                        rules: [
                            { required: true, message: 'Must select a date' },
                            { validator: this.validateDatePicker },
                        ],
                    })}
                >
                    <List.Item arrow="horizontal">还款日期</List.Item>
                </DatePicker>
                <WhiteSpace></WhiteSpace>
                <List >
                    <CheckboxItem key="disabled" data-seed="logId"   multipleLine>
                        同意
                        <List.Item.Brief>
                            <span> It's not hard to borrow and borrow again </span>
                        </List.Item.Brief>
                    </CheckboxItem>
                </List>
                <WhiteSpace></WhiteSpace>
                <div style={ { textAlign:'center'}}>
                    <Button type="primary"  onClick={()=>{ this.addData() }}  inline style={{ marginRight: '4px' }}>提交</Button>
                </div>
            </div>
        )
    }
}
export default  createForm()(fillview)