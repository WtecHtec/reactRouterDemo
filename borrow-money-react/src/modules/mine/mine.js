import React from 'react';
import { NavBar ,List} from 'antd-mobile';
import './mine.css'
const Item = List.Item;

class Mine extends React.Component {
    constructor(props) {
        super(props);
        this.state={ }
    }
    render() {
        return (
            <div style={{ height:'100%', width:'100%'}}>
                {/* <div className={'header'}>
                    <NavBar   mode="dark">
                      <span style={{color: 'red'}}> 个人 </span>
                    </NavBar>
                </div> */}
                <div className={'mineContext'}>
                    <div className={'countShow'}>
                         <div className={'countDate'}>
                             <label className={'countDateVal'}>10</label>
                             <label className={'countDateUnit'}>月</label>
                         </div>
                         <div className={'countNumber'}>￥1000</div>
                    </div>
                    <div>
                        <List >
                            <Item
                                thumb={
                                    <div style={{
                                        width: '22px',
                                        height: '22px',
                                        background: `url(${require('../../assets/statistics.png')}) center center /  21px 21px no-repeat`
                                    }}></div>
                                }
                                onClick={() => {  this.props.history.push('/dataBoard')}}
                                arrow="horizontal"
                            >

                                图表统计
                            </Item>
                            {/*<Item*/}
                                {/*thumb={*/}
                                    {/*<div style={{*/}
                                        {/*width: '22px',*/}
                                        {/*height: '22px',*/}
                                        {/*background: `url(${require('../../assets/repwd.png')}) center center /  21px 21px no-repeat`*/}
                                    {/*}}></div>*/}
                                {/*}*/}
                                {/*arrow="horizontal"*/}
                                {/*onClick={() => {}}*/}
                            {/*>设置密码</Item>*/}

                            <Item
                                thumb={
                                    <div style={{
                                        width: '22px',
                                        height: '22px',
                                        background: `url(${require('../../assets/exit.png')}) center center /  21px 21px no-repeat`
                                    }}></div>
                                }
                                onClick={() => {}}
                                arrow="horizontal"
                            >
                                退出登陆
                            </Item>
                        </List>
                    </div>
                    <div>

                    </div>
                    <div>

                    </div>
                </div>

            </div>
        );
    }
}

export default Mine;