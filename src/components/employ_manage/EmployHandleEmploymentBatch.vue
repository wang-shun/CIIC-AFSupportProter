<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        用工办理
        <div slot="content">
          <Form :label-width="100">
            <Row type="flex" justify="start">
              
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="实际录用日期：">
                  <DatePicker v-model="employmentInfo.employDate" @on-open-change="setCurrentDate1" @on-change="changeDate1" type="date" placeholder="" transfer></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="开F单日期：">
                  <DatePicker v-model="employmentInfo.openAfDate" @on-open-change="setCurrentDate2" @on-change="changeDate2" type="date"  placeholder="" transfer></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="用工形式：">
                  <Select v-model="employmentInfo.employStyle" transfer>
                    <Option v-for="item in employmentFormList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
             
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="办理类型：">
                  <Select v-model="employmentInfo.handleType"  transfer>
                    <Option v-for="item in handleTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="用工属性：">
                  <Select v-model="employmentInfo.employProperty" transfer>
                    <Option v-for="item in employmentPropertyList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="用工方式：">
                  <Select v-model="employmentInfo.employWay" transfer>
                    <Option v-for="item in employmentMethodList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
             
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                 <Form-item label="用工备注：" >
                  <Input placeholder="请输入" :maxlength="50" v-model="employmentInfo.remarkContent"/>
                 </Form-item>
              </Col>
             
            </Row>
          <Row type="flex" justify="start">
            <Col :sm="{span: 24}" class="tr">
              <Button type="primary"  :loading="isLoadingC"   @click="instanceEmployment()"  >保存</Button>
            </Col>
          </Row>
          </Form>
        </div>
      </Panel>
      <Panel name="2">
        用工材料办理
        <div slot="content">
          <Form :model="materialHandleInfo" ref="materialHandleInfo" :label-width="100">
            <Row type="flex" justify="start">
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 6}">
              <Form-item label="预留档案类别：">
                <Select transfer @on-change="changeTypeYuliu" v-model="materialHandleInfo.yuliuDocType">
                  
                  <Option v-for="item in docTypeList" :value="item.docType" :key="item.docType">
                    {{item.docType}}
                  </Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 6}">
              <Form-item label="预留档案编号：" prop="yuliuDocNum">
                <Input placeholder="请输入" :maxlength="9" v-model="materialHandleInfo.yuliuDocNum"/>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 6}">
              <Form-item label="档案类别：">
                <Select transfer @on-change="changeTypeNumber" v-model="materialHandleInfo.docType">
                  
                    <Option v-for="item in yuliuDocTypeList" :value="item.docType" :key="item.docType">
                      {{item.docType}}
                  </Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 6}">
              <Form-item label="档案编号：" prop="docNum" transfer>
                <Input placeholder="请输入" :maxlength="9" v-model="materialHandleInfo.docNum"/>
              </Form-item>
              </Col>
             
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 12}">
              <Form-item label="存档地：" >
                <Select v-model="materialHandleInfo.archivePlace" transfer>
                  <Option v-for="item in filePlaceList" :value="item.value" :key="item.value">{{item.label}}</Option>
                </Select>
              </Form-item> 
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 12}">
              <Form-item label="存档地补充：" >
                <Input placeholder="请输入" :maxlength="50" v-model="materialHandleInfo.archivePlaceAdditional"/>
              </Form-item>
              </Col>
              
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 6}">
              <Form-item label="存档卡状态：" >
                <Select v-model="materialHandleInfo.archiveCardState" transfer>
                  <Option v-for="item in placeStateList" :value="item.value" :key="item.value">{{item.label}}</Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 6}">
              <Form-item label="档案号：" prop="docCode">
                <Input placeholder="请输入" :maxlength="50" v-model="materialHandleInfo.docCode"/>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 6}">
              <Form-item label="档案来源：" prop="docFrom">
                <Select  v-model="materialHandleInfo.docFrom" transfer>
                  <Option v-for="item in fileOriginList" :value="item.value" :key="item.value">{{item.label}}</Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 6}">
              <Form-item label="用工反馈：" prop="employFeedback">
                <Select  @on-change="changeType" transfer v-model="materialHandleInfo.employFeedback" >
                  <Option v-for="item in employFeedbackList" :value="item.value" :key="item.value">{{item.label}}
                  </Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 6}">
              <Form-item label="用工反馈操作日期：" prop="employFeedbackOptDate">
                <DatePicker type="date" transfer v-model="materialHandleInfo.employFeedbackOptDate" :readonly="true"></DatePicker>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span:6}">
              <Form-item label="调档反馈：" prop="diaodangFeedback">
                <Select @on-change="changeTypeDd" transfer v-model="materialHandleInfo.diaodangFeedback">
                  <Option v-for="item in transferFeedbackList" :value="item.value" :key="item.value">{{item.label}}
                  </Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 6}">
              <Form-item label="调档反馈操作日期：" prop="diaodangFeedbackOptDate">
                <DatePicker type="date" transfer v-model="materialHandleInfo.diaodangFeedbackOptDate" @on-open-change="setCurrentDate4" @on-change="changeDate4"></DatePicker>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 6}">
              <Form-item label="UKey外借日期：" prop="ukeyBorrowDate">
                <DatePicker type="date" transfer v-model="materialHandleInfo.ukeyBorrowDate" :readonly="true"></DatePicker>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 6}">
              <Form-item label="UKey返回日期：" prop="ukeyReturnDate">
                <DatePicker type="date" transfer v-model="materialHandleInfo.ukeyReturnDate" @on-open-change="setCurrentDate3" @on-change="changeDate3" ></DatePicker>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 6}">
              <Form-item label="户口号：" prop="hukouCode">
                <Input placeholder="请输入" :maxlength="50" v-model="materialHandleInfo.hukouCode"/>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 6}">
              <Form-item label="用工档案缴费至：" prop="employDocPaymentTo">
                <DatePicker type="date" transfer v-model="materialHandleInfo.employDocPaymentTo" @on-open-change="setCurrentDate6" @on-change="changeDate6"></DatePicker>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 6}">
              <Form-item label="入库日期：" prop="storageDate">
                <DatePicker type="date"  transfer v-model="materialHandleInfo.storageDate" @on-open-change="setCurrentDate7" @on-change="changeDate7"></DatePicker>
              </Form-item>
              </Col>
            
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="" prop="luyongHandleEnd">
                <Checkbox v-model="materialHandleInfo.luyongHandleEnd">录用处理结束</Checkbox>
              </Form-item>
              </Col>

              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                 <Form-item label="档案备注：" >
                  <Input placeholder="请输入" :maxlength="50" v-model="materialHandleInfo.remarkContent"/>
                 </Form-item>
              </Col>
            </Row>
            <Row type="flex" justify="start">
              <Col :sm="{span: 24}" class="tr">
              <Button type="primary"  :loading="isLoading"  @click="instance()" :disabled="materialHandleInfo.end" >批理办理</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>
  </div>
