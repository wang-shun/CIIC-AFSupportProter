<!-- 积分确认 -->
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
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}"  >
          <div style="margin-left: 50px" v-if="item.level === '0-0'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev00" @change="change(material.info)" :id="item.materialId"/>
            <label :for="item.materialId">{{item.materialName}}</label>
          </div>
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
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}"  v-if="item.level === '1-1'">
          <div style="margin-left: 100px">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev11" @change="change(material.info)" :id="item.materialId"/>
            <label :for="item.materialId">{{item.materialName}}</label>
          </div>
        </i-col>
        </div>
      </Row>
      <Row v-if="material.comp === '上海分公司'" >
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}" >
          <div style="margin-left: 100px" v-if="item.level === '1-2'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev12" @change="change(material.info)" :id="item.materialId"/>
            <label :for="item.materialId">{{item.materialName}}</label>
          </div>
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
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}"  >
          <div style="margin-left: 100px" v-if="item.level === '2-0'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev20" @change="change(material.info)" :id="item.materialId"/>
            <label :for="item.materialId">{{item.materialName}}</label>
          </div>
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
              <Radio label="未婚"></Radio>
              <Radio label="已婚"></Radio>
              <Radio label="离婚"></Radio>
              <Radio label="再婚"></Radio>
              <Radio label="丧偶"></Radio>
            </RadioGroup>
        </i-col>
      </Row>
      <Row v-if="material.marryStatus === '未婚'">
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}" >
          <div style="margin-left: 100px" v-if="item.level === '3-1'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev31" @change="change(material.info)" :id="item.materialId"/>
            <label :for="item.materialId">{{item.materialName}}</label>
          </div>
        </i-col>
        </div>
      </Row>
       <Row v-if="material.marryStatus === '已婚'">
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}" >
          <div style="margin-left: 100px" v-if="item.level === '3-2'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev32" @change="change(material.info)" :id="item.materialId"/>
            <label :for="item.materialId">{{item.materialName}}</label>
          </div>
        </i-col>
        </div>
      </Row>
       <Row v-if="material.marryStatus === '离婚'">
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}" >
          <div style="margin-left: 100px" v-if="item.level === '3-3'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev33" @change="change(material.info)" :id="item.materialId"/>
            <label :for="item.materialId">{{item.materialName}}</label>
          </div>
        </i-col>
        </div>
      </Row>
       <Row v-if="material.marryStatus === '再婚'">
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}" >
          <div style="margin-left: 100px" v-if="item.level === '3-4'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev34" @change="change(material.info)" :id="item.materialId"/>
            <label :for="item.materialId">{{item.materialName}}</label>
          </div>
        </i-col>
        </div>
      </Row>
       <Row v-if="material.marryStatus === '丧偶'">
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}" >
          <div style="margin-left: 100px" v-if="item.level === '3-5'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev35" @change="change(material.info)" :id="item.materialId"/>
            <label :for="item.materialId">{{item.materialName}}</label>
          </div>
        </i-col>
        </div>
      </Row>

       <!-- <Row style="margin: 10px 20px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" >
            <span style="font-weight:bold;font-size:14px">配偶户籍</span>
        </i-col>
      </Row>
      <Row>
        <div  v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}" >
          <Form-item v-if="item.level === '4-0'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev40" @change="change(material.info)"/>
            <label>{{item.materialName}}</label>
          </Form-item>
        </i-col>
        </div>
      </Row> -->

      <Row style="margin: 10px 20px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <span style="font-weight:bold;font-size:14px">配偶是否上海户籍</span>
        </i-col>
      </Row>
      <Row style="margin: 10px 40px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <RadioGroup v-model="material.hasShPerson" @on-change="hasShPersonChange">
              <Radio label="是"></Radio>
              <Radio label="否"></Radio>
            </RadioGroup>
        </i-col>
      </Row>

      <Row style="margin: 10px 20px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <span style="font-weight:bold;font-size:14px">是否有随员</span>
        </i-col>
      </Row>
      <Row style="margin: 10px 40px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <RadioGroup v-model="material.hasFollower" @on-change="hasFollowerChange">
              <Radio label="是"></Radio>
              <Radio label="否"></Radio>
            </RadioGroup>
        </i-col>
      </Row>
      <Row v-if="material.hasFollower === '是'">
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}"  v-if="item.level === '5-1'">
          <div style="margin-left: 100px">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev51" @change="change(material.info)" :id="item.materialId"/>
            <label :for="item.materialId">{{item.materialName}}</label>
          </div>
        </i-col>
        </div>
      </Row>
      <Row v-if="material.hasFollower === '否'" >
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}" >
          <div style="margin-left: 100px" v-if="item.level === '5-2'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev52" @change="change(material.info)" :id="item.materialId"/>
            <label :for="item.materialId">{{item.materialName}}</label>
          </div>
        </i-col>
        </div>
      </Row>

      <div v-if="material.hasFollower === '是'">
      <Row style="margin: 10px 20px" >
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <span style="font-weight:bold;font-size:14px">配偶及子女相关材料</span>
        </i-col>
      </Row>
      <Row style="margin: 10px 40px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <RadioGroup v-model="material.familerMaterials" @on-change="familerMaterialsChange">
              <Radio label="子女"></Radio>
              <Radio label="配偶"></Radio>
              <Radio label="全家"></Radio>
            </RadioGroup>
        </i-col>
      </Row>
      <Row v-if="material.familerMaterials === '子女'">
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}"  v-if="item.level === '6-1'">
          <div style="margin-left: 100px">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev61" @change="change(material.info)" :id="item.materialId"/>
            <label :for="item.materialId">{{item.materialName}}</label>
          </div>
        </i-col>
        </div>
      </Row>
      <Row v-if="material.familerMaterials === '配偶'" >
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}" >
          <div style="margin-left: 100px" v-if="item.level === '6-2'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev62" @change="change(material.info)" :id="item.materialId"/>
            <label :for="item.materialId">{{item.materialName}}</label>
          </div>
        </i-col>
        </div>
      </Row>
      <Row v-if="material.familerMaterials === '全家'" >
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}" >
          <div style="margin-left: 100px" v-if="item.level === '6-3'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev63" @change="change(material.info)" :id="item.materialId"/>
            <label :for="item.materialId">{{item.materialName}}</label>
          </div>
        </i-col>
        </div>
      </Row>
      </div>

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
        hasShPerson: "",
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
    hasShPersonChange(val) {
      this.material.hasShPerson = val;
      this.$emit("materialsInfo", this.material);
    },
    hasFollowerChange(val) {
      this.material.hasFollower = val;
      this.$emit("materialsInfo", this.material);
    },
    familerMaterialsChange(val) {
      this.material.familerMaterials = val;
      this.$emit("materialsInfo", this.material);
    },
    change(info) {
      let materialsIds = "";
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
      if (this.material.marryStatus == "未婚") {
        if (info.lev31.toString() != "") {
          materialsIds = materialsIds + info.lev31.toString() + ",";
        }
      }
      if (this.material.marryStatus == "已婚") {
        if (info.lev32.toString() != "") {
          materialsIds = materialsIds + info.lev32.toString() + ",";
        }
      }
      if (this.material.marryStatus == "离婚") {
        if (info.lev33.toString() != "") {
          materialsIds = materialsIds + info.lev33.toString() + ",";
        }
      }
      if (this.material.marryStatus == "再婚") {
        if (info.lev34.toString() != "") {
          materialsIds = materialsIds + info.lev34.toString() + ",";
        }
      }
      if (this.material.marryStatus == "丧偶") {
        if (info.lev35.toString() != "") {
          materialsIds = materialsIds + info.lev35.toString() + ",";
        }
      }
      if (info.lev40.toString() != "") {
        materialsIds = materialsIds + info.lev40.toString() + ",";
      }
      if (this.material.hasFollower == "是") {
        if (info.lev51.toString() != "") {
          materialsIds = materialsIds + info.lev51.toString() + ",";
        }

        if (this.material.familerMaterials == "子女") {
          if (info.lev61.toString() != "") {
            materialsIds = materialsIds + info.lev61.toString() + ",";
          }
        }
        if (this.material.familerMaterials == "配偶") {
          if (info.lev62.toString() != "") {
            materialsIds = materialsIds + info.lev62.toString() + ",";
          }
        }
        if (this.material.familerMaterials == "全家") {
          if (info.lev63.toString() != "") {
            materialsIds = materialsIds + info.lev63.toString() + ",";
          }
        }
      }
      if (this.material.hasFollower == "否") {
        if (info.lev52.toString() != "") {
          materialsIds = materialsIds + info.lev52.toString() + ",";
        }
      }
      this.material.materialsIds = materialsIds;
      this.$emit("materialsInfo", this.material);
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
