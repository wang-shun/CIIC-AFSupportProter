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
          用工信息
          <div slot="content">
            <employment-info :employmentInfo="employmentInfo"></employment-info>
          </div>
        </Panel>
        <Panel name="4">
          退工办理
          <div slot="content">
            <refuse-handle :refuseInfo="refuseInfo"></refuse-handle>
          </div>
        </Panel>
        <Panel name="5">
          退工备注
          <div slot="content">
            <refuse-notes :refuseNotesData="refuseNotesData"></refuse-notes>
          </div>
        </Panel>
        <Panel name="6">
          用工备注查看
          <div slot="content">
            <employment-notes-view :employmentViewData="employmentViewData"></employment-notes-view>
          </div>
        </Panel>
        <Panel name="8">
          档案备注查看
          <div slot="content">
            <file-notes-view :fileNotesViewData="fileNotesViewData"></file-notes-view>
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
  import customerInfo from "./common/DissCustomerInfo.vue"
  import employeeCompleteInfo from "./common/EmployeeCompleteInfo.vue"
  import employmentInfo from "./common/EmploymentInfo.vue"
  import refuseHandle from "./common/RefuseHandle.vue"
  import refuseNotes from "./common/RefuseNotes.vue"
  import employmentNotesView from "./common/EmploymentNotesView.vue"
  import materialsBorrowInfoView from "./common/MaterialsBorrowInfoView.vue"
  import fileNotesView from "./common/FileNotesView.vue"
  import employmentDataManagementTaskList from "./common/EmployeeHistoryTaskList.vue"
  import api from '../../api/employ_manage/hire_operator'

  export default {
    components: {customerInfo, employeeCompleteInfo, employmentInfo, refuseHandle, refuseNotes, employmentNotesView, materialsBorrowInfoView, fileNotesView, employmentDataManagementTaskList},
    data() {
      return {
        collapseInfo: [1, 2, 3, 4, 5, 6, 7, 8],
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
        employmentInfo: {
          actEmployDate: "",
          AFDate: "",
          employForm: "",
          handleType: "",
          employProperty: "",
          employMethod: "",
          employCommissioner: "",
          employNotes: ""
        },
        refuseInfo: {
          resignDate: "",
          firstInDate: "",
          endTypeValue: "",
          printDate: "",
          empCharacter: "",
          refuseFileDirectionValue: "",
          refuseFileDate: "",
          transferMethodValue: "",
          transferNotesValue: "",
          transferNotesAdd: "",
          templatorStoreDate: "",
          resignReason: "读取前道",
          fileCustodyIntention: "读取前道",
          refuseHandleDate: "",
          refuseFeedbackValue: "",
          refuseFeedbackDate: "",
          refuseOperator: "",
          UKeyBorrowDate: "",
          UKeyReturnDate: "",
          fileIndex: "",
          storeFilePlace: "",
          inStockDate: "",
          fileFeedback: "",
          employSuccess: "",
          feedbackNotes: "",
          companyGroupTransferDirectionValue: "",
          reservedFileNumber: "读取",
          storeFilePlaceAdd: "读取",
          fileNumber: "读取",
          storeCardState: "读取",
          handleType: "读取",
          isNetworkHandle: false,
          intermediaryFeedbackDate: "",
          resignMaterialDeliveryDate: "",
          LaborManualIsDeliverRefuserValue: "",
          matchEmployIndex: "",
          employeeId:this.$route.query.employeeId,
          companyId:this.$route.query.companyId,
          employmentId:this.$route.query.employmentId,
          empTaskId:this.$route.query.empTaskId,
          printDateR:false,
          resignMaterialDeliveryDateR:false
        },
        refuseNotesData: [],
        employmentViewData: [],
        MaterialsBorrowData: [],
        fileNotesViewData: [],

        historyTaskData: [
          {customerNumber: "001", customerName: "客户1", employDate: "2010-01-01", refuseDate: "2010-01-01"},
          {customerNumber: "001", customerName: "客户1", employDate: "2010-01-01", refuseDate: "2010-01-01"},
          {customerNumber: "002", customerName: "客户2", employDate: "2010-01-02", refuseDate: "2010-01-02"}
        ]
      }
    },
    async mounted() {

          let params = {idNum:this.$route.query.idNum,idCardType:this.$route.query.idCardType,empTaskId:this.$route.query.empTaskId,employeeId:this.$route.query.employeeId,companyId:this.$route.query.companyId,employmentId:this.$route.query.employmentId,remarkType:'3'}

          api.queryAmResignDetail(params).then(data=>{

            if(data.data.customerInfo){
             
                this.customerInfo = data.data.customerInfo;//客户信息
            }

            if(data.data.amEmpTaskBO){
                this.employeeInfo=data.data.amEmpTaskBO;//雇员信息
            }

            if(data.data.resignBO){
                this.refuseInfo=data.data.resignBO;//退工信息
                this.refuseInfo.empTaskId = this.$route.query.empTaskId;
                this.refuseInfo.employeeId = this.$route.query.employeeId;
                this.refuseInfo.companyId = this.$route.query.companyId;
                this.refuseInfo.employmentId = this.$route.query.employmentId;
        
            }else{
               this.refuseInfo.empTaskId = this.$route.query.empTaskId;
            }
            
            if(data.data.amRemarkBo){
               this.refuseNotesData = data.data.amRemarkBo.rows;//退工备注
            } 

            if(data.data.amRemarkBo1){
                this.employmentViewData = data.data.amRemarkBo1.rows;//用工备注
            }
            
            if(data.data.amRemarkBo2){
                 this.fileNotesViewData = data.data.amRemarkBo2.rows;//档案备注
            }
            
            if(data.data.amEmploymentBO){
                 this.employmentInfo = data.data.amEmploymentBO;
            }

          })
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      }
    }
  }
</script>
