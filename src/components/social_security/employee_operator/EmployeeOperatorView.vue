<template>
  <div class="smList" >
    <Tabs v-model="tab" @on-click="onClickO">
      <TabPane label="未处理" name="noprogress">
        <noprogress ref="noprogress" v-if="isNoprogress"></noprogress>
      </TabPane>
      <TabPane label="处理中" name="progressing">
        <progressing v-if="isProgressing"></progressing>
      </TabPane>
      <TabPane label="已完成" name="finished">
        <finished v-if="isFinished"></finished>
      </TabPane>
      <TabPane label="已批退" name="refused">
        <refused v-if="isRefused"></refused>
      </TabPane>
     <TabPane label="打印信息" name="printInfo">
        <print-info v-if="isPrintInfo"></print-info>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import {localStorage, sessionStorage} from '../../../assets/api/storage'
  import noprogress from './tab/Noprogress'//雇员日常操作 -- 未处理
  import progressing from './tab/Progressing'//雇员日常操作 -- 处理中
  import finished from './tab/Finished'//雇员日常操作 -- 已完成
  import refused from './tab/Refused'//雇员日常操作 --批退
  import printInfo from './tab/PrintInfo'//雇员日常操作 --打印信息

  export default {
    components: {noprogress, progressing, finished, refused, printInfo},
    data() {
      return {
        tab: 'noprogress',
          isNoprogress: true,
          isProgressing: false,
          isFinished: false,
          isRefused: false,
          isPrintInfo:false
      }
    },
    created() {

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
        sessionStorage.employeeOperatorTab = name
        this.controlShow(name)
        this.$refs.noprogress.searchEmployeeInit();
      },
      //控制处理中 tab 显示
      controlShow(name){
        if(name=="noprogress"&&!this.isNoprogress) {
          this.isNoprogress=true;
        }
        if(name=="progressing"&&!this.isProgressing) {
          this.isProgressing=true;
        }
        if(name=="finished"&&!this.isFinished) {
          this.isFinished=true;
        }
        if(name=="refused"&&!this.isRefused) {
          this.isRefused=true;
        }
        if(name=="printInfo"&&!this.isPrintInfo) {
          this.isPrintInfo=true;
        }
      }
    }
  }
</script>
