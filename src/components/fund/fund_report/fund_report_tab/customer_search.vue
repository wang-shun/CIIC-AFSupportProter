<template>
  <div class="smList" style="margin-bottom: 56px">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        客户查询
        <div slot="content">
          <Form :label-width=150 ref="operatorSearchData" :model="operatorSearchData">
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="账户类型：" prop="hfAccountType">
                <Select v-model="operatorSearchData.hfAccountType" style="width: 100%;" transfer>
                  <Option value="" label="全部"></Option>
                  <Option v-for="item in accountTypeList" :value="item.key" :key="item.key">{{item.value}}</Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="缴费月份：" prop="hfMonth">
                <DatePicker type="month" v-model="operatorSearchData.hfMonth" format="yyyyMM" placement="bottom-end" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
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
                <Form-item label="企业基本公积金账号：" prop="basicHfComAccount">
                  <Input v-model="operatorSearchData.basicHfComAccount" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="企业补充公积金账号：" prop="addedHfComAccount">
                  <Input v-model="operatorSearchData.addedHfComAccount" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span: 24}" class="tr">
                    <!-- <Dropdown @on-click="exportTable">
                    <Button type="info">
                      汇缴书
                      <Icon type="arrow-down-b"></Icon>
                    </Button>
                    <DropdownMenu slot="list">
                      <DropdownItem name="5">基本公积金汇缴书</DropdownItem>
                      <DropdownItem name="6">补充公积金汇缴书</DropdownItem>
                    </DropdownMenu>
                </Dropdown> -->
                <Button type="primary" @click="chgDetailListExport(1)">基本公积金汇缴变更清册(内部)</Button>
                <Button type="primary" @click="repairDetailListExport(1)">基本公积金补缴清册</Button>
                <Button type="primary" @click="chgDetailListExport(2)">补充公积金汇缴变更清册(内部)</Button>
                <Button type="primary" @click="repairDetailListExport(2)">补充公积金补缴清册</Button>
                <Button type="primary" icon="ios-search" @click="handlePageNum(1)" :loading="isLoading">查询</Button>
                <Button type="warning" @click="resetSearchCondition('operatorSearchData')">重置</Button>
              </Col>
            </Row>

          </Form>
        </div>
      </Panel>
    </Collapse>
        <Row class="mt20">
              <Col :sm="{span: 24}" class="tr">
                <Button type="info" @click="excelExport()">导出</Button>
              </Col>
            </Row>
    <Row class="mt20">
      <Col :sm="{span:24}">
        <Table border :columns="customerColumns" :data="customerData"></Table>
        <Page
          class="pageSize"
          @on-change="handlePageNum"
          @on-page-size-change="handlePageSize"
          :total="customerSearchPageData.total"
          :page-size="customerSearchPageData.pageSize"
          :page-size-opts="customerSearchPageData.pageSizeOpts"
          :current="customerSearchPageData.pageNum"
          show-sizer show-total></Page>
      </Col>
    </Row>
  </div>
</template>
<script>
import api from '../../../../api/house_fund/fund_report/fund_report'
import InputCompany from '../../../common_control/form/input_company'
import dict from '../../../../api/dict_access/house_fund_dict'
import Decode from "../../../../lib/decode";
import {FundPay} from '../../../../api/house_fund/fund_pay/fund_pay'

  export default {
    components: {InputCompany},
    data() {
      return {
        collapseInfo: [1],
        operatorSearchData: {
          companyId: '',
          companyName: '',
          hfAccountType: '',
          hfMonth: '',
          basicHfComAccount: '',
          addedHfComAccount: '',
          hfType: '',
        },
        isLoading: false,
        accountTypeList: [],
        customerData: [],
        customerColumns: [
          {
          title: "打印",
          align: "center",
          width: 80,
          render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: { type: "success", size: "small" },
                    style: { margin: "0 auto" },
                    on: {
                      click: () => {
                         this.printPayNote(params.row.comAccountClassId,params.row.paymentMonth);
                      }
                    }
                  },
                  "汇缴书"
                )
              ]);
          }
        },
          {title: '公积金类型', key: 'hfType', width: 100, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', this.$decode.hfType(params.row.hfType)),
              ]);
            }
          },
          {title: '企业账户名称', key: 'comAccountName', width: 110, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.comAccountName),
              ]);
            }
          },
          {title: '客户编号', key: 'companyId', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.companyId),
              ]);
            }
          },
          {title: '缴费月份', key: 'paymentMonth', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.paymentMonth),
              ]);
            }
          },
          {title: '上月汇缴金额', key: 'remittedAmountLast', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.remittedAmountLast),
              ]);
            }
          },
          {title: '本月增加汇缴金额', key: 'remittedAmountAdd', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.remittedAmountAdd),
              ]);
            }
          },
          {title: '本月减少汇缴金额', key: 'remittedAmountReduce', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.remittedAmountReduce),
              ]);
            }
          },
          {title: '本月汇缴金额', key: 'remittedAmount', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.remittedAmount),
              ]);
            }
          },
          {title: '补缴金额', key: 'repairAmount', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.repairAmount),
              ]);
            }
          },
          {title: '上月汇缴人数', key: 'remittedCountEmpLast', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.remittedCountEmpLast),
              ]);
            }
          },
          {title: '本月增加人数', key: 'remittedCountEmpAdd', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.remittedCountEmpAdd),
              ]);
            }
          },
          {title: '本月减少人数', key: 'remittedCountEmpReduce', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.remittedCountEmpReduce),
              ]);
            }
          },
          {title: '本月汇缴人数', key: 'remittedCountEmp', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.remittedCountEmp),
              ]);
            }
          },
          {title: '补缴人数', key: 'repairCountEmp', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.repairCountEmp),
              ]);
            }
          },
          {title: '企业公积金账号', key: 'hfComAccount', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.hfComAccount),
              ]);
            }
          },
           {title: '企业账户类型', key: 'hfAccountType', width: 180, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', this.$decode.accountType(params.row.hfAccountType)),
              ]);
            }
          },

        ],
        customerSearchPageData: {
          total: 0,
          pageNum: 1,
          pageSize: this.$utils.DEFAULT_PAGE_SIZE,
          pageSizeOpts: this.$utils.DEFAULT_PAGE_SIZE_OPTS
        },
      }
    },
    mounted() {
      this.operatorSearchData.hfMonth = new Date();
      dict.getDictData().then(data => {
        if (data.code == 200) {
          this.accountTypeList = data.data.SocialSecurityAccountType;
          this.operatorSearchData.hfAccountType='3';
        }
      });
    },
    computed: {

    },
    methods: {
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
      handlePageNum(val) {
        this.customerSearchPageData.pageNum = val;
        this.hfMonthChargeQuery();
      },
      handlePageSize(val) {
        this.customerSearchPageData.pageNum = 1;
        this.customerSearchPageData.pageSize = val;
        this.hfMonthChargeQuery();
      },
      hfMonthChargeQuery() {
         if (!this.operatorSearchData.hfMonth){
           this.$Message.info("缴费月份必填");
            return false;
         }

        if (this.operatorSearchData.hfMonth && this.operatorSearchData.hfMonth.length != 6) {
          this.operatorSearchData.hfMonth = this.$utils.formatDate(this.operatorSearchData.hfMonth, "YYYYMM");
        }
        this.operatorSearchData.hfType = '';
        var params = {};
        {
          // 清除 '[全部]'
          params = this.$utils.clear(this.operatorSearchData);
          // 清除空字符串
          params = this.$utils.clear(params, '');
        }
        this.isLoading = true;
        api.queryHfRimittedBookReport({
          pageSize: this.customerSearchPageData.pageSize,
          pageNum: this.customerSearchPageData.pageNum,
          params: params,
        }).then(data => {
          if (data.code == 200) {
            this.customerData = data.data.rows;
            this.customerSearchPageData.total = Number(data.data.total);
          }
          this.isLoading = false;
        })
      },
      excelExport() {
        if (!this.operatorSearchData.hfMonth){
           this.$Message.info("缴费月份必填");
            return false;
         }
        if (this.operatorSearchData.hfMonth && this.operatorSearchData.hfMonth.length != 6) {
          this.operatorSearchData.hfMonth = this.$utils.formatDate(this.operatorSearchData.hfMonth, "YYYYMM");
        }
        this.operatorSearchData.hfType = '';
        var params = {};
        {
          // 清除 '[全部]'
          params = this.$utils.clear(this.operatorSearchData);
          // 清除空字符串
          params = this.$utils.clear(params, '');
        }
        api.queryHfRimittedBookReportExport({
          pageSize: this.customerSearchPageData.pageSize,
          pageNum: this.customerSearchPageData.pageNum,
          params: params,
        })
      },
      chgDetailListExport(hfType) {
        // TODO operatorSearchData logic check

        if (this.operatorSearchData.hfMonth && this.operatorSearchData.hfMonth != '') {
          if (this.operatorSearchData.hfMonth.length != 6) {
            this.operatorSearchData.hfMonth = this.$utils.formatDate(this.operatorSearchData.hfMonth, "YYYYMM");
          }
        } else {
          this.$Message.info("导出清册时，缴费月份不能为空");
          return false;
        }

        this.operatorSearchData.hfType = hfType;
        var params = {};
        {
          // 清除 '[全部]'
          params = this.$utils.clear(this.operatorSearchData);
          // 清除空字符串
          params = this.$utils.clear(params, '');
        }
        api.chgDetailListExport({
          pageSize: this.customerSearchPageData.pageSize,
          pageNum: this.customerSearchPageData.pageNum,
          params: params,
        })
      },
      repairDetailListExport(hfType) {
        if (this.operatorSearchData.hfMonth && this.operatorSearchData.hfMonth != '') {
          if (this.operatorSearchData.hfMonth.length != 6) {
            this.operatorSearchData.hfMonth = this.$utils.formatDate(this.operatorSearchData.hfMonth, "YYYYMM");
          }
        } else {
          this.$Message.info("导出清册时，缴费月份不能为空");
          return false;
        }

        this.operatorSearchData.hfType = hfType;
        var params = {};
        {
          // 清除 '[全部]'
          params = this.$utils.clear(this.operatorSearchData);
          // 清除空字符串
          params = this.$utils.clear(params, '');
        }
        api.repairDetailListExport({
          pageSize: this.customerSearchPageData.pageSize,
          pageNum: this.customerSearchPageData.pageNum,
          params: params,
        })
      },
       //生成汇缴书打印
      printPayNote(comAccountClassId,paymentMonth){
          let results=[];
          let params={comAccountClassId:comAccountClassId,paymentMonth:paymentMonth}
          api.getRemittedBook(params).then(data=>{
            results=data.data;
            FundPay.printPayNote(results);
          }).catch(error=>{
            console.log(error)
          })
      },

    }
  }
</script>
