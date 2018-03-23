<template>
  <div>
    <Form ref="row" :model="row" :label-width="140">
      <Row type="flex" justify="start" class="m15">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="投保项目：">
          {{row.productName}}
        </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="合同开始时间：">
          {{row.diseaseName}}
        </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="公司编号：">
          {{row.companyId}}
        </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="公司名称：">
          {{row.companyName}}
        </Form-item>
        </Col>
        <!--<Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">-->
        <!--<Form-item label="客户经理：">-->
        <!--{{row.selfPayAmount}}-->
        <!--</Form-item>-->
        <!--</Col>-->
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="证件号码：">
          {{row.idNum}}
        </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="保险开始日期：">
          {{this.$utils.formatDate(row.startConfirmDate, 'YYYY-MM-DD')}}
        </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="保险结束日期：">
          {{timeToString(row.endConfirmDate)}}
        </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="提交人：">
          {{row.createdBy}}
        </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="提交时间：">
          {{this.$utils.formatDate(row.createdTime, 'YYYY-MM-DD HH:mm:ss')}}
        </Form-item>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script>
  export default {
    name: "task-expend",
    props: {
      row: Object
    },
    methods: {
      timeToString(val) {
        if (val !== null) {
          return this.$utils.formatDate(val, 'YYYY-MM-DD')
        } else {
          return val;
        }
      }
    }
  }
</script>
