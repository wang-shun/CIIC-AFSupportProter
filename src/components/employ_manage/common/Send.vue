<template>
  <div>
    <Form :label-width="150">
      <Row type="flex" justify="start">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
             <Form-item label="">
            <Checkbox v-model="refuse.post" true-value="1" false-value="0" @on-change="Changebox">寄信</Checkbox>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="操作员：">
            {{refuse.postSaver}}
          </Form-item>
        </Col>
      </Row>
      <Row type="flex" justify="start">
        <Col :sm="{span: 24}" class="tr">
          <Button type="primary"  :loading="isLoading"  @click="instance()">保存</Button>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<script>
 import api from '../../../api/employ_manage/hire_operator'
  export default {
    props: {
      refuseInfo: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        isLoading: false,
      }
    },
    computed: {
      refuse() {
        return this.refuseInfo;
      },
    },
    mounted(){
    },
    methods: {

       instance() {
         if(this.refuseInfo.employmentId==undefined)
         {
            this.$Message.success("没有对应的用工序号");
            return;
         }

         this.isLoading = true;

        var fromData = this.$utils.clear(this.refuseInfo,'');

        api.saveAmSend({employmentId: this.refuseInfo.employmentId,
                        post: this.refuseInfo.post,postSaver:this.refuseInfo.postSaver}).then(data => {
              if (data.data == true) {
                  this.$Message.success("保存成功");
                } else {
                  this.$Message.error("保存失败！" + data.message);
                }
                this.isLoading = false;
        })

       },Changebox(value){
           if(value==1){
             this.refuseInfo.postSaver = JSON.parse(localStorage.getItem('userInfo')).displayName;
           }else{
             this.refuseInfo.postSaver = "";
           }
       }

    }
  }
</script>
