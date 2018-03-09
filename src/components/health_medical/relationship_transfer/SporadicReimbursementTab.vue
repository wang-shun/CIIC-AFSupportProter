<!--零星报销tab页面-->
<template>
  <div>
    <Collapse v-model="collapseInfo" accordion>
      <Panel name="1">
        零星医疗查询
        <div slot="content">
          <Form ref="reimbursementItem" :model="reimbursementItem" :label-width="140">
            <Row type="flex" justify="start" class="mt20 mr10">
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="雇员编号">
                <Input placeholder="请输入"/>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="雇员姓名">
                <Input placeholder="请输入"/>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="证件号码">
                <Input placeholder="请输入"/>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="公司编号">
                <Input placeholder="请输入"/>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="公司名称">
                <Input placeholder="请输入"/>
              </FormItem>
              </Col>
            </row>
            <Row type="flex" justify="start">
              <Col :sm="{span: 24}" class="tr">
              <Button type="primary" @click="getByPage(1)" size="large">查询</Button>
              <Button type="warning" @click="resetSearchCondition('reimbursementItem')">重置</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>

    <div class="tr m20">
      <router-link to="/addReimbursement">
        <Button type="info">新增零星报销</Button>
      </router-link>
      <Button icon="ios-download-outline" type="info" @click="exportData(2)">导出数据</Button>
    </div>
    <Table border :columns="reimbursementColumns" :data="reimbursementData" ref="reimbursementTable"></Table>
    <Page :total="reimbursementTotal"
          show-sizer
          show-elevator
          @on-change="getByPage"
          @on-page-size-change="pageSizeChange"
          :current.sync="reimbursementItem.current"
          :page-size="reimbursementItem.size"></Page>
  </div>
</template>

<script>
  import {mapState, mapActions, mapGetters} from "vuex"
  import EventTypes from "../../../store/event_types"

  export default {
    name: "sporadic-reimbursement-tab",
    data() {
      return {
        collapseInfo: [1, 2, 3], //展开栏
        reimbursementItem: {
          current: 1,
          size: 10,
          employeeId: null,
          name: null,
          code: null,
          companyCode: null,
          companyName: null,
        },
        reimbursementColumns: [
          {
            title: '雇员编号', sortable: true, key: 'employeeId', align: "center",
          },
          {
            title: '雇员姓名', sortable: true, key: 'column2', align: "center",
          },
          {
            title: '中止日期', sortable: true, key: 'column3', align: "center",
            render: (h, params) => {
              return this.$utils.formatDate(params.row.column3, 'YYYY-MM-DD HH:mm:ss');
            }
          },
          {
            title: '证件号码', sortable: true, key: 'column4', align: "center",
          },
          {
            title: '公司编号', sortable: true, key: 'column5', align: "center",
          },
          {
            title: '公司名称', sortable: true, key: 'column6', align: "center",
          },
          {
            title: '客户经理', sortable: true, key: 'column7', align: "center",
          },
          {
            title: '受理金额', sortable: true, key: 'caseMoney', align: "center",
          },
          {
            title: '发票数', sortable: true, key: 'invoiceNumber', align: "center",
          },
          {
            title: '医疗备注', sortable: true, key: 'medicalRemark', align: "center",
          },
          {
            title: '医保结算金额', sortable: true, key: 'medicalClearingMoney', align: "center",
          },
          {
            title: '医疗结算反馈', sortable: true, key: 'medicalClearingFeedBack', align: "center",
          },
          {
            title: '转出地点', sortable: true, key: 'column13', align: "center",
          },
          {
            title: '转出时间', sortable: true, key: 'column14', align: "center",
            render: (h, params) => {
              return this.$utils.formatDate(params.row.column14, 'YYYY-MM-DD HH:mm:ss');
            }
          },
          {
            title: "操作", sortable: true, align: "center",
            render: (h, params) => {
              return h("div", [
                h("Button", {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  style: {marginRight: "5px"},
                  on: {
                    click: () => {
                      sessionStorage.setItem('reimbursementFormItem', JSON.stringify(params.row));
                      this.$router.push({name: "updateReimbursement"});
                    }
                  }
                }, "编辑"),
              ]);
            }
          }
        ],
      }
    },
    computed: {
      ...mapState("TRANSFER", {
        reimbursementData: state => state.data.reimbursementData,
        reimbursementTotal: state => state.data.reimbursementTotal
      })
    },
    created() {
      this.getByPage(1);
    },
    methods: {
      ...mapActions("TRANSFER", [EventTypes.REIMBURSEMENT_LIST]),
      query() {
        /*封装为后台可以接受的数据结构*/
        this[EventTypes.REIMBURSEMENT_LIST](this.reimbursementItem);
      },
      ok() {
        this.$Message.info('已审核通过');
      },
      remove(index) {
        this.reimbursementData.splice(index, 1);
      },
      //分页方法
      getByPage(val) {
        this.reimbursementItem.current = val;
        this.query()
      },
      pageSizeChange(pageSize) {
        this.reimbursementItem.size = pageSize;
        this.query()
      },
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
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
