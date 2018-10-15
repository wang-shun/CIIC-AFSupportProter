<template>
  <div class="smList">
    <Tabs v-model="tab" @on-click='onClickO'>
      <TabPane label="未处理" name="noprogress">
      </TabPane>
      <TabPane label="处理中" name="progressing">
      </TabPane>
      <TabPane label="已完成" name="finished">
      </TabPane>
      <TabPane label="已批退" name="refused">
      </TabPane>
    </Tabs>
    <noprogress v-show="isNoprogress"></noprogress>
    <progressing v-show="isProgressing"></progressing>
    <finished v-show="isFinished"></finished>
    <refused v-show="isRefused"></refused>
  </div>
</template>
<script>
import {localStorage, sessionStorage} from '../../../assets/api/storage'
  import noprogress from './company_task_list_tab/Noprogress'//未处理
  import progressing from './company_task_list_tab/Progressing'//处理中
  import finished from './company_task_list_tab/Finished'//完成
  import refused from './company_task_list_tab/Refused' //批退

  export default {
    components: {noprogress,progressing,finished,refused},
    data() {
      return {
        isNoprogress:false,
        isProgressing:false,
        isFinished:false,
        isRefused:false,
        tab:'noprogress'
      }
    },
    mounted() {
      if(typeof(sessionStorage.companyTaskTab)!="undefined"){
          this.tab = sessionStorage.companyTaskTab
      }
       this.controlShow(this.tab)
    },
    computed: {

    },
    methods: {
      onClickO(name){
       //将tab类型 缓存
       sessionStorage.companyTaskTab = this.tab
        this.controlShow(name)
      },
       //控制处理中 tab 显示
      controlShow(name){
        this.isNoprogress = this.isProgressing = this.isFinished = this.isRefused = false;
        if(name=="noprogress" && this.isNoprogress === false){
          this.isNoprogress=true
        }
        if(name=="progressing" && this.isProgressing === false){
          this.isProgressing=true
        }
        if(name=="finished" && this.isFinished === false){
          this.isFinished=true
        }
        if(name=="refused" && this.isRefused === false){
          this.isRefused=true
        }
      }
    }
  }
</script>
