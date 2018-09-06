<template>
  <div>
    <Form :label-width="150" ref="file1" :model="file1">
      <Row type="flex" justify="start">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="">
          <Checkbox v-model="file1.post" true-value="1" false-value="0">寄信</Checkbox>
        </Form-item>
        </Col>
      </Row>
      <Row type="flex" justify="start">
        <Col :sm="{span: 24}" class="tr">
        <Button type="primary" :loading="isLoading" @click="instance()">保存</Button>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<script>
  import api from '../../../api/employ_manage/hire_operator'
  import Vue from 'vue'
  export default {
    props: {
      fileInfo1: {
        type: Object
      }
    },
    data() {
      return {
        isLoading: false
      }
    },
    methods: {
      instance() {
        this.isLoading = true;
        var fromData = this.$utils.clear(this.file1,'');
        api.saveAmArchiveSend({archiveId: this.file1.archiveId, post: this.file1.post}).then(data => {
          if (data.data == true) {
            this.$Message.success("保存成功");
          } else {
            this.$Message.error("保存失败！");
          }
           this.isLoading = false;
        })

      }


    },
    computed: {
      file1() {
         var userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
         this.fileInfo1.username = userInfo.displayName;
        return this.fileInfo1;
      }
    }
  }
</script>
