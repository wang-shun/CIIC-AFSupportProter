<template>
  <div>
    <div class="smList">
      <Row type="flex" justify="start" class="mt20 mb20">
        <Col :sm="{span: 24}" class="tr">
          <Button type="warning" @click="goBack">返回</Button>
          <Button type="info" @click="printInfo">打印退工单</Button>
        </Col>
      </Row>
      <Collapse v-model="collapseInfo">
        <Panel name="1">
         <font style="font-weight:bold;">客户信息</font>
          <div slot="content">
            <customer-info :customerInfo="customerInfo"></customer-info>
          </div>
        </Panel>
        <Panel name="2">
          <font style="font-weight:bold;">雇员信息</font>
          <div slot="content">
            <employee-complete-info :employeeInfo="employeeInfo"></employee-complete-info>
          </div>
        </Panel>
        <Panel name="3">
          <font style="font-weight:bold;">用工信息</font>
          <div slot="content">
            <employment-info :employmentInfo="employmentInfo"></employment-info>
          </div>
        </Panel>
        <Panel name="13">
          <font style="font-weight:bold;"> 用工资料信息</font>
          <div slot="content">
            <use-handle :fileInfo1="fileInfo1" :fileInfo2="fileInfo2"></use-handle>
          </div>
        </Panel>
        <Panel name="4">
          <font style="font-weight:bold;"> 退工信息</font>
          <div slot="content">
            <refuse-handle :refuseInfo="refuseInfo"></refuse-handle>
          </div>
        </Panel>
        <Panel name="5">
          <font style="font-weight:bold;"> 档案办理</font>
          <div slot="content">
            <file-handle :fileInfo1="fileInfo1" :fileInfo2="fileInfo2"></file-handle>
          </div>
        </Panel>
        <Panel name="6">
          <font style="font-weight:bold;">寄信办理</font>
          <div slot="content">
            <file-send :fileInfo1="fileInfo1"></file-send>
          </div>
        </Panel>
        <Panel name="8">
          <font style="font-weight:bold;">档案备注</font>
          <div slot="content">
            <file-notes :fileNotesViewData="fileNotesViewData" :userInfo="userInfo"></file-notes>
          </div>
        </Panel>
        <Panel name="9">
           <font style="font-weight:bold;">出库\寄信</font>
          <div slot="content">
            <out-stock-and-mail :stockAndMailInfo="stockAndMailInfo"></out-stock-and-mail>
          </div>
        </Panel>
        <Panel name="10">
          <font style="font-weight:bold;"> 档案结费</font>
          <div slot="content">
            <file-settle :fileSettleInfo="fileSettleInfo"></file-settle>
          </div>
        </Panel>
        <Panel name="11">
          <font style="font-weight:bold;">退档日期操作区域</font>
          <div slot="content">
            <return-doc-date :refuseInfo="refuseInfo" ></return-doc-date>
          </div>
        </Panel>
        <Panel name="12">
           <font style="font-weight:bold;">补调档案</font>
          <div slot="content">
            <make-up-file :makeUpFileInfo="makeUpFileInfo"></make-up-file>
          </div>
        </Panel>
        <Panel name="13">
          <font style="font-weight:bold;">退工归还材料签收</font>
          <div slot="content">
            <refuse-return-materials-sign :materialLogList="materialLogList" :refuseReturnMaterialsSignInfo="refuseReturnMaterialsSignInfo" :refuseReturnMaterials="refuseReturnMaterials"></refuse-return-materials-sign>
          </div>
        </Panel>
        <Panel name="14">
           <font style="font-weight:bold;">工伤申报管理</font>
          <div slot="content">
            <injury-report-manage :injuryReportManageInfo="injuryReportManageInfo" :fileInfo1="fileInfo1" :userInfo="userInfo"></injury-report-manage>
          </div>
        </Panel>
      </Collapse>
      <Modal
        :width="700"
        v-model="modal1"
        title="选择公司变更记录"
        @on-ok="ok"
        @on-cancel="cancel">
        <Table border  ref="payComSelection" :columns="companyColumns" :width="620"  :data="refuseReturnCompanys" class="mt20"></Table>
      </Modal>
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
  import fileSend from "./common/FileSend.vue"
  import modifyFileNumber from "./common/ModifyFileNumber.vue"
  import refuseMaterialsHandle from "./common/RefuseMaterialsHandle.vue"
  import fileNotes from "./common/FileNotes.vue"
  import outStockAndMail from "./common/OutStockAndMail.vue"
  import fileSettle from "./common/FileSettle.vue"
  import makeUpFile from "./common/MakeUpFile.vue"
  import refuseReturnMaterialsSign from "./common/RefuseReturnMaterialsSign.vue"
  import companyNameChangeMatrialsPrint from "./common/CompanyNameChangeMatrialsPrint.vue"
  import injuryReportManage from "./common/InjuryReportManage.vue"
  import returnDocDate from "./common/ReturnDocDate.vue"
  import api from '../../api/employ_manage/hire_operator'

  export default {
    components: {customerInfo, employeeCompleteInfo, employmentInfo, refuseHandle, useHandle, fileHandle, fileSend, modifyFileNumber, refuseMaterialsHandle, fileNotes, outStockAndMail, fileSettle, makeUpFile, refuseReturnMaterialsSign, companyNameChangeMatrialsPrint, injuryReportManage,returnDocDate},
    data() {
      return {
        modal1: false,
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
        amEmploymentBO: {
          employeeId: "",
          companyId: "",
          empTaskId: "",
          employmentId: '',
          companyNameList:[],
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
          post:0,
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
          docType: "",
          yuliuDocNum: "",
          docNum: "",
          oldYuLiuType: '',
          oldYuLiuNum: 0,
          oldType: '',
          oldNum: 0,
          empTaskId:this.$route.query.empTaskId

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
        refuseReturnCompanys:[],
        materialLogList:[],
        userInfo:{
          userName:''
        },companyColumns: [
          {title: '', type: 'selection', width: 60},
          {title: '变更公司名称', key: 'companyName', align: 'center',width: 250,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.companyName),
              ]);
            }
          },
          {title: '变更时间', key: 'changeDate', align: 'center',width: 120,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span',   moment(Number(params.row.changeDate)).format("YYYY-MM-DD")),
              ]);
            }
          },
          {title: '备注', key: 'remark', align: 'center',width: 180,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.remark),
              ]);
            }
          }
        ],
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

              if(data.data.materialLogList){
                this.materialLogList = data.data.materialLogList;
              }

              if(data.data.amRemarkBo){
                  this.fileNotesViewData = data.data.amRemarkBo;
              }
           
              if(data.data.amArchaiveBo){
                this.fileInfo1 = data.data.amArchaiveBo;
                // 记录原有的 档案编号 和 类型
                this.fileInfo1.oldYuLiuType = data.data.amArchaiveBo.yuliuDocType;
                this.fileInfo1.oldYuLiuNum = data.data.amArchaiveBo.yuliuDocNum;
                this.fileInfo1.oldType = data.data.amArchaiveBo.docType;
                this.fileInfo1.oldNum = data.data.amArchaiveBo.docNum;
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
      },
      ok () {
              let selection = this.$refs.payComSelection.getSelection();

          selection.some(item => {
               this.amEmploymentBO.companyNameList.push('原公司名称：' + item.companyName);
           });
                this.amEmploymentBO.companyId = this.$route.query.companyId;
                this.amEmploymentBO.employeeId = this.$route.query.employeeId;
                this.amEmploymentBO.empTaskId = this.$route.query.empTaskId;
                this.amEmploymentBO.employmentId = this.$route.query.employmentId;
                api.archiveSearchExportReturn(this.amEmploymentBO);
            },
            cancel () {
              
            },
      printInfo() {
        this.amEmploymentBO.companyNameList = [];
        this.amEmploymentBO.companyId = this.$route.query.companyId;
        this.amEmploymentBO.employeeId = this.$route.query.employeeId;
        this.amEmploymentBO.empTaskId = this.$route.query.empTaskId;
        this.amEmploymentBO.employmentId = this.$route.query.employmentId;

        api.queryCompanyNameUpdateHistory({companyId:this.$route.query.companyId}).then(data=>{
            console.info(data.data);
            if(data.data.length > 0){
              this.modal1 = true;
              let selection = this.$refs.payComSelection;
              selection.selectAll(false);
              this.refuseReturnCompanys = data.data;
            }else{
              api.archiveSearchExportReturn(this.amEmploymentBO);
            }
        })


      }
    }
  }
</script>
