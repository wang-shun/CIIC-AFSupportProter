<template>
  <div>
    <Form :label-width="150">
      <Row type="flex" justify="start">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="出库日期：">
            <DatePicker v-model="stockAndMail.storageOutDate" type="date" placeholder="" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="出库人：">
            <Input v-model="stockAndMail.storageOutMan" placeholder="请输入" :maxlength="50"/>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="实际寄信日期：">
            <DatePicker v-model="stockAndMail.postLetterDate" type="date" placeholder="" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="实际寄信人：">
            <Input v-model="stockAndMail.postLetterMan" placeholder="请输入" :maxlength="50"/>
            <input type="text" v-model="stockAndMail.archiveId" hidden>
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
      stockAndMailInfo: {
        type: Object
      }
    },
    data() {
      return {

      }
    },
    computed: {
      stockAndMail() {
        return this.stockAndMailInfo;
      }
    },
    methods: {
      resetForm(form) {
        this.$refs[form].resetFields();
      },instance() { 
        var fromData = this.$utils.clear(this.stockAndMail,'');
        
        if(this.stockAndMail.employDocPaymentTo){
             fromData.employDocPaymentTo = this.$utils.formatDate(this.stockAndMail.employDocPaymentTo, 'YYYY-MM-DD');
        }
        if(this.stockAndMail.storageDate){
             fromData.storageDate = this.$utils.formatDate(this.stockAndMail.storageDate, 'YYYY-MM-DD');
        }
        if(this.stockAndMail.inFileDate){
             fromData.inFileDate = this.$utils.formatDate(this.stockAndMail.inFileDate, 'YYYY-MM-DD');
        }
        if(this.stockAndMail.docHalfwayOutDate){
            fromData.docHalfwayOutDate = this.$utils.formatDate(this.stockAndMail.docHalfwayOutDate, 'YYYY-MM-DD');
        }
        if(this.stockAndMail.manualStorageDate){
             fromData.manualStorageDate = this.$utils.formatDate(this.stockAndMail.manualStorageDate, 'YYYY-MM-DD');
        }
        if(this.stockAndMail.afterEmployManualReceiveDate){
            fromData.afterEmployManualReceiveDate = this.$utils.formatDate(this.stockAndMail.afterEmployManualReceiveDate, 'YYYY-MM-DD');
        }
        if(this.stockAndMail.recoverEmployManualStorageDate){
              fromData.recoverEmployManualStorageDate = this.$utils.formatDate(this.stockAndMail.recoverEmployManualStorageDate, 'YYYY-MM-DD');
        }
        if(this.stockAndMail.mailDocReturnDate){
               fromData.mailDocReturnDate = this.$utils.formatDate(this.stockAndMail.mailDocReturnDate, 'YYYY-MM-DD');
        }
        if(this.stockAndMail.openDocProofDate){
             fromData.openDocProofDate = this.$utils.formatDate(this.stockAndMail.openDocProofDate, 'YYYY-MM-DD');
        }
       if(this.stockAndMail.closeFeeDate){
             fromData.closeFeeDate = this.$utils.formatDate(this.stockAndMail.closeFeeDate, 'YYYY-MM-DD');
       }
        if(this.stockAndMail.closeFeeStartDate){
             fromData.closeFeeStartDate = this.$utils.formatDate(this.stockAndMail.closeFeeStartDate, 'YYYY-MM-DD');
        }
        if(this.stockAndMail.resignDocDate){
             fromData.resignDocDate = this.$utils.formatDate(this.stockAndMail.resignDocDate, 'YYYY-MM-DD');
        }
       if(this.stockAndMail.storageOutDate){
            fromData.storageOutDate = this.$utils.formatDate(this.stockAndMail.storageOutDate, 'YYYY-MM-DD');
       }
       if(this.stockAndMail.postLetterDate){
           fromData.postLetterDate = this.$utils.formatDate(this.stockAndMail.postLetterDate, 'YYYY-MM-DD');
       }
        
       if(this.stockAndMail.budiaoDocDate1){
            fromData.budiaoDocDate1 = this.$utils.formatDate(this.stockAndMail.budiaoDocDate1, 'YYYY-MM-DD');
       }
       if(this.stockAndMail.budiaoDocDate2){
            fromData.budiaoDocDate2 = this.$utils.formatDate(this.stockAndMail.budiaoDocDate2, 'YYYY-MM-DD');
       }
       
        api.saveAmArchive(fromData).then(data => {
              if (data.code == 200) {
                this.$Message.success("保存成功");
                 history.go(-1);
              } else {
                this.$Message.error("保存失败！" + data.message);
              }
        })
         
       }
    }
  }
</script>
