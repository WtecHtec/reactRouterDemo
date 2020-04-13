import React from 'react';
import './recordfrom.css'
class recordheader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
        // console.log('this.props.recordData.' ,this.props.recordData)
    }

    render() {
        let recordDataView = ''
        let statusView =''
        let remindtimeView = ''
        if (this.props.recordData.repaytime) {
            recordDataView = <div className={'textshow'}>预计还款日期：{this.props.recordData.repaytime}</div>
        }
        if (this.props.recordData.remindtime) {
            remindtimeView = <div className={'textshow'}>发送提醒日期：{this.props.recordData.remindtime}</div>
        }
        if(this.props.recordData.status === '0') {
            statusView = <span className={'textshow'}> 未确定还款时间</span>
        } else if (this.props.recordData.status === '1') {
            statusView = <span className={'textshow'}> 待还</span>
        } else if(this.props.recordData.status === '2'){
            statusView = <span className={'textshow'}> 已发送邮件提醒</span>
        }
        return(
            <div style={{ width:'100%'}} id='recordheader'>
              <div className={'header'}>
                  <div style={{textAlign:'center'}}>
                      <div style={{fontSize:'1.8rem',color:'#2f3640'}}> { this.props.recordData.payeename} </div>
                      <div style={{fontSize:'1.4rem',color:'#e1b12c'}}> { this.props.recordData.money}  </div>
                  </div>
              </div>
                <div className={'textshow'}>状态： {statusView}</div>
                <div className={'textshow'}>创建时间：{this.props.recordData.createtime} </div>
                
                {recordDataView}
                {remindtimeView}
            </div>
        )
    }
}
export default  recordheader