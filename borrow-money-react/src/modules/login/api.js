import  httpRequest from  '../../utils/HttpClients'

export function handApiLogin (data) {
    return httpRequest({
        url: '/login',
        method: 'post',
        data
    })
}