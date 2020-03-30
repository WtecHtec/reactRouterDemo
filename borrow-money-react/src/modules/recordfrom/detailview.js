import React from 'react';
import Recordheader from './recordheader'
import { WhiteSpace,NavBar, Icon,List  } from 'antd-mobile';
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

    render() {
        return(
            <div >
                <NavBar
                    style={{   position: 'fixed',width:'100%',zIndex:1}}
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() =>{console.log('onLeftClick'); this.props.history.goBack();}}> 详情 </NavBar>
                <Recordheader recordData={ this.state.recordData}></Recordheader>
                <WhiteSpace></WhiteSpace>
                <List  className="my-list">
                    <Item arrow="horizontal" multipleLine onClick={() => {}}>
                        确认还款 <Brief>subtitle</Brief>
                    </Item>
                    <Item
                        arrow="horizontal"
                        multipleLine
                        onClick={() => {}}
                        platform="android"
                    >
                       复制链接<Brief>There may have water ripple effect of <br /> material if you set the click event.</Brief>
                    </Item>

                </List>
            </div>
        )
    }
}
export default  detailview