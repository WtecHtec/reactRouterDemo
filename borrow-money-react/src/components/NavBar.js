import React from 'react';

class NavBar  extends React.Component { 

    constructor(props) {
        super(props);
        this.state={ }
    }

    render() { 
        return ( 
            <div onClick={this.handleClick}> hahah </div>
         );
    }

    handleClick = ()=>{
        console.log('撩拨了小姐姐')
        this.props.history.push('/a');
    }

}

export default NavBar;

