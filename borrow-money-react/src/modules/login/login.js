import React from 'react';
import './login.css';
import { Modal,Button,List, InputItem, WhiteSpace } from 'antd-mobile';
import { createForm  } from 'rc-form';
import {  handApiLogin } from './api'
class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            modalStatus:false,
            loading: false,
            loginParma: {
                uname:'user',
                pwd:'111111'
            }
        }
    }
    render() {
        const { getFieldProps ,getFieldError } = this.props.form;
        let emailRules = [
            { required: true, message: '请输入邮箱' },
            { pattern: new RegExp(/^[0-9a-zA-Z_]{1,}$/, "g") , message: '名称只允许包含数字、字母和下划线' },
            {
                validator(rule, value, callback, source, options) {
                    console.log(' emailRules value')
                    var errors = [];
                    // test if email address already exists in a database
                    // and add a validation error to the errors array if it does
                    return errors;
                }
            }
        ]
        return (  
            <div className={'login'}>
                {/*登录页*/}
                <List >
                    <InputItem     {...getFieldProps('email', {
                        onChange(){}, // have to write original onChange here if you need
                        rules: emailRules,
                    })} clear={true} placeholder="邮箱"/>
                </List>
                { (  getFieldError('email')) ? getFieldError('email').join(',') :  '' }
                <WhiteSpace/>
                <List>
                <InputItem clear={true}    {...getFieldProps('pwd', {
                    onChange(){}, // have to write original onChange here if you need
                    rules: [
                        { required: true, message: '请输入密码' }],
                })}  type={'password'} placeholder="密码">
                </InputItem>
                </List>
                <WhiteSpace/>
                <div style={ { textAlign:'center'}}>
                    <Button type="primary" loading={this.state.loading }  onClick={ this.handleLogin() }  inline style={{ marginRight: '4px' }}>登陆</Button>
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
                        { text: '确定', onPress: () => { this.closeModal('modalStatus')(); } },
                        { text: '取消', onPress: () => { this.closeModal('modalStatus')(); } }
                        ]}
                >
                    <div >
                        <WhiteSpace/>
                        <List >
                            <InputItem clear={true} placeholder="邮箱"/>
                        </List>
                        <WhiteSpace/>

                        <List.Item
                            extra={<Button type="ghost" size="small" inline>验证</Button>}
                            multipleLine
                        >
                            <InputItem clear={true} placeholder="邮箱验证码"/>
                        </List.Item>
                        <WhiteSpace/>
                        <List >
                            <InputItem clear={true} placeholder="密码"/>
                        </List>
                    </div>
                </Modal>

            </div>
        );
    }


    //  打开对话框
    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
    }
    // 关闭对话框
    closeModal= key => () => {
        this.setState({
            [key]: false,
        });
    }
    //登陆
    handleLogin = key =>()=>{
        let pwd = this.$md5(this.state.loginParma.pwd)
        console.log('handleLogin',pwd)
        console.log(this.props.form.getFieldsValue())
        this.props.form.validateFields((error, value) => {
            console.log(error, value);
        });
        let params = "uname=" + this.state.loginParma.uname + "&pwd=" + pwd + "&code=";
        handApiLogin(params).then((res)=>{
            console.log('login res:', res)
        })
    }
}
;

export default  createForm()(Login);