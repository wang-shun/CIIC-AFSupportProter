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
            <Input v-model="stockAndMail.storageOutMan" placeholder="请输入"/>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="实际寄信日期：">
            <DatePicker v-model="stockAndMail.postLetterDate" type="date" placeholder="" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="实际寄信人：">
            <Input v-model="stockAndMail.postLetterMan" placeholder="请输入"/>
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
        
        fromData.closeFeeDate = this.$utils.formatDate(this.stockAndMail.closeFeeDate, 'YYYY-MM-DD');
        fromData.closeFeeStartDate = this.$utils.formatDate(this.stockAndMail.closeFeeStartDate, 'YYYY-MM-DD');
        fromData.resignDocDate = this.$utils.formatDate(this.stockAndMail.resignDocDate, 'YYYY-MM-DD');

        fromData.docHalfwayOutDate = this.$utils.formatDate(this.stockAndMail.docHalfwayOutDate, 'YYYY-MM-DD');
        fromData.manualStorageDate = this.$utils.formatDate(this.stockAndMail.manualStorageDate, 'YYYY-MM-DD');
        fromData.afterEmployManualReceiveDate = this.$utils.formatDate(this.stockAndMail.afterEmployManualReceiveDate, 'YYYY-MM-DD');
        fromData.recoverEmployManualStorageDate = this.$utils.formatDate(this.stockAndMail.recoverEmployManualStorageDate, 'YYYY-MM-DD');
        fromData.mailDocReturnDate = this.$utils.formatDate(this.stockAndMail.mailDocReturnDate, 'YYYY-MM-DD');
        fromData.openDocProofDate = this.$utils.formatDate(this.stockAndMail.openDocProofDate, 'YYYY-MM-DD');

        fromData.employDocPaymentTo = this.$utils.formatDate(this.stockAndMail.employDocPaymentTo, 'YYYY-MM-DD');
        fromData.storageDate = this.$utils.formatDate(this.stockAndMail.storageDate, 'YYYY-MM-DD');
        fromData.inFileDate = this.$utils.formatDate(this.stockAndMail.inFileDate, 'YYYY-MM-DD');

        fromData.storageOutDate = this.$utils.formatDate(this.stockAndMail.storageOutDate, 'YYYY-MM-DD');
        fromData.postLetterDate = this.$utils.formatDate(this.stockAndMail.postLetterDate, 'YYYY-MM-DD');
       
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
