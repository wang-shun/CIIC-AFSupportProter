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
      
      </Row>
     
    </Form>
  </div>
</template>
<script>
 
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
    }
  }
</script>
