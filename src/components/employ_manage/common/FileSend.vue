<template>
  <div>
    <Form :label-width="150" ref="file1" :model="file1">
      <Row type="flex" justify="start">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="">
          <Checkbox v-model="file1.post" true-value="1" false-value="0"  @on-change="Changebox">寄信</Checkbox>
        </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="操作员：">
            {{file1.postSaver}}
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
  import {localStorage, sessionStorage} from '../../../assets/api/storage'
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
        if(this.file1.archiveId===undefined||this.file1.archiveId===''){
          this.$Message.success("请先保存用工档案数据！");
          return;
        }
        api.saveAmArchiveSend({archiveId: this.file1.archiveId, post: this.file1.post,postSaver:this.file1.postSaver}).then(data => {
          if (data.data == true) {
            this.$Message.success("保存成功");
            
          } else {
            this.$Message.error("保存失败！");
          }
           this.isLoading = false;
        })

      },Changebox(value){
           if(value==1){
             this.file1.postSaver = JSON.parse(localStorage.getItem('userInfo')).displayName;
           }else{
             this.file1.postSaver = "";
           }
       }


    },
    computed: {
      file1() {
         var userInfo = JSON.parse(localStorage.getItem("userInfo"));
         this.fileInfo1.username = userInfo.displayName;
        return this.fileInfo1;
      }
    }
  }
</script>
