<!-- 积分申请 -->
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
              <Radio label="再婚"></Radio>
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
      <Row v-if="formItem.marryStatus === '再婚'">
        <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}" >
          <Form-item v-if="item.level === '3-4'">
            <input type="checkbox" :value="item.materialId" v-model="meterials.info.lev34" @change="change(meterials.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>
      <Row v-if="formItem.marryStatus === '丧偶'">
        <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}" >
          <Form-item v-if="item.level === '3-5'">
            <input type="checkbox" :value="item.materialId" v-model="meterials.info.lev35" @change="change(meterials.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>

      <Row style="margin: 10px 20px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" >
            <span style="font-weight:bold;font-size:14px">配偶户籍</span>
        </i-col>
      </Row>
      <Row>
        <div  v-for="item in meterials.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}" >
          <Form-item v-if="item.level === '4-0'">
            <input type="checkbox" :value="item.materialId" v-model="meterials.info.lev40" @change="change(meterials.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>

      <Row style="margin: 10px 20px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <span style="font-weight:bold;font-size:14px">是否有随员</span>
        </i-col>
      </Row>
      <Row style="margin: 10px 40px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <RadioGroup v-model="formItem.follower">
              <Radio label="是"></Radio>
              <Radio label="否"></Radio>
            </RadioGroup>
        </i-col>
      </Row>
      <Row v-if="formItem.follower === '是'">
        <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}"  v-if="item.level === '5-1'">
          <Form-item>
            <input type="checkbox" :value="item.materialId" v-model="meterials.info.lev51" @change="change(meterials.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>
      <Row v-if="formItem.follower === '否'" >
        <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}" >
          <Form-item  v-if="item.level === '5-2'">
            <input type="checkbox" :value="item.materialId" v-model="meterials.info.lev52" @change="change(meterials.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>

      <div v-if="formItem.follower === '是'">
      <Row style="margin: 10px 20px" >
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <span style="font-weight:bold;font-size:14px">配偶及子女相关材料</span>
        </i-col>
      </Row>
      <Row style="margin: 10px 40px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <RadioGroup v-model="formItem.familerMaterials">
              <Radio label="子女"></Radio>
              <Radio label="配偶"></Radio>
              <Radio label="全家"></Radio>
            </RadioGroup>
        </i-col>
      </Row>
      <Row v-if="formItem.familerMaterials === '子女'">
        <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}"  v-if="item.level === '6-1'">
          <Form-item>
            <input type="checkbox" :value="item.materialId" v-model="meterials.info.lev61" @change="change(meterials.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>
      <Row v-if="formItem.familerMaterials === '配偶'" >
        <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}" >
          <Form-item  v-if="item.level === '6-2'">
            <input type="checkbox" :value="item.materialId" v-model="meterials.info.lev62" @change="change(meterials.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>
      <Row v-if="formItem.familerMaterials === '全家'" >
        <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}" >
          <Form-item  v-if="item.level === '6-3'">
            <input type="checkbox" :value="item.materialId" v-model="meterials.info.lev63" @change="change(meterials.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>
      </div>
      
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
        follower: '是',
        familerMaterials: '子女'
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
      if (info.lev35.toString() != ''){
        materialsIds = materialsIds + info.lev35.toString() + ','
      }
      if (info.lev40.toString() != ''){
        materialsIds = materialsIds + info.lev40.toString() + ','
      }
      if (info.lev51.toString() != ''){
        materialsIds = materialsIds + info.lev51.toString() + ','
      }
      if (info.lev52.toString() != ''){
        materialsIds = materialsIds + info.lev52.toString() + ','
      }
      if (info.lev61.toString() != ''){
        materialsIds = materialsIds + info.lev61.toString() + ','
      }
      if (info.lev62.toString() != ''){
        materialsIds = materialsIds + info.lev62.toString() + ','
      }
      if (info.lev63.toString() != ''){
        materialsIds = materialsIds + info.lev63.toString() + ','
      } 
      this.$emit("materialsIds", materialsIds)
      console.log("材料ids："+materialsIds)
   }
  }
}
</script>

<style scoped>

</style>
