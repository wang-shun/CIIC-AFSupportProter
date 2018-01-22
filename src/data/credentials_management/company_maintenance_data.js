import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

let axiosInstance = axios.create()

const mock = new MockAdapter(axiosInstance)

mock.onGet('/getCompanyList').reply(200, {
  data: [
    {
      companyCode: 'KH1701234',
      companyName: '客户1'
    }
  ]
})

const getCompanyList = axiosInstance.get('/getCompanyList')

export default {
  getCompanyList
}
