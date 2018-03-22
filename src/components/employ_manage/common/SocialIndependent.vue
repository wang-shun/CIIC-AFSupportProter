<template>
  <div>
    <Form :label-width="150">
      <Row type="flex" justify="start">
        
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="">
            <Checkbox v-model="employSpecial.companySpecial21" true-value="1" false-value="0">社保自办</Checkbox>
          </Form-item>
        </Col>

         <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="">
            <Checkbox v-model="employSpecial.companySpecial22" true-value="1" false-value="0">公司特殊情况</Checkbox>
          </Form-item>
        </Col>

         <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="备注：">
            <Input v-model="employSpecial.remark" placeholder="请输入"/>
          </Form-item>
        </Col>

      </Row>
      <Row type="flex" justify="start">
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
      employIndependentInfo: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
       
      }
    },
    computed: {
      employSpecial() {
        return this.employIndependentInfo;
      }
    },
    methods: {

       instance() {
        
       var fromData = this.$utils.clear(this.employIndependentInfo,'');

        var str = '';
        if(this.employIndependentInfo.companySpecial21==1)
        {
          str = str + '社保自办'+',';
        }

        if(this.employIndependentInfo.companySpecial22==1)
        {
          str = str + '公司特殊情况'+',';
        }

        fromData.socialSpecial = str;
       
        api.saveCompanySet(fromData).then(data => {
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
