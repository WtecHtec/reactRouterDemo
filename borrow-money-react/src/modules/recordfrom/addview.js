import React from 'react';
import { List, TextareaItem,Button, InputItem, WhiteSpace,NavBar, Icon ,Toast} from 'antd-mobile';
import { createForm } from 'rc-form';
// import Share from 'social-share-react'
import { createRecord } from './api'
import copy from 'copy-to-clipboard';
class addview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            addstatus: false
        }
    }

    render() {

        const { getFieldProps ,getFieldError } = this.props.form;
        let emailRules = [
            {
                validator(rule, value, callback, source, options) {
                    console.log(' emailRules value')
                    var errors = [];
                    if (!value){
                        errors.push(new  Error('*请输入邮箱'))
                        return  errors
                    }
                    let  req = /^\w+@[a-z0-9]+\.[a-z]{2,4}$/
                    if (!req.test(value)) {
                        errors.push(new  Error('*请输入正确的邮箱格式'))
                    }
                    return errors;
                }
            }
        ]
        let btn  = this.changeBtn()
        return (

            <div style={{height:'100%',width:'100%'}}>
                <NavBar
                    style={{   position: 'fixed',width:'100%',zIndex:1}}
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() =>{console.log('onLeftClick'); this.props.history.goBack();} }>创建</NavBar>
                
                <List   style={{   paddingTop:'45px',width:'100%'}}>
                    <InputItem {...getFieldProps('email', {
                        rules: emailRules,
                    })} clear={true} placeholder="信息将会此邮箱提醒" style={{ height:50}}> 对方邮箱 </InputItem>
                </List>
                <label className={'error-lable'}> { (  getFieldError('email')) ? getFieldError('email').join(',') :  '' }  </label>
                <WhiteSpace/>
                <List >
                    <TextareaItem
                        title="对方名字"
                        placeholder="对方名字"
                        data-seed="logId"
                        {...getFieldProps('payeename',{
                            rules: [
                                { required: true, message: '请输入对方名字' },
                            ],
                        })}
                        autoHeight
                    />
                </List>
                <label className={'error-lable'}> { (  getFieldError('payeename')) ? getFieldError('payeename').join(',') :  '' }  </label>
                <WhiteSpace/>
                <List >
                    <InputItem {...getFieldProps('money', {
                         rules: [
                            { required: true, message: '请输入金额' },
                        ],
                    })} clear={true} placeholder="金额" style={{ height:50}}  type='number'> 金额 </InputItem>
                </List>
                <label className={'error-lable'}> { (  getFieldError('money')) ? getFieldError('money').join(',') :  '' }  </label>
                <WhiteSpace/>
              
                <div style={ { textAlign:'center'}}>
                    {  this.changeBtn() }
                    {/*<Share*/}
                        {/*url='https://www.baidu.com'*/}
                        {/*title='分享生活点滴'*/}
                    {/*disabled={['google', 'facebook', 'twitter']}*/}
                    {/*></Share>*/}

                </div>
            </div>
        )
    }
    changeBtn =()=>{
        if (!this.state.addstatus) {
            return  ( <Button type="primary"  onClick={()=>{ this.addData() }}  inline style={{ marginRight: '4px' }}>创建</Button>)
        } else {
            return  ( <Button type="primary"  onClick={()=>{ this.copyHerf() }}  inline style={{ marginRight: '4px' }}>复制链接</Button>)
        }
    }
    addData= ()=>{
       
        this.props.form.validateFields((error, value) => {
            console.log(error, value)
            if(!error) {
                let params = {
                    userid: this.$cookies.load('userId'),
                    payeename:value.payeename,
                    payeeemail:value.email,
                    money: value.money
                }
                createRecord(params).then(res=>{
                    console.log('createRecord:', res)
                    let data = res.data
                    if(data.statusCode ===200) {
                        Toast.success( '创建成功', 4);
                        this.setState({
                            addstatus: true,
                            recordId: data.responseData
                        })
                    }
                })
            }
        })
       

    }

  
    copyHerf= ()=>{
        console.log(window.location.href.split('#'))
        let herf  = window.location.href.split('#')[0] + '#/fillView?recordId=' + this.state.recordId
        if(copy(herf)){
            console.log("复制成功");
        }else{
            console.log("复制失败")
        }
    }
}
export default  createForm()(addview)