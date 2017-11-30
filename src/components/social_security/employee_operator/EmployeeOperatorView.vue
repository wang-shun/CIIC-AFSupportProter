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
  import noprogress from './employee_operator_tab/Noprogress'//雇员日常操作 -- 未处理
  import progressing from './employee_operator_tab/Progressing'//雇员日常操作 -- 处理中
  import finished from './employee_operator_tab/Finished'//雇员日常操作 -- 已完成
  import refused from './employee_operator_tab/Refused'//雇员日常操作 --批退

  export default {
    components: {noprogress,progressing,finished,refused},
    data() {
      return {
      }
    },
    mounted() {

    },
    computed: {},
    methods: {
    }
  }
</script>