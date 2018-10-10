<!-- 信息变更 -->
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
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev00" @change="change(material.info)"/>
            <label>{{item.materialName}}</label>
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
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev11" @change="change(material.info)"/>
            <label>{{item.materialName}}</label>
          </div>
        </i-col>
        </div>
      </Row>
      <Row v-if="material.comp === '上海分公司'" >
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}" >
          <div style="margin-left: 100px" v-if="item.level === '1-2'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev12" @change="change(material.info)"/>
            <label>{{item.materialName}}</label>
          </div>
        </i-col>
        </div>
      </Row>

    <Row style="margin: 10px 20px">
      <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 5}" >
        <span style="font-weight:bold;font-size:14px">正常项目</span>
      </i-col>
    </Row>
    <Row style="margin: 10px 40px">
      <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <RadioGroup v-model="material.changeProject" @on-change="changeProjectChange">
          <Radio label="单位名称变更材料项"></Radio>
          <Radio label="添加随员材料项"></Radio>
          <Radio label="个人信息修改材料项"></Radio>
        </RadioGroup>
      </i-col>
    </Row>

    <div v-if="material.changeProject == '单位名称变更材料项'">
    <Row style="margin: 10px 20px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 5}" >
          <span style="font-weight:bold;font-size:14px">主要材料</span>
        </i-col>
      </Row>
      <Row>
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}"  >
          <div style="margin-left: 50px" v-if="item.level === '2-0'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev20" @change="change(material.info)"/>
            <label>{{item.materialName}}</label>
          </div>
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
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}"  >
          <div style="margin-left: 50px" v-if="item.level === '3-0'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev30" @change="change(material.info)"/>
            <label>{{item.materialName}}</label>
          </div>
        </i-col>
        </div>
      </Row>
      </div>

      <div v-if="material.changeProject == '添加随员材料项'">
      <Row style="margin: 10px 20px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 5}" >
          <span style="font-weight:bold;font-size:14px">主要材料</span>
        </i-col>
      </Row>
      <Row>
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}"  >
          <div style="margin-left: 50px" v-if="item.level === '4-0'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev40" @change="change(material.info)"/>
            <label>{{item.materialName}}</label>
          </div>
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
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}"  >
          <div style="margin-left: 50px" v-if="item.level === '5-0'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev50" @change="change(material.info)"/>
            <label>{{item.materialName}}</label>
          </div>
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
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}" >
          <div style="margin-left: 100px" v-if="item.level === '6-1'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev61" @change="change(material.info)"/>
            <label>{{item.materialName}}</label>
          </div>
        </i-col>
        </div>
      </Row>
       <Row v-if="material.follower === '随员身份证明'">
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}" >
          <div style="margin-left: 100px" v-if="item.level === '6-2'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev62" @change="change(material.info)"/>
            <label>{{item.materialName}}</label>
          </div>
        </i-col>
        </div>
      </Row>
      <Row v-if="material.follower === '随员其他材料'">
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}" >
          <div style="margin-left: 100px" v-if="item.level === '6-3'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev63" @change="change(material.info)"/>
            <label>{{item.materialName}}</label>
          </div>
        </i-col>
        </div>
      </Row>
      </div>

      <div v-if="material.changeProject == '个人信息修改材料项'">
      <Row style="margin: 10px 20px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 5}" >
          <span style="font-weight:bold;font-size:14px">主要材料</span>
        </i-col>
      </Row>
      <Row>
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}"  >
          <div style="margin-left: 50px" v-if="item.level === '7-0'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev70" @change="change(material.info)"/>
            <label>{{item.materialName}}</label>
          </div>
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
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}"  >
          <div style="margin-left: 50px" v-if="item.level === '8-0'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev80" @change="change(material.info)"/>
            <label>{{item.materialName}}</label>
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
        changeProject: "单位名称变更材料项",
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
    changeProjectChange(val) {
      this.material.changeProject = val;
      this.$emit("materialsInfo", this.material);
    },
    followerChange(val) {
      this.material.follower = val;
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
      if (this.material.changeProject == '单位名称变更材料项') {
        if (info.lev20.toString() != "") {
          materialsIds = materialsIds + info.lev20.toString() + ",";
        }
        if (info.lev30.toString() != "") {
          materialsIds = materialsIds + info.lev30.toString() + ",";
        }
      }
      if (this.material.changeProject == '添加随员材料项') {
        if (info.lev40.toString() != "") {
          materialsIds = materialsIds + info.lev40.toString() + ",";
        }
        if (info.lev50.toString() != "") {
          materialsIds = materialsIds + info.lev50.toString() + ",";
        }
        if (info.lev61.toString() != "") {
          materialsIds = materialsIds + info.lev61.toString() + ",";
        }
        if (info.lev62.toString() != "") {
          materialsIds = materialsIds + info.lev62.toString() + ",";
        }
        if (info.lev63.toString() != "") {
          materialsIds = materialsIds + info.lev63.toString() + ",";
        }
      }
      if (this.material.changeProject == '个人信息修改材料项') {
        if (info.lev70.toString() != "") {
          materialsIds = materialsIds + info.lev70.toString() + ",";
        }
        if (info.lev80.toString() != "") {
          materialsIds = materialsIds + info.lev80.toString() + ",";
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
