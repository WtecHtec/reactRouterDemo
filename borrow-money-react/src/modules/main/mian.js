import React from 'react';
import {Route,NavLink} from 'react-router-dom';
import Page1 from '../../components/jspang';
import Page2 from '../../components/jspangb';
class Main extends React.Component {
    state = {  }
    
    render() { 
        return ( 
            <div> 主页
             <div>
                    <h2>Topics</h2>
                    <NavLink to='/main'> Page1</NavLink>
                    <NavLink to='/main/Page2'> Page2</NavLink>
                    <Route path={`/main`}  exact component={Page1}/>
                    <Route path={`/main/Page2`}  component={Page2}/>
                    </div>
                
                 </div>
         );
    }
}
 
export default Main;