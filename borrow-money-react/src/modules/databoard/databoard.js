import React from 'react';
// import chartTest from './chartTest'
import Pieplatelets from './Pieplatelets'
import PieEchart from './PieEchart'
import ReactDOM from 'react-dom';
import { NavBar, Icon } from 'antd-mobile';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
var echarts = require('echarts');
// 数据源
var data = [
    { genre: 'Sports', sold: 275, income: 2300 },
    { genre: 'Strategy', sold: 115, income: 667 },
    { genre: 'Action', sold: 120, income: 982 },
    { genre: 'Shooter', sold: 350, income: 5271 },
    { genre: 'Other', sold: 150, income: 3710 }
];

// 定义度量
const cols = {
    sold: { alias: '销售量' },
    genre: { alias: '游戏种类' }
};

class DataBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pieEchartData:[{
                value: 55,
                name: '里斯'
            }, {
                value: 854,
                name: '李四'
            }, {
                value: 35,
                name: '二娃'
            }, {
                value: 515,
                name: '狗蛋'
            }, {
                value: 354,
                name: '萨迦'
            }, {
                value: 154,
                name: '漳卅'
            }],
            pieplateletData: [ {
                type: "分类一",
                value: 27
            },
                {
                    type: "分类二",
                    value: 25
                },
                {
                    type: "分类三",
                    value: 18
                },
                {
                    type: "分类四",
                    value: 15
                },
                {
                    type: "分类五",
                    value: 10
                },
                {
                    type: "Other",
                    value: 5
                }]
        }
    }
    componentDidMount() {
       // this.drawChart()
    }
   updateDrawChartData=()=>{

       this.state.pieplateletData = [
                {
                    type: "里斯",
                    value: 10
                },
                {
                    type: "张三",
                    value: 5
                }
            ]

       console.log('this.state.pieplateletData:',this.state.pieplateletData)
       ReactDOM.render(<Pieplatelets data={this.state.pieplateletData}></Pieplatelets>, document.getElementById('Pieplatelets'))

       this.setState({
           pieEchartData:[]
       })
   }
    drawChart =()=>{
        console.log('data:',data)
        // 渲染图表
        ReactDOM.render((
            <Chart  data={data} scale={cols}>
                <Axis name="genre" title/>
                <Axis name="sold" title/>
                <Legend position="top" dy={-20} />
                <Tooltip />
                <Geom type="interval" position="genre*sold" color="genre" />
            </Chart>
        ), document.getElementById('mountNode'));

        ReactDOM.render(<Pieplatelets data={this.state.pieplateletData}></Pieplatelets>, document.getElementById('Pieplatelets'))

    }

    render() {
        return (
            <div style={{height:'100%',width:'100%'}} >
                <NavBar
                    style={{   position: 'fixed',width:'100%',zIndex:1}}
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() =>{console.log('onLeftClick'); this.props.history.goBack();} }>统计</NavBar>
                {/*<button onClick={()=>{  this.updateDrawChartData() ; }}> 修改数据  </button>*/}
                <PieEchart data={this.state.pieEchartData} height={'100%'}></PieEchart>
                {/*可视化*/}
                {/*<div id="Pieplatelets" style={{height:'50%',width:'100%'}}></div>*/}

                {/*<div id="mountNode" style={{height:'20%',width:'100%'}}></div>*/}
            {/*<chartTest></chartTest>*/}

            </div>
        )
    }
}

export default DataBoard