<template>
  <div>
    <Form :label-width="150">
      <Row type="flex" justify="start">
        
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="">
            <Checkbox v-model="employSpecial.companySpecial12" true-value="1" false-value="0">公司自开退工单</Checkbox>
          </Form-item>
        </Col>

         <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="">
            <Checkbox v-model="employSpecial.companySpecial13" true-value="1" false-value="0">退工材料公司自行归档</Checkbox>
          </Form-item>
        </Col>

         <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="">
            <Checkbox v-model="employSpecial.companySpecial14" true-value="1" false-value="0">公司自留存根联</Checkbox>
          </Form-item>
        </Col>

         <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="">
            <Checkbox v-model="employSpecial.companySpecial15" true-value="1" false-value="0">退工自办</Checkbox>
          </Form-item>
        </Col>

         <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="">
            <Checkbox v-model="employSpecial.companySpecial16" true-value="1" false-value="0">上海人退工单</Checkbox>
          </Form-item>
        </Col>

         <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="">
            <Checkbox v-model="employSpecial.companySpecial17" true-value="1" false-value="0">外来从业人员退工单</Checkbox>
          </Form-item>
        </Col>

         <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="">
            <Checkbox v-model="employSpecial.companySpecial18" true-value="1" false-value="0">退工单人事章</Checkbox>
          </Form-item>
        </Col>

         <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="">
            <Checkbox v-model="employSpecial.companySpecial19" true-value="1" false-value="0">不寄退工单</Checkbox>
          </Form-item>
        </Col>

         <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="">
            <Checkbox v-model="employSpecial.companySpecial20" true-value="1" false-value="0">网办并退工单送职介？？？</Checkbox>
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
        if(this.employIndependentInfo.companySpecial12==1)
        {
          str = str + '公司自开退工单'+',';
        }

        if(this.employIndependentInfo.companySpecial13==1)
        {
          str = str + '退工材料公司自行归档'+',';
        }

        if(this.employIndependentInfo.companySpecial14==1)
        {
          str = str + '公司自留存根联'+',';
        }

        if(this.employIndependentInfo.companySpecial15==1)
        {
          str = str + '退工自办'+',';
        }

        if(this.employIndependentInfo.companySpecial16==1)
        {
          str = str + '上海人退工单'+',';
        }

        if(this.employIndependentInfo.companySpecial17==1)
        {
          str = str + '外来从业人员退工单'+',';
        }

        if(this.employIndependentInfo.companySpecial18==1)
        {
          str = str + '退工单人事章'+',';
        }

        if(this.employIndependentInfo.companySpecial19==1)
        {
          str = str + '不寄退工单'+',';
        }

        if(this.employIndependentInfo.companySpecial20==1)
        {
          str = str + '网办并退工单送职介？？？'+',';
        }

        fromData.refuseSpecial = str;

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
