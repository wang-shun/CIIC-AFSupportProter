<template>
  <div>
    <Form :label-width="150">
      <Row type="flex" justify="start">

        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="组织机构代码：">
            {{employSpecial.organizationCode}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="Ukey类别：" prop="UkeyType">
            {{employSpecial.keyType}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="uKey编号：">
             {{employSpecial.keyCode}}
          </Form-item>
        </Col>

        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="档案部uKey密码：">
            {{employSpecial.keyPwd}}
          </Form-item>
        </Col>

        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="ukey序列号：">
            {{employSpecial.keySeq}}
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
    computed: {
      employSpecial() {
        return this.employIndependentInfo;
      }
    },
    methods: {

   }
  }
</script>
