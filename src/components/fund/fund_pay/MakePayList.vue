<template>
  <div>
    <Form :label-width=150 ref="operatorSearchData" :model="operatorSearchData" :rules="ruleValidate">
      <Collapse v-model="collapseInfo">
        <Panel name="1">
          公积金汇缴支付
          <div slot="content">
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="结算银行：" prop="paymentBank">
                  <Select v-model="operatorSearchData.paymentBank" style="width: 100%;" transfer>
                    <Option v-for="item in paymentBankList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="企业公积金账户类型：" prop="fundAccountType">
                  <Select v-model="operatorSearchData.fundAccountType" style="width: 100%;" transfer>
                    <Option v-for="item in fundAccountTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="服务中心：" prop="serviceCenterValue">
                  <Cascader :data="serviceCenterData" v-model="operatorSearchData.serviceCenterValue" trigger="hover" transfer></Cascader>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="支付状态：" prop="paymentStatus">
                  <Select v-model="operatorSearchData.paymentStatus" style="width: 100%;" transfer>
                    <Option v-for="item in paymentStatusList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户编号：" prop="customerNumber">
                  <Input v-model="operatorSearchData.customerNumber" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户名称：" prop="customerName">
                  <Input v-model="operatorSearchData.customerName" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="汇缴年月：" prop="paymentMonth">
                  <DatePicker v-model="operatorSearchData.paymentMonth" type="month" placement="bottom" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
                </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span: 24}" class="tr">
                <Button type="primary" icon="ios-search" @click="clickQuery('operatorSearchData')">查询</Button>
                <Button type="warning" @click="resetSearchCondition('operatorSearchData')">重置</Button>
              </Col>
            </Row>
          </div>
        </Panel>
      </Collapse>
      <Table border class="mt20" :columns="makePayListColumns" :data="makePayListData"
             @on-select="updateMakePayListInfo"
             @on-select-all="updateMakePayListInfo"
             @on-select-cancel="updateMakePayListInfo"
             @on-selection-change="updateMakePayListInfo"></Table>
      <Row class="mt20">
        <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="汇缴年月：">
            {{makePayListInfo.payDate}}
          </Form-item>
        </Col>
        <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="总行数：">
            {{makePayListInfo.rows}}
          </Form-item>
        </Col>
        <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="公积金账号总数：">
            {{makePayListInfo.fundAccounts}}
          </Form-item>
        </Col>
        <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="汇总总额：">
            {{makePayListInfo.payAmount}}
          </Form-item>
        </Col>
        <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="补缴金额：">
            {{makePayListInfo.repair}}
          </Form-item>
        </Col>
        <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="总金额：">
            {{makePayListInfo.amount}}
          </Form-item>
        </Col>
      </Row>
      <Row class="mt20">
        <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="收款方：" prop="payee">
          <Select v-model="payee" style="width: 100%;" transfer>
            <Option v-for="item in payeeList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </Form-item>
        </Col>
      </Row>
      <Row class="mt20">
        <Col :sm="{span: 24}" class="tr">
          <Button type="info" @click="createMakePayList()">生成汇缴支付批次</Button>
          <Button type="warning" @click="goBack">返回</Button>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<script>
  import {FundPay} from '../../../api/house_fund/fund_pay/fund_pay'

  export default {
    data() {
      return {
        collapseInfo: [1],
        makePayListData:[],
        makePayListInfo:[],
        totalSize:0,//后台传过来的分页总数
        size:10,//默认单页记录数
        pageNum:1,//默认页数
        payee: '',
        operatorSearchData: {
          paymentStatus: 3, //支付状态默认为可付
          fundAccountType: [],
          paymentBank: []
        },
        loading: false,
        ruleValidate: {
          paymentMonth: [
            { required: true,
              message: '必须选择汇缴年月',
              trigger: 'blur',
              type:'date'
            }
          ],
          fundAccountType: [
            { required: true,
              type: 'string',
              message: '至少选择一种企业公积金账户类型',
              trigger: 'change',
              type:'number'
            }
          ],
          paymentBank: [
            { required: true,
              message: '至少选择一家结算银行',
              trigger: 'change',
              type:'number'
            }
          ]
        },

        //todo: 菜单值统一存储维护
        paymentBankList: [
          {label: "徐汇—X", value: 1},
          {label: "西郊—C", value: 2},
          {label: "东方路—P", value: 3},
          {label: "卢湾—L", value: 4},
          {label: "黄浦—H", value: 5}
        ],
        fundAccountTypeList: [
          {label: "中智大库", value: 1},
          {label: "中智外包", value: 2},
          {label: "独立户", value: 3}
        ],
        serviceCenterData: [
          {value: 1, label: '大客户', children: [{value: '1-1', label: '大客户1'}, {value: '1-2', label: '大客户2'}]},
          {value: 2, label: '日本客户'},
          {value: 3, label: '虹桥'},
          {value: 4, label: '浦东'}
        ],
        paymentStatusList: [
          {label: "未到帐", value: 1},
          {label: "无需支付", value: 2},
          {label: "可付", value: 3},
          {label: "申请中(内部审批)", value: 4},
          {label: "内部审批批退", value: 5},
          {label: "已申请到财务部", value: 6},
          {label: "财务部批退", value: 7},
          {label: "财务部支付成功", value: 8},
        ],
        payeeList: [
          {label: "住房资金归集待结算户", value: 1},
          {label: "上海市公积金管理中心（黄浦支行（1））", value: 2},
        ],
        makePayListColumns: [
          {type: 'selection', width: 60},
          {title: '公积金账户名称', key: 'comAccountName', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.comAccountName),
              ]);
            }
          },
          {title: '公积金类型', key: 'hfTypeName', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.hfTypeName),
              ]);
            }
          },
          {title: '支付状态', key: 'paymentStateValue', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.paymentStateValue),
              ]);
            }
          },
          {title: '企业账户类型', key: 'accountTypeValue', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.accountTypeValue),
              ]);
            }
          },
          {title: '结算银行', key: 'paymentBankValue', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.paymentBankValue),
              ]);
            }
          }
        ]
      }
    },
    mounted() {
    },
    computed: {
    },
    methods: {
      clickQuery(name){
        this.loading=true;
        let params = this.getParams(1)
        let self = this
        this.$refs[name].validate((valid)=>{
          if(valid) {
            FundPay.getMakePayListsTableData(params).then(data=>{
              self.refresh(data)
            }).catch(error=>{
              console.log(error)
            })
          } else {
              this.$Message.error('表单验证失败!');
            }
        })
      },
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
      getParams(page) {
        return {
          pageSize: this.size,
          pageNum: page,
          params: {
            paymentBank: (this.operatorSearchData.paymentBank == "" || this.operatorSearchData.paymentBank == null) ? null : this.operatorSearchData.paymentBank,
            paymentStatus: (this.operatorSearchData.paymentStatus == "" || this.operatorSearchData.paymentStatus == null) ? null : this.operatorSearchData.paymentStatus,
            paymentMonth: (this.operatorSearchData.paymentMonth == "" || this.operatorSearchData.paymentMonth == null) ? null : this.$utils.formatDate(this.operatorSearchData.paymentMonth, 'YYYYMM'),
            fundAccountType: (this.operatorSearchData.fundAccountType == "" || this.operatorSearchData.fundAccountType == null) ? null : this.operatorSearchData.fundAccountType,
          }
        }
      },
      refresh(data){
        this.makePayListData = data.data.makePayListData;
        this.makePayListInfo = data.data.makePayListInfo;
        if(typeof(data.data.totalSize)=='undefined') this.totalSize = 0
        else this.totalSize = Number(data.data.totalSize)
        this.closeLoading();
      },
      closeLoading(){
        this.loading=false;
      },
      goBack() {
        this.$router.go(-1);
      },
      updateMakePayListInfo(selection) {
        var sumAmount = 0;
        var payInBackAmount = 0;
        for(var i=0; i<selection.length;i++) {
          sumAmount += Number(selection[i].sumAmount);
          payInBackAmount += Number(selection[i].payInBackAmount);
        }
        this.makePayListInfo.payAmount = sumAmount;
        this.makePayListInfo.repair = payInBackAmount;
        this.makePayListInfo.amount = sumAmount + payInBackAmount;
        this.makePayListInfo.rows = selection.length;
      },
      createMakePayList() {
        //todo: 用真实页面名字代替 createMakePayList
        this.$router.push({name: 'createMakePayList', params: {
          comTaskId: params.row.comTaskId,
          companyFundAccountInfo: params.row.companyFundAccountInfo,
          endOperator: params.row.endOperator
        }
        })
      }

    }
  }
</script>
