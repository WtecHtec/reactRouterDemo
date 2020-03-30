
import Login from '../modules/login/login';
import Main from '../modules/main/mian';
// import Page1 from '../components/jspang';
// import Page2 from '../components/jspangb';
import Mine from "../modules/mine/mine";
import Account from "../modules/account/account";
// import Account from "../../components/jspang"
import React from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';


class RouterConfig extends React.Component{
    render(){
        return(
            <Switch>
                <Route path='/' exact render={()=>(
                    <Redirect to='/Login'/>
                )}/>
                <Route path="/main/" render={() =>
                    <Main>
                       <Route path="/main/account" component={Account} />
                       <Route path="/main/mine" component={Mine} />
                   </Main>
                 } />
                {/* <Route path='/main'  exact component={Main}/> */}
                <Route path='/login'  exact component={Login}/>
            </Switch>
        )
    }
}
export default RouterConfig;