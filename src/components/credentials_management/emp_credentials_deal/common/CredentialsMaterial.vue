<template>
  <div>
    <Form :model="formItem" :label-width="120">
      <Row style="margin: 10px 20px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 5}" >
          <span style="font-weight:bold;font-size:14px">主要材料</span>
        </i-col>
      </Row>
      <Row>
        <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}"  >
          <Form-item v-if="item.level === '0-0'">
            <input type="checkbox" :value="item.materialId" v-model="meterials.info.main" @change="change(meterials.info)"/>
            <label>{{item.materialName}}</label>
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
        <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}"  v-if="item.level === '1-1'">
          <Form-item>
            <input type="checkbox" :value="item.materialId" v-model="meterials.info.dh" @change="change(meterials.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>
      <Row v-if="formItem.huStatus === '在沪方情况'" >
        <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}" >
          <Form-item  v-if="item.level === '1-2'">
            <input type="checkbox" :value="item.materialId" v-model="meterials.info.zh" @change="change(meterials.info)"/>
            <label>{{item.materialName}}</label>
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
      <Row v-if="formItem.marryStatus === '已婚未育'">
        <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}" >
          <Form-item v-if="item.level === '2-1'">
            <input type="checkbox" :value="item.materialId" v-model="meterials.info.marryWithoutChild" @change="change(meterials.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>
      <Row v-if="formItem.marryStatus === '已婚已育'">
        <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}" >
          <Form-item  v-if="item.level === '2-2'">
            <input type="checkbox" :value="item.materialId" v-model="meterials.info.marryWithChild" @change="change(meterials.info)"/>
            <label>{{item.materialName}}</label>
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
        <div  v-for="item in meterials.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}" >
          <Form-item v-if="item.level === '3-0'">
            <input type="checkbox" :value="item.materialId" v-model="meterials.info.remarry" @change="change(meterials.info)"/>
            <label>{{item.materialName}}</label>
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
        <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}">
          <Form-item v-if="item.level === '4-0'">
            <input type="checkbox" :value="item.materialId" v-model="meterials.info.settle" @change="change(meterials.info)"/>
            <label>{{item.materialName}}</label>
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
      type: Object,
      default() {
        return {}
      }
    }
  },
  data () {
    return {
      formItem: {
        huStatus: '调沪方情况',
        marryStatus: '已婚未育'
      }
    }
  },
  methods: {
    change (info) {
      let materialsIds = ''
      if (info.main.toString() != ''){
        materialsIds = materialsIds + info.main.toString() + ','
      }
      if (info.dh.toString() != ''){
        materialsIds = materialsIds + info.dh.toString() + ','
      }
      if (info.zh.toString() != ''){
        materialsIds = materialsIds + info.zh.toString() + ','
      }
      if (info.marryWithoutChild.toString() != ''){
        materialsIds = materialsIds + info.marryWithoutChild.toString() + ','
      }
      if (info.marryWithChild.toString() != ''){
        materialsIds = materialsIds + info.marryWithChild.toString() + ','
      }
      if (info.remarry.toString() != ''){
        materialsIds = materialsIds + info.remarry.toString() + ','
      }
      if (info.settle.toString() != ''){
        materialsIds = materialsIds + info.settle.toString() + ','
      } 
      this.$emit("materialsIds", materialsIds)
      console.log("材料ids："+materialsIds)
   }
  }
}
</script>

<style scoped>

</style>
