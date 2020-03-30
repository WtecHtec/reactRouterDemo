import React from 'react';
import store from '../../store'
import {withRouter} from 'react-router-dom';
import {TabBar} from 'antd-mobile';
import './main.css'
// import Mine from "../mine/mine";
// import Account from "../account/account";
// import Account from "../../components/jspang"
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'account'
        }
        // console.log(store.getState())
        // console.log(this.props)
        // var action = {
        //     type: 'editinputValue',
        //     index: '1'
        // }
        // store.dispatch(action)

    }

    componentDidMount() {
        if (this.props.location.pathname) {
            let tabs = this.props.location.pathname.split('/main/')
            if (tabs.length > 0) {
                console.log(this.props.location.pathname,tabs)
                this.setState({
                    selectedTab: tabs[1],
                });
            }

        }
    }

    render() {
        return (
            <div style={{height: '100%', width: '100%'}}>
                <div style={{ height: 'calc(100% - 50px)'}}>
                    {/*<h2>主页路由</h2>*/}
                    {/*<button>  Page1 </button>*/}
                    {/*<NavLink to='/main/account'> Page1</NavLink>*/}
                    {/*<NavLink to='/main/mine'> Page2</NavLink>*/}
                    {this.props.children}
                </div>
                <div style={{ width: '100%', top: 0}}>
                    <TabBar >

                        <TabBar.Item
                            icon={
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: `url(${require('../../assets/accounticon.png')}) center center /  21px 21px no-repeat`
                                }}
                                />
                            }
                            selectedIcon={
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: `url(${require('../../assets/accountselected.png')}) center center /  21px 21px no-repeat`
                                }}
                                />
                            }
                            title="账户"
                            key="account"
                            selected={this.state.selectedTab === 'account'}
                            onPress={() => {
                                this.handleTabSelected('account')()
                            }}
                        >
                         
                        </TabBar.Item>
                        <TabBar.Item
                            icon={
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: `url(${require('../../assets/mineicon.png')}) center center /  21px 21px no-repeat`
                                }}
                                />
                            }
                            selectedIcon={
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: `url(${require('../../assets/mineselected.png')}) center center /  21px 21px no-repeat`
                                }}
                                />
                            }
                            title="个人"
                            key="mine"
                            selected={this.state.selectedTab === 'mine'}
                            onPress={() => {
                                this.handleTabSelected('mine')()
                            }}
                        >
                           
                        </TabBar.Item>
                    </TabBar>
                </div>

            </div>
        );
    }



    handleTabSelected =(val)=>()=>{
        console.log('handleTabSelected:',val)
        var action = {
            type: 'changeRouterName',
            value: val
        }
        store.dispatch(action)
        this.setState({
            selectedTab: val,
        });
        this.props.history.push(`/main/${val}`);
    }
}

export default withRouter(Main);