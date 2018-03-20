<template>
  <div>
    <Form ref="row" :model="row" :label-width="140">
      <Row type="flex" justify="start" class="m15">
        <!--TODO 等待接受服务中心字段-->
        <!--<Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <FormItem label="服务中心：">
          <span class="expand-value">仲晨光 1  西区2</span>
        </FormItem>
        </Col>-->
        <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <FormItem label="公司编号：">
          {{row.companyId}}
        </FormItem>
        </Col>
        <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <FormItem label="公司名称：">
          {{row.companyName}}
        </FormItem>
        </Col>
        <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <FormItem label="投保对象：">
          {{row.employeeName}}
        </FormItem>
        </Col>
        <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <FormItem label="保险名称：">
          {{row.productName}}
        </FormItem>
        </Col>
        <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <FormItem label="投保公司：">
          {{row.companyName}}
        </FormItem>
        </Col>
        <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <FormItem label="投保日期：">
          {{timeToString(row.insuranceDate)}}
        </FormItem>
        </Col>
        <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <FormItem label="退保日期：">
          {{timeToString(row.surrenderDate)}}
        </FormItem>
        </Col>
        <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <FormItem label="保额：">
          {{row.keyValue}}
        </FormItem>
        </Col>
        <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <FormItem label="保险起始日期：">
          {{timeToString(row.insuranceStartDate)}}
        </FormItem>
        </Col>
        <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <FormItem label="保险结束日期：">
          {{timeToString(row.insuranceEndDate)}}
        </FormItem>
        </Col>
        <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <FormItem label="说明：">
          {{row.remark}}
        </FormItem>
        </Col>
      </Row>
    </Form>

  </div>
</template>
<script>
  export default {
    name: "expend-row",
    props: {
      row: Object
    },
    methods: {
      timeToString(val) {
        if (val !== null) {
          return this.$utils.formatDate(val, 'YYYY-MM-DD HH:mm:ss')
        } else {
          return val;
        }
      }
    }
  }
</script>
