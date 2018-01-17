<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        年调客户雇员信息维护
        <div slot="content">
          <Form :label-width=150 ref="exportSearchData" :model="exportSearchData">
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="调整年份：" prop="adjustYear">
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="客户编号：" prop="companyId">
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="客户名称：" prop="companyName">
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="雇员姓名：" prop="employeeName">
                <Input v-model="exportSearchData.employeeName"></Input>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="雇员身份证号：" prop="idNum">
                <Input v-model="exportSearchData.idNum"></Input>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="社保基数：">
                <Col span="10">
                  <Form-item prop="baseAmountStart">
                    <Input v-model="exportSearchData.baseAmountStart"></Input>
                  </Form-item>
                </Col>
                <Col span="2" offset="2">-</Col>
                <Col span="10">
                <Form-item prop="baseAmountEnd">
                  <Input v-model="exportSearchData.baseAmountEnd"></Input>
                </Form-item>
                </Col>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span: 24}" class="tr">
              <Button type="primary" icon="ios-search" @click="handlePageNum(1)">查询</Button>
              <Button type="warning" @click="$refs['exportSearchData'].resetFields()">重置</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>

    </Collapse>

    <Row class="mt20">
      <Col :sm="{span:24}">
      <Table border ref="employeeResultData"
             :columns="employeeResultColumns"
             :data="employeeResultData"
      ></Table>
      <Page
        class="pageSize"
        @on-change="handlePageNum"
        @on-page-size-change="handlePageSize"
        :total="employeeResultPageData.total"
        :page-size="employeeResultPageData.pageSize"
        :page-size-opts="employeeResultPageData.pageSizeOpts"
        :current="employeeResultPageData.pageNum"
        show-sizer show-total></Page>
      </Col>
    </Row>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import EventType from '../../../store/EventTypes'
  import api from '../../../api/social_security/year_base_applicate/annual_adjust_company_emp'

  export default {
    data() {
      return {
        collapseInfo: [1], //展开栏
        exportSearchData: {
          employeeName: '',
          idNum: '',
          baseAmountStart: '',
          baseAmountEnd: '',
        },

        employeeResultData: [],
        employeeResultPageData: {
          total: 0,
          pageNum: 1,
          pageSize: this.$utils.DEFAULT_PAGE_SIZE,
          pageSizeOpts: this.$utils.DEFAULT_PAGE_SIZE_OPTS
        },
        employeeResultColumns: [
          {
            title: '选择', key: 'annual_adjust_company_emp_id', width: 100, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('input', {
                  props: {type: 'checkbox'},
                  style: {},
                  on: {
                    click: () => {
                      this.selectRow(params.row.annualAdjustCompanyEmpId)
                    }
                  }
                }, ''),
              ]);
            }
          },
          {
            title: '雇员编号', key: 'employeeId', width: 100, align: 'center'
          },
          {
            title: '雇员姓名', key: 'employeeName', width: 100, align: 'center'
          },
          {
            title: '社保账号', key: 'ssSerial', width: 120, align: 'center'
          },
          {
            title: '工资', key: 'salary', width: 120, align: 'center'
          },
          {
            title: '身份证号', key: 'idNum', width: 160, align: 'center'
          },
          {
            title: '社保状态', key: 'archiveStatus', width: 80, align: 'center',
            render: (h, params) => {
              return this.$decode.archiveStatus(params.row.archiveStatus)
            }
          },
          {
            title: '社保类型', key: 'ssAccountType', width: 100, align: 'center',
            render: (h, params) => {
              return this.$decode.accountType(params.row.ssAccountType)
            }
          },
          {
            title: '人员分类', key: 'empClassify', width: 100, align: 'center',
            render: (h, params) => {
              return this.$decode.empClassify(params.row.empClassify)
            }
          },
          {
            title: '社保基数', key: 'baseAmount', width: 120, align: 'center'
          },
          {
            title: '结算区县', key: 'settlementArea', width: 80, align: 'center'
          },
          {
            title: '参保户登记码', key: 'ssAccount', width: 100, align: 'center'
          },
          {
            title: '养老金独立开户用户名', key: 'ssUsername', width: 120, align: 'center'
          },
          {
            title: '养老金独立开户密码', key: 'ssPwd', width: 120, align: 'center'
          }
        ]
      }
    },
    mounted() {

    },
    methods: {
      annualAdjustEmployeeQuery() {
        // 处理参数
        var params = {};
        {
          // 清除 '[全部]'
          params = this.$utils.clear(this.exportSearchData);
          // 清除空字符串
          params = this.$utils.clear(params, '');

          // 处理
          if ((!params.ssAccountType || params.ssAccountType == "[全部]" || params.ssAccountType == "1")
            && (!params.companyId || params.companyId == "")) {
            this.$Message.error("账户类型未设定，或设定为全部或中智大库时，请选择客户");
            return false;
          }
        }
        api.annualAdjustEmployeeQuery(
          {
            pageSize: this.employeeResultPageData.pageSize,
            pageNum: this.employeeResultPageData.pageNum,
            params: params,
          }
        ).then(data => {
          if (data.code == 200) {
            this.employeeResultData = data.data.rows;
            this.employeeResultPageData.total = Number(data.data.total);
          }
        })
      },
      handlePageNum(val) {
        this.employeeResultPageData.pageNum = val;
        this.annualAdjustEmployeeQuery();
      },
      handlePageSize(val) {
        this.employeeResultPageData.pageSize = val;
        this.annualAdjustEmployeeQuery();
      },
      exprotExcel() {
      }
    }
  }
</script>
