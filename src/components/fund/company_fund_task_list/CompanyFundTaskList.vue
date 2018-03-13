<template>
  <div class="smList">
    <Tabs value="NoProcess">
      <TabPane label="未处理" name="NoProcess">
        <no-process></no-process>
      </TabPane>
      <TabPane label="处理中" name="processing">
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
  import noProcess from './company_fund_task_list_tab/NoProcess.vue'
  import processing from './company_fund_task_list_tab/Processing.vue'
  import finished from './company_fund_task_list_tab/Finished.vue'
  import refused from './company_fund_task_list_tab/Refused.vue'

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
