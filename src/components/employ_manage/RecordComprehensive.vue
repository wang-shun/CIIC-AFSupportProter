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
            <file-notes :fileNotesViewData="fileNotesViewData"></file-notes>
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
            <refuse-return-materials-sign :refuseReturnMaterialsSignInfo="refuseReturnMaterialsSignInfo"></refuse-return-materials-sign>
          </div>
        </Panel>
        <!-- <Panel name="13">
          公司名称变更材料打印
          <div slot="content">
            <company-name-change-matrials-print></company-name-change-matrials-print>
          </div>
        </Panel> -->
        <Panel name="14">
          工伤申报管理
          <div slot="content">
            <injury-report-manage :injuryReportManageInfo="injuryReportManageInfo" :fileInfo1="fileInfo1"></injury-report-manage>
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
    components: {customerInfo, employeeCompleteInfo, employmentInfo, refuseHandle, fileHandle, modifyFileNumber, refuseMaterialsHandle, fileNotes, outStockAndMail, fileSettle, makeUpFile, refuseReturnMaterialsSign, companyNameChangeMatrialsPrint, injuryReportManage},
    data() {
      return {
        collapseInfo: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
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
          employmentId:this.$route.query.employmentId
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
        refuseReturnMaterialsSignInfo: [],
        companyNameChangeMatrialsPrintInfo: [],
        injuryReportManageInfo: []
      }
    },
     async mounted() {
          
          let params = {employeeId:this.$route.query.employeeId,companyId:this.$route.query.companyId,employmentId:this.$route.query.employmentId,remarkType:'2'}


          api.archiveDetailInfoQuery(params).then(data=>{

             if(data.data.customerInfo){
                this.customerInfo = data.data.customerInfo;//客户信息
            }

            if(data.data.amEmpTaskBO){
                this.employeeInfo=data.data.amEmpTaskBO;//雇员信息
            }
              
              this.employmentInfo = data.data.amEmploymentBO;

              if(data.data.materialList){
                this.refuseReturnMaterialsSignInfo = data.data.materialList.rows;
              }

              if(this.fileNotesViewData){
                  this.fileNotesViewData = data.data.amRemarkBo.rows;
              }
           
              if(data.data.amArchaiveBo){
                this.fileInfo1 = data.data.amArchaiveBo;
              }

              if(data.data.amArchaiveBo){
                  this.fileInfo2 = data.data.amArchaiveBo;
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

              if(data.data.amInjuryPageRows){
                  this.injuryReportManageInfo = data.data.amInjuryPageRows.rows;
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
