<template>
  <Form label-width=150>
    <Row type="flex" justify="start">
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" v-if="isBasicFund">
        <Form-item label="基本公积金账号：">
          <Input v-model="fund.account" placeholder="请输入..."></Input>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" v-else>
        <Form-item label="补充公积金账号：">
          <Input v-model="fund.account" placeholder="请输入..."></Input>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" v-if="isBasicFund">
        <Form-item label="基本公积金状态：">
          <label>{{fund.status}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" v-else>
        <Form-item label="补充公积金状态：">
          <label>{{fund.status}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="实际转入日期：">
          <label>{{fund.actTurnIn}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="实际转出日期：">
          <label>{{fund.actTurnOut}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="缴纳至月份：">
          <label>{{fund.payEndMonth}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="缴费基数：">
          <label>{{fund.payBaseLine}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="缴费金额：">
          <label>{{fund.price}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="缴费比例：">
          <label>{{fund.payPercent}}</label>
        </Form-item>
      </Col>
    </Row>
    <Row>
      <Col :sm="{span: 24}">
        <Table border class="mt20" :columns="fundColumns" :data="fundInfo.fundData"></Table>
      </Col>
    </Row>
  </Form>
</template>
<script>
  export default {
    props: {
      fundInfo: {
        type: Object,
        default() {
          return {}
        }
      },
      isBasicFund: {
        type: Boolean,
        default() {
          return true
        }
      }
    },
    data() {
      return {
        fundColumns: [
          {title: '任务类型', key: 'taskType', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.taskType),
              ]);
            }
          },
          {title: '基数', key: 'baseline', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.baseline),
              ]);
            }
          },
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
          {title: '缴费金额', key: 'price', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.price),
              ]);
            }
          },
          {title: '缴费比例', key: 'percent', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.percent),
              ]);
            }
          },
        ]
      }
    },
    computed: {
      fund() {
        return this.fundInfo
      }
    },
  }
</script>
