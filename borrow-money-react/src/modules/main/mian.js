import React from 'react';
import store from '../../store'
import {NavLink,withRouter} from 'react-router-dom';
// import Page1 from '../../components/jspang';
// import Page2 from '../../components/jspangb';
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state={ }
        console.log(store.getState())
        console.log(this.props.location.state)
         var  action = {
            type:'editinputValue',
            index:'1'
        }
        store.dispatch(action)

    }
    render() { 
        return ( 
            <div> 主页
             <div>
                    <h2>Topics</h2>
                    <NavLink to='/main'> Page1</NavLink>
                    <NavLink to='/main/Page2'> Page2</NavLink>
                   {this.props.children}
                    </div>
            </div>
         );
    }
}
 
export default withRouter(Main);