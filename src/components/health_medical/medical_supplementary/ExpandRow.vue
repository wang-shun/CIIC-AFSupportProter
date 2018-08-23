<style scoped>
  .expand-row {
    margin-bottom: 16px;
  }
</style>
<template>
  <div>
    <Form>
      <Row>
        <Col span="8">
          <FormItem label="就诊机构：">
            <span class="expand-value">浦东新区公利医院</span>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="疾病名称：">
            <span class="expand-value">急性扁桃体炎</span>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="就诊日期：">
            <span class="expand-value">2015-12-13</span>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="自付金额：">
            <span class="expand-value">50.00</span>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="统筹金额：">
            <span class="expand-value">0.00</span>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="附加金额：">
            <span class="expand-value">0.00</span>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <FormItem label="自费金额：">
            <span class="expand-value">0.00</span>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="账户金额：">
            <span class="expand-value">0.00</span>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="申请金额：">
            <span class="expand-value">0.00</span>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="赔付金额：">
            <span class="expand-value">0.00</span>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="6">
          <FormItem label="核准金额：">
            <span class="expand-value">0.00</span>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="分类自付金额：">
            <span class="expand-value">0.00</span>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="公司理赔金额：">
            <Input type="text" style="width: 190px" value="0.00"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="保险理赔金额：">
            <span class="expand-value">0.00</span>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="9">
          <FormItem label="结案状态：">
            <span class="expand-value">已结</span>
          </FormItem>
        </Col>
        <Col span="9">
          <FormItem label="结案备注：">
            <span class="expand-value"></span>
          </FormItem>
        </Col>
        <Col span="2">
          <FormItem label="   ">
            <br>
            <Button type="primary" style="margin-left:35px;">保存修改</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>

  </div>
</template>
<script>
  export default {
    props: {
      row: Object
    }
  };
</script>
