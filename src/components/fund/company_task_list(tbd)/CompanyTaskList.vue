<template>
  <div class="smList">
    <Tabs value="cthismonthhandle">
      <TabPane label="未处理" name="CThisMonthHandle">
        <c-this-month-handle></c-this-month-handle>
      </TabPane>
      <TabPane label="处理中" name="CNextMonthHandle">
        <c-next-month-handle></c-next-month-handle>
      </TabPane>
      <TabPane label="已完成" name="CFinished">
        <c-finished><c-finished>
      </TabPane>
      <TabPane label="批退" name="CRefused">
        <c-refused></c-refused>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import CThisMonthHandle from './company_task_list_tab/CThisMonthHandle'//未处理
  import CNextMonthHandle from './company_task_list_tab/CNextMonthHandle'//处理中
  import CFinished from './company_task_list_tab/CFinished'//完成
  import CRefused from './company_task_list_tab/CRefused' //批退

  export default {
    components: {CThisMonthHandle, CNextMonthHandle, CFinished, CRefused},
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
