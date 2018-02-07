<!-- 人才引进 -->
<template>
  <div>
    <Form :model="formItem" :label-width="120">
      <Row style="margin: 10px 20px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 5}" >
          <span style="font-weight:bold;font-size:14px">常规材料</span>
        </i-col>
      </Row>
      <Row>
        <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}"  >
          <Form-item v-if="item.level === '0-0'">
            <input type="checkbox" :value="item.materialId" v-model="meterials.info.lev00" @change="change(meterials.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>

      <Row style="margin: 10px 20px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <span style="font-weight:bold;font-size:14px">公司资料</span>
        </i-col>
      </Row>
      <Row style="margin: 10px 40px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <RadioGroup v-model="formItem.comp">
            <Radio label="上海公司"></Radio>
            <Radio label="上海分公司"></Radio>
          </RadioGroup>
        </i-col>
      </Row>
      <Row v-if="formItem.comp === '上海公司'">
        <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}"  v-if="item.level === '1-1'">
          <Form-item>
            <input type="checkbox" :value="item.materialId" v-model="meterials.info.lev11" @change="change(meterials.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>
      <Row v-if="formItem.comp === '上海分公司'" >
        <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}" >
          <Form-item  v-if="item.level === '1-2'">
            <input type="checkbox" :value="item.materialId" v-model="meterials.info.lev12" @change="change(meterials.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>
      
     <Row style="margin: 10px 20px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 5}" >
          <span style="font-weight:bold;font-size:14px">主要材料</span>
        </i-col>
      </Row>
      <Row>
        <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}"  >
          <Form-item v-if="item.level === '2-0'">
            <input type="checkbox" :value="item.materialId" v-model="meterials.info.lev20" @change="change(meterials.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>

      <Row style="margin: 10px 20px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" >
          <span style="font-weight:bold;font-size:14px">婚姻状态</span>
        </i-col>
      </Row>
      <Row style="margin: 10px 40px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <RadioGroup v-model="formItem.marryStatus">
              <Radio label="未婚"></Radio>
              <Radio label="已婚"></Radio>
              <Radio label="离婚"></Radio>
              <Radio label="丧偶"></Radio>
            </RadioGroup>
        </i-col>
      </Row>
      <Row v-if="formItem.marryStatus === '未婚'">
        <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}" >
          <Form-item v-if="item.level === '3-1'">
            <input type="checkbox" :value="item.materialId" v-model="meterials.info.lev31" @change="change(meterials.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>
       <Row v-if="formItem.marryStatus === '已婚'">
        <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}" >
          <Form-item v-if="item.level === '3-2'">
            <input type="checkbox" :value="item.materialId" v-model="meterials.info.lev32" @change="change(meterials.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>
       <Row v-if="formItem.marryStatus === '离婚'">
        <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}" >
          <Form-item v-if="item.level === '3-3'">
            <input type="checkbox" :value="item.materialId" v-model="meterials.info.lev33" @change="change(meterials.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>
       <Row v-if="formItem.marryStatus === '丧偶'">
        <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}" >
          <Form-item v-if="item.level === '3-4'">
            <input type="checkbox" :value="item.materialId" v-model="meterials.info.lev34" @change="change(meterials.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>

      <Row style="margin: 10px 20px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <span style="font-weight:bold;font-size:14px">子女是否随调</span>
        </i-col>
      </Row>
      <Row style="margin: 10px 40px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <RadioGroup v-model="formItem.childfollow">
              <Radio label="是"></Radio>
              <Radio label="否"></Radio>
            </RadioGroup>
        </i-col>
      </Row>
      <Row v-if="formItem.childfollow === '是'">
        <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}"  v-if="item.level === '4-1'">
          <Form-item>
            <input type="checkbox" :value="item.materialId" v-model="meterials.info.lev41" @change="change(meterials.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>
      <Row v-if="formItem.childfollow === '否'" >
        <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}" >
          <Form-item  v-if="item.level === '4-2'">
            <input type="checkbox" :value="item.materialId" v-model="meterials.info.lev42" @change="change(meterials.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>

      <div v-if="formItem.childfollow === '是'">
      <Row style="margin: 10px 20px" >
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <span style="font-weight:bold;font-size:14px">子女随调材料</span>
        </i-col>
      </Row>
      <Row>
        <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}"  >
          <Form-item v-if="item.level === '5-0'">
            <input type="checkbox" :value="item.materialId" v-model="meterials.info.lev50" @change="change(meterials.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>
      </div>

      <Row style="margin: 10px 20px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <span style="font-weight:bold;font-size:14px">配偶是否随调</span>
        </i-col>
      </Row>
      <Row style="margin: 10px 40px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <RadioGroup v-model="formItem.spousefollow">
              <Radio label="是"></Radio>
              <Radio label="否"></Radio>
            </RadioGroup>
        </i-col>
      </Row>
      <Row v-if="formItem.spousefollow === '是'">
        <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}"  v-if="item.level === '6-1'">
          <Form-item>
            <input type="checkbox" :value="item.materialId" v-model="meterials.info.lev61" @change="change(meterials.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>
      <Row v-if="formItem.spousefollow === '否'" >
        <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}" >
          <Form-item  v-if="item.level === '6-2'">
            <input type="checkbox" :value="item.materialId" v-model="meterials.info.lev62" @change="change(meterials.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>

      <div v-if="formItem.spousefollow === '是'">
      <Row style="margin: 10px 20px" >
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <span style="font-weight:bold;font-size:14px">配偶随调材料</span>
        </i-col>
      </Row>
       <Row>
        <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}"  >
          <Form-item v-if="item.level === '7-0'">
            <input type="checkbox" :value="item.materialId" v-model="meterials.info.lev70" @change="change(meterials.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>
      </div>
      
      <Row style="margin: 10px 20px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <span style="font-weight:bold;font-size:14px">住所证明材料</span>
        </i-col>
      </Row>
      <Row style="margin: 10px 40px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <RadioGroup v-model="formItem.addr">
              <Radio label="社区公共户"></Radio>
              <Radio label="自购房"></Radio>
            </RadioGroup>
        </i-col>
      </Row>
      <Row v-if="formItem.addr === '社区公共户'">
        <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}"  v-if="item.level === '8-1'">
          <Form-item>
            <input type="checkbox" :value="item.materialId" v-model="meterials.info.lev81" @change="change(meterials.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>
      <Row v-if="formItem.addr === '自购房'" >
        <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}" >
          <Form-item  v-if="item.level === '8-2'">
            <input type="checkbox" :value="item.materialId" v-model="meterials.info.lev82" @change="change(meterials.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>

     <Row style="margin: 10px 20px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 5}" >
          <span style="font-weight:bold;font-size:14px">计生材料</span>
        </i-col>
      </Row>
      <Row>
        <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}"  >
          <Form-item v-if="item.level === '9-0'">
            <input type="checkbox" :value="item.materialId" v-model="meterials.info.lev90" @change="change(meterials.info)"/>
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
        comp: '上海公司',
        marryStatus: '未婚',
        childfollow: '是',
        spousefollow: '是',
        addr: '社区公共户'
      }
    }
  },
  methods: {
    change (info) {
      let materialsIds = ''
      if (info.lev00.toString() != ''){
        materialsIds = materialsIds + info.lev00.toString() + ','
      }
      if (info.lev11.toString() != ''){
        materialsIds = materialsIds + info.lev11.toString() + ','
      }
      if (info.lev12.toString() != ''){
        materialsIds = materialsIds + info.lev12.toString() + ','
      }
      if (info.lev20.toString() != ''){
        materialsIds = materialsIds + info.lev20.toString() + ','
      }
      if (info.lev31.toString() != ''){
        materialsIds = materialsIds + info.lev31.toString() + ','
      }
      if (info.lev32.toString() != ''){
        materialsIds = materialsIds + info.lev32.toString() + ','
      }
      if (info.lev33.toString() != ''){
        materialsIds = materialsIds + info.lev33.toString() + ','
      }
      if (info.lev34.toString() != ''){
        materialsIds = materialsIds + info.lev34.toString() + ','
      }
      if (info.lev41.toString() != ''){
        materialsIds = materialsIds + info.lev41.toString() + ','
      }
      if (info.lev42.toString() != ''){
        materialsIds = materialsIds + info.lev42.toString() + ','
      }
      if (info.lev50.toString() != ''){
        materialsIds = materialsIds + info.lev50.toString() + ','
      }
      if (info.lev61.toString() != ''){
        materialsIds = materialsIds + info.lev61.toString() + ','
      }
      if (info.lev62.toString() != ''){
        materialsIds = materialsIds + info.lev62.toString() + ','
      }
      if (info.lev70.toString() != ''){
        materialsIds = materialsIds + info.lev70.toString() + ','
      }  
      if (info.lev81.toString() != ''){
        materialsIds = materialsIds + info.lev82.toString() + ','
      }
      if (info.lev82.toString() != ''){
        materialsIds = materialsIds + info.lev82.toString() + ','
      }
      if (info.lev90.toString() != ''){
        materialsIds = materialsIds + info.lev90.toString() + ','
      }     
      this.$emit("materialsIds", materialsIds)
      console.log("材料ids："+materialsIds)
   }
  }
}
</script>

<style scoped>

</style>
