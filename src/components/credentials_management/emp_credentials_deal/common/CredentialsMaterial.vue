<template>
  <div>
    <Form :model="formItem" :label-width="120">
      <Row style="margin: 10px 20px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 5}" >
          <span style="font-weight:bold;font-size:14px">主要材料</span>
        </i-col>
      </Row>
      <Row>
        <div v-for="item in meterials" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}"  >
          <Form-item v-if="item.level === '0-0'">
            <CheckboxGroup v-model="meterials00">
              <Checkbox>{{item.materialName}}</Checkbox>
            </CheckboxGroup>
          </Form-item>
        </i-col>
        </div>
      </Row>
      <Row style="margin: 10px 20px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <span style="font-weight:bold;font-size:14px">调沪方情况</span>
        </i-col>
      </Row>
      <Row style="margin: 10px 40px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <RadioGroup v-model="formItem.huStatus">
              <Radio label="调沪方情况"></Radio>
              <Radio label="在沪方情况"></Radio>
            </RadioGroup>
        </i-col>
      </Row>
      <Row v-if="formItem.huStatus === '调沪方情况'">
        <div v-for="item in meterials" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}"  v-if="item.level === '1-1'">
          <Form-item>
            <CheckboxGroup v-model="meterials11">
              <Checkbox>{{item.materialName}}</Checkbox>
            </CheckboxGroup>
          </Form-item>
        </i-col>
        </div>
      </Row>
      <Row v-if="formItem.huStatus === '在沪方情况'" >
        <div v-for="item in meterials" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}" >
          <Form-item  v-if="item.level === '1-2'">
            <CheckboxGroup v-model="meterials12">
              <Checkbox>{{item.materialName}}</Checkbox>
            </CheckboxGroup>
          </Form-item>
        </i-col>
        </div>
      </Row>
      <Row style="margin: 10px 20px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" >
          <span style="font-weight:bold;font-size:14px">婚姻证明</span>
        </i-col>
      </Row>
      <Row style="margin: 10px 40px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <RadioGroup v-model="formItem.marryStatus">
              <Radio label="已婚未育"></Radio>
              <Radio label="已婚已育"></Radio>
            </RadioGroup>
        </i-col>
      </Row>
      <Row v-if="formItem.e === '已婚未育'">
        <div v-for="item in meterials" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}" >
          <Form-item v-if="item.level === '2-1'">
            <CheckboxGroup v-model="meterials21">
              <Checkbox>{{item.materialName}}</Checkbox>
            </CheckboxGroup>
          </Form-item>
        </i-col>
        </div>
      </Row>
      <Row v-if="formItem.e === '已婚已育'">
        <div v-for="item in meterials" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}" >
          <Form-item  v-if="item.level === '2-2'">
            <CheckboxGroup v-model="meterials22">
              <Checkbox>{{item.materialName}}</Checkbox>
            </CheckboxGroup>
          </Form-item>
        </i-col>
        </div>
      </Row>
      <Row style="margin: 10px 20px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" >
            <span style="font-weight:bold;font-size:14px">再婚情况</span>
        </i-col>
      </Row>
      <Row>
        <div  v-for="item in meterials" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}" >
          <Form-item v-if="item.level === '3-0'">
            <CheckboxGroup v-model="meterials30">
              <Checkbox>{{item.materialName}}</Checkbox>
            </CheckboxGroup>
          </Form-item>
        </i-col>
        </div>
      </Row>
      <Row style="margin: 10px 20px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" >
            <span style="font-weight:bold;font-size:14px">在沪落户证明</span>
        </i-col>
      </Row>
      <Row>
        <div v-for="item in meterials" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}">
          <Form-item v-if="item.level === '4-0'">
            <CheckboxGroup v-model="meterials40">
              <Checkbox>{{item.materialName}}</Checkbox>
            </CheckboxGroup>
          </Form-item>
        </i-col>
        </div>
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
      meterials00: [],
      meterials11: [],
      meterials12: [],
      meterials21: [],
      meterials22: [],
      meterials30: [],
      meterials40: [],
      formItem: {
        huStatus: '调沪方情况',
        marryStatus: '已婚已育'
      }
    }
  },
  methods: {
    
  }  
}
</script>

<style scoped>

</style>
