<template>
  <div>
    <Form :label-width="150">
      <Row type="flex" justify="start">
        
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="">
            <Checkbox v-model="employSpecial.companySpecial8" true-value="1" false-value="0">具有档案保管资质</Checkbox>
          </Form-item>
        </Col>

         <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="">
            <Checkbox v-model="employSpecial.companySpecial9" true-value="1" false-value="0">公司自行保管档案</Checkbox>
          </Form-item>
        </Col>

         <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="">
            <Checkbox v-model="employSpecial.companySpecial10" true-value="1" false-value="0">用工不调档</Checkbox>
          </Form-item>
        </Col>

         <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="">
            <Checkbox v-model="employSpecial.companySpecial11" true-value="1" false-value="0">客服跟催档案</Checkbox>
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
        if(this.employIndependentInfo.companySpecial8==1)
        {
          str = str + '具有档案保管资质'+',';
        }

        if(this.employIndependentInfo.companySpecial9==1)
        {
          str = str + '公司自行保管档案'+',';
        }

        if(this.employIndependentInfo.companySpecial10==1)
        {
          str = str + '用工不调档'+',';
        }

        if(this.employIndependentInfo.companySpecial11==1)
        {
          str = str + '客服跟催档案'+',';
        }

        fromData.archiveSpecial = str;
        
       
        api.saveCompanySet(fromData).then(data => {
              if (data.code == 200) {
                  this.$Message.success("保存成功");
                } else {
                  this.$Message.error("保存失败！" + data.message);
                }
        })
         
         
       }
       
    }
  }
</script>
