import React from 'react';
import Recordheader from './recordheader'
import { WhiteSpace,NavBar, Icon,List ,Toast } from 'antd-mobile';
import copy from 'copy-to-clipboard';
const Item = List.Item;
const Brief = Item.Brief;
class detailview extends React.Component {

    constructor(props) {
        console.log(props)
        super(props);
        this.state = {
            recordData:{
                repayDate: '2020-12-05'
            }
        }
    }
    componentWillMount(){
        if(!this.props.location.state){
            this.props.history.push(  {pathname:"/main/account",state : { name : '登陆成功' }})
        }
        this.setState({
            recordData: this.props.location.state? this.props.location.state.recordData:{}
        })
    }

    render() {

        let copyView = ""
        if(this.state.recordData.status === '0') {
            copyView =  <List  className="my-list">
                        <Item arrow="horizontal"   multipleLine  onClick={() => { this.copyHerf()}}
                        platform="android" >
                        复制链接<Brief>完成还款日期填写 <br /></Brief>
                        </Item>
                    </List>
        }
        return(

            <div >
                <NavBar
                    style={{   position: 'fixed',width:'100%',zIndex:1}}
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() =>{console.log('onLeftClick'); this.props.history.goBack();}}> 详情 </NavBar>
                <Recordheader recordData={ this.state.recordData }></Recordheader>
                <WhiteSpace></WhiteSpace>
                { copyView }
            </div>
        )
    }

    copyHerf= ()=>{
        // console.log(window.location.href.split('#'))
        let herf  = window.location.href.split('#')[0] + '#/fillView?recordId=' + this.state.recordData.recordid
        if(copy(herf)){
            console.log("");
            Toast.success("复制成功", 2);
        }else{
            console.log("复制失败")
            Toast.fail( '复制失败', 4);
        }
    }
}
export default  detailview