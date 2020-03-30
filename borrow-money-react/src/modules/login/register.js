import React from 'react';
import { Button,List, InputItem, WhiteSpace } from 'antd-mobile';
import { createForm  } from 'rc-form';
// import {  handApiLogin } from './api'
class register extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            verifyStatus: false,
            secondTime:60,
            timer: null
        }
    }
    componentDidMount() {
        this.props.onRef(this)
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
        let verifyBtn = <Button type="ghost" size="small" inline onClick={this.hendleVerifyBut.bind()}>验证</Button>
        if (this.state.verifyStatus) {
            verifyBtn = <label className={'error-lable'}> { this.state.secondTime} </label>
        }
        return (
            <div>
                <WhiteSpace/>
                <List >
                    <InputItem clear={true} placeholder="邮箱" {...getFieldProps('regedit[email]', {
                        rules: emailRules,
                    })}/>
                </List>
                <label className={'error-lable'}> { (  getFieldError('regedit[email]')) ? getFieldError('regedit[email]').join(',') :  '' }  </label>
                <WhiteSpace/>

                <List.Item
                    extra={  verifyBtn }
                    multipleLine
                >
                    <InputItem className={'code'} clear={true} placeholder="邮箱验证码"  {...getFieldProps('regedit[code]', {
                        rules: [
                            { required: true, message: '*验证码不能为空' }],
                    })} />
                </List.Item>
                <label className={'error-lable'}> { (  getFieldError('regedit[code]')) ? getFieldError('regedit[code]').join(',') :  '' }  </label>
                <WhiteSpace/>
                <List >
                    <InputItem clear={true} placeholder="密码"
                               {...getFieldProps('regedit[pwd]', {
                                   rules: [
                                       { required: true, message: '*密码不能为空' }],
                               })} />
                </List>
                <label className={'error-lable'}> { (  getFieldError('regedit[pwd]')) ? getFieldError('regedit[pwd]').join(',') :  '' }  </label>
                <WhiteSpace/>
            </div>
        )
    }

    // 验证按钮
    hendleVerifyBut = ()=>{
        console.log('hendleVerifyBut 发送')
        this.setState({
            verifyStatus: true,
            secondTime:60
        })
        let timer = setInterval((e)=>{
            this.setState({secondTime: this.state.secondTime - 1})
            if (this.state.secondTime === 0) {
                clearInterval(this.state.timer)
                this.setState({verifyStatus: false})
            }
            console.log('asd')
        },1000)
        this.setState({timer: timer})

    }

}

export default  createForm()(register);