
import Login from '../modules/login/login';
import Main from '../modules/main/mian';
// import Page2 from '../components/jspangb';
import React from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';


class RouterConfig extends React.Component{
    render(){
        return(
            <Switch>
                <Route path='/' exact render={()=>(
                    <Redirect to='/Login'/>
                )}/>
                <Route path='/main'  component={({ match }) => (
                             <Main/>
                )}/>
                <Route path='/Login'  exact component={Login}/>
            </Switch>
        )
    }
}
export default RouterConfig;