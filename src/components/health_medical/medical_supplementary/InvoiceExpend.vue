<template>
  <div>
    <Row class="expand-row">
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
      <span class="expand-key">就诊机构：</span>
      <span class="expand-value">浦东新区公利医院</span>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
      <span class="expand-key">疾病名称：</span>
      <span class="expand-value">急性扁桃体炎</span>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
      <span class="expand-key">就诊日期：</span>
      <span class="expand-value">2015-12-13</span>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
      <span class="expand-key">自付金额：</span>
      <span class="expand-value">50.00</span>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
      <span class="expand-key">统筹金额：</span>
      <span class="expand-value">0.00</span>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
      <span class="expand-key">附加金额：</span>
      <span class="expand-value">0.00</span>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
      <span class="expand-key">自费金额：</span>
      <span class="expand-value">0.00</span>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
      <span class="expand-key">账户金额：</span>
      <span class="expand-value">0.00</span>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
      <span class="expand-key">申请金额：</span>
      <span class="expand-value">0.00</span>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
      <span class="expand-key">赔付金额：</span>
      <span class="expand-value">0.00</span>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
      <span class="expand-key">核准金额：</span>
      <span class="expand-value">0.00</span>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
      <span class="expand-key">分类自付金额：</span>
      <span class="expand-value">0.00</span>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
      <span class="expand-key">公司理赔金额：</span>
      <span class="expand-value"></span>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
      <Form ref="formItem" :model="formItem" :label-width="140">
        <Form-item label="保险理赔金额：" prop="inputDateRange">
          <Input v-model="row.column7" size="large" placeholder="large size"/>
        </Form-item>
      </Form>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
      <span class="expand-key">结案状态：</span>
      <span class="expand-value">急性扁桃体炎</span>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
      <span class="expand-key">结案备注：</span>
      <span class="expand-value">急性扁桃体炎</span>
      </Col>
    </Row>
    <Row type="flex" justify="start">
      <Col :sm="{span: 24}" class="tr">
      <Button type="primary" style="margin-left:35px;">保存修改</Button>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    name: "invoice-expend",
    props: {
      row: Object
    }
  }
</script>

<style scoped>

</style>
