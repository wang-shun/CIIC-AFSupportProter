import Vue from 'vue'
import Router from 'vue-router'

const main = r => require.ensure([], () => r(require('@/components/main')), 'main') //首页
const login = r => require.ensure([], () => r(require('@/components/login')), 'login') //登录
const charts = r => require.ensure([], () => r(require('@/components/charts')), 'charts') //报表

const approvalstep2 = r => require.ensure([], () => r(require('@/views/commoncontrol/approvalstep2')), 'approvalstep2') //审核步骤2

/* ================== 本地社保 ================== */
/*
 * employeesocialsecuritysearch      --- 雇员社保查询
   employeesocialsecurityinfo        --- 基本信息
   companysocialsecuritynew          --- 基本信息
 */

const employeesocialsecuritysearch = r => require.ensure([], () => r(require('@/views/socialsecurity/shsocialsecurity/employeesocialsecuritysearch')), 'employeesocialsecuritysearch')
const employeesocialsecurityinfo = r => require.ensure([], () => r(require('@/views/socialsecurity/shsocialsecurity/employeesocialsecurityinfo')), 'employeesocialsecurityinfo')
const companysocialsecuritynew = r => require.ensure([], () => r(require('@/views/socialsecurity/shsocialsecurity/companysocialsecuritynew')), 'companysocialsecuritynew')


/*
 * employeeoperatorview              --- 雇员日常操作
 * employeecommcialoperator          --- 雇员日常操作、办理
 */

const employeeoperatorview = r => require.ensure([], () => r(require('@/views/socialsecurity/employeeoperator/employeeoperatorview')), 'employeeoperatorview')
const employeecommcialoperator = r => require.ensure([], () => r(require('@/views/socialsecurity/employeeoperator/employeecommcialoperator')), 'employeecommcialoperator')


/*
 * employeespecialoperatorview       --- 雇员特殊操作
   employeespecialprogress2          --- 雇员特殊操作、办理(步骤2)
   employeespecialprogress3          --- 雇员特殊操作、办理(步骤3)
 */

const employeespecialoperatorview = r => require.ensure([], () => r(require('@/views/socialsecurity/employeeSpecialOperator/employeespecialoperatorview')), 'employeespecialoperatorview')
const employeespecialprogress2 = r => require.ensure([], () => r(require('@/views/socialsecurity/employeeSpecialOperator/employeespecialprogress2')), 'employeespecialprogress2')
const employeespecialprogress3 = r => require.ensure([], () => r(require('@/views/socialsecurity/employeeSpecialOperator/employeespecialprogress3')), 'employeespecialprogress3')


/*
 * companytasklist                   --- 企业任务单
   companytaskprogress2              --- 企业任务单、办理(步骤2)
   companytaskprogresstypeinfo       --- 企业任务单、办理(输入)
   companytaskprogresstransferinfo   --- 企业任务单、办理(转移)
   companytaskprogresschangeinfo     --- 企业任务单、办理(变更)
   companytaskprogressendinfo        --- 企业任务单、办理(终止)
 */

const companytasklist = r => require.ensure([], () => r(require('@/views/socialsecurity/companytasklist/companytasklist')), 'companytasklist')
const companytaskprogress2 = r => require.ensure([], () => r(require('@/views/socialsecurity/companytasklist/companytaskprogress2')), 'companytaskprogress2')
const companytaskprogresstypeinfo = r => require.ensure([], () => r(require('@/views/socialsecurity/companytasklist/companytaskprogresstypeinfo')), 'companytaskprogresstypeinfo')
const companytaskprogresstransferinfo = r => require.ensure([], () => r(require('@/views/socialsecurity/companytasklist/companytaskprogresstransferinfo')), 'companytaskprogresstransferinfo')
const companytaskprogresschangeinfo = r => require.ensure([], () => r(require('@/views/socialsecurity/companytasklist/companytaskprogresschangeinfo')), 'companytaskprogresschangeinfo')
const companytaskprogressendinfo = r => require.ensure([], () => r(require('@/views/socialsecurity/companytasklist/companytaskprogressendinfo')), 'companytaskprogressendinfo')


/*
 * companysocialsecuritymanage       --- 企业社保账户管理
   companysocialsecurity             --- 企业社保账户信息
   companysocialsecurityprogress2    --- 企业社保账户信息2
   companysocialsecuritytypeinfo     --- 企业社保账户信息(输入)
   companysocialsecuritychangeinfo   --- 企业社保账户信息(变更)
   companysocialsecurityendinfo      --- 企业社保账户信息(终止)
 */

