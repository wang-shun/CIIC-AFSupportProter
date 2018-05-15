<template>
  <div>
    <Form :model="handleInfo" ref="handleInfo" :label-width="106" >
      <Row type="flex" justify="start" >
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 4}">
        <Form-item label="预留档案类别：">
          <Select transfer @on-change="changeTypeYuliu" v-model="handleInfo.yuliuDocType">
            <Option value="" key="">空</Option>
            <Option v-for="item in handleInfo.docSeqList" :value="item.docType" :key="item.docType">{{item.docType}}</Option>
          </Select>
        </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span:4}">
          <Form-item label="预留档案编号：" prop="yuliuDocNum">
             <Input v-model="handleInfo.yuliuDocNum" placeholder="请输入" :maxlength="9"/>
             <input type="text" v-model="handleInfo.archiveId" hidden>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 4}">
        <Form-item label="档案类别：">
          <Select transfer @on-change="changeTypeNumber" v-model="handleInfo.docType">
            <Option value="" key="">空</Option>
            <Option v-for="item in handleInfo.docSeqList2" :value="item.docType" :key="item.docType">{{item.docType}}</Option>
          </Select>
        </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 4}">
          <Form-item label="档案编号：" prop="docNum" transfer>
            <Input v-model="handleInfo.docNum" placeholder="请输入" :maxlength="9"/>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="存档地：" prop="archivePlace">
            <Select v-model="handleInfo.archivePlace" transfer>
              <Option v-for="item in filePlaceList" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="存档地补充：" prop="archivePlaceAdditional">
            <Input v-model="handleInfo.archivePlaceAdditional" placeholder="请输入" :maxlength="50"/>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 4}">
          <Form-item label="存档卡状态：" prop="archiveCardState">
            <Select v-model="handleInfo.archiveCardState" transfer>
              <Option v-for="item in placeStateList" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 4}">
          <Form-item label="档案号：" prop="docCode">
            <Input v-model="handleInfo.docCode" placeholder="请输入" :maxlength="50"/>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 4}">
          <Form-item label="档案来源：" prop="docFrom">
            <Select v-model="handleInfo.docFrom" transfer>
              <Option v-for="item in fileOriginList" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 4}">
          <Form-item label="用工反馈：" prop="employFeedback">
            <Select v-model="handleInfo.employFeedback" @on-change="changeType" transfer>
              <Option v-for="item in employFeedbackList" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 4}">
          <Form-item label="用工反馈操作日期：" prop="employFeedbackOptDate">
            <DatePicker type="date" v-model="handleInfo.employFeedbackOptDate" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 4}">
          <Form-item label="调档反馈：" prop="diaodangFeedback">
            <Select v-model="handleInfo.diaodangFeedback" transfer>
              <Option v-for="item in transferFeedbackList" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 4}">
          <Form-item label="调档反馈操作日期：" prop="diaodangFeedbackOptDate">
            <DatePicker type="date" v-model="handleInfo.diaodangFeedbackOptDate" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 4}">
          <Form-item label="UKey外借日期：" prop="ukeyBorrowDate">
            <DatePicker type="date" v-model="handleInfo.ukeyBorrowDate" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 4}">
          <Form-item label="UKey返回日期：" prop="ukeyReturnDate">
            <DatePicker type="date" v-model="handleInfo.ukeyReturnDate" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 4}">
          <Form-item label="户口号：" prop="hukouCode">
            <Input v-model="handleInfo.hukouCode" placeholder="请输入" :maxlength="50"/>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 4}">
          <Form-item label="用工档案缴费至：" prop="employDocPaymentTo">
            <DatePicker type="date" v-model="handleInfo.employDocPaymentTo" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 4}">
          <Form-item label="入库日期：" prop="storageDate">
            <DatePicker type="date" v-model="handleInfo.storageDate" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 4}">
          <Form-item label="" prop="luyongHandleEnd">
            <Checkbox v-model="handleInfo.luyongHandleEnd" >录用处理结束</Checkbox>
          </Form-item>
        </Col>
      </Row>
      <Row type="flex" justify="start">
        <Col :sm="{span: 24}" class="tr">
          <Button type="warning" @click="resetForm('handleInfo')">重置</Button>
          <Button type="primary"  :loading="isLoading"  @click="instance()" :disabled="handleInfo.end">保存</Button>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<script>
