<template>
<div class="smList">
<Collapse v-model="collapseInfo">
<Panel name="1">
  档案预增管理 {{$route.query.archiveAdvanceId == 0 ? "新增" : "修改"}}
  <div slot="content">
  <Form :label-width=150 ref="advanceFile" :model="advanceFile">
    <Row type="flex" justify="start">
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="预留档案类型：">
          <Select transfer @on-change="changeTypeYuliu" v-model="advanceFile.reservedArchiveType">
            <Option value="" key="">空</Option>
              <Option v-for="item in docTypeList" :value="item.value" :key="item.value">
                {{item.label}}
              </Option>
          </Select>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
      <Form-item label="预留档案编号：">
        <Input  placeholder="请输入..." v-model="advanceFile.reservedArchiveNo" :maxlength="9" ></Input>
      </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="雇员姓名：">
          <Input placeholder="请输入..." v-model="advanceFile.employeeName"></Input>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="身份证号：">
          <Input placeholder="请输入..." v-model="advanceFile.employeeIdcardNo" :maxlength="18"></Input>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="入库日期：">
          <DatePicker  type='date' placement="bottom-end" placeholder="选择日期" :readonly="true" v-model="advanceFile.enteringDate"  style="width: 100%;" transfer></DatePicker>
        </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="档案来源：">
            <Select style="width: 100%;" transfer v-model="advanceFile.archiveSource">
              <Option v-for="item in fileOriginList" :value="item.value" :key="item.value" >{{item.label}}</Option>
            </Select>
          </Form-item>
      </Col>
       <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="存档地：">
            <Select style="width: 100%;" transfer v-model="advanceFile.archivePlace">
              <Option v-for="item in filePlaceList" :value="item.value" :key="item.value" >{{item.label}}</Option>
            </Select>
          </Form-item>
      </Col>
      <Col span="16">
      <Form-item label="备注：" prop="remark">
        <Input v-model="advanceFile.remark" placeholder="请输入..."></Input>
      </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="退回寄出地日期：">
          <DatePicker  type='date' placement="bottom-end" v-model="advanceFile.exitThePlaceDate" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" v-if="$route.query.createdBy!=''&&$route.query.createdBy!=undefined">
        <Form-item label="操作人：">
          <label>{{$route.query.createdBy}}</label>
        </Form-item>
      </Col>
    </Row>
    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <Button type="primary" @click="doSave" :disabled="this.isDisable">保存</Button>
        <Button type="warning" @click="goBack">返回</Button>
      </Col>
    </Row>
  </Form>
  </div>
  </Panel>
