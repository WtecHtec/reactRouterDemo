import React from 'react';
import { NavBar ,List,Modal} from 'antd-mobile';
import {  getRecordReports } from './api'
import './mine.css'
const Item = List.Item;
const alert = Modal.alert;



class Mine extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            month: 1,
            countNumber:10
         }
    }
   
    componentWillMount(){
        this.getRecordReportData()
    }

    getRecordReportData=()=>{
        let  month =  new Date().getMonth() + 1
        let today  = new Date().getFullYear() + '-' + ( month > 10? month: '0'+month)
        let param = '?createTime=' + today
       
        getRecordReports(param).then(res=>{
            // console.log(res)
            let data = res.data
            if(data.statusCode === 200) {
                if(data.responseData.length > 0) {
                    this.setState({
                        month:month,
                        countNumber:data.responseData[0].money? data.responseData[0].money: 0
                    })
                }
            }
        })
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
            <label className={'countDateVal'}>{ this.state.month }</label>
                             <label className={'countDateUnit'}>月</label>
                         </div>
            <div className={'countNumber'}>￥{this.state.countNumber}</div>
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
                                onClick={() => { this.showAlert()}}
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

    showAlert = () => {
        const alertInstance = alert('', '是否确定退出登录???', [
          { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
          { text: '退出', onPress: () => {
            this.props.history.push(  {pathname:"/login"})
          } },
        ]);
   };

}

export default Mine;