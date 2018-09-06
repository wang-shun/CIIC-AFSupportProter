<template>
  <Form :label-width=150>
    <Collapse v-model="collapseInfo" class="mt20">
      <Panel name="1">
        客户信息
        <div slot="content">
          <company-info ref="company" :customerInfo="this.$route.params.companyInfo" :isShowComplete="true"></company-info>
        </div>
      </Panel>
      <Panel name="2">
        企业任务单办理 ({{this.hfTypeName}})
        <div slot="content">
          <!-- <fund-open-account ref="openAccount" :openAccountInfo="this.$route.params.openAccountInfo"></fund-open-account> -->
          <Form :label-width=150 ref="openAccount" :model="openAccount"  >
              <Row type="flex" justify="start">
                <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                  <Form-item label="变更类型：">
                    <Select v-model="openAccount.changeTypeValue" style="width: 100%;"  transfer>
                      <Option v-for="item in changeTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
                    </Select>
                  </Form-item>
                </Col>
                <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                  <Form-item label="缴费银行：">
                    <Select v-model="openAccount.paymentBankValue" style="width: 100%;"  transfer>
                      <Option v-for="item in paymentBankList" :value="item.value" :key="item.value">{{item.label}}</Option>
                    </Select>
                  </Form-item>
                </Col>
                <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                  <Form-item label="付款方式：">
                    <Select v-model="openAccount.payMethodValue" style="width: 100%;"  transfer>
                      <Option v-for="item in payMethodList" :value="item.value" :key="item.value">{{item.label}}</Option>
                    </Select>
                  </Form-item>
                </Col>
                <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="企业公积金账户名称：">
                  <Input v-model="openAccount.companyFundAccountName" placeholder="请输入..." ></Input>
                </Form-item>
                </Col>
                <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                  <Form-item label="企业公积金账号：">
                    <Input v-model="openAccount.companyFundAccountNum" placeholder="请输入..."></Input>
                  </Form-item>
                </Col>
                <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                  <Form-item label="公积金企业U盾：">
                    <Select v-model="openAccount.UKeyValue" style="width: 100%;" transfer>
                      <Option v-for="item in UKeyList" :value="item.value" :key="item.value">{{item.label}}</Option>
                    </Select>
                  </Form-item>
                </Col>
                <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                  <Form-item label="客户缴费起始年月：">
                    <DatePicker v-model="openAccount.customerPayStartDate" type='month' placement="bottom-end"  style="width: 100%;" transfer></DatePicker>
                  </Form-item>
                </Col>
                <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                  <Form-item label="每月关账日：">
                    <Input v-model="openAccount.closeAccountEveryMonth" placeholder="请输入..." ></Input>
                  </Form-item>
                </Col>
                <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                  <Form-item label="专员操作起始年月：">
                    <DatePicker v-model="openAccount.operateStartMonth" type='month' placement="bottom-end" placeholder="选择日期"  style="width: 100%;" transfer></DatePicker>
                  </Form-item>
                </Col>
                <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                    <Form-item label="任务状态：" prop="taskStatus" >
                      <Select v-model="openAccount.taskStatus" style="width: 100%;" transfer @on-change="taskTypeChange">
                        <Option v-for="item in taskTypeList" :value="item.value" :key="item.value" >{{item.label}}</Option>
                      </Select>
                    </Form-item>
                </Col>
                <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                  <Form-item label="受理日期：">
                    <DatePicker v-model="openAccount.acceptDate" placement="bottom-end" placeholder="选择日期"  style="width: 100%;" transfer></DatePicker>
                  </Form-item>
                </Col>
                <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                  <Form-item label="送审日期：">
                    <DatePicker v-model="openAccount.deliveredDate" placement="bottom-end" placeholder="选择日期"  style="width: 100%;" transfer></DatePicker>
                  </Form-item>
                </Col>
                <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                  <Form-item label="完成日期：">
                    <DatePicker v-model="openAccount.finishDate" placement="bottom-end" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
                  </Form-item>
                </Col>
              </Row>
              <Row type="flex" justify="start">
                <Col :sm="{span: 24}">
                  <Form-item label="办理/批退备注：">
                    <Input v-model="openAccount.notes" placeholder="这里可填写您办理的备注信息，或者批退的备注信息" ></Input>
                  </Form-item>
                </Col>
              </Row>
            </Form>

        </div>
      </Panel>
    </Collapse>

    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <Button type="primary" @click="commit">提交</Button>
        <Button type="error" @click="rejection">批退</Button>
        <Button type="warning" @click="goBack">关闭/返回</Button>
      </Col>
    </Row>
  </Form>
