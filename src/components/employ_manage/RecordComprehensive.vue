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
        <Panel name="13">
          用工资料信息
          <div slot="content">
            <use-handle :fileInfo1="fileInfo1" :fileInfo2="fileInfo2"></use-handle>
          </div>
        </Panel>
        <Panel name="4">
          退工信息
          <div slot="content">
            <refuse-handle :refuseInfo="refuseInfo"></refuse-handle>
          </div>
        </Panel>
        <Panel name="5">
          档案办理
          <div slot="content">
            <file-handle :fileInfo1="fileInfo1" :fileInfo2="fileInfo2"></file-handle>
          </div>
        </Panel>
        <Panel name="8">
          档案备注
          <div slot="content">
            <file-notes :fileNotesViewData="fileNotesViewData" :userInfo="userInfo"></file-notes>
          </div>
        </Panel>
        <Panel name="9">
          出库\寄信
          <div slot="content">
            <out-stock-and-mail :stockAndMailInfo="stockAndMailInfo"></out-stock-and-mail>
          </div>
        </Panel>
        <Panel name="10">
          档案结费
          <div slot="content">
            <file-settle :fileSettleInfo="fileSettleInfo"></file-settle>
          </div>
        </Panel>
        <Panel name="11">
          补调档案
          <div slot="content">
            <make-up-file :makeUpFileInfo="makeUpFileInfo"></make-up-file>
          </div>
        </Panel>
        <Panel name="12">
          退工归还材料签收
          <div slot="content">
            <refuse-return-materials-sign :refuseReturnMaterialsSignInfo="refuseReturnMaterialsSignInfo" :refuseReturnMaterials="refuseReturnMaterials"></refuse-return-materials-sign>
          </div>
        </Panel>
        <Panel name="14">
          工伤申报管理
          <div slot="content">
            <injury-report-manage :injuryReportManageInfo="injuryReportManageInfo" :fileInfo1="fileInfo1" :userInfo="userInfo"></injury-report-manage>
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
  import employmentInfo from "./common/EmploymentInfo.vue"
  import refuseHandle from "./common/RefuseHandleArchive.vue"
  import useHandle from "./common/UseHandleArchive.vue"
  import fileHandle from "./common/FileHandle.vue"
  import modifyFileNumber from "./common/ModifyFileNumber.vue"
  import refuseMaterialsHandle from "./common/RefuseMaterialsHandle.vue"
  import fileNotes from "./common/FileNotes.vue"
  import outStockAndMail from "./common/OutStockAndMail.vue"
  import fileSettle from "./common/FileSettle.vue"
  import makeUpFile from "./common/MakeUpFile.vue"
  import refuseReturnMaterialsSign from "./common/RefuseReturnMaterialsSign.vue"
  import companyNameChangeMatrialsPrint from "./common/CompanyNameChangeMatrialsPrint.vue"
  import injuryReportManage from "./common/InjuryReportManage.vue"
  import api from '../../api/employ_manage/hire_operator'

  export default {
    components: {customerInfo, employeeCompleteInfo, employmentInfo, refuseHandle, useHandle, fileHandle, modifyFileNumber, refuseMaterialsHandle, fileNotes, outStockAndMail, fileSettle, makeUpFile, refuseReturnMaterialsSign, companyNameChangeMatrialsPrint, injuryReportManage},
    data() {
      return {
        collapseInfo: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
        customerInfo: {
          serviceCenter: "",
          customerNumber: "",
          customerName: "",
          servicer: "",
          centerServicer: "李XX",
          employeeServicer: "李XX",
          serviceManager: "王XX"
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
          refuseDate: "",
          firstInDate: "",
          endTypeValue: "",
          printDate: "",
          personPropertyValue: "",
          refuseFileDirectionValue: "",
          refuseFileDate: "",
          transferMethodValue: "",
          transferNotesValue: "",
          transferNotesAdd: "",
          templatorStoreDate: "",
          refuseReason: "读取前道",
          fileCustodyIntention: "读取前道",
          refuseHandleDate: "",
          refuseFeedbackValue: "",
          refuseFeedbackDate: "",
          refuseFeedbackValue2: "",
          refuseFeedbackDate2: "",
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
          refuseMaterialsDeliverDate: "",
          LaborManualIsDeliverRefuserValue: "",
          matchEmployIndex: ""
        },
        fileInfo1: {
          archiveId:'',
          reservedFileNumberValue: "",
          fileNumberValue: "",
          placeValue: "",
          placeAddValue: "",
          placeStateValue: "",
          fileNumber: "",
          fileOriginValue: "",
          accountNumber: "",
          employFilePayTo: "",
          inStockDate: "",
          inFileDate: "",
          isEmployHandleEnd: false,
          docFrom:"",
          employeeId:this.$route.query.employeeId,
          companyId:this.$route.query.companyId,
          employmentId:this.$route.query.employmentId,
          docSeqList: [],
          docSeqList2: [],
          yuliuDocType: "",
          docType: ""
        },
        fileInfo2: {
          isFileHalfwayOut: false,
          fileHalfwayOutDate: "",
          fileHalfwayOutDirection: "",
          bookInStockDate: "",
          bookInstocker: "",
          emploiedAccpetBookInStocker: "",
          emploiedAccpetBookDate: "",
          recoveryEmployBookInStocker: "",
          recoveryEmployBookInStockDate: "",
          sendFileFeedbacker: "",
          sendFileFeedbackDate: "",
          stockProver: "",
          stockProveDate: "",
          employeeId:this.$route.query.employeeId,
          companyId:this.$route.query.companyId,
          employmentId:this.$route.query.employmentId
        },
        useInfo: {
          employFeedback: "",
          employFeedbackOptDate: "",
          diaodangFeedback: "",
          diaodangFeedbackOptDate: "",
          ukeyBorrowDate: "",
          ukeyReturnDate: ""
        },
        modifyFileNumberInfo: {
          originFileNumber: "",
          nowFileNumberValue: "",
          modifyCommiter: "",
          modifyCommitDate: "",
          modifyFinisher: "",
          modifyFinishDate: ""
        },
        refuseMaterialsInfo: {
          tempStore: "",
          insteadTransfer: "",
          returnDate: "",
          mergeArchiveDate: "",
          hasStub: false
        },
        stockAndMailInfo: {
          outStockDate: "",
          outStocker: "",
          actMailDate: "",
          actSender: ""
        },
        fileSettleInfo: {
          actSettleDate: "",
          refuseFileFeePayTo: "",
          filePrice: "",
          priceRange: "",
          refuseTicketMergeFileDate: ""
        },
        makeUpFileInfo: {
          makeUpfile1: "",
          maker1: "",
          makeUpfile2: "",
          maker2: ""
        },

        fileNotesViewData: [],
        refuseReturnMaterialsSignInfo:[],
        companyNameChangeMatrialsPrintInfo: [],
        injuryReportManageInfo: [],
        refuseReturnMaterials:[],
        userInfo:{
          userName:''
        }
      }
    },
     async mounted() {
          
          let params = {idNum:this.$route.query.idNum,idCardType:this.$route.query.idCardType,empTaskId:this.$route.query.empTaskId,employeeId:this.$route.query.employeeId,companyId:this.$route.query.companyId,empTaskResignId:this.$route.query.empTaskResignId,employmentId:this.$route.query.employmentId,remarkType:'2'}


          api.archiveDetailInfoQuery(params).then(data=>{
            
             if(data.data.customerInfo){
                this.customerInfo = data.data.customerInfo;//客户信息
            }

            if(data.data.amEmpTaskBO){
                this.employeeInfo=data.data.amEmpTaskBO;//雇员信息
            }
              
              this.employmentInfo = data.data.amEmploymentBO;

              if(data.data.materialList){
                this.refuseReturnMaterialsSignInfo = data.data.materialList;
              }

              if(data.data.amRemarkBo){
                  this.fileNotesViewData = data.data.amRemarkBo;
              }
           
              if(data.data.amArchaiveBo){
                this.fileInfo1 = data.data.amArchaiveBo;
              }

              if(data.data.amArchaiveBo){
                
                  this.fileInfo2 = data.data.amArchaiveBo;
              }

              if(data.data.amArchaiveBo){
                
                  this.useInfo = data.data.amArchaiveBo;
              }
              
              if(data.data.amArchaiveBo){
                 this.fileSettleInfo = data.data.amArchaiveBo;
              }

              if(data.data.amArchaiveBo){
                  this.stockAndMailInfo = data.data.amArchaiveBo;
              }

              if(data.data.amArchaiveBo){
                  this.makeUpFileInfo  = data.data.amArchaiveBo;
              }

              if(data.data.amInjuryBOList){
                  this.injuryReportManageInfo = data.data.amInjuryBOList;
              }

              if(data.data.resignBO){
                this.refuseInfo = data.data.resignBO;
              }

              this.refuseReturnMaterials = data.data.resultMaterial;

              if(data.data.userInfo){
                this.userInfo = data.data.userInfo;
              }
              this.fileInfo1.docSeqList = data.data.docSeqList;
              this.fileInfo1.docSeqList2 = data.data.docSeqList2;
               
          })
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      }
    }
  }
</script>
