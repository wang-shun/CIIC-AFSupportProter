import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

let axiosInstance = axios.create()

const mock = new MockAdapter(axiosInstance)

mock.onGet('/getEmployeeList').reply(200, {
  data: [
    {
      empCode: 'YY012345',
      empName: '雇员1',
      IDCardNum: '320623144901117177',
      education: '本科',
      marriage: '已婚',
      sex: '男',
      birthday: '1978-03-26',
      address: '上海市天山西路138号1楼35室',
      firstInTime: '1999-05-26',
      contractStartTime: '1999-05-26',
      contractEndTime: '2002-05-26',
      companyCode: 'KH1701234',
      companyName: '客户1',
      companyAddr: '上海市宜山路1009号创新大楼3层',
      companyTel: '400-820-6998',
      status: '在职'
    }
  ]
})

const getEmployeeList = axiosInstance.get('/getEmployeeList')

export default {
  getEmployeeList
}
