<template>
  <div class="smList">
    <Tabs v-model="tabName" @on-click="switchTab" >
  
      <TabPane label="支付批次申请" name="paymentBatch">
       
      </TabPane>
     <TabPane label="企业账户支付管理" name="paymentCom" >
        
      </TabPane>
      
    </Tabs>
     <paymentBatch v-if="tabNames.paymentBatch" @switchTab='switchTab'></paymentBatch>
     <paymentCom v-if="tabNames.paymentCom"></paymentCom>
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

    },
    computed: {},
    methods: {
      switchTab(name) {
        if(name =='paymentCom'){
            this.tabNames['paymentCom'] = true;
            this.tabNames['paymentBatch'] = false;
        }else{
            this.tabNames['paymentCom'] = false;
            this.tabNames['paymentBatch'] = true;
        }
      }
    }
  }
</script>
