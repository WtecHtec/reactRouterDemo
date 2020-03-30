import React from 'react';
import store from '../store'
import { StickyContainer, Sticky } from 'react-sticky';
import '../modules/account/account.css'
class jspangb extends React.Component {
    constructor(props) {
        super(props);
        this.state={ }
        console.log(store.getState())
    }
    render() { 
        return (
            <div> 页面 2

                <StickyContainer style={{height: 100}} className={'stickyContainer'} >
                    <Sticky>
                        {({style}) => {
                            return <div style={style} >123 </div>         // 需要吸顶的元素
                        }}
                    </Sticky>
                </StickyContainer>

                <div style={{height:'300px', }}>   其它内容
                    作者：songjp
                    链接：https://juejin.im/post/5cd83db3e51d453ce606dbbc
                    来源：掘金
                    著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。</div>

                <StickyContainer style={{height: 100}} className={'stickyContainer'} >
                    <Sticky >
                        {({style}) => {
                            return <div style={style} >12asdasd3 </div>         // 需要吸顶的元素
                        }}
                    </Sticky>
                </StickyContainer>


                <div style={{height:'300px', }}>   其它内容
                    作者：songjp
                    链接：https://juejin.im/post/5cd83db3e51d453ce606dbbc
                    来源：掘金
                    著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。</div>
            </div>
        );
    }
}
 
export default jspangb;