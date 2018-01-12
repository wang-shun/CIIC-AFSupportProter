<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        雇员工资收集表下载
        <div slot="content">
          <Form :label-width=150 ref="exportSearchData" :model="exportSearchData">
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="账户类型：" prop="ssAccountType">
                <Select v-model="exportSearchData.ssAccountType" style="width: 100%;" transfer>
                  <Option value="[全部]" label="全部"></Option>
                  <Option value="1" label="中智大库"></Option>
                  <Option value="2" label="中智外包"></Option>
                  <Option value="3" label="独立户"></Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="客户编号：" prop="companyId">
                <input-company v-model="exportSearchData.companyId"></input-company>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="离职人员的离职日期：">
                  <Col span="10">
                  <Form-item prop="startOutDate">
                    <Date-picker v-model="exportSearchData.startOutDate" type="date"
                                 placeholder="选择年月日" style="width: 100%;"></Date-picker>
                  </Form-item>
                  </Col>
                  <Col span="2" offset="2">-</Col>
                  <Col span="10">
                  <Form-item prop="endOutDate">
                    <Date-picker v-model="exportSearchData.endOutDate" type="date"
                                 placeholder="选择年月日" style="width: 100%;"></Date-picker>
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
      <Col :sm="{span: 24}">
      <Button type="info" @click="exprotExcel">导出</Button>
      </Col>
    </Row>

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
  import api from '../../../api/social_security/sh_social_security/employeesocannualadjust'
  import InputCompany from '../../commoncontrol/form/input-company'

  export default {
    components: {InputCompany},

    data() {
      return {
        collapseInfo: [1], //展开栏
        exportSearchData: {
          ssAccountType: '',
          companyId: '',
          startOutDate: '',
          endOutDate: '',
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
            title: '客户编号', key: 'companyId', width: 120, align: 'center'
          },
          {
            title: '客户名称', key: 'title', width: 200, align: 'center'
          },
          {
            title: '雇员编号', key: 'employeeId', width: 120, align: 'center'
          },
          {
            title: '雇员姓名', key: 'employeeName', width: 150, align: 'center'
          },
          {
            title: '身份证号', key: 'idNum', width: 200, align: 'center'
          },
          {
            title: '离职状态', key: 'outStatus', width: 100, align: 'center',
            render: (h, params) => {
              return this.$decode.outStatus(params.row.outStatus)
            }
          },
          {
            title: '社保基数', key: 'baseAmount', width: 150, align: 'center'
          },
          {
            title: '工资', key: 'salary', width: 150, align: 'center'
          }
        ]
      }
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
          if (params.startOutDate) {
            params.startOutDate = this.$utils.formatDate(params.startOutDate, 'YYYY-MM-DD');
          }
          if (params.endOutDate) {
            params.endOutDate = this.$utils.formatDate(params.endOutDate, 'YYYY-MM-DD');
          }
          if (params.startOutDate && params.endOutDate && params.startOutDate > params.endOutDate) {
            this.$Message.error("起始日期不能大于截止日期");
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
