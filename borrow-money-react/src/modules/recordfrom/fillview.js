import React from 'react';
import Recordheader from './recordheader'
import { DatePicker, List, Button, WhiteSpace,Checkbox , Toast} from 'antd-mobile';
import { createForm } from 'rc-form';
import { getRecordInfo, updateRecord } from './api';
const CheckboxItem = Checkbox.CheckboxItem;
// const AgreeItem = Checkbox.AgreeItem;
class fillview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            recordId: '',
            minDate:new Date(new Date().getTime()+ 2*24*60*60*1000),
            recordData:{
                repayDate: '',
            }
        }
    }
    
    componentWillMount(){
        // console.log('recordId:', window.location, ))
        this.state.recordId = this.GetQueryString('recordId')
        this.getRecordInfoById()
    }

    getRecordInfoById(){
        getRecordInfo( this.state.recordId ).then(res=>{
            console.log('getRecordInfoById',res)
            let data = res.data
            if(data.statusCode === 201) {
                Toast.fail( '暂无数据', 1);
                this.props.history.push(  {pathname:"/login",state : { name : '提交成功' }})
            } else {
                this.setState({
                    recordData: data.responseData
                })
            }
        })
    }
  
    GetQueryString(name) {
        var rs = new RegExp("(^|)" + name + "=([^&]*)(&|$)", "gi").exec(window.location.href), tmp;
        if (tmp = rs) {
            return decodeURI(tmp[2]);
        }
        // parameter cannot be found
        return "";
    }

    addData=()=>{
        this.props.form.validateFields((error, value) => {
            console.log(error, value)
            if(!error){
                let  month =  value.repaytimeStr.getMonth() + 1
                let repaytimeStr  = value.repaytimeStr.getFullYear() + '-' + ( month > 10? month: '0'+month) + '-' +  value.repaytimeStr.getDate() 
            
                let param = {
                    recordid: this.state.recordId,
                    status: '1',
                    repaytimeStr: repaytimeStr
                }
                updateRecord(param).then(res=>{
                    let data = res.data
                    if(data.statusCode ===200) {
                        Toast.success( '提交成功', 4);
                        this.props.history.push(  {pathname:"/login",state : { name : '提交成功' }})
                    }
                })
            }
        })
    }
    sureValidator =  (rule, value, callback) => {
        if (value && value === true) {
          callback();
        } else {
          callback(new Error('请完成填写'));
        }
      }

    render() {
        const { getFieldProps, getFieldError } = this.props.form;
        return(
            <div style={{ height:'100%',width:'100%'}}>
             <Recordheader recordData={ this.state.recordData}></Recordheader>
                <WhiteSpace></WhiteSpace>
                <DatePicker mode={'date'} minDate={ this.state.minDate }
                    {...getFieldProps('repaytimeStr', {
                        rules: [
                            { required: true, message: '请完成日期填写' },
                        ],
                    })}
                >
                    <List.Item arrow="horizontal">还款日期</List.Item>
                </DatePicker>
                <label className={'error-lable'}> { (  getFieldError('repaytimeStr')) ? getFieldError('repaytimeStr').join(',') :  '' }  </label>
                <WhiteSpace></WhiteSpace>
                <List >
                    <CheckboxItem key="disabled" data-seed="logId"   multipleLine 
                       {...getFieldProps('sure', {
                        rules: [
                            {validator: this.sureValidator}
                        ],
                    })} >
                        同意
                        <List.Item.Brief>
                            <span> It's not hard to borrow and borrow again </span>
                        </List.Item.Brief>
                    </CheckboxItem>
                    <label className={'error-lable'}> { (  getFieldError('sure')) ? getFieldError('sure').join(',') :  '' }  </label>
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