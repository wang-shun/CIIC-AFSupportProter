<!-- 单添随员 -->
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
          <input style="margin-left:10px" type="checkbox" :value="checkedA" id="checkedA" @change="clickSelectAll" ref="checkAll"/>
          <label for="checkedA">全选</label>
        </i-col>
      </Row>
      <Row>
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}"  >
          <div style="margin-left: 50px" v-if="item.level === '2-0'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev20" @change="change(material.info)" :id="item.materialId" ref="mainMaterials"/>
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
              <Radio label="已婚"></Radio>
              <Radio label="离婚"></Radio>
              <Radio label="丧偶"></Radio>
            </RadioGroup>
        </i-col>
      </Row>
       <Row v-if="material.marryStatus === '已婚'">
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}" >
          <div style="margin-left: 100px" v-if="item.level === '3-1'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev31" @change="change(material.info)" :id="item.materialId"/>
            <label :for="item.materialId">{{item.materialName}}</label>
          </div>
        </i-col>
        </div>
      </Row>
       <Row v-if="material.marryStatus === '离婚'">
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}" >
          <div style="margin-left: 100px" v-if="item.level === '3-2'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev32" @change="change(material.info)" :id="item.materialId"/>
            <label :for="item.materialId">{{item.materialName}}</label>
          </div>
        </i-col>
        </div>
      </Row>
       <Row v-if="material.marryStatus === '丧偶'">
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}" >
          <div style="margin-left: 100px" v-if="item.level === '3-3'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev33" @change="change(material.info)" :id="item.materialId"/>
            <label :for="item.materialId">{{item.materialName}}</label>
          </div>
        </i-col>
        </div>
      </Row>

      <Row style="margin: 10px 20px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <span style="font-weight:bold;font-size:14px">随员类型</span>
        </i-col>
      </Row>
      <Row style="margin: 10px 40px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <RadioGroup v-model="material.followerType" @on-change="followerTypeChange">
              <Radio label="子女"></Radio>
              <Radio label="配偶"></Radio>
              <Radio label="全家"></Radio>
            </RadioGroup>
        </i-col>
      </Row>
      <Row v-if="material.followerType === '子女'">
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}"  v-if="item.level === '4-1'">
          <div style="margin-left: 100px">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev41" @change="change(material.info)" :id="item.materialId"/>
            <label :for="item.materialId">{{item.materialName}}</label>
          </div>
        </i-col>
        </div>
      </Row>
      <Row v-if="material.followerType === '配偶'" >
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}" >
          <div style="margin-left: 100px" v-if="item.level === '4-2'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev42" @change="change(material.info)" :id="item.materialId"/>
            <label :for="item.materialId">{{item.materialName}}</label>
          </div>
        </i-col>
        </div>
      </Row>
      <Row v-if="material.followerType === '全家'" >
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}" >
          <div style="margin-left: 100px" v-if="item.level === '4-3'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev43" @change="change(material.info)" :id="item.materialId"/>
            <label :for="item.materialId">{{item.materialName}}</label>
          </div>
        </i-col>
        </div>
      </Row>

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
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}"  v-if="item.level === '5-1'">
          <div style="margin-left: 100px">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev51" @change="change(material.info)" :id="item.materialId"/>
            <label :for="item.materialId">{{item.materialName}}</label>
          </div>
        </i-col>
        </div>
      </Row>
      <Row v-if="material.familerMaterials === '配偶'" >
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}" >
          <div style="margin-left: 100px" v-if="item.level === '5-2'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev52" @change="change(material.info)" :id="item.materialId"/>
            <label :for="item.materialId">{{item.materialName}}</label>
          </div>
        </i-col>
        </div>
      </Row>
      <Row v-if="material.familerMaterials === '全家'" >
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}" >
          <div style="margin-left: 100px" v-if="item.level === '5-3'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev53" @change="change(meterials.info)" :id="item.materialId"/>
            <label :for="item.materialId">{{item.materialName}}</label>
          </div>
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
    clickSelectAll() {
      if (this.$refs.checkAll.checked) {
          this.material.info.lev20 = []
      }
      if (!this.$refs.checkAll.checked) {
        this.material.info.lev20 = []
      }
      this.$refs.mainMaterials.map(i => {
        i.checked = this.$refs.checkAll.checked
        if (this.$refs.checkAll.checked) {
          this.material.info.lev20.push(i.value)
        }
      })
      this.change(this.material.info)
    },
    compChange(val) {
      this.material.comp = val;
      this.$emit("materialsInfo", this.material);
    },
    marryStatusChange(val) {
      this.material.marryStatus = val;
      this.$emit("materialsInfo", this.material);
    },
    followerTypeChange(val) {
      this.material.followerType = val;
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
      // if ((this.material.marryStatus = "已婚")) {
        if (info.lev31.toString() != "") {
          materialsIds = materialsIds + info.lev31.toString() + ",";
        }
      // }
      // if ((this.material.marryStatus = "离婚")) {
        if (info.lev32.toString() != "") {
          materialsIds = materialsIds + info.lev32.toString() + ",";
        }
      // }
      // if ((this.material.marryStatus = "丧偶")) {
        if (info.lev33.toString() != "") {
          materialsIds = materialsIds + info.lev33.toString() + ",";
        }
      // }
      // if ((this.meterials.followerType = "子女")) {
        if (info.lev41.toString() != "") {
          materialsIds = materialsIds + info.lev41.toString() + ",";
        }
      // }
      // if ((this.meterials.followerType = "配偶")) {
        if (info.lev42.toString() != "") {
          materialsIds = materialsIds + info.lev42.toString() + ",";
        }
      // }
      // if ((this.meterials.followerType = "全家")) {
        if (info.lev43.toString() != "") {
          materialsIds = materialsIds + info.lev43.toString() + ",";
        }
      // }
      // if ((this.material.familerMaterials = "子女")) {
        if (info.lev51.toString() != "") {
          materialsIds = materialsIds + info.lev51.toString() + ",";
        }
      // }
      // if ((this.material.familerMaterials = "配偶")) {
        if (info.lev52.toString() != "") {
          materialsIds = materialsIds + info.lev52.toString() + ",";
        }
      // }
      // if ((this.material.familerMaterials = "全家")) {
        if (info.lev53.toString() != "") {
          materialsIds = materialsIds + info.lev53.toString() + ",";
        }
      // }
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
