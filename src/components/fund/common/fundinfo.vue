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
          {title: '变更类型', key: 'changeType', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.changeType),
              ]);
            }
          },
          {title: '汇缴类型', key: 'payType', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.payType),
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
          {title: '金额', key: 'price', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.price),
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