import api from '../../../api/employ_manage/hire_operator'
import Vue from 'vue'
  export default {
    props: {
      handleInfo: {
        type: Object
      }
    },
    data() {
      return {
        isLoading: false,
        isFast: true,
        seqMax1: 0,
        seqMax2: 0,
        reservedFileNumberList: [
          {value: '空', label: '空'},
          {value: '外来从业人员', label: '外来从业人员'},
          {value: '居住证', label: '居住证'},
          {value: '调档', label: '调档'},
          {value: '市人才', label: '市人才'},
          {value: '梅园路', label: '梅园路'},
          {value: '商城路', label: '商城路'},
          {value: '漕虹路', label: '漕虹路'},
          {value: '区人才', label: '区人才'},
          {value: '高校', label: '高校'},
          {value: '经营者', label: '经营者'},
          {value: '厂长经理人才', label: '厂长经理人才'},
          {value: '农民工', label: '农民工'},
          {value: '退休', label: '退休'},
          {value: '协保', label: '协保'},
          {value: '退工不调档', label: '退工不调档'},
          {value: '用工不调档', label: '用工不调档'},
          {value: '非全日制', label: '非全日制'},
          {value: '徐职', label: '徐职'},
          {value: '公司自行保管', label: '公司自行保管'}
        ],
        fileNumberList: [],
        filePlaceList: [
          {value:'空',label:'空'},
          {value:'外来从业人员',label:'外来从业人员'},
          {value:'居住证',label:'居住证'},
          {value:'属地管理',label:'属地管理'},
          {value:'中智',label:'中智'},
          {value:'农村富裕劳动力',label:'农村富裕劳动力'},
          {value:'区人才',label:'区人才'},
          {value:'徐汇职介',label:'徐汇职介'},
          {value:'梅园路',label:'梅园路'},
          {value:'商城路',label:'商城路'},
          {value:'漕虹分部',label:'漕虹分部'},
          {value:'浦东大道',label:'浦东大道'},
          {value:'大柏树工作站',label:'大柏树工作站'},
          {value:'国际航运中心',label:'国际航运中心'},
          {value:'市人才',label:'市人才'},
          {value:'就业指导中心',label:'就业指导中心'},
          {value:'经营者人才',label:'经营者人才'},
          {value:'厂长经理人才',label:'厂长经理人才'},
          {value:'退休',label:'退休'},
          {value:'协保',label:'协保'},
          {value:'其他',label:'其他'},
          {value:'公司自行保理',label:'公司自行保理'},
          {value:'退工不调',label:'退工不调'},
          {value:'用工不调',label:'用工不调'},
          {value:'非全日制',label:'非全日制'},
          {value:'翻牌转下一条任务单',label:'翻牌转下一条任务单'}
        ],
        filePlaceAddList: [],
        placeStateList: [
          {value:'空',label:'空'},
          {value:'无',label:'无'},
          {value:'卡为复印件',label:'卡为复印件'}
        ],
        fileOriginList: [
           {value:'空',label:'空'},
           {value:'户口所在地调入',label:'户口所在地调入'},
           {value:'市区人才调入',label:'市区人才调入'},
           {value:'单位转出（包括邮寄）',label:'单位转出（包括邮寄）'},
           {value:'中智取',label:'中智取'},
           {value:'农业户口',label:'农业户口'},
           {value:'其他',label:'其他'}
        ],
        employFeedbackList: [
          {value:'3',label:'用工成功'},
          {value:'10',label:'用工已办查无档'},
          {value:'4',label:'用工失败'},
          {value:'11',label:'Ukey外借'},
          {value:'5',label:'前道要求撤销用工'},
          {value:'12',label:'用工成功,重复任务单'},
          {value:'13',label:'用工已办,前道已中止'}
        ],
        transferFeedbackList: [
          {value:'空',label:'空'},
          {value:'已告知本人转档',label:'已告知本人转档'},
          {value:'无档自查',label:'无档自查'},
          {value:'浦东职介代管',label:'浦东职介代管'},
          {value:'黄浦职介代管',label:'黄浦职介代管'},
          {value:'长宁职介代管',label:'长宁职介代管'},
          {value:'静安职介代管',label:'静安职介代管'},
          {value:'普陀职介代管',label:'普陀职介代管'},
          {value:'虹口职介代管',label:'虹口职介代管'},
          {value:'金桥职介代管',label:'金桥职介代管'},
          {value:'徐汇职介代管',label:'徐汇职介代管'},
          {value:'档在高招办',label:'档在高招办'}

        ]
      }
    },
    methods: {
      changeTypeYuliu(val){
        if(this.isFast){
          this.isFast = false;
          if(this.handleInfo.oldYuLiuType == undefined || this.handleInfo.oldYuLiuType == ''){
            this.queryDocSeqByDocType(val);
          }
          return;
        }
        if(val == ''){
          Vue.set(this.handleInfo,'yuliuDocNum','');
          return;
        }

        if(val == this.handleInfo.oldYuLiuType){
          //用原有的 number
          Vue.set(this.handleInfo,'yuliuDocNum',this.handleInfo.oldYuLiuNum);
          return;
        }
        this.queryDocSeqByDocType(val);
      },

      queryDocSeqByDocType(val){
        api.queryDocSeqByDocType({type : 1,docType : val}).then(data => {
          if (data.code == 200) {
            Vue.set(this.handleInfo,'yuliuDocNum',parseInt(data.data.docBo.docSeq)+1)
              this.handleInfo.yuliuDocNum = parseInt(data.data.docBo.docSeq)+1;
              this.seqMax1 = data.data.docBo.docSeq;
          } else {
              this.$Message.error("服务器异常" + data.message);
          }
        })
      },

      changeTypeNumber(val){
        if(this.isFast){
          this.isFast = false;
          if(this.handleInfo.oldType == undefined || this.handleInfo.oldType == ''){
            this.queryDocSeqByDocType2(val);
          }
          return;
        }
        if(val == ''){
          Vue.set(this.handleInfo,'docNum','');
          return;
        }
        if(val == this.handleInfo.oldType){
          //用原有的 number
          Vue.set(this.handleInfo,'docNum',this.handleInfo.oldNum);
          return;
        }
        this.queryDocSeqByDocType2(val);
      },

      queryDocSeqByDocType2(val){
        api.queryDocSeqByDocType({type : 2,docType : val}).then(data => {
          if (data.code == 200) {
            Vue.set(this.handleInfo,'docNum',parseInt(data.data.docBo.docSeq)+1)
            this.handleInfo.docNum = parseInt(data.data.docBo.docSeq)+1;
            this.seqMax2 = data.data.docBo.docSeq;
          } else {
            this.$Message.error("服务器异常" + data.message);
          }
        })
      },
      resetForm(form) {
        this.$refs[form].resetFields();
        this.handleInfo.luyongHandleEnd = '0';
      },instance() {
        
        if(!this.handleInfo.employmentId)
        {
            this.$Message.success("请先保存用工信息");
            return;
        }
        var patrn = /^[0-9]*$/;
        if (!patrn.test(this.handleInfo.yuliuDocNum) && this.handleInfo.yuliuDocNum != undefined) {
          this.$Message.error("预留档案编号必须是数字！");
          return;
        }
        if(!patrn.test(this.handleInfo.docNum) && this.handleInfo.docNum != undefined){
          this.$Message.error("档案编号必须是数字！");
          return;
        }
        if(this.handleInfo.yuliuDocNum == 999999999){
          this.$Message.error("预留档案编号已经是极限了，请联系管理员！");
          return;
        }
        if(this.handleInfo.docNum == 999999999){
          this.$Message.error("档案编号已经是极限了，请联系管理员！");
          return;
        }
        var fromData = this.$utils.clear(this.handleInfo,'');
        fromData.isFrist='0';
        if(this.handleInfo.employFeedbackOptDate){
         fromData.employFeedbackOptDate = this.$utils.formatDate(this.handleInfo.employFeedbackOptDate, 'YYYY-MM-DD');
        }
        if(this.handleInfo.diaodangFeedbackOptDate){
           fromData.diaodangFeedbackOptDate = this.$utils.formatDate(this.handleInfo.diaodangFeedbackOptDate, 'YYYY-MM-DD');
        }
        if(this.handleInfo.ukeyBorrowDate){
            fromData.ukeyBorrowDate = this.$utils.formatDate(this.handleInfo.ukeyBorrowDate, 'YYYY-MM-DD');
        }
        if(this.handleInfo.ukeyReturnDate){
             fromData.ukeyReturnDate = this.$utils.formatDate(this.handleInfo.ukeyReturnDate, 'YYYY-MM-DD');
        }
        if(this.handleInfo.employDocPaymentTo){
            fromData.employDocPaymentTo = this.$utils.formatDate(this.handleInfo.employDocPaymentTo, 'YYYY-MM-DD');
        }
        if(this.handleInfo.storageDate){
             fromData.storageDate = this.$utils.formatDate(this.handleInfo.storageDate, 'YYYY-MM-DD');
        }

         this.isLoading = true;
        this.localSeqList = fromData.docSeqList;
        fromData.docSeqList = [];
        fromData.docSeqList2 = [];

        api.saveAmArchive(fromData).then(data => {
              if (data.code == 200) {
                this.$Message.success("保存成功");
                 this.handleInfo.archiveId=data.data.archiveId;
                 this.handleInfo.end =data.data.end;
                 this.handleInfo.oldYuLiuType = data.data.yuliuDocType;
                 this.handleInfo.oldYuLiuNum = data.data.yuliuDocNum;
                 this.handleInfo.oldType = data.data.docType;
                 this.handleInfo.oldNum = data.data.docNum;
              } else {
                this.$Message.error("保存失败！" + data.message);
              }
               this.isLoading = false;
        })
         
       },updateTask(){
         if(!this.handleInfo.employmentId)
        {
            this.$Message.success("请先保存用工信息");
            return;
        }

        var param = {employmentId:this.handleInfo.employmentId};
       
        api.updateTaskStatus(param).then(data => {
              if (data.code == 200) {
                this.$Message.success("成功");
                 history.go(-1);
              } else {
                this.$Message.error("失败！" + data.message);
              }
        })
       },changeType(val){
          if(val==11)
          {
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
              this.handleInfo.ukeyBorrowDate=currentdate;
          }
         
       }
    },
    computed: {
      handle() {
        return this.handleInfo;
      }
    }
  }
</script>
