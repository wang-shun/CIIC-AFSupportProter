<template>
  <div>
    <Form :label-width="150" ref="file1" :model="file1">
      <Row type="flex" justify="start">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="预留档案编号：">
          <Select transfer @on-change="changeTypeYuliu" filterable v-model="file1.yuliuDocType" style="width:100px">
            <Option v-for="item in file1.docSeqList" :value="item.docType" :key="item.docType">{{item.docType}}</Option>
          </Select>
          <Input v-model="file1.yuliuDocNum" placeholder="请输入" :maxlength="9" style="width:245px"/>
        </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="档案编号：">
          <Select transfer @on-change="changeType" filterable v-model="file1.docType" style="width:100px">
            <Option v-for="item in file1.docSeqList2" :value="item.docType" :label="item.docType" :key="item.docType">{{item.docType}}</Option>
          </Select>
          <Input v-model="file1.docNum" placeholder="请输入" :maxlength="9" style="width:245px"/>
        </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="档案号：">
          <Input v-model="file1.docCode" placeholder="请输入" :maxlength="50"/>
        </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="存档地：" prop="archivePlace">
          <Select v-model="file1.archivePlace" transfer>
            <Option v-for="item in filePlaceList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="档案来源：" prop="docFrom">
          <Select v-model="file1.docFrom" transfer>
            <Option v-for="item in fileOriginList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="进档日期：">
          <DatePicker  type="date" v-model="file1.inFileDate" placeholder="" @on-open-change="setCurrentDate3" @on-change="changeDate3" transfer></DatePicker>
        </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="存档地补充：">
          <Input v-model="file1.archivePlaceAdditional" placeholder="请输入" :maxlength="50"/>
        </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="户口号：" prop="hukouCode">
          <Input v-model="file1.hukouCode" placeholder="请输入" :maxlength="50"/>
          <input type="text" v-model="file1.archiveId" hidden>
        </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="入库日期：" prop="storageDate">
          <DatePicker type="date" v-model="file1.storageDate" @on-open-change="setCurrentDate2" @on-change="changeDate2" transfer></DatePicker>
        </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="存档地状态：">
          <Select v-model="file1.archiveCardState" transfer>
            <Option v-for="item in placeStateList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="用工档案缴费至：" prop="employDocPaymentTo">
            <DatePicker type="date" v-model="file1.employDocPaymentTo" @on-open-change="setCurrentDate" @on-change="changeDate" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="录用处理结束：">
          <Checkbox v-model="file1.luyongHandleEnd">录用处理结束</Checkbox>
        </Form-item>
        </Col>


        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="用工反馈：">
            {{fileInfo1.employFeedback === '0' ? '空' : fileInfo1.employFeedback === '3' ? '用工成功' :
             fileInfo1.employFeedback === '10' ? '用工已办查无档' : fileInfo1.employFeedback === '4' ? '用工失败'
             : fileInfo1.employFeedback === '11' ? 'Ukey外借' : fileInfo1.employFeedback === '5' ? '前道要求撤销用工'
              : fileInfo1.employFeedback === '12' ? '用工成功,重复任务单' :
              fileInfo1.employFeedback === '13' ? '用工已办,前道已中止' : ''}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="用工反馈日期：">
            {{fileInfo1.employFeedbackOptDate}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="调档反馈：">
            {{fileInfo1.diaodangFeedback}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="调档反馈日期：">
          {{fileInfo1.diaodangFeedbackOptDate}}
          </Form-item>
        </Col>


      </Row>
      <Row type="flex" justify="start">
        <Col :sm="{span: 24}" class="tr">
        <Button type="primary" :loading="isLoading" @click="instance()">保存</Button>
        </Col>
      </Row>
    </Form>
    <Form :label-width="150" class="mt40">
      <Row type="flex" justify="start">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="">
          <Checkbox v-model="file2.docHalfwayOut" true-value="1" false-value="0">档案中途转出</Checkbox>
        </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="档案中途转出时间：">
          <DatePicker v-model="file2.docHalfwayOutDate" type="date" placeholder="" @on-open-change="setCurrentDate4" @on-change="changeDate4" transfer></DatePicker>
        </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="档案中途转出方向：">
          <Input v-model="file2.docHalfwayOutDirect" placeholder="请输入" :maxlength="50"/>
        </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="手册入库日期：">
          <DatePicker v-model="file2.manualStorageDate" type="date" placeholder="" @on-open-change="setCurrentDate5" @on-change="changeDate5" transfer></DatePicker>
        </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="手册入库人：">
          <Input v-model="file2.manualStorageMan" placeholder="请输入" :maxlength="50"/>
        </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="用工后收到手册日期：">
          <DatePicker v-model="file2.afterEmployManualReceiveDate" type="date" placeholder="" @on-open-change="setCurrentDate6" @on-change="changeDate6" transfer></DatePicker>
        </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="用工后收到手册入库人：">
          <Input v-model="file2.afterEmployManualStorageMan" placeholder="请输入" :maxlength="50"/>
        </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="恢复用工手册入库日期：">
          <DatePicker v-model="file2.recoverEmployManualStorageDate" type="date" placeholder="" @on-open-change="setCurrentDate7" @on-change="changeDate7" transfer></DatePicker>
        </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="恢复用工手册入库人：">
          <Input v-model="file2.recoverEmployManualStorageMan" placeholder="请输入" :maxlength="50"/>
        </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="寄档案回执日期：">
          <DatePicker v-model="file2.mailDocReturnDate" type="date" placeholder="" @on-open-change="setCurrentDate8" @on-change="changeDate8" transfer></DatePicker>
        </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="寄档案回执人：">
          <Input v-model="file2.mailDocReturnMan" placeholder="请输入" :maxlength="50"/>
        </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="开存档证明日期：">
          <DatePicker v-model="file2.openDocProofDate" type="date" placeholder="" @on-open-change="setCurrentDate9" @on-change="changeDate9" transfer></DatePicker>
        </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="开存档证明人：">
          <Input v-model="file2.openDocProofMan" placeholder="请输入" :maxlength="50"/>
          <input type="text" v-model="file2.archiveId" hidden>
        </Form-item>
        </Col>
      </Row>
      <Row type="flex" justify="start">
        <Col :sm="{span: 24}" class="tr">
        <Button type="primary" :loading="isLoadingT" @click="instance1()">保存</Button>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<script>
  import api from '../../../api/employ_manage/hire_operator'
  import Vue from 'vue'
  import {localStorage, sessionStorage} from '../../../assets/api/storage'
  export default {
    props: {
      fileInfo1: {
        type: Object
      },
      fileInfo2: {
        type: Object
      }
    },
    data() {
      return {
        isLoading: false,
        isLoadingT: false,
        isFast: true,
        reservedFileNumberList: [],
        fileNumberList: [],
        placeList: [],
        seqMax1: 0,
        seqMax2: 0,
        placeAddList: [],
        placeStateList: [
          {value:'',label:''},
          {value:'无',label:'无'},
          {value:'卡为复印件',label:'卡为复印件'}
        ],
        fileOriginList: [
          {value:'',label:''},
          {value:'户口所在地调入',label:'户口所在地调入'},
          {value:'市区人才调入',label:'市区人才调入'},
          {value:'单位转出（包括邮寄）',label:'单位转出（包括邮寄）'},
          {value:'中智取',label:'中智取'},
          {value:'农业户口',label:'农业户口'},
          {value:'其他',label:'其他'}
        ],
        filePlaceList: [
          {value:'',label:''},
          {value:'外来从业人员',label:'外来从业人员'},
          {value:'居住证',label:'居住证'},
          {value:'属地管理',label:'属地管理'},
          {value:'中智',label:'中智'},
          {value:'徐汇职介',label:'徐汇职介'},
          {value:'市人才',label:'市人才'},
          {value:'梅园路',label:'梅园路'},
          {value:'商城路',label:'商城路'},
          {value:'漕虹分部',label:'漕虹分部'},
          {value:'浦东大道',label:'浦东大道'},
          {value:'大柏树工作站',label:'大柏树工作站'},
          {value:'国际航运中心',label:'国际航运中心'},
          {value:'区人才',label:'区人才'},
          {value:'就业指导中心',label:'就业指导中心'},
          {value:'经营者人才',label:'经营者人才'},
          {value:'厂长经理人才',label:'厂长经理人才'},
          {value:'农村富裕劳动力',label:'农村富裕劳动力'},
          {value:'退休',label:'退休'},
          {value:'协保',label:'协保'},
          {value:'其他',label:'其他'},
          {value:'公司自行保理',label:'公司自行保理'},
          {value:'退工不调',label:'退工不调'},
          {value:'用工不调',label:'用工不调'},
          {value:'非全日制',label:'非全日制'},
          {value:'翻牌转下一条任务单',label:'翻牌转下一条任务单'}
        ]
      }
    },
    methods: {
      changeTypeYuliu(val){
        if(this.isFast){
          this.isFast = false;
          if(this.fileInfo1.oldYuLiuType == undefined || this.fileInfo1.oldYuLiuType == ''){
            this.queryDocSeqByDocType(val);
          }
          return;
        }

        if(val == ''){
          Vue.set(this.file1,'yuliuDocNum','');
          return;
        }

        if(val == this.fileInfo1.oldYuLiuType){
          //用原有的 number
          Vue.set(this.file1,'yuliuDocNum',this.fileInfo1.oldYuLiuNum);
          return;
        }
        this.queryDocSeqByDocType(val);
      },

      queryDocSeqByDocType(val){
        api.queryDocSeqByDocType({type : 1,docType : val}).then(data => {
          if (data.code == 200) {
            if(data.data.docBo.docSeq){
              Vue.set(this.file1,'yuliuDocNum',parseInt(data.data.docBo.docSeq)+1);
              this.file1.yuliuDocNum = parseInt(data.data.docBo.docSeq)+1;
              this.seqMax1 = data.data.docBo.docSeq;
            }else{
              Vue.set(this.file1,'yuliuDocNum','');
            }
          } else {
              this.$Message.error("服务器异常" + data.message);
          }
        })
      },

      changeType(val){
        if(this.isFast){
          this.isFast = false;
          if(this.fileInfo1.oldType == undefined || this.fileInfo1.oldType == ''){
            this.queryDocSeqByDocType2(val);
          }
          return;
        }
        if(val == ''){
          Vue.set(this.file1,'docNum','');
          return;
        }
        if(val == this.fileInfo1.oldType){
          //用原有的 number
          Vue.set(this.file1,'docNum',this.fileInfo1.oldNum);
          return;
        }
        this.queryDocSeqByDocType2(val);
      },

      queryDocSeqByDocType2(val){
        api.queryDocSeqByDocType({type : 2,docType : val}).then(data => {
          if (data.code == 200) {
            if(data.data.docBo.docSeq){
              Vue.set(this.file1,'docNum',parseInt(data.data.docBo.docSeq)+1)
              this.file1.docNum = parseInt(data.data.docBo.docSeq)+1;
              this.seqMax2 = data.data.docBo.docSeq;
            }else{
              Vue.set(this.file1,'docNum','');
            }
          } else {
            this.$Message.error("服务器异常" + data.message);
          }
        })
      },


      resetForm(form) {
        this.$refs[form].resetFields();
      },instance() {

        var patrn = /^[0-9]*$/;
        if (!patrn.test(this.file1.yuliuDocNum) && this.file1.yuliuDocNum != undefined) {
          this.$Message.error("预留档案编号必须是数字！");
          return;
        }
        if(!patrn.test(this.file1.docNum) && this.file1.docNum != undefined){
          this.$Message.error("档案编号必须是数字！");
          return;
        }
        if(this.file1.yuliuDocNum == 999999999){
          this.$Message.error("预留档案编号已经是极限了，请联系管理员！");
          return;
        }
        if(this.file1.docNum == 999999999){
          this.$Message.error("档案编号已经是极限了，请联系管理员！");
          return;
        }
        if(this.file1.docType != '' && this.file1.docType != undefined){
          if(this.file1.docNum == '' || this.file1.docNum == undefined){
            this.$Message.error("档案类别和档案编号是一个组合整体，必须都填写！");
            return;
          }
        }
        if(this.file1.docNum != '' && this.file1.docNum != undefined){
          if(this.file1.docType == '' || this.file1.docType == undefined){
            this.$Message.error("档案类别和档案编号是一个组合整体，必须都填写！");
            return;
          }
        }
        if(this.file1.yuliuDocType != '' && this.file1.yuliuDocType != undefined){
          if(this.file1.yuliuDocNum == '' || this.file1.yuliuDocNum == undefined){
            this.$Message.error("预留档案类别和档案编号是一个组合整体，必须都填写！");
            return;
          }
        }
        if(this.file1.yuliuDocNum != '' && this.file1.yuliuDocNum != undefined){
          if(this.file1.yuliuDocType == '' || this.file1.yuliuDocType == undefined){
            this.$Message.error("预留档案类别和档案编号是一个组合整体，必须都填写！");
            return;
          }
        }
         this.isLoading = true;
        var fromData = this.$utils.clear(this.file1,'');
        if(this.file1.employDocPaymentTo){
          fromData.employDocPaymentTo = this.$utils.formatDate(this.file1.employDocPaymentTo, 'YYYY-MM-DD');
        }
        if(this.file1.storageDate){
          fromData.storageDate = this.$utils.formatDate(this.file1.storageDate, 'YYYY-MM-DD');
        }
        if(this.file1.inFileDate){
          fromData.inFileDate = this.$utils.formatDate(this.file1.inFileDate, 'YYYY-MM-DD');
        }
        if(this.file1.docHalfwayOutDate){
          fromData.docHalfwayOutDate = this.$utils.formatDate(this.file1.docHalfwayOutDate, 'YYYY-MM-DD');
        }
        if(this.file1.manualStorageDate){
          fromData.manualStorageDate = this.$utils.formatDate(this.file1.manualStorageDate, 'YYYY-MM-DD');
        }
        if(this.file1.afterEmployManualReceiveDate){
          fromData.afterEmployManualReceiveDate = this.$utils.formatDate(this.file1.afterEmployManualReceiveDate, 'YYYY-MM-DD');
        }
        if(this.file1.recoverEmployManualStorageDate){
          fromData.recoverEmployManualStorageDate = this.$utils.formatDate(this.file1.recoverEmployManualStorageDate, 'YYYY-MM-DD');
        }
        if(this.file1.mailDocReturnDate){
          fromData.mailDocReturnDate = this.$utils.formatDate(this.file1.mailDocReturnDate, 'YYYY-MM-DD');
        }
        if(this.file1.openDocProofDate){
          fromData.openDocProofDate = this.$utils.formatDate(this.file1.openDocProofDate, 'YYYY-MM-DD');
        }
        if(this.file1.closeFeeDate){
          fromData.closeFeeDate = this.$utils.formatDate(this.file1.closeFeeDate, 'YYYY-MM-DD');
        }
        if(this.file1.closeFeeStartDate){
          fromData.closeFeeStartDate = this.$utils.formatDate(this.file1.closeFeeStartDate, 'YYYY-MM-DD');
        }
        if(this.file1.resignDocDate){
          fromData.resignDocDate = this.$utils.formatDate(this.file1.resignDocDate, 'YYYY-MM-DD');
        }
        if(this.file1.storageOutDate){
          fromData.storageOutDate = this.$utils.formatDate(this.file1.storageOutDate, 'YYYY-MM-DD');
        }
        if(this.file1.postLetterDate){
          fromData.postLetterDate = this.$utils.formatDate(this.file1.postLetterDate, 'YYYY-MM-DD');
        }

        if(this.file1.budiaoDocDate1){
          fromData.budiaoDocDate1 = this.$utils.formatDate(this.file1.budiaoDocDate1, 'YYYY-MM-DD');
        }
        if(this.file1.budiaoDocDate2){
          fromData.budiaoDocDate2 = this.$utils.formatDate(this.file1.budiaoDocDate2, 'YYYY-MM-DD');
        }
        fromData.docSeqList = [];
        fromData.docSeqList2 = [];
        api.saveAmArchive(fromData).then(data => {
          if (data.code == 200) {
            this.$Message.success("保存成功");
            this.file1.archiveId=data.data.archiveId;
            this.file1.oldYuLiuType = data.data.yuliuDocType;
            this.file1.oldYuLiuNum = data.data.yuliuDocNum;
            this.file1.oldType = data.data.docType;
            this.file1.oldNum = data.data.docNum;
          } else {
            this.$Message.error("保存失败！" + data.message);
          }
           this.isLoading = false;
        })

      },
      instance1() {
        this.$utils.copy(this.file2, this.file1);

        this.isLoadingT = true;

        var fromData = this.$utils.clear(this.file2,'');

        if(this.file2.employDocPaymentTo){
          fromData.employDocPaymentTo = this.$utils.formatDate(this.file2.employDocPaymentTo, 'YYYY-MM-DD');
        }
        if(this.file2.storageDate){
          fromData.storageDate = this.$utils.formatDate(this.file2.storageDate, 'YYYY-MM-DD');
        }
        if(this.file2.inFileDate){
          fromData.inFileDate = this.$utils.formatDate(this.file2.inFileDate, 'YYYY-MM-DD');
        }
        if(this.file2.docHalfwayOutDate){
          fromData.docHalfwayOutDate = this.$utils.formatDate(this.file2.docHalfwayOutDate, 'YYYY-MM-DD');
        }
        if(this.file2.manualStorageDate){
          fromData.manualStorageDate = this.$utils.formatDate(this.file2.manualStorageDate, 'YYYY-MM-DD');
        }
        if(this.file2.afterEmployManualReceiveDate){
          fromData.afterEmployManualReceiveDate = this.$utils.formatDate(this.file2.afterEmployManualReceiveDate, 'YYYY-MM-DD');
        }
        if(this.file2.recoverEmployManualStorageDate){
          fromData.recoverEmployManualStorageDate = this.$utils.formatDate(this.file2.recoverEmployManualStorageDate, 'YYYY-MM-DD');
        }
        if(this.file2.mailDocReturnDate){
          fromData.mailDocReturnDate = this.$utils.formatDate(this.file2.mailDocReturnDate, 'YYYY-MM-DD');
        }
        if(this.file2.openDocProofDate){
          fromData.openDocProofDate = this.$utils.formatDate(this.file2.openDocProofDate, 'YYYY-MM-DD');
        }
        if(this.file2.closeFeeDate){
          fromData.closeFeeDate = this.$utils.formatDate(this.file2.closeFeeDate, 'YYYY-MM-DD');
        }
        if(this.file2.closeFeeStartDate){
          fromData.closeFeeStartDate = this.$utils.formatDate(this.file2.closeFeeStartDate, 'YYYY-MM-DD');
        }
        if(this.file2.resignDocDate){
          fromData.resignDocDate = this.$utils.formatDate(this.file2.resignDocDate, 'YYYY-MM-DD');
        }
        if(this.file2.storageOutDate){
          fromData.storageOutDate = this.$utils.formatDate(this.file2.storageOutDate, 'YYYY-MM-DD');
        }
        if(this.file2.postLetterDate){
          fromData.postLetterDate = this.$utils.formatDate(this.file2.postLetterDate, 'YYYY-MM-DD');
        }

        if(this.file2.budiaoDocDate1){
          fromData.budiaoDocDate1 = this.$utils.formatDate(this.file2.budiaoDocDate1, 'YYYY-MM-DD');
        }
        if(this.file2.budiaoDocDate2){
          fromData.budiaoDocDate2 = this.$utils.formatDate(this.file2.budiaoDocDate2, 'YYYY-MM-DD');
        }


        api.saveAmArchive(fromData).then(data => {
          if (data.code == 200) {
            this.file2.archiveId=data.data.archiveId;
            this.$Message.success("保存成功");
          } else {
            this.$Message.error("保存失败！" + data.message);
          }
           this.isLoadingT = false;
        })

      },currentDate(){
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
       },setCurrentDate(e) {
        if(e){
          if(this.file1.employDocPaymentTo==''||this.file1.employDocPaymentTo==undefined)
          {
             this.file1.employDocPaymentTo = this.currentDate();
          }
        }
      },changeDate(e) {
        this.file1.employDocPaymentTo = e;
      },setCurrentDate2(e) {
        if(e){
          if(this.file1.storageDate==''||this.file1.storageDate==undefined)
          {
             this.file1.storageDate = this.currentDate();
          }
        }
      },changeDate2(e) {
        this.file1.storageDate = e;
      },setCurrentDate3(e) {
        if(e){
          if(this.file1.inFileDate==''||this.file1.inFileDate==undefined)
          {
             this.file1.inFileDate = this.currentDate();
          }
        }
      },changeDate3(e) {
        this.file1.inFileDate = e;
      },setCurrentDate4(e) {
        if(e){
          if(this.file1.docHalfwayOutDate==''||this.file1.docHalfwayOutDate==undefined)
          {
             this.file1.docHalfwayOutDate = this.currentDate();
          }
        }
      },changeDate4(e) {
        this.file1.docHalfwayOutDate = e;
      },setCurrentDate5(e) {
        if(e){
          if(this.file1.manualStorageDate==''||this.file1.manualStorageDate==undefined)
          {
             this.file1.manualStorageDate = this.currentDate();
             this.file1.manualStorageMan = this.file1.username;
          }
        }
      },changeDate5(e) {
        this.file1.manualStorageDate = e;
      },setCurrentDate6(e) {
        if(e){
          if(this.file1.afterEmployManualReceiveDate==''||this.file1.afterEmployManualReceiveDate==undefined)
          {
             this.file1.afterEmployManualReceiveDate = this.currentDate();
              this.file1.afterEmployManualStorageMan = this.file1.username;
          }
        }
      },changeDate6(e) {
        this.file1.afterEmployManualReceiveDate = e;
      },setCurrentDate7(e) {
        if(e){
          if(this.file1.recoverEmployManualStorageDate==''||this.file1.recoverEmployManualStorageDate==undefined)
          {
             this.file1.recoverEmployManualStorageDate = this.currentDate();
             this.file1.recoverEmployManualStorageMan = this.file1.username;
          }
        }
      },changeDate7(e) {
        this.file1.recoverEmployManualStorageDate = e;
      },setCurrentDate8(e) {
        if(e){
          if(this.file1.mailDocReturnDate==''||this.file1.mailDocReturnDate==undefined)
          {
             this.file1.mailDocReturnDate = this.currentDate();
             this.file1.mailDocReturnMan = this.file1.username;
          }
        }
      },changeDate8(e) {
        this.file1.mailDocReturnDate = e;
      },setCurrentDate9(e) {
        if(e){
          if(this.file1.openDocProofDate==''||this.file1.openDocProofDate==undefined)
          {
             this.file1.openDocProofDate = this.currentDate();
             this.file1.openDocProofMan = this.file1.username;
          }
        }
      },changeDate9(e) {
        this.file1.openDocProofDate = e;
      },




    },
    computed: {
      file1() {
         var userInfo = JSON.parse(localStorage.getItem("userInfo"));
         this.fileInfo1.username = userInfo.displayName;
        return this.fileInfo1;
      },
      file2() {
        return this.fileInfo2;
      }
    }
  }
</script>
