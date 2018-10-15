<template>
  <div class="smList">
    <Tabs v-model="tab" @on-click="onClickO">
      <TabPane label="未处理" name="noprocess">
        <noprocess ref="noprogress" v-if="isNoProcess"></noprocess>
      </TabPane>
      <TabPane label="处理中" name="processing">
        <processing v-if="isProcessing"></processing>
      </TabPane>
      <TabPane label="已完成" name="finished">
        <finished v-if="isFinished"></finished>
      </TabPane>
      <TabPane label="已批退" name="rejected">
        <rejected v-if="isRejected"></rejected>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import {localStorage, sessionStorage} from '../../../assets/api/storage'
  import noprocess from './tab/NoProcess'//雇员日常操作 -- 未处理
  import processing from './tab/Processing'//雇员日常操作 -- 处理中
  import finished from './tab/Finished'//雇员日常操作 -- 已完成
  import rejected from './tab/Rejected'//雇员日常操作 --批退

  export default {
    components: {noprocess, processing, finished, rejected},
    data() {
      return {
        tab: 'noprocess',
        isNoProcess: true,
        isProcessing: false,
        isFinished: false,
        isRejected: false,

      }
    },
    created() {

      if(typeof(sessionStorage.fundEmployeeOperatorTab)!="undefined"){
        this.tab = sessionStorage.fundEmployeeOperatorTab
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
        sessionStorage.fundEmployeeOperatorTab = name
        this.controlShow(name)
        this.$refs.noprogress.searchEmployeeInit();
      },
      //控制处理中 tab 显示
      controlShow(name){
        if(name=="noprocess"&&!this.isNoProcess) this.isNoprocess=true
        if(name=="processing"&&!this.isProcessing) this.isProcessing=true
        if(name=="finished" && !this.isFinished)this.isFinished=true
        if(name=="rejected" && !this.isRejected)this.isRejected=true
      }
    }
  }
</script>
