<template>
  <div class="smList">
    <Tabs v-model="tabName"  @on-click='onClickO' >
      <TabPane label="支付批次申请" name="paymentBatch">
      </TabPane>
     <TabPane label="企业账户支付管理" name="paymentCom" >
      </TabPane>
    </Tabs>

     <paymentBatch v-show="tabNames.paymentBatch" @switchTab='switchTab'></paymentBatch>
     <paymentCom v-show="tabNames.paymentCom"></paymentCom>
  </div>
</template>
<script>
  import paymentBatch from './tab/PaymentBatch'//社保支付 -- 支付批次
  import paymentCom from './tab/PaymentCom'//社保支付 -- 企业账户管理

  export default {
    components: {paymentCom, paymentBatch},
    data() {
      return {
        tabName: 'paymentBatch',
        tabNames: {
          paymentCom: false,
          paymentBatch: true,
        }
      }
    },
    mounted() {
      if(typeof(sessionStorage.ssPaymentTab)!="undefined"){
          this.tabName = sessionStorage.ssPaymentTab
      }
       this.switchTab(this.tabName)
    },
    computed: {},
    methods: {
      onClickO(name){
       //将tab类型 缓存
       sessionStorage.ssPaymentTab = this.tabName
       this.switchTab(name)
      },
      switchTab(name) {
        if(name =='paymentCom'){
            this.tabNames['paymentCom'] = true;
            this.tabNames['paymentBatch'] = false;
        }else{
            this.tabNames['paymentCom'] = false;
            this.tabNames['paymentBatch'] = true;
        }
        this.tabName = name;
      }
    }
  }
</script>
