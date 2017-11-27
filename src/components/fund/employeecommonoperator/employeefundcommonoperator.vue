<template>
  <div class="smList">
    <Tabs value="thismonthhandle">
      <TabPane label="未处理" name="noprocess">
        <no-process></no-process>
      </TabPane>
      <TabPane label="已处理" name="processing">
      </TabPane>
      <TabPane label="已完成" name="finished">
      </TabPane>
      <TabPane label="已批退" name="refused">
      </TabPane>
    </Tabs>

  </div>
</template>
<script>
  import noProcess from './employeecommonoperatortab/noprocess.vue'
  export default {
    components: {noProcess},
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
