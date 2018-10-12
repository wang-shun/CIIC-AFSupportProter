<template>
  <div>
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        审核批次明细
        <div slot="content">
          <Form ref="payComSearchData" :model="payComSearchData" :label-width=150>
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户编号：" prop="companyId">
                  <Input v-model="payComSearchData.companyId" placeholder="请输入..."></Input>
                </Form-item>
              </Col>

              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="企业社保账号：" prop="comAccountId">
                  <Input v-model="payComSearchData.comAccountId" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span: 24}" class="tr">
                <Button type="primary" @click="payComHandlePageNum(1)" icon="ios-search">查询</Button>
                <Button type="warning" @click="resetSearchCondition('payComSearchData')">重置</Button>
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
                    border ref="payComSelection"
                    :columns="payComColumns"
                    :data="payComData"
                    >
                </Table>
                <Page
                    class="pageSize"
                    @on-change="payComHandlePageNum"
                    @on-page-size-change="payComHandlePageSite"
                    :total="payComPageData.total"
                    :page-size="payComPageData.pageSize"
                    :page-size-opts="payComPageData.pageSizeOpts"
                    :current="payComPageData.pageNum"
                    show-sizer show-total>
                </Page>
            </Col>
        </Row>
        <Row class="mt20">
          <Button type="warning" @click="goBack">返回</Button>
        </Row>
        <Row class="mt20">
        </Row>
        <Row class="mt20">
        </Row>
    </Form>
  </div>
</template>
<script>
import {localStorage, sessionStorage} from '../../../assets/api/storage'
  import {mapState, mapGetters, mapActions} from 'vuex'
  import customerModal from '../../common_control/CustomerModal.vue'
  import EventType from '../../../store/event_types'
  import payComReviewedApi from '../../../api/social_security/payment_com_reviewed'

  export default {
    components: {customerModal},
    data() {
      return{
        collapseInfo: [1], //展开栏
        payComSearchData: {
          paymentId: '',
          companyId: '',
          comAccountId: ''
        },
        staticPayComSearchData: {

          ssAccountTypeList: [
            {value: '1', label: '中智大库'},
            {value: '2', label: '中智外包'},
            {value: '3', label: '独立户'}
          ],
          paymentStateList: [
            //{value: '', label: '清空'},
            {value: '1', label: '未到帐'},
            {value: '2', label: '无需支付'},
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

        payComColumns: [

          {title: '操作', key: 'operator', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {type: 'success', size: 'small'},
                  style: {margin: '0 auto 0 10px'},
                  on: {
                    click: () => {
                     let paymentComId = params.row.paymentComId;
                     let comAccountId = params.row.comAccountId;
                     let paymentMonth = params.row.paymentMonth;
                     let paymentState = params.row.paymentState;
                     this.goPaymentNotice(paymentComId,comAccountId,paymentMonth,paymentState,params.row.ssAccount);
                    }
                  }
                }, '付款通知书')
              ]);
            }
          },
          {title: '出账批次号', key: 'paymentBatchNum', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.paymentBatchNum),
              ]);
            }
          },
          {title: '客户编号', key: 'companyId', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.companyId),
              ]);
            }
          },
          {title: '客户名称', key: 'title', width: 250, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.title),
              ]);
            }
          },
          {title: '企业社保账户', key: 'ssAccount', width: 180, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.ssAccount),
              ]);
            }
          },
          {title: '社保账户类型', key: 'ssAccountType', width: 120, align: 'center',
            render: (h, params) => {
              let ssAccountType = params.row.accountType;
              let accountTypeName = "";
              if(ssAccountType == 1){
                  accountTypeName = "中智大库"
              }else if(ssAccountType == 2){
                  accountTypeName = "中智外包"
              }else{
                  accountTypeName = "独立户"
              }

              return h('div', {style: {textAlign: 'left'}}, [
                h('span', accountTypeName),
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
          {title: '支付状态', key: 'paymentStateName', width: 180, align: 'center',
            render: (h, params) => {
              let paymentState = params.row.paymentState;
              let paymentStateName = this.getPaymentStateName(paymentState);

              return h('div', {style: {textAlign: 'left'}}, [
                h('span', paymentStateName),
              ]);
            }
          },
          {title: '企业部分金额', key: 'totalComPayAmount', width: 130, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.totalComPayAmount),
              ]);
            }
          },
          {title: '雇员部分金额', key: 'totalEmpPayAmount', width: 130, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.totalEmpPayAmount),
              ]);
            }
          },
          {title: '应缴纳金额', key: 'oughtAmount', width: 130, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.oughtAmount),
              ]);
            }
          },
          {title: '额外金', key: 'extraAmount', width: 130, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.extraAmount),
              ]);
            }
          },
          {title: '退账抵扣费用', key: 'refundDeducted', width: 130, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.refundDeducted),
              ]);
            }
          },
          {title: '调整抵扣费用', key: 'adjustDeducted', width: 130, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.adjustDeducted),
              ]);
            }
          },
          {title: '申请支付总金额', key: 'totalPayAmount', width: 130, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.totalPayAmount),
              ]);
            }
          },
          {title: '财务支付日期', key: 'actualPaymentDate', width: 180, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.actualPaymentDate),
              ]);
            }
          },
          {title: '额外金备注', key: 'remark', width: 250, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.remark),
              ]);
            }
          }
        ],
        payComData: [],
        payComPageData: {
          total: 0,
          pageNum: 1,
          pageSize: this.$utils.DEFAULT_PAGE_SIZE,
          pageSizeOpts: this.$utils.DEFAULT_PAGE_SIZE_OPTS
        }
      }
    },
    mounted() {
      this[EventType.SOCIALSECURITYPAYTYPE]();
      this.payComSearchData.paymentId = sessionStorage.getItem("paymentComReviewed_paymentId");
      this.payComHandlePageNum(1);
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
      goBack() {
        this.$router.push({name: 'paymentBatchReviewed'})
      },
      goPaymentNotice(paymentComId,comAccountId,paymentMonth,paymentState,ssAccount) {
        sessionStorage.setItem("paymentnotice_paymentComId", paymentComId)
        sessionStorage.setItem("paymentnotice_comAccountId", comAccountId)
        sessionStorage.setItem("paymentnotice_paymentMonth", paymentMonth)
        sessionStorage.setItem("paymentnotice_paymentState", paymentState);
        sessionStorage.setItem("paymentnotice_ssAccount", ssAccount);
        this.$router.push({name: 'paymentNotice'})
      },
      ok () {

      },
      cancel () {

      },
      payComHandlePageNum(val) {
        this.payComPageData.pageNum = val;
        this.paymentComQuery();
      },
      payComHandlePageSite(val) {
        this.payComPageData.pageSize = val;
        this.paymentComQuery();
      },
      // 选中项发生变化时就会触发
      // payComSelectionChange(selection) {
      //   this.payComPageData = selection;
      // },
      //查询页面数据
      paymentComQuery() {
        // 处理参数
        var params = {};
        {
          // 清除 '[全部]'
          params = this.$utils.clear(this.payComSearchData);
          // 清除空字符串
          params = this.$utils.clear(params, '');
        }

        payComReviewedApi.paymentComQuery({
          pageSize: this.payComPageData.pageSize,
          pageNum: this.payComPageData.pageNum,
          params: params,
        }).then(data => {
          this.payComData = data.data;
          this.payComPageData.total = data.total;
        })

      },
      //获得支付状态
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
    }
  }
</script>
