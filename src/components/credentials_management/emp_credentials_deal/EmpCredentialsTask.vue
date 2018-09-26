<template>
  <div>
    <Collapse v-model="value1">
      <Panel name="1">
        客户信息
        <Form :label-width="120" slot="content">
          <Row type="flex" justify="start">
            <i-col :sm="{span: 24}" :md="{span: 20}" :lg="{span: 10}">
              <div style="margin-left: 50px">
                <span style="font-weight: bold">客户编号：</span>{{companyCode}}
              </div>
            </i-col>
            <i-col :sm="{span: 24}" :md="{span: 20}" :lg="{span: 10}">
              <!--<Form-item label="客户名称：">-->
              <div style="margin-left: 50px">
                <span style="font-weight: bold">客户名称：</span>{{companyName}}
              <!--</Form-item>-->
              </div>
            </i-col>
            <i-col :sm="{span: 24}" :md="{span: 20}" :lg="{span: 10}">
              <!--<Form-item label="客户地址：">-->
              <div style="margin-left: 50px;margin-top: 10px">
                <span style="font-weight: bold">客户地址：</span>{{companyAddr}}
              <!--</Form-item>-->
              </div>
            </i-col>
            <i-col :sm="{span: 24}" :md="{span: 20}" :lg="{span: 10}">
              <!--<Form-item label="客户电话：">-->
              <div style="margin-left: 50px;margin-top: 10px">
                <span style="font-weight: bold">客户电话：</span>{{companyTel}}
              <!--</Form-item>-->
              </div>
            </i-col>
          </Row>
        </Form>
      </Panel>
      <Panel name="2">
        雇员信息
        <Form :label-width="120" slot="content">
          <Row type="flex" justify="start">
            <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}">
              <!--<Form-item label="雇员编号：">{{empCode}}</Form-item>-->
              <div style="margin-left: 50px">
                <span style="font-weight: bold">雇员编号：</span>{{empCode}}
              </div>
            </i-col>
            <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}">
              <!--<Form-item label="雇员姓名：">{{empName}}</Form-item>-->
              <div style="margin-left: 50px">
                <span style="font-weight: bold">雇员姓名：</span>{{empName}}
              </div>
            </i-col>
            <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}">
              <!--<Form-item label="证件号码：">{{idNum}}</Form-item>-->
              <div style="margin-left: 50px">
                <span style="font-weight: bold">证件号码：</span>{{idNum}}
              </div>
            </i-col>
            <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}">
              <!--<Form-item label="人员性质：">{{templateName}}</Form-item>-->
              <div style="margin-left: 50px">
                <span style="font-weight: bold">人员性质：</span>{{templateName}}
              </div>
            </i-col>
            <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}">
              <!--<Form-item label="婚姻状况：">{{marriage}}</Form-item>-->
              <div style="margin-left: 50px;margin-top: 10px">
                <span style="font-weight: bold">婚姻状况：</span>{{marriage}}
              </div>
            </i-col>
            <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}">
              <!--<Form-item label="性别：">{{sex}}</Form-item>-->
              <div style="margin-left: 50px;margin-top: 10px">
                <span style="font-weight: bold">性别：</span>{{sex}}
              </div>
            </i-col>
            <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}">
              <!--<Form-item label="出生日期：">{{birthday}}</Form-item>-->
              <div style="margin-left: 50px;margin-top: 10px">
                <span style="font-weight: bold">出生日期：</span>{{birthday}}
              </div>
            </i-col>
            <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}">
              <!--<Form-item label="联系地址：">{{address}}</Form-item>-->
              <div style="margin-left: 50px;margin-top: 10px">
                <span style="font-weight: bold">联系地址：</span>{{address}}
              </div>
            </i-col>
            <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}">
              <!--<Form-item label="首次进入日期：">{{firstInTime}}</Form-item>-->
              <div style="margin-left: 50px;margin-top: 10px">
                <span style="font-weight: bold">首次进入日期：</span>{{firstInTime}}
              </div>
            </i-col>
            <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}">
              <!--<Form-item label="合同开始日期：">{{contractStartTime}}</Form-item>-->
              <div style="margin-left: 50px;margin-top: 10px">
                <span style="font-weight: bold">合同开始日期：</span>{{contractStartTime}}
              </div>
            </i-col>
            <i-col :sm="{span: 12}" :md="{span: 8}" :lg="{span: 5}">
              <!--<Form-item label="合同结束日期：">{{contractEndTime}}</Form-item>-->
              <div style="margin-left: 50px;margin-top: 10px;margin-bottom: 10px">
                <span style="font-weight: bold">合同结束日期：</span>{{contractEndTime}}
              </div>
            </i-col>
          </Row>
          <Table border :columns="ssColum" :data="ssData"></Table>
        </Form>
      </Panel>
      <Panel name="3">
        证件办理
        <div slot="content">
          <CredentialsDealInfo :emp="empInfo" @backRow="callBack"
                               @companyExtData="companyExtData"></CredentialsDealInfo>
        </div>
      </Panel>
      <Panel name="4">
        基础操作
        <Form :model="formItem" :label-width="120" slot="content">
          <Row type="flex" justify="start">
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="学历证书："  prop="qualification">
                <Select v-model="formItem.qualification"  :label="formItem.qualificationName" transfer>
                  <Option v-for="item in qualifications" :value="item.dicItemValue" :key="item.dicItemValue">
                    {{item.dicItemText}}
                  </Option>
                </Select>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="学位证书：" prop="degree">
                <Select v-model="formItem.degree" :label="formItem.degreeName" transfer>
                  <Option v-for="item in degrees" :value="item.dicItemValue" :key="item.dicItemValue">
                    {{item.dicItemText}}
                  </Option>
                </Select>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="学历认证通过时间："  educationTime>
                <DatePicker v-model="formItem.educationTime" type="date" placeholder="请输入" style="width: 100%"
                            transfer @on-open-change="loadCurrentDate('educationTime')"/>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="材料退回时间：" >
                <DatePicker v-model="formItem.materialBackTime" type="date" placeholder="请输入" style="width: 100%"
                            transfer @on-open-change="loadCurrentDate('materialBackTime')"/>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="催交日期：" >
                <DatePicker v-model="formItem.callsTime" type="date" placeholder="请输入" style="width: 100%" transfer @on-open-change="loadCurrentDate('callsTime')"/>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="申报日期：" >
                <DatePicker v-model="formItem.applyTime" type="date" placeholder="请输入" style="width: 100%" transfer @on-open-change="loadCurrentDate('applyTime')"/>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="居住证年限：" prop="liveAgeLimit">
                <InputNumber v-model="formItem.liveAgeLimit" placeholder="请输入" :min="0" :max="99" style="width: 100%"></InputNumber>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="调档函开出时间：" >
                <DatePicker v-model="formItem.shiftLetterSendTime" type="date" placeholder="请输入" style="width: 100%"
                            transfer @on-open-change="loadCurrentDate('shiftLetterSendTime')"/>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="人才退回时间：" >
                <DatePicker v-model="formItem.talentBackTime" type="date" placeholder="请输入" style="width: 100%"
                            transfer @on-open-change="loadCurrentDate('talentBackTime')"/>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="人才退回原因：" >
                <Input v-model="formItem.talentBackReason" placeholder="请输入"/>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="办理日期：" >
                <DatePicker v-model="formItem.dealTime" type="date" placeholder="请输入" style="width: 100%" transfer @on-open-change="loadCurrentDate('dealTime')"/>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="收费日期：" >
                <DatePicker v-model="formItem.chargeTime" type="date" placeholder="请输入" style="width: 100%" transfer @on-open-change="loadCurrentDate('chargeTime')"/>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="到档时间：" >
                <DatePicker v-model="formItem.receiveFileTime" type="date" placeholder="请输入" style="width: 100%"
                            transfer @on-open-change="loadCurrentDate('receiveFileTime')"/>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="原件退回时间：" >
                <DatePicker v-model="formItem.originalBackTime" type="date" placeholder="请输入" style="width: 100%"
                            transfer @on-open-change="loadCurrentDate('originalBackTime')"/>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="材料退回原因：" >
                <Input v-model="formItem.originalBackReason" placeholder="请输入"/>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="积分单打印日期：" prop="integralBillPrintTime">
                <DatePicker v-model="formItem.integralBillPrintTime" type="date" placeholder="请输入" style="width: 100%"
                            transfer @on-open-change="loadCurrentDate('integralBillPrintTime')"/>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="积分单通知日期：" prop="integralBillCallTime">
                <DatePicker v-model="formItem.integralBillCallTime" type="date" placeholder="请输入" style="width: 100%"
                            transfer @on-open-change="loadCurrentDate('integralBillCallTime')"/>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="雇员批复领取时间：" prop="empBackTime">
                <DatePicker v-model="formItem.empBackTime" type="date" placeholder="请输入" style="width: 100%" transfer @on-open-change="loadCurrentDate('empBackTime')"/>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="付款方式：" prop="payType">
                <Select v-model="formItem.payType" transfer>
                  <Option value="1" v-if="formItem.chargeType == 1 || formItem.chargeType == '' || formItem.chargeType == undefined">台账</Option>
                  <Option value="2" v-if="formItem.chargeType == 2 || formItem.chargeType == '' || formItem.chargeType == undefined">现金</Option>
                  <Option value="3" v-if="formItem.chargeType == 2 || formItem.chargeType == '' || formItem.chargeType == undefined">转账</Option>
                  <Option value="4" v-if="formItem.chargeType == 2 || formItem.chargeType == '' || formItem.chargeType == undefined">POS机</Option>
                </Select>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="收费金额：" prop="chargeAmount">
                <InputNumber v-model="formItem.chargeAmount" placeholder="请输入" :min="-99999" :max="99999" disabled style="width: 100%"/>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="人数：" prop="peopleNum">
                <InputNumber v-model="formItem.peopleNum" placeholder="请输入" :min="1" :max="100" style="width: 100%"/>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="办证公司名称：" prop="permitCompanyName">
                <Input v-model="formItem.permitCompanyName" disabled placeholder="请输入"/>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="手机：" prop="telephone">
                <Input v-model="formItem.telephone" placeholder="请输入"/>
              </Form-item>
            </i-col>
          </Row>
          <Row type="flex" justify="start">
            <i-col :sm="{span: 24}" :md="{span: 24}" :lg="{span: 24}">
              <Form-item label="备注：" prop="remark">
                <Input v-model="formItem.remark" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="请输入"/>
              </Form-item>
            </i-col>
          </Row>
        </Form>
      </Panel>
    </Collapse>
    <Row type="flex" justify="start" class="tr" style="margin-top:10px">
      <i-col :sm="{span: 24}">
        <Button type="primary" @click="save" class="ml10">保存</Button>
        <Button type="warning" @click="back" class="ml10">返回</Button>
      </i-col>
    </Row>
  </div>
