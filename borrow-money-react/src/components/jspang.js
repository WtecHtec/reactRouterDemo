import React from 'react';

class jspang extends React.Component {
    
    constructor(props) {
        super(props);
        this.state={ }
    }
    render() { 
        return (  
            <div> 页面 1
                  <div onClick={this.handleClick}> hahah </div>
            </div>
        );
    }
    handleClick = ()=>{
        console.log('撩拨了小姐姐')
        this.props.history.push('/main/Page2');
    }
}
 
export default jspang;