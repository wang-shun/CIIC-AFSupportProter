/**
 * Created by huangye on 2018/6/20.
 */
const ipPrefix = process.env.LOCAL_URL

export default {
  'prod': {
    '1': {
      label: '销售中心',
      url: `${ipPrefix}/`,
      imgSrc: 'static/img/menu/sales_center.png',
      platformId: '1'
    },
    '2': {
      label: '外企内控中心',
      url: `${ipPrefix}/`,
      imgSrc: 'static/img/menu/foreign_control_center.png',
      platformId: '2'
    },
    '3': {
      label: '客服中心',
      url: `${ipPrefix}/`,
      imgSrc: 'static/img/menu/foreign_service_center.png',
      platformId: '3'
    },
    '4': {
      label: '代理中心',
      url: `${ipPrefix}/`,
      imgSrc: 'static/img/menu/proxy_center.png',
      platformId: '4'
    },
    '5': {
      label: '雇员中心',
      url: `${ipPrefix}/`,
      imgSrc: 'static/img/menu/foreign_employee_center.png',
      platformId: '5'
    },
    '6': {
      label: '外企支持中心',
      url: `${ipPrefix}/`,
      imgSrc: 'static/img/menu/foreign_support_center.png',
      platformId: '6'
    },
    '7': {
      label: '财务咨询业务中心',
      url: `${ipPrefix}/`,
      imgSrc: 'static/img/menu/finance_advisory_business_center.png',
      platformId: '7'
    },
    '8': {
      label: '报表中心',
      url: `#`,
      imgSrc: 'static/img/menu/finance_advisory_report_center.png',
      platformId: '8'
    },
    '9': {
      label: '财务咨询运营中心',
      url: `${ipPrefix}/`,
      imgSrc: 'static/img/menu/finance_advisory_operator_center.png',
      platformId: '9'
    },
    '10': {
      label: '服务外包业务中心',
      url: `${ipPrefix}/`,
      imgSrc: 'static/img/menu/service_outsourcing_business_center.png',
      platformId: '10'
    },
    '11': {
      label: '产品中心',
      url: `${ipPrefix}/`,
      imgSrc: 'static/img/menu/product_center.png',
      platformId: '11'
    },
    '12': {
      label: '账单中心',
      url: `${ipPrefix}/`,
      imgSrc: 'static/img/menu/bill_center.png',
      platformId: '12'
    },
    '13': {
      label: '结算中心',
      url: `${ipPrefix}/`,
      imgSrc: 'static/img/menu/settlement_center.png',
      platformId: '13'
    },
    '14': {
      label: '供应商管理中心',
      url: `${ipPrefix}/`,
      imgSrc: 'static/img/menu/supporter_manage_center.png',
      platformId: '14'
    },
    '15': {
      label: '商业智能中心',
      url: `#`,
      imgSrc: 'static/img/menu/business_intelligence_center.png',
      platformId: '15'
    }
  },
  'other': {
    '1': {
      label: '销售中心',
      url: `${ipPrefix}:8100/`,
      imgSrc: 'static/img/menu/sales_center.png',
      platformId: '1'
    },
    '2': {
      label: '外企内控中心',
      url: `${ipPrefix}:8107/`,
      imgSrc: 'static/img/menu/foreign_control_center.png',
      platformId: '2'
    },
    '3': {
      label: '客服中心',
      url: `${ipPrefix}:8103/`,
      imgSrc: 'static/img/menu/foreign_service_center.png',
      platformId: '3'
    },
    '4': {
      label: '代理中心',
      url: `${ipPrefix}:8109/`,
      imgSrc: 'static/img/menu/proxy_center.png',
      platformId: '4'
    },
    '5': {
      label: '雇员中心',
      url: `${ipPrefix}:8101/`,
      imgSrc: 'static/img/menu/foreign_employee_center.png',
      platformId: '5'
    },
    '6': {
      label: '外企支持中心',
      url: `${ipPrefix}:8108/`,
      imgSrc: 'static/img/menu/foreign_support_center.png',
      platformId: '6'
    },
    '7': {
      label: '财务咨询业务中心',
      url: `${ipPrefix}:8112/`,
      imgSrc: 'static/img/menu/finance_advisory_business_center.png',
      platformId: '7'
    },
    '8': {
      label: '报表中心',
      url: `#`,
      imgSrc: 'static/img/menu/finance_advisory_report_center.png',
      platformId: '8'
    },
    '9': {
      label: '财务咨询运营中心',
      url: `${ipPrefix}:8113/`,
      imgSrc: 'static/img/menu/finance_advisory_operator_center.png',
      platformId: '9'
    },
    '10': {
      label: '服务外包业务中心',
      url: `${ipPrefix}:8104/`,
      imgSrc: 'static/img/menu/service_outsourcing_business_center.png',
      platformId: '10'
    },
    '11': {
      label: '产品中心',
      url: `${ipPrefix}:8106/`,
      imgSrc: 'static/img/menu/product_center.png',
      platformId: '11'
    },
    '12': {
      label: '账单中心',
      url: `${ipPrefix}:8110/`,
      imgSrc: 'static/img/menu/bill_center.png',
      platformId: '12'
    },
    '13': {
      label: '结算中心',
      url: `${ipPrefix}:8111/`,
      imgSrc: 'static/img/menu/settlement_center.png',
      platformId: '13'
    },
    '14': {
      label: '供应商管理中心',
      url: `${ipPrefix}:8105/`,
      imgSrc: 'static/img/menu/supporter_manage_center.png',
      platformId: '14'
    },
    '15': {
      label: '商业智能中心',
      url: `#`,
      imgSrc: 'static/img/menu/business_intelligence_center.png',
      platformId: '15'
    }
  }
}
