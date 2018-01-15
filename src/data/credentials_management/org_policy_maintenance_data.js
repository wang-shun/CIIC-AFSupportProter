import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

let axiosInstance = axios.create()

const mock = new MockAdapter(axiosInstance)

mock.onGet('/getOrgPolicyList').reply(200, {
  data: [
    {
      name: '梅园路',
      type: '积分办理',
      createdBy: '刘亦菲',
      createdTime: '2017-06-11 10:34:56',
      policyDescription: '上海是全国最早尝试积分落户制度的城市之一。只不过，最先接受评分筛选的不是普通入沪者，而是高校应届毕业生。2004年，上海开始对非本市生源高校毕业生进沪就业办理上海户籍实行积分政策，申请者的积分值必须高于上海公布的“标准分”才能落户，否则只能办理上海市居住证。而随着上海市逐渐从严控制人口，“标准分”从2005年的64分、2006年的68分一路涨至今年的72分。若非硕士、博士，又没有三好学生、优秀毕业生等荣誉，应届生在上海落户几乎是一件不可能的事'
    },
    {
      name: '徐汇人才',
      type: '人才引进',
      createdBy: '胡歌',
      createdTime: '2017-08-01 10:34:56',
      policyDescription: '2004年，上海开始对非本市生源高校毕业生进沪就业办理上海户籍实行积分政策，申请者的积分值必须高于上海公布的“标准分”才能落户，否则只能办理上海市居住证。而随着上海市逐渐从严控制人口，“标准分”从2005年的64分、2006年的68分一路涨至今年的72分。若非硕士、博士，又没有三好学生、优秀毕业生等荣誉，应届生在上海落户几乎是一件不可能的事'
    }
  ]
})

const getOrgPolicyList = axiosInstance.get('/getOrgPolicyList')

export default {
  getOrgPolicyList
}
