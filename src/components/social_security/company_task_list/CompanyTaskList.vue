<template>
  <div class="smList">
    <Tabs value="noprogress">
      <TabPane label="未处理" name="noprogress">
        <noprogress></noprogress>
      </TabPane>
      <TabPane label="处理中" name="progressing">
        <progressing></progressing>
      </TabPane>
      <TabPane label="已完成" name="finished">
        <finished></finished>
      </TabPane>
      <TabPane label="批退" name="refused">
        <refused></refused>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import noprogress from './company_task_list_tab/Noprogress'//未处理
  import progressing from './company_task_list_tab/Progressing'//处理中
  import finished from './company_task_list_tab/Finished'//完成
  import refused from './company_task_list_tab/Refused' //批退

  export default {
    components: {noprogress,progressing,finished,refused},
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
