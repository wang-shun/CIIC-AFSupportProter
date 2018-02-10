<!-- 留学生 -->
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
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <span style="font-weight:bold;font-size:14px">是否为科创人员</span>
        </i-col>
      </Row>
      <Row style="margin: 10px 40px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <RadioGroup v-model="formItem.isgooder">
              <Radio label="是"></Radio>
              <Radio label="否"></Radio>
            </RadioGroup>
        </i-col>
      </Row>
      <Row v-if="formItem.isgooder === '是'">
        <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}"  v-if="item.level === '3-1'">
          <Form-item>
            <input type="checkbox" :value="item.materialId" v-model="meterials.info.lev31" @change="change(meterials.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>
      <Row v-if="formItem.isgooder === '否'" >
        <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}" >
          <Form-item  v-if="item.level === '3-2'">
            <input type="checkbox" :value="item.materialId" v-model="meterials.info.lev32" @change="change(meterials.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>

       <Row style="margin: 10px 20px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" >
          <span style="font-weight:bold;font-size:14px">教育经历证明材料</span>
        </i-col>
      </Row>
      <Row style="margin: 10px 40px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <RadioGroup v-model="formItem.educate">
              <Radio label="学历学位证书（国内）"></Radio>
              <Radio label="学历学位证书（国外）"></Radio>
              <Radio label="国外学历学位成绩单"></Radio>
              <Radio label="其他相关辅助材料"></Radio>
            </RadioGroup>
        </i-col>
      </Row>
      <Row v-if="formItem.educate === '学历学位证书（国内）'">
        <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}" >
          <Form-item v-if="item.level === '4-1'">
            <input type="checkbox" :value="item.materialId" v-model="meterials.info.lev41" @change="change(meterials.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>
       <Row v-if="formItem.educate === '学历学位证书（国外）'">
        <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}" >
          <Form-item v-if="item.level === '4-2'">
            <input type="checkbox" :value="item.materialId" v-model="meterials.info.lev42" @change="change(meterials.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>
      <Row v-if="formItem.educate === '国外学历学位成绩单'">
        <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}" >
          <Form-item v-if="item.level === '4-3'">
            <input type="checkbox" :value="item.materialId" v-model="meterials.info.lev43" @change="change(meterials.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>
      <Row v-if="formItem.educate === '其他相关辅助材料'">
        <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}" >
          <Form-item v-if="item.level === '4-4'">
            <input type="checkbox" :value="item.materialId" v-model="meterials.info.lev44" @change="change(meterials.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>

      <Row style="margin: 10px 20px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 5}" >
          <span style="font-weight:bold;font-size:14px">公司材料</span>
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
            </RadioGroup>
        </i-col>
      </Row>
      <Row v-if="formItem.marryStatus === '未婚'">
        <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}" >
          <Form-item v-if="item.level === '6-1'">
            <input type="checkbox" :value="item.materialId" v-model="meterials.info.lev61" @change="change(meterials.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>
       <Row v-if="formItem.marryStatus === '已婚'">
        <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}" >
          <Form-item v-if="item.level === '6-2'">
            <input type="checkbox" :value="item.materialId" v-model="meterials.info.lev62" @change="change(meterials.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>
       <Row v-if="formItem.marryStatus === '离婚'">
        <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}" >
          <Form-item v-if="item.level === '6-3'">
            <input type="checkbox" :value="item.materialId" v-model="meterials.info.lev63" @change="change(meterials.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>
       <Row v-if="formItem.marryStatus === '再婚'">
        <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}" >
          <Form-item v-if="item.level === '6-4'">
            <input type="checkbox" :value="item.materialId" v-model="meterials.info.lev64" @change="change(meterials.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>

      <div v-if="formItem.marryStatus !== '未婚'">
        <Row style="margin: 10px 20px">
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <span style="font-weight:bold;font-size:14px">是否有随迁人员</span>
          </i-col>
        </Row>
        <Row style="margin: 10px 40px">
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <RadioGroup v-model="formItem.hasfollower">
                <Radio label="是"></Radio>
                <Radio label="否"></Radio>
              </RadioGroup>
          </i-col>
        </Row>
        <Row v-if="formItem.hasfollower === '是'">
          <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
          <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}"  v-if="item.level === '7-1'">
            <Form-item>
              <input type="checkbox" :value="item.materialId" v-model="meterials.info.lev71" @change="change(meterials.info)"/>
              <label>{{item.materialName}}</label>
            </Form-item>
          </i-col>
          </div>
        </Row>
        <Row v-if="formItem.hasfollower === '否'" >
          <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
          <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}" >
            <Form-item  v-if="item.level === '7-2'">
              <input type="checkbox" :value="item.materialId" v-model="meterials.info.lev72" @change="change(meterials.info)"/>
              <label>{{item.materialName}}</label>
            </Form-item>
          </i-col>
          </div>
        </Row>

        <div v-if="formItem.hasfollower === '是'">
        <Row style="margin: 10px 20px" >
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <span style="font-weight:bold;font-size:14px">随迁材料</span>
          </i-col>
        </Row>
        <Row style="margin: 10px 40px">
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <RadioGroup v-model="formItem.followmaterials">
                <Radio label="子女"></Radio>
                <Radio label="配偶"></Radio>
                <Radio label="全家"></Radio>
              </RadioGroup>
          </i-col>
        </Row>
        <Row v-if="formItem.followmaterials === '子女'">
          <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
          <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}"  v-if="item.level === '8-1'">
            <Form-item>
              <input type="checkbox" :value="item.materialId" v-model="meterials.info.lev81" @change="change(meterials.info)"/>
              <label>{{item.materialName}}</label>
            </Form-item>
          </i-col>
          </div>
        </Row>
        <Row v-if="formItem.followmaterials === '配偶'" >
          <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
          <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}" >
            <Form-item  v-if="item.level === '8-2'">
              <input type="checkbox" :value="item.materialId" v-model="meterials.info.lev82" @change="change(meterials.info)"/>
              <label>{{item.materialName}}</label>
            </Form-item>
          </i-col>
          </div>
        </Row>
        <Row v-if="formItem.followmaterials === '全家'" >
          <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
          <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}" >
            <Form-item  v-if="item.level === '8-3'">
              <input type="checkbox" :value="item.materialId" v-model="meterials.info.lev83" @change="change(meterials.info)"/>
              <label>{{item.materialName}}</label>
            </Form-item>
          </i-col>
          </div>
        </Row>
        </div>

        <div v-if="formItem.hasfollower === '否'">
        <Row style="margin: 10px 20px" >
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <span style="font-weight:bold;font-size:14px">不随迁材料</span>
          </i-col>
        </Row>
        <Row style="margin: 10px 40px">
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <RadioGroup v-model="formItem.notfollowmaterials">
                <Radio label="已是上海户籍"></Radio>
                <Radio label="不符合随迁条件"></Radio>
                <Radio label="已是外籍"></Radio>
                <Radio label="其他原因"></Radio>
              </RadioGroup>
          </i-col>
        </Row>
        <Row v-if="formItem.notfollowmaterials === '已是上海户籍'">
          <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
          <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}"  v-if="item.level === '9-1'">
            <Form-item>
              <input type="checkbox" :value="item.materialId" v-model="meterials.info.lev91" @change="change(meterials.info)"/>
              <label>{{item.materialName}}</label>
            </Form-item>
          </i-col>
          </div>
        </Row>
        <Row v-if="formItem.notfollowmaterials === '不符合随迁条件'" >
          <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
          <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}" >
            <Form-item  v-if="item.level === '9-2'">
              <input type="checkbox" :value="item.materialId" v-model="meterials.info.lev92" @change="change(meterials.info)"/>
              <label>{{item.materialName}}</label>
            </Form-item>
          </i-col>
          </div>
        </Row>
        <Row v-if="formItem.notfollowmaterials === '已是外籍'" >
          <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
          <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}" >
            <Form-item  v-if="item.level === '9-3'">
              <input type="checkbox" :value="item.materialId" v-model="meterials.info.lev93" @change="change(meterials.info)"/>
              <label>{{item.materialName}}</label>
            </Form-item>
          </i-col>
          </div>
        </Row>
        <Row v-if="formItem.notfollowmaterials === '其他原因'" >
          <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
          <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}" >
            <Form-item  v-if="item.level === '9-4'">
              <input type="checkbox" :value="item.materialId" v-model="meterials.info.lev94" @change="change(meterials.info)"/>
              <label>{{item.materialName}}</label>
            </Form-item>
          </i-col>
          </div>
        </Row>
        </div>
      </div>

      <Row style="margin: 10px 20px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <span style="font-weight:bold;font-size:14px">在沪落户地信息</span>
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
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}"  v-if="item.level === '10-1'">
          <Form-item>
            <input type="checkbox" :value="item.materialId" v-model="meterials.info.dh" @change="change(meterials.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>
      <Row v-if="formItem.addr === '自购房'" >
        <div v-for="item in meterials.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}" >
          <Form-item  v-if="item.level === '10-2'">
            <input type="checkbox" :value="item.materialId" v-model="meterials.info.zh" @change="change(meterials.info)"/>
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
        isgooder: '是',
        marryStatus: '未婚',
        hasfollower: '是',
        followmaterials: '子女',
        notfollowmaterials: '已是上海户籍',
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
      if (info.lev41.toString() != ''){
        materialsIds = materialsIds + info.lev41.toString() + ','
      }
      if (info.lev42.toString() != ''){
        materialsIds = materialsIds + info.lev42.toString() + ','
      }
      if (info.lev43.toString() != ''){
        materialsIds = materialsIds + info.lev43.toString() + ','
      }
      if (info.lev44.toString() != ''){
        materialsIds = materialsIds + info.lev44.toString() + ','
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
      if (info.lev63.toString() != ''){
        materialsIds = materialsIds + info.lev63.toString() + ','
      }
      if (info.lev64.toString() != ''){
        materialsIds = materialsIds + info.lev64.toString() + ','
      }
      if (info.lev71.toString() != ''){
        materialsIds = materialsIds + info.lev71.toString() + ','
      }
      if (info.lev72.toString() != ''){
        materialsIds = materialsIds + info.lev72.toString() + ','
      }
      if (info.lev81.toString() != ''){
        materialsIds = materialsIds + info.lev81.toString() + ','
      }
      if (info.lev82.toString() != ''){
        materialsIds = materialsIds + info.lev82.toString() + ','
      }
      if (info.lev83.toString() != ''){
        materialsIds = materialsIds + info.lev83.toString() + ','
      }
      if (info.lev91.toString() != ''){
        materialsIds = materialsIds + info.lev91.toString() + ','
      }
      if (info.lev92.toString() != ''){
        materialsIds = materialsIds + info.lev92.toString() + ','
      }
      if (info.lev93.toString() != ''){
        materialsIds = materialsIds + info.lev93.toString() + ','
      }
      if (info.lev94.toString() != ''){
        materialsIds = materialsIds + info.lev94.toString() + ','
      }
      if (info.lev101.toString() != ''){
        materialsIds = materialsIds + info.lev101.toString() + ','
      }
      if (info.lev102.toString() != ''){
        materialsIds = materialsIds + info.lev102.toString() + ','
      }
      this.$emit("materialsIds", materialsIds)
      console.log("材料ids："+materialsIds)
   }
  }
}
</script>

<style scoped>

</style>
