<template>
  <div>
    <div class="smList">
      <Collapse v-model="collapseInfo">
        <Panel name="1">
          用工资料管理任务单
          <div slot="content">
            <search-employment @on-search="searchEmploiees"></search-employment>
          </div>
        </Panel>
      </Collapse>
    </div>
    <Row type="flex" justify="start" class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <Button type="primary" @click="goHandle">档案办理</Button>
        <Button type="primary">批量操作</Button>
        <Button type="info" @click="exportXLS">导出XLS</Button>
        <Button type="primary" @click="goFileMatrialsUseAndBorrow">档案材料利用与借出</Button>
        <Button type="primary" @click="isShowStockTitle = true">生成入库贴头</Button>
        <Dropdown>
          <Button type="primary">
            退工单打印
            <Icon type="arrow-down-b"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem>打印(套打)</DropdownItem>
            <DropdownItem>打印2(打印一式四联)</DropdownItem>
            <DropdownItem>外来从业人员打印</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Col>
    </Row>
    <Table border :columns="recordComprehensiveHandlingColumns" :data="recordComprehensiveHandlingData" class="mt20"></Table>
    <Table border :columns="searchResultColumns1" :data="searchResultData1" class="mt20"></Table>
    <Table border :columns="searchResultColumns2" :data="searchResultData2" class="mt20"></Table>

    <Modal
      v-model="isShowStockTitle"
      title="生成入库贴头"
    >
      <employee-info :customerInfo="info" v-for="(info, index) in customerInfos" :key="index" :style="{borderBottom: index !== customerInfos.length - 1 ? '1px solid #ccc' : '', marginBottom: index !== customerInfos.length - 1 ? '20px' : ''}"></employee-info>
      <div slot="footer">
        <Button type="primary" @click="isShowStockTitle = false;">生成入库贴头</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import {em_print, customerInfo} from "../../assets/js/employ_manage/common_filed"
  import searchEmployment from "./common/SearchEmployment.vue"
  import employeeInfo from "./common/EmployeeInfo.vue"

  export default {
    components: {employeeInfo, searchEmployment},
    data() {
      return {
        collapseInfo: [1],
        // 下半部分
        recordComprehensiveHandlingColumns: [
          {title: '', type: 'selection', width: 60},
          {title: '用工方式', key: 'employMethods', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.employMethods),
              ]);
            }
          },
          {title: '用工属性', key: 'employProperty', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.employProperty),
              ]);
            }
          },
          {title: '序号', key: 'index', align: 'center', width: 100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.index),
              ]);
            }
          },
          {title: '职介反馈日期', key: 'intermediaryFeedbackDate', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.intermediaryFeedbackDate),
              ]);
            }
          },
          {title: '退工原因', key: 'refuseReason', align: 'center', width: 250,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.refuseReason),
              ]);
            }
          },
          {title: '用工属性', key: 'employProperty', align: 'center', width: 100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.employProperty),
              ]);
            }
          },
          {title: '办理类型', key: 'handleType', align: 'center', width: 100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.handleType),
              ]);
            }
          },
          {title: '雇员编号', key: 'employeeNumber', align: 'center', width: 150,
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
          {title: '身份证号码', key: 'IdNumber', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.IdNumber),
              ]);
            }
          },
          {title: '客户编号', key: 'companyNumber', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.companyNumber),
              ]);
            }
          },
          {title: '公司名称', key: 'companyName', align: 'center', width: 250,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.companyName),
              ]);
            }
          },
          {title: '客服经理', key: 'serviceManager', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.serviceManager),
              ]);
            }
          },
          {title: '客服中心', key: 'serviceCenter', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.serviceCenter),
              ]);
            }
          },
          {title: '档案编号', key: 'fileNumber', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.fileNumber),
              ]);
            }
          },
          {title: '预留档案编号', key: 'resveredFileNumber', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.resveredFileNumber),
              ]);
            }
          },
          {title: '存档地', key: 'place', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.place),
              ]);
            }
          },
          {title: '实际录用日期', key: 'actEmployDate', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.actEmployDate),
              ]);
            }
          },
          {title: '退工日期', key: 'refuseDate', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.refuseDate),
              ]);
            }
          },
          {title: '出库日期', key: 'outStockDate', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.outStockDate),
              ]);
            }
          },
          {title: '用工反馈', key: 'employFeedback', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.employFeedback),
              ]);
            }
          },
          {title: '退工反馈', key: 'refuseFeedback', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.refuseFeedback),
              ]);
            }
          },
          {title: '退工反馈2', key: 'refuseFeedback2', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.refuseFeedback2),
              ]);
            }
          },
          {title: '用工反馈2', key: 'employFeedback2', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.employFeedback2),
              ]);
            }
          },
          {title: '退档日期', key: 'refuseFileDate', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.refuseFileDate),
              ]);
            }
          },
          {title: '退工送办日期', key: 'refuseSendHandleDate', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.refuseSendHandleDate),
              ]);
            }
          },
          {title: '公司特殊情况', key: 'companySpecialCase', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.companySpecialCase),
              ]);
            }
          }
        ],
        recordComprehensiveHandlingData: [
          {employMethods: "", employProperty: "", index: "", intermediaryFeedbackDate: "", refuseReason: "", employProperty: "", handleType: "", employeeNumber: "10001", employeeName: "雇员1", IdNumber: "", companyNumber: "101", companyName: "客户1", serviceManager: "", serviceCenter: "大客户", fileNumber: "", resveredFileNumber: "", place: "", actEmployDate: "", refuseDate: "", outStockDate: "", employFeedback: "", refuseFileDate: "", refuseSendHandleDate: "", companySpecialCase: ""},
          {employMethods: "", employProperty: "", index: "", intermediaryFeedbackDate: "", refuseReason: "", employProperty: "", handleType: "", employeeNumber: "10002", employeeName: "雇员2", IdNumber: "", companyNumber: "102", companyName: "客户2", serviceManager: "", serviceCenter: "日本", fileNumber: "", resveredFileNumber: "", place: "", actEmployDate: "", refuseDate: "", outStockDate: "", employFeedback: "", refuseFileDate: "", refuseSendHandleDate: "", companySpecialCase: ""},
          {employMethods: "", employProperty: "", index: "", intermediaryFeedbackDate: "", refuseReason: "", employProperty: "", handleType: "", employeeNumber: "10003", employeeName: "雇员3", IdNumber: "", companyNumber: "101", companyName: "客户1", serviceManager: "", serviceCenter: "虹桥", fileNumber: "", resveredFileNumber: "", place: "", actEmployDate: "", refuseDate: "", outStockDate: "", employFeedback: "", refuseFileDate: "", refuseSendHandleDate: "", companySpecialCase: ""},
          {employMethods: "", employProperty: "", index: "", intermediaryFeedbackDate: "", refuseReason: "", employProperty: "", handleType: "", employeeNumber: "10004", employeeName: "雇员4", IdNumber: "", companyNumber: "102", companyName: "客户1", serviceManager: "", serviceCenter: "浦东", fileNumber: "", resveredFileNumber: "", place: "", actEmployDate: "", refuseDate: "", outStockDate: "", employFeedback: "", refuseFileDate: "", refuseSendHandleDate: "", companySpecialCase: ""},
          {employMethods: "", employProperty: "", index: "", intermediaryFeedbackDate: "", refuseReason: "", employProperty: "", handleType: "", employeeNumber: "10005", employeeName: "雇员5", IdNumber: "", companyNumber: "102", companyName: "客户2", serviceManager: "", serviceCenter: "浦东", fileNumber: "", resveredFileNumber: "", place: "", actEmployDate: "", refuseDate: "", outStockDate: "", employFeedback: "", refuseFileDate: "", refuseSendHandleDate: "", companySpecialCase: ""},
          {employMethods: "", employProperty: "", index: "", intermediaryFeedbackDate: "", refuseReason: "", employProperty: "", handleType: "", employeeNumber: "10006", employeeName: "雇员6", IdNumber: "", companyNumber: "102", companyName: "客户2", serviceManager: "", serviceCenter: "浦东", fileNumber: "", resveredFileNumber: "", place: "", actEmployDate: "", refuseDate: "", outStockDate: "", employFeedback: "", refuseFileDate: "", refuseSendHandleDate: "", companySpecialCase: ""},
          {employMethods: "", employProperty: "", index: "", intermediaryFeedbackDate: "", refuseReason: "", employProperty: "", handleType: "", employeeNumber: "10007", employeeName: "雇员7", IdNumber: "", companyNumber: "102", companyName: "客户2", serviceManager: "", serviceCenter: "徐汇", fileNumber: "", resveredFileNumber: "", place: "", actEmployDate: "", refuseDate: "", outStockDate: "", employFeedback: "", refuseFileDate: "", refuseSendHandleDate: "", companySpecialCase: ""},
          {employMethods: "", employProperty: "", index: "", intermediaryFeedbackDate: "", refuseReason: "", employProperty: "", handleType: "", employeeNumber: "10008", employeeName: "雇员8", IdNumber: "", companyNumber: "102", companyName: "客户2", serviceManager: "", serviceCenter: "徐汇", fileNumber: "", resveredFileNumber: "", place: "", actEmployDate: "", refuseDate: "", outStockDate: "", employFeedback: "", refuseFileDate: "", refuseSendHandleDate: "", companySpecialCase: ""},
        ],

        searchResultColumns1: [
          {title: '用工材料未签收', key: 'noSign', align: 'center', width: 220,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.noSign),
              ]);
            }
          },
          {title: '已开F单未完成', key: 'FFinished', align: 'center', width: 220,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.FFinished),
              ]);
            }
          },
          {title: '用工成功', key: 'employSuccess', align: 'center', width: 220,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.employSuccess),
              ]);
            }
          },
          {title: '用工失败', key: 'employFailed', align: 'center', width: 220,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.employFailed),
              ]);
            }
          },
          {title: '前道要求撤消用工', key: 'employCancel', align: 'center', width: 220,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.employCancel),
              ]);
            }
          },
          {title: '其他', key: 'other', align: 'center', width: 220,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.other),
              ]);
            }
          },
          {title: '总计', key: 'amount', align: 'center', width: 231,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.amount),
              ]);
            }
          }
        ],
        searchResultData1: [
          {noSign: '6', FFinished: '77', employSuccess: '69', employFailed: '4', employCancel: '6', other: '76', amount: '550'},
        ],

        searchResultColumns2: [
          {title: '未反馈', key: 'noFeedback', align: 'center', width: 220,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.noFeedback),
              ]);
            }
          },
          {title: '退工成功', key: 'refuseFinished', align: 'center', width: 220,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.refuseFinished),
              ]);
            }
          },
          {title: '档未到先退工', key: 'refuseBeforeWithFile', align: 'center', width: 220,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.refuseBeforeWithFile),
              ]);
            }
          },
          {title: '退工单盖章未返回', key: 'refuseTicketStampNoReturn', align: 'center', width: 220,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.refuseTicketStampNoReturn),
              ]);
            }
          },
          {title: '退工失败', key: 'refuseFailed', align: 'center', width: 220,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.refuseFailed),
              ]);
            }
          },
          {title: '前道要求批退', key: 'beforeBatchNeedRefuse', align: 'center', width: 220,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.beforeBatchNeedRefuse),
              ]);
            }
          },
          {title: '其他', key: 'other', align: 'center', width: 220,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.other),
              ]);
            }
          },
          {title: '总计', key: 'amount', align: 'center', width: 231,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.amount),
              ]);
            }
          }
        ],
        searchResultData2: [
          {noFeedback: '6', refuseFinished: '69', refuseBeforeWithFile: '4', refuseTicketStampNoReturn: '6', refuseFailed: '76', beforeBatchNeedRefuse: '5', other: '40', amount: '550'},
        ],

        // 弹出框
        isShowStockTitle: false,
        customerInfos: [customerInfo, customerInfo, customerInfo]
      }
    },
    mounted() {

    },
    methods: {
      searchEmploiees(conditions) {

      },
      goHandle() {
        this.$router.push({name: "recordComprehensive"});
      },
      goFileMatrialsUseAndBorrow() {
        this.$router.push({name: "fileMatrialsUseAndBorrow"})
      },
      exportXLS() {

      },
      generateInStock() {

      },
      sendToFileMangement() {

      }
    },
    computed: {

    }
  }
</script>
