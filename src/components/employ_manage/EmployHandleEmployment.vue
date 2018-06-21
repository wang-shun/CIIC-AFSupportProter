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
            <employment-handle :handleInfo="handleInfo" :handleInfoMaterial="materialHandleInfo"></employment-handle>
          </div>
        </Panel>
        <Panel name="5">
          用工备注 
          <div slot="content">
            <employment-notes :notesData="notesData" :userInfo="userInfo"></employment-notes>
          </div>
        </Panel>
        <Panel name="6">
          用工材料办理
          <div slot="content">
            <employment-materials-handle :handleInfo="materialHandleInfo"></employment-materials-handle>
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
          IdNumber: "",
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
          companySpecialCase: "",
          mailContinueStr:""
        },
        employmentMaterial: {
          submitName: "",
          phone: "",
          materialsData: [],
          reasonValue: "",
          reasonList: []
        },
        handleInfo: {
          employDate: '',
          openAfDate: '',
          employStyle: '',
          handleType: '',
          employProperty: '',
          employWay: '',
          employOperateMan: '',
          employeeId:this.$route.query.employeeId,
          companyId:this.$route.query.companyId,
          empTaskId:this.$route.query.empTaskId
        },
        notesData: [],
        materialHandleInfo: {
          employee: '',
          idNum: '',
          formAdvance: '',
          yuliuDocType: '',
          yuliuDocNum: '',
          docType: '',
          docNum: '',
          docSeqList: [],
          docSeqList2: [],
          oldYuLiuType: '',
          oldYuLiuNum: 0,
          oldType: '',
          oldNum: 0,
          archivePlace: '',
          archivePlaceAdditional: '',
          archiveCardState: '',
          docCode:'',
          docFrom:'',
          employFeedback:'',
          employFeedbackOptDate:this.$utils.formatDate(new Date(), 'YYYY-MM-DD'),
          diaodangFeedback:'',
          diaodangFeedbackOptDate:this.$utils.formatDate(new Date(), 'YYYY-MM-DD'),
          ukeyBorrowDate:'',
          ukeyReturnDate:'',
          hukouCode:'',
          employDocPaymentTo:'',
          storageDate:this.$utils.formatDate(new Date(), 'YYYY-MM-DD'),
          employWay: '',
          employOperateMan: '',
          employeeId:this.$route.query.employeeId,
          companyId:this.$route.query.companyId,
          employmentId:'',
          end:false
        },
        historyTaskData: [],
        userInfo:{
          userName:''
        }
      }
    },
    async mounted() {
         
          let params = {idNum:this.$route.query.idNum,idCardType:this.$route.query.idCardType,empTaskId:this.$route.query.empTaskId,employeeId:this.$route.query.employeeId,companyId:this.$route.query.companyId,remarkType:'1'}

          api.employeeDetailInfoQuery(params).then(data=>{

              if(data.data.amEmpTaskBO){
                  this.employeeInfo=data.data.amEmpTaskBO;
              }

              if(data.data.customerInfo){
                this.customerInfo = data.data.customerInfo;
              }
              
              if(data.data.amMaterialBO){
                  this.employmentMaterial = data.data.amMaterialBO;
              }
             
              if(data.data.amEmploymentBO){
                  this.handleInfo = data.data.amEmploymentBO;
              }
             
              if(data.data.amRemarkBo){
                   this.notesData = data.data.amRemarkBo.rows;
              }

              if(data.data.amArchaiveBo){
                 this.materialHandleInfo = data.data.amArchaiveBo;
                 this.materialHandleInfo.defaultC ='0';

                 // 记录原有的 档案编号 和 类型
                this.materialHandleInfo.oldYuLiuType = data.data.amArchaiveBo.yuliuDocType;
                this.materialHandleInfo.oldYuLiuNum = data.data.amArchaiveBo.yuliuDocNum;
                this.materialHandleInfo.oldType = data.data.amArchaiveBo.docType;
                this.materialHandleInfo.oldNum = data.data.amArchaiveBo.docNum;

                if(this.materialHandleInfo.formAdvance == true){
                   // 雇员名称和身份证
                  this.materialHandleInfo.employeeName = this.employeeInfo.employeeName;
                  this.materialHandleInfo.idNum = this.employeeInfo.IdNumber;
                  this.materialHandleInfo.docFrom = this.data.data.amArchaiveBo.docFrom;
                  this.materialHandleInfo.archivePlace = this.data.data.amArchaiveBo.archivePlace;
                  console.info(this.materialHandleInfo);
                }
              }

              if(data.data.company){
                 this.customerInfo = data.data.company;
              }

              if(data.data.amEmploymentBO){
                  this.materialHandleInfo.employmentId=data.data.amEmploymentBO.employmentId;
              }

              if(data.data.userInfo){
                this.userInfo = data.data.userInfo;
              }

              this.materialHandleInfo.docSeqList = data.data.docSeqList;
              this.materialHandleInfo.docSeqList2 = data.data.docSeqList2;
                 
          })
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
       instance() {
        return;
      }
    }
  }
</script>
