<!--医疗关系转移--关系转移tab页面-->
<template>
  <div>
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        医疗关系查询
        <div slot="content">
          <Form v-model="transferItem" ref="transferItem" :label-width="100">
            <row>
              <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
              <Form-item label="雇员编号">
                <Input v-model="transferItem.employeeId" placeholder="请输入"/>
              </Form-item>
              </Col>

              <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
              <Form-item label="雇员姓名">
                <Input v-model="transferItem.name" placeholder="请输入"/>
              </Form-item>
              </Col>

              <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
              <Form-item label="证件号码">
                <Input v-model="transferItem.code" placeholder="请输入"/>
              </Form-item>
              </Col>
            </row>
            <row>
              <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
              <Form-item label="公司编号">
                <Input v-model="transferItem.companyCode" placeholder="请输入"/>
              </Form-item>
              </Col>

              <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
              <Form-item label="公司名称">
                <Input v-model="transferItem.companyName" placeholder="请输入"/>
              </Form-item>
              </Col>
            </row>

            <row>
              <Col :xs="{ span: 6, offset: 8 }" :lg="{ span: 6, offset: 8 }">
              <Button type="primary" @click="queryTransfer" size="large">查询</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>
    <div class="tr m20">
      <router-link to="/addMedicalRelationship">
        <Button type="primary">新增医疗关系转移</Button>
      </router-link>
      <Button icon="ios-download-outline" type="primary" @click="exportDataTransfer(1)">导出数据</Button>
    </div>
    <Table border :columns="transferColumns" :data="transferData" ref="transferTable"></Table>
    <Page :total="transferTotal" show-sizer show-elevator @on-change="getTransferByPage"
          @on-page-size-change="pageSizeChangeTransfer" :current.sync="transferPage.pageNum"
          :page-size="transferPage.pageSize"></Page>
  </div>
</template>

<script>
  import {mapState, mapActions, mapGetters} from "vuex"
  import EventTypes from "../../../store/event_types"

  export default {
    name: "medical-relationship",
    data() {
      return {
        collapseInfo: [1, 2, 3], //展开栏
        transferItem: {
          employeeId: null,
          name: null,
          code: null,
          companyCode: null,
          companyName: null,
        },
        transferPage: {
          pageNum: 1,
          pageSize: 10,
        },
        transferColumns: [
          {
            title: '雇员编号', sortable: true, key: 'employeeId', align: "center",
          },
          {
            title: '雇员姓名', sortable: true, key: 'column2', align: "center",
          },
          {
            title: '中止日期', sortable: true, key: 'column3', align: "center",
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
            title: '转出日期', sortable: true, key: 'turnOutDate', align: "center",
          },
          {
            title: '转出地点', sortable: true, key: 'turnOutAddress', align: "center",
          },
          {
            title: '转回日期', sortable: true, key: 'turnBackDate', align: "center",
          },
          {
            title: '备注', sortable: true, key: 'remark'
          }, {
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
                      let updateData = params.row;
                      delete updateData._index;
                      delete updateData._rowKey;
                      this.$router.push({name: "updateMedicalRelationship", params: {data: updateData}});
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
        transferData: state => state.data.transferData,
        transferTotal: state => state.data.transferTotal
      }),
    },
    created() {
      this.queryTransfer();
    },
    methods: {
      ...mapActions("TRANSFER", [EventTypes.TRANSFER_LIST]),
      queryTransfer() {
        /*封装为后台可以接受的数据结构*/
        let queryData = this.transferPage;
        queryData.params = this.transferItem;
        this[EventTypes.TRANSFER_LIST](queryData);
      },
      ok() {
        this.$Message.info('已审核通过');
      },
      remove(index) {
        this.transferData.splice(index, 1);
      },
      //分页方法
      getTransferByPage() {
        this.queryTransfer()
      },
      pageSizeChangeTransfer(pageSize) {
        this.transferPage.pageSize = pageSize;
        this.queryTransfer()
      },
      // 导出csv
      exportDataTransfer(type) {
        if (type === 1) {
          this.$refs.transferTable.exportCsv({
            filename: '原始数据'
          });
        } else if (type === 2) {
          this.$refs.transferTable.exportCsv({
            filename: '排序和过滤后的数据',
            original: false
          });
        } else if (type === 3) {
          this.$refs.table.exportCsv({
            filename: '自定义数据',
            columns: this.transferColumns.filter((col, index) => index < 4),
            data: this.transferData.filter((data, index) => index < 4)
          });
        }
      }
    }
  };
</script>

<style scoped>

</style>