</template>

<script>
import CredentialsDealInfo from "./common/CredentialsDealTask";
import Tools from "../../../lib/tools";
import Decode from "../../../lib/decode";
import ajax from "../../../lib/ajax";

const host = process.env.SITE_HOST;
const AJAX = ajax.ajaxCM;
export default {
  components: { CredentialsDealInfo },
  data() {
    return {
      value1: ["2", "3", "4"],
      empInfo: [],
      companyCode: "",
      companyName: "",
      companyAddr: "",
      companyTel: "",
      empCode: "",
      empName: "",
      idNum: "",
      marriage: "",
      sex: "",
      birthday: "",
      templateName: "",
      address: "",
      firstInTime: "",
      contractStartTime: "",
      contractEndTime: "",
      credentialsType: "",
      credentialsDealType: "",
      productId: "",
      templateType: "",
      qualifications: [],
      degrees: [],
      money: null,
      temp: {},
      ssColum: [
        {
          title: "工资基数",
          key: "baseAmount"
        },
        {
          title: "执行日期",
          key: "startMonth"
        },
        {
          title: "修改日期",
          key: "endMonth"
        },
        {
          title: "变更内容",
          key: "chgContent"
        }
      ],
      ssData: [],
      formItem: {
        qualification: "",
        qualificationName: "",
        degree: "",
        degreeName: "",
        educationTime: null,
        materialBackTime: null,
        callsTime: null,
        applyTime: null,
        liveAgeLimit: 1,
        shiftLetterSendTime: null,
        talentBackTime: null,
        talentBackReason: "",
        dealTime: null,
        chargeTime: null,
        receiveFileTime: null,
        originalBackTime: null,
        originalBackReason: "",
        integralBillPrintTime: null,
        integralBillCallTime: null,
        empBackTime: null,
        payType: "",
        chargeAmount: null,
        peopleNum: 1,
        permitCompanyName: "",
        telephone: "",
        remark: "",
        materialIds: "",
        productId: "",
        chargeType: ""
      }
    };
  },
  mounted() {
    const credentialsTaskData = JSON.parse(
      sessionStorage.getItem("credentialsTaskData")
    );
    let data = credentialsTaskData.data;
    Tools.copy(data, this);
    this.companyCode = data.companyId;
    this.empCode = data.employeeId;
    this.empName = data.employeeName;
    this.credentialsType = data.credentialsType;
    this.credentialsDealType = data.credentialsDealType;
    this.templateType = data.templateType;
  },
  created() {
    let credentialsTaskData = JSON.parse(
      sessionStorage.getItem("credentialsTaskData")
    );
    this.findAll(credentialsTaskData.data.employeeId);
    this.findEmpDetial(credentialsTaskData.data);
    this.findCompanyDetial(credentialsTaskData.data.companyId);
    this.getEmpBasePeriodInfo();
    this.loadDicItems();
  },
  methods: {
    loadCurrentDate(val) {
      if (this.formItem[val] == "" || this.formItem[val] == null) {
        this.formItem[val] = new Date();
      }
    },
    getEmpBasePeriodInfo() {
      let credentialsTaskData = JSON.parse(
        sessionStorage.getItem("credentialsTaskData")
      );
      let params = {};
      params.companyId = credentialsTaskData.data.companyId;
      params.employeeId = credentialsTaskData.data.employeeId;
      AJAX.postJSON(
        `${host}/api/empCredentialsDeal/getEmpBasePeriodInfo`,
        params
      ).then(response => {
        this.ssData = response.data.data;
      });
    },
    async loadDicItems() {
      await AJAX.get(`${host}/api/baseData/dic/education`).then(response => {
        this.qualifications = response.data;
      });
      await AJAX.get(`${host}/api/baseData/dic/degree`).then(response => {
        this.degrees = response.data;
      });
    },
    callBack(value) {
      if (value != null) {
        this.credentialsType = value.credentialsType;
        this.credentialsDealType = value.credentialsDealType;
        this.formItem.action = value.action
        this.formItem.companyCode = value.companyCode
        this.formItem.companyId = value.companyId
        this.formItem.companyName = value.companyName
        this.formItem.credentialsType = value.credentialsType
        this.formItem.credentialsTypeN = value.credentialsTypeN
        this.formItem.credentialsDealType = value.credentialsDealType
        this.formItem.credentialsDealTypeN =  value.credentialsDealTypeN
        this.formItem.empCode = value.empCode
        this.formItem.empName = value.empName
        this.formItem.chargeAmount = this.money
        if (this.formItem.permitCompanyName == "") {
          this.formItem.permitCompanyName = value.companyName;
        }
      }
    },
    companyExtData(data) {
      if (data != null) {
        this.formItem.chargeType =
          data.payTypeN == "" ? "" : data.payTypeN == "员工自付" ? "2" : "1";
        if (this.formItem.chargeType == "1") {
          this.formItem.payType = "1";
        }
      }
    },
    findCompanyDetial(companyId) {
      let params = {};
      params.params = {};
      params.params.companyId = companyId;
      AJAX.get(host + "/api/baseData/getCompanyInfo", params).then(response => {
        if (response.data.errCode == "0") {
          this.companyCode = response.data.data.companyId;
          this.companyName = response.data.data.companyName;
          this.companyAddr = response.data.data.registeredAddress;
          this.companyTel = "";
        }
      });
    },
    findEmpDetial(employee) {
      let params = {};
      params.params = {};
      params.params.companyId = employee.companyId;
      params.params.employeeId = employee.employeeId;
      params.params.idCardType = employee.idCardType;
      params.params.idNum = employee.idNum;
      params.params.type = employee.type;
      AJAX.get(host + "/api/baseData/getEmpInfo", params).then(response => {
        if (response.data.errCode == "0") {
          let item = response.data.data;
          this.empCode = item.employeeId;
          this.empName = item.employeeName;
          this.idNum = item.idNum;
          this.education = "";
          this.templateName =
            this.templateType == 1
              ? "派遣"
              : this.templateType == 2
                ? "代理"
                : this.templateType == 3 ? "外包" : "单项雇员";
          this.marriage =
            item.marriageStatus == 1
              ? "未婚"
              : item.marriageStatus == 2
                ? "已婚"
                : item.marriageStatus == 3 ? "离异" : "";
          this.sex = item.gender == 1 ? "男" : "女";
          this.birthday =
            item.birthday == null
              ? ""
              : Tools.formatDate(item.birthday, "YYYY年MM月DD日");
          this.address = item.address;
          this.firstInTime =
            item.firstInDate == null
              ? ""
              : Tools.formatDate(item.firstInDate, "YYYY年MM月DD日");
          this.contractStartTime =
            item.laborStartDate == null
              ? ""
              : Tools.formatDate(item.laborStartDate, "YYYY年MM月DD日");
          this.contractEndTime =
            item.laborEndDate == null
              ? ""
              : Tools.formatDate(item.laborEndDate, "YYYY年MM月DD日");
        }
      });
    },
    save() {
      let credentialsTaskData = JSON.parse(
        sessionStorage.getItem("credentialsTaskData")
      );
      let params = {};
      params = { ...this.formItem };

      if (
        !this._.isNil(params.integralBillCallTime) &&
        params.integralBillCallTime != ""
      ) {
        params.integralBillCallTime = Tools.formatDate(
          params.integralBillCallTime,
          "YYYY-MM-DD hh:mm"
        );
      }
      if (!this._.isNil(params.empBackTime) && params.empBackTime != "") {
        params.empBackTime = Tools.formatDate(
          params.empBackTime,
          "YYYY-MM-DD hh:mm"
        );
      }
      if (!this._.isNil(params.educationTime) && params.educationTime != "") {
        params.educationTime = Tools.formatDate(
          params.educationTime,
          "YYYY-MM-DD hh:mm"
        );
      }
      if (
        !this._.isNil(params.materialBackTime) &&
        params.materialBackTime != ""
      ) {
        params.materialBackTime = Tools.formatDate(
          params.materialBackTime,
          "YYYY-MM-DD hh:mm"
        );
      }
      if (!this._.isNil(params.callsTime) && params.callsTime != "") {
        params.callsTime = Tools.formatDate(
          params.callsTime,
          "YYYY-MM-DD hh:mm"
        );
      }
      if (!this._.isNil(params.applyTime) && params.applyTime != "") {
        params.applyTime = Tools.formatDate(
          params.applyTime,
          "YYYY-MM-DD hh:mm"
        );
      }
      if (
        !this._.isNil(params.shiftLetterSendTime) &&
        params.shiftLetterSendTime != ""
      ) {
        params.shiftLetterSendTime = Tools.formatDate(
          params.shiftLetterSendTime,
          "YYYY-MM-DD hh:mm"
        );
      }
      if (!this._.isNil(params.talentBackTime) && params.talentBackTime != "") {
        params.talentBackTime = Tools.formatDate(
          params.talentBackTime,
          "YYYY-MM-DD hh:mm"
        );
      }
      if (!this._.isNil(params.dealTime) && params.dealTime != "") {
        params.dealTime = Tools.formatDate(params.dealTime, "YYYY-MM-DD hh:mm");
      }
      if (!this._.isNil(params.chargeTime) && params.chargeTime != "") {
        params.chargeTime = Tools.formatDate(
          params.chargeTime,
          "YYYY-MM-DD hh:mm"
        );
      }
      if (
        !this._.isNil(params.receiveFileTime) &&
        params.receiveFileTime != ""
      ) {
        params.receiveFileTime = Tools.formatDate(
          params.receiveFileTime,
          "YYYY-MM-DD hh:mm"
        );
      }
      if (
        !this._.isNil(params.originalBackTime) &&
        params.originalBackTime != ""
      ) {
        params.originalBackTime = Tools.formatDate(
          params.originalBackTime,
          "YYYY-MM-DD hh:mm"
        );
      }
      if (
        !this._.isNil(params.integralBillPrintTime) &&
        params.integralBillPrintTime != ""
      ) {
        params.integralBillPrintTime = Tools.formatDate(
          params.integralBillPrintTime,
          "YYYY-MM-DD hh:mm"
        );
      }
      params.employeeId = params.empCode;
      params.companyId = params.companyCode;
      params.templateType = this.templateType;
      params.productId = credentialsTaskData.productId;
      params.basicProductId = credentialsTaskData.basicProductId;
      params.credentialsDealType = this.credentialsDealType;
      params.credentialsType = this.credentialsType;
      AJAX.postJSON(host + "/api/empCredentialsDeal/saveOrUpdate/task", params)
        .then(response => {
          if (response.data.errCode === "0") {
            this.$Modal.confirm({
              title: "保存成功",
              cancelText: "返回前页",
              onCancel: () => {
                this.$router.push("/emp_credentials_deal/emp_list");
              },
              okText: "留在本页",
              onOk: () => {
                this.$Notice.success({
                  title: "保存成功",
                  desc: ""
                });
                let credentialsTaskData = JSON.parse(
                  sessionStorage.getItem("credentialsTaskData")
                );
                sessionStorage.removeItem("credentialsTaskData");
                credentialsTaskData.isDeal = false;
                sessionStorage.setItem(
                  "credentialsTaskData",
                  JSON.stringify(credentialsTaskData)
                );
                this.findAll(this.empCode);
              }
            });
          } else {
            this.$Notice.error({
              title: "保存失败",
              desc: response.data.message
            });
          }
        })
        .catch(error => {
          this.$Notice.error({
            title: "保存失败",
            desc: "系统繁忙"
          });
        });
    },
    back() {
      this.$router.go(-1);
    },
    findAll(empCode) {
      let credentialsTaskData = JSON.parse(
        sessionStorage.getItem("credentialsTaskData")
      );
      if (credentialsTaskData.isDeal == true) {
        let data1 = credentialsTaskData.data;
        this.temp.empCode = data1.employeeId;
        this.temp.empName = data1.employeeName;
        this.temp.companyCode = data1.companyId;
        this.temp.companyName = data1.companyName;
        this.temp.credentialsTypeN = credentialsTaskData.typeN;
        this.temp.credentialsType = credentialsTaskData.type;
        this.temp.companyId = credentialsTaskData.companyId;
        if (credentialsTaskData.dealType != "") {
          this.temp.credentialsDealType = credentialsTaskData.dealType;
          this.temp.credentialsDealTypeN = credentialsTaskData.dealTypeN;
        }
        this.temp.action = "1";
        this.findPrice(
          data1.companyId,
          credentialsTaskData.type,
          credentialsTaskData.dealType
        );
      }
      AJAX.get(host + "/api/empCredentialsDeal/find/task/" + empCode).then(
        response => {
          if (response.data.errCode === "0") {
            let data = response.data.data;
            for (let i in data) {
              data[i].empCode = this.empCode;
              data[i].empName = this.empName;
              data[i].companyCode = this.companyCode;
              data[i].companyName = this.companyName;
            }
            let credentialsTaskData = JSON.parse(
              sessionStorage.getItem("credentialsTaskData")
            );
            if (credentialsTaskData.isDeal == true) {
              data.splice(0, 0, this.temp);
            }
            data[0]._highlight = true;
            this.empInfo = data;
          }
        }
      );
    },
    async findPrice(companyId, type, dealType) {
      await AJAX.get(
        host +
          "/api/empCredentialsDeal/getProductPrice?companyId=" +
          companyId +
          "&taskType=" +
          type +
          "&taskDealType=" +
          dealType
      ).then(response => {
        if (response.data.success) {
          this.money = response.data.data.money;
          this.temp.money = response.data.data.money;
          this.formItem.chargeAmount = this.money
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
