import React from 'react';
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state={ }
    }
    render() { 
        return (  
            <div> 
                登录页
                <button onClick={this.handleClick}>  登陆 </button>
            </div>
        );
    }
    handleClick = ()=>{
        console.log('撩拨了小姐姐')
        this.props.history.push('/main');
    }
}
 
export default Login;