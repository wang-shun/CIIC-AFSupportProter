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
    <Row justify="start" class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <Button type="primary" @click="goHandle">办理</Button>
        <Dropdown>
          <Button type="primary">
            打印
            <Icon type="arrow-down-b"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem v-for="(print, index) in printList" :key="index">{{print}}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Button type="primary" @click="exportXLS">导出XLS</Button>
        <Button type="primary" @click="isShowStockTitle = true">生成入库贴头</Button>
        <Button type="primary" @click="sendToFileMangement">递交档案处</Button>
      </Col>
    </Row>
    <Table border :columns="employmentColumns" :data="employmentData" class="mt20"></Table>
    <Table border :columns="searchResultColumns" :data="searchResultData" class="mt20"></Table>

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
        // 当中按钮操作
        printList: em_print,
        // 下半部分
        employmentColumns: [
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
          {title: '公司编码', key: 'companyNumber', align: 'center', width: 150,
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
          {title: '证件号', key: 'IdNumber', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.IdNumber),
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
          {title: '客服中心', key: 'serviceCenter', align: 'center', width: 250,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.serviceCenter),
              ]);
            }
          },
          {title: '公司特殊情况', key: 'companySpecialCase', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.companySpecialCase),
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
          {title: '预留档案编号', key: 'reservedFileNumber', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.reservedFileNumber),
              ]);
            }
          },
          {title: '用工反馈操作日期', key: 'feedbackOperationDate', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.feedbackOperationDate),
              ]);
            }
          },
          {title: '调档反馈', key: 'investigationFileFeedback', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.investigationFileFeedback),
              ]);
            }
          },
          {title: '调档反馈操作日期', key: 'investigationFileFeedbackDate', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.investigationFileFeedbackDate),
              ]);
            }
          },
        ],
        employmentData: [
          {employMethods: '', employProperty: '', index: '', companyNumber: '101', companyName: '客户1', employeeNumber: '10001', employeeName: '雇员1', IdNumber: '', serviceManager: '', serviceCenter: '大客户', companySpecialCase: '', fileNumber: '', reservedFileNumber: '', feedbackOperationDate: '', investigationFileFeedback: '', investigationFileFeedbackDate: ''},
          {employMethods: '', employProperty: '', index: '', companyNumber: '102', companyName: '客户2', employeeNumber: '10002', employeeName: '雇员2', IdNumber: '', serviceManager: '', serviceCenter: '日本', companySpecialCase: '', fileNumber: '', reservedFileNumber: '', feedbackOperationDate: '', investigationFileFeedback: '', investigationFileFeedbackDate: ''},
          {employMethods: '', employProperty: '', index: '', companyNumber: '101', companyName: '客户1', employeeNumber: '10003', employeeName: '雇员3', IdNumber: '', serviceManager: '', serviceCenter: '虹桥', companySpecialCase: '', fileNumber: '', reservedFileNumber: '', feedbackOperationDate: '', investigationFileFeedback: '', investigationFileFeedbackDate: ''},
          {employMethods: '', employProperty: '', index: '', companyNumber: '101', companyName: '客户1', employeeNumber: '10004', employeeName: '雇员4', IdNumber: '', serviceManager: '', serviceCenter: '浦东', companySpecialCase: '', fileNumber: '', reservedFileNumber: '', feedbackOperationDate: '', investigationFileFeedback: '', investigationFileFeedbackDate: ''},
          {employMethods: '', employProperty: '', index: '', companyNumber: '102', companyName: '客户2', employeeNumber: '10005', employeeName: '雇员5', IdNumber: '', serviceManager: '', serviceCenter: '浦东', companySpecialCase: '', fileNumber: '', reservedFileNumber: '', feedbackOperationDate: '', investigationFileFeedback: '', investigationFileFeedbackDate: ''},
          {employMethods: '', employProperty: '', index: '', companyNumber: '102', companyName: '客户2', employeeNumber: '10005', employeeName: '雇员5', IdNumber: '', serviceManager: '', serviceCenter: '浦东', companySpecialCase: '', fileNumber: '', reservedFileNumber: '', feedbackOperationDate: '', investigationFileFeedback: '', investigationFileFeedbackDate: ''},
        ],

        searchResultColumns: [
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
        searchResultData: [
          {noSign: '6', FFinished: '77', employSuccess: '69', employFailed: '4', employCancel: '6', other: '76', amount: '550'},
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
        this.$router.push({name: "employHandleEmployment"});
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
