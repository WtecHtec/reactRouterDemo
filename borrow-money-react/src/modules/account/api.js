import  httpRequest from  '../../utils/HttpClients'

export function getRecordRecord (data) {
    return httpRequest({
        url: '/getRecordRecord' + data,
        method: 'get',
        
    })
}
