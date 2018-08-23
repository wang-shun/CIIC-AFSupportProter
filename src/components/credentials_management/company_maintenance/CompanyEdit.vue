<template>
  <div>
    <div>
    <Table border :columns="colums" :data="data1" @on-row-click="selectedRow" :highlight-row="highlight"></Table>
    </div>
    <div>
    <Card>
      <p slot="title">{{title}}</p>
      <Form ref="formItem" :model="formItem"  :label-width="120" >
        <h4>办理信息</h4>
        <Row type="flex" justify="start">
          <i-col :sm="{span: 24}" :md="{span: 20}" :lg="{span: 10}">
            <Form-item label="办理机构：" prop="name">
              <Select v-model="formItem.orgPoilcyId" placeholder="请选择" label-in-value="true" @on-change="orgChange" transfer>
                <Option v-for="item in orgPoilcys" :value="item.orgPoilcyId" :key="item.orgPoilcyId" >{{ item.name }}</Option>
              </Select>
            </Form-item>
          </i-col>
          <i-col :sm="{span: 24}" :md="{span: 20}" :lg="{span: 10}">
            <Form-item label="操作方式：" prop="operateType">
              <Select v-model="formItem.operateType" placeholder="请选择" transfer>
                <Option v-for="(value,key) in this.baseDic.operateType" :value="key" :key="key">{{ value }}</Option>
              </Select>
            </Form-item>
          </i-col>
          <i-col :sm="{span: 24}" :md="{span: 20}" :lg="{span: 10}">
            <Form-item label="操作账号：" prop="operateAccount">
              <Input v-model="formItem.operateAccount" placeholder="请输入"/>
            </Form-item>
          </i-col>
          <i-col :sm="{span: 24}" :md="{span: 20}" :lg="{span: 10}">
            <Form-item label="操作密码：" prop="operatePwd">
              <Input v-model="formItem.operatePwd" placeholder="请输入" />
            </Form-item>
          </i-col>
        </Row>
        <h4>收费信息</h4>
        <Row type="flex" justify="start">
          <!--<i-col :sm="{span: 24}" :md="{span: 20}" :lg="{span: 10}">-->
            <!--<Form-item label="费用类型：" prop="chargeType">-->
              <!--<Select v-model="formItem.chargeType" placeholder="请选择" transfer>-->
                <!--<Option value="1">免费</Option>-->
                <!--<Option value="2">常规收费</Option>-->
                <!--<Option value="3">特殊收费</Option>-->
              <!--</Select>-->
            <!--</Form-item>-->
          <!--</i-col>-->
          <i-col :sm="{span: 24}" :md="{span: 20}" :lg="{span: 10}">
            <Form-item label="支付方式：" prop="payType">
              <Select v-model="formItem.payType" placeholder="请选择" transfer>
                <Option value="1">台账</Option>
                <Option value="2">员工自付</Option>
              </Select>
            </Form-item>
          </i-col>
          <i-col :sm="{span: 24}" :md="{span: 20}" :lg="{span: 10}">
            <Form-item label="特殊收费备注：" prop="specialChargeRemark" v-if="formItem.chargeType === '3'">
              <Input v-model="formItem.specialChargeRemark" type="textarea" :autosize="{minRows: 3,maxRows: 6}" placeholder="请输入"/>
            </Form-item>
          </i-col>
        </Row>
        <h4>留存材料信息</h4>
        <Row type="flex" justify="start">
          <i-col :sm="{span: 24}" :md="{span: 20}" :lg="{span: 10}">
            <Form-item >
              <Checkbox v-model="formItem.introduceMail">介绍信</Checkbox>
            </Form-item>
          </i-col>
          <i-col :sm="{span: 24}" :md="{span: 20}" :lg="{span: 10}">
            <Form-item >
              <Checkbox v-model="formItem.onlineContactIdCard">网上联系人身份证复印件</Checkbox>
            </Form-item>
          </i-col>
          <i-col :sm="{span: 24}" :md="{span: 20}" :lg="{span: 10}">
            <Form-item >
              <Checkbox v-model="formItem.onlineContactIsSecretariat">网上联系人是否秘书台人员</Checkbox>
            </Form-item>
          </i-col>
          <i-col :sm="{span: 24}" :md="{span: 20}" :lg="{span: 10}">
            <Form-item label="网上联系人：">
              <Input v-model="formItem.onlineContact" placeholder="请输入"/>
            </Form-item>
          </i-col>
        </Row>
        <Row type="flex" justify="start">
          <i-col :sm="{span: 24}" :md="{span: 20}" :lg="{span: 10}">
            <Form-item >
              <Checkbox v-model="formItem.businessLicence">营业执照复印件或三证合一复印件</Checkbox>
            </Form-item>
          </i-col>
          <i-col :sm="{span: 24}" :md="{span: 20}" :lg="{span: 10}">
            <Form-item >
              <Checkbox v-model="formItem.organizationCode">机构代码证复印件</Checkbox>
            </Form-item>
          </i-col>
          <i-col :sm="{span: 24}" :md="{span: 20}" :lg="{span: 10}">
            <Form-item >
              <Checkbox v-model="formItem.foreignBusinessApprovalCertificate">外商企业批准证书复印件</Checkbox>
            </Form-item>
          </i-col>
          <i-col :sm="{span: 24}" :md="{span: 20}" :lg="{span: 10}">
            <Form-item >
              <Checkbox v-model="formItem.businessRenameNotice">工商局企业更名通知复印件</Checkbox>
            </Form-item>
          </i-col>
          <i-col :sm="{span: 24}" :md="{span: 20}" :lg="{span: 10}">
            <Form-item label="特殊情况备注：">
              <Input v-model="formItem.specialMaterialRemark" placeholder="请输入" type="textarea"/>
            </Form-item>
          </i-col>
        </Row>
        <Row type="flex" justify="start" class="tr">
          <i-col :sm="{span: 24}">
            <Button type="primary" @click="save" class="ml10">保存</Button>
            <Button type="warning" @click="back" class="ml10">取消</Button>
          </i-col>
        </Row>
      </Form>
    </Card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Tools from "../../../lib/tools";
