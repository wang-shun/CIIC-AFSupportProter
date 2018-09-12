<template>
  <div>
    <Form :label-width="150">
      <Row type="flex" justify="start">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="补调档案日期1：">
            <DatePicker v-model="makeUpFile.budiaoDocDate1" type="date" placeholder="" @on-open-change="setCurrentDate" @on-change="changeDate" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="补调档人1：">
            <Input v-model="makeUpFile.budiaoDocMan1" placeholder="请输入" :maxlength="50"/>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Button type="primary" class="ml10" @click="instance()">保存</Button>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="补调档案日期2：">
            <DatePicker v-model="makeUpFile.budiaoDocDate2" type="date" placeholder="" @on-open-change="setCurrentDate2" @on-change="changeDate2" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="补调档人2：">
            <Input v-model="makeUpFile.budiaoDocMan2" placeholder="请输入" :maxlength="50"/>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Button type="primary" class="ml10" @click="instance()">保存</Button>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<script>
import api from '../../../api/employ_manage/hire_operator'
  export default {
    props: {
      makeUpFileInfo: {
        type: Object,
        required: true
      }
    },
    data() {
      return {

      }
    },
    computed: {
      makeUpFile() {
        return this.makeUpFileInfo;
      }
    },
    methods: {
      resetForm(form) {
        this.$refs[form].resetFields();
      },instance() { 
        var fromData = this.$utils.clear(this.makeUpFile,'');
        
        if(this.makeUpFile.employDocPaymentTo){
             fromData.employDocPaymentTo = this.$utils.formatDate(this.makeUpFile.employDocPaymentTo, 'YYYY-MM-DD');
        }
        if(this.makeUpFile.storageDate){
             fromData.storageDate = this.$utils.formatDate(this.makeUpFile.storageDate, 'YYYY-MM-DD');
        }
        if(this.makeUpFile.inFileDate){
             fromData.inFileDate = this.$utils.formatDate(this.makeUpFile.inFileDate, 'YYYY-MM-DD');
        }
        if(this.makeUpFile.docHalfwayOutDate){
            fromData.docHalfwayOutDate = this.$utils.formatDate(this.makeUpFile.docHalfwayOutDate, 'YYYY-MM-DD');
        }
        if(this.makeUpFile.manualStorageDate){
             fromData.manualStorageDate = this.$utils.formatDate(this.makeUpFile.manualStorageDate, 'YYYY-MM-DD');
        }
        if(this.makeUpFile.afterEmployManualReceiveDate){
            fromData.afterEmployManualReceiveDate = this.$utils.formatDate(this.makeUpFile.afterEmployManualReceiveDate, 'YYYY-MM-DD');
        }
        if(this.makeUpFile.recoverEmployManualStorageDate){
              fromData.recoverEmployManualStorageDate = this.$utils.formatDate(this.makeUpFile.recoverEmployManualStorageDate, 'YYYY-MM-DD');
        }
        if(this.makeUpFile.mailDocReturnDate){
               fromData.mailDocReturnDate = this.$utils.formatDate(this.makeUpFile.mailDocReturnDate, 'YYYY-MM-DD');
        }
        if(this.makeUpFile.openDocProofDate){
             fromData.openDocProofDate = this.$utils.formatDate(this.makeUpFile.openDocProofDate, 'YYYY-MM-DD');
        }
       if(this.makeUpFile.closeFeeDate){
             fromData.closeFeeDate = this.$utils.formatDate(this.makeUpFile.closeFeeDate, 'YYYY-MM-DD');
       }
        if(this.makeUpFile.closeFeeStartDate){
             fromData.closeFeeStartDate = this.$utils.formatDate(this.makeUpFile.closeFeeStartDate, 'YYYY-MM-DD');
        }
        if(this.makeUpFile.resignDocDate){
             fromData.resignDocDate = this.$utils.formatDate(this.makeUpFile.resignDocDate, 'YYYY-MM-DD');
        }
       if(this.makeUpFile.storageOutDate){
            fromData.storageOutDate = this.$utils.formatDate(this.makeUpFile.storageOutDate, 'YYYY-MM-DD');
       }
       if(this.makeUpFile.postLetterDate){
           fromData.postLetterDate = this.$utils.formatDate(this.makeUpFile.postLetterDate, 'YYYY-MM-DD');
       }
        
       if(this.makeUpFile.budiaoDocDate1){
            fromData.budiaoDocDate1 = this.$utils.formatDate(this.makeUpFile.budiaoDocDate1, 'YYYY-MM-DD');
       }
       if(this.makeUpFile.budiaoDocDate2){
            fromData.budiaoDocDate2 = this.$utils.formatDate(this.makeUpFile.budiaoDocDate2, 'YYYY-MM-DD');
       }

       if(this.makeUpFile.resignDocPaymentTo){
            fromData.resignDocPaymentTo = this.$utils.formatDate(this.makeUpFile.resignDocPaymentTo, 'YYYY-MM-DD');
       }
       
        api.saveAmArchive(fromData).then(data => {
              if (data.code == 200) {
                this.$Message.success("保存成功");
                this.makeUpFile.archiveId = data.data.archiveId;
              } else {
                this.$Message.error("保存失败！" + data.message);
              }
        })
         
       },currentDate(){
              var date = new Date();
              var seperator1 = "-";
              var year = date.getFullYear();
              var month = date.getMonth() + 1;
              var strDate = date.getDate();
              if (month >= 1 && month <= 9) {
                  month = "0" + month;
              }
              if (strDate >= 0 && strDate <= 9) {
                  strDate = "0" + strDate;
              }
              var currentdate = year + seperator1 + month + seperator1 + strDate;
              return currentdate;
       },setCurrentDate(e) {
        if(e){
          if(this.makeUpFile.budiaoDocDate1==''||this.makeUpFile.budiaoDocDate1==undefined)
          {
             this.makeUpFile.budiaoDocDate1 = this.currentDate();
             this.makeUpFile.budiaoDocMan1 = JSON.parse(localStorage.getItem('userInfo')).displayName;
          }
        }
      },changeDate(e) {
        this.makeUpFile.budiaoDocDate1 = e;
      },setCurrentDate2(e) {
        if(e){
          if(this.makeUpFile.budiaoDocDate2==''||this.makeUpFile.budiaoDocDate2==undefined)
          {
             this.makeUpFile.budiaoDocDate2 = this.currentDate();
             this.makeUpFile.budiaoDocMan2 = JSON.parse(localStorage.getItem('userInfo')).displayName;
          }
        }
      },changeDate2(e) {
        this.makeUpFile.budiaoDocDate2 = e;
      },
    }
  }
</script>
