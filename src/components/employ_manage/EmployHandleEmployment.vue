<template>
  <div>
    <div class="smList">
      <Row type="flex" justify="start" class="mt20 mb20">
        <Col :sm="{span: 24}" class="tr">
          <Button type="warning" @click="goBack">返回</Button>
        </Col>
      </Row>
      <Collapse v-model="collapseInfo">
        <Panel name="1">
          客户信息
          <div slot="content">
            <customer-info :customerInfo="customerInfo"></customer-info>
          </div>
        </Panel>
        <Panel name="2">
          雇员信息
          <div slot="content">
            <employee-complete-info :employeeInfo="employeeInfo"></employee-complete-info>
          </div>
        </Panel>
        <Panel name="3">
          用工材料签收
          <div slot="content">
            <employment-materials-sign :materialsInfo="employmentMaterial" @on-back="goBack"></employment-materials-sign>
          </div>
        </Panel>
        <Panel name="4">
          用工办理
          <div slot="content">
            <employment-handle :handleInfo="handleInfo"></employment-handle>
          </div>
        </Panel>
        <Panel name="5">
          用工备注
          <div slot="content">
            <employment-notes :notesData="notesData"></employment-notes>
          </div>
        </Panel>
        <Panel name="6">
          用工材料办理
          <div slot="content">
            <employment-materials-handle :handleInfo="materialHandleInfo"></employment-materials-handle>
          </div>
        </Panel>
        <Panel name="7">
          雇员历史任务单
          <div slot="content">
            <employment-data-management-task-list :historyTaskData="historyTaskData"></employment-data-management-task-list>
          </div>
        </Panel>
      </Collapse>
      <Row type="flex" justify="start" class="mt20 mb20">
        <Col :sm="{span: 24}" class="tr">
          <Button type="warning" @click="goBack">返回</Button>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
  import customerInfo from "./common/CustomerInfo.vue"
  import employeeCompleteInfo from "./common/EmployeeCompleteInfo.vue"
  import employmentMaterialsSign from "./common/EmploymentMaterialsSign.vue"
  import employmentHandle from "./common/EmploymentHandle.vue"
  import employmentNotes from "./common/EmploymentNotes.vue"
  import employmentMaterialsHandle from "./common/EmploymentMaterialsHandle.vue"
  import employmentDataManagementTaskList from "./common/EmployeeHistoryTaskList.vue"
  import api from '../../api/employ_manage/hire_operator'

  export default {
    components: {customerInfo, employeeCompleteInfo, employmentMaterialsSign, employmentHandle, employmentNotes, employmentMaterialsHandle, employmentDataManagementTaskList},
    data() {
      return {
        collapseInfo: [1, 2, 3, 4, 5, 6, 7],
        customerInfo: {
          serviceCenter: "浦东",
          customerNumber: "340078",
          customerName: "上海XX信息技术有限公司",
          servicer: "李XX",
          centerServicer: "李XX",
          employeeServicer: "李XX",
          serviceManager: "王XX"
        },
        employeeInfo: {
          employeeNumber: "GY0001",
          employeeName: "张三",
          IdNumber: "35220219781124114",
          sex: "男",
          phoneNumber: "GY0001",
          accountAddress: "XXX路X号xxx",
          firstInCiicDate: "2014-3-3",
          contractStartDate: "2014-3-3",
          contractEndDate: "2014-3-3",
          firstContractEffectiveDate: "2014-3-3",
          position: "司机",
          isUnlimitedContract: "",
          unitProperty: "",
          sendCondemnationYears: "",
          useWorkProperty: "",
          fileFee: "",
          personProperty: "",
          fileDirection: "",
          companySSAccountRepairDate: "",
          companySSPayArea: "",
          SSProperty: "",
          companySSNumber: "",
          orgenaizeNumber: "",
          UKeyState: "",
          UKeyNumber: "",
          UKeyPasswordD: "",
          UKeyPasswordF: "",
          companySpecialCase: ""
        },
        employmentMaterial: {
          materialCommiter: "XXX",
          extNumber: "7894",
          materialsData: [],
          reasonValue: "",
          reasonList: []
        },
        handleInfo: {
          actEmployDate: "",
          FDate: "",
          employmentFormValue: "",
          handleTypeValue: "",
          employmentPropertyValue: "",
          employmentMethodValue: "",
          employmentCommissioner: ""
        },
        notesData: [],
        materialHandleInfo: {
          reservedFileNumberValue: "",
          fileNumberValue: "",
          filePlaceValue: "",
          filePlaceAddValue: "",
          placeStateValue: "",
          fileNumber: "",
          fileOriginValue: "",
          employFeedbackValue: "",
          employFeedbackDate: "",
          transferFeedbackValue: "",
          transferFeedbackDate: "",
          UKeyBorrowDate: "",
          UKeyFeedbackDate: "",
          accountNumber: "",
          employFilePayDate: "",
          inStockDate: "",
          employHandleEnd: false
        },
        historyTaskData: [
          {customerNumber: "001", customerName: "客户1", employDate: "2010-01-01", refuseDate: "2010-01-01"},
          {customerNumber: "001", customerName: "客户1", employDate: "2010-01-01", refuseDate: "2010-01-01"},
          {customerNumber: "002", customerName: "客户2", employDate: "2010-01-02", refuseDate: "2010-01-02"}
        ]
      }
    },
    async mounted() {
          
          let params = {employeeId:this.$route.query.employeeId,companyId:this.$route.query.companyId}

          api.employeeDetailInfoQuery(params).then(data=>{
              
              this.employeeInfo=data.data.amEmploymentBO;
              
              this.employmentMaterial.materialsData = data.data.materialList.rows;

              
          })
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
       instance() {
      alert('sdfdd');return;
      }
    }
  }
</script>
