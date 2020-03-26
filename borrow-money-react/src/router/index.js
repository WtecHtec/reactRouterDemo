
import Login from '../modules/login/login';
import Main from '../modules/main/mian';
import Page1 from '../components/jspang';
import Page2 from '../components/jspangb';
import React from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';


class RouterConfig extends React.Component{
    render(){
        return(
            <Switch>
                <Route path='/' exact render={()=>(
                    <Redirect to='/Login'/>
                )}/>
                <Route path="/main" render={() =>
                    <Main>
                        <Route exact path="/main" component={Page1} />
                        <Route path="/main/Page2" component={Page2} />
                    </Main>
                }/>
                <Route path='/login'  exact component={Login}/>
            </Switch>
        )
    }
}
export default RouterConfig;