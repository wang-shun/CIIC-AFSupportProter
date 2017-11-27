<template>
  <div class="smList">
    <Tabs value="cthismonthhandle">
      <TabPane label="本月处理" name="cthismonthhandle">
        <cthismonthhandle></cthismonthhandle>
      </TabPane>
      <TabPane label="下月处理" name="cnextmonthhandle">
        <cnextmonthhandle></cnextmonthhandle>
      </TabPane>
      <TabPane label="已完成" name="cfinished">
        <cfinished></cfinished>
      </TabPane>
      <TabPane label="批退" name="crefused">
        <crefused></crefused>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import cthismonthhandle from './companytasklisttab/cthismonthhandle'//本月处理
  import cnextmonthhandle from './companytasklisttab/cnextmonthhandle'//下月处理
  import cfinished from './companytasklisttab/cfinished'//完成
  import crefused from './companytasklisttab/crefused' //批退

  export default {
    components: {cthismonthhandle,cnextmonthhandle,cfinished,crefused},
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