const companysocialsecuritymanage = r => require.ensure([], () => r(require('@/views/socialsecurity/companysocialsecuritymanage/companysocialsecuritymanage')), 'companysocialsecuritymanage')
const companysocialsecurity = r => require.ensure([], () => r(require('@/views/socialsecurity/companysocialsecuritymanage/companysocialsecurity')), 'companysocialsecurity')
const companysocialsecurityprogress2 = r => require.ensure([], () => r(require('@/views/socialsecurity/companysocialsecuritymanage/companysocialsecurityprogress2')), 'companysocialsecurityprogress2')
const companysocialsecuritytypeinfo = r => require.ensure([], () => r(require('@/views/socialsecurity/companysocialsecuritymanage/companysocialsecuritytypeinfo')), 'companysocialsecuritytypeinfo')
const companysocialsecuritychangeinfo = r => require.ensure([], () => r(require('@/views/socialsecurity/companysocialsecuritymanage/companysocialsecuritychangeinfo')), 'companysocialsecuritychangeinfo')
const companysocialsecurityendinfo = r => require.ensure([], () => r(require('@/views/socialsecurity/companysocialsecuritymanage/companysocialsecurityendinfo')), 'companysocialsecurityendinfo')


/*
 * socialsecurityreconcilate       --- 社保对账
 */

const socialsecurityreconcilate = r => require.ensure([], () => r(require('@/views/socialsecurity/socialsecurityreconcilate/socialsecurityreconcilate')), 'socialsecurityreconcilate')


/*
 * socialsecuritypay               --- 社保支付
 * paymentnotice                   --- 查看付款通知书
 */

const socialsecuritypay = r => require.ensure([], () => r(require('@/views/socialsecurity/socialsecuritypay/socialsecuritypay')), 'socialsecuritypay')
const paymentnotice = r => require.ensure([], () => r(require('@/views/socialsecurity/socialsecuritypay/paymentnotice')), 'paymentnotice')


/*
 * socialsecuritypay               --- 社保报表
 */

const socialsecurityreport = r => require.ensure([], () => r(require('@/views/socialsecurity/socialsecurityreport/socialsecurityreport')), 'socialsecurityreport')


/*
 * yearbaseapplicate               --- 年度基数申报
 */

const yearbaseapplicate = r => require.ensure([], () => r(require('@/views/socialsecurity/yearbaseapplicate/yearbaseapplicate')), 'yearbaseapplicate')


/*
 * systemmanage                    --- 系统管理
 */

const systemmanage = r => require.ensure([], () => r(require('@/views/socialsecurity/systemmanage/systemmanage')), 'systemmanage')


/* ================== 本地公积金 ================== */
/*
 * employeefundsearch      --- 雇员公积金查询
   employeefundhistory     --- 雇员公积金批量导入历史
   employeefundbasicinfo   --- 雇员公积金详情
 */

const employeefundsearch = r => require.ensure([], () => r(require('@/views/fund/employeefundsearch/employeefundsearch')), 'employeefundsearch')
const employeefundhistory = r => require.ensure([], () => r(require('@/views/fund/employeefundsearch/employeefundhistory')), 'employeefundhistory')
const employeefundbasicinfo = r => require.ensure([], () => r(require('@/views/fund/employeefundsearch/employeefundbasicinfo')), 'employeefundbasicinfo')





