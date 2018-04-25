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
                <Form-item label="企业公积金账号：" prop="basicHfComAccount">
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
                <Button type="primary" icon="ios-search" @click="handlePageNum(1)">缴费明细</Button>
                <Button type="warning" @click="resetSearchCondition('operatorSearchData')">重置</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>
    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <Button type="primary" @click="chgDetailListExport(1)">基本公积金汇缴变更清册</Button>
        <Button type="primary" @click="repairDetailListExport(1)">基本公积金补缴清册</Button>
        <Button type="primary" @click="chgDetailListExport(2)">补充公积金汇缴变更清册</Button>
        <Button type="primary" @click="repairDetailListExport(2)">补充公积金补缴清册</Button>
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
        accountTypeList: [],
        customerData: [],
        customerColumns: [
          {title: '公积金类型', key: 'hfTypeName', width: 100, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.hfTypeName),
              ]);
            }
          },
          {title: '雇员编号', key: 'employeeId', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.employeeId),
              ]);
            }
          },
          {title: '雇员姓名', key: 'employeeName', width: 100, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.employeeName),
              ]);
            }
          },
          {title: '公积金账号', key: 'hfEmpAccount', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.hfEmpAccount),
              ]);
            }
          },
          {title: '证件号码', key: 'idNum', width: 200, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.idNum),
              ]);
            }
          },
          {title: '缴费月份', key: 'hfMonth', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.hfMonth),
              ]);
            }
          },
          {title: '所属公积金月份', key: 'ssMonthBelong', width: 130, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.ssMonthBelong),
              ]);
            }
          },
          {title: '缴费类型', key: 'paymentTypeName', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.paymentTypeName),
              ]);
            }
          },
          {title: '公积金基数', key: 'base', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.base),
              ]);
            }
          },
          {title: '公积金比例', key: 'ratio', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.ratio),
              ]);
            }
          },
          {title: '公积金金额', key: 'amount', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.amount),
              ]);
            }
          },
          {title: '公司编号', key: 'companyId', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.companyId),
              ]);
            }
          },
          {title: '公司全称', key: 'companyName', width: 250, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.companyName),
              ]);
            }
          },
          {title: '公司公积金账号', key: 'hfComAccount', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.hfComAccount),
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
      dict.getDictData().then(data => {
        if (data.code == 200) {
          this.accountTypeList = data.data.SocialSecurityAccountType;
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
        if (this.operatorSearchData.hfMonth) {
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
        api.hfMonthChargeQuery({
          pageSize: this.customerSearchPageData.pageSize,
          pageNum: this.customerSearchPageData.pageNum,
          params: params,
        }).then(data => {
          if (data.code == 200) {
            this.customerData = data.data.rows;
            this.customerSearchPageData.total = Number(data.data.total);
          }
        })
      },
      excelExport() {
        if (this.operatorSearchData.hfMonth) {
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
        api.hfMonthChargeExport({
          pageSize: this.customerSearchPageData.pageSize,
          pageNum: this.customerSearchPageData.pageNum,
          params: params,
        })
      },
      chgDetailListExport(hfType) {
        // TODO operatorSearchData logic check

        if (this.operatorSearchData.hfMonth && this.operatorSearchData.hfMonth != '') {
          this.operatorSearchData.hfMonth = this.$utils.formatDate(this.operatorSearchData.hfMonth, "YYYYMM");
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
          this.operatorSearchData.hfMonth = this.$utils.formatDate(this.operatorSearchData.hfMonth, "YYYYMM");
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
      }

    }
  }
</script>
