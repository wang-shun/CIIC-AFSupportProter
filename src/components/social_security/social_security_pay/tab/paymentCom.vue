<template>
  <div>
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        企业账户管理
        <div slot="content">
          <Form ref="payComSearchData" :model="payComSearchData" :label-width=150>
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="企业社保账户分类：" prop="ssAccountType">
                  <Select v-model="payComSearchData.ssAccountType" clearable style="width: 100%;" transfer>
                    <Option v-for="item in staticPayComSearchData.ssAccountTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="出账批号：" prop="paymentBatchNum">
                  <Input v-model="payComSearchData.paymentBatchNum" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户编号：" prop="companyId">
                  <Input v-model="payComSearchData.companyId" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="支付年月：">
                  <Row>
                    <Col span="10">
                      <Form-item prop="paymentMonthMin">
                        <DatePicker v-model="payComSearchData.paymentMonthMinShow" type="month" format="yyyyMM" placement="bottom" placeholder="选择日期" style="width: 100%;" transfer @on-change="payComSearchData.paymentMonthMin=$event"></DatePicker>
                        <input type="text" v-model="payComSearchData.paymentMonthMin" hidden>
                      </Form-item>
                    </Col>
                    <Col span="2" offset="2">-</Col>
                    <Col span="10">
                    <Form-item prop="paymentMonthMax">
                      <DatePicker v-model="payComSearchData.paymentMonthMaxShow" type="month" format="yyyyMM" placement="bottom" placeholder="选择日期" style="width: 100%;" transfer @on-change="payComSearchData.paymentMonthMax=$event"></DatePicker>
                        <input type="text" v-model="payComSearchData.paymentMonthMax" hidden>
                    </Form-item>
                    </Col>
                  </Row>                   
                  <!-- <DatePicker v-model="payComInfo.payDate" type="daterange" format="yyyy-MM" placement="bottom" placeholder="选择日期" style="width: 100%;" transfer></DatePicker> -->
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="支付状态：" prop="paymentState">
                  <Select v-model="payComSearchData.paymentState" clearable style="width: 100%;" transfer>
                    <Option v-for="item in staticPayComSearchData.paymentStateList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="企业社保账户：" prop="comAccountId">
                  <Input v-model="payComSearchData.comAccountId" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span: 24}" class="tr">
                <Button type="primary" @click="payComHandlePageNum(1)" icon="ios-search">查询</Button>
                <Button type="warning" @click="resetSearchCondition('payComInfo')">重置</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>

    <Form>
      <Row class="mt20">
        <Col :sm="{span: 24}">
          <Button type="primary" @click="gotoPay">添加到出账批次号</Button>
          <Button type="primary" @click="goPaymentNotice">从出账批次号中移除</Button>
        </Col>
      </Row>

        <Row class="mt20">
            <Col :sm="{span:24}">
                <Table stripe
                    border ref="selection"
                    :columns="payComColumns" 
                    :data="payComData"
                    @on-selection-change="payComSelectionChange">
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
        </Row>
        <Row class="mt20">
        </Row>
        <Row class="mt20">
        </Row>
    </Form>

    <!-- 进度 -->
    <Modal
      v-model="isShowProgress"
      width="680"
      title="查看进度"
      @on-ok="ok"
      @on-cancel="cancel">
      <progress-bar></progress-bar>
    </Modal>

    <!-- 调整 -->
    <Modal
      v-model="changeInfo.isShowChange"
      width="640"
      @on-ok="ok"
      @on-cancel="cancel">
      <Table border :columns="changeInfo.changeColumns" :data="data.changeData"></Table>
      <Form :label-width=250>
        <Row class="mt20">
          <Col :sm="{span: 24}">
            <Button type="primary" @click="changeInfo.isImport = true">导入调整明细</Button>
          </Col>
        </Row>
        <Row class="mt20" type="flex" justify="start">
          <Col :sm="{span: 24}">
            <Form-item label="调整金（小写）：">
              <Input v-model="changeInfo.changeAmount" placeholder="请输入..."></Input>
            </Form-item>
          </Col>
          <Col :sm="{span: 24}">
            <Form-item>
              <Checkbox v-model="changeInfo.isDeductible">抵扣费用是否纳入支付申请</Checkbox>
            </Form-item>
          </Col>
          <Col :sm="{span: 24}">
            <Form-item label="申请支付金额合计（小写）：">
              <label>{{changeInfo.applyAmountLower}}</label>
            </Form-item>
          </Col>
          <Col :sm="{span: 24}">
            <Form-item label="申请支付金额合计（大写）：">
              <label>{{changeInfo.applyAmountUpper}}</label>
            </Form-item>
          </Col>
          <Col :sm="{span: 24}">
            <Form-item label="备注说明：">
              <Input v-model="changeInfo.notes" type="textarea" :rows="5" placeholder="请输入..."></Input>
            </Form-item>
          </Col>
        </Row>
      </Form>
    </Modal>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import customerModal from '../../../commoncontrol/customermodal.vue'
  import progressBar from '../../../commoncontrol/progress/progressbar.vue'
  import EventType from '../../../../store/EventTypes'
  import payComApi from '../../../../api/social_security/payment_com'

  const progressStop = 33.3;

  export default {
    components: {customerModal, progressBar},
    data() {
      return{
        collapseInfo: [1], //展开栏
        payComSearchData: {
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
        progressStop: progressStop,

        changeInfo: {
          isShowChange: false,
          changeColumns: [
            {title: '应缴纳合计', key: 'shouldPayAmount', align: 'center',
              render: (h, params) => {
                return h('div', {style: {textAlign: 'right'}}, [
                  h('span', params.row.shouldPayAmount),
                ]);
              }
            },
            {title: '抵扣费用', key: 'deductibleFee', align: 'center',
              render: (h, params) => {
                return h('div', {style: {textAlign: 'right'}}, [
                  h('span', params.row.deductibleFee),
                ]);
              }
            }
          ],

          changeAmount: '',
          isDeductible: false,
          applyAmountLower: '',
          applyAmountUpper: '',
          notes: '',
          isImport: false
        },

        payComColumns: [
          {title: '', key: 'id', width: 55, fixed: 'left', type: 'selection'},
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
          {title: '企业社保账户', key: 'comAccountId', width: 180, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.comAccountId),
              ]);
            }
          },
          {title: '支付年月', key: 'paymentMonth', width: 180, align: 'center',
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
          {title: '操作', key: 'operator', width: 220, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {type: 'success', size: 'small'},
                  style: {margin: '0 auto'},
                  on: {
                    click: () => {
                      this.changeInfo.isShowChange = true;
                    }
                  }
                }, '调整'),
                h('Button', {
                  props: {type: 'success', size: 'small'},
                  style: {margin: '0 auto 0 10px'},
                  on: {
                    click: () => {
                      this.isShowProgress = true;
                    }
                  }
                }, '进度'),
                h('Button', {
                  props: {type: 'success', size: 'small'},
                  style: {margin: '0 auto 0 10px'},
                  on: {
                    click: () => {
                      this.isShowProgress = true;
                    }
                  }
                }, '付款通知书')
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
          {title: '申请人', key: 'applierId', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.applierId),
              ]);
            }
          },
          {title: '申请时间', key: 'applicationDate', width: 180, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.applicationDate),
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
          {title: '申请备注', key: 'remark', width: 250, align: 'center',
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
      gotoPay() {
        this.$Notice.success({
          title: '支付申请操作成功！'
        });
      },
      goPaymentNotice() {
        this.$router.push({name: 'paymentnotice'})
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
      payComSelectionChange(selection) {
        this.payComPageData = selection;
      },
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

        payComApi.paymentComQuery({
          pageSize: this.payComPageData.pageSize,
          pageNum: this.payComPageData.pageNum,
          params: params,
        }).then(data => {
          this.payComData = data.data;
          this.payComPageData.total = data.total;
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
      }
    }
  }
</script>
