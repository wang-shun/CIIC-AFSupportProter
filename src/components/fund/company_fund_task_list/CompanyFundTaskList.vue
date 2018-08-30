<template>
  <div class="smList">
    <Tabs v-model="tab"  @on-click="onClickO">
      <TabPane label="未处理" name="noprogress">
      </TabPane>
      <TabPane label="处理中" name="progressing">
      </TabPane>
      <TabPane label="已完成" name="finished">
      </TabPane>
      <TabPane label="已批退" name="refused">
      </TabPane>
    </Tabs>
    <no-process v-show="isNoprogress"></no-process>
    <processing v-show="isProgressing"></processing>
    <finished v-show="isFinished"></finished>
    <refused v-show="isRefused"></refused>
  </div>
</template>
<script>
  import noProcess from './company_fund_task_list_tab/NoProcess.vue'
  import processing from './company_fund_task_list_tab/Processing.vue'
  import finished from './company_fund_task_list_tab/Finished.vue'
  import refused from './company_fund_task_list_tab/Refused.vue'

  export default {
    components: {noProcess, processing, finished, refused},
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
      if(typeof(sessionStorage.fundcompanyTaskTab)!="undefined"){
          this.tab = sessionStorage.fundcompanyTaskTab
      }
       this.controlShow(this.tab)
    },
    computed: {

    },
    methods: {
      onClickO(name){
       //将tab类型 缓存
       sessionStorage.fundcompanyTaskTab = this.tab
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
