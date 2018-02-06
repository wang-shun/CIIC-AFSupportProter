<template>
  <div class="smList">
    <Tabs v-model="tab" @on-click="onClickO">
      <TabPane label="未处理" name="noprocess">
        <noprocess v-if="isNoProcess"></noprocess>
      </TabPane>
      <TabPane label="处理中" name="processing">
        <processing v-if="isProcessing"></processing>
      </TabPane>
      <TabPane label="已完成" name="finished">
        <finished v-if="isFinished"></finished>
      </TabPane>
      <TabPane label="已批退" name="refused">
        <refused v-if="isRefused"></refused>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import noprocess from './employee_common_operator_tab/NoProcess'//雇员日常操作 -- 未处理
  import processing from './employee_common_operator_tab/Processing'//雇员日常操作 -- 处理中
  import finished from './employee_common_operator_tab/Finished'//雇员日常操作 -- 已完成
  import refused from './employee_common_operator_tab/Refused'//雇员日常操作 --批退

  export default {
    components: {noprocess, processing, finished, refused},
    data() {
      return {
        tab: 'noprocess',
        isNoProcess: true,
        isProcessing: false,
        isFinished: false,
        isRefused: false,

      }
    },
    mounted() {

      if(typeof(sessionStorage.employeeOperatorTab)!="undefined"){
        this.tab = sessionStorage.employeeOperatorTab
      }
      this.controlShow(this.tab)
    },
    computed: {},
    methods: {
      switchTab(name) {
        this.tabNames[name] = true;
      },
      onClickO(name){
        //将tab类型 缓存
        sessionStorage.employeeOperatorTab = this.tab
        this.controlShow(name)
      },
      //控制处理中 tab 显示
      controlShow(name){
        if(name=="noprocess"&&!this.isNoProcess) this.isNoprocess=true
        if(name=="processing"&&!this.isProcessing) this.isProcessing=true
        if(name=="finished" && !this.isFinished)this.isFinished=true
        if(name=="refused" && !this.isRefused)this.isRefused=true
      }
    }
  }
</script>
