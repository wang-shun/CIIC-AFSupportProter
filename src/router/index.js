import Vue from 'vue'
import Router from 'vue-router'

const main = r => require.ensure([], () => r(require('@/components/main')), 'main') //首页
const login = r => require.ensure([], () => r(require('@/components/login')), 'login') //登录
const charts = r => require.ensure([], () => r(require('@/components/charts')), 'charts') //报表

const approvalstep2 = r => require.ensure([], () => r(require('@/views/commoncontrol/approvalstep2')), 'approvalstep2') //审核步骤2

const employeesocialsecuritysearch = r => require.ensure([], () => r(require('@/views/ShSocialSecurity/employeesocialsecuritysearch')), 'employeesocialsecuritysearch') //雇员社保查询
const employeesocialsecurityinfo = r => require.ensure([], () => r(require('@/views/ShSocialSecurity/employeesocialsecurityinfo')), 'employeesocialsecurityinfo') //雇员社保基本信息
const companysocialsecuritynew = r => require.ensure([], () => r(require('@/views/ShSocialSecurity/companysocialsecuritynew')), 'companysocialsecuritynew') //企业社保基本信息

const employeeoperatorview = r => require.ensure([], () => r(require('@/views/EmployeeOperator/employeeoperatorview')), 'employeeoperatorview') //雇员日常操作批退
const employeecommcialoperator = r => require.ensure([], () => r(require('@/views/EmployeeOperator/employeecommcialoperator')), 'employeecommcialoperator') //雇员日常操作办理页面

const employeespecialoperatorview = r => require.ensure([], () => r(require('@/views/EmployeeSpecialOperator/employeespecialoperatorview')), 'employeespecialoperatorview') //雇员特殊操作

const employeespecialprogress2  = r => require.ensure([], () => r(require('@/views/EmployeeSpecialOperator/employeespecialprogress2')), 'employeespecialprogress2') //雇员特殊操作查看进度
const employeespecialprogress3  = r => require.ensure([], () => r(require('@/views/EmployeeSpecialOperator/employeespecialprogress3')), 'employeespecialprogress3') //雇员特殊操作查看进度

const companytasklist = r => require.ensure([], () => r(require('@/views/CompanyTaskList/CompanyTaskList')), 'companytasklist') //企业任务单

const companytaskprogress2 = r => require.ensure([], () => r(require('@/views/CompanyTaskList/companytaskprogress2')), 'companytaskprogress2') //企业任务单2
const companytaskprogresstypeinfo = r => require.ensure([], () => r(require('@/views/CompanyTaskList/companytaskprogresstypeinfo')), 'companytaskprogresstypeinfo') //企业任务单输入信息
const companytaskprogresstransferinfo = r => require.ensure([], () => r(require('@/views/CompanyTaskList/companytaskprogresstransferinfo')), 'companytaskprogresstransferinfo') //企业任务单转移操作
const companytaskprogresschangeinfo = r => require.ensure([], () => r(require('@/views/CompanyTaskList/companytaskprogresschangeinfo')), 'companytaskprogresschangeinfo') //企业任务单变更操作
const companytaskprogressendinfo = r => require.ensure([], () => r(require('@/views/CompanyTaskList/companytaskprogressendinfo')), 'companytaskprogressendinfo') //企业任务单终止操作

const companysocialsecuritymanage = r => require.ensure([], () => r(require('@/views/CompanySocialSecurityManage/CompanySocialSecurityManage')), 'companysocialsecuritymanage') //企业社保账户管理
const companysocialsecurity = r => require.ensure([], () => r(require('@/views/CompanySocialSecurityManage/companysocialsecurity')), 'companysocialsecurity') //企业社保账户信息
const companysocialsecurityprogress2 = r => require.ensure([], () => r(require('@/views/CompanySocialSecurityManage/companysocialsecurityprogress2')), 'companysocialsecurityprogress2') //企业社保账户信息2
const companysocialsecuritytypeinfo = r => require.ensure([], () => r(require('@/views/CompanySocialSecurityManage/companysocialsecuritytypeinfo')), 'companysocialsecuritytypeinfo') //企业社保账户信息输入信息
const companysocialsecuritychangeinfo = r => require.ensure([], () => r(require('@/views/CompanySocialSecurityManage/companysocialsecuritychangeinfo')), 'companysocialsecuritychangeinfo') //企业社保账户变更操作
const companysocialsecurityendinfo = r => require.ensure([], () => r(require('@/views/CompanySocialSecurityManage/companysocialsecurityendinfo')), 'companysocialsecurityendinfo') //企业社保账户终止操作

const socialsecurityreconcilate = r => require.ensure([], () => r(require('@/views/socialsecurityreconcilate/socialsecurityreconcilate')), 'socialsecurityreconcilate') //社保对账

const socialsecuritypay = r => require.ensure([], () => r(require('@/views/SocialSecurityPay/SocialSecurityPay')), 'socialsecuritypay') //社保支付
const paymentnotice = r => require.ensure([], () => r(require('@/views/SocialSecurityPay/paymentnotice')), 'paymentnotice') //查看付款通知书

const socialsecurityreport = r => require.ensure([], () => r(require('@/views/socialsecurityreport/socialsecurityreport')), 'socialsecurityreport') //社保报表

const yearbaseapplicate = r => require.ensure([], () => r(require('@/views/yearbaseapplicate/yearbaseapplicate')), 'yearbaseapplicate') //年度基数申报

const systemmanage = r => require.ensure([], () => r(require('@/views/systemmanage/systemmanage')), 'systemmanage') //系统管理

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
        }
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
