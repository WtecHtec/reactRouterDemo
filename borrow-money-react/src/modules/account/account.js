import React from 'react';
import ReactDOM from 'react-dom'
import { NavBar,SearchBar,ListView ,List,ActivityIndicator} from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import './account.css'
const Item = List.Item;
const Brief = Item.Brief;
class Account extends React.Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });

        this.state = {
            animating: false,//左上角加载动画
            hasMore: true,// 是否还有数据
            listTimer: null,//定时器
            pageInfo:{
                pageSize: 10,
                currentPage: 1
            }, // 分页参数
            dataList:[], // 接口返回的数据
            dataSource, // 列表数据源
            rowsAndSectionsData:{}, // 列表存放数据格式
            isLoading: true, // 是否加载更多
            height: document.documentElement.clientHeight * 3 / 4, // 列表高度
        };
    }
    
    // 将接口返回的数据格式化
     inItDataRow(data,borrowDate){
        for (let i = 0; i < data.length;i++){
            let date = data[i][borrowDate].split(' ')[0]
            // 判断 sectionName 是否重复
            if(this.state.rowsAndSectionsData[date]){
                this.state.rowsAndSectionsData[date].push(JSON.stringify(data[i]))
            } else {
                this.state.rowsAndSectionsData[date] = []
                this.state.rowsAndSectionsData[date].push(JSON.stringify(data[i]))
            }
        }
     }

    componentDidMount() {
        // you can scroll to the specified position
        // setTimeout(() => this.lv.scrollTo(0, 120), 800);
        const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
        // simulate initial Ajax
        this.state.listTimer = setTimeout(() => {
            this.state.dataList = []
            for(let i = 0; i < this.state.pageInfo.pageSize;i++){
               let item =  {
                    id:  this.state.pageInfo.currentPage + '' + i ,  // id
                    name: '李四' + i, // 对方名字
                    moneyNum: Number.parseInt(Math.random() *100) , // 数额
                    repayDate: '2019-10-23', // 还钱日期
                    borrowDate: `2019-10-${this.state.pageInfo.currentPage} 19:09:10`, // 借钱日期
                    status: 0 // 状态
                }
                this.state.dataList.push(item)
            }
            this.inItDataRow(this.state.dataList,'borrowDate')
            console.log('this.state.rowsAndSectionsData:',this.state.rowsAndSectionsData)
            this.setState({
                dataSource: this.state.dataSource.cloneWithRowsAndSections(this.state.rowsAndSectionsData),
                isLoading: false,
                height:hei
            });
            if (this.state.listTimer) {
                clearTimeout(this.state.listTimer)
            }
        }, 200);
    }

    // 加载更多
    onEndReached = (event) => {
        console.log('onEndReached')
        this.state.dataList = []
        this.state.pageInfo.currentPage +=1
        for(let i = 0; i < this.state.pageInfo.pageSize;i++){
            let item =  {
                 id:  this.state.pageInfo.currentPage +''+i ,  // id
                 name: '李四' + i, // 对方名字
                 moneyNum: Number.parseInt(Math.random() *100) , // 数额
                 repayDate: '2019-10-23', // 还钱日期
                 borrowDate: `2019-10-${this.state.pageInfo.currentPage} 19:09:10`, // 借钱日期
                 status: 0 // 状态
             }
             this.state.dataList.push(item)
         }
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (!this.state.hasMore) {
            this.setState({
                isLoading: false,
            });
            return;
        }
        console.log('reach end', event);
        this.setState({ isLoading: true });
        this.state.listTimer =  setTimeout(() => {
            this.inItDataRow(this.state.dataList,'borrowDate')
            this.setState({
                dataSource: this.state.dataSource.cloneWithRowsAndSections(this.state.rowsAndSectionsData),
                isLoading: false,
            });
            if (this.state.listTimer) {
                clearTimeout(this.state.listTimer)
            }
            if( this.state.pageInfo.currentPage === 7) {
                this.state.hasMore = false
                this.state.isLoading = true
            }

        }, 1000);
    }
   
    // 刷新
    onRefresh = () => {
        console.log('onRefresh')
        this.setState({ animating: true });
        this.state.rowsAndSectionsData = {}
        this.state.dataList = []
        this.state.pageInfo.currentPage += 1
        for(let i = 0; i < this.state.pageInfo.pageSize;i++){
            let item =  {
                 id:  this.state.pageInfo.currentPage +''+i ,  // id
                 name: '李四' + i, // 对方名字
                 moneyNum: Number.parseInt(Math.random() *100) , // 数额
                 repayDate: '2019-10-23', // 还钱日期
                 borrowDate: `2019-10-${this.state.pageInfo.currentPage} 19:09:10`, // 借钱日期
                 status: 0 // 状态
             }
             this.state.dataList.push(item)
         }
        // simulate initial Ajax
        this.state.listTimer = setTimeout(() => {
            this.inItDataRow(this.state.dataList,'borrowDate')
            this.setState({
                dataSource: this.state.dataSource.cloneWithRowsAndSections(this.state.rowsAndSectionsData),
                isLoading: false,
            });
          this.setState({ animating: false });
          if (this.state.listTimer) {
            clearTimeout(this.state.listTimer)
        }
        }, 600);
      };

    componentWillUnmount(){
        if (this.state.listTimer) {
            clearTimeout(this.state.listTimer)
        }
      }
    render() {

        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#F5F5F9',
                    height: 8,
                    borderTop: '1px solid #ECECED',
                    borderBottom: '1px solid #ECECED',
                }}
            />
        );

        const row = (rowData, sectionID, rowID) => {
            let itemData =  JSON.parse(rowData)
            return (
                <div key={itemData['id']} style={{ padding: '0 15px' }} >
                    {/* 每条内容 - {itemData['borrowDate']} - {sectionID} - {rowID} */}
                    <List>
                        <Item  onClick={() => {}} extra={ <span style={{color:'red'}}> {itemData['moneyNum'] }</span> } align="top"
                              thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                              multipleLine>
                            {itemData['name']}
                            <Brief>
                                { itemData['borrowDate']}
                            </Brief>
                        </Item>
                    </List>


                </div>
            );
        };

        return (
            <div style={{height: '100%', width: '100%'}} id={'account'}>
                <div   style={{height: '90px', width: '100%'}} >
                    <NavBar mode="dark"
                        icon={<ActivityIndicator animating={this.state.animating} />}
                    rightContent={[
                        <div style={{
                            width: '22px',
                            height: '22px',
                            background: `url(${require('../../assets/resfreshicon.png')}) center center /  21px 21px no-repeat`,
                            marginRight: '8px',
                        }} onClick={ ()=>{ this.onRefresh() }}
                        />,
                        <div style={{
                            width: '22px',
                            height: '22px',
                            background: `url(${require('../../assets/add.png')}) center center /  21px 21px no-repeat`
                        }}
                        />,
                       
                    ]}>账户</NavBar>
                    <SearchBar></SearchBar>
                </div>
                <div className={'accountContext'}>
                    <ListView
                        ref={el => this.lv = el}
                        dataSource={this.state.dataSource}
                        className="am-list sticky-list"
                        renderSectionWrapper={(sectionID) =>
                            (   
                                <StickyContainer
                                key={sectionID}
                                className={'sticky-container'}
                                style={{ zIndex: 4, }}
                            />
                            )
                        }

                        renderSectionHeader={(sectionData ,sectionID) => (
                            <Sticky bottomOffset={0}>
                                {({style,}) => (
                                    <div
                                            className="sticky"
                                            style={{
                                                ...style,
                                                zIndex: 3,
                                                backgroundColor:  '#ecf0f1',
                                            }}
                                        >{`${sectionID}`}
                                    </div>
                                )}
                              </Sticky>
                        )}
                        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                            {this.state.isLoading ? '加载...' : '人家也是有底线de'}
                        </div>)}

                        style={{
                            height: this.state.height,
                            overflowY:'auto'
                        }}
                        renderRow={row}
                        renderSeparator={separator}
                        pageSize={4}
                        onScroll={() => { console.log('scroll'); }}
                        scrollEventThrottle={200}
                        onEndReached={this.onEndReached}
                        onEndReachedThreshold={10}
                   

                    />


                </div>
            </div>
        )
    }
}
export default  Account