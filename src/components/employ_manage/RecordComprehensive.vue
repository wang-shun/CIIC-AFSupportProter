<template>
  <div>
    <div class="smList">
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
        <Panel name="6">
          修改档案编号
          <div slot="content">
            <modify-file-number :modifyFileNumberInfo="modifyFileNumberInfo"></modify-file-number>
          </div>
        </Panel>
        <Panel name="6">
          退工材料办理
          <div slot="content">
            <refuse-materials-handle :refuseMaterialsInfo="refuseMaterialsInfo"></refuse-materials-handle>
          </div>
        </Panel>
      </Collapse>
    </div>
  </div>
</template>
<script>
  import customerInfo from "./common/CustomerInfo.vue"
  import employeeCompleteInfo from "./common/EmployeeCompleteInfo.vue"
  import employmentInfo from "./common/EmploymentInfo.vue"
  import refuseHandle from "./common/RefuseHandle.vue"
  import fileHandle from "./common/FileHandle.vue"
  import modifyFileNumber from "./common/ModifyFileNumber.vue"
  import refuseMaterialsHandle from "./common/RefuseMaterialsHandle.vue"

  export default {
    components: {customerInfo, employeeCompleteInfo, employmentInfo, refuseHandle, fileHandle, modifyFileNumber, refuseMaterialsHandle},
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
          refuseDate: "2014-3-3",
          firstInDate: "2014-3-3",
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
          isEmployHandleEnd: false
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
          stockProveDate: ""
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
    methods: {
      goBack() {
        this.$router.go(-1);
      }
    }
  }
</script>
