<!-- 人才引进 -->
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
          <div style="margin-left: 100px" v-if="item.level === '2-0'">
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
              <Radio label="未婚"></Radio>
              <Radio label="已婚"></Radio>
              <Radio label="离婚"></Radio>
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
       <Row v-if="material.marryStatus === '丧偶'">
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}" >
          <div style="margin-left: 100px" v-if="item.level === '3-4'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev34" @change="change(material.info)" :id="item.materialId"/>
            <label :for="item.materialId">{{item.materialName}}</label>
          </div>
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
            <RadioGroup v-model="material.hasChildFollow" @on-change="hasChildFollowChange">
              <Radio label="是"></Radio>
              <Radio label="否"></Radio>
            </RadioGroup>
        </i-col>
      </Row>
      <Row v-if="material.hasChildFollow === '是'">
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}"  v-if="item.level === '4-1'">
          <div style="margin-left: 100px">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev41" @change="change(material.info)" :id="item.materialId"/>
            <label :for="item.materialId">{{item.materialName}}</label>
          </div>
        </i-col>
        </div>
      </Row>
      <Row v-if="material.hasChildFollow === '否'" >
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}" >
          <div style="margin-left: 100px" v-if="item.level === '4-2'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev42" @change="change(material.info)" :id="item.materialId"/>
            <label :for="item.materialId">{{item.materialName}}</label>
          </div>
        </i-col>
        </div>
      </Row>

      <div v-if="material.hasChildFollow === '是'">
      <Row style="margin: 10px 20px" >
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <span style="font-weight:bold;font-size:14px">子女随调材料</span>
        </i-col>
      </Row>
      <Row>
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}"  >
          <div style="margin-left: 50px" v-if="item.level === '5-0'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev50" @change="change(material.info)" :id="item.materialId"/>
            <label :for="item.materialId">{{item.materialName}}</label>
          </div>
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
            <RadioGroup v-model="material.hasSpouseFollow" @on-change="hasSpouseFollowChange">
              <Radio label="是"></Radio>
              <Radio label="否"></Radio>
            </RadioGroup>
        </i-col>
      </Row>
      <Row v-if="material.hasSpouseFollow === '是'">
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}"  v-if="item.level === '6-1'">
          <div style="margin-left: 100px">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev61" @change="change(material.info)" :id="item.materialId"/>
            <label :for="item.materialId">{{item.materialName}}</label>
          </div>
        </i-col>
        </div>
      </Row>
      <Row v-if="material.hasSpouseFollow === '否'" >
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}" >
          <div style="margin-left: 100px" v-if="item.level === '6-2'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev62" @change="change(material.info)" :id="item.materialId"/>
            <label :for="item.materialId">{{item.materialName}}</label>
          </div>
        </i-col>
        </div>
      </Row>

      <div v-if="material.hasSpouseFollow === '是'">
      <Row style="margin: 10px 20px" >
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <span style="font-weight:bold;font-size:14px">配偶随调材料</span>
        </i-col>
      </Row>
       <Row>
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}"  >
          <div style="margin-left: 50px" v-if="item.level === '7-0'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev70" @change="change(material.info)" :id="item.materialId"/>
            <label :for="item.materialId">{{item.materialName}}</label>
          </div>
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
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}"  v-if="item.level === '8-1'">
          <div style="margin-left: 100px">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev81" @change="change(material.info)" :id="item.materialId"/>
            <label :for="item.materialId">{{item.materialName}}</label>
          </div>
        </i-col>
        </div>
      </Row>
      <Row v-if="material.addr === '自购房'" >
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}" >
          <div style="margin-left: 100px" v-if="item.level === '8-2'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev82" @change="change(material.info)" :id="item.materialId"/>
            <label :for="item.materialId">{{item.materialName}}</label>
          </div>
        </i-col>
        </div>
      </Row>

     <Row style="margin: 10px 20px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 5}" >
          <span style="font-weight:bold;font-size:14px">计生材料</span>
        </i-col>
      </Row>
      <Row>
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}"  >
          <div style="margin-left: 50px" v-if="item.level === '9-0'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev90" @change="change(material.info)" :id="item.materialId"/>
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
    hasChildFollowChange(val) {
      this.material.hasChildFollow = val;
      this.$emit("materialsInfo", this.material);
    },
    hasSpouseFollowChange(val) {
      this.material.hasSpouseFollow = val;
      this.$emit("materialsInfo", this.material);
    },
    addrChange(val) {
      this.material.addr = val;
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
      if (this.material.marryStatus == "丧偶") {
        if (info.lev34.toString() != "") {
          materialsIds = materialsIds + info.lev34.toString() + ",";
        }
      }
      // if (this.material.hasChildFollow = '是') {
      if (info.lev41.toString() != "") {
        materialsIds = materialsIds + info.lev41.toString() + ",";
      }
      // }
      // if (this.material.hasChildFollow = '否') {
      if (info.lev42.toString() != "") {
        materialsIds = materialsIds + info.lev42.toString() + ",";
      }
      // }
      if (info.lev50.toString() != "") {
        materialsIds = materialsIds + info.lev50.toString() + ",";
      }
      // if (this.material.hasSpouseFollow = '是') {
      if (info.lev61.toString() != "") {
        materialsIds = materialsIds + info.lev61.toString() + ",";
      }
      // }
      // if (this.material.hasSpouseFollow = '否') {
      if (info.lev62.toString() != "") {
        materialsIds = materialsIds + info.lev62.toString() + ",";
      }
      // }
      if (info.lev70.toString() != "") {
        materialsIds = materialsIds + info.lev70.toString() + ",";
      }
      // if (this.material.addr = '社区公共户') {
      if (info.lev81.toString() != "") {
        materialsIds = materialsIds + info.lev82.toString() + ",";
      }
      // }
      // if (this.material.addr = '自购房') {
      if (info.lev82.toString() != "") {
        materialsIds = materialsIds + info.lev82.toString() + ",";
      }
      // }
      if (info.lev90.toString() != "") {
        materialsIds = materialsIds + info.lev90.toString() + ",";
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
