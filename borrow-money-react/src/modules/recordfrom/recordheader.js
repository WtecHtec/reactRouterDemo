import React from 'react';
import './recordfrom.css'
class recordheader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let recordDataView = ''
        if (this.props.recordData.repayDate) {
            recordDataView = <div className={'textshow'}>预计还款日期：2020-05-06</div>
        }
        return(
            <div style={{ width:'100%'}} id='recordheader'>
              <div className={'header'}>
                  <div style={{textAlign:'center'}}>
                      <div style={{fontSize:'1.8rem',color:'#2f3640'}}> 漳卅 </div>
                      <div style={{fontSize:'1.4rem',color:'#e1b12c'}}> 1212 </div>
                  </div>
              </div>
                <div className={'textshow'}>状态：待还</div>
                <div className={'textshow'}>创建时间：2019-12-12</div>
                {recordDataView}
            </div>
        )
    }
}
export default  recordheader