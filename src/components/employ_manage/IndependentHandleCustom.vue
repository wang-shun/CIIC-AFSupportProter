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
          公司信息
          <div slot="content">
            <customer-info :customerInfo="customerInfo"></customer-info>
          </div>
        </Panel>
        <Panel name="2">
          Ukey公司特殊情况：
          <div slot="content">
            <employee-complete-info :employIndependentInfo="employIndependentInfo"></employee-complete-info>
          </div>
        </Panel>
        <Panel name="3">
          用工公司特殊情况
          <div slot="content">
            <employment-info  :employIndependentInfo="employIndependentInfo" ></employment-info>
          </div>
        </Panel>
        <Panel name="4">
          档案公司特殊情况
          <div slot="content">
            <refuse-handle :employIndependentInfo="employIndependentInfo"></refuse-handle>
          </div>
        </Panel>
        <Panel name="5">
          退工公司特殊情况
          <div slot="content">
            <refuse-notes :employIndependentInfo="employIndependentInfo"></refuse-notes>
          </div>
        </Panel>
        <Panel name="6">
           社保公司特殊情况
          <div slot="content">
            <employment-notes-view :employIndependentInfo="employIndependentInfo"></employment-notes-view>
          </div>
        </Panel>
        <Panel name="7">
           公司名称变更情况
          <div slot="content">
            <employment-company-updates :companyNameList="companyNameList"></employment-company-updates>
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
  import customerInfo from "./common/IndependentCustomerInfo.vue"
  import employeeCompleteInfo from "./common/ukeyIndependent.vue"
  import employmentInfo from "./common/EmployeeIndependent.vue"
  import refuseHandle from "./common/ArchiveIndependent.vue"
  import refuseNotes from "./common/RefuseIndependent.vue"
  import employmentNotesView from "./common/SocialIndependent.vue"
  import employmentCompanyUpdates from "./common/EmploymentCompanyUpdates.vue"
  import materialsBorrowInfoView from "./common/MaterialsBorrowInfoView.vue"
  import fileNotesView from "./common/FileNotesView.vue"
  import employmentDataManagementTaskList from "./common/EmployeeHistoryTaskList.vue"
  import api from '../../api/employ_manage/hire_operator'

  export default {
    components: {customerInfo, employeeCompleteInfo, employmentInfo, refuseHandle, refuseNotes, employmentNotesView,employmentCompanyUpdates, materialsBorrowInfoView, fileNotesView, employmentDataManagementTaskList},
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
          serviceManager: "王XX",
          companyId:'',
          title:''
        },
        employIndependentInfo: {
          companySpecial0: "0",
          companySpecial1: "0",
          companySpecial2: "0",
          companySpecial3: "0",
          companySpecial4: "0",
          companySpecial5: "0",
          companySpecial6: "0",
          companySpecial7: "0",
          companySpecial8: "0",
          companySpecial9: "0",
          companySpecial10: "0",
          companySpecial11: "0",
          companySpecial12: "0",
          companySpecial13: "0",
          companySpecial14: "0",
          companySpecial15: "0",
          companySpecial16: "0",
          companySpecial17: "0",
          companySpecial18: "0",
          companySpecial19: "0",
          companySpecial20: "0",
          companySpecial21: "0",
          companySpecial22: "0",
          companySpecial23: "0",
          ukey:"0",
          ukeyType:"",
          ukeyCode:"",
          ukeyPwd:"",
          ukeyStatus:"",
          companyId:this.$route.query.companyId
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
        companyNameList: [{
          companyId: "",
          companyName: "",
          changeDate: Date(),
          remark: "",
          createdBy: ""
        }]
      }
    },
    async mounted() {

          let params = {companyId:this.$route.query.companyId};

          api.queryCompanySetDetail(params).then(data=>{

            if(data.data.amCompanySetBO){
              
              this.employIndependentInfo = data.data.amCompanySetBO;//客户信息
                
            }

            if(data.data.salCompanyBO){
              this.customerInfo = data.data.salCompanyBO;
            }

            if(data.data.companyNameList){
              this.companyNameList = data.data.companyNameList;
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
