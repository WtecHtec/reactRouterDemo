import React from 'react';
import './login.css';
import { Modal,Button,List, InputItem, WhiteSpace } from 'antd-mobile';
import { createForm  } from 'rc-form';
// import {  handApiLogin } from './api'
import Register from './register'
class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            modalStatus:false,
            verifyStatus: false,
            secondTime:60,
            timer: null
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
        // let verifyBtn = <Button type="ghost" size="small" inline onClick={this.hendleVerifyBut.bind()}>验证</Button>
        // if (this.state.verifyStatus) {
        //     verifyBtn = <label className={'error-lable'}> { this.state.secondTime} </label>
        // }
        return (

            <div className={'login'}>
                {/*登录页*/}
                <List >
                    <InputItem {...getFieldProps('loginParam[email]', {
                        rules: emailRules,
                    })} clear={true} placeholder="邮箱" style={{ height:50}}/>
                </List>
                  <label className={'error-lable'}> { (  getFieldError('loginParam[email]')) ? getFieldError('loginParam[email]').join(',') :  '' }  </label>
                <WhiteSpace/>
                <List>
                <InputItem clear={true}    {...getFieldProps('loginParam[pwd]', {
                    rules: [
                        { required: true, message: '*密码不能为空' }],
                })} type={'password'} placeholder="密码">
                </InputItem>
                </List>
                <label className={'error-lable'}> { (  getFieldError('loginParam[pwd]')) ? getFieldError('loginParam[pwd]').join(',') :  '' }  </label>
                <WhiteSpace/>
                <div style={ { textAlign:'center'}}>
                    <Button type="primary"  onClick={ this.handleLogin() }  inline style={{ marginRight: '4px' }}>登陆</Button>
                    <Button type="ghost" onClick={this.showModal('modalStatus')} inline style={{ marginRight: '4px' }} className="am-button-borderfix">注册</Button>
                </div>
                {/* 注册对话框 */}
                <Modal
                    visible={this.state.modalStatus}
                    transparent
                    maskClosable={false}
                    closable={true}
                    onClose={ this.closeModal('modalStatus')}
                    title="注册"
                    footer={[
                        { text: '确定', onPress: () => { this.handleRegedit('modalStatus')(); } },
                        { text: '取消', onPress: () => { this.closeModal('modalStatus')(); } }
                        ]}
                >
                    <div >
                        <Register onRef={(ref)=>{ this.register = ref}} ></Register>
                    </div>
                </Modal>

            </div>
        );
    }

    // 加载完毕
    componentDidMount(){
        this.props.history.listen(route => {
            console.log(route)
        })

    }


    //  打开对话框
    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
        this.props.form.resetFields()
    }
    // 关闭对话框
    closeModal= key => () => {
        this.setState({
            [key]: false,
        });
        this.props.form.resetFields()
        // 关闭注册组件的定时器
        if(this.register.state.timer) {
            clearInterval(this.register.state.timer)
        }
    }
    //登陆
    handleLogin = key =>()=>{

        // let pwd = this.$md5(loginParam.pwd)
        this.props.form.validateFields((error, value) => {
            // console.log(' console.log(error); ',error);
            let fieldsValue = this.props.form.getFieldsValue()
            let loginParam = fieldsValue['loginParam']
            // console.log( fieldsValue['loginParam'])
            if (!error) {
                console.log(loginParam);
                this.props.history.push(  {pathname:"/main/account",state : { name : '登陆成功' }})
            }

        });
        // handApiLogin(params).then((res)=>{
        //     console.log('login res:', res)
        // })
    }

    // 确定注册
    handleRegedit = key => ()=>{
        console.log('handleRegedit',  this.register)
        let param =  this.register.props.form.getFieldsValue()
        console.log( param)
        this.register.props.form.validateFields((error, value) => {
            console.log(error, value);
            if(!error) {
                this.closeModal('modalStatus')()
            }
        })

    }



}
;

export default  createForm()(Login);