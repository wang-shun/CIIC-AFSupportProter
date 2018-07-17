<template>
  <div>
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        支付批次查询
        <div slot="content">
          <Form ref="payBatchSearchData" :model="payBatchSearchData" :label-width=150>
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="社保账户类型：" prop="accountType">
                  <Select v-model="payBatchSearchData.accountType" clearable style="width: 100%;" transfer>
                    <Option value="" label="全部"></Option>
                    <Option v-for="item in accountTypeList" :value="item.key" :key="item.key" :label="item.value"></Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="出账批号：" prop="paymentBatchNum">
                  <Input v-model="payBatchSearchData.paymentBatchNum" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:0}" :md="{span: 0}" :lg="{span: 8}">
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="支付年月：">
                  <Row>
                    <Col span="10">
                      <Form-item prop="paymentMonthMin">
                        <DatePicker v-model="payBatchSearchData.paymentMonthMin" type="month" format="yyyyMM" placement="bottom" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
                        <!--<input type="text" v-model="payBatchSearchData.paymentMonthMin" hidden>-->
                      </Form-item>
                    </Col>
                    <Col span="2" offset="2">-</Col>
                    <Col span="10">
                    <Form-item prop="paymentMonthMax">
                      <DatePicker v-model="payBatchSearchData.paymentMonthMax" type="month" format="yyyyMM" placement="bottom" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
                        <!--<input type="text" v-model="payBatchSearchData.paymentMonthMax" hidden>-->
                    </Form-item>
                    </Col>
                  </Row>
                  <!-- <DatePicker v-model="payBatchInfo.payDate" type="daterange" format="yyyy-MM" placement="bottom" placeholder="选择日期" style="width: 100%;" transfer></DatePicker> -->
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="支付状态：" prop="paymentState">
                  <Select v-model="payBatchSearchData.paymentState" clearable style="width: 100%;" transfer>
                    <Option v-for="item in staticPayBatchSearchData.paymentStateList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span: 24}" class="tr">
                <Button type="primary" @click="payBatchHandlePageNum(1)" icon="ios-search">查询</Button>
                <Button type="warning" @click="resetSearchCondition('payBatchSearchData')">重置</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>

    <Form>
      <Row class="mt20">
        <Col :sm="{span: 24}">
        
          <!-- <Button type="primary" @click="goAddPayment()">创建支付批次</Button> -->
          <Button type="primary" @click="goCreatePaymentBatch()">创建支付批次</Button>

          <Button type="primary" @click="enquireFinanceComAccount()">询问财务可付状态</Button>
        </Col>
      </Row>

        <Row class="mt20">
            <Col :sm="{span:24}">
                <Table stripe
                    border ref="payBatchselection"
                    :columns="payBatchColumns"
                    :data="payBatchData">
                </Table>
                <Page
                    class="pageSize"
                    @on-change="payBatchHandlePageNum"
                    @on-page-size-change="payBatchHandlePageSite"
                    :total="payBatchPageData.total"
                    :page-size="payBatchPageData.pageSize"
                    :page-size-opts="payBatchPageData.pageSizeOpts"
                    :current="payBatchPageData.pageNum"
                    show-sizer show-total>
                </Page>
            </Col>
        </Row>
        <Row class="mt20">
        </Row>
        <Row class="mt20">
        </Row>
        <Row class="mt20">
        </Row>
    </Form>

    <!-- 申请支付 -->
    <Modal v-model="applyPayData.isShow" width="560">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>申请确认</span>
      </p>
      <Form :label-width=0>
        <Row class="mt20" type="flex" justify="start">
          <Col :sm="{span: 24}">
            <Form-item label="">
              <Input v-model="applyPayData.applyRemark" type="textarea" :rows="5"  :maxlength='200' placeholder="请填写申请备注"></Input>
            </Form-item>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="error" size="large"  @click="doApplyPay()">申请</Button>
      </div>
    </Modal>

    <!-- 删除批次 -->
    <Modal v-model="delPaymentData.isShow" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <p>该批次将被删除</p>
        <p>是否继续</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large"  @click="doDelPayment()">删除</Button>
      </div>
    </Modal>

    <!-- 增加批次 -->
    <Modal v-model="addPaymentData.isShow" width="650">
      <Form :label-width=120>
        <Row class="mt20">
          <Col :sm="{span: 12}">
            <Form-item label="支付年月：" prop="paymentMonthOfAdd">
              <label>{{addPaymentData.paymentMonth}}</label>
            </Form-item>
          </Col>
          <Col :sm="{span: 12}">
            <Form-item label="社保账户类型：" prop="accountTypeOfAdd">
              <Select v-model="addPaymentData.accountType" clearable style="width: 100%;" transfer>
                <Option value="" label="全部"></Option>
                <Option v-for="item in accountTypeList" :value="item.key" :key="item.key" :label="item.value"></Option>
              </Select>
            </Form-item>
          </Col>
        </Row>
        <Row class="mt20">
          <!-- <Col :sm="{span: 12}">
            <Form-item label="出账批号：" prop="paymentBatchNumOfAdd">
              <input type="text" :maxlength="20" v-model="addPaymentData.paymentBatchNum" >
            </Form-item>
          </Col> -->
        </Row>
      </Form>

      <div slot="footer">
          <Button type="text"  @click="closeAddPayment()">取消</Button>
          <Button type="primary"  @click="doAddPayment()">保存</Button>
      </div>
    </Modal>

  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import customerModal from '../../../common_control/CustomerModal.vue'
  import EventType from '../../../../store/event_types'
  import payBatchApi from '../../../../api/social_security/payment_batch'
  import dict from '../../../../api/dict_access/social_security_dict'
  import sessionData from '../../../../api/session-data'
