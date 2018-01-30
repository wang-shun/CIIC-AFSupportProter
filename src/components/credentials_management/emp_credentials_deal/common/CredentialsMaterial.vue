<template>
  <div>
    <h3>材料收缴</h3>
    <Form :label-width="120">
      <Row v-for="item in meterials" :key="item.materialTypeRelationId">
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" >
            <Form-item v-if="item.level === '0-0'">
              <Checkbox v-model="formItem.f">{{item.materialName}}</Checkbox>
            </Form-item>
          </i-col>
       </Row>
       <Row >
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" >
            <Form-item>
              <Checkbox v-model="formItem.a">调沪方情况</Checkbox>
            </Form-item>
          </i-col>
       </Row>
       <Row >
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" >
            <Form-item>
              <RadioGroup v-model="formItem.b">
                <Radio label="调沪方情况（展开）"></Radio>
                <Radio label="在沪方情况（展开）"></Radio>
              </RadioGroup>
            </Form-item>
          </i-col>
       </Row>
       <Row v-if="formItem.b === '调沪方情况（展开）'" v-for="item in meterials" :key="item.materialTypeRelationId">
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" >
            <Form-item  v-if="item.level === '1-1'">
              <Checkbox v-model="formItem.c">{{item.materialName}}</Checkbox>
            </Form-item>
          </i-col>
       </Row>
       <Row v-if="formItem.b === '在沪方情况（展开）'">
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item>
              <Checkbox v-model="formItem.c">户口本</Checkbox>
            </Form-item>
          </i-col>
       </Row>
       <Row >
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" >
            <Form-item>
              <Checkbox v-model="formItem.d">婚姻证明</Checkbox>
            </Form-item>
          </i-col>
       </Row>
       <Row >
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" >
            <Form-item>
              <RadioGroup v-model="formItem.e">
                <Radio label="已婚未育"></Radio>
                <Radio label="已婚已育"></Radio>
              </RadioGroup>
            </Form-item>
          </i-col>
       </Row>
        <Row v-if="formItem.e === '已婚未育'">
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item>
              <Checkbox v-model="formItem.c">结婚证</Checkbox>
            </Form-item>
          </i-col>
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item>
              <Checkbox v-model="formItem.c">计生证明已婚未育</Checkbox>
            </Form-item>
          </i-col>
       </Row>
       <Row v-if="formItem.e === '已婚已育'">
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item>
              <Checkbox v-model="formItem.c">子女在读证明</Checkbox>
            </Form-item>
          </i-col>
       </Row>
        <Row >
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" >
            <Form-item>
              <Checkbox v-model="formItem.d">再婚情况</Checkbox>
            </Form-item>
          </i-col>
       </Row>
        <Row >
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item>
              <Checkbox v-model="formItem.c">离婚证</Checkbox>
            </Form-item>
          </i-col>
       </Row>
       <Row >
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" >
            <Form-item>
              <Checkbox v-model="formItem.d">在沪落户证明</Checkbox>
            </Form-item>
          </i-col>
       </Row>
        <Row >
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item>
              <Checkbox v-model="formItem.c">房产证</Checkbox>
            </Form-item>
          </i-col>
       </Row>
    </Form>
  </div>
</template>

<script>
import axios from 'axios'
import Tools from '../../../../lib/tools'
import Decode from '../../../../lib/decode'

const host = process.env.SITE_HOST
export default {
  props: {
    meterials: {
      type: Array,
      default() {
        return {}
      }
    }
  },
  data () {
    return {
      formItem: {
        a: ''
      }
    }
  },
  methods: {
    
  }  
}
</script>

<style scoped>

</style>
