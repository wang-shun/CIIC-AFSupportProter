<template>
  <div>
     <Collapse v-model="value1" >
      <Panel name="1">
        客户信息
        <Form :label-width="120" slot="content">
          <Row type="flex" justify="start">
            <i-col :sm="{span: 24}" :md="{span: 20}" :lg="{span: 10}">
              <Form-item label="客户编号：">
                {{companyCode}}
              </Form-item> 
            </i-col>
            <i-col :sm="{span: 24}" :md="{span: 20}" :lg="{span: 10}">
              <Form-item label="客户名称：">
                {{companyName}}
              </Form-item> 
            </i-col>
            <i-col :sm="{span: 24}" :md="{span: 20}" :lg="{span: 10}">
              <Form-item label="客户地址：">
                {{companyAddr}}
              </Form-item> 
            </i-col>
            <i-col :sm="{span: 24}" :md="{span: 20}" :lg="{span: 10}">
              <Form-item label="客户电话：">
                {{companyTel}}
              </Form-item> 
            </i-col>
          </Row>
        </Form>
      </Panel>
      <Panel name="2">
        雇员信息
        <Form :label-width="120" slot="content">
          <Row type="flex" justify="start">
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="雇员编号：">{{empCode}}</Form-item> 
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="雇员姓名：">{{empName}}</Form-item> 
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="证件号码：">{{idNum}}</Form-item> 
            </i-col>
            <!-- <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="学历：">{{education}}</Form-item> 
            </i-col> -->
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="婚姻状况：">{{marriage}}</Form-item> 
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="性别：">{{sex}}</Form-item> 
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="出生日期：">{{birthday}}</Form-item> 
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="联系地址：">{{address}}</Form-item> 
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="首次进入日期：">{{firstInTime}}</Form-item> 
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="合同开始日期：">{{contractStartTime}}</Form-item> 
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="合同结束日期：">{{contractEndTime}}</Form-item> 
            </i-col>
          </Row>
        </Form>
      </Panel>
      <Panel name="3">
        证件办理
         <div slot="content">
          <CredentialsDealInfo :emp="empInfo" @backRow="callBack"> </CredentialsDealInfo>
        </div>
      </Panel>
      <Panel name="4">
        基础操作
        <Form :model="formItem" :label-width="120" slot="content">
          <Row type="flex" justify="start">
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="学历：" prop="">
                <Input v-model="formItem.education" placeholder="请输入"/>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="材料退回时间：" prop="">
                <DatePicker v-model="formItem.materialBackTime" type="date" placeholder="请输入" style="width: 100%" transfer/>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="催交日期：" prop="">
                <DatePicker v-model="formItem.callsTime" type="date" placeholder="请输入" style="width: 100%" transfer/>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="申报日期：" prop="">
                <DatePicker v-model="formItem.applyTime" type="date" placeholder="请输入" style="width: 100%" transfer/>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="居住年限：" prop="">
                <Input v-model="formItem.liveAgeLimit" placeholder="请输入"/>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="调档函开出时间：" prop="">
                <DatePicker v-model="formItem.shiftLetterSendTime" type="date" placeholder="请输入" style="width: 100%" transfer/>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="人才退回时间：" prop="">
                <DatePicker v-model="formItem.talentBackTime" type="date" placeholder="请输入" style="width: 100%" transfer/>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="人才退回原因：" prop="">
                <Input v-model="formItem.talentBackReason" placeholder="请输入"/>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="办理日期：" prop="">
                <DatePicker v-model="formItem.dealTime" type="date" placeholder="请输入" style="width: 100%" transfer/>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="收费日期：" prop="">
                <DatePicker v-model="formItem.chargeTime" type="date" placeholder="请输入" style="width: 100%" transfer/>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="到档时间：" prop="">
                <DatePicker v-model="formItem.receiveFileTime" type="date" placeholder="请输入" style="width: 100%" transfer/>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="原件退回时间：" prop="">
                <DatePicker v-model="formItem.originalBackTime" type="date" placeholder="请输入" style="width: 100%" transfer/>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="原件退回原因：" prop="">
                <Input v-model="formItem.originalBackReason" placeholder="请输入"/>
              </Form-item>
            </i-col>
             <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="积分单打印日期：" prop="">
                <DatePicker v-model="formItem.integralBillPrintTime" type="date" placeholder="请输入" style="width: 100%" transfer/>
              </Form-item>
            </i-col>
             <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="收费金额：" prop="">
                <Input v-model="formItem.chargeAmount" placeholder="请输入"/>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="付款方式：" prop="payType" >
                <Select v-model="formItem.payType" transfer>
                  <Option value="1">台账</Option>
                  <Option value="2">现金</Option>
                  <Option value="3">转账</Option>
                  <Option value="4">POS机</Option>
                </Select>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="办证公司名称：" prop="">
                <Input v-model="formItem.permitCompanyName" placeholder="请输入"/>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="手机：" prop="">
                <Input v-model="formItem.telephone" placeholder="请输入"/>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="备注：" prop="">
                <Input v-model="formItem.remark" type="textarea" :autosize="{minRows: 3,maxRows: 6}" placeholder="请输入"/>
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
import axios from "axios";
const host = process.env.SITE_HOST;
const AJAX = ajax.ajaxCM;
export default {
  components: { CredentialsDealInfo },
  data() {
    return {
      value1: ["2", "3"],
      empInfo: [],
      companyCode: "",
      companyName: "",
      companyAddr: "",
      companyTel: "",
      empCode: "",
      empName: "",
      idNum: "",
      education: "",
      marriage: "",
      sex: "",
      birthday: "",
      address: "",
      firstInTime: "",
      contractStartTime: "",
      contractEndTime: "",
      credentialsType: "",
      credentialsDealType: "",
      basicProductId: "",
      templateType: "",
      formItem: {
        education: "",
        materialBackTime: "",
        callsTime: "",
        applyTime: "",
        liveAgeLimit: "",
        shiftLetterSendTime: "",
        talentBackTime: "",
        talentBackReason: "",
        dealTime: "",
        chargeTime: "",
        receiveFileTime: "",
        originalBackTime: "",
        originalBackReason: "",
        integralBillPrintTime: "",
        payType: "",
        chargeAmount: "",
        permitCompanyName: "",
        telephone: "",
        remark: "",
        materialIds: "",
        basicProductId: ""
      }
    };
  },
  mounted() {
    let data = this.$route.params.data;
    Tools.copy(data, this);
    this.companyCode = data.companyId;
    this.empCode = data.employeeId;
    this.empName = data.employeeName;
  },
  created() {
    this.findAll(this.$route.params.data.employeeId);
    this.findEmpDetial(this.$route.params.data);
    this.findCompanyDetial(this.$route.params.data.companyId);
  },
  computed: {},
  methods: {
    callBack(value) {
      if (value != null) {
        this.formItem = value;
        this.formItem.permitCompanyName = value.companyName;
      }
    },
    findCompanyDetial(companyId) {
      let params = {};
      params.params = {};
      params.params.companyId = companyId;
      AJAX
        .get(host + "/api/baseData/getCompanyInfo", params)
        .then(response => {
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
      let params = {};
      params = { ...this.formItem };
      if (
        params.materialBackTime !== undefined &&
        params.materialBackTime !== null
      ) {
        params.materialBackTime = Tools.formatDate(
          params.materialBackTime,
          "YYYY-MM-DD hh:mm"
        );
      }
      if (params.callsTime !== undefined && params.callsTime !== null) {
        params.callsTime = Tools.formatDate(
          params.callsTime,
          "YYYY-MM-DD hh:mm"
        );
      }
      if (params.applyTime !== undefined && params.applyTime !== null) {
        params.applyTime = Tools.formatDate(
          params.applyTime,
          "YYYY-MM-DD hh:mm"
        );
      }
      if (
        params.shiftLetterSendTime !== undefined &&
        params.shiftLetterSendTime !== null
      ) {
        params.shiftLetterSendTime = Tools.formatDate(
          params.shiftLetterSendTime,
          "YYYY-MM-DD hh:mm"
        );
      }
      if (
        params.talentBackTime !== undefined &&
        params.talentBackTime !== null
      ) {
        params.talentBackTime = Tools.formatDate(
          params.talentBackTime,
          "YYYY-MM-DD hh:mm"
        );
      }
      if (params.dealTime !== undefined && params.dealTime !== null) {
        params.dealTime = Tools.formatDate(params.dealTime, "YYYY-MM-DD hh:mm");
      }
      if (params.chargeTime !== undefined && params.chargeTime !== null) {
        params.chargeTime = Tools.formatDate(
          params.chargeTime,
          "YYYY-MM-DD hh:mm"
        );
      }
      if (
        params.receiveFileTime !== undefined &&
        params.receiveFileTime !== null
      ) {
        params.receiveFileTime = Tools.formatDate(
          params.receiveFileTime,
          "YYYY-MM-DD hh:mm"
        );
      }
      if (
        params.originalBackTime !== undefined &&
        params.originalBackTime !== null
      ) {
        params.originalBackTime = Tools.formatDate(
          params.originalBackTime,
          "YYYY-MM-DD hh:mm"
        );
      }
      if (
        params.integralBillPrintTime !== undefined &&
        params.integralBillPrintTime !== null
      ) {
        params.integralBillPrintTime = Tools.formatDate(
          params.integralBillPrintTime,
          "YYYY-MM-DD hh:mm"
        );
      }
      params.materialIds = params.materialIds;
      params.comp = params.comp;
      params.employeeId = params.empCode;
      params.companyId = params.companyCode;
      params.credentialsType = params.credentialsType;
      params.credentialsDealType = params.credentialsDealType;
      params.basicProductId =
        params.basicProductId == null
          ? this.$route.params.basicProductId
          : params.basicProductId;
      params.templateType = this.templateType;
      AJAX
        .postJSON(host + "/api/empCredentialsDeal/saveOrUpdate/task", params)
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
      AJAX
        .get(host + "/api/empCredentialsDeal/find/task/" + empCode)
        .then(response => {
          if (response.data.errCode === "0") {
            let data = response.data.data;
            for (let i in data) {
              data[i].empCode = this.empCode;
              data[i].empName = this.empName;
              data[i].companyCode = this.companyCode;
              data[i].companyName = this.companyName;
            }
            let temp = {};
            if (this.$route.params.isDeal == true) {
              let data1 = this.$route.params.data;
              temp.empCode = data1.employeeId;
              temp.empName = data1.employeeName;
              temp.companyCode = data1.companyId;
              temp.companyName = data1.companyName;
              temp.credentialsTypeN = this.$route.params.typeN;
              temp.credentialsType = this.$route.params.type;
              temp.companyId = this.$route.params.companyId;
              if (this.$route.params.dealType != "") {
                temp.credentialsDealType = this.$route.params.dealType;
                temp.credentialsDealTypeN = this.$route.params.dealTypeN;
              }
              temp.action = "1";
              response.data.data.splice(0, 0, temp);
            }
            this.empInfo = data;
          }
        });
    }
  }
};
</script>

<style scoped>

</style>
