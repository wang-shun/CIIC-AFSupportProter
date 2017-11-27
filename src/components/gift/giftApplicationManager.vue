<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
    <Panel name="1">
      礼品管理查询
      <div slot="content">
        <Form :model="formItem" ref="formItem" :label-width="100">
          <Row>
            <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
              <Form-item label="礼品名称" prop="giftname">
                <Input v-model="formItem.giftname" placeholder="请输入"/>
              </Form-item>
            </Col>
            <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
              <Form-item label="状态" prop="status">
                <Select v-model="formItem.status" placeholder="请选择">
                  <Option v-for="item in statusProperties" :value="item.value" :key="item.value">{{item.label}}</Option>
                </Select>
              </Form-item>
            </Col>
            <Col :xs="{ span: 3, offset: 12 }" :lg="{ span: 3, offset: 12 }">
              <Button type="primary" @click="query()" icon="ios-search">查询</Button>
              <Button type="warning" @click="resetSearchCondition('formItem')">重置</Button>
            </Col>
          </Row>
        </Form>
      </div>
    </Panel>
  </Collapse>

    <div class="create">
      <router-link to="/giftAdd">
        <Button type="info">新增礼品</Button>
      </router-link>
      <router-link to="/personChoose">
        <Button type="info">礼品申请</Button>
      </router-link>
    </div>
    <Table border :columns="giftManagerColumns" :data="giftManagerData" ref="table"></Table>
    <Page :total="100" show-sizer show-elevator></Page>

  </div>
</template>

<script>
  import {mapState, mapActions, mapGetters} from "vuex"
  import EventTypes from "../../store/EventTypes"

  export default {
    data() {
      return {
        collapseInfo: [1, 2, 3], //展开栏
        formItem: {
          giftid: null,
          giftname: "",
          status: "",
        },

        peopleTypes: [{
          value: "0", label: "全部"
        }, {
          value: "1", label: "雇员"
        }, {
          value: "2", label: "子女"
        }, {
          value: "3", label: "配偶"
        }],

        statusProperties: [{
          value: "0", label: "正常"
        }, {
          value: "1", label: "已下架"
        }],

        giftManagerColumns: [{
          title: "礼品名称", sortable: true, key: "giftname",align: "center"
        }, {
          title: "类别", sortable: true, key: "gifttype",align: "center"
        }, {
          title: "价格", sortable: true, key: "price",align: "center"
        }, {
          title: "数量", sortable: true, key: "number",align: "center"
        }, {
          title: "备注", sortable: true, key: "remarks",align: "center"
        }, {
          title: "状态", sortable: true, key: "status",align: "center"
        }, {
          title: "操作", key: "action", width: 300, align: "center",
          render: (h, params) => {
            if (params.row.status == '0') {
              return h("div", [
                h("Button", {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  style: {marginRight: "5px"},
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "giftAdd",
                        params: {data: params.row}
                      });
                    }
                  }
                }, "编辑"),
                h("Button", {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "giftApplicationManager",
                        params: {data: params.row}
                      });
                    }
                  }
                }, "发放记录")
              ]);
            } else {
              return h("div", [
                h("Button", {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "giftApplicationManager",
                        params: {
                          data: params.row
                        }
                      });
                    }
                  }
                }, "发放记录")
              ]);
            }
          }
        }],
      };
    },
    computed: {
      ...mapState("GIFT", {giftManagerData: state => state.data.giftManagerData,}),
    },
    created() {
//      this.$store.dispatch(EventTypes.GIFTAPPLICATIONTYPE,this.formItem);
      this[EventTypes.GIFTAPPLICATIONTYPE](this.formItem)
    },
    methods: {
      ...mapActions("GIFT", [EventTypes.GIFTAPPLICATIONTYPE]),

      query() {
        this[EventTypes.GIFTAPPLICATIONTYPE](this.formItem)
      },
      resetSearchCondition(name) {
        console.info(name)
        this.$refs[name].resetFields()
      },
      show(index) {
        this.$Modal.info({
          title: "用户信息",
          content: `姓名：${this.data6[index].name}<br>年龄：${this.data6[index].age}<br>地址：${this.data6[index].address}`
        });
      },
      remove(index) {
        this.data6.splice(index, 1);
      },
      showModel() {
        this.modal1 = true;
      },
      // 导出csv
      exportData(type) {
        if (type === 1) {
          this.$refs.table.exportCsv({
            filename: "原始数据"
          });
        } else if (type === 2) {
          this.$refs.table.exportCsv({
            filename: "排序和过滤后的数据",
            original: false
          });
        } else if (type === 3) {
          this.$refs.table.exportCsv({
            filename: "自定义数据",
            columns: this.columns7.filter((col, index) => index < 4),
            data: this.data6.filter((data, index) => index < 4)
          });
        }
      }
    }
  };
</script>

<style>

</style>
