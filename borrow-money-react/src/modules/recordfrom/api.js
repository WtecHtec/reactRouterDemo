import  httpRequest from  '../../utils/HttpClients'

export function getRecordInfo (data) {
    return httpRequest({
        url: '/getRecordInfo?recordId=' +data,
        method: 'get',
        
    })
}


export function updateRecord (data) {
    return httpRequest({
        url: '/updateRecord',
        method: 'post',
        data
    })
}



export function createRecord (data) {
    return httpRequest({
        url: '/createRecord',
        method: 'post',
        data
    })
}


