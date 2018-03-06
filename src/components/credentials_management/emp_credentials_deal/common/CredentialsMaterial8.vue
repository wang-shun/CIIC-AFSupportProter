<!-- 随员 -->
<template>
  <div>
    <Form :model="material" :label-width="120">
      <Row style="margin: 10px 20px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 5}" >
          <span style="font-weight:bold;font-size:14px">常规材料</span>
        </i-col>
      </Row>
      <Row>
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}"  >
          <Form-item v-if="item.level === '0-0'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev00" @change="change(material.info)"/>
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
          <RadioGroup v-model="material.comp" @on-change="compChange">
            <Radio label="上海公司"></Radio>
            <Radio label="上海分公司"></Radio>
          </RadioGroup>
        </i-col>
      </Row>
      <Row v-if="material.comp === '上海公司'">
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}"  v-if="item.level === '1-1'">
          <Form-item>
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev11" @change="change(material.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>
      <Row v-if="material.comp === '上海分公司'" >
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}" >
          <Form-item  v-if="item.level === '1-2'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev12" @change="change(material.info)"/>
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
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}"  >
          <Form-item v-if="item.level === '2-0'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev20" @change="change(material.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>


      <Row style="margin: 10px 20px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 5}" >
          <span style="font-weight:bold;font-size:14px">身份证明</span>
        </i-col>
      </Row>
      <Row>
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}"  >
          <Form-item v-if="item.level === '3-0'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev30" @change="change(material.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>

      <Row style="margin: 10px 20px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" >
          <span style="font-weight:bold;font-size:14px">随员</span>
        </i-col>
      </Row>
      <Row style="margin: 10px 40px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <RadioGroup v-model="material.follower" @on-change="followerChange">
              <Radio label="随员情况"></Radio>
              <Radio label="随员身份证明"></Radio>
              <Radio label="随员其他材料"></Radio>
            </RadioGroup>
        </i-col>
      </Row>
      <Row v-if="material.follower === '随员情况'">
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}" >
          <Form-item v-if="item.level === '4-1'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev41" @change="change(material.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>
       <Row v-if="material.follower === '随员身份证明'">
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}" >
          <Form-item v-if="item.level === '4-2'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev42" @change="change(material.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>
      <Row v-if="material.follower === '随员其他材料'">
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}" >
          <Form-item v-if="item.level === '4-3'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev43" @change="change(material.info)"/>
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
      default() {}
    }
  },
  data () {
    return {
      material: {
        menu: '',
        info: {},
        materialsIds: '',
        comp:'',
        marryStatus:'',
        hasFollower:'',
        familerMaterials:'',
        applyAddrChange:'',
        addr:'',
        followerType:'',
        follower:'',
        hasChildFollow:'',
        hasSpouseFollow:'',
        married:'',
        jobMaterials:'',
        hasGooder:'',
        educate:'',
        followMaterials:'',
        notFollowMaterials:''
      }
    }
  },
  methods: {
    followerChange (val) {
      this.material.follower = val
      this.$emit("materialsInfo", this.material)
    },
    compChange (val) {
      this.material.comp = val
      this.$emit("materialsInfo", this.material)
    },
    change (info) {
      let materialsIds = ''
      if (info.lev00.toString() != ''){
        materialsIds = materialsIds + info.lev00.toString() + ','
      }
      if (this.material.comp == '上海公司') {
        if (info.lev11.toString() != ''){
          materialsIds = materialsIds + info.lev11.toString() + ','
        }
      }
      if (this.material.comp == '上海分公司') {
        if (info.lev12.toString() != ''){
          materialsIds = materialsIds + info.lev12.toString() + ','
        }
      }
      if (info.lev20.toString() != ''){
        materialsIds = materialsIds + info.lev20.toString() + ','
      }
      if (info.lev30.toString() != ''){
        materialsIds = materialsIds + info.lev30.toString() + ','
      }
      if (this.material.follower = '随员情况') {
        if (info.lev41.toString() != ''){
          materialsIds = materialsIds + info.lev41.toString() + ','
        }
      }
      if (this.material.follower = '随员身份证明') {
        if (info.lev42.toString() != ''){
          materialsIds = materialsIds + info.lev42.toString() + ','
        }
      }
      if (this.material.follower = '随员其他材料') {
        if (info.lev43.toString() != ''){
          materialsIds = materialsIds + info.lev43.toString() + ','
        }
      } 
      this.material.materialsIds = materialsIds
      this.$emit("materialsInfo", this.material)
    }
  },
  watch: {
    meterials : {
      handler: function(newV, oldV) {
        this.material = this._.cloneDeep(newV)
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>