</Collapse>
</div>
</template>
<script>
import Utils from "../../lib/utils";
import api from "../../api/employ_manage/hire_operator";
import Vue from "vue";
export default {
  data() {
    return {
      collapseInfo: [1], //展开栏
      docTypeList: [{ value: "Cc", label: "Cc" }],
      oldName: [],
      oldId: [],
      isOne: true,
      oldType: "",
      oldNumber: "",
      isDisable: false,
      advanceFile: {
        archiveAdvanceId: "",
        reservedArchiveType: "",
        reservedArchiveNo: "",
        employeeName: "",
        employeeIdcardNo: "",
        enteringDate: "",
        archiveSource: "",
        archivePlace: "",
        exist: true,
        remark: "",
        exitThePlaceDate: ""
      },
      payMethodList: [
        { value: "1", label: "客户自付" },
        { value: "2", label: "我司付款(客户预付)" },
        { value: "3", label: "垫付" }
      ],
      filePlaceList: [
        { value: "", label: "空" },
        { value: "中智", label: "中智" },
        { value: "退回寄出地", label: "退回寄出地" },
        { value: "其它", label: "其它" }
      ],
      fileOriginList: [
        { value: "", label: "空" },
        { value: "户口所在地调入", label: "户口所在地调入" },
        { value: "市区人才调入", label: "市区人才调入" },
        { value: "单位转出（包括邮寄）", label: "单位转出（包括邮寄）" },
        { value: "中智取", label: "中智取" },
        { value: "农业户口", label: "农业户口" },
        { value: "其他", label: "其他" }
      ]
    };
  },
  mounted() {
    this.advanceFile.archiveAdvanceId = this.$route.query.archiveAdvanceId;
    this.advanceFile.reservedArchiveType = this.$route.query.reservedArchiveType;
    this.advanceFile.reservedArchiveNo = this.$route.query.reservedArchiveNo;
    this.advanceFile.employeeName = this.$route.query.employeeName;
    this.advanceFile.employeeIdcardNo = this.$route.query.employeeIdcardNo;
    this.advanceFile.enteringDate = this.$route.query.enteringDate;
    this.advanceFile.archiveSource = this.$route.query.archiveSource;
    this.advanceFile.archivePlace = this.$route.query.archivePlace;
    this.advanceFile.exitThePlaceDate = this.$route.query.exitThePlaceDate;
    this.advanceFile.remark = this.$route.query.remark;
    this.oldName = this.$route.query.employeeName;
    this.oldId = this.$route.query.employeeIdcardNo;
    this.oldType = this.$route.query.reservedArchiveType;
    this.oldNumber = this.$route.query.reservedArchiveNo;
    if (
      this.advanceFile.enteringDate == undefined ||
      this.advanceFile.enteringDate == ""
    ) {
      let d = new Date();
      this.advanceFile.enteringDate =
        d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    }
    // api.queryAmArchiveDocType().then(data => {
    //     if (data.code == 200) {
    //this.docTypeList = data.data.docSeqList;
    //   } else {
    //       this.$Message.error("服务器异常" + data.message);
    //   }
    // })
  },
  methods: {
    changeTypeYuliu(val) {
      if (
        this.isOne == true &&
        this.$route.query.reservedArchiveType != undefined
      ) {
        this.isOne = false;
        return;
      }
      if (val == "") {
        Vue.set(this.advanceFile, "reservedArchiveNo", "");
        return;
      }
      if (val == this.oldType) {
        Vue.set(this.advanceFile, "reservedArchiveNo", this.oldNumber);
        return;
      }
      this.queryDocSeqByDocType(val);
    },
    queryDocSeqByDocType(val) {
      api.queryDocSeqByDocType({ type: 1, docType: val }).then(data => {
        if (data.code == 200) {
          Vue.set(
            this.advanceFile,
            "reservedArchiveNo",
            parseInt(data.data.docBo.docSeq) + 1
          );
          this.advanceFile.reservedArchiveNo =
            parseInt(data.data.docBo.docSeq) + 1;
        } else {
          this.$Message.error("服务器异常" + data.message);
        }
      });
    },
    doSave() {
      this.isDisable = true;
      var patrn = /^[0-9]*$/;
      if (
        !patrn.test(this.advanceFile.reservedArchiveNo) &&
        this.advanceFile.reservedArchiveNo != undefined
      ) {
        this.$Message.error("档案编号必须是数字！");
        this.isDisable = false;
        return;
      }
      if (
        this.advanceFile.employeeName == "" ||
        this.advanceFile.employeeName == undefined
      ) {
        this.$Message.error("雇员姓名必须填写！");
        this.isDisable = false;
        return;
      }
      this.advanceFile.employeeName = this.advanceFile.employeeName.replace(/(^\s*)|(\s*$)/g, "");
      if (
        this.advanceFile.employeeIdcardNo == "" ||
        this.advanceFile.employeeIdcardNo == undefined
      ) {
        this.$Message.error("身份证必须填写！");
        this.isDisable = false;
        return;
      }
      var numberPatrn = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      if (!numberPatrn.test(this.advanceFile.employeeIdcardNo)) {
        this.$Message.error("不是有效的身份证！");
        this.isDisable = false;
        return;
      }
      if (this.advanceFile.reservedArchiveNo == 999999999) {
        this.$Message.error("档案编号已经是极限了，请联系管理员！");
        this.isDisable = false;
        return;
      }

      if (
        this.advanceFile.reservedArchiveType != "" &&
        this.advanceFile.reservedArchiveType != undefined
      ) {
        if (
          this.advanceFile.reservedArchiveNo == "" ||
          this.advanceFile.reservedArchiveNo == undefined
        ) {
          this.$Message.error("档案类别和档案编号是一个组合整体，必须都填写！");
          this.isDisable = false;
          return;
        }
      }
      if (
        this.advanceFile.reservedArchiveNo != "" &&
        this.advanceFile.reservedArchiveNo != undefined
      ) {
        if (
          this.advanceFile.reservedArchiveType == "" ||
          this.advanceFile.reservedArchiveType == undefined
        ) {
          this.$Message.error("档案类别和档案编号是一个组合整体，必须都填写！");
          this.isDisable = false;
          return;
        }
      }
      if (
        this.oldName == this.advanceFile.employeeName &&
        this.oldId == this.advanceFile.employeeIdcardNo
      ) {
        this.advanceFile.exist = false;
      }
      var fromData = this.$utils.clear(this.advanceFile, "");
      if (this.advanceFile.enteringDate) {
        fromData.enteringDate = this.$utils.formatDate(
          this.advanceFile.enteringDate,
          "YYYY-MM-DD"
        );
      }
      if (this.advanceFile.exitThePlaceDate) {
        fromData.exitThePlaceDate = this.$utils.formatDate(
          this.advanceFile.exitThePlaceDate,
          "YYYY-MM-DD"
        );
      }
      api.saveAmArchiveAdvance(fromData).then(data => {
        if (data.code == 200) {
          if (data.data == false) {
            this.$Message.error("雇员姓名和身份证号码同时存在，已有这个雇员！");
            this.isDisable = false;
            return;
          } else if (data.data == true) {
            this.$Message.success("保存成功");
            this.goBack();
          } else {
            if (confirm("该雇员已有档案,不能预增，是否直接跳转到档案办理？")) {
              this.$router.push({
                name: "recordComprehensive",
                query: {
                  idNum: data.data.idNum,
                  idCardType: data.data.idCardType,
                  empTaskId: data.data.empTaskId,
                  employmentId: data.data.employmentId,
                  employeeId: data.data.employeeId,
                  companyId: data.data.companyId,
                  empTaskResignId: data.data.empTaskResignId
                }
              });
              this.isDisable = false;
            } else {
              this.isDisable = false;
            }
          }
        } else {
          this.$Message.error("保存失败！" + data.message);
          this.isDisable = false;
        }
      });
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