</template>
<script>
import api from "../../api/employ_manage/hire_operator";
import Utils from "../../lib/utils";
import Vue from "vue";

export default {
  props: {
    handleInfo: {
      type: Object
    },
    handleInfoMaterial: {
      type: Object
    }
  },
  data() {
    return {
      isLoading: false,
      isLoadingC: false,
      collapseInfo: [1, 2], //展开栏
      docTypeList: [],
      yuliuDocTypeList: [],
      employmentInfo: {
        employDate: ""
      },
      materialHandleInfo: {
        yuliuDocType: "",
        yuliuDocNum: "",
        docType: "",
        docNum: "",
        archivePlace: "",
        archivePlaceAdditional: "",
        archiveCardState: "",
        docCode: "",
        docFrom: "",
        employFeedback: "",
        employFeedbackOptDate: "",
        diaodangFeedback: "",
        diaodangFeedbackOptDate: "",
        ukeyBorrowDate: "",
        ukeyReturnDate: "",
        hukouCode: "",
        employDocPaymentTo: "",
        storageDate: "",
        employWay: "",
        employOperateMan: "",
        employmentId: "",
        end: false,
        empTaskIds: []
      },
      employeeBatchData: {
        empTaskIds: [],
        employWay: ""
      },
      employmentFormList: [
        { value: "", label: "" },
        { value: "1", label: "1" },
        { value: "2", label: "2" }
      ],
      handleTypeList: [
        { value: "", label: "" },
        { value: "外来从业人员", label: "外来从业人员" },
        { value: "居住证", label: "居住证" },
        { value: "调档", label: "调档" },
        { value: "属地管理", label: "属地管理" },
        { value: "市人才", label: "市人才" },
        { value: "梅园路", label: "梅园路" },
        { value: "商城路", label: "商城路" },
        { value: "漕虹路", label: "漕虹路" },
        { value: "区人才", label: "区人才" },
        { value: "高校", label: "高校" },
        { value: "经营者人才", label: "经营者人才" },
        { value: "厂长经理人才", label: "厂长经理人才" },
        { value: "农民工", label: "农民工" },
        { value: "退休", label: "退休" },
        { value: "协保", label: "协保" },
        { value: "退工不调档", label: "退工不调档" },
        { value: "用工不调档", label: "用工不调档" },
        { value: "其他", label: "其他" },
        { value: "非全日制", label: "非全日制" },
        { value: "中智", label: "中智" },
        { value: "徐职", label: "徐职" },
        { value: "公司自行保管", label: "公司自行保管" }
      ],
      placeStateList: [
        { value: "", label: "" },
        { value: "无", label: "无" },
        { value: "卡为复印件", label: "卡为复印件" }
      ],
      fileOriginList: [
        { value: "", label: "" },
        { value: "户口所在地调入", label: "户口所在地调入" },
        { value: "市区人才调入", label: "市区人才调入" },
        { value: "单位转出（包括邮寄）", label: "单位转出（包括邮寄）" },
        { value: "中智取", label: "中智取" },
        { value: "农业户口", label: "农业户口" },
        { value: "其他", label: "其他" }
      ],
      filePlaceList: [
        { value: "", label: "" },
        { value: "外来从业人员", label: "外来从业人员" },
        { value: "居住证", label: "居住证" },
        { value: "属地管理", label: "属地管理" },
        { value: "中智", label: "中智" },
        { value: "农村富裕劳动力", label: "农村富裕劳动力" },
        { value: "区人才", label: "区人才" },
        { value: "徐汇职介", label: "徐汇职介" },
        { value: "梅园路", label: "梅园路" },
        { value: "商城路", label: "商城路" },
        { value: "漕虹分部", label: "漕虹分部" },
        { value: "浦东大道", label: "浦东大道" },
        { value: "大柏树工作站", label: "大柏树工作站" },
        { value: "国际航运中心", label: "国际航运中心" },
        { value: "市人才", label: "市人才" },
        { value: "就业指导中心", label: "就业指导中心" },
        { value: "经营者人才", label: "经营者人才" },
        { value: "厂长经理人才", label: "厂长经理人才" },
        { value: "退休", label: "退休" },
        { value: "协保", label: "协保" },
        { value: "其他", label: "其他" },
        { value: "公司自行保理", label: "公司自行保理" },
        { value: "退工不调", label: "退工不调" },
        { value: "用工不调", label: "用工不调" },
        { value: "非全日制", label: "非全日制" },
        { value: "翻牌转下一条任务单", label: "翻牌转下一条任务单" }
      ],
      employmentPropertyList: [
        { value: "", label: "" },
        { value: "中智", label: "中智" },
        { value: "外包", label: "外包" },
        { value: "独立", label: "独立" }
      ],
      employFeedbackList: [
        { value: "", label: "" },
        { value: "3", label: "用工成功" },
        { value: "10", label: "用工已办查无档" },
        { value: "4", label: "用工失败" },
        { value: "11", label: "Ukey外借" },
        { value: "5", label: "前道要求撤销用工" },
        { value: "12", label: "用工成功,重复任务单" },
        { value: "13", label: "用工已办,前道已中止" }
      ],
      employmentMethodList: [
        { value: "", label: "" },
        { value: "Ukey有材料（k有）", label: "Ukey有材料（k有）" },
        { value: "Ukey无材料（k无）", label: "Ukey无材料（k无）" },
        { value: "柜面有材料（柜有）", label: "柜面有材料（柜有）" },
        { value: "柜面无材料（柜无）", label: "柜面无材料（柜无）" },
        { value: "转人员性质", label: "转人员性质" },
        { value: "送外区办", label: "送外区办" },
        { value: "修改信息", label: "修改信息" },
        { value: "翻牌", label: "翻牌" },
        { value: "集体转入,用工自办", label: "集体转入,用工自办" }
      ],
      transferFeedbackList: [
        { value: "", label: "" },
        { value: "已告知本人转档", label: "已告知本人转档" },
        { value: "无档自查", label: "无档自查" },
        { value: "浦东职介代管", label: "浦东职介代管" },
        { value: "黄浦职介代管", label: "黄浦职介代管" },
        { value: "长宁职介代管", label: "长宁职介代管" },
        { value: "静安职介代管", label: "静安职介代管" },
        { value: "普陀职介代管", label: "普陀职介代管" },
        { value: "虹口职介代管", label: "虹口职介代管" },
        { value: "金桥职介代管", label: "金桥职介代管" },
        { value: "徐汇职介代管", label: "徐汇职介代管" },
        { value: "档在高招办", label: "档在高招办" }
      ]
    };
  },

  mounted() {
    api.queryAmArchiveDocType().then(data => {
      if (data.code == 200) {
        this.docTypeList = data.data.docSeqList;
        this.yuliuDocTypeList = data.data.docSeqList2;
      } else {
        this.$Message.error("服务器异常" + data.message);
      }
    });
  },
  computed: {
    handle() {
      return this.handleInfo;
    }
  },
  methods: {
    resetForm(form) {
      this.$refs[form].resetFields();
      this.materialHandleInfo.luyongHandleEnd = false;
      this.materialHandleInfo.yuliuDocType = "";
      this.materialHandleInfo.docType = "";
    },
    changeTypeYuliu(val) {
      if (val == "") {
        Vue.set(this.materialHandleInfo, "yuliuDocNum", "");
        return;
      }
      this.queryDocSeqByDocType(val);
    },

    queryDocSeqByDocType(val) {
      api.queryDocSeqByDocType({ type: 1, docType: val }).then(data => {
        if (data.code == 200) {
          if (data.data.docBo.docSeq) {
            Vue.set(
              this.materialHandleInfo,
              "yuliuDocNum",
              parseInt(data.data.docBo.docSeq) + 1
            );
            this.materialHandleInfo.yuliuDocNum =
              parseInt(data.data.docBo.docSeq) + 1;
          } else {
            Vue.set(this.materialHandleInfo, "yuliuDocNum", "");
            this.materialHandleInfo.yuliuDocNum = "";
          }
        } else {
          this.$Message.error("服务器异常" + data.message);
        }
      });
    },

    changeTypeNumber(val) {
      if (val == "") {
        Vue.set(this.materialHandleInfo, "docNum", "");
        return;
      }
      this.queryDocSeqByDocType2(val);
    },

    queryDocSeqByDocType2(val) {
      api.queryDocSeqByDocType({ type: 2, docType: val }).then(data => {
        if (data.code == 200) {
          if (data.data.docBo.docSeq) {
            Vue.set(
              this.materialHandleInfo,
              "docNum",
              parseInt(data.data.docBo.docSeq) + 1
            );
            this.materialHandleInfo.docNum =
              parseInt(data.data.docBo.docSeq) + 1;
          } else {
            Vue.set(this.materialHandleInfo, "docNum", "");
            this.materialHandleInfo.docNum = "";
          }
        } else {
          this.$Message.error("服务器异常" + data.message);
        }
      });
    },
    instance() {
      var patrn = /^[0-9]*$/;
      if (
        !patrn.test(this.materialHandleInfo.yuliuDocNum) &&
        this.materialHandleInfo.yuliuDocNum != undefined
      ) {
        this.$Message.error("预留档案编号必须是数字！");
        return;
      }
      if (
        !patrn.test(this.materialHandleInfo.docNum) &&
        this.materialHandleInfo.docNum != undefined
      ) {
        this.$Message.error("档案编号必须是数字！");
        return;
      }
      if (this.materialHandleInfo.yuliuDocNum == 999999999) {
        this.$Message.error("预留档案编号已经是极限了，请联系管理员！");
        return;
      }
      if (this.materialHandleInfo.docNum == 999999999) {
        this.$Message.error("档案编号已经是极限了，请联系管理员！");
        return;
      }
      var fromData = this.$utils.clear(this.materialHandleInfo, "");

      fromData.isFrist = "0";
      if (this.materialHandleInfo.employFeedbackOptDate) {
        fromData.employFeedbackOptDate = this.$utils.formatDate(
          this.materialHandleInfo.employFeedbackOptDate,
          "YYYY-MM-DD"
        );
      }
      if (this.materialHandleInfo.diaodangFeedbackOptDate) {
        fromData.diaodangFeedbackOptDate = this.$utils.formatDate(
          this.materialHandleInfo.diaodangFeedbackOptDate,
          "YYYY-MM-DD"
        );
      }
      if (this.materialHandleInfo.ukeyBorrowDate) {
        fromData.ukeyBorrowDate = this.$utils.formatDate(
          this.materialHandleInfo.ukeyBorrowDate,
          "YYYY-MM-DD"
        );
      }
      if (this.materialHandleInfo.ukeyReturnDate) {
        fromData.ukeyReturnDate = this.$utils.formatDate(
          this.materialHandleInfo.ukeyReturnDate,
          "YYYY-MM-DD"
        );
      }
      if (this.materialHandleInfo.employDocPaymentTo) {
        fromData.employDocPaymentTo = this.$utils.formatDate(
          this.materialHandleInfo.employDocPaymentTo,
          "YYYY-MM-DD"
        );
      }
      if (this.materialHandleInfo.storageDate) {
        fromData.storageDate = this.$utils.formatDate(
          this.materialHandleInfo.storageDate,
          "YYYY-MM-DD"
        );
      }

      fromData.empTaskIds = this.$route.query.empTaskIds;
      this.isLoading = true;
      api.saveBatchEmploy(fromData).then(data => {
        if (data.data.code == 200) {
          if (data.data.data.remark) {
            this.$Message.error(data.data.data.remark);
          } else {
            this.materialHandleInfo.end = data.data.data.end;
            this.$Message.success("批量办理成功");
          }
        } else {
          this.$Message.error("保存失败！" + data.data.message);
        }

        this.isLoading = false;
      });
    },
    instanceEmployment() {
      var fromData = this.$utils.clear(this.employmentInfo, "");
      if (fromData.employDate) {
        fromData.employDate = this.$utils.formatDate(
          this.employmentInfo.employDate,
          "YYYY-MM-DD"
        );
      }
      if (fromData.openAfDate) {
        fromData.openAfDate = this.$utils.formatDate(
          this.employmentInfo.openAfDate,
          "YYYY-MM-DD"
        );
      }

      fromData.empTaskIds = this.$route.query.empTaskIds;
      this.isLoadingC = true;
      api.batchSaveEmployment(fromData).then(data => {
        if (data.code == 200) {
          if (data.data.message) {
            this.$Message.error(data.data.message);
          } else {
            this.$Message.success("办理成功");
          }
        } else {
          this.$Message.error("保存失败！" + data.data.message);
        }
        this.isLoadingC = false;
      });
    },
    defaultVaule() {
      var fromData = this.$utils.clear(this.handleInfo, "");
      if (fromData.employDate) {
        fromData.employDate = this.$utils.formatDate(
          this.handleInfo.employDate,
          "YYYY-MM-DD"
        );
      }
      if (fromData.openAfDate) {
        fromData.openAfDate = this.$utils.formatDate(
          this.handleInfo.openAfDate,
          "YYYY-MM-DD"
        );
      }
      api.getDefualtEmployBO(fromData).then(data => {
        if (data.data.firstInDate) {
          this.handleInfo.employDate = data.data.firstInDate;
        }

        if (data.data.openAfDate) {
          this.handleInfo.openAfDate = data.data.openAfDate;
        }

        if (data.data.employStyle) {
          this.handleInfo.employStyle = data.data.employStyle;
        }

        if (data.data.handleType) {
          this.handleInfo.handleType = data.data.handleType;
        }

        if (data.data.archivePlace) {
          this.handleInfoMaterial.archivePlace = data.data.archivePlace;
        }

        if (data.data.employProperty) {
          this.handleInfo.employProperty = data.data.employProperty;
        }
      });
    },
    handleChange(val) {
      if (this.handleInfoMaterial.defaultC == "0") {
      } else {
        var isf = false;
        if (val == "调档") {
          this.handleInfoMaterial.archivePlace = "空";
          isf = true;
        }
        if (val == "高校") {
          this.handleInfoMaterial.archivePlace = "就业指导中心";
          isf = true;
        }
        if (val == "经营者") {
          this.handleInfoMaterial.archivePlace = "经营者人才";
          isf = true;
        }
        if (val == "退工不调档") {
          this.handleInfoMaterial.archivePlace = "退工不调";
          isf = true;
        }
        if (val == "用工不调档") {
          this.handleInfoMaterial.archivePlace = "用工不调";
          isf = true;
        }
        if (val == "公司自行保管") {
          this.handleInfoMaterial.archivePlace = "公司自行保理";
          isf = true;
        }
        if (val == "漕虹路") {
          this.handleInfoMaterial.archivePlace = "漕虹分部";
          isf = true;
        }
        if (val == "农民工") {
          this.handleInfoMaterial.archivePlace = "农村富裕劳动力";
          isf = true;
        }
        if (val == "徐职") {
          this.handleInfoMaterial.archivePlace = "徐汇职介";
          isf = true;
        }
        if (isf == false) {
          this.handleInfoMaterial.archivePlace = val;
        }
      }
      this.handleInfoMaterial.defaultC = "1";
    },
    currentDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    changeType(val) {
      if (val == 11) {
        this.materialHandleInfo.ukeyBorrowDate = this.currentDate();
        this.materialHandleInfo.employFeedbackOptDate = this.currentDate();
      } else if (val != "" && val != undefined) {
        this.materialHandleInfo.employFeedbackOptDate = this.currentDate();
        this.materialHandleInfo.ukeyBorrowDate = "";
      } else {
        this.materialHandleInfo.ukeyBorrowDate = "";
        this.materialHandleInfo.employFeedbackOptDate = "";
      }
    },
    changeTypeDd(val) {
      this.materialHandleInfo.diaodangFeedbackOptDate = this.currentDate();
    },
    setCurrentDate1(e) {
      if (e) {
        if (
          this.employmentInfo.employDate == "" ||
          this.employmentInfo.employDate == undefined
        ) {
          this.employmentInfo.employDate = this.currentDate();
        }
      }
    },
    changeDate1(e) {
      this.employmentInfo.employDate = e;
    },
    setCurrentDate2(e) {
      if (e) {
        if (
          this.employmentInfo.openAfDate == "" ||
          this.employmentInfo.openAfDate == undefined
        ) {
          this.employmentInfo.openAfDate = this.currentDate();
        }
      }
    },
    changeDate2(e) {
      this.employmentInfo.openAfDate = e;
    },
    setCurrentDate3(e) {
      if (e) {
        if (
          this.materialHandleInfo.ukeyReturnDate == "" ||
          this.materialHandleInfo.ukeyReturnDate == undefined
        ) {
          this.materialHandleInfo.ukeyReturnDate = this.currentDate();
        }
      }
    },
    changeDate3(e) {
      this.materialHandleInfo.ukeyReturnDate = e;
    },
    setCurrentDate4(e) {
      if (e) {
        if (
          this.materialHandleInfo.diaodangFeedbackOptDate == "" ||
          this.materialHandleInfo.diaodangFeedbackOptDate == undefined
        ) {
          this.materialHandleInfo.diaodangFeedbackOptDate = this.currentDate();
        }
      }
    },
    changeDate4(e) {
      this.materialHandleInfo.diaodangFeedbackOptDate = e;
    },
    setCurrentDate5(e) {
      if (e) {
        if (
          this.materialHandleInfo.ukeyReturnDate == "" ||
          this.materialHandleInfo.ukeyReturnDate == undefined
        ) {
          this.materialHandleInfo.ukeyReturnDate = this.currentDate();
        }
      }
    },
    changeDate5(e) {
      this.materialHandleInfo.ukeyReturnDate = e;
    },
    setCurrentDate6(e) {
      if (e) {
        if (
          this.materialHandleInfo.employDocPaymentTo == "" ||
          this.materialHandleInfo.employDocPaymentTo == undefined
        ) {
          this.materialHandleInfo.employDocPaymentTo = this.currentDate();
        }
      }
    },
    changeDate6(e) {
      this.materialHandleInfo.employDocPaymentTo = e;
    },
    setCurrentDate7(e) {
      if (e) {
        if (
          this.materialHandleInfo.storageDate == "" ||
          this.materialHandleInfo.storageDate == undefined
        ) {
          this.materialHandleInfo.storageDate = this.currentDate();
        }
      }
    },
    changeDate7(e) {
      this.materialHandleInfo.storageDate = e;
    }
  }
};
</script>
