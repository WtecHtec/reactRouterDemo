import React from 'react';
import echarts from './echarts'
class PieEchart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    drawChart =()=>{
        if(!this.props.data || this.props.data.length === 0) return
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart'));
        var scale = 1;
        var echartData = this.props.data
        var rich = {
            yellow: {
                color: "#ffc72b",
                fontSize: 20 * scale,
                padding: [5, 4],
                align: 'center'
            },
            total: {
                color: "#ffc72b",
                fontSize: 20 * scale,
                align: 'center'
            },
            white: {
                color: "#fff",
                align: 'center',
                fontSize: 14 * scale,
                padding: [21, 0]
            },
            blue: {
                color: '#49dff0',
                fontSize: 16 * scale,
                align: 'center'
            },
            hr: {
                borderColor: '#0b5263',
                width: '100%',
                borderWidth: 1,
                height: 0,
            }
        }
        let option = {
            title: {
                text:'总额(元)',
                left:'center',
                top:'50%',
                padding:[24,0],
                textStyle:{
                    fontSize:18*scale,
                    align:'center'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b} : {c} ({d}%)'
            },
            legend: {
                selectedMode:false,
                formatter: function(name) {
                    var total = 0; //各科正确率总和
                    // var averagePercent; //综合正确率
                    echartData.forEach(function(value, index, array) {
                        total += value.value;
                    });
                    return '{total|' + total + '}';
                },
                data: [echartData[0].name],
                // data: ['高等教育学'],
                // itemGap: 50,
                left: 'center',
                top: 'center',
                icon: 'none',
                align:'center',
                textStyle: {
                    fontSize: 16 * scale,
                    rich: rich
                },
            },
            series: [{
                name: '总额(元)',
                type: 'pie',
                radius: ['42%', '50%'],
                hoverAnimation: false,
                // color: ['#c487ee', '#deb140', '#49dff0', '#034079', '#6f81da', '#00ffb4'],
                label: {
                    normal: {
                        formatter: function(params, ticket, callback) {
                            var total = 0; //考生总数量
                            var percent = 0; //考生占比
                            echartData.forEach(function(value, index, array) {
                                total += value.value;
                            });
                            percent = ((params.value / total) * 100).toFixed(1);
                            return '{null|' + params.name + '}\n{hr|}\n{yellow|' + params.value + '}\n{blue|' + percent + '%}';
                        },
                        rich: rich
                    },
                },
                labelLine: {
                    normal: {
                        length: 55 * scale,
                        length2: 0,
                        lineStyle: {
                            color: '#0b5263'
                        }
                    }
                },
                data: echartData
            }]
        };
// 绘制图表
        myChart.setOption(option);
    }
    componentDidMount() {
       
    }
    render() {
        this.drawChart()
        return (
            <div id='echart' style={{height:`${ this.props.height }`,width:'100%'}}></div>
        )
    }

}

export  default  PieEchart