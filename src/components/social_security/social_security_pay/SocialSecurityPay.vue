<template>
  <div class="smList">
    <Tabs v-model="tabName" @on-click="switchTab">
      <TabPane label="企业账户管理" name="paymentCom">
        <paymentCom v-if="tabNames.paymentCom"></paymentCom>
      </TabPane>
      <TabPane label="支付批次" name="paymentBatch">
        <paymentBatch v-if="tabNames.paymentBatch"></paymentBatch>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import paymentCom from './tab/paymentCom'//社保支付 -- 企业账户管理
  import paymentBatch from './tab/paymentBatch'//社保支付 -- 支付批次

  export default {
    components: {paymentCom, paymentBatch},
    data() {
      return {
        tabName: 'paymentCom',
        tabNames: {
          paymentCom: true,
          paymentBatch: false,
        }
      }
    },
    mounted() {

    },
    computed: {},
    methods: {
      switchTab(name) {
        this.tabNames[name] = true;
      }
    }
  }
</script>
