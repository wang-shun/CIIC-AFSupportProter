<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        导入批次
        <div slot="content">
          <Table border class="mt20" :columns="inputBatchColumns" :data="data.employeeFundData"></Table>
          <Page :total="100" show-sizer show-elevator></Page>
        </div>
      </Panel>
    </Collapse>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import EventTypes from '../../../store/EventTypes'

  export default {
    data() {
      return {
        collapseInfo: [1], //展开栏
        inputBatchColumns: [
          {title: '导入操作人', key: 'importOperator', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.importOperator),
              ]);
            }
          },
          {title: '导入时间', key: 'importTime', align: 'center', width: 350,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.importTime),
              ]);
            }
          },
          {title: '导入总数', key: 'importCount', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.importCount),
              ]);
            }
          },
          {title: '导入成功总数', key: 'importSuccessCount', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.importSuccessCount),
              ]);
            }
          },
          {title: '导入失败总数', key: 'importFailCount', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.importFailCount),
              ]);
            }
          },
          {title: '', key: 'importDetail', align: 'center', width: 120,
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
        inputBatchData: [
          {importOperator: '王XX', importTime: '', importCount: '80', importSuccessCount: '70', importFailCount: '10', importDetail: ''},
          {importOperator: '王XX', importTime: '', importCount: '80', importSuccessCount: '70', importFailCount: '10', importDetail: ''},
          {importOperator: '王XX', importTime: '', importCount: '80', importSuccessCount: '70', importFailCount: '10', importDetail: ''},
          {importOperator: '王XX', importTime: '', importCount: '80', importSuccessCount: '70', importFailCount: '10', importDetail: ''}
        ],

        inputDetailColumns: [
          {title: '公司编码', key: 'companyNumber', align: 'center', width: 150,
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
          {title: '雇员编码', key: 'employeeNumber', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.employeeNumber),
              ]);
            }
          },
          {title: '雇员姓名', key: 'employeeName', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.employeeName),
              ]);
            }
          },
          {title: '证件号', key: 'idNumber', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.idNumber),
              ]);
            }
          },
          {title: '基本公积金账号', key: 'basicFundAccount', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.basicFundAccount),
              ]);
            }
          },
          {title: '补充公积金账号', key: 'addFundAccount', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.addFundAccount),
              ]);
            }
          },
          {title: '导入结果', key: 'importResult', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.importResult),
              ]);
            }
          }
        ],
        inputDetailData: [
          {companyNumber: '', companyName: '客户1', employeeNumber: '10001', employeeName: '雇员1', idNumber: '', basicFundAccount: '10001***', addFundAccount: '10001***', importResult: '成功'},
          {companyNumber: '', companyName: '客户2', employeeNumber: '10002', employeeName: '雇员2', idNumber: '', basicFundAccount: '10001***', addFundAccount: '10001***', importResult: '成功'},
          {companyNumber: '', companyName: '客户1', employeeNumber: '10003', employeeName: '雇员3', idNumber: '', basicFundAccount: '10001***', addFundAccount: '10001***', importResult: '成功'},
          {companyNumber: '', companyName: '客户2', employeeNumber: '10004', employeeName: '雇员5', idNumber: '', basicFundAccount: '10001***', addFundAccount: '10001***', importResult: '成功'},
          {companyNumber: '', companyName: '客户2', employeeNumber: '10005', employeeName: '雇员6', idNumber: '', basicFundAccount: '10001***', addFundAccount: '10001***', importResult: '成功'},
          {companyNumber: '', companyName: '客户2', employeeNumber: '10007', employeeName: '雇员6', idNumber: '', basicFundAccount: '10001***', addFundAccount: '10001***', importResult: '成功'},
          {companyNumber: '', companyName: '客户2', employeeNumber: '10008', employeeName: '雇员6', idNumber: '', basicFundAccount: '10001***', addFundAccount: '10001***', importResult: '成功'},
        ]
      }
    },
    mounted() {
//      this[EventTypes.EMPLOYEEFUNDSEARCHTYPE]()
    },
    computed: {
//      ...mapState('employeeFundSearch', {
//        data: state => state.data
//      })
    },
    methods: {
//      ...mapActions('employeeFundSearch', [EventTypes.EMPLOYEEFUNDSEARCHTYPE]),
    }
  }
</script>
