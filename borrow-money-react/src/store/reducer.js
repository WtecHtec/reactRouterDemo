
const defaultState = {
    routerName:'account',// 子路由名称
    inputValue : 'Write Something',
    list:[
        '早上4点起床，锻炼身体',
        '中午下班游泳一小时'
    ]
}

export default (state = defaultState,action)=>{  //就是一个方法函数

    if(action.type === 'editinputValue' ){
        let newState = JSON.parse(JSON.stringify(state))
          console.log('newState: ',newState)
        console.log('action: ',newState)
        // newState.list.splice(action.index,1)  //删除数组中对应的值
         newState.inputValue = '修改'
        return newState
    }
    if(action.type === 'changeRouterName' ){
        let newState = JSON.parse(JSON.stringify(state))
        newState.routerName = action.value
        return newState
    }
    return state
}