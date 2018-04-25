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
        企业任务单办理 ({{hfTypeName}})
        <div slot="content">
          <fund-open-account ref="openAccount" :openAccountInfo="this.$route.params.openAccountInfo"></fund-open-account>
        </div>
      </Panel>
    </Collapse>

    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <Button type="primary" @click="commit">提交</Button>
        <Button type="error" @click="rejection">批退</Button>
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
        collapseInfo: [1, 2],
        hfTypeName:this.$route.params.companyInfo.hfTypeName
      }
    },
    mounted() {
      
      // if(this.$refs.openAccount.openAccountInfo.taskStatus==0){
 
      //  this.$route.params.openAccountInfo.taskStatus==1;
      // }

      console.log(this.$route.params);
        
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
        if(params.taskStatus==0){
          this.$Message.error('必须选择一个任务状态');
          return false;
        }
        if(params.taskStatus==1 && params.acceptDate=='' ){
          this.$Message.error('受理月份必填');
          return false;
        }
        if(params.taskStatus==2 && params.approvalDate=='' ){
          this.$Message.error('送审月份必填');
          return false;
        }
        if(params.taskStatus==3 && params.finishDate=='' ){
          this.$Message.error('完成月份必填');
          return false;
        }


        if(params.taskStatus==3){
          if(params.comAccountName=='' || params.comAccountName== null){
              this.$Message.error('企业账户名称必填');
              return false;
          }
          if(params.comAccountNum=='' || params.comAccountNum==null){
              this.$Message.error('企业账号必填');
              return false;
          }
          if(params.closeDay=='' || params.closeDay==null){
              this.$Message.error('每月关账日必填');
              return false;
          }
          if(params.paymentBank=='' || params.paymentBank==null){
              this.$Message.error('缴费银行必填');
              return false;
          }
          if(params.paymentWay=='' || params.paymentWay==null){
              this.$Message.error('付款方式必填');
              return false;
          }
          let comStartMonth=this.$refs.openAccount.openAccountInfo.customerPayStartDate;
          if(comStartMonth=='' || comStartMonth==null){
              this.$Message.error('客户缴费起始年月必填');
              return false;
          }
          let operateStartMonth=this.$refs.openAccount.openAccountInfo.operateStartMonth;
          if(operateStartMonth=='' || operateStartMonth==null){
              this.$Message.error('专员操作起始年月必填');
              return false;
          }
          if(params.uKeyStore=='' || params.uKeyStore==null){
              this.$Message.error('公积金企业U盾必填');
              return false;
          }
        }

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
      rejection(){
           this.$Modal.confirm({
              title: "您确认批退操作？",
              cancelText: "取消",
              onOk: () => {
                  let params={
                    comTaskId:this.$route.params.comTaskId
                  }
                  CompanyTaskListHF.rejection(params).then(data=>{
                    if(data){
                        this.$Message.success('提交成功');
                        this.goBack();
                    }else{
                        this.$Message.error('提交失败');
                    }
                  }).catch(error=>{
                    console.log(error)
                  })
              }
            });        
      },
      //获得更新任务单请求参数
      getParams(){

          let comStartMonth=this.$refs.openAccount.openAccountInfo.customerPayStartDate;
          if(comStartMonth!='' && comStartMonth!=null){
              comStartMonth = Tools.formatDate(comStartMonth, "YYYYMM")
          }
          let operateStartMonth=this.$refs.openAccount.openAccountInfo.operateStartMonth;
          if(operateStartMonth!='' && operateStartMonth!=null){
             operateStartMonth = Tools.formatDate(operateStartMonth, "YYYYMM")
          }
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
          comStartMonth: comStartMonth,
          operateStartMonth: operateStartMonth,
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
