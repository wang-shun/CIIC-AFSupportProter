<template>
  <div>
    <div class="smList">
      <Tabs value="step1">
        <TabPane label="1. 前道下载与导入调整名单" name="step1">
          <step1></step1>
        </TabPane>
        <TabPane label="2. 后道下载年调申报表" name="step2">
          <step2></step2>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>
<script>
  import step1 from "./fund_year_adjust_tab/Step1.vue"
  import step2 from "./fund_year_adjust_tab/Step2.vue"

  export default {
    components: {step1, step2},
    data() {
      return {

      }
    },
    mounted() {

    },
    computed: {

    },
    methods: {

    }
  }
</script>