</template>
<script>

  import customerInfo from "../common/CustomerInfo.vue"
  import fundOpenAccount from "../common/FundOpenAccount.vue"
  import {CompanyTaskListHF} from '../../../api/house_fund/company_task_list/company_task_list_hf'
  import Tools from '../../../lib/tools'
  export default {
    components: {companyInfo:customerInfo, fundOpenAccount},
    data() {
      return {
        collapseInfo: [1, 2],
        hfTypeName:this.$route.params.companyInfo.hfTypeName,
        openAccount:{
        },
         changeTypeList: [
          {label: "开户", value: '1'},
          {label: "转入", value: '2'}
        ],
        paymentBankList: [
          {label: "徐汇—X", value: '15'},
          {label: "西郊—C", value: '16'},
          {label: "东方路—P", value: '17'},
          {label: "卢湾—L", value: '18'},
          {label: "黄浦—H", value: '0'},
        ],
        payMethodList: [
          {value: '1',label: "客户自付", },
          {value: '2',label: "我司付款(客户预付)"},
          {value: '3',label: "垫付"},
        ],
        endTypeList: [
          {label: "销户", value: '1'},
          {label: "公司自做", value: '2'},
          {label: "转其他代理商", value: '3'}
        ],
        taskTypeList:[
          {value: '1', label: '受理中'},
          {value: '2', label: '送审中'},
          {value: '3', label: '已完成'},
        ],
        UKeyList: [
          {label: "有(中智代办)", value: '2'},
          {label: "有(客户自办)", value: '1'},
          {label: "没有", value: '0'},
        ],
        accountTempStoreTypeList: [
          {label: "是", value: 1},
          {label: "否", value: 0}
        ]
     
      }
    },
    mounted() {
      // if(this.$refs.openAccount.openAccountInfo.taskStatus==0){
      //  this.$route.params.openAccountInfo.taskStatus==1;
      // }
      this.openAccount=this.$route.params.openAccountInfo;
    },
    computed: {
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
       //任务类型发生变化
      taskTypeChange(){
        let taskState = this.openAccount.taskStatus;
        let formObj = this.openAccount;
        if(taskState=='1'){
             formObj.acceptDate =new Date();
             formObj.deliveredDate = null;
             formObj.finishDate =null;
        }else if(taskState=='2'){
            formObj.acceptDate = formObj.acceptDate==null? new Date() : formObj.acceptDate;
            formObj.deliveredDate = new Date();
             formObj.finishDate =null;
        }else if(taskState=='3'){
             formObj.acceptDate = formObj.acceptDate==null? new Date() : formObj.acceptDate;
             formObj.deliveredDate = formObj.deliveredDate==null? new Date() : formObj.deliveredDate;
             formObj.finishDate = new Date();
        }
      },
      //点击提交按钮
      commit(){
        let params = this.getParams()
        if(params.taskStatus==0){
          this.$Message.error('必须选择一个任务状态');
          return false;
        }
        if(params.taskStatus==1 && params.acceptDate=='' ){
          this.$Message.error('受理月份必填');
          return false;
        }
        if(params.taskStatus==2 && params.approvalDate=='' ){
          this.$Message.error('送审月份必填');
          return false;
        }
        if(params.taskStatus==3 && params.finishDate=='' ){
          this.$Message.error('完成月份必填');
          return false;
        }


        if(params.taskStatus==3){
          if(params.comAccountName=='' || params.comAccountName== null){
              this.$Message.error('企业账户名称必填');
              return false;
          }
          if(params.comAccountNum=='' || params.comAccountNum==null){
              this.$Message.error('企业账号必填');
              return false;
          }
          params.comAccountNum = params.comAccountNum.trim();
          if(params.comAccountNum=='') {
            this.$Message.error('企业账号必填');
            return false;
          }
          if(params.closeDay=='' || params.closeDay==null){
              this.$Message.error('每月关账日必填');
              return false;
          }
          if(params.paymentBank=='' || params.paymentBank==null){
              this.$Message.error('缴费银行必填');
              return false;
          }
          if(params.paymentWay=='' || params.paymentWay==null){
              this.$Message.error('付款方式必填');
              return false;
          }
          let comStartMonth=this.openAccount.customerPayStartDate;
          if(comStartMonth=='' || comStartMonth==null){
              this.$Message.error('客户缴费起始年月必填');
              return false;
          }
          let operateStartMonth=this.openAccount.operateStartMonth;
          if(operateStartMonth=='' || operateStartMonth==null){
              this.$Message.error('专员操作起始年月必填');
              return false;
          }
          if(params.uKeyStore=='' || params.uKeyStore==null){
              this.$Message.error('公积金企业U盾必填');
              return false;
          }
        }

        CompanyTaskListHF.updateCompanyTask(params).then(data=>{
          if(data){
             this.$Message.success('提交成功');
             this.goBack();
          }else{
             this.$Message.error('提交失败');
          }
        }).catch(error=>{
          console.log(error)
        })
      },
      rejection(){
        let notes=this.openAccount.notes;
          if(notes=='' || notes==null){
              this.$Message.info('请填写批退备注');
              return false;
          }
           this.$Modal.confirm({
              title: "您确认批退操作？",
              cancelText: "取消",
              onOk: () => {
                  let params={
                    comTaskId:this.$route.params.comTaskId,
                    remark:notes
                  }
                  CompanyTaskListHF.rejection(params).then(data=>{
                    if(data){
                        this.$Message.success('提交成功');
                        this.goBack();
                    }else{
                        this.$Message.error('提交失败');
                    }
                  }).catch(error=>{
                    console.log(error)
                  })
              }
            });
      },
      //获得更新任务单请求参数
      getParams(){

          let comStartMonth=this.openAccount.customerPayStartDate;
          if(comStartMonth!='' && comStartMonth!=null){
              comStartMonth = Tools.formatDate(comStartMonth, "YYYYMM")
          }
          let operateStartMonth=this.openAccount.operateStartMonth;
          if(operateStartMonth!='' && operateStartMonth!=null){
             operateStartMonth = Tools.formatDate(operateStartMonth, "YYYYMM")
          }

        return {
          //comTask
          comTaskId: this.$route.params.comTaskId,
          //companyInfo
          companyId: this.$refs.company.customerInfo.customerNumber,
          initiatorNotes: this.$refs.company.customerInfo.initiaterNotes,

          //openAccountInfo
          comAccountId:this.openAccount.comAccountId,
          comAccountClassId:this.openAccount.comAccountClassId,
          taskChangeTypeValue: this.openAccount.changeTypeValue,
          paymentWay: this.openAccount.payMethodValue,
          paymentBank: this.openAccount.paymentBankValue,
          closeDay: this.openAccount.closeAccountEveryMonth,
          comAccountName: (this.openAccount.companyFundAccountName+"").trim(),
          comAccountNum: this.openAccount.companyFundAccountNum,
          uKeyStore: this.openAccount.UKeyValue,
          comStartMonth: comStartMonth,
          operateStartMonth: operateStartMonth,
          endType: this.openAccount.endTypeValue,
          accountTempStore: this.openAccount.accountTempStoreTypeValue,
          taskStatus: this.openAccount.taskStatus,

          acceptDate: this.openAccount.acceptDate,
          approvalDate: this.openAccount.deliveredDate,
          finishDate: this.openAccount.finishDate,
          comAccountRemark: this.openAccount.notes,

        }
      },

    }
  }
</script>
