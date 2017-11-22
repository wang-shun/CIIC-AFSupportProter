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
      <TabPane label="已批退" name="refused">
        <refused></refused>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>

  import noprogress from './employeespecialoperatortab/noprogress'//未处理
  import progressing from './employeespecialoperatortab/progressing'//处理中
  import finished from './employeespecialoperatortab/finished'//已完成
  import refused from './employeespecialoperatortab/refused'//已批退

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
