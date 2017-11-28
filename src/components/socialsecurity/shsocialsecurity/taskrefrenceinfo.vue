<template>
  <Form :label-width=150 v-if="operatorType === '0'">
    <Row class="mt20" type="flex" justify="start">
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="开AF单日期：">
          <label>{{taskNewInfo.afDate}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="存档地：">
          <label>{{taskNewInfo.storePlace}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="用工状态：">
          <label>{{taskNewInfo.jobState}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="用工日期：">
          <label>{{taskNewInfo.jobDate}}</label>
        </Form-item>
      </Col>
    </Row>
    <Row>
      <Col :sm="{span: 13}">
        <Table border width="601" :columns="taskNewInfoColumns" :data="taskNewInfoData"></Table>
      </Col>
    </Row>
  </Form>
  <Form :label-width=150 v-else-if="operatorType === '1'">
    <Row class="mt20" type="flex" justify="start">
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="新社保缴费基数:">
          <label>{{taskChangeInfo.newPay}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="调整起始月份：">
          <label>{{taskChangeInfo.changeStartMonth}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="调整截至月份：">
          <label>{{taskChangeInfo.changeEndMonth}}</label>
        </Form-item>
      </Col>
    </Row>
  </Form>
  <Form :label-width=150 v-else>
    <Row class="mt20" type="flex" justify="start">
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="用工状态:">
          <label>{{taskOutInfo.state}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="离职日期：">
          <label>{{taskOutInfo.leaveDate}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="社保截止年月：">
          <label>{{taskOutInfo.socialSecurityEndDate}}</label>
        </Form-item>
      </Col>
    </Row>
  </Form>
</template>
<script>
  export default {
    name:"taskrefrenceinfo",
    props:{
      operatorType:{
        type: String
      },
      taskNewInfo: {
        type: Object,
        default() {
          return {}
        }
      },
      taskChangeInfo: {
        type: Object,
        default() {
          return {}
        }
      },
      taskOutInfo: {
        type: Object
      },
      taskNewInfoData: {
        type: Array
      }
    },
    data() {
      return {
        taskNewInfoColumns: [
          {title: '基数', key: 'base', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.base),
              ]);
            }
          },
          {title: '起缴月份', key: 'startMonth', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.startMonth),
              ]);
            }
          },
          {title: '截至月份', key: 'endYear', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.endYear),
              ]);
            }
          }
        ], //任务单参考信息 -- 新增
      }
    },
    mounted() {

    },
    computed: {

    },
    methods: {

    }
  }
</script>