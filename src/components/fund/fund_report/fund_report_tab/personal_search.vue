<template>
  <div class="smList" style="margin-bottom: 56px">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        个人查询
        <div slot="content">
          <Form :label-width=150 ref="operatorSearchData" :model="operatorSearchData">
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="雇员编号：" prop="employeeId">
                  <Input v-model="operatorSearchData.employeeId" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="雇员名称：" prop="employeeName">
                  <Input v-model="operatorSearchData.employeeName" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="基本公积金账号：" prop="basicHfEmpAccount">
                  <Input v-model="operatorSearchData.basicHfEmpAccount" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="补充公积金账号：" prop="addedHfEmpAccount">
                  <Input v-model="operatorSearchData.addedHfEmpAccount" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span: 24}" class="tr">
                <Button type="primary" icon="ios-search" @click="handlePageNum(1)" :loading="isLoading">缴费明细</Button>
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
        <Table border :columns="personalColumns" :data="personalData"></Table>
        <Page
          class="pageSize"
          @on-change="handlePageNum"
          @on-page-size-change="handlePageSize"
          :total="personalSearchPageData.total"
          :page-size="personalSearchPageData.pageSize"
          :page-size-opts="personalSearchPageData.pageSizeOpts"
          :current="personalSearchPageData.pageNum"
          show-sizer show-total></Page>
      </Col>
    </Row>
  </div>
</template>
<script>
  import api from '../../../../api/house_fund/fund_report/fund_report'
  import dict from '../../../../api/dict_access/house_fund_dict'
  export default {
    data() {
      return {
        collapseInfo: [1],
        operatorSearchData: {
          employeeId: '',
          employeeName: '',
          basicHfEmpAccount: '',
          addedHfEmpAccount: '',
        },
        isLoading: false,
        personalData: [],
        personalColumns: [
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
          {title: '基本/补充公积金账号', key: 'hfEmpAccount', width: 150, align: 'center',
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
          {title: '客户编号', key: 'companyId', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.companyId),
              ]);
            }
          },
          {title: '客户名称', key: 'companyName', width: 250, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.companyName),
              ]);
            }
          },
          {title: '企业基本/补充公积金账号', key: 'hfComAccount', width: 180, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.hfComAccount),
              ]);
            }
          },
        ],
        personalSearchPageData: {
          total: 0,
          pageNum: 1,
          pageSize: this.$utils.DEFAULT_PAGE_SIZE,
          pageSizeOpts: this.$utils.DEFAULT_PAGE_SIZE_OPTS
        },
      }
    },
    mounted() {

    },
    computed: {

    },
    methods: {
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
      handlePageNum(val) {
        this.personalSearchPageData.pageNum = val;
        this.hfMonthChargeQuery();
      },
      handlePageSize(val) {
        this.personalSearchPageData.pageNum = 1;
        this.personalSearchPageData.pageSize = val;
        this.hfMonthChargeQuery();
      },
      hfMonthChargeQuery() {
        var params = {};
        {
          // 清除 '[全部]'
          params = this.$utils.clear(this.operatorSearchData);
          // 清除空字符串
          params = this.$utils.clear(params, '');
        }
        this.isLoading = true;
        api.hfMonthChargeQuery({
          pageSize: this.personalSearchPageData.pageSize,
          pageNum: this.personalSearchPageData.pageNum,
          params: params,
        }).then(data => {
          if (data.code == 200) {
            this.personalData = data.data.rows;
            this.personalSearchPageData.total = Number(data.data.total);
          }
          this.isLoading = false;
        })
      },
      excelExport() {
        var params = {};
        {
          // 清除 '[全部]'
          params = this.$utils.clear(this.operatorSearchData);
          // 清除空字符串
          params = this.$utils.clear(params, '');
        }
        api.hfMonthChargeExport({
          pageSize: this.personalSearchPageData.pageSize,
          pageNum: this.personalSearchPageData.pageNum,
          params: params,
        })
      }
    }
  }
</script>
