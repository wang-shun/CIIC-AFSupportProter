<template>
  <div class="smList">
    <Tabs value="thismonthhandle">
      <TabPane label="未处理" name="thismonthhandle">
        <thismonthhandle></thismonthhandle>
      </TabPane>
      <TabPane label="处理中" name="nextmonthhandle">
        <nextmonthhandle></nextmonthhandle>
      </TabPane>
      <TabPane label="已完成" name="finishhandle">
        <finishhandle></finishhandle>
      </TabPane>
      <TabPane label="批退" name="refusehandle">
        <refusehandle></refusehandle>
      </TabPane>
    </Tabs>

  </div>
</template>
<script>
  import thismonthhandle from './employeeoperatortab/thismonthhandle'//雇员日常操作 -- 本月处理
  import nextmonthhandle from './employeeoperatortab/nextmonthhandle'//雇员日常操作 -- 下月处理
  import finishhandle from './employeeoperatortab/finishhandle'//雇员日常操作 -- 已完成
  import refusehandle from './employeeoperatortab/refusehandle'//雇员日常操作 --

  export default {
    components: {thismonthhandle,nextmonthhandle,finishhandle,refusehandle},
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