<template>
  <div>
    <Collapse v-model="collapseInfo" class="mt20">
      <Panel name="1">
        企业账户信息
        <div slot="content">
         <Form :label-width=150>
            <Row type="flex" justify="start">
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="客户基本公积金账号：">
                <label>{{displayVO.basicHfComAccount}}</label>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="客户补充公积金账号：">
                <label>{{displayVO.addedHfComAccount}}</label>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="客户中心：">
                <label>{{displayVO.serviceCenter}}</label>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="缴费区县：">
                <label>{{this.$decode.hf_paymentBank(displayVO.paymentBank)}}</label>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="企业公积金账户状态：">
                <label>{{this.$decode.hf_state(displayVO.state)}}</label>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="末次汇缴月（基本）：">
                <label>{{displayVO.basicComHfMonth}}</label>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="末次汇缴月（补充）：">
                <label>{{displayVO.addedComHfMonth}}</label>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="客服经理：">
                <label>{{displayVO.leaderShipName}}</label>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="客户专员：">
                <label>{{displayVO.serviceSpecialist}}</label>
              </FormItem>
              </Col>
              <!-- <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="截单年月（基本）：">
                <label>{{displayVO.basicEndMonth}}</label>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="截单年月（补充）：">
                <label>{{displayVO.addedEndMonth}}</label>
              </FormItem>
              </Col> -->
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="付款方式：">
                <label>{{this.$decode.hf_paymentWay(displayVO.paymentWay)}}</label>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="公积金企业U盾：">
                <label>{{this.$decode.hf_accountTempStore(displayVO.ukeyStore)}}</label>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="客户编号：">
                <label>{{displayVO.companyId}}</label>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="客户名称：">
                <label>{{displayVO.companyName}}</label>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="企业账户类型：">
                <label>{{this.$decode.hf_accountType(displayVO.hfAccountType)}}</label>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="企业公积金账号名称：">
                <label>{{displayVO.comAccountName}}
                  <span style="color: red">{{displayVO.comTaskStatusName}}</span>
                </label>
              </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
      <Panel name="2">
        雇员信息
        <div slot="content">
          <Form :label-width=150>
            <Row type="flex" justify="start">
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="雇员编号：">
                <label>{{displayVO.employeeId}}</label>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="雇员姓名：">
                <label>{{displayVO.employeeName}}</label>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="证件号码：">
                <label>{{displayVO.idNum}}</label>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="入职日期：">
                <label>{{displayVO.inDate}}</label>
              </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
      <Panel name="4">
        转移操作
        <div slot="content">
          <Form :label-width=150 v-model="transferNotice">
            <Row>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="公积金类型：" prop="hfType">
                  <Select v-model="transferNotice.hfType" style="width: 100%;" transfer>
                    <Option v-for="item in fundTypeList" :value="item.key" :key="item.key">{{item.value}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="任务：" prop="taskCategory">

                  {{this.$decode.hf_taskCategory(transferNotice.taskCategory) }}
                </Form-item>
              </Col>
            </Row>
            <Row>

              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="转出单位：" prop="transferOutUnit">
                  <Select v-model="transferNotice.transferOutUnit"
                          :label="transferNotice.transferOutUnit"
                  filterable
                  remote
                  :remote-method="handleTransferOutSearch"
                  @on-change="handleTransferOutChange"
                  :loading="loading"
                  style="width: 100%;" clearable transfer>
                     <Option v-for="item in transferOutUnitList" :value="item" :key="item">{{ item }}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="转出单位账号：" prop="transferOutUnitAccount">
                  <Input v-model="transferNotice.transferOutUnitAccount" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
            </Row>
            <Row>

              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="转入单位："  prop="transferInUnit">
                  <Select 
                  v-model="transferNotice.transferInUnit"
                  :label="transferNotice.transferInUnit"
                  filterable
                  remote
                  :remote-method="handleTransferInSearch"
                  @on-change="handleTransferInChange"
                  :loading="loading"
                  style="width: 100%;" clearable transfer>
                     <Option v-for="item in transferInUnitList" :value="item" :key="item">{{ item }}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="转入单位账号：" prop="transferInUnitAccount">
                  <Input v-model="transferNotice.transferInUnitAccount" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="转移日期：" prop="transferDate">
                  <DatePicker v-model="transferNotice.transferDate" placement="bottom-end" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="回单日期：" prop="feedbackDate">
                  <DatePicker v-model="transferNotice.feedbackDate" placement="bottom-end" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
                </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="操作日期：">
                  {{transferNotice.operateDate}}
                </Form-item>
              </Col>
              <!-- <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="打印日期：">
                  {{transferNotice.printDate}}
                </Form-item>
              </Col> -->
            </Row>
            <Row>
              <Col :sm="{span: 16}">
                <Form-item label="办理备注：">
                  <Input v-model="transferNotice.handleRemark" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
            </Row>
         </Form>
        </div>
      </Panel>
    </Collapse>

    <Row class="mt20">
      <Col :sm="{span:24}" class="tr">
        <Button type="primary" @click="submitTransferTask" :disabled="saveDisabled">保存</Button>
        <Button type="info" @click="printTransferTask">打印转移单</Button>
        <Button type="default" @click="notHandleTransfer" v-if="this.transferNotice.empTaskId!=null" :disabled="saveDisabled" >不需处理</Button>
        <Button type="warning" @click="goBack">返回</Button>
      </Col>
    </Row>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  //import EventType from '../../../store/event_types'
  import api from '../../../api/house_fund/employee_task/employee_transfer'
  import dict from '../../../api/dict_access/house_fund_dict'
  export default {
    data() {
      return {
        currentStep: 2,
        collapseInfo: [1, 2, 3, 4], //展开栏
        loading: false,
        displayVO: {
          empTaskId: 0,
          taskCategory: 0,
          canHandle: false,
          transferInUnit:'',
          transferOutUnit:'',
        },
        saveDisabled:false,
        fundTypeList: [],
        transferUnitDictList:[],
        transferInUnitList:[],
        transferOutUnitList:[],
        transferOutUnitAccountList: [],
        transferInUnitAccountList: [],
        transferNotice:{
          empTaskId:'',
          employeeId: '',
          companyId: '',
          hfType:'',
          processCategory:'',
          taskCategory:'',
          transferInUnit:'',
          transferInUnitAccount:'',
          transferOutUnit:'',
          transferOutUnitAccount:'',
          transferDate:'',
          feedbackDate:'',
          operateDate:'',
          handleRemark:'',
          taskStatus:1,
        },
        transferNotice1:{
          employeeId: '',
          companyId: '',
          hfType:'',
          processCategory:'',
          taskCategory:'',
          transferInUnit:'',
          transferInUnitAccount:'',
          transferOutUnit:'',
          transferOutUnitAccount:'',
          transferDate:'',
          feedbackDate:'',
          operateDate:'',
          handleRemark:'',
          taskStatus:1,
        },
      }
    },
    mounted() {
      this.initData();
 
     
    },
    computed: {
    },
    methods: {
      nextStep() {
        this.$router.push({name: 'employeeFundSpecialProgressThree'});
      },
    initData(){
        let params = {employeeId:this.$route.query.employeeId,
                      companyId:this.$route.query.companyId,
                      hfType:this.$route.query.hfType,
                      empTaskId:this.$route.query.empTaskId,
                      };
          api.queryComEmpTransferForm(params).then(data => {
          if (data.code == 200) {
            this.displayVO = data.data;
            if(data.data.empTaskTransferBo==null){
              this.transferNotice.companyId=params.companyId;
              this.transferNotice={};
            }else{
              this.transferNotice1 = data.data.empTaskTransferBo;
              this.getDictData();
            }
            if(this.transferNotice1.feedbackDate!=undefined ){
              this.saveDisabled=true;
            }
          } else {
            this.$Message.error(data.message);
          }
          if(this.transferNotice!=null){
              this.transferNotice.transferDate=new Date();
          }
        });
      },

      getDictData(){
        dict.getDictData().then(data => {
          if (data.code == 200) {
            this.fundTypeList = data.data.FundType;
            this.transferUnitDictList = data.data.FundOutUnit;
            
            if (!this.transferNotice1.transferOutUnit || this.transferNotice1.transferOutUnit == '') {
              this.transferUnitDictList.forEach((element, index, array) => {
                  this.transferOutUnitList.push(element);
              })
            } else {
              this.transferOutUnitList.push(this.transferNotice1.transferOutUnit);
              this.transferOutUnitAccountList.push(this.transferNotice1.transferOutUnitAccount);
            }

            if (!this.transferNotice1.transferInUnit || this.transferNotice1.transferInUnit == '') {
              this.transferUnitDictList.forEach((element, index, array) => {
                  this.transferInUnitList.push(element);
              })
            } else {
              this.transferInUnitList.push(this.transferNotice1.transferInUnit);
              this.transferInUnitAccountList.push(this.transferNotice1.transferInUnitAccount);
            }

            this.$utils.copy(this.transferNotice1, this.transferNotice);
            this.transferNotice.hfType=this.$route.query.hfType;
            if(this.transferNotice.hfType==undefined){
              this.transferNotice.hfType='1';
            }
//            setTimeout(this.setValue,500);
          } else {
            this.$Message.error(data.message);
          }
        });
      },

      setValue(){
       this.$utils.copy(this.transferNotice1,this.transferNotice);
       if(this.transferNotice.hfType==undefined){
            this.transferNotice.hfType='1';
       }
      },
      unique(array){
        array.sort();
        var re=[array[0]];
        for(var i = 1; i < array.length; i++){
          if( array[i] !== re[re.length-1])
          {
            re.push(array[i]);
          }
        }
        return re;
      },
      goBack() {
        this.$router.go(-1);
      },
      submitTransferTask(){
        if(this.transferNotice.hfType == null || this.transferNotice.hfType ==''){
           this.$Message.info('公积金类型要求必填！');
        }
        this.convertDate();
        api.submitTransferTask(this.transferNotice).then(
          data=>{
            this.$Message.success(data.message);
            this.transferNotice.empTaskId=data.data;
          }
        ).catch(error=>{
            console.log(error)
        });
      },
      notHandleTransfer(){
        let empTaskId=this.transferNotice.empTaskId;
        if(empTaskId!=null){
           api.notHandleTransfer({empTaskId:empTaskId}).then(
             data=>{
               if(data.code==200){
                  data=data.data;
                  this.$Message.success("不需办理操作成功");
                  history.go(-1);
               }
             }
           );
        }
      },
      printTransferTask(){
        let rows = [];
        if(this.checkData()==false){
          return false;
        }
        let empTaskId=this.transferNotice.empTaskId;
        if(empTaskId==null){
          this.$Message.error("请先操作保存转移表单信息！");
          return;
        }
        this.$Modal.confirm({
          title: "你确认操作打印转移通知书吗？",
          okText: '确定',
          cancelText: '取消',
          onOk: () => {
               this.convertDate();
                api.submitTransferTask(this.transferNotice).then(
                  data=>{
                    if(data.code==200){
                      this.transferNotice.empTaskId=data.data;
                      let params={empTaskId:this.transferNotice.empTaskId};
                      //api.printTransferTask(params);
                      api.getPrintTransfer(params).then(
                        data=>{
                          if(data.code==200){
                            let rows =[];
                            rows=data.data;
                            api.printTransferNote(rows);
                            this.saveDisabled=true;
                          }
                        }
                      )

                    }
                  }
                )
           }
        })
      },
      checkData(){
          if (!this.transferNotice.transferInUnit || this.transferNotice.transferInUnit==''  ) {
            this.$Message.error("转入单位不能为空！");
            return false;
          }
          if (!this.transferNotice.transferOutUnit || this.transferNotice.transferOutUnit==''  ) {
            this.$Message.error("转出单位不能为空！");
            return false;
          }
           if (!this.transferNotice.transferInUnitAccount || this.transferNotice.transferInUnitAccount==''  ) {
            this.$Message.error("转入单位账号不能为空！");
            return false;
          }
          if (!this.transferNotice.transferOutUnitAccount || this.transferNotice.transferOutUnitAccount==''  ) {
            this.$Message.error("转出单位账号不能为空！");
            return false;
          }
          if (this.transferNotice.transferOutUnit || this.transferNotice.transferInUnit){
              if(this.transferNotice.transferInUnit==this.transferNotice.transferOutUnit){
                  this.$Message.error("转出单位和转入单位不可以相同！");
                  return false;
              }
            }
          return true;
      },
      convertDate(){
        if (this.transferNotice.feedbackDate) {
          this.transferNotice.feedbackDate = this.$utils.formatDate(this.transferNotice.feedbackDate, "YYYY-MM-DD");
        }
        if (this.transferNotice.transferDate) {
          this.transferNotice.transferDate = this.$utils.formatDate(this.transferNotice.transferDate, "YYYY-MM-DD");
        }
      },
      handleTransferInSearch(value) {

        this.doSelect(value, this.transferInUnitList, this.transferInUnitAccountList, 2);
//        if (this.transferNotice.transferInUnitAccount != '') {
//          return true;
//        }
//        return false;
      },
      handleTransferOutSearch(value) {

        this.doSelect(value, this.transferOutUnitList, this.transferOutUnitAccountList, 1);
//        if (this.transferNotice.transferOutUnitAccount != '') {
//          return true;
//        }
//        return false;
      },
      handleTransferOutChange(value) {
        //this.transferNotice.transferOutUnitAccount = '';
        this.doSelect(value, this.transferOutUnitList, this.transferOutUnitAccountList, 1);
        // this.transferOutUnitList.forEach((element, index, array) => {
        //     if (element == value) {
        //       if (this.transferOutUnitAccountList && this.transferOutUnitAccountList.length > index) {
        //         this.transferNotice.transferOutUnitAccount = this.transferOutUnitAccountList[index];
        //       } else {
        //         this.doSelect(value, this.transferOutUnitList, this.transferOutUnitAccountList, 1);
        //       }
        //       return;
        //     }
        //   }
        // )

      },
      handleTransferInChange(value) {
        this.doSelect(value, this.transferInUnitList, this.transferInUnitAccountList, 2);
        // this.transferInUnitList.forEach((element, index, array) => {
        //     if (element == value) {
        //       if (this.transferInUnitAccountList && this.transferInUnitAccountList.length > index) {
        //         this.transferNotice.transferInUnitAccount = this.transferInUnitAccountList[index];
        //       } else {
        //         this.doSelect(value, this.transferInUnitList, this.transferInUnitAccountList, 2);
        //       }
        //       return;
        //     }
        //   }
        // )
      },

     doSelect(value, unitList, unitAccountList, type) {
        this.loading = true;
       // unitAccountList.length = 0;
        unitList.length=0;
        if (value == '' || value == undefined) {
          this.transferUnitDictList.forEach((element, index, array) => {
            unitList.push(element);
          })
        } else {
          api.comAccountQuery(
            {
              comAccountName: value,
              hfType: this.transferNotice.hfType,
              companyId:this.$route.query.companyId,
            }
          ).then(
            data => {
              if (data.code == 200) {
                if (data.data && data.data.length == 1) {
                  let isDuplicate=false;
                  unitList.forEach((element, index, array) => {
                      if( data.data[0].comAccountName == element){
                        isDuplicate = true;
                      }
                  })
                  if(isDuplicate==false){
                    unitList.push(data.data[0].comAccountName);
                    unitAccountList.push(data.data[0].hfComAccount);
                  }
                    if (type == 1) {
                      this.transferNotice.transferOutUnit = data.data[0].comAccountName;
                      this.transferNotice.transferOutUnitAccount = data.data[0].hfComAccount;
                    } else {
                      this.transferNotice.transferInUnit = data.data[0].comAccountName;
                      this.transferNotice.transferInUnitAccount = data.data[0].hfComAccount;
                    }
                }
              } else {
                this.$Message.error(data.message);
              }
            }
          )
        }
        this.loading = false;
      },
      doSearch(value, unitList, unitAccountList, type) {
        this.loading = true;
        unitList.length = 0;
        unitAccountList.length = 0;
        if (value == '') {
          this.transferUnitDictList.forEach((element, index, array) => {
            unitList.push(element);
          })
        } else {
          api.comAccountQuery(
            {
              comAccountName: value,
              hfType: this.transferNotice.hfType,
            }
          ).then(
            data => {
              if (data.code == 200) {
                if (data.data && data.data.length > 0) {
                  data.data.forEach((element, index, array) => {
                    unitList.push(element.comAccountName);
                    unitAccountList.push(element.hfComAccount);
                  })

                  if (unitList.length == 1) {
                    if (type == 1) {
                      this.transferNotice.transferOutUnitAccount = unitAccountList[0];
                    } else {
                      this.transferNotice.transferInUnitAccount = unitAccountList[0];
                    }
                  }
                } else {
                  unitList.push(value);
                  if (type == 1) {
                    if (value == this.transferNotice1.transferOutUnit) {
                      unitAccountList.push(this.transferNotice1.transferOutUnitAccount);
                      this.transferNotice.transferOutUnitAccount = unitAccountList[0];
                    }
                  } else {
                    if (value == this.transferNotice1.transferInUnit) {
                      unitAccountList.push(this.transferNotice1.transferInUnitAccount);
                      this.transferNotice.transferInUnitAccount = unitAccountList[0];
                    }
                  }
                }
              } else {
                this.$Message.error(data.message);
              }
            }
          )
        }
        this.loading = false;
      },
    }
  }
</script>
