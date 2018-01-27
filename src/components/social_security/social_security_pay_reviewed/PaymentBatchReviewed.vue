<template>
  <div>
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        社保支付审核
        <div slot="content">
          <Form ref="payBatchSearchData" :model="payBatchSearchData" :label-width=150>
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="社保账户类型：" prop="accountType">
                  <Select v-model="payBatchSearchData.accountType" clearable style="width: 100%;" transfer>
                    <Option v-for="item in staticPayBatchSearchData.accountTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
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
                        <DatePicker v-model="payBatchSearchData.paymentMonthMinShow" type="month" format="yyyyMM" placement="bottom" placeholder="选择日期" style="width: 100%;" transfer @on-change="payBatchSearchData.paymentMonthMin=$event"></DatePicker>
                        <input type="text" v-model="payBatchSearchData.paymentMonthMin" hidden>
                      </Form-item>
                    </Col>
                    <Col span="2" offset="2">-</Col>
                    <Col span="10">
                    <Form-item prop="paymentMonthMax">
                      <DatePicker v-model="payBatchSearchData.paymentMonthMaxShow" type="month" format="yyyyMM" placement="bottom" placeholder="选择日期" style="width: 100%;" transfer @on-change="payBatchSearchData.paymentMonthMax=$event"></DatePicker>
                        <input type="text" v-model="payBatchSearchData.paymentMonthMax" hidden>
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

    <!-- 审核通过 -->
    <Modal v-model="reviewdePassData.isShow" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>通过确认</span>
      </p>
      <div style="text-align:center">
        <p>将审核通过</p>
        <p>是否继续</p>
      </div>
      <div slot="footer">
        <Button type="Text"  @click="closeReviewdePass()">取消</Button>
        <Button type="success" size="large"  @click="doReviewdePass()">通过</Button>
      </div>
    </Modal>

    <!-- 批退 -->
    <Modal v-model="rejectionData.isShow" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>批退确认</span>
      </p>
      <Form :label-width=0>
        <Row class="mt20" type="flex" justify="start">
          <Col :sm="{span: 24}">
            <Form-item label="">
              <Input v-model="rejectionData.rejectionRemark" type="textarea" :rows="5"  maxlength=200 placeholder="请填写批退备注"></Input>
            </Form-item>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="error" size="large"  @click="doRejection()">批退</Button>
      </div>
    </Modal>


  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import customerModal from '../../common_control/CustomerModal.vue'
  import EventType from '../../../store/event_types'
  import reviewedBatchApi from '../../../api/social_security/payment_batch_reviewed'

  export default {
    components: {customerModal},
    data() {
      return{
        collapseInfo: [1], //展开栏
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

          accountTypeList: [
            {value: '', label: '全部'},
            {value: '1', label: '中智大库'},
            {value: '2', label: '中智外包'},
            {value: '3', label: '独立户'}
          ],
          paymentStateList: [
            {value: '', label: '全部'},
            {value: '4', label: '申请中'},
            {value: '6', label: '已申请到财务部'},
            {value: '8', label: '财务部支付成功'},
          ],

        },

        isShowCustomerName: false,
        isShowProgress: false,

        payBatchColumns: [
          {title: '操作', key: 'operator', width: 220, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {type: 'success', size: 'small'},
                  style: {margin: '0 auto'},
                  on: {
                    click: () => {
                      let paymentId = params.row.paymentId;
                      this.goPaymentComReviewed(paymentId);
                    }
                  }
                }, '查看'),
                h('Button', {
                  props: {type: 'success', size: 'small'},
                  style: {margin: '0 auto 0 10px'},
                  on: {
                    click: () => {
                      let paymentId = params.row.paymentId;
                      let paymentState = params.row.paymentState;
                      this.goReviewdePass(paymentId,paymentState);
                    }
                  }
                }, '审批通过'),
                h('Button', {
                  props: {type: 'error', size: 'small'},
                  style: {margin: '0 auto 0 10px'},
                  on: {
                    click: () => {
                      let paymentId = params.row.paymentId;
                      let paymentState = params.row.paymentState;
                      this.goRejection(paymentId,paymentState);
                    }
                  }
                }, '批退'),
              ]);
            }
          },
          {title: '出账批次号', key: 'paymentBatchNum', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.paymentBatchNum),
              ]);
            }
          },
          {title: '申请支付总金额', key: 'totalApplicationAmount', width: 130, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.totalApplicationAmount),
              ]);
            }
          },
          {title: '总雇员数', key: 'totalEmpCount', width: 120, align: 'center',
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
          {title: '账户/客户总数', key: 'paymentMonth', width: 120, align: 'center',
            render: (h, params) => {
              let totalAccount = params.row.totalAccount;
              let totalCom = params.row.totalCom;

              return h('div', {style: {textAlign: 'left'}}, [
                h('span', totalAccount+"/"+totalCom),
              ]);
            }
          },
          {title: '支付状态', key: 'paymentStateName', width: 140, align: 'center',
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
          {title: '申请备注', key: 'requestDate', width: 260, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.applyRemark),
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
          {title: '社保账户类型', key: 'accountType', width: 120, align: 'center',
            render: (h, params) => {
              let accountType = params.row.accountType;
              let accountTypeName = "";
              if(accountType == 1){
                  accountTypeName = "中智大库"
              }else if(accountType == 2){
                  accountTypeName = "中智外包"
              }else{
                  accountTypeName = "独立户"
              }

              return h('div', {style: {textAlign: 'left'}}, [
                h('span', accountTypeName),
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
        //审核通过
        reviewdePassData:{
          isShow : false,
          paymentId:'',

        },
        //批退
        rejectionData:{
          isShow : false,
          paymentId:'',
          rejectionRemark:'',

        },
      }
    },
    mounted() {
      this[EventType.SOCIALSECURITYPAYTYPE]();
      this.payBatchHandlePageNum(1);
    },
    computed: {
      ...mapState('socialSecurityPay', {
          data:state=>state.data
      })
    },
    methods: {
      ...mapActions('socialSecurityPay', [EventType.SOCIALSECURITYPAYTYPE]),
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
      goPaymentNotice() {
        this.$router.push({name: 'paymentNotice'})
      },
      ok () {

      },
      cancel () {

      },
      payBatchHandlePageNum(val) {
        this.payBatchPageData.pageNum = val;
        this.paymentBatchQuery();
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
        // 处理参数
        var params = {};
        {
          // 清除 '[全部]'
          params = this.$utils.clear(this.payBatchSearchData);
          // 清除空字符串
          params = this.$utils.clear(params, '');
        }

        reviewedBatchApi.paymentBatchQuery({
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
      //审批通过
      goReviewdePass(paymentId,paymentState) {
        //验证可操作性
        if(paymentState != "4"){
          alert("只有申请中状态的批次可以审核");
          return;
        }
        this.reviewdePassData.isShow = true;
        this.reviewdePassData.paymentId = paymentId;

      },
      doReviewdePass() {
        let paymentId = this.reviewdePassData.paymentId;

        reviewedBatchApi.doReviewdePass({
          paymentId: paymentId,
        }).then(data => {
          if(data.code == "0"){
            alert("审核成功");
            this.closeReviewdePass();
            //重新查询
            this.paymentBatchQuery()

          }else{
            alert(data.message);
          }
        })
      },
      closeReviewdePass(){
        this.reviewdePassData.isShow = false;
      },

      //批退
      goRejection(paymentId,paymentState) {
        //验证可操作性
        if(paymentState != "4"){
          alert("只有申请中状态的批次可以批退");
          return;
        }

        this.rejectionData.rejectionRemark = '';
        this.rejectionData.paymentId = paymentId;
        this.rejectionData.isShow = true;

      },
      doRejection() {
        let paymentId = this.rejectionData.paymentId;
        let rejectionRemark = this.rejectionData.rejectionRemark;

        reviewedBatchApi.doRejection({
          paymentId: paymentId,
          rejectionRemark: rejectionRemark,
        }).then(data => {
          if(data.code == "0"){
            alert("批退成功");
            this.closeRejection();
            //重新查询
            this.paymentBatchQuery()

          }else{
            alert(data.message);
          }
        })
      },
      closeRejection(){
        this.rejectionData.isShow = false;
      },

      goPaymentComReviewed(paymentId) {
        window.sessionStorage.setItem("paymentComReviewed_paymentId", paymentId)
        this.$router.push({name: 'paymentComReviewed'})
      },
    }
  }
</script>