Vue.use(Router)
let router = new Router({

  linkActiveClass: 'is-active',
  routes: [
    {
      path: '/',
      component: login
    },
    {
      path: '/main',
      component: main,
      children: [
        {
          path: '', //默认显示的自路由
          name:'main',
          component: charts
        },
        {
          path: '/employeesocialsecuritysearch',
          name:'employeesocialsecuritysearch',
          component: employeesocialsecuritysearch,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"雇员社保查询",
            openNames:['1']
          }
        },
        {
          path: '/employeesocialsecurityinfo',
          name:'employeesocialsecurityinfo',
          component: employeesocialsecurityinfo,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"雇员社保基本信息",
            openNames:['1']
          }
        },
        {
          path: '/companysocialsecuritynew',
          name:'companysocialsecuritynew',
          component: companysocialsecuritynew,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"企业社保基本信息",
            openNames:['1']
          }
        },

        {
          path: '/employeeoperatorview',
          name:'employeeoperatorview',
          component: employeeoperatorview,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"雇员日常操作",
            openNames:['1']
          }
        },
        {
          path: '/employeecommcialoperator',
          name:'employeecommcialoperator',
          component: employeecommcialoperator,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"雇员日常操作",
            openNames:['1']
          }
        },

        {
          path: '/employeespecialoperatorview',
          name: 'employeespecialoperatorview',
          component: employeespecialoperatorview,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"雇员特殊操作",
            openNames:['1']
          },
        },
        {
          path: '/employeespecialprogress2',
          name: 'employeespecialprogress2',
          component: employeespecialprogress2,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"雇员特殊操作",
            openNames:['1']
          }
        },
        {
          path: '/employeespecialprogress3',
          name: 'employeespecialprogress3',
          component: employeespecialprogress3,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"雇员特殊操作",
            openNames:['1']
          }
        },

        {
          path: '/CompanyTaskList',
          name: 'companytasklist',
          component: companytasklist,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"企业任务单",
            openNames:['1']
          },
        },
        {
          path: '/companytaskprogress2',
          name: 'companytaskprogress2',
          component: companytaskprogress2,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"企业任务单",
            openNames:['1']
          }
        },
        {
          path: '/companytaskprogresstypeinfo',
          name: 'companytaskprogresstypeinfo',
          component: companytaskprogresstypeinfo,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"企业任务单",
            openNames:['1']
          }
        },
        {
          path: '/companytaskprogresstransferinfo',
          name: 'companytaskprogresstransferinfo',
          component: companytaskprogresstransferinfo,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"企业任务单",
            openNames:['1']
          }
        },
        {
          path: '/companytaskprogresschangeinfo',
          name: 'companytaskprogresschangeinfo',
          component: companytaskprogresschangeinfo,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"企业任务单",
            openNames:['1']
          }
        },
        {
          path: '/companytaskprogressendinfo',
          name: 'companytaskprogressendinfo',
          component: companytaskprogressendinfo,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"企业任务单",
            openNames:['1']
          }
        },

        {
          path: '/CompanySocialSecurityManage',
          name: 'companysocialsecuritymanage',
          component: companysocialsecuritymanage,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"企业社保账户管理",
            openNames:['1']
          }
        },
        {
          path: '/companysocialsecurity',
          name: 'companysocialsecurity',
          component: companysocialsecurity,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"企业社保账户管理",
            openNames:['1']
          }
        },
        {
          path: '/companysocialsecurityprogress2',
          name: 'companysocialsecurityprogress2',
          component: companysocialsecurityprogress2,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"企业社保账户管理",
            openNames:['1']
          }
        },
        {
          path: '/companysocialsecuritytypeinfo',
          name: 'companysocialsecuritytypeinfo',
          component: companysocialsecuritytypeinfo,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"企业社保账户管理",
            openNames:['1']
          }
        },
        {
          path: '/companysocialsecuritychangeinfo',
          name: 'companysocialsecuritychangeinfo',
          component: companysocialsecuritychangeinfo,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"企业社保账户管理",
            openNames:['1']
          }
        },
        {
          path: '/companysocialsecurityendinfo',
          name: 'companysocialsecurityendinfo',
          component: companysocialsecurityendinfo,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"企业社保账户管理",
            openNames:['1']
          }
        },

        {
          path: '/socialsecurityreconcilate',
          name: 'socialsecurityreconcilate',
          component: socialsecurityreconcilate,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"社保对账",
            openNames:['1']
          }
        },

        {
          path: '/SocialSecurityPay',
          name: 'socialsecuritypay',
          component: socialsecuritypay,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"社保支付",
            openNames:['1']
          }
        },
        {
          path: '/paymentnotice',
          name: 'paymentnotice',
          component: paymentnotice,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"社保支付",
            openNames:['1']
          }
        },

        {
          path: '/socialsecurityreport',
          name: 'socialsecurityreport',
          component: socialsecurityreport,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"社保报表",
            openNames:['1']
          }
        },

        {
          path: '/yearbaseapplicate',
          name: 'yearbaseapplicate',
          component: yearbaseapplicate,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"年度基数申报",
            openNames:['1']
          }
        },

        {
          path: '/systemmanage',
          name: 'systemmanage',
          component: systemmanage,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"系统管理",
            openNames:['1']
          }
        },

        {
          path: '/employeefundsearch',
          name: 'employeefundsearch',
          component: employeefundsearch,
          meta: {
            level1: '全国公积金',
            level2: "上海公积金",
            level3: "雇员公积金查询",
            openNames: ['1']
          }
        },
        {
          path: '/employeefundhistory',
          name: 'employeefundhistory',
          component: employeefundhistory,
          meta: {
            level1: '全国公积金',
            level2: "上海公积金",
            level3: "查看导入历史",
            openNames: ['1']
          }
        },
        {
          path: '/employeefundbasicinfo',
          name: 'employeefundbasicinfo',
          component: employeefundbasicinfo,
          meta: {
            level1: '全国公积金',
            level2: "上海公积金",
            level3: "雇员公积金详情",
            openNames: ['1']
          }
        },
      ]
      }
   ]})

router.beforeEach((to,from,next)=>{
  // console.log(router.app.$local);
    window.document.title="社保中心";
    localStorage.setItem('level1',to.meta.level1);
    localStorage.setItem('level2',to.meta.level2);
    localStorage.setItem('level3',to.meta.level3);
    localStorage.setItem('level4',to.meta.level4);
    localStorage.setItem("openNames",[to.meta.openNames]);
    next();
});
router.afterEach((to,from)=>{});


export default router;
