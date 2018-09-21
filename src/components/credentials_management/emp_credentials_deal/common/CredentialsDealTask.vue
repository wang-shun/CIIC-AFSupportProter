<template>
  <div>
    <Table border :columns="colums" :data="emp" @on-row-click="clickRow" :highlight-row="highlight"></Table>
    <Card>
       <Form ref="formItem" :model="formItem"  :label-width="120">
        <h3>办理与收费信息</h3>
        <Row type="flex" justify="start">
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <!--<Form-item label="办理机构：">-->
            <div style="margin-left: 50px">
              <span style="font-weight: bold;margin-bottom: 10px">办理机构：</span>
              <Poptip trigger="hover" placement="right" width="600" transfer>
                <h6>{{formItem.name}}</h6>
                <div slot="content">
                   <Table :columns="policyCol" :data="policyData"></Table>
                </div>
              </Poptip>
            </div>
            <!--</Form-item>-->
          </i-col>
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <!--<Form-item label="操作方式：">-->
            <div style="margin-left: 50px;margin-bottom: 10px">
              <span style="font-weight: bold">操作方式：</span>{{formItem.operateTypeN}}
            <!--</Form-item>-->
            </div>
          </i-col>
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <!--<Form-item label="支付方式：">-->
            <div style="margin-left: 50px;margin-bottom: 10px">
              <span style="font-weight: bold">支付方式：</span>{{formItem.payTypeN}}
            <!--</Form-item>-->
            </div>
          </i-col>
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <!--<Form-item label="操作账号：" prop="operateAccount">-->
            <div style="margin-left: 50px;margin-bottom: 10px">
            <span style="font-weight: bold">操作账号：</span>{{formItem.operateAccount}}
            <!--</Form-item>-->
            </div>
          </i-col>
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <!--<Form-item label="操作密码：">-->
            <div style="margin-left: 50px;margin-bottom: 10px">
              <span style="font-weight: bold">操作密码：</span>{{formItem.operatePwd}}
            <!--</Form-item>-->
            </div>
          </i-col>
        </Row>
        <h3>留存材料信息</h3>
        <Row type="flex" justify="start">
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <div style="margin-left: 50px">
              <Checkbox v-model="formItem.introduceMail" disabled>介绍信</Checkbox>
            </div>
          </i-col>
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <!--<Form-item>-->
            <div style="margin-left: 50px">
              <Checkbox v-model="formItem.onlineContactIdCard" disabled>网上联系人身份证复印件</Checkbox>
            <!--</Form-item>-->
            </div>
          </i-col>
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <!--<Form-item>-->
            <div style="margin-left: 50px">
              <Checkbox v-model="formItem.onlineContactIsSecretariat" disabled>网上联系人是否秘书台人员</Checkbox>
            <!--</Form-item>-->
            </div>
          </i-col>
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <!--<Form-item label="网上联系人：">-->
            <div style="margin-left: 50px">
              <span>网上联系人：</span><Input v-model="formItem.onlineContact"  style="width: 70%" disabled/>
            <!--</Form-item>-->
            </div>
          </i-col>
        </Row>
        <Row type="flex" justify="start">
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <!--<Form-item>-->
            <div style="margin-left: 50px">
              <Checkbox v-model="formItem.businessLicence" disabled>营业执照复印件或三证合一复印件</Checkbox>
            <!--</Form-item>-->
            </div>
          </i-col>
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <!--<Form-item>-->
            <div style="margin-left: 50px">
              <Checkbox v-model="formItem.organizationCode" disabled>机构代码证复印件</Checkbox>
            <!--</Form-item>-->
            </div>
          </i-col>
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <!--<Form-item >-->
            <div style="margin-left: 50px">
              <Checkbox v-model="formItem.foreignBusinessApprovalCertificate" disabled>外商企业批准证书复印件</Checkbox>
            <!--</Form-item>-->
            </div>
          </i-col>
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <!--<Form-item >-->
            <div style="margin-left: 50px">
              <Checkbox v-model="formItem.businessRenameNotice" disabled>工商局企业更名通知复印件</Checkbox>
            <!--</Form-item>-->
            </div>
          </i-col>
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <!--<Form-item label="特殊情况备注：">-->
            <div style="margin-left: 50px">
              <span>特殊情况备注：</span><Input v-model="formItem.specialMaterialRemark" style="width: 70%" type="textarea" disabled/>
            <!--</Form-item>-->
            </div>
          </i-col>
        </Row>
        <div class="create"></div>
        <h3>材料收缴</h3>
        <div v-if="formItem.credentialsType === 1 && formItem.credentialsDealType === 7">
          <CredentialsMaterial1 :meterials="meterials" @materialsInfo="childBack" ></CredentialsMaterial1>
        </div>
        <div v-if="formItem.credentialsType === 1 && formItem.credentialsDealType === 8">
          <CredentialsMaterial2 :meterials="meterials" @materialsInfo="childBack" ></CredentialsMaterial2>
        </div>
        <div v-if="formItem.credentialsType === 1 && formItem.credentialsDealType === 9">
          <CredentialsMaterial3 :meterials="meterials" @materialsInfo="childBack" ></CredentialsMaterial3>
        </div>
        <div v-if="formItem.credentialsType === 1 && formItem.credentialsDealType === 10">
          <CredentialsMaterial4 :meterials="meterials" @materialsInfo="childBack" ></CredentialsMaterial4>
        </div>
        <div v-if="formItem.credentialsType === 2 && formItem.credentialsDealType === 11">
          <CredentialsMaterial5 :meterials="meterials" @materialsInfo="childBack" ></CredentialsMaterial5>
        </div>
        <div v-if="formItem.credentialsType === 2 && formItem.credentialsDealType === 12">
          <CredentialsMaterial6 :meterials="meterials" @materialsInfo="childBack" ></CredentialsMaterial6>
        </div>
        <div v-if="formItem.credentialsType === 2 && formItem.credentialsDealType === 13">
          <CredentialsMaterial7 :meterials="meterials" @materialsInfo="childBack" ></CredentialsMaterial7>
        </div>
        <div v-if="formItem.credentialsType === 2 && formItem.credentialsDealType === 14">
          <CredentialsMaterial8 :meterials="meterials" @materialsInfo="childBack" ></CredentialsMaterial8>
        </div>
        <div v-if="formItem.credentialsType === 2 && formItem.credentialsDealType === 15">
          <CredentialsMaterial9 :meterials="meterials" @materialsInfo="childBack" ></CredentialsMaterial9>
        </div>
        <div v-if="formItem.credentialsType === 2 && formItem.credentialsDealType === 16">
          <CredentialsMaterial10 :meterials="meterials" @materialsInfo="childBack" ></CredentialsMaterial10>
        </div>
        <div v-if="formItem.credentialsType === 3">
          <CredentialsMaterial14 :meterials="meterials" @materialsInfo="childBack" ></CredentialsMaterial14>
        </div>
        <div v-if="formItem.credentialsType === 4">
          <CredentialsMaterial11 :meterials="meterials" @materialsInfo="childBack" ></CredentialsMaterial11>
        </div>
        <div v-if="formItem.credentialsType === 5">
          <CredentialsMaterial13 :meterials="meterials" @materialsInfo="childBack" ></CredentialsMaterial13>
        </div>
        <div v-if="formItem.credentialsType === 6">
          <CredentialsMaterial12 :meterials="meterials" @materialsInfo="childBack" ></CredentialsMaterial12>
        </div>
       </Form>
    </Card>
    <Modal v-model="taskFollow" title="任务跟进" @on-ok="ok" @on-cancel="cancel">
      <Form ref="formItem" :model="formItem"  :label-width="120">
        <Row >
          <i-col span="12">
            <Form-item label="跟进说明：" prop="name"  style="width:400px;">
              <Input v-model="followDescription" placeholder="请输入" type="textarea" :autosize="{minRows: 2,maxRows: 5}"/>
            </Form-item>
          </i-col>
        </Row>
        <h3>跟进历史</h3>
        <Table border :columns="columns2" :data="data2"></Table>
      </Form>
    </Modal>
  </div>
