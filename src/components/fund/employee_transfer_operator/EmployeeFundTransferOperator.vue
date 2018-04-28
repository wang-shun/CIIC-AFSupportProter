<template>
  <div class="smList">
    <Tabs value="NoProcess">
      <TabPane label="未处理" name="NoProcess">
        <no-process></no-process>
      </TabPane>
      <TabPane label="已处理" name="processed">
        <processed></processed>
      </TabPane>
      <TabPane label="不需处理" name="refused">
        <refused></refused>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import noProcess from './employee_transfer_operator_tab/NoProcess.vue'
  import processed from './employee_transfer_operator_tab/Processed.vue'
  import refused from './employee_transfer_operator_tab/Refused.vue'

  export default {
    components: {noProcess, processed, refused},
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
