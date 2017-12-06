<template>
  <div class="smList">
    <Tabs value="noprogress" @on-click='onClickO'>
      <TabPane label="未处理" name="noprogress" >
        <noprogress></noprogress>
      </TabPane>
      <TabPane label="处理中" name="progressing">
        <progressing v-if="isProgressing"></progressing>
      </TabPane>
      <TabPane label="已完成" name="finished">
        <finished v-if="isFinished"></finished>
      </TabPane>
      <TabPane label="批退" name="refused">
        <refused v-if="isRefused"></refused>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import noprogress from './company_task_list_tab/Noprogress'//未处理
  import progressing from './company_task_list_tab/Progressing'//处理中
  import finished from './company_task_list_tab/Finished'//完成
  import refused from './company_task_list_tab/Refused' //批退
  
  export default {
    components: {noprogress,progressing,finished,refused},
    data() {
      return {
        isProgressing:false,
        isFinished:false,
        isRefused:false
      }
    },
    mounted() {

    },
    computed: {

    },
    methods: {
      onClickO(name){
        if(name=="progressing"&&!this.isProgressing)this.isProgressing=true
        if(name=="finished"&&!this.isFinished)this.isFinished=true
        if(name=="refused"&&!this.isRefused)this.isRefused=true
      }

    }
  }
</script>
