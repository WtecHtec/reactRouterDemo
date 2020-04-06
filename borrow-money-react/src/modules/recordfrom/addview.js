import React from 'react';
import { List, TextareaItem,Button, InputItem, WhiteSpace,NavBar, Icon } from 'antd-mobile';
import { createForm } from 'rc-form';
// import Share from 'social-share-react'
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
                    <InputItem {...getFieldProps('money', {
                        rules: emailRules,
                    })} clear={true} placeholder="金额" style={{ height:50}}> 金额 </InputItem>
                </List>
                <label className={'error-lable'}> { (  getFieldError('email')) ? getFieldError('email').join(',') :  '' }  </label>
                <WhiteSpace/>
                <List >
                    <TextareaItem
                        title="备注"
                        placeholder="备注说明"
                        data-seed="logId"
                        {...getFieldProps('desc')}
                        autoHeight
                    />
                </List>
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
        this.setState({
            addstatus: true
        })

    }
    copyHerf= ()=>{
        console.log(window.location.href.split('#'))
        let herf  = window.location.href.split('#')[0] + '#/fillView'
        if(copy(herf)){
            console.log("复制成功");
        }else{
            console.log("复制失败")
        }
    }
}
export default  createForm()(addview)