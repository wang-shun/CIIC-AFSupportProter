<!--零星报销tab页面-->
<template>
  <div>
    <Collapse v-model="collapseInfo" accordion>
      <Panel name="1">
        零星医疗查询
        <div slot="content">
          <Form v-model="reimbursementItem" ref="reimbursementItem" :label-width="100">
            <row>
              <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
              <Form-item label="雇员编号">
                <Input placeholder="请输入"/>
              </Form-item>
              </Col>

              <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
              <Form-item label="雇员姓名">
                <Input placeholder="请输入"/>
              </Form-item>
              </Col>

              <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
              <Form-item label="证件号码">
                <Input placeholder="请输入"/>
              </Form-item>
              </Col>
            </row>

            <row>
              <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
              <Form-item label="公司编号">
                <Input placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
              <Form-item label="公司名称">
                <Input placeholder="请输入"/>
              </Form-item>
              </Col>
            </row>
            <row>
              <Col :xs="{ span: 6, offset: 8 }" :lg="{ span: 6, offset: 8 }">
              <Button type="primary" size="large">查询</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>

    <div class="tr" style="margin: 20px auto;">
      <router-link to="/addFragmentaryReimbursement">
        <Button type="primary">新增零星报销</Button>
      </router-link>
      <Button icon="ios-download-outline" type="primary" @click="exportData(2)">导出数据</Button>
    </div>
    <Table border :columns="reimbursementColumns" :data="reimbursementData" ref="reimbursementTable"></Table>
    <Page :total="total" show-sizer show-elevator @on-change="getByPage"
          @on-page-size-change="pageSizeChange" :current.sync="page.pageNum"
          :page-size="page.pageSize"></Page>
  </div>
</template>

<script>
  import {mapState, mapActions, mapGetters} from "vuex"
  import EventTypes from "../../../store/EventTypes"

  export default {
    name: "sporadic-reimbursement-tab",
    data() {
      return {
        collapseInfo: [1, 2, 3], //展开栏
        //数据总条数
        total: 1,
        reimbursementItem: {
          employeeId: null,
          name: null,
          code: null,
          companyCode: null,
          companyName: null,
        },
        page: {
          pageNum: 1,
          pageSize: 10,
        },
        reimbursementColumns: [
          {
            title: '雇员编号', sortable: true, key: 'employeeId'
          },
          {
            title: '雇员姓名', sortable: true, key: 'column2'
          },
          {
            title: '中止日期', sortable: true, key: 'column3'
          },
          {
            title: '证件号码', sortable: true, key: 'column4'
          },
          {
            title: '公司编号', sortable: true, key: 'column5'
          },
          {
            title: '公司名称', sortable: true, key: 'column6'
          },
          {
            title: '客户经理', sortable: true, key: 'column7'
          },
          {
            title: '受理金额', sortable: true, key: 'caseMoney'
          },
          {
            title: '发票数', sortable: true, key: 'invoiceNumber'
          },
          {
            title: '医疗备注', sortable: true, key: 'medicalRemark'
          },
          {
            title: '医保结算金额', sortable: true, key: 'medicalClearingMoney'
          },
          {
            title: '医疗结算反馈', sortable: true, key: 'medicalClearingFeedBack'
          },
          {
            title: '转出地点', sortable: true, key: 'column13'
          },
          {
            title: '转出时间', sortable: true, key: 'column14'
          }
        ],
      }
    },
    computed: {
      ...mapState("TRANSFER", {reimbursementData: state => state.data.reimbursementData,})
    },
    created() {
      this.query();
    },
    methods: {
      ...mapActions("TRANSFER", [EventTypes.REIMBURSEMENT_LIST]),
      query() {
        /*封装为后台可以接受的数据结构*/
        let queryData = this.page;
        queryData.params = this.reimbursementItem;
        this[EventTypes.REIMBURSEMENT_LIST](queryData).then(() => {
          this.total = this.$store.state.TRANSFER.data.reimbursementTotal;
        })
      },
      ok() {
        this.$Message.info('已审核通过');
      },
      remove(index) {
        this.reimbursementData.splice(index, 1);
      },
      //分页方法
      getByPage() {
        this.query()
      },
      pageSizeChange(pageSize) {
        this.page.pageSize = pageSize;
        this.query()
      },
      // 导出csv
      exportData(type) {
        if (type === 1) {
          this.$refs.reimbursementTable.exportCsv({
            filename: '原始数据'
          });
        } else if (type === 3) {
          this.$refs.table.exportCsv({
            filename: '自定义数据',
            columns: this.reimbursementColumns.filter((col, index) => index < 4),
            data: this.reimbursementData.filter((data, index) => index < 4)
          });
        }
      }
    }
  }
</script>

<style scoped>

</style>
