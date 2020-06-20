import { httpResponseCode } from '../utils/constants'

export const getRandomUser = async () => {
    try {
        const url = `https://randomuser.me/api/`
        const headers = {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
        }
        const response = await fetch(url, headers)
        if(response.status == httpResponseCode.OK){
            const { results } = await response.json()
            return results
        }else{
            console.log(`${response.status} status`)
        }
    } catch (error) {
        console.log(error)
    }
}