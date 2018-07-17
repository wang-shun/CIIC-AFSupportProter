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
                     <Option v-for="(value,key) in this.baseDic.hfPaymentBank" :value="key" :key="key">{{value}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="企业公积金账户类型：" prop="fundAccountType">
                  <Select v-model="operatorSearchData.fundAccountType" style="width: 100%;" transfer>
                    <Option v-for="(value,key) in this.baseDic.companyHFAccountType" :value="key" :key="key">{{value}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <!-- <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="服务中心：" prop="serviceCenterValue">
                  <Cascader :data="serviceCenterData" v-model="operatorSearchData.serviceCenterValue" trigger="hover" transfer></Cascader>
                </Form-item>
              </Col> -->
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="支付状态：" prop="paymentStatus">
                  <Select v-model="operatorSearchData.paymentStatus" style="width: 100%;" transfer>
                    <Option v-for="item in paymentStatusList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户编号：" prop="companyId">
                  <Input v-model="operatorSearchData.companyId" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户名称：" prop="companyName">
                  <Input v-model="operatorSearchData.companyName" placeholder="请输入..."></Input>
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
        <!-- <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
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
        </Col> -->
      </Row>
      <Row class="mt20">
        <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="付款方式：" prop="paymentWay">
          <Select v-model="paymentWay" style="width: 100%;" transfer filterable >
            <Option v-for="item in paymentWayList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </Form-item>
        </Col>
        <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="收款方：" prop="payee">
          <Select v-model="payee" style="width: 100%;" transfer filterable >
            <Option v-for="item in payeeList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </Form-item>
        </Col>
      </Row>
      <Row class="mt20">
        <Col :sm="{span: 24}" class="tr">
          <Button type="info" @click="createPaymentComList()">生成汇缴支付批次</Button>
          <Button type="warning" @click="goBack">返回</Button>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<script>
  import {FundPay} from '../../../api/house_fund/fund_pay/fund_pay'
  import Tools from '../../../lib/tools'

  export default {
    data() {
      return {
        collapseInfo: [1],
        makePayListData:[],
        makePayListInfo:[],
        totalSize:0,//后台传过来的分页总数
        size:99999,//默认单页记录数
        pageNum:1,//默认页数
        payee: '',
        paymentWay:3,
        operatorSearchData: {
          paymentStatus: 3, //支付状态默认为可付
          fundAccountType: '3',
          paymentBank: '15',
        },
        selectedData: [],
        selectedData1:[],
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
              trigger: 'blur',
              //type:'number'
            }
          ],
          paymentBank: [
            { required: true,
              message: '至少选择一家结算银行',
              trigger: 'blur',
//              type:'number'
            }
          ]
        },

        //todo: 菜单值统一存储维护

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
        ],
        payeeList: [
          {label: "住房资金归集待结算户", value: "住房资金归集待结算户"},
          {label: "上海市公积金管理中心（黄浦支行（1））", value: "上海市公积金管理中心（黄浦支行（1））"},
        ],
        paymentWayList: [
          {label: "支票", value: 2},
          {label: "转账", value: 3},
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

        this.$refs[name].validate((valid)=>{
          if(valid) {
            this.operatorSearchData.paymentMonthValue=Tools.formatDate(this.operatorSearchData.paymentMonth, 'YYYYMM');
              let params = this.getParams(1)
              FundPay.getMakePayListsTableData(params).then(data=>{
               this.refresh(data);
               this.makePayListInfo.payDate= Tools.formatDate(this.operatorSearchData.paymentMonth, 'YYYYMM');
            }).catch(error=>{
              console.log(error)
            })
          } else {
              this.$Message.error('表单验证失败!');
            }
        })
      },
      resetSearchCondition(name) {
        console.log(this.$refs[name]);
        this.$refs[name].resetFields()
      },
      getParams(page) {
        return {
          pageSize: this.size,
          pageNum: page,
          params: this.operatorSearchData
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
        this.resetSelectedData(selection);
      },

      createPaymentComList() {
        if(this.selectedData.length==0){
            this.$Message.error('请选择查询列表中的公积金账户数据！');
            return false;
        }
        let ifPay=false;
        let dc=0;
        dc = this.selectedData1.length;
        let kfC=0;
        let nopayC=0;
         let wdzC=0;
        this.selectedData1.forEach((element, index, array) => {
          if(this.selectedData1[index]=='可付'){
            kfC++;
          }
          if(this.selectedData1[index]=='无需支付'){
            nopayC++;
          }
          if(this.selectedData1[index]=='未到账'){
            wdzC++;
          }
        })
        if((dc!=kfC && dc!=nopayC) || wdzC>0 ){
          ifPay=true;
        }
        if(ifPay){
            this.$Message.error('您选择的账户必须为全部【可付】或全部【无需支付】状态！');
            return false;
        }

        if( dc==kfC && (this.payee==null || this.payee=='' )){
            this.$Message.error('收款方要求必填！');
            return false;
        }
     
        if(dc==nopayC){ //如果是无需支付
            this.paymentWay=0;  
        }

        this.$Modal.confirm({
                    title: '确认',
                    content: '您确认生成支付批次吗？',
                    okText: '确认',
                    onOk: () => {
                      let params = {
                          payee:this.payee,
                          paymentWay:this.paymentWay,
                          paymentMonth:this.makePayListInfo.payDate,
                          listData:this.selectedData  //
                        };
                        console.log(params);
                        FundPay.createPaymentComList(params).then(data=>{
                          if(data.code==200){
                            this.$Message.success(data.message);
                            this.$router.go(-1);
                          }else{
                            this.$Message.error(data.message);
                          }
                        }).catch(error=>{
                          console.log(error)
                        })
                    }
                  })
      },
      resetSelectedData(selection) {
        this.selectedData.length = 0;
        this.selectedData1.length = 0;
        if(selection) {
          selection.forEach((element, index, array) => {
            this.selectedData.push(element.paymentAccountId);
            this.selectedData1.push(element.paymentStateValue);
          })
        }
      },

    }
  }
</script>
