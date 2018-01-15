<template>
  <div class="smList">
    <Tabs value="NoProcess">
      <TabPane label="未处理" name="NoProcess">
        <no-process></no-process>
      </TabPane>
      <TabPane label="已处理" name="processing">
        <processing></processing>
      </TabPane>
      <TabPane label="已完成" name="finished">
        <finished></finished>
      </TabPane>
      <TabPane label="已批退" name="refused">
        <refused></refused>
      </TabPane>
    </Tabs>

  </div>
</template>
<script>
  import noProcess from './employee_special_operator_tab/NoProcess.vue'
  import processing from './employee_special_operator_tab/Processed.vue'
  import finished from './employee_special_operator_tab/Finished.vue'
  import refused from './employee_special_operator_tab/Refused.vue'

  export default {
    components: {noProcess, processing, finished, refused},
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
