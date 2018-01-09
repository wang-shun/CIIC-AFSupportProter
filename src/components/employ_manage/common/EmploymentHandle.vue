<template>
  <div>
    <Form :label-width="150">
      <Row justify="start">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="实际录用日期：">
            <Input v-model="handle.actEmployDate" placeholder="请输入"/>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="开F单日期：">
            <Input v-model="handle.FDate" placeholder="请输入"/>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="用工形式：">
            <Select v-model="handle.employmentFormValue" transfer>
              <Option v-for="(employment, index) in employmentFormList" :key="index">{{employment}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="办理类型：">
            <Select v-model="handle.handleTypeValue" transfer>
              <Option v-for="(handleType, index) in handleTypeList" :key="index">{{handleType}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="用工属性：">
            <Select v-model="handle.employmentPropertyValue" transfer>
              <Option v-for="(property, index) in employmentPropertyList" :key="index">{{property}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="用工方式：">
            <Select v-model="handle.employmentMethodValue" transfer>
              <Option v-for="(method, index) in employmentMethodList" :key="index">{{method}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="用工操作专员：">
            <Input v-model="handle.employmentCommissioner" placeholder="请输入"/>
          </Form-item>
        </Col>
      </Row>
      <Row>
        <Col :sm="{span: 24}" class="tr">
          <Button type="default">默认</Button>
          <Button type="primary">保存</Button>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<script>
  export default {
    props: {
      handleInfo: {
        type: Object
      }
    },
    data() {
      return {
        employmentFormList: [],
        handleTypeList: [],
        employmentPropertyList: [],
        employmentMethodList: [],
      }
    },
    computed: {
      handle() {
        return this.handleInfo;
      }
    }
  }
</script>
