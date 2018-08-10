<template>
  <div>
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        企业账户管理
        <div slot="content">
          <Form ref="payComSearchData" :model="payComSearchData" :label-width=150>
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="社保账户类型：" prop="ssAccountType">
                  <Select v-model="payComSearchData.ssAccountType"   style="width: 100%;" transfer>
                    <Option value="" label="全部"></Option>
                    <Option v-for="item in accountTypeList" :value="item.key" :key="item.key" >{{item.value}}</Option>
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
                        <DatePicker v-model="payComSearchData.paymentMonthMin" type="month" format="yyyyMM" placement="bottom" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
                        <!--<input type="text" v-model="payComSearchData.paymentMonthMin" hidden>-->
                      </Form-item>
                    </Col>
                    <Col span="2" offset="2">-</Col>
                    <Col span="10">
                    <Form-item prop="paymentMonthMax">
                      <DatePicker v-model="payComSearchData.paymentMonthMax" type="month" format="yyyyMM" placement="bottom" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
                        <!--<input type="text" v-model="payComSearchData.paymentMonthMax" hidden>-->
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
                <Form-item label="企业社保账号：" prop="ssAccount">
                  <Input v-model="payComSearchData.ssAccount" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="服务中心：" prop="serviceCenterValue">
                  <Cascader :data="serviceCenterData"  v-model="payComSearchData.serviceCenterValue" trigger="hover" transfer></Cascader>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="金额是否一致：" prop="ifCheck">
                  <i-switch v-model="payComSearchData.ifCheck" size="large">
                      <span slot="open">是</span>
                      <span slot="close"></span>
                  </i-switch>
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
        <Col :sm="{span: 24}">
          <Button type="primary" @click="gotoAddBatch()">添加到出账批次号</Button>
          <Button type="primary" @click="gotoDelBatch()">从出账批次号中移除</Button>
          <Button type="primary" @click="enquireFinanceComAccount()">询问财务可付状态</Button>
          <Button type="info" @click="exportData">导出</Button>
        </Col>
      </Row>

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
        </Row>
        <Row class="mt20">
        </Row>
        <Row class="mt20">
        </Row>
    </Form>


    <!-- 添加批次 -->
    <Modal
      v-model="addBatchData.isShowAddBatch"
      width="80%"
      title="加入批次">
      <Table border :columns="addBatchData.payBatchColumns" :data="addBatchData.payBatchData" ></Table>

      <div slot="footer">
      </div>
    </Modal>
    <!-- 删除批次 -->
    <Modal v-model="delBatchData.isShowDelBatch" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>移除确认</span>
      </p>
      <div style="text-align:center">
        <p>选中的数据将从批次中移除</p>
        <p>是否继续移除</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large"  @click="doDelBatch()">移除</Button>
      </div>
    </Modal>

    <!-- 进度 -->
    <!-- <Modal
      v-model="isShowProgress"
      width="680"
      title="查看进度"
      @on-ok="ok"
      @on-cancel="cancel">
      <progress-bar :stepsInfo="steps"></progress-bar>
    </Modal> -->

    <!-- 调整 -->
    <Modal
      v-model="changeInfo.isShowChange"
      width="640"
      @on-ok="ok"
      @on-cancel="cancel"
      >
      <Table border :columns="changeInfo.changeColumns" :data="changeInfo.changeData"></Table>
      <Form :label-width=250>
        <!--<Row class="mt20">-->
          <!--<Col :sm="{span: 24}">-->
            <!--<Button type="primary" @click="changeInfo.isImport = true">导入调整明细</Button>-->
          <!--</Col>-->
        <!--</Row>-->
        <Row class="mt20" type="flex" justify="start">
          <Col :sm="{span: 24}">
            <Form-item label="额外金：">
              <Input v-model="changeInfo.extraAmount" placeholder="请输入..." @on-change="calculateTotalPayAmount()"></Input>
            </Form-item>
          </Col>
          <Col :sm="{span: 24}">
            <Form-item>
              <Tooltip placement="top" :delay="2000">
              <Checkbox v-model="changeInfo.ifDeductedIntoPay"  @on-change="calculateTotalPayAmount()" true-value="1" false-value="0" >抵扣费用是否纳入支付申请 </Checkbox>
              <div slot="content">
                <p> 如果勾选我，将会自动合计： </p>
                <p> 申请支付金额合计 = 应缴纳合计+ 退账抵扣费用 + 调整抵扣费用 + 额外金； </p>
                <p> 上述的【退账抵扣费用】【调整抵扣费用】必须是负数；</p>
                 <p> 应缴纳合计 = 标准 + 新进 + 转入 + 补缴 + 调整（正数）+ 转出 + 封存；</p>
              </div>
              </Tooltip>
            </Form-item>
          </Col>
          <Col :sm="{span: 24}">
            <Form-item label="申请支付金额合计：">
              <label>{{changeInfo.totalPayAmount}}</label>
            </Form-item>
          </Col>
          <!-- <Col :sm="{span: 24}">
            <Form-item label="申请支付金额合计（大写）：">
              <label>{{changeInfo.totalPayAmountUpper}}</label>
            </Form-item>
          </Col> -->
          <Col :sm="{span: 24}">
            <Form-item label="额外金备注：">
              <Input v-model="changeInfo.remark" type="textarea" :rows="5"  placeholder="请输入..."></Input>
            </Form-item>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
          <Button type="text"  @click="closeAdjustment()">取消</Button>
          <Button type="success"  @click="saveAdjustment()" :disabled='changeInfo.ifAdjustSave'>保存</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import customerModal from '../../../common_control/CustomerModal.vue'
 // import progressBar from '../../../common_control/progress/ProgressBar.vue'
  import EventType from '../../../../store/event_types'
  import payComApi from '../../../../api/social_security/payment_com'
  import dict from '../../../../api/dict_access/social_security_dict'
  import sessionData from '../../../../api/session-data'
  import payBatchApi from '../../../../api/social_security/payment_batch'
  const progressStop = 33.3;

  export default {
    components: {customerModal},
    data() {
      return{
        collapseInfo: [1], //展开栏
        accountTypeList: [],
        serviceCenterData:[],
        payComSearchData: {
          serviceCenterValue:[],
          ssAccountType: '',
          paymentId: '',
          companyId: '',
          paymentMonthMin: '',
          paymentMonthMinShow: '',
          paymentMonthMax: '',
          paymentMonthMaxShow: '',
          paymentState: '',
          comAccountId: '',
          ssAccount:'',
          paymentBatchNum:'',
          ifCheck: false
        },
        staticPayComSearchData: {
          paymentStateList: [
            //{value: '', label: '清空'},
            {value: '', label: '全部'},
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
        steps: [
          {isOver: 1, title: '创建支付', author: '迎曦', date: '2016-12-12 12:32', action: {name: '', action: ''}},
          {isOver: 0,title: '部门初审', author: '小龙女', date: '', action: {name: '催一下', action: ''}},
          {isOver: -1, title: '财务复审', author: '', date: '', action: {name: '', action: ''}},
          {isOver: -1, title: '财务复审', author: '', date: '', action: {name: '', action: ''}},
        ],

        //加入批次功能数据结构
        addBatchData:{
          isShowAddBatch : false,
          payBatchColumns: [
            {title: '操作', key: 'operator', width: 100, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {type: 'success', size: 'small'},
                  style: {margin: '0 auto'},
                  on: {
                    click: () => {
                      let paymentId = params.row.paymentId;
                      this.doAddBatch(paymentId);
                    }
                  }
                }, '选择'),
              ]);
            }
          },
            {title: '出账批次号', key: 'paymentBatchNum', width: 130, align: 'center',
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
            {title: '支付状态', key: 'paymentStateName', width: 180, align: 'center',
              render: (h, params) => {
                let paymentState = params.row.paymentState;
                let paymentStateName = this.getPaymentStateName(paymentState);

                return h('div', {style: {textAlign: 'left'}}, [
                  h('span', paymentStateName),
                ]);
              }
            },
            {title: '制单人', key: 'createPaymentUser', width: 120, align: 'center',
              render: (h, params) => {
                return h('div', {style: {textAlign: 'left'}}, [
                  h('span', params.row.createPaymentUser),
                ]);
              }
            },
            {title: '制单日期', key: 'createPaymentDate', width: 120, align: 'center',
              render: (h, params) => {
                return h('div', {style: {textAlign: 'left'}}, [
                  h('span', params.row.createPaymentDate),
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
            {title: '社保账户类型', key: 'ssAccountType', width: 200, align: 'center',
              render: (h, params) => {
                let accountType = params.row.ssAccountType;
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
            }
          ],
          payBatchData:[],
          paymentComIdList:[],


        },
        //从批次移除功能数据结构
        delBatchData:{
          isShowDelBatch : false,
          paymentComIdList:[],

        },

        //调整功能数据结构
        changeInfo: {
          isShowChange: false,
          changeColumns: [
            {title: '应缴纳合计', key: 'oughtAmount', align: 'center',
              render: (h, params) => {
                return h('div', {style: {textAlign: 'right'}}, [
                  h('span', params.row.oughtAmount),
                ]);
              }
            },
            {title: '退账抵扣费用', key: 'refundDeducted', align: 'center',
              render: (h, params) => {
                return h('div', {style: {textAlign: 'right'}}, [
                  h('span', params.row.refundDeducted),
                ]);
              }
            },
            {title: '调整抵扣费用', key: 'adjustDeducted', align: 'center',
              render: (h, params) => {
                return h('div', {style: {textAlign: 'right'}}, [
                  h('span', params.row.adjustDeducted),
                ]);
              }
            }
          ],
          paymentComId:'',
          extraAmount: '',
          ifDeductedIntoPay: false,
          totalPayAmount: '',
          totalPayAmountUpper: '',
          remark: '',
          isImport: false,
          ifAdjustSave:false,
          changeData:[],
        },

        payComColumns: [
          {title: '', key: 'id', width: 55, fixed: 'left', type: 'selection'},
          {title: '出账批次号', key: 'paymentBatchNum', width: 140, align: 'center',fixed: 'left',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.paymentBatchNum),
              ]);
            }
          },
          {title: '支付年月', key: 'paymentMonth', width: 85, align: 'center',fixed: 'left',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.paymentMonth),
              ]);
            }
          },
          {title: '客户编号', key: 'companyId', width: 110, align: 'center',fixed: 'left',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.companyId),
              ]);
            }
          },
          {title: '客户名称', key: 'title', width: 250, align: 'center',fixed: 'left',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.title),
              ]);
            }
          },
          {title: '支付状态', key: 'paymentStateName', width: 120, align: 'center',
            render: (h, params) => {
              let paymentState = params.row.paymentState;
              let paymentStateName = this.getPaymentStateName(paymentState);
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', paymentStateName),
              ]);
            }
          },
          {title: '应缴纳金额', key: 'oughtAmount', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.oughtAmount),
              ]);
            }
          },
          {title: '申请支付总金额', key: 'totalPayAmount', width: 140, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.totalPayAmount),
              ]);
            }
          },          
          {title: '操作', key: 'operator', width: 180, align: 'center',
            render: (h, params) => {
              let paymentState = params.row.paymentState;
              let b=[];
              if(!(paymentState != "3" && paymentState != "5" && paymentState != "7")){
                b.push( h('Button', {
                    props: {type: 'success', size: 'small'},
                    style: {margin: '0 auto'},
                    on: {
                      click: () => {
                        let paymentComId = params.row.paymentComId;
                        let oughtAmount = params.row.oughtAmount;
                        let refundDeducted = params.row.refundDeducted;
                        let adjustDeducted = params.row.adjustDeducted;
                        let ifDeductedIntoPay = params.row.ifDeductedIntoPay;
                        let extraAmount = params.row.extraAmount;
                        let totalPayAmount = params.row.totalPayAmount;
                        let remark = params.row.remark;
                        let paymentState = params.row.paymentState;
                        this.doAdjustment(paymentComId,oughtAmount,refundDeducted,adjustDeducted,ifDeductedIntoPay,extraAmount,totalPayAmount,remark,paymentState)
                      }
                    }
                  }, '调整'));
              }
                b.push(h('Button', {
                 props: {type: 'success', size: 'small'},
                 style: {margin: '0 auto 0 10px'},
                 on: {
                  // let self = this;
                   click: () => {
                     let paymentComId = params.row.paymentComId;
                     let comAccountId = params.row.comAccountId;
                     let paymentMonth = params.row.paymentMonth;
                     let paymentState = params.row.paymentState;
                     this.goPaymentNotice(paymentComId,comAccountId,paymentMonth,paymentState);
                   }
                 }
               }
                , '付款通知书'));
              return h('div', b);
            }
          },
          {title: '是否一致', key: 'ifCheck', width: 100, align: 'center',
            render: (h, params) => {
              if(params.row.ifCheck==1){
                 return h('div', [
                  h('A', {
                      props: {type: 'success', size: 'small'}, style: {margin: '0 auto'},
                        on: {
                          dblclick: () => {
                               this.doCheck(params.row.paymentComId,h)
                          }
                        }
                      },'是'
                    ),
                ])
              }else{
                return h('div', [
                  h('Button', {
                    props: {type: 'success', size: 'small'},
                    style: {margin: '0 auto'},
                    on: {
                      click: () => {
                        this.doCheck(params.row.paymentComId,h)
                      }
                    }
                  }, '一致'),
                ]);
              }
            
            }
          },
          {title: '企业社保账号', key: 'ssAccount', width: 180, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.ssAccount),
              ]);
            }
          },
          {title: '社保账户类型', key: 'ssAccountType', width: 120, align: 'center',
            render: (h, params) => {
              let ssAccountType = params.row.ssAccountType;
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
          // {title: '企业部分金额', key: 'totalComPayAmount', width: 130, align: 'center',
          //   render: (h, params) => {
          //     return h('div', {style: {textAlign: 'right'}}, [
          //       h('span', params.row.totalComPayAmount),
          //     ]);
          //   }
          // },
          // {title: '雇员部分金额', key: 'totalEmpPayAmount', width: 130, align: 'center',
          //   render: (h, params) => {
          //     return h('div', {style: {textAlign: 'right'}}, [
          //       h('span', params.row.totalEmpPayAmount),
          //     ]);
          //   }
          // },
          
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
          
          {title: '财务支付日期', key: 'financePaymentDate', width: 180, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.financePaymentDate),
              ]);
            }
          },
          {title: '抵扣金额是否纳入支付', key: 'ifDeductedIntoPay', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.ifDeductedIntoPay==1?'是':''),
              ]);
            }
          },
          {title: '额外金备注', key: 'remark', width: 250, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.remark),
              ]);
            }
          },
       
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
      this.getCustomers()
      this.loadDict();
      let paymentId=sessionStorage.getItem("PaymentBatch_paymentId");
      if(paymentId!='null'){

        this.payComSearchData.paymentId=paymentId;
        this.paymentComQuery();
        this.payComSearchData.paymentBatchNum=sessionStorage.getItem("PaymentBatch_paymentBatchNum");
        this.payComSearchData.paymentMonthMin=sessionStorage.getItem("PaymentBatch_paymentMonth");
        this.payComSearchData.paymentMonthMax=sessionStorage.getItem("PaymentBatch_paymentMonth");
        //this.payComSearchData.paymentState=sessionStorage.getItem("PaymentBatch_paymentState");
        sessionStorage.setItem("PaymentBatch_paymentId",null);
        sessionStorage.setItem("PaymentBatch_paymentBatchNum",null);
        sessionStorage.setItem("PaymentBatch_paymentMonth",null);
        sessionStorage.setItem("PaymentBatch_paymentState",null);
        this.payComSearchData.paymentId='';
        return;
      }
     
      let queryMonth = new Date()
      queryMonth.setMonth(queryMonth.getMonth()-1);
      this.payComSearchData.paymentMonthMin=queryMonth;
      setTimeout( this.paymentComQuery(),500);
    },
    computed: {
      
    },
    methods: {
     
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
      gotoPay() {
        this.$Notice.success({
          title: '支付申请操作成功！'
        });
      },
      getCustomers(){
        let params = null;
        payComApi.getCustomers({params:params}).then(data=>{
          this.serviceCenterData = data.data;
        })
      },
      loadDict(){
        dict.getDictData().then(data => {
          if (data.code == 200) {
            this.accountTypeList = data.data.SocialSecurityAccountType;
            sessionData.getJsonDataFromSession('paymentCom.payComSearchData', this.payComSearchData);
            sessionData.getJsonDataFromSession('paymentCom.payComPageData', this.payComPageData);
           // this.payComSearchData.paymentState=3;
          }
        });
      },
      goPaymentNotice(paymentComId,comAccountId,paymentMonth,paymentState) {
        sessionData.setJsonDataToSession('paymentCom.payComSearchData', this.payComSearchData);
        sessionData.setJsonDataToSession('paymentCom.payComPageData', this.payComPageData);
        window.sessionStorage.setItem("paymentnotice_paymentComId", paymentComId);
        window.sessionStorage.setItem("paymentnotice_comAccountId", comAccountId);
        window.sessionStorage.setItem("paymentnotice_paymentMonth", paymentMonth);
        window.sessionStorage.setItem("paymentnotice_paymentState", paymentState);
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
      exportData() {
        if (this.payComSearchData.paymentMonthMin && this.payComSearchData.paymentMonthMin.length != 6) {
          this.payComSearchData.paymentMonthMin = this.$utils.formatDate(this.payComSearchData.paymentMonthMin, 'YYYYMM');
        }
        if (this.payComSearchData.paymentMonthMax && this.payComSearchData.paymentMonthMax.length != 6) {
          this.payComSearchData.paymentMonthMax = this.$utils.formatDate(this.payComSearchData.paymentMonthMax, 'YYYYMM');
        }
   
        // 处理参数
        var params = {};
        {
          // 清除 '[全部]'
          params = this.$utils.clear(this.payComSearchData);
          // 清除空字符串
          params = this.$utils.clear(params, '');
        }
        let arrayServiceCenter=params.serviceCenterValue;
        if(arrayServiceCenter!=null){
            params=JSON.parse(JSON.stringify(params));
            delete params.serviceCenterValue;
            params.serviceCenterValue=arrayServiceCenter[arrayServiceCenter.length-1];
        }
        params.ifCheck=params.ifCheck?1:0;
        payComApi.paymentComQueryExport(params)
      },
      paymentComQuery() {

        if (this.payComSearchData.paymentMonthMin && this.payComSearchData.paymentMonthMin.length != 6) {
          this.payComSearchData.paymentMonthMin = this.$utils.formatDate(this.payComSearchData.paymentMonthMin, 'YYYYMM');
        }
        if (this.payComSearchData.paymentMonthMax && this.payComSearchData.paymentMonthMax.length != 6) {
          this.payComSearchData.paymentMonthMax = this.$utils.formatDate(this.payComSearchData.paymentMonthMax, 'YYYYMM');
        }
        // 处理参数
        var params = {};
        {
          // 清除 '[全部]'
          params = this.$utils.clear(this.payComSearchData);
          // 清除空字符串
          params = this.$utils.clear(params, '');
        }
        let arrayServiceCenter=params.serviceCenterValue;
        if(arrayServiceCenter!=null){
            params=JSON.parse(JSON.stringify(params));
            delete params.serviceCenterValue;
            params.serviceCenterValue=arrayServiceCenter[arrayServiceCenter.length-1];
        }
        params.ifCheck=params.ifCheck?1:0;
        payComApi.paymentComQuery({
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
      //调整按钮弹出框
      doAdjustment(paymentComId,oughtAmount,refundDeducted,adjustDeducted,ifDeductedIntoPay,extraAmount,totalPayAmount,remark,paymentState){
        //基本数据填充数据填充
        this.changeInfo.paymentComId = paymentComId;
        // if(ifDeductedIntoPay == 0){
        //   this.changeInfo.ifDeductedIntoPay = false;
        // }else{
        //   this.changeInfo.ifDeductedIntoPay = true;
        // }
        this.changeInfo.ifDeductedIntoPay = ifDeductedIntoPay;
        this.changeInfo.extraAmount = extraAmount;
        this.changeInfo.totalPayAmount = totalPayAmount;

        this.changeInfo.remark = remark;
        this.changeInfo.changeData = [
          {
            oughtAmount : oughtAmount,
            refundDeducted : refundDeducted,
            adjustDeducted : adjustDeducted
          }
        ];
        if(paymentState != "3" && paymentState != "5" && paymentState != "7"){
          this.changeInfo.ifAdjustSave= true;
        }
        //展现
        this.changeInfo.isShowChange = true;
      },
      //页面计算申请支付金额合计
      calculateTotalPayAmount(){
        //应缴纳金额
        let oughtAmount = this.changeInfo.changeData[0].oughtAmount;
        //退账抵扣费用
        let refundDeducted = this.changeInfo.changeData[0].refundDeducted;
        //调整抵扣费用
        let adjustDeducted = this.changeInfo.changeData[0].adjustDeducted;
        adjustDeducted = Number(typeof adjustDeducted == 'undefined'?0:adjustDeducted)
        //抵扣费用是否纳入支付申请
        let ifDeductedIntoPay = this.changeInfo.ifDeductedIntoPay;
        //额外金
        let extraAmount = this.changeInfo.extraAmount;

        //计算合计
        let totalPayAmount = 0;
        if(ifDeductedIntoPay == 1){
          totalPayAmount = Number(typeof oughtAmount == 'undefined'?0:oughtAmount)
                         + Number(typeof refundDeducted == 'undefined'?0:refundDeducted)
                         + Number(adjustDeducted > 0 ? 0:adjustDeducted)
                         + Number(typeof extraAmount== 'undefined'?0:extraAmount );
        } else{
          totalPayAmount = Number(typeof oughtAmount == 'undefined'?0:oughtAmount)
                         + Number(typeof extraAmount == 'undefined'?0:extraAmount);
        }

        //赋值
        this.changeInfo.totalPayAmount = parseFloat(totalPayAmount).toFixed(2);
      },
      //保存调整结果
      saveAdjustment(){
        //变更数据ID
        let paymentComId = this.changeInfo.paymentComId;
        //额外金
        let extraAmount = this.changeInfo.extraAmount;
        extraAmount = extraAmount * 1;
        if(isNaN(extraAmount)){
          this.$Message.info("额外金必须为数字");
          return;
        }


        //抵扣费用是否纳入支付申请
        let ifDeductedIntoPay = this.changeInfo.ifDeductedIntoPay;

        //备注
        let remark = this.changeInfo.remark;

        payComApi.saveAdjustment({
          paymentComId: paymentComId,
          extraAmount: extraAmount,
          ifDeductedIntoPay: ifDeductedIntoPay,
          remark: remark,
        }).then(data => {
          if(data.code == "0"){
            this.$Message.info("操作成功");
            this.closeAdjustment();
            //重新查询
            this.paymentComQuery()

          }else{
            this.$Message.info(data.message);
          }
        })

      },
      //关闭调整框
      closeAdjustment(){
        this.changeInfo.isShowChange = false;
      },
      gotoAddBatch(){
        //获取选中列

        let selection = this.$refs.payComSelection.getSelection();

        //判断条件
        //是否有选中列
        if(selection.length == 0){
          this.$Message.info("没有选中的列");
          return;
        }

        //已有批次的不可再添加
        let isHaveBatch = false;
        selection.some(item => {
          if(item.paymentId != null && item.paymentId != ""){
            isHaveBatch = true;
            //跳出循环
            return true;
          }
        });
        if(isHaveBatch){
            this.$Message.info("已有出账批次的数据不可以再加入批次");
            return;
        }



        //判断选中列是否都是同一个社保账户分类
        let ssAccountType = selection[0].ssAccountType;
        let paymentMonth =selection[0].paymentMonth;
        let isManyAccountType = false;
        selection.some(item => {
          if(item.ssAccountType != ssAccountType){
            isManyAccountType = true;
            //跳出循环
            return true;
          }
        });
        if(isManyAccountType){
            this.$Message.info("选中列中社保账户类型不同");
            return;
        }


        //判断选中列的支付状态(只有可付:3 和内部审批批退:5 可以进行此操作)
        let isDisableState = false;
        selection.some(item => {
          if(item.paymentState != "3" && item.paymentState != "5" && item.paymentState != "7"){
            isDisableState = true;
            //跳出循环
            return true;
          }
        });
        if(isDisableState){
            this.$Message.info("只有可付和批退状态的记录可以进行添加批次操作");
            return;
        }
        //检索数据
        payComApi.showAddBatch({
          accountType: ssAccountType,
          paymentMonth: paymentMonth,
        }).then(data => {
          this.addBatchData.payBatchData = data.data;
        })
        //将数据传给子画面
        this.addBatchData.paymentComIdList = [];
        selection.forEach(item => {
          this.addBatchData.paymentComIdList.push(item.paymentComId);
        });
        //展示页面
        this.addBatchData.isShowAddBatch = true;
      },
      //执行添加批次
      doAddBatch(paymentId){
        let paymentComIdList = this.addBatchData.paymentComIdList;
        payComApi.doAddBatch({
          paymentId: paymentId,
          paymentComIdList: paymentComIdList,
        }).then(data => {
          if(data.code == "0"){
            this.$Message.info("操作成功");
            this.closeAddBatch();
            //重新查询
            this.paymentComQuery()

          }else{
            console.log(data);
            this.$Message.info(data.message);
          }
        })
      },
      //关闭添加批次框
      closeAddBatch(){
        this.addBatchData.isShowAddBatch = false;
      },

      gotoDelBatch(){
        //获取选中列

        let selection = this.$refs.payComSelection.getSelection();

        //判断条件
        //是否有选中列
        if(selection.length == 0){
          this.$Message.info("没有选中的列");
          return;
        }

        //没有批次的不可再删除
        let isHaventBatch = false;
        selection.some(item => {
          if(item.paymentId == null || item.paymentId == ""){
            isHaventBatch = true;
            //跳出循环
            return true;
          }
        });
        if(isHaventBatch){
            this.$Message.info("请选择已有批次的客户费用");
            return;
        }
        //判断选中列的支付状态(只有可付:3 和批退:5 可以进行此操作)
        let isDisableState = false;
        selection.some(item => {
          if(item.paymentState != "3" && item.paymentState != "5" && item.paymentState != "7"){
            isDisableState = true;
            //跳出循环
            return true;
          }
        });
        if(isDisableState){
            this.$Message.info("只有可付和批退状态的记录可以进行操作");
            return;
        }
        //将数据传给子画面
        this.delBatchData.paymentComIdList = [];
        selection.forEach(item => {
          this.delBatchData.paymentComIdList.push(item.paymentComId);
        });
        //展示页面
        this.delBatchData.isShowDelBatch = true;
      },
      //执行移除批次
      doDelBatch(){
        let paymentComIdList = this.delBatchData.paymentComIdList;
        payComApi.doDelBatch({
          paymentComIdList: paymentComIdList,
        }).then(data => {
          if(data.code == "0"){
            this.$Message.info("移除成功");
            this.closeDelBatch();
            //重新查询
            this.paymentComQuery()

          }else{
            this.$Message.info(data.message);
          }
        })
      },
      async doCheck(paymentComId,h){
        this.$Modal.confirm({
            title: "提示",
            content: "您确认操作吗？",
            okText: "确认",
            onOk: () => {
              payComApi.doCheck({paymentComId:paymentComId}).then(
                data => {
                  if(data.code == "0"){
                    this.paymentComQuery()
                  }else{
                    this.$Message.info(data.message);
                  }
                }
              );
            }
          });
      },
      //关闭移除批次框
      closeDelBatch(){
        this.delBatchData.isShowDelBatch = false;
      },

      enquireFinanceComAccount(){
          let y;
          let m=new Date().getMonth()+1;
        this.$Modal.confirm({
              title: '手动询问结算中心是否可付',
              closable:true,
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
              }
          });
      },
    }
  }
</script>
