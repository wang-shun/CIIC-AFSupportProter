<template>
  <div>
    <Form :label-width="150">
      <Row type="flex" justify="start">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="实际结费日期：">
            <DatePicker v-model="fileSettle.closeFeeDate" type="date" placeholder="" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="退工档案费缴至：">
            <Input v-model="fileSettle.resignDocPaymentTo" placeholder="请输入"/>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="支付档案费金额：">
            <Input v-model="fileSettle.payDocAmount" placeholder="请输入"/>
            <input type="text" v-model="fileSettle.archiveId" hidden>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="档案结费起始日期：">
            <DatePicker v-model="fileSettle.closeFeeStartDate" type="date" placeholder="" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="退工单并档日期：">
            <DatePicker v-model="fileSettle.resignDocDate" type="date" placeholder="" transfer></DatePicker>
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
      },instance() { 
        var fromData = this.$utils.clear(this.fileSettle,'');
       
        fromData.closeFeeDate = this.$utils.formatDate(this.fileSettle.closeFeeDate, 'YYYY-MM-DD');
        fromData.closeFeeStartDate = this.$utils.formatDate(this.fileSettle.closeFeeStartDate, 'YYYY-MM-DD');
        fromData.resignDocDate = this.$utils.formatDate(this.fileSettle.resignDocDate, 'YYYY-MM-DD');

        fromData.docHalfwayOutDate = this.$utils.formatDate(this.fileSettle.docHalfwayOutDate, 'YYYY-MM-DD');
        fromData.manualStorageDate = this.$utils.formatDate(this.fileSettle.manualStorageDate, 'YYYY-MM-DD');
        fromData.afterEmployManualReceiveDate = this.$utils.formatDate(this.fileSettle.afterEmployManualReceiveDate, 'YYYY-MM-DD');
        fromData.recoverEmployManualStorageDate = this.$utils.formatDate(this.fileSettle.recoverEmployManualStorageDate, 'YYYY-MM-DD');
        fromData.mailDocReturnDate = this.$utils.formatDate(this.fileSettle.mailDocReturnDate, 'YYYY-MM-DD');
        fromData.openDocProofDate = this.$utils.formatDate(this.fileSettle.openDocProofDate, 'YYYY-MM-DD');
       
        fromData.employDocPaymentTo = this.$utils.formatDate(this.fileSettle.employDocPaymentTo, 'YYYY-MM-DD');
        fromData.storageDate = this.$utils.formatDate(this.fileSettle.storageDate, 'YYYY-MM-DD');
        fromData.inFileDate = this.$utils.formatDate(this.fileSettle.inFileDate, 'YYYY-MM-DD');

        fromData.storageOutDate = this.$utils.formatDate(this.fileSettle.storageOutDate, 'YYYY-MM-DD');
        fromData.postLetterDate = this.$utils.formatDate(this.fileSettle.postLetterDate, 'YYYY-MM-DD');

        fromData.budiaoDocDate1 = this.$utils.formatDate(this.fileSettle.budiaoDocDate1, 'YYYY-MM-DD');
        fromData.budiaoDocDate2 = this.$utils.formatDate(this.fileSettle.budiaoDocDate2, 'YYYY-MM-DD');
       
        api.saveAmArchive(fromData).then(data => {
              if (data.code == 200) {
                this.$Message.success("保存成功");
                 history.go(-1);
              } else {
                this.$Message.error("保存失败！" + data.message);
              }
        })
         
       }
    },
    computed: {
      fileSettle() {
        return this.fileSettleInfo;
      }
    }
  }
</script>
