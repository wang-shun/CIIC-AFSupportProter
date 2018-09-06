<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        用工材料办理
        <div slot="content">
          <Form :model="materialHandleInfo" ref="materialHandleInfo" :label-width="100">
            <Row type="flex" justify="start">
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 6}">
              <Form-item label="预留档案类别：">
                <Select transfer @on-change="changeTypeYuliu" v-model="materialHandleInfo.yuliuDocType">
                  <Option value="" key="">空</Option>
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
                  <Option value="" key="">空</Option>
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
                <DatePicker type="date" transfer v-model="materialHandleInfo.employFeedbackOptDate" @on-open-change="setCurrentDate3" @on-change="changeDate3"></DatePicker>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 6}">
              <Form-item label="UKey外借日期：" prop="ukeyBorrowDate">
                <DatePicker type="date" transfer v-model="materialHandleInfo.ukeyBorrowDate"></DatePicker>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 6}">
              <Form-item label="UKey返回日期：" prop="ukeyReturnDate">
                <DatePicker type="date" transfer v-model="materialHandleInfo.ukeyReturnDate"  @on-open-change="setCurrentDate5" @on-change="changeDate5"></DatePicker>
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
              <Form-item label="补调档案日期1：">
                <DatePicker v-model="materialHandleInfo.budiaoDocDate1" type="date" placeholder="" transfer></DatePicker>
              </Form-item>
            </Col>
            <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="补调档案日期2：">
                <DatePicker v-model="materialHandleInfo.budiaoDocDate2" type="date" placeholder="" transfer></DatePicker>
              </Form-item>
            </Col>
            <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="" prop="luyongHandleEnd">
                <Checkbox v-model="materialHandleInfo.luyongHandleEnd">录用处理结束</Checkbox>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                 <Form-item label="档案备注：" >
                  <Input placeholder="请输入" :maxlength="50" v-model="materialHandleInfo.remark"/>
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
      <Panel name="2">
        退工档案信息
         <div slot="content">
      <Form :label-width="150">
       <Row type="flex" justify="start">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="出库日期：">
            <DatePicker v-model="stockAndMail.storageOutDate" type="date" placeholder="" @on-open-change="setCurrentDate" @on-change="changeDate" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="出库人：">
            <Input v-model="stockAndMail.storageOutMan" placeholder="请输入" :maxlength="50"/>
          </Form-item>
        </Col>
      </Row>
      <Row type="flex" justify="start" class="mt20">
        <Col :sm="{span: 24}" class="tr">
          <Button type="primary" @click="instanceEmployment()">保存</Button>
        </Col>
      </Row>
    </Form>
         </div>
      </Panel>
       <Panel name="3">
        退工档案信息
         <div slot="content">
              <Form :label-width="150">
      <Row type="flex" justify="start">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="" prop="post">
                <Checkbox v-model="mail.post">寄信</Checkbox>
              </Form-item>
              </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="实际寄信日期：">
            <DatePicker v-model="mail.postLetterDate" type="date" placeholder="" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="实际寄信人：">
            <Input v-model="mail.postLetterMan" placeholder="请输入" :maxlength="50"/>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 6}">
            <Form-item label="寄信方式：" prop="docFrom">
              <Select  v-model="mail.postWay" transfer>
                <Option v-for="item in postWayList" :value="item.value" :key="item.value">{{item.label}}</Option>
              </Select>
            </Form-item>
        </Col>
      </Row>
      <Row type="flex" justify="start" class="mt20">
        <Col :sm="{span: 24}" class="tr">
          <Button type="primary" @click="instancePost()">保存</Button>
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
import fileNotes from "./common/FileNotes.vue";

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
      collapseInfo: [1, 2,3], //展开栏
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
      stockAndMail: {
        storageOutDate:"",
        storageOutMan:""
      },
      mail: {
        postLetterDate:""
      },
      employeeBatchData: {
        empTaskIds: [],
        employWay: ""
      },
      employmentFormList: [
        { value: "1", label: "全日制" },
        { value: "2", label: "非全日制" }
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
        { value: "空", label: "空" },
        { value: "无", label: "无" },
        { value: "卡为复印件", label: "卡为复印件" }
      ],
      fileOriginList: [
        { value: "空", label: "空" },
        { value: "户口所在地调入", label: "户口所在地调入" },
        { value: "市区人才调入", label: "市区人才调入" },
        { value: "单位转出（包括邮寄）", label: "单位转出（包括邮寄）" },
        { value: "中智取", label: "中智取" },
        { value: "农业户口", label: "农业户口" },
        { value: "其他", label: "其他" }
      ],
      filePlaceList: [
        { value: "", label: "空" },
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
        { value: "空", label: "空" },
        { value: "中智", label: "中智" },
        { value: "外包", label: "外包" },
        { value: "独立", label: "独立" }
      ],
      employFeedbackList: [
        { value: "3", label: "用工成功" },
        { value: "10", label: "用工已办查无档" },
        { value: "4", label: "用工失败" },
        { value: "11", label: "Ukey外借" },
        { value: "5", label: "前道要求撤销用工" },
        { value: "12", label: "用工成功,重复任务单" },
        { value: "13", label: "用工已办,前道已中止" }
      ],
      employmentMethodList: [
        { value: "空", label: "空" },
        { value: "Ukey", label: "Ukey" },
        { value: "集体转入", label: "集体转入" },
        { value: "用工自办", label: "用工自办" },
        { value: "翻牌", label: "翻牌" },
        { value: "无材料用工", label: "无材料用工" },
        { value: "网办无材料", label: "网办无材料" },
        { value: "转人员性质", label: "转人员性质" },
        { value: "新进转人员性质", label: "新进转人员性质" },
        { value: "送外区办", label: "送外区办" },
        { value: "修改信息", label: "修改信息" },
        { value: "外来新进", label: "外来新进" },
        { value: "外来转入", label: "外来转入" }
      ],
      transferFeedbackList: [
        { value: "空", label: "空" },
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
      ],
      endTypeList: [
        { value: "合同终止", label: "合同终止", disabled: false },
        { value: "合同解除", label: "合同解除", disabled: false }
      ],
      personPropertyList: [
        { value: "空", label: "空" },
        { value: "上海户籍", label: "上海户籍" },
        { value: "居住证", label: "居住证" },
        { value: "外来从业人员", label: "外来从业人员" }
      ],
      refuseFileDirectionList: [
        { value: "户口所在地", label: "户口所在地", disabled: false },
        { value: "市区人才", label: "市区人才", disabled: false },
        { value: "徐汇", label: "徐汇", disabled: false },
        { value: "科技人才", label: "科技人才", disabled: false },
        { value: "暂存", label: "暂存", disabled: false },
        { value: "其他", label: "其他", disabled: false },
        { value: "转公司用工", label: "转公司用工", disabled: false }
      ],
      transferMethodList: [
        { value: "空", label: "空", disabled: false },
        { value: "职介所", label: "职介所", disabled: false },
        { value: "其他", label: "其他", disabled: false }
      ],
      transferNotesList: [
        { value: "空", label: "空", disabled: false },
        { value: "档案未退先退工", label: "档案未退先退工", disabled: false },
        { value: "徐职", label: "徐职", disabled: false },
        { value: "转公司", label: "转公司", disabled: false },
        { value: "转公司/暂存", label: "转公司/暂存", disabled: false },
        { value: "转户口转档", label: "转户口转档", disabled: false },
        {
          value: "无档,退工单自行归档",
          label: "无档,退工单自行归档",
          disabled: false
        },
        { value: "用工不调", label: "用工不调", disabled: false },
        { value: "退工不调档", label: "退工不调档", disabled: false },
        { value: "居住证", label: "居住证", disabled: false },
        {
          value: "用工不调,红联自归",
          label: "用工不调,红联自归",
          disabled: false
        },
        {
          value: "退工不调,红联自归",
          label: "退工不调,红联自归",
          disabled: false
        },
        { value: "属地管理", label: "属地管理" },
        { value: "农村富裕劳动力", label: "农村富裕劳动力", disabled: false },
        { value: "自开退工单", label: "自开退工单", disabled: false }
      ],
      refuseFeedbackList: [
        { value: "1", label: "退工任务单签收" },
        { value: "2", label: "档未到先退工" },
        { value: "3", label: "退工盖章未返回" },
        { value: "4", label: "退工失败" },
        { value: "5", label: "前道要求批退" },
        { value: "6", label: "撤销退工" },
        { value: "7", label: "等修改备案表" },
        { value: "8", label: "自开退工单,未交" },
        { value: "9", label: "用工已办未反馈" },
        { value: "10", label: "等翻牌联系单" },
        { value: "11", label: "退工Ukey外借" },
        { value: "12", label: "单项服务,原退工成功" },
        { value: "13", label: "转外地社保,原退工成功" },
        { value: "14", label: "转人员性质无需退工" },
        { value: "15", label: "退工成功,改社保" },
        { value: "16", label: "重复任务单" },
        { value: "17", label: "退工自办" }
      ],
      companyGroupTransferDirectionList: [
        { value: "空", label: "空" },
        { value: "公司自行管理", label: "公司自行管理" },
        { value: "外服", label: "外服" },
        { value: "四达", label: "四达" },
        { value: "北京外企", label: "北京外企" }
      ],
      LaborManualIsDeliverRefuserList: [
        { value: "0", label: "已交" },
        { value: "1", label: "未交" }
      ],
      postWayList: [
        { value: "", label: "" },
        { value: "EMS", label: "EMS" },
        { value: "阿姨件", label: "阿姨件" },
        { value: "当天件", label: "当天件" },
        { value: "前道客服", label: "前道客服" },
        { value: "雇员本人自取", label: "雇员本人自取"}
      ],
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
          Vue.set(
            this.materialHandleInfo,
            "yuliuDocNum",
            parseInt(data.data.docBo.docSeq) + 1
          );
          this.materialHandleInfo.yuliuDocNum =
            parseInt(data.data.docBo.docSeq) + 1;
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
          Vue.set(
            this.materialHandleInfo,
            "docNum",
            parseInt(data.data.docBo.docSeq) + 1
          );
          this.materialHandleInfo.docNum = parseInt(data.data.docBo.docSeq) + 1;
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
      var fromData = this.$utils.clear(this.stockAndMail, "");
      if (fromData.storageOutDate) {
        fromData.storageOutDate = this.$utils.formatDate(
          this.stockAndMail.storageOutDate,
          "YYYY-MM-DD"
        );
      }
      fromData.empTaskIds = this.$route.query.empTaskIds;
     // this.isLoadingC = true;
      api.saveBatchArchive(fromData).then(data => {
        if (data.code == 200) {
          if (data.data.message) {
            this.$Message.error(data.data.message);
          } else {
            this.$Message.success("办理成功");
          }
        } else {
          this.$Message.error("保存失败！" + data.data.message);
        }
       // this.isLoadingC = false;
      });
    },
    instancePost() {
      var fromData = this.$utils.clear(this.mail, "");
      if (fromData.postLetterDate) {
        fromData.postLetterDate = this.$utils.formatDate(
          this.mail.postLetterDate,
          "YYYY-MM-DD"
        );
      }
      fromData.empTaskIds = this.$route.query.empTaskIds;
     // this.isLoadingC = true;
      api.saveBatchArchive(fromData).then(data => {
        if (data.code == 200) {
          if (data.data.message) {
            this.$Message.error(data.data.message);
          } else {
            this.$Message.success("办理成功");
          }
        } else {
          this.$Message.error("保存失败！" + data.data.message);
        }
       // this.isLoadingC = false;
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
      }

      this.materialHandleInfo.employFeedbackOptDate = this.currentDate();
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
          this.materialHandleInfo.employFeedbackOptDate == "" ||
          this.materialHandleInfo.employFeedbackOptDate == undefined
        ) {
          this.materialHandleInfo.employFeedbackOptDate = this.currentDate();
        }
      }
    },
    changeDate3(e) {
      this.materialHandleInfo.employFeedbackOptDate = e;
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