import Decode from "../../../lib/decode";
import ajax from "../../../lib/ajax";
const AJAX = ajax.ajaxCM;
const host = process.env.SITE_HOST;
export default {
  data() {
    return {
      title: "",
      highlight: true,
      companyId: "",
      credentialsType: "",
      orgPoilcys: [{}],
      formItem: {
        companyExtId: "",
        companyId: "",
        credentialsType: null,
        name: "",
        operateType: null,
        operateAccount: "",
        operatePwd: "",
        chargeType: null,
        payType: null,
        specialChargeRemark: "",
        introduceMail: "",
        onlineContactIdCard: "",
        onlineContactIsSecretariat: "",
        onlineContact: "",
        businessLicence: "",
        organizationCode: "",
        foreignBusinessApprovalCertificate: "",
        businessRenameNotice: "",
        specialMaterialRemark: "",
        orgPolicyId: ""
      },
      colums: [
        {
          title: "证件类型",
          key: "lab"
        },
        {
          title: "办理机构",
          key: "name"
        },
        {
          title: "操作账号",
          key: "operateAccount"
        },
        {
          title: "操作方式",
          key: "operateTypeN"
        },
        {
          title: "费用类型",
          key: "chargeTypeN"
        },
        {
          title: "支付方式",
          key: "payTypeN"
        },
        {
          title: "特殊收费备注",
          key: "specialChargeRemark"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {}
                  }
                },
                "编辑"
              )
            ]);
          }
        }
      ],
      data1: []
    };
  },
  created() {
    this.find();

  },
  methods: {
    find() {
      let companyCode = this.$route.query.data;
      AJAX.get(host + "/api/companyExt/find/" + companyCode).then(response => {
        let t = response.data.data;
        let labs = [
          { lab: "积分办理", credentialsType: 1, companyId: companyCode ,_highlight: true},
          { lab: "居住证B证", credentialsType: 2, companyId: companyCode },
          { lab: "留学生落户", credentialsType: 3, companyId: companyCode },
          { lab: "居转户", credentialsType: 4, companyId: companyCode },
          { lab: "夫妻分居", credentialsType: 5, companyId: companyCode },
          { lab: "人才引进", credentialsType: 6, companyId: companyCode }
        ];
        for (let x in t) {
          for (let y in labs) {
            if (t[x].credentialsType === labs[y].credentialsType) {
              labs[y] = t[x];
            }
          }
        }

        this.data1 = labs;
        this.formItem = labs[0];
        this.selectedRow(this.formItem)
      });
    },
    save() {
      this.formItem.companyId = this.companyId;
      this.formItem.credentialsType = this.credentialsType;
      if (
        this.formItem.credentialsType != null &&
        this.formItem.credentialsType != ""
      ) {
        AJAX
          .postJSON(host + "/api/companyExt/saveOrUpdate", this.formItem)
          .then(response => {
            if (response.data.errCode === "0") {
              this.$Notice.success({
                title: "保存成功",
                desc: ""
              });
              this.find();
            } else {
              this.$Notice.error({
                title: "保存失败",
                desc: ""
              });
            }
          })
          .catch(error => {
            this.$Notice.error({
              title: "保存失败",
              desc: ""
            });
          });
      } else {
        this.$Notice.error({
          title: "请先选择证件类型",
          desc: ""
        });
      }
    },
    back() {
      this.$router.go(-1);
    },
    selectedRow(value) {
      if (value !== null) {
        this.formItem = value;
        this.credentialsType = value.credentialsType;
        this.companyId = value.companyId;
        this.title = value.lab;
        AJAX.get(host + "/api/orgPolicy/getByType?type="+value.credentialsType).then(response => {
          this.orgPoilcys = response.data.data;
        });
      }
    },
    orgChange(option) {
      if(option.label!==''){
        this.formItem.name = option.label;
      }
    }
  }
};
</script>

<style scoped>
.ivu-card-head p,
.ivu-card-head-inner {
  font-size: 20px;
}
.ivu-input {
  background-color: #fff;
}
</style>
