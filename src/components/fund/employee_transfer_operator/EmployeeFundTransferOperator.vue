<template>
  <div class="smList">
    <Tabs v-model="tab"  @on-click="onClickO">
      <TabPane label="未处理" name="noprocess" >
        <no-process  v-if="isNoProcess"></no-process>
      </TabPane>
      <TabPane label="已处理" name="processed"  >
        <processed v-if="isProcessed"></processed>
      </TabPane>
      <TabPane label="不需处理" name="rejected" >
        <refused  v-if="isRejected"></refused>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import {localStorage, sessionStorage} from '../../../assets/api/storage'
  import noProcess from './employee_transfer_operator_tab/NoProcess.vue'
  import processed from './employee_transfer_operator_tab/Processed.vue'
  import refused from './employee_transfer_operator_tab/Refused.vue'

  export default {
    components: {noProcess, processed, refused},
    data() {
      return {
        tab: 'noprocess',
        isNoProcess: true,
        isProcessed: false,
        isRejected: false,
      }
    },
    created() {
     if(typeof(sessionStorage.fundEmployeeZYTab)!="undefined"){
        this.tab = sessionStorage.fundEmployeeZYTab
      }
      this.controlShow(this.tab)
     },
    mounted() {
      
    },
    computed: {

    },
    methods: {
      onClickO(name){
        //将tab类型 缓存
        sessionStorage.fundEmployeeZYTab = name
        this.controlShow(name)
        //this.$refs.noprogress.searchEmployeeInit();
      },
      //控制处理中 tab 显示
      controlShow(name){
        if(name=="noprocess"&&!this.isNoProcess) this.isNoprocess=true
        if(name=="processed"&&!this.isProcessed) this.isProcessed=true
        if(name=="rejected"&&!this.isRejected) this.isRejected=true
      }
    }
  }
</script>
