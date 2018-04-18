<template>
  <Form :label-width=150>
    <Collapse v-model="collapseInfo" class="mt20">
      <Panel name="1">
        客户信息
        <div slot="content">
          <company-info ref="company" :customerInfo="this.$route.params.companyInfo" :isShowComplete="true"></company-info>
        </div>
      </Panel>
      <Panel name="2">
        企业任务单办理
        <div slot="content">
          <fund-open-account ref="openAccount" :openAccountInfo="this.$route.params.openAccountInfo"></fund-open-account>
        </div>
      </Panel>
    </Collapse>

    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <Button type="primary" @click="commit">提交</Button>
        <Button type="error" @click="goBack">批退</Button>
        <Button type="warning" @click="goBack">关闭/返回</Button>
      </Col>
    </Row>
  </Form>
</template>
<script>

  import customerInfo from "../common/CustomerInfo.vue"
  import fundOpenAccount from "../common/FundOpenAccount.vue"
  import {CompanyTaskListHF} from '../../../api/house_fund/company_task_list/company_task_list_hf'
  import Tools from '../../../lib/tools'
  export default {
    components: {companyInfo:customerInfo, fundOpenAccount},
    data() {
      return {
        collapseInfo: [1, 2]
      }
    },
    mounted() {
      
    },
    computed: {
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },

      //点击提交按钮
      commit(){
        let params = this.getParams()
        CompanyTaskListHF.updateCompanyTask(params).then(data=>{
          
          if(data){
             this.$Message.success('提交成功');
             this.goBack();
          }else{
             this.$Message.error('提交失败');
          }
         
        }).catch(error=>{
          console.log(error)
        })
      },

      //获得更新任务单请求参数
      getParams(){
        
               console.log(this.$refs.openAccount.openAccountInfo);
        return {
   
          //comTask
          comTaskId: this.$route.params.comTaskId,

          //companyInfo
          companyId: this.$refs.company.customerInfo.customerNumber,
          initiatorNotes: this.$refs.company.customerInfo.initiaterNotes,

          //openAccountInfo
          comAccountId:this.$refs.openAccount.openAccountInfo.comAccountId,
          comAccountClassId:this.$refs.openAccount.openAccountInfo.comAccountClassId, 
          taskChangeTypeValue: this.$refs.openAccount.openAccountInfo.changeTypeValue,
          paymentWay: this.$refs.openAccount.openAccountInfo.payMethodValue,
          paymentBank: this.$refs.openAccount.openAccountInfo.paymentBankValue,
          closeDay: this.$refs.openAccount.openAccountInfo.closeAccountEveryMonth,
          comAccountName: this.$refs.openAccount.openAccountInfo.companyFundAccountName,
          comAccountNum: this.$refs.openAccount.openAccountInfo.companyFundAccountNum,
          uKeyStore: this.$refs.openAccount.openAccountInfo.UKeyValue,
          comStartMonth: Tools.formatDate(this.$refs.openAccount.openAccountInfo.customerPayStartDate, "YYYYMM"),
          operateStartMonth: Tools.formatDate(this.$refs.openAccount.openAccountInfo.professionalOperateStartDate, "YYYYMM"),
          endType: this.$refs.openAccount.openAccountInfo.endTypeValue,
          accountTempStore: this.$refs.openAccount.openAccountInfo.accountTempStoreTypeValue,
          taskStatus: this.$refs.openAccount.openAccountInfo.taskStatus,

          acceptDate: this.$refs.openAccount.openAccountInfo.acceptDate,
          approvalDate: this.$refs.openAccount.openAccountInfo.deliveredDate,
          finishDate: this.$refs.openAccount.openAccountInfo.finishDate,
          comAccountRemark: this.$refs.openAccount.openAccountInfo.notes,

        }
      },
    }
  }
</script>
