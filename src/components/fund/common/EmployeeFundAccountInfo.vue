<template>
  <Form label-width=150>
    <Row type="flex" justify="start">
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="雇员编号：">
          <label>{{employeeFundAccountInfo.employeeNumber}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="雇员姓名：">
          <label>{{employeeFundAccountInfo.employeeName}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="证件号码：">
          <label>{{employeeFundAccountInfo.IdNumber}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="入职日期：">
          <label>{{employeeFundAccountInfo.checkInDate}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="企业公积金账号分类：">
          <label>{{employeeFundAccountInfo.companyFundAccountType}}</label>
        </Form-item>
      </Col>
    </Row>
    <Row>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="基本公积金账号：">
          <label>{{employeeFundAccountInfo.basicFundAccount}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="基本公积金状态：">
          <label>{{employeeFundAccountInfo.basicFundStatus}}</label>
        </Form-item>
      </Col>
    </Row>
    <Row>
      <Col :sm="{span: 24}">
        <Table border :columns="fundColumns" :data="employeeFundAccountInfo.basicFundData"></Table>
      </Col>
    </Row>
    <Row class="mt20">
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="补充公积金账号：">
          <label>{{employeeFundAccountInfo.addFundAccount}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="补充公积金状态：">
          <label>{{employeeFundAccountInfo.addFundStatus}}</label>
        </Form-item>
      </Col>
    </Row>
    <Row>
      <Col :sm="{span: 24}">
        <Table border :columns="fundColumns" :data="employeeFundAccountInfo.addFundData"></Table>
      </Col>
    </Row>
  </Form>
</template>
<script>
  export default {
    props: {
      employeeFundInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        fundColumns: [
          {title: '起缴年月', key: 'startPayDate', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.startPayDate),
              ]);
            }
          },
          {title: '截至年月', key: 'endPayDate', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.endPayDate),
              ]);
            }
          },
          {title: '客户汇缴年月', key: 'customerPayDate', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.customerPayDate),
              ]);
            }
          },
          {title: '基数', key: 'basic', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.basic),
              ]);
            }
          },
          {title: '比例', key: 'percent', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.percent),
              ]);
            }
          },
          {title: '金额', key: 'price', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.price),
              ]);
            }
          }
        ],
      }
    },
    computed: {
      employeeFundAccountInfo() {
        return this.employeeFundInfo
      }
    },
  }
</script>
