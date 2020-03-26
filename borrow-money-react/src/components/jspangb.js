import React from 'react';
import store from '../store'
class jspangb extends React.Component {
    constructor(props) {
        super(props);
        this.state={ }
        console.log(store.getState())
    }
    render() { 
        return (  
            <div> 页面 2</div>
        );
    }
}
 
export default jspangb;