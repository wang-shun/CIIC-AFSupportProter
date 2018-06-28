<template>
  <div>
    <Form :label-width="150">
      <Row type="flex" justify="start">
        
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="">
            <Checkbox v-model="employSpecial.companySpecial0" true-value="1" false-value="0">无材料用工</Checkbox>
          </Form-item>
        </Col>

         <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="">
            <Checkbox v-model="employSpecial.companySpecial1" true-value="1" false-value="0">提交材料复印件件无材料用工</Checkbox>
          </Form-item>
        </Col>

         <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="">
            <Checkbox v-model="employSpecial.companySpecial2" true-value="1" false-value="0">用工自办</Checkbox>
          </Form-item>
        </Col>

         <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="">
            <Checkbox v-model="employSpecial.companySpecial3" true-value="1" false-value="0">公司更名</Checkbox>
          </Form-item>
        </Col>

         <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="">
            <Checkbox v-model="employSpecial.companySpecial4" true-value="1" false-value="0">有盖章录用名册</Checkbox>
          </Form-item>
        </Col>

         <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="">
            <Checkbox v-model="employSpecial.companySpecial5" true-value="1" false-value="0">公司自开录用名册</Checkbox>
          </Form-item>
        </Col>

         <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="">
            <Checkbox v-model="employSpecial.companySpecial6" true-value="1" false-value="0">用工成功录用名册归还公司</Checkbox>
          </Form-item>
        </Col>

         <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="">
            <Checkbox v-model="employSpecial.companySpecial7" true-value="1" false-value="0">公司不同意名册盖章（电子章）</Checkbox>
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
        if(this.employIndependentInfo.companySpecial0==1)
        {
          str = str + '无材料用工'+',';
        }

        if(this.employIndependentInfo.companySpecial1==1)
        {
          str = str + '提交材料复印件件无材料用工'+',';
        }

        if(this.employIndependentInfo.companySpecial2==1)
        {
          str = str + '公司自开录用名册'+',';
        }

        if(this.employIndependentInfo.companySpecial3==1)
        {
          str = str + '公司更名'+',';
        }

        if(this.employIndependentInfo.companySpecial4==1)
        {
          str = str + '有盖章录用名册'+',';
        }

        if(this.employIndependentInfo.companySpecial5==1)
        {
          str = str + '公司自开录用名册'+',';
        }

        if(this.employIndependentInfo.companySpecial6==1)
        {
          str = str + '用工成功录用名册归还公司'+',';
        }

        if(this.employIndependentInfo.companySpecial7==1)
        {
          str = str + '公司不同意名册盖章（电子章）'+',';
        }

       fromData.employSpecial = str;
       
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