import SocialSecurityPayVue from '../SocialSecurityPay.vue';


  export default {
    components: {customerModal},
    data() {
      return{
        collapseInfo: [1], //展开栏
        accountTypeList: [],
        payBatchSearchData: {
          ssAccountType: '',
          paymentId: '',
          companyId: '',
          paymentMonthMin: '',
          paymentMonthMinShow: '',
          paymentMonthMax: '',
          paymentMonthMaxShow: '',
          paymentState: '',
          comAccountId: ''
        },
        staticPayBatchSearchData: {

          paymentStateList: [
            //{value: '', label: '清空'},
            {value: '', label: '全部'},
            // {value: '1', label: '未到帐'},
            // {value: '2', label: '无需支付'},
            {value: '3', label: '可付'},
            {value: '4', label: '申请中'},
            {value: '5', label: '内部审批批退'},
            {value: '6', label: '已申请到财务部'},
            {value: '7', label: '财务部批退'},
            {value: '8', label: '财务部支付成功'},
          ],

        },

        isShowCustomerName: false,
        isShowProgress: false,

        payBatchColumns: [
          {title: '操作', key: 'operator', width:200, align: 'left',fixed:'left',
            render: (h, params) => {
              let b=[];
              let paymentId = params.row.paymentId;
              let paymentState = params.row.paymentState;
              b.push(h('Button', {
                    props: {type: 'success', size: 'small'},
                    style: {margin: '0 auto 0 5px'},
                    on: {
                      click: () => {
                        this.goPaymentCom(paymentId);
                      }
                    }
                  }, '查看'));
              if( !(paymentState != "3" && paymentState != "5" && paymentState != "7")){
                b.push(h('Button', {
                  props: {type: 'error', size: 'small'},
                  style: {margin: '0 auto 0 5px'},
                  on: {
                    click: () => {
                      this.goDelPayment(paymentId,paymentState)
                    }
                  }
                }, '删除'));
              }
              if(params.row.totalAccount>0 && !(paymentState != "3" && paymentState != "5" && paymentState != "7")){
                  b.push(h('Button', {
                    props: {type: 'success', size: 'small'},
                    style: {margin: '0 auto 0 5px'},
                    on: {
                      click: () => {
                        this.goApplyPay(paymentId,paymentState)
                      }
                    }
                  }, '申请支付'));
              }
              return h('div', b);
            }

          },
          {title: '出账批次号', key: 'paymentBatchNum', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.paymentBatchNum),
              ]);
            }
          },
          {title: '申请支付总金额', key: 'totalApplicationAmount', width: 140, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.totalApplicationAmount),
              ]);
            }
          },
          {title: '总雇员数', key: 'totalEmpCount', width: 100, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.totalEmpCount),
              ]);
            }
          },
          {title: '支付年月', key: 'paymentMonth', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.paymentMonth),
              ]);
            }
          },
          {title: '账户/客户总数', key: 'paymentMonth', width: 130, align: 'center',
            render: (h, params) => {
              let totalAccount = params.row.totalAccount;
              let totalCom = params.row.totalCom;

              return h('div', {style: {textAlign: 'left'}}, [
                h('span', totalAccount+"/"+totalCom),
              ]);
            }
          },
          {title: '支付状态', key: 'paymentStateName', width: 180, align: 'center',
            render: (h, params) => {
              let paymentState = params.row.paymentState;
              let paymentStateName = this.getPaymentStateName(paymentState);

              return h('div', {style: {textAlign: 'left'}}, [
                h('span', paymentStateName),
              ]);
            }
          },
          {title: '申请人', key: 'requestUser', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.requestUser),
              ]);
            }
          },
          {title: '申请日期', key: 'requestDate', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.requestDate),
              ]);
            }
          },
          {title: '财务支付日期', key: 'financePaymentDate', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.financePaymentDate),
              ]);
            }
          },
          {title: '社保账户类型', key: 'ssAccountType', width: 180, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', this.$decode.hf_accountType(params.row.accountType)),
              ]);
            }
          },
          
        ],
        payBatchData: [],
        payBatchPageData: {
          total: 0,
          pageNum: 1,
          pageSize: this.$utils.DEFAULT_PAGE_SIZE,
          pageSizeOpts: this.$utils.DEFAULT_PAGE_SIZE_OPTS
        },
        //申请支付
        applyPayData:{
          isShow : false,
          paymentId:'',
          applyRemark:'',
        },
        //删除批次
        delPaymentData:{
          isShow : false,
          paymentId:'',

        },
        //新增批次
        addPaymentData:{
          isShow : false,
          paymentMonth : '',
          paymentBatchNum : '',
          accountType : ''
        },
      }
    },
    mounted() {
      sessionData.getJsonDataFromSession('paymentBatch.payBatchSearchData', this.payBatchSearchData);
      sessionData.getJsonDataFromSession('paymentBatch.payBatchPageData', this.payBatchPageData);
      this.paymentBatchQuery();
      //this.payBatchHandlePageNum(1);
      this.loadDict();
    },
    computed: {

    },
    methods: {
      //...mapActions('socialSecurityPay', [EventType.SOCIALSECURITYPAYTYPE]),
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
      goPaymentNotice() {
        this.$router.push({name: 'paymentnotice'})
      },
      goPaymentCom(paymentId) {
        sessionStorage.setItem("PaymentBatch_paymentId",paymentId);
        this.$emit('switchTab','paymentCom');
      },
      cancel () {

      },
      payBatchHandlePageNum(val) {
        this.payBatchPageData.pageNum = val;
        this.paymentBatchQuery();
      },
      loadDict(){
        dict.getDictData().then(data => {
          if (data.code == 200) {
            this.accountTypeList = data.data.SocialSecurityAccountType;
          }
        });
      },
      payBatchHandlePageSite(val) {
        this.payBatchPageData.pageSize = val;
        this.paymentBatchQuery();
      },
      // 选中项发生变化时就会触发
      payBatchSelectionChange(selection) {
        this.payBatchPageData = selection;
      },
      //查询页面数据
      paymentBatchQuery() {
         sessionData.setJsonDataToSession('paymentBatch.payBatchSearchData', this.payBatchSearchData);
         sessionData.setJsonDataToSession('paymentBatch.payBatchPageData', this.payBatchPageData);
     
        if (this.payBatchSearchData.paymentMonthMin && this.payBatchSearchData.paymentMonthMin.length != 6) {
          this.payBatchSearchData.paymentMonthMin = this.$utils.formatDate(this.payBatchSearchData.paymentMonthMin, 'YYYYMM');
        }

        if (this.payBatchSearchData.paymentMonthMax && this.payBatchSearchData.paymentMonthMax.length != 6) {
          this.payBatchSearchData.paymentMonthMax = this.$utils.formatDate(this.payBatchSearchData.paymentMonthMax, 'YYYYMM');
        }

        // 处理参数
        var params = {};
        {
          // 清除 '[全部]'
          params = this.$utils.clear(this.payBatchSearchData);
          // 清除空字符串
          params = this.$utils.clear(params, '');
        }

        payBatchApi.paymentBatchQuery({
          pageSize: this.payBatchPageData.pageSize,
          pageNum: this.payBatchPageData.pageNum,
          params: params,
        }).then(data => {
          this.payBatchData = data.data;
          this.payBatchPageData.total = data.total;
        })

      },

      getPaymentStateName(paymentState) {
        var paymentStateMap = new Map();
        paymentStateMap.set("1","未到帐");
        paymentStateMap.set("2","无需支付");
        paymentStateMap.set("3","可付");
        paymentStateMap.set("4","申请中");
        paymentStateMap.set("5","内部审批批退");
        paymentStateMap.set("6","已申请到财务部");
        paymentStateMap.set("7","财务部批退");
        paymentStateMap.set("8","财务部支付成功");

        return paymentStateMap.get(paymentState);
      },
      //申请支付
      goApplyPay(paymentId,paymentState) {
        //验证可操作性
        if(paymentState != "3" && paymentState != "5" && paymentState != "7"){
          this.$Message.info("只有可付和批退状态的批次可以申请支付");
          return;
        }

        this.applyPayData.paymentId = paymentId;
        this.applyPayData.applyRemark = '';
        this.applyPayData.isShow = true;

      },
      doApplyPay() {
        let paymentId = this.applyPayData.paymentId;
        let applyRemark = this.applyPayData.applyRemark;

        payBatchApi.doApplyPay({
          paymentId: paymentId,
          applyRemark: applyRemark,
        }).then(data => {
          if(data.code == "0"){
            this.$Message.info("申请成功");
            this.closeApplyPay();
            //重新查询
            this.paymentBatchQuery()

          }else{
            this.$Message.info(data.message);
          }
        })
      },
      closeApplyPay(){
        this.applyPayData.isShow = false;
      },

      //删除批次
      goDelPayment(paymentId,paymentState) {
        //验证可操作性
        if(paymentState != "3" && paymentState != "5" && paymentState != "7"){
          this.$Message.info("只有可付和批退状态的批次可以删除");
          return;
        }
        this.delPaymentData.isShow = true;
        this.delPaymentData.paymentId = paymentId;

      },
      doDelPayment() {
        let paymentId = this.delPaymentData.paymentId;

        payBatchApi.doDelPayment({
          paymentId: paymentId,
        }).then(data => {
          if(data.code == "0"){
            this.$Message.info("删除成功");
            this.closeDelPayment();
            //重新查询
            this.paymentBatchQuery()

          }else{
            this.$Message.info(data.message);
          }
        })
      },
      closeDelPayment(){
        this.delPaymentData.isShow = false;
      },


      //新增批次
      goAddPayment() {
        //获取支付年月
         payBatchApi.getPaymentMonth({
        }).then(data => {
          if(data.code == "0"){
            this.addPaymentData.paymentMonth = data.data;
            this.addPaymentData.paymentBatchNum = '';
            this.addPaymentData.accountType = '';
            this.addPaymentData.isShow = true;
          }else{
            this.$Message.info(data.message);
          }
        })
      },
      goCreatePaymentBatch(){
        this.$router.push({name:"createPaymentBatch"});
      },
      doAddPayment() {
        let paymentMonth = this.addPaymentData.paymentMonth;
        let paymentBatchNum = this.addPaymentData.paymentBatchNum;
        let accountType = this.addPaymentData.accountType;
        if(paymentMonth == null || paymentMonth == ""){
          this.$Message.info("支付年月不可为空");
          return;
        }
        // if(paymentBatchNum == null || paymentBatchNum == ""){
        //   this.$Message.info("出账批号不可为空");
        //   return;
        // }
        if(accountType == null || accountType == ""){
          this.$Message.info("账户类型不可为空");
          return;
        }
        payBatchApi.addPayment({
          paymentMonth: paymentMonth,
          paymentBatchNum: paymentBatchNum,
          accountType: accountType,
        }).then(data => {
          if(data.code == "0"){
            this.$Message.info("添加成功");
            this.closeAddPayment();
            //重新查询
            //this.paymentBatchQuery()
            this.payBatchHandlePageNum(1);
          }else{
            this.$Message.info(data.message);
          }
        })
      },
      closeAddPayment(){
        this.addPaymentData.isShow = false;
      },
      enquireFinanceComAccount(){
          let y;
          let m=new Date().getMonth()+1;
        this.$Modal.confirm({
              title: '手动询问结算中心是否可付',
              content: `系统将执行${new Date().getFullYear()}年${new Date().getMonth()}月份所有未到款企业账户的财务询问，执行时间较长，您确认操作吗？`,
              onOk:function(){
                let userInfo = localStorage.getItem('userInfo');
                let params = {
                  comAccountId:'0',
                  ssMonth:'ss',
                  generalMethod:'enquireFinanceComAccount',
                };
                payBatchApi.enquireFinanceComAccount(params).then(data=>{
                  if(data.code==0)
                  {
                    this.$Message.success("操作成功！请等待几分钟后，再到查询您要支付的企业账户");
                  }else{
                    this.$Message.error("系统正在执行中，请等待！");
                  }
              })
              }, 
          });
      },
    }
  }
</script>
