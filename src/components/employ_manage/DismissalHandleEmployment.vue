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
            <refuse-handle :refuseInfo="refuseInfo" ></refuse-handle>
          </div>
        </Panel>
        <Panel name="5">
          退档日期操作区域
          <div slot="content">
            <return-doc-date :refuseInfo="refuseInfo" ></return-doc-date>
          </div>
        </Panel>
        <Panel name="6">
          寄信办理
          <div slot="content">
            <send :refuseInfo="refuseInfo" ></send>
          </div>
        </Panel>
        <Panel name="7">
          退工备注
          <div slot="content">
            <refuse-notes :refuseNotesData="refuseNotesData" :userInfo="userInfo"></refuse-notes>
          </div>
        </Panel>
        <Panel name="8">
          用工备注查看
          <div slot="content">
            <employment-notes-view :employmentViewData="employmentViewData"></employment-notes-view>
          </div>
        </Panel>
        <Panel name="9">
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
  import send from "./common/Send.vue"
  import returnDocDate from "./common/ReturnDocDate.vue"
  import refuseNotes from "./common/RefuseNotes.vue"
  import employmentNotesView from "./common/EmploymentNotesView.vue"
  import materialsBorrowInfoView from "./common/MaterialsBorrowInfoView.vue"
  import fileNotesView from "./common/FileNotesView.vue"
  import employmentDataManagementTaskList from "./common/EmployeeHistoryTaskList.vue"
  import api from '../../api/employ_manage/hire_operator'

  export default {
    components: {customerInfo, employeeCompleteInfo, employmentInfo, refuseHandle, send,returnDocDate, refuseNotes, employmentNotesView, materialsBorrowInfoView, fileNotesView, employmentDataManagementTaskList},
    data() {
      return {
        collapseInfo: [1, 2, 3, 4, 5, 6, 7, 8,9],
        customerInfo: {
          serviceCenter: "",
          customerNumber: "",
          customerName: "",
          servicer: "",
          centerServicer: "",
          employeeServicer: "",
          serviceManager: ""
        },
        employeeInfo: {
          employeeNumber: "",
          employeeName: "",
          sex: "",
          phoneNumber: "",
          accountAddress: "",
          firstInCiicDate: "",
          contractStartDate: "",
          contractEndDate: "",
          firstContractEffectiveDate: "",
          position: "",
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
          post: 0,
          oldResignFeedback: "",
          resignFeedback: "",
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
          resignMaterialDeliveryDateR:false,
          returnDocDate:"",
          returnDocMan:""
        },
        returnDoc:{
          returnDocDate:"",
          returnDocMan:""
        },
        refuseNotesData: [],
        employmentViewData: [],
        MaterialsBorrowData: [],
        fileNotesViewData: [],
        userInfo:{
          userName:''
        }
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
                if(this.refuseInfo.printDate == '' || this.refuseInfo.printDate == undefined){
                  let d = new Date();
                  this.refuseInfo.printDate = d;
                }
                if(data.data.resignBO.returnDocDate){
                   
                }else{
                  data.data.resignBO.returnDocDate = "";
                }

            }else{
               this.refuseInfo.empTaskId = this.$route.query.empTaskId;
            }

            if(data.data.amRemarkBo){
               this.refuseNotesData = data.data.amRemarkBo;//退工备注
            }

            if(data.data.amRemarkBo1){
                this.employmentViewData = data.data.amRemarkBo1;//用工备注
            }

            if(data.data.amRemarkBo2){
                 this.fileNotesViewData = data.data.amRemarkBo2;//档案备注
            }

            if(data.data.amEmploymentBO){
                 this.employmentInfo = data.data.amEmploymentBO;
            }

            if(data.data.userInfo){
                this.userInfo = data.data.userInfo;
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
