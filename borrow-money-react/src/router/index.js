
import Login from '../modules/login/login';
import Main from '../modules/main/mian';
// import Page1 from '../components/jspang';
// import Page2 from '../components/jspangb';
import Mine from "../modules/mine/mine";
import Account from "../modules/account/account";
import DataBoard from  "../modules/databoard/databoard"
import  AddView from "../modules/recordfrom/addview"
import  DetailView from "../modules/recordfrom/detailview"
import  FillView from "../modules/recordfrom/fillview"
// import Account from "../../components/jspang"
import React from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';


class RouterConfig extends React.Component{
    render(){
        return(
            <Switch>
                <Route path='/' exact render={()=>(
                    <Redirect to='/login'/>
                )}/>
                <Route path="/main" render={() =>
                    <Main>
                       {/*<Route path="/main" component={Account} />*/}
                       <Route path="/main/mine" component={Mine} />
                        <Route path="/main/account" component={Account} />
                   </Main>
                 } />
                {/* <Route path='/main'  exact component={Main}/> */}
                <Route path='/login'  exact component={Login}/>
                <Route path='/dataBoard'  exact component={DataBoard}/>
                <Route path='/addView'  exact component={AddView}/>
                <Route path='/detailView'  exact component={DetailView}/>
                <Route path='/fillView'  exact component={FillView}/>


            </Switch>
        )
    }
}
export default RouterConfig;