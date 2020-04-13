import  httpRequest from  '../../utils/HttpClients'

export function getRecordReports (data) {
    return httpRequest({
        url: '/getRecordReports',
        method: 'get',
        data
    })
}