</template>

<script>
import CredentialsMaterial1 from "./CredentialsMaterial1";
import CredentialsMaterial2 from "./CredentialsMaterial2";
import CredentialsMaterial3 from "./CredentialsMaterial3";
import CredentialsMaterial4 from "./CredentialsMaterial4";
import CredentialsMaterial5 from "./CredentialsMaterial5";
import CredentialsMaterial6 from "./CredentialsMaterial6";
import CredentialsMaterial7 from "./CredentialsMaterial7";
import CredentialsMaterial8 from "./CredentialsMaterial8";
import CredentialsMaterial9 from "./CredentialsMaterial9";
import CredentialsMaterial10 from "./CredentialsMaterial10";
import CredentialsMaterial11 from "./CredentialsMaterial11";
import CredentialsMaterial12 from "./CredentialsMaterial12";
import CredentialsMaterial13 from "./CredentialsMaterial13";
import CredentialsMaterial14 from "./CredentialsMaterial14";
import ajax from "../../../../lib/ajax";
import axios from "axios";
import Tools from "../../../../lib/tools";
const host = process.env.SITE_HOST;
const AJAX = ajax.ajaxCM;
export default {
  components: {
    CredentialsMaterial1,
    CredentialsMaterial2,
    CredentialsMaterial3,
    CredentialsMaterial4,
    CredentialsMaterial5,
    CredentialsMaterial6,
    CredentialsMaterial7,
    CredentialsMaterial8,
    CredentialsMaterial9,
    CredentialsMaterial10,
    CredentialsMaterial11,
    CredentialsMaterial12,
    CredentialsMaterial13,
    CredentialsMaterial14
  },
  props: {
    emp: {
      type: Array,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      highlight: true,
      taskFollow: false,
      followDescription: "",
      taskId: "",
      materialsIds: "",
      meterials: {
        info: {},
        menu: null,
        comp: ""
      },
      rowdata: { money: null },
      policyData: [],
      formItem: {
        credentialsType: "",
        credentialsDealType: "",
        name: "",
        operateTypeN: "",
        operateAccount: "",
        operatePwd: "",
        chargeType: "",
        payType: "",
        payTypeN: "",
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
        taskId: ""
      },
      policyCol: [
        {
          title: "政策内容",
          width: 380,
          key: "policyDescription"
        },
        {
          title: "创建日期",
          width: 100,
          key: "createdTime"
        },
        {
          title: "创建人",
          width: 80,
          key: "createdBy"
        }
      ],
      colums: [
        {
          title: "雇员编号",
          key: "empCode"
        },
        {
          title: "雇员姓名",
          key: "empName"
        },
        {
          title: "客户编号",
          key: "companyCode"
        },
        {
          title: "客户名称",
          key: "companyName"
        },
        {
          title: "证件类型",
          key: "credentialsTypeN"
        },
        {
          title: "证件办理类型",
          key: "credentialsDealTypeN"
        },
        {
          title: "经办人",
          key: "createdBy"
        },
        {
          title: "办理时间",
          key: "createdTime"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 200,
          render: (h, params) => {
            if (params.row.action == null || params.row.action == "") {
              let arr = []
              arr.push(h(
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
                  },"编辑"))
                arr.push(h(
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
                      click: () => {
                        this.taskId = params.row.taskId;
                        this.taskFollowShow(params.row.taskId);
                      }
                    }
                  }, "跟进"))
                let st = new Date().getTime() - 24*60*60*1000;
                let cr = new Date(params.row.createdTime).getTime();
                if (params.row.implement === false && cr>st) {
                  arr.push(h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "警告",
                          content: "您真的要删除吗？",
                          okText: "删除",
                          onOk: () => {
                            this.delTask(params.row.taskId)
                          }
                        });
                      }
                    }
                  }, "删除"))
                }
              return h("div", arr)
            }
          }
        }
      ],
      data1: [],
      columns2: [
        {
          title: "跟进人",
          key: "createdBy"
        },
        {
          title: "跟进时间",
          key: "createdTime"
        },
        {
          title: "跟进说明",
          key: "followDescription"
        }
      ],
      data2: []
    };
  },
  watch: {
    emp: function(val, oldVal) {
      console.log("taskList");
      this.clickRow(val[0]);
    }
  },
  methods: {
    clickRow(value) {
      this.formItem.name = "";
      this.formItem.operateTypeN = "";
      this.formItem.chargeType = "";
      this.formItem.operateAccount = "";
      this.formItem.operatePwd = "";
      this.formItem.payType = "";
      this.formItem.payTypeN = "";
      this.formItem.specialChargeRemark = "";
      this.formItem.introduceMail = false;
      this.formItem.onlineContactIdCard = false;
      this.formItem.onlineContactIsSecretariat = false;
      this.formItem.onlineContact = "";
      this.formItem.businessLicence = false;
      this.formItem.organizationCode = false;
      this.formItem.foreignBusinessApprovalCertificate = false;
      this.formItem.businessRenameNotice = false;
      if (value !== null) {
        this.formItem.credentialsType = value.credentialsType;
        this.formItem.credentialsDealType = value.credentialsDealType;
        value.companyId = value.companyCode;
        this.rowdata = { ...value };
        // console.log(value);
        // console.log(value.money);
        console.log("click row")
        this.$emit("backRow", value);
        this.selectCompanyExt(value.credentialsType, value.companyCode);
        if (
          value.credentialsDealType != null &&
          value.credentialsDealType != ""
        ) {
          this.createMeterialsMenu(
            value.credentialsType.toString(),
            value.credentialsDealType.toString()
          );
        } else {
          this.createMeterialsMenu(value.credentialsType.toString(), "");
        }
        this.findMaterialMenu(value.taskId);
        this.findMaterials(value.taskId);
      }
    },
    selectPolicy(name, type) {
      var params = {};
      params.params = {};
      params.params.name = name;
      params.params.type = type;
      AJAX.get(host + "/api/orgPolicy/find", params).then(response => {
        this.policyData = response.data.data.records;
      });
    },
    findMaterialMenu(taskId) {
      AJAX.get(host + "/api/materials/findMenu/" + taskId).then(response => {
        if (response.data.errCode == "0") {
          this.meterials.comp = response.data.data.comp;
          this.meterials.marryStatus = response.data.data.marryStatus;
          this.meterials.hasFollower = response.data.data.hasFollower;
          this.meterials.familerMaterials = response.data.data.familerMaterials;
          this.meterials.applyAddrChange = response.data.data.applyAddrChange;
          this.meterials.addr = response.data.data.addr;
          this.meterials.followerType = response.data.data.followerType;
          this.meterials.follower = response.data.data.follower;
          this.meterials.hasChildFollow = response.data.data.hasChildFollow;
          this.meterials.hasSpouseFollow = response.data.data.hasSpouseFollow;
          this.meterials.hasShPerson = response.data.data.hasShPerson;
          this.meterials.married = response.data.data.married;
          this.meterials.jobMaterials = response.data.data.jobMaterials;
          this.meterials.hasGooder = response.data.data.hasGooder;
          this.meterials.educate = response.data.data.educate;
          this.meterials.followMaterials = response.data.data.followMaterials;
          this.meterials.notFollowMaterials =
            response.data.data.notFollowMaterials;
        }
      });
    },
    findMaterials(taskId) {
      AJAX.get(host + "/api/materials/find/" + taskId)
        .then(response => {
          if (response.data.errCode == "0") {
            this.meterials.info = response.data.data;
            // console.log("已选材料")
            // console.log(this.meterials.info)
          } else {
            this.meterials.info = "";
          }
        })
    },
    createMeterialsMenu(credentialsType, credentialsDealType) {
      AJAX.get(
        host +
          "/api/materials/create?credentialsType=" +
          credentialsType +
          "&credentialsDealType=" +
          credentialsDealType
      ).then(response => {
        if (response.data.errCode == "0") {
          this.meterials.menu = response.data.data;
          // console.log("材料模板")
          // console.log(this.meterials.menu)
        }
      });
    },
    taskFollowShow(taskId) {
      if (taskId != null) {
        AJAX.get(host + "/api/empCredentialsDeal/find/taskFollow/" + taskId)
          .then(response => {
            if (response.data.errCode == "0") {
              this.data2 = response.data.data;
              this.followDescription = "";
              this.taskFollow = true;
            } else {
              this.$Notice.error({
                title: "查询失败",
                desc: ""
              });
            }
          })
          .catch(error => {
            this.$Notice.error({
              title: "查询失败",
              desc: ""
            });
          });
      }
    },
    async selectCompanyExt(credentialsType, companyId) {
      await AJAX.get(
        host +
          "/api/empCredentialsDeal/find/companyExt/" +
          companyId +
          "/" +
          credentialsType
      ).then(response => {
        Object.assign(this.formItem, response.data.data);
      });
      this.$emit("companyExtData", this.formItem);
      this.selectPolicy(this.formItem.name, this.formItem.credentialsType);
    },
    ok() {
      if (this.followDescription != "" && this.followDescription != null) {
        var params = {};
        params.followDescription = this.followDescription;
        params.taskId = this.taskId;
        params.createdBy = "gu";
        AJAX.postJSON(
          host + "/api/empCredentialsDeal/saveOrUpdate/taskFollow",
          params
        )
          .then(response => {
            if (response.data.errCode === "0") {
              this.$Notice.success({
                title: "保存成功",
                desc: ""
              });
              this.modal1 = false;
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
      }
    },
    cancel() {},
    childBack(info) {
      this.materialsIds = info.materialsIds;
      this.rowdata.materialIds = this.materialsIds;
      this.rowdata.comp = info.comp;
      this.rowdata.marryStatus = info.marryStatus;
      this.rowdata.hasFollower = info.hasFollower;
      this.rowdata.familerMaterials = info.familerMaterials;
      this.rowdata.applyAddrChange = info.applyAddrChange;
      this.rowdata.addr = info.addr;
      this.rowdata.followerType = info.followerType;
      this.rowdata.follower = info.follower;
      this.rowdata.hasChildFollow = info.hasChildFollow;
      this.rowdata.hasSpouseFollow = info.hasSpouseFollow;
      this.rowdata.married = info.married;
      this.rowdata.jobMaterials = info.jobMaterials;
      this.rowdata.hasGooder = info.hasGooder;
      this.rowdata.hasShPerson = info.hasShPerson;
      this.rowdata.educate = info.educate;
      this.rowdata.followMaterials = info.followMaterials;
      this.rowdata.notFollowMaterials = info.notFollowMaterials;
      this.$emit("backRow", this.rowdata);
    },
    delTask(taskId) {
       AJAX.postJSON(
          host + "/api/empCredentialsDeal/del/" + taskId
        ).then(response => {
          if(response.data.success) {
            this.$Notice.success({
                title: "删除成功",
                desc: ""
              });
            window.location.reload();
          } else {
            this.$Notice.error({
                title: "删除失败",
                desc: ""
              });
          }
        })
    }
  }
};
</script>

<style scoped>
</style>
