<template>
  <div>
    <Form :label-width="150">
      <Row type="flex" justify="start">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="实际结费日期：">
            <DatePicker v-model="fileSettle.closeFeeDate" type="date" placeholder="" @on-open-change="setCurrentDate" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="退工档案费缴至：">
            <DatePicker v-model="fileSettle.resignDocPaymentTo" type="date" placeholder=""  @on-open-change="setCurrentDate4"  transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="支付档案费金额：">
            <Input v-model="fileSettle.payDocAmount" placeholder="请输入"  :maxlength="50"/>
            <input type="text" v-model="fileSettle.archiveId" hidden>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="档案结费起始日期：">
            <DatePicker v-model="fileSettle.closeFeeStartDate" type="date" placeholder="" @on-open-change="setCurrentDate2"  transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="退工单并档日期：">
            <DatePicker v-model="fileSettle.resignDocDate" type="date" placeholder="" @on-open-change="setCurrentDate3"  transfer></DatePicker>
          </Form-item>
        </Col>
      </Row>
      <Row type="flex" justify="start" class="mt20">
        <Col :sm="{span: 24}" class="tr">
          <Button type="primary" @click="instance()">保存</Button>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<script>
import api from '../../../api/employ_manage/hire_operator'
  export default {
    props: {
      fileSettleInfo: {
        type: Object,
        required: true
      }
    },
    data() {
      return {

      }
    },
    methods: {
      resetForm(form) {
        this.$refs[form].resetFields();
      },isNumber(val){
          var regPos = /^\d+(\.\d+)?$/; //非负浮点数
          var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
          if(regPos.test(val) || regNeg.test(val)){
              return true;
          }else{
              return false;
          }
      },instance() { 
        var isNumber = this.isNumber(this.fileSettle.payDocAmount);
        if(!isNumber)
        {
          this.$Message.error("支付档案费金额必须是数字！");
          return;
        }
        
        var fromData = this.$utils.clear(this.fileSettle,'');
       
        if(this.fileSettle.employDocPaymentTo){
             fromData.employDocPaymentTo = this.$utils.formatDate(this.fileSettle.employDocPaymentTo, 'YYYY-MM-DD');
        }
        if(this.fileSettle.storageDate){
             fromData.storageDate = this.$utils.formatDate(this.fileSettle.storageDate, 'YYYY-MM-DD');
        }
        if(this.fileSettle.inFileDate){
             fromData.inFileDate = this.$utils.formatDate(this.fileSettle.inFileDate, 'YYYY-MM-DD');
        }
        if(this.fileSettle.docHalfwayOutDate){
            fromData.docHalfwayOutDate = this.$utils.formatDate(this.fileSettle.docHalfwayOutDate, 'YYYY-MM-DD');
        }
        if(this.fileSettle.manualStorageDate){
             fromData.manualStorageDate = this.$utils.formatDate(this.fileSettle.manualStorageDate, 'YYYY-MM-DD');
        }
        if(this.fileSettle.afterEmployManualReceiveDate){
            fromData.afterEmployManualReceiveDate = this.$utils.formatDate(this.fileSettle.afterEmployManualReceiveDate, 'YYYY-MM-DD');
        }
        if(this.fileSettle.recoverEmployManualStorageDate){
              fromData.recoverEmployManualStorageDate = this.$utils.formatDate(this.fileSettle.recoverEmployManualStorageDate, 'YYYY-MM-DD');
        }
        if(this.fileSettle.mailDocReturnDate){
               fromData.mailDocReturnDate = this.$utils.formatDate(this.fileSettle.mailDocReturnDate, 'YYYY-MM-DD');
        }
        if(this.fileSettle.openDocProofDate){
             fromData.openDocProofDate = this.$utils.formatDate(this.fileSettle.openDocProofDate, 'YYYY-MM-DD');
        }
       if(this.fileSettle.closeFeeDate){
             fromData.closeFeeDate = this.$utils.formatDate(this.fileSettle.closeFeeDate, 'YYYY-MM-DD');
       }
        if(this.fileSettle.closeFeeStartDate){
             fromData.closeFeeStartDate = this.$utils.formatDate(this.fileSettle.closeFeeStartDate, 'YYYY-MM-DD');
        }
        if(this.fileSettle.resignDocDate){
             fromData.resignDocDate = this.$utils.formatDate(this.fileSettle.resignDocDate, 'YYYY-MM-DD');
        }
       if(this.fileSettle.storageOutDate){
            fromData.storageOutDate = this.$utils.formatDate(this.fileSettle.storageOutDate, 'YYYY-MM-DD');
       }
       if(this.fileSettle.postLetterDate){
           fromData.postLetterDate = this.$utils.formatDate(this.fileSettle.postLetterDate, 'YYYY-MM-DD');
       }
        
       if(this.fileSettle.budiaoDocDate1){
            fromData.budiaoDocDate1 = this.$utils.formatDate(this.fileSettle.budiaoDocDate1, 'YYYY-MM-DD');
       }
       if(this.fileSettle.budiaoDocDate2){
            fromData.budiaoDocDate2 = this.$utils.formatDate(this.fileSettle.budiaoDocDate2, 'YYYY-MM-DD');
       }
       if(this.fileSettle.resignDocPaymentTo){
            fromData.resignDocPaymentTo = this.$utils.formatDate(this.fileSettle.resignDocPaymentTo, 'YYYY-MM-DD');
       }
       
       
        api.saveAmArchive(fromData).then(data => {
              if (data.code == 200) {
                this.$Message.success("保存成功");
                this.fileSettle.archiveId = data.data.archiveId;
              } else {
                this.$Message.error("保存失败！" + data.message);
              }
        })
         
       },
       currentDate(){
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
          if(this.fileSettle.closeFeeDate==''||this.fileSettle.closeFeeDate==undefined)
          {
             this.$set(this.fileSettle, 'closeFeeDate', this.currentDate());
          }
        }
      },setCurrentDate2(e) {
       
        if(e){
          if(this.fileSettle.closeFeeStartDate==''||this.fileSettle.closeFeeStartDate==undefined)
          {
             this.$set(this.fileSettle, 'closeFeeStartDate', this.currentDate());
          }
        }
      },setCurrentDate3(e) {
        if(e){
          if(this.fileSettle.resignDocDate==''||this.fileSettle.resignDocDate==undefined)
          {
             this.$set(this.fileSettle, 'resignDocDate', this.currentDate());
          }
        }
      },setCurrentDate4(e) {
        if(e){
          if(this.fileSettle.resignDocPaymentTo==''||this.fileSettle.resignDocPaymentTo==undefined)
          {
             this.$set(this.fileSettle, 'resignDocPaymentTo', this.currentDate());
          }
        }
      }
    },
    computed: {
      fileSettle() {
        return this.fileSettleInfo;
      }
    }
  }
</script>
