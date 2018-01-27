<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        导入批次
        <div slot="content">
          <Table border class="mt20" :columns="inputBatchColumns" :data="data.inputBatchData"></Table>
          <Page :total="100" show-sizer show-elevator></Page>
        </div>
      </Panel>
      <Panel name="2">
        导入明细
        <div slot="content">
          <Table border class="mt20" :columns="inputDetailColumns" :data="data.inputDetailData"></Table>
          <Page :total="100" show-sizer show-elevator></Page>
      </div>
      </Panel>
    </Collapse>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import EventTypes from '../../../store/event_types'

  export default {
    data() {
      return {
        collapseInfo: [1, 2], //展开栏
        inputBatchColumns: [
          {title: '导入操作人', key: 'importOperator', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.importOperator),
              ]);
            }
          },
          {title: '导入时间', key: 'importTime', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.importTime),
              ]);
            }
          },
          {title: '导入总数', key: 'importCount', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.importCount),
              ]);
            }
          },
          {title: '导入成功总数', key: 'importSuccessCount', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.importSuccessCount),
              ]);
            }
          },
          {title: '导入失败总数', key: 'importFailCount', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.importFailCount),
              ]);
            }
          },
          {title: '操作', key: 'importDetail', align: 'center',
            render: (h, params) => {
              return h('div', [
                h('a', {
                  on: {
                    click: () => {

                    }
                  }
                }, '查看导入明细'),
              ]);
            }
          }
        ],

        inputDetailColumns: [
          {title: '客户编号', key: 'companyNumber', align: 'center', width: 190,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.companyNumber),
              ]);
            }
          },
          {title: '公司名称', key: 'companyName', align: 'center', width: 350,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.companyName),
              ]);
            }
          },
          {title: '雇员编码', key: 'employeeNumber', align: 'center', width: 190,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.employeeNumber),
              ]);
            }
          },
          {title: '雇员姓名', key: 'employeeName', align: 'center', width: 190,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.employeeName),
              ]);
            }
          },
          {title: '证件号', key: 'idNumber', align: 'center', width: 190,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.idNumber),
              ]);
            }
          },
          {title: '基本公积金账号', key: 'basicFundAccount', align: 'center', width: 190,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.basicFundAccount),
              ]);
            }
          },
          {title: '补充公积金账号', key: 'addFundAccount', align: 'center', width: 190,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.addFundAccount),
              ]);
            }
          },
          {title: '导入结果', key: 'importResult', align: 'center', width: 192,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.importResult),
              ]);
            }
          }
        ]
      }
    },
    mounted() {
      this[EventTypes.EMPLOYEEFUNDHISTORYTYPE]()
    },
    computed: {
      ...mapState('employeeFundHistory', {
        data: state => state.data
      })
    },
    methods: {
      ...mapActions('employeeFundHistory', [EventTypes.EMPLOYEEFUNDHISTORYTYPE]),
    }
  }
</script>
