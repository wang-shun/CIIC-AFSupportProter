<template>
  <div>
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        企业公积金账户查询
        <div slot="content">
          <Form :label-width=150 ref="operatorSearchData" :model="operatorSearchData">
            <Row type="flex" justify="start">
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
                <Form-item label="客户汇缴月份：" prop="comHfMonth">
                  <DatePicker v-model="operatorSearchData.comHfMonth" type="month" format="yyyyMM" placement="bottom"  placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="公积金类型：" prop="hfType">
                  <Select v-model="operatorSearchData.hfType" style="width: 100%;" transfer>
                    <Option v-for="item in hfTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="公积金账号：" prop="accountNumber">
                  <InputAccount v-model="operatorSearchData.accountNumber"></InputAccount>
                </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span: 24}" class="tr">
                <Button type="primary" icon="ios-search" @click="handlePageNum(1)">查询</Button>
                <Button type="warning" @click="resetSearchCondition('operatorSearchData')">重置</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>

    <!-- <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <Button type="info">导出</Button>
      </Col>
    </Row> -->

    <Row class="mt20">
      <Col :sm="{span:24}">
        <Table border :row-class-name="rowClassName" :columns="companyFundAccountSearchColumns" :data="fundAccountData"></Table>
        <Page
          class="pageSize"
          @on-change="handlePageNum"
          @on-page-size-change="handlePageSize"
          :total="fundAccountPageData.total"
          :page-size="fundAccountPageData.pageSize"
          :page-size-opts="fundAccountPageData.pageSizeOpts"
          :current="fundAccountPageData.pageNum"
          show-sizer show-total>
        </Page>
      </Col>
    </Row>

    <!--<Modal-->
      <!--v-model="isShowBindAndUnbind"-->
      <!--title="公司绑定\解绑"-->
      <!--width="720"-->
    <!--&gt;-->
      <!--<company-bind-and-unbind :companyFundAccountInfo="data.companyFundAccountInfo" :bindAndUnbindCompanyData="data.bindAndUnbindCompanyData"></company-bind-and-unbind>-->
      <!--<div slot="footer">-->
        <!--<Button type="primary">保存</Button>-->
        <!--<Button type="warning">关闭</Button>-->
      <!--</div>-->
    <!--</Modal>-->
  </div>
</template>
<script>
  import ts from '../../../api/house_fund/table_style'
  import api from '../../../api/house_fund/company_fund_account_search/company_fund_account_search'
  import InputCompany from "../../common_control/form/input_company"
  import companyBindAndUnbind from "../common/CompanyBindAndUnbind.vue"
  import InputAccount from "../common/input_account"

  export default {
    components: {InputCompany, companyBindAndUnbind,InputAccount},
    data() {
      return {
        collapseInfo: [1],
        operatorSearchData: {
          companyId: "",
          companyName: "",
          comHfMonth: "",
          hfType: "",
          accountNumber: ""
        },
        hfTypeList: [
          {label: "全部", value: ''},
          {label: "基本公积金", value: 1},
          {label: "补充公积金", value: 2},
        ],
        isShowBindAndUnbind: false,
        fundAccountData: [],
        fundAccountPageData: {
          total: 0,
          pageNum: 1,
          pageSize: this.$utils.DEFAULT_PAGE_SIZE,
          pageSizeOpts: this.$utils.DEFAULT_PAGE_SIZE_OPTS
        },
        companyFundAccountSearchColumns: [
           {title: '操作', align: 'center', width: 140,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('Button', {props: {type: 'success', size: 'small'},
                  on: {
                    click: () => {
                      this.nextStep(true, params.row);
                    }
                  }
                }, '查看'),
                h('Button', {props: {type: 'success', size: 'small'}, style: {marginLeft: '10px'},
                  on: {
                    click: () => {
                      this.nextStep(false, params.row);
                    }
                  }
                }, '编辑')
              ])
            }
          },
          {title: '企业公积金名称', key: 'comAccountName', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.comAccountName),
              ]);
            }
          },
          {title: '公积金账号', key: 'comAccount', align: 'center', width: 130,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.comAccount),
              ]);
            }
          },
          {title: '公积金类型', key: 'hfType', align: 'center', width: 120,
            render: (h, params) => {
              let type = '';
              switch (params.row.hfType) {
                case '1':
                  type = '基本公积金';
                  break;
                case '2':
                  type = '补充公积金';
                  break;
              }
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', type),
              ]);
            }
          },
          {title: 'U盾代管情况', key: 'ukeyStore', align: 'center', width: 130,
            render: (h, params) => {
              let ukeyStore = '';
              switch (params.row.ukeyStore) {
                case '0':
                  ukeyStore = '没有';
                  break;
                case '1':
                  ukeyStore = '客户自办';
                  break;
                case '2':
                  ukeyStore = '中智代办';
                  break;
              }
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', ukeyStore),
              ]);
            }
          },
          {title: '客户汇缴月', key: 'comHfMonth', align: 'center', width: 100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.comHfMonth),
              ]);
            }
          },
          {title: '缴费银行', key: 'paymentBank', align: 'center', width: 130,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', this.$decode.hf_paymentBank(params.row.paymentBank)),
              ]);
            }
          },
          {title: '备注说明', key: 'remark', align: 'center', width: 419,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.remark),
              ]);
            }
          },

        ]
      }
    },
    mounted() {
      window.sessionStorage.removeItem('fundAccountInfo');
      this.fundAccountSearch();
    },
    methods: {
//      getComHfMonth(data) {
//        this.operatorSearchData.comHfMonth = data;
//      },
      fundAccountSearch() {
        if (this.operatorSearchData.comHfMonth) {
          this.operatorSearchData.comHfMonth = this.$utils.formatDate(this.operatorSearchData.comHfMonth, 'YYYYMM');
        }
        var params = this.$utils.clear(this.operatorSearchData);
        params = this.$utils.clear(params, '');
        api.companyFundAccountSearch({
          pageSize: this.fundAccountPageData.pageSize,
          pageNum: this.fundAccountPageData.pageNum,
          params: params,
        }).then(data => {
          if (data.code == 200) {
            this.fundAccountData = data.data;
            this.fundAccountPageData.total = data.total;
          }
        })
      },
      handlePageNum(val) {
        this.fundAccountPageData.pageNum = val;
        this.fundAccountSearch();
      },
      handlePageSize(val) {
        this.fundAccountPageData.pageNum = 1;
        this.fundAccountPageData.pageSize = val;
        this.fundAccountSearch();
      },
      nextStep(isCanUpdate, fundAccountData) {
        let fundAccountInfo = fundAccountData;
        fundAccountInfo['isCanUpdate'] = isCanUpdate;
        window.sessionStorage.setItem('fundAccountInfo', JSON.stringify(fundAccountInfo));
        this.$router.push({name: "companyFundAccountProgressTwo"});
      },
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
      rowClassName(row, index) {
        return ts.comRowClassName(row, index);
      }
    }
  }
</script>
