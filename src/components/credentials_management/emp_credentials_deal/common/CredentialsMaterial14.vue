<!-- 留学生 -->
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
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <span style="font-weight:bold;font-size:14px">是否为科创人员</span>
        </i-col>
      </Row>
      <Row style="margin: 10px 40px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <RadioGroup v-model="material.hasGooder" @on-change="hasGooderChange">
              <Radio label="是"></Radio>
              <Radio label="否"></Radio>
            </RadioGroup>
        </i-col>
      </Row>
      <Row v-if="material.hasGooder === '是'">
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}"  v-if="item.level === '3-1'">
          <div style="margin-left: 100px">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev31" @change="change(material.info)"/>
            <label>{{item.materialName}}</label>
          </div>
        </i-col>
        </div>
      </Row>
      <Row v-if="material.hasGooder === '否'" >
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}" >
          <div style="margin-left: 100px" v-if="item.level === '3-2'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev32" @change="change(material.info)"/>
            <label>{{item.materialName}}</label>
          </div>
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
            <RadioGroup v-model="material.educate" style="width:600px" @on-change="educateChange">
              <Radio label="学历学位证书（国内）"></Radio>
              <Radio label="学历学位证书（国外）"></Radio>
              <Radio label="国外学历学位成绩单"></Radio>
              <Radio label="其他相关辅助材料"></Radio>
            </RadioGroup>
        </i-col>
      </Row>
      <Row v-if="material.educate === '学历学位证书（国内）'">
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}" >
          <div style="margin-left: 100px" v-if="item.level === '4-1'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev41" @change="change(material.info)"/>
            <label>{{item.materialName}}</label>
          </div>
        </i-col>
        </div>
      </Row>
       <Row v-if="material.educate === '学历学位证书（国外）'">
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}" >
          <div style="margin-left: 100px" v-if="item.level === '4-2'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev42" @change="change(material.info)"/>
            <label>{{item.materialName}}</label>
          </div>
        </i-col>
        </div>
      </Row>
      <Row v-if="material.educate === '国外学历学位成绩单'">
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}" >
          <div style="margin-left: 100px" v-if="item.level === '4-3'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev43" @change="change(material.info)"/>
            <label>{{item.materialName}}</label>
          </div>
        </i-col>
        </div>
      </Row>
      <Row v-if="material.educate === '其他相关辅助材料'">
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}" >
          <div style="margin-left: 100px" v-if="item.level === '4-4'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev44" @change="change(material.info)"/>
            <label>{{item.materialName}}</label>
          </div>
        </i-col>
        </div>
      </Row>

      <Row style="margin: 10px 20px">
        <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 5}" >
          <span style="font-weight:bold;font-size:14px">公司材料</span>
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
            </RadioGroup>
        </i-col>
      </Row>
      <Row v-if="material.marryStatus === '未婚'">
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}" >
          <div style="margin-left: 100px" v-if="item.level === '6-1'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev61" @change="change(material.info)"/>
            <label>{{item.materialName}}</label>
          </div>
        </i-col>
        </div>
      </Row>
       <Row v-if="material.marryStatus === '已婚'">
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}" >
          <div style="margin-left: 100px" v-if="item.level === '6-2'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev62" @change="change(material.info)"/>
            <label>{{item.materialName}}</label>
          </div>
        </i-col>
        </div>
      </Row>
       <Row v-if="material.marryStatus === '离婚'">
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}" >
          <div style="margin-left: 100px" v-if="item.level === '6-3'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev63" @change="change(material.info)"/>
            <label>{{item.materialName}}</label>
          </div>
        </i-col>
        </div>
      </Row>
       <Row v-if="material.marryStatus === '再婚'">
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}" >
          <div style="margin-left: 100px" v-if="item.level === '6-4'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev64" @change="change(material.info)"/>
            <label>{{item.materialName}}</label>
          </div>
        </i-col>
        </div>
      </Row>

      <div v-if="material.marryStatus !== '未婚'">
        <Row style="margin: 10px 20px">
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <span style="font-weight:bold;font-size:14px">是否有随迁人员</span>
          </i-col>
        </Row>
        <Row style="margin: 10px 40px">
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <RadioGroup v-model="material.hasfollower" @on-change="hasfollowerChange">
                <Radio label="是"></Radio>
                <Radio label="否"></Radio>
              </RadioGroup>
          </i-col>
        </Row>
        <Row v-if="material.hasfollower === '是'">
          <div v-for="item in material.menu" :key="item.materialTypeRelationId">
          <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}"  v-if="item.level === '7-1'">
            <div style="margin-left: 100px">
              <input type="checkbox" :value="item.materialId" v-model="material.info.lev71" @change="change(material.info)"/>
              <label>{{item.materialName}}</label>
            </div>
          </i-col>
          </div>
        </Row>
        <Row v-if="material.hasfollower === '否'" >
          <div v-for="item in material.menu" :key="item.materialTypeRelationId">
          <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}" >
            <div style="margin-left: 100px" v-if="item.level === '7-2'">
              <input type="checkbox" :value="item.materialId" v-model="material.info.lev72" @change="change(material.info)"/>
              <label>{{item.materialName}}</label>
            </div>
          </i-col>
          </div>
        </Row>

        <div v-if="material.hasfollower === '是'">
        <Row style="margin: 10px 20px" >
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <span style="font-weight:bold;font-size:14px">随迁材料</span>
          </i-col>
        </Row>
        <Row style="margin: 10px 40px">
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <RadioGroup v-model="material.followMaterials" @on-change="followMaterialsChange">
                <Radio label="子女"></Radio>
                <Radio label="配偶"></Radio>
                <Radio label="全家"></Radio>
              </RadioGroup>
          </i-col>
        </Row>
        <Row v-if="material.followMaterials === '子女'">
          <div v-for="item in material.menu" :key="item.materialTypeRelationId">
          <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}"  v-if="item.level === '8-1'">
            <div style="margin-left: 100px">
              <input type="checkbox" :value="item.materialId" v-model="material.info.lev81" @change="change(material.info)"/>
              <label>{{item.materialName}}</label>
            </div>
          </i-col>
          </div>
        </Row>
        <Row v-if="material.followMaterials === '配偶'" >
          <div v-for="item in material.menu" :key="item.materialTypeRelationId">
          <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}" >
            <div style="margin-left: 100px" v-if="item.level === '8-2'">
              <input type="checkbox" :value="item.materialId" v-model="material.info.lev82" @change="change(material.info)"/>
              <label>{{item.materialName}}</label>
            </div>
          </i-col>
          </div>
        </Row>
        <Row v-if="material.followMaterials === '全家'" >
          <div v-for="item in material.menu" :key="item.materialTypeRelationId">
          <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}" >
            <div style="margin-left: 100px" v-if="item.level === '8-3'">
              <input type="checkbox" :value="item.materialId" v-model="material.info.lev83" @change="change(material.info)"/>
              <label>{{item.materialName}}</label>
            </div>
          </i-col>
          </div>
        </Row>
        </div>

        <div v-if="material.hasfollower === '否'">
        <Row style="margin: 10px 20px" >
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <span style="font-weight:bold;font-size:14px">不随迁材料</span>
          </i-col>
        </Row>
        <Row style="margin: 10px 40px">
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <RadioGroup v-model="material.notFollowMaterials" @on-change="notFollowMaterialsChange">
                <Radio label="已是上海户籍"></Radio>
                <Radio label="不符合随迁条件"></Radio>
                <Radio label="已是外籍"></Radio>
                <Radio label="其他原因"></Radio>
              </RadioGroup>
          </i-col>
        </Row>
        <Row v-if="material.notFollowMaterials === '已是上海户籍'">
          <div v-for="item in material.menu" :key="item.materialTypeRelationId">
          <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}"  v-if="item.level === '9-1'">
            <div style="margin-left: 100px">
              <input type="checkbox" :value="item.materialId" v-model="material.info.lev91" @change="change(material.info)"/>
              <label>{{item.materialName}}</label>
            </div>
          </i-col>
          </div>
        </Row>
        <Row v-if="material.notFollowMaterials === '不符合随迁条件'" >
          <div v-for="item in material.menu" :key="item.materialTypeRelationId">
          <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}" >
            <div style="margin-left: 100px" v-if="item.level === '9-2'">
              <input type="checkbox" :value="item.materialId" v-model="material.info.lev92" @change="change(material.info)"/>
              <label>{{item.materialName}}</label>
            </div>
          </i-col>
          </div>
        </Row>
        <Row v-if="material.notFollowMaterials === '已是外籍'" >
          <div v-for="item in material.menu" :key="item.materialTypeRelationId">
          <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}" >
            <div style="margin-left: 100px" v-if="item.level === '9-3'">
              <input type="checkbox" :value="item.materialId" v-model="material.info.lev93" @change="change(material.info)"/>
              <label>{{item.materialName}}</label>
            </div>
          </i-col>
          </div>
        </Row>
        <Row v-if="material.notFollowMaterials === '其他原因'" >
          <div v-for="item in material.menu" :key="item.materialTypeRelationId">
          <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}" >
            <div style="margin-left: 100px" v-if="item.level === '9-4'">
              <input type="checkbox" :value="item.materialId" v-model="material.info.lev94" @change="change(material.info)"/>
              <label>{{item.materialName}}</label>
            </div>
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
            <RadioGroup v-model="material.addr" @on-change="addrChange">
              <Radio label="社区公共户"></Radio>
              <Radio label="自购房"></Radio>
            </RadioGroup>
        </i-col>
      </Row>
      <Row v-if="material.addr === '社区公共户'">
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}"  v-if="item.level === '10-1'">
          <div style="margin-left: 100px">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev101" @change="change(material.info)"/>
            <label>{{item.materialName}}</label>
          </div>
        </i-col>
        </div>
      </Row>
      <Row v-if="material.addr === '自购房'" >
        <div v-for="item in material.menu" :key="item.materialTypeRelationId">
        <i-col :sm="{span: 12}" :md="{span: 6}" :lg="{span: 4}" >
          <div style="margin-left: 100px" v-if="item.level === '10-2'">
            <input type="checkbox" :value="item.materialId" v-model="material.info.lev102" @change="change(material.info)"/>
            <label>{{item.materialName}}</label>
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
    compChange(val) {
      this.material.comp = val;
      this.$emit("materialsInfo", this.material);
    },
    marryStatusChange(val) {
      this.material.marryStatus = val;
      this.$emit("materialsInfo", this.material);
    },
    hasGooderChange(val) {
      this.material.hasGooder = val;
      this.$emit("materialsInfo", this.material);
    },
    educateChange(val) {
      this.material.educate = val;
      this.$emit("materialsInfo", this.material);
    },
    hasfollowerChange(val) {
      this.material.hasfollower = val;
      this.$emit("materialsInfo", this.material);
    },
    followMaterialsChange(val) {
      this.material.followMaterials = val;
      this.$emit("materialsInfo", this.material);
    },
    notFollowMaterialsChange(val) {
      this.material.notFollowMaterials = val;
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
      // if (this.material.hasGooder = '是') {
      if (info.lev31.toString() != "") {
        materialsIds = materialsIds + info.lev31.toString() + ",";
      }
      // }
      // if (this.material.hasGooder = '否') {
      if (info.lev32.toString() != "") {
        materialsIds = materialsIds + info.lev32.toString() + ",";
      }
      // }
      if (info.lev41.toString() != "") {
        materialsIds = materialsIds + info.lev41.toString() + ",";
      }
      if (info.lev42.toString() != "") {
        materialsIds = materialsIds + info.lev42.toString() + ",";
      }
      if (info.lev43.toString() != "") {
        materialsIds = materialsIds + info.lev43.toString() + ",";
      }
      if (info.lev44.toString() != "") {
        materialsIds = materialsIds + info.lev44.toString() + ",";
      }
      if (info.lev50.toString() != "") {
        materialsIds = materialsIds + info.lev50.toString() + ",";
      }
      if ((this.material.marryStatus = "未婚")) {
        if (info.lev61.toString() != "") {
          materialsIds = materialsIds + info.lev61.toString() + ",";
        }
      }

      if ((this.material.marryStatus = "已婚")) {
        if (info.lev62.toString() != "") {
          materialsIds = materialsIds + info.lev62.toString() + ",";
        }
      }

      if ((this.material.marryStatus = "离婚")) {
        if (info.lev63.toString() != "") {
          materialsIds = materialsIds + info.lev63.toString() + ",";
        }
      }

      if ((this.material.marryStatus = "再婚")) {
        if (info.lev64.toString() != "") {
          materialsIds = materialsIds + info.lev64.toString() + ",";
        }
      }
      if ((this.material.hasFollower = "是")) {
        if (info.lev71.toString() != "") {
          materialsIds = materialsIds + info.lev71.toString() + ",";
        }
      }
      if ((this.material.hasFollower = "否")) {
        if (info.lev72.toString() != "") {
          materialsIds = materialsIds + info.lev72.toString() + ",";
        }
      }
      if ((this.material.followMaterials = "子女")) {
        if (info.lev81.toString() != "") {
          materialsIds = materialsIds + info.lev81.toString() + ",";
        }
      }
      if ((this.material.followMaterials = "配偶")) {
        if (info.lev82.toString() != "") {
          materialsIds = materialsIds + info.lev82.toString() + ",";
        }
      }
      if ((this.material.followMaterials = "全家")) {
        if (info.lev83.toString() != "") {
          materialsIds = materialsIds + info.lev83.toString() + ",";
        }
      }
      if ((this.material.notFollowMaterials = "已是上海户籍")) {
        if (info.lev91.toString() != "") {
          materialsIds = materialsIds + info.lev91.toString() + ",";
        }
      }
      if ((this.material.notFollowMaterials = "不符合随迁条件")) {
        if (info.lev92.toString() != "") {
          materialsIds = materialsIds + info.lev92.toString() + ",";
        }
      }
      if ((this.material.notFollowMaterials = "已是外籍")) {
        if (info.lev93.toString() != "") {
          materialsIds = materialsIds + info.lev93.toString() + ",";
        }
      }
      if ((this.material.notFollowMaterials = "其他原因")) {
        if (info.lev94.toString() != "") {
          materialsIds = materialsIds + info.lev94.toString() + ",";
        }
      }
      // if (this.material.addr = '社区公共户') {
      if (info.lev101.toString() != "") {
        materialsIds = materialsIds + info.lev101.toString() + ",";
      }
      // }
      // if (this.material.addr = '自购房') {
      if (info.lev102.toString() != "") {
        materialsIds = materialsIds + info.lev102.toString() + ",";
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
