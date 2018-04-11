<!-- 夫妻分居 -->
<template>
  <div>
    <Form :label-width="120">
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
          <RadioGroup v-model="material.comp"  @on-change="compChange">
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
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <span style="font-weight:bold;font-size:14px">职称材料</span>
        </i-col>
      </Row>
      <Row style="margin: 10px 40px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <RadioGroup v-model="material.jobMaterials"  @on-change="jobMaterialsChange">
              <Radio label="申请方"></Radio>
              <Radio label="在沪方"></Radio>
            </RadioGroup>
        </i-col>
      </Row>
      <Row v-if="material.jobMaterials === '申请方'">
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}"  v-if="item.level === '3-1'">
          <Form-item>
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev31" @change="change(material.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>
      <Row v-if="material.jobMaterials === '在沪方'" >
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}" >
          <Form-item  v-if="item.level === '3-2'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev32" @change="change(material.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>

      <Row style="margin: 10px 20px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 5}" >
          <span style="font-weight:bold;font-size:14px">在沪方的其他证明材料</span>
        </i-col>
      </Row>
      <Row>
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}"  >
          <Form-item v-if="item.level === '4-0'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev40" @change="change(material.info)"/>
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
            <RadioGroup v-model="material.marryStatus" @on-change="marryStatusChange">
              <Radio label="已婚"></Radio>
              <Radio label="再婚"></Radio>
            </RadioGroup>
        </i-col>
      </Row>
       <Row v-if="material.marryStatus === '已婚'">
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}" >
          <Form-item v-if="item.level === '5-1'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev51" @change="change(material.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>
       <Row v-if="material.marryStatus === '再婚'">
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}" >
          <Form-item v-if="item.level === '5-2'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev52" @change="change(material.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>

      <Row style="margin: 10px 20px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" >
          <span style="font-weight:bold;font-size:14px">婚育状态</span>
        </i-col>
      </Row>
      <Row style="margin: 10px 40px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <RadioGroup v-model="material.married" @on-change="marriedChange">
              <Radio label="已婚未育"></Radio>
              <Radio label="已婚已育"></Radio>
            </RadioGroup>
        </i-col>
      </Row>
       <Row v-if="material.married=== '已婚未育'">
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}" >
          <Form-item v-if="item.level === '6-1'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev61" @change="change(material.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>
       <Row v-if="material.married === '已婚已育'">
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}" >
          <Form-item v-if="item.level === '6-2'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev62" @change="change(material.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>

      <div v-if="material.married === '已婚已育'">
      <Row style="margin: 10px 20px" >
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <span style="font-weight:bold;font-size:14px">子女相关材料</span>
        </i-col>
      </Row>
      <Row>
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}"  >
          <Form-item v-if="item.level === '7-0'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev70" @change="change(material.info)"/>
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
            <RadioGroup v-model="material.addr" @on-change="addrChange">
              <Radio label="社区公共户"></Radio>
              <Radio label="自购房"></Radio>
            </RadioGroup>
        </i-col>
      </Row>
      <Row v-if="material.addr === '社区公共户'">
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}"  v-if="item.level === '8-1'">
          <Form-item>
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev81" @change="change(material.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>
      <Row v-if="material.addr === '自购房'" >
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}" >
          <Form-item  v-if="item.level === '8-2'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev82" @change="change(material.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row>

    </Form>
  </div>
</template>

<script>
import axios from "axios";
import Tools from "../../../../lib/tools";
import Decode from "../../../../lib/decode";

const host = process.env.SITE_HOST;
export default {
  props: {
    meterials: {
      type: Object,
      default() {}
    }
  },
  data() {
    return {
      material: {
        menu: "",
        info: {},
        materialsIds: "",
        comp: "",
        marryStatus: "",
        hasFollower: "",
        familerMaterials: "",
        applyAddrChange: "",
        addr: "",
        followerType: "",
        follower: "",
        hasChildFollow: "",
        hasSpouseFollow: "",
        married: "",
        jobMaterials: "",
        hasGooder: "",
        educate: "",
        followMaterials: "",
        notFollowMaterials: ""
      }
    };
  },
  methods: {
    compChange(val) {
      this.material.comp = val;
      this.$emit("materialsInfo", this.material);
    },
    marryStatusChange(val) {
      this.material.marryStatus = val;
      this.$emit("materialsInfo", this.material);
    },
    jobMaterialsChange(val) {
      this.material.jobMaterials = val;
      this.$emit("materialsInfo", this.material);
    },
    marriedChange(val) {
      this.material.married = val;
      this.$emit("materialsInfo", this.material);
    },
    addrChange(val) {
      this.material.addr = val;
      this.$emit("materialsInfo", this.material);
    },
    change(info) {
      let materialsIds = "";
      debugger;
      if (info.lev00.toString() != "") {
        materialsIds = materialsIds + info.lev00.toString() + ",";
      }
      if (this.material.comp == "上海公司") {
        if (info.lev11.toString() != "") {
          materialsIds = materialsIds + info.lev11.toString() + ",";
        }
      }
      if (this.material.comp == "上海分公司") {
        if (info.lev12.toString() != "") {
          materialsIds = materialsIds + info.lev12.toString() + ",";
        }
      }
      if (info.lev20.toString() != "") {
        materialsIds = materialsIds + info.lev20.toString() + ",";
      }
      if (this.material.job == "申请方") {
        if (info.lev31.toString() != "") {
          materialsIds = materialsIds + info.lev31.toString() + ",";
        }
      }
      if (this.material.job == "在沪方") {
        if (info.lev32.toString() != "") {
          materialsIds = materialsIds + info.lev32.toString() + ",";
        }
      }
      if (info.lev40.toString() != "") {
        materialsIds = materialsIds + info.lev40.toString() + ",";
      }
      // if (this.material.marryStatus = '已婚') {
      if (info.lev51.toString() != "") {
        materialsIds = materialsIds + info.lev51.toString() + ",";
      }
      // }
      // if (this.material.marryStatus = '再婚') {
      if (info.lev52.toString() != "") {
        materialsIds = materialsIds + info.lev52.toString() + ",";
      }
      // }
      // if (this.material.married = '已婚未育') {
      if (info.lev61.toString() != "") {
        materialsIds = materialsIds + info.lev61.toString() + ",";
      }
      // }
      // if (this.material.married = '已婚已育') {
      if (info.lev62.toString() != "") {
        materialsIds = materialsIds + info.lev62.toString() + ",";
        // }
      }
      if (info.lev70.toString() != "") {
        materialsIds = materialsIds + info.lev70.toString() + ",";
      }
      // if (this.material.addr = '社区公共户') {
      if (info.lev81.toString() != "") {
        materialsIds = materialsIds + info.lev82.toString() + ",";
        // }
      }
      // if (this.material.addr = '自购房') {
      if (info.lev82.toString() != "") {
        materialsIds = materialsIds + info.lev82.toString() + ",";
      }
      // }
      this.material.materialsIds = materialsIds;
      this.$emit("materialsInfo", this.material);
      console.log("materials:" + materials);
    }
  },
  watch: {
    meterials: {
      handler: function(newV, oldV) {
        this.material = this._.cloneDeep(newV);
      },
      deep: true
    }
  }
};
</script>

<style scoped>

</style>
