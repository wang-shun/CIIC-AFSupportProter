<template>
  <div>
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        礼品管理查询
        <div slot="content">
          <Form :model="formItem" ref="formItem" :label-width="100">
            <Row class="mt20 mr10">
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="礼品名称" prop="giftName">
                <Input v-model="formItem.giftName" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="状态" prop="status">
                <Select v-model="formItem.status" :clearable="true" placeholder="请选择">
                  <Option v-for="item in statusProperties" :value="item.value" :key="item.value">{{item.label}}</Option>
                </Select>
              </Form-item>
              </Col>
            </Row>
            <Row type="flex" justify="start">
              <Col :sm="{span: 24}" class="tr">
              <Button type="primary" @click="getByPage(1)" icon="ios-search">查询</Button>
              <Button type="warning" @click="resetSearchCondition('formItem')">重置</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>
    <div class="tr m20">
      <router-link to="/giftAdd">
        <Button type="info">新增礼品</Button>
      </router-link>
    </div>
    <Table border :columns="giftManagerColumns" :data="giftManagerData" ref="giftManagerTable"></Table>
    <Page show-sizer show-elevator
          @on-change="getByPage"
          @on-page-size-change="pageSizeChange"
          :total="formItem.total"
          :current="formItem.current"
          :page-size="formItem.size"></Page>

  </div>
</template>

<script>
  import {mapState, mapActions, mapGetters} from "vuex"
  import EventTypes from "../../../store/event_types"

  export default {
    data() {
      return {
        collapseInfo: [1, 2, 3], //展开栏
        formItem: {
          id: null,
          giftName: "",
          status: "",
          current: 1,
          size: 10,
          total: 0
        },

        peopleTypes: [
          {
            value: "0", label: "全部"
          },
          {
            value: "1", label: "雇员"
          },
          {
            value: "2", label: "子女"
          },
          {
            value: "3", label: "配偶"
          }
        ],

        statusProperties: [
          {
            value: "0", label: "正常"
          }, {
            value: "1", label: "已下架"
          }
        ],

        giftManagerColumns: [
          {
            title: "礼品名称", sortable: true, key: "giftName", align: "center"
          }, {
            title: "类别", sortable: true, key: "giftType", align: "center",
            render: (h, params) => {
              switch (params.row.giftType) {
                case 0:
                  return "票券";
                  break;
                case 1:
                  return "办公用品";
                  break;
                case 2:
                  return "生活用品";
                  break;
                case 3:
                  return "食品";
                  break;
                case 4:
                  return "饰品";
                  break;
                case 5:
                  return "数码周边";
                  break;
                case 6:
                  return "儿童用品";
                  break;

              }
            }
          }, {
            title: "价格", sortable: true, key: "price", align: "center"
          }, {
            title: "数量", sortable: true, key: "number", align: "center"
          }, {
            title: "备注", sortable: true, key: "remarks", align: "center"
          }, {
            title: "状态", sortable: true, key: "status", align: "center",
            render: (h, params) => {
              switch (params.row.status) {
                case 0:
                  return "正常";
                  break;
                case 1:
                  return "已下架";
                  break;
              }
            }
          }, {
            title: "操作", key: "action", width: 200, align: "center",
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
                        let updateData = params.row;
                        delete updateData._index;
                        delete updateData._rowKey;
                        delete updateData.page;
                        delete updateData.createTime;
                        delete updateData.modifiedTime;
                        updateData.rightPerson = updateData.rightPerson + '';
                        updateData.giftType = updateData.giftType + '';
                        updateData.status = updateData.status + '';
                        this.$router.push({name: "giftUpdate", params: {data: updateData}});
                      }
                    }
                  }, "编辑")
                ]);
              }
            }
          }],
      };
    },
    computed: {
      ...mapState("GIFT", {
        giftManagerData: state => state.data.giftManagerData,
      })
    },
    created() {
      // this.$store.dispatch(EventTypes.GIFTAPPLICATIONTYPE, this.formItem);
      this.getByPage(1);
    },
    methods: {
      ...mapActions("GIFT", [EventTypes.GIFTAPPLICATIONTYPE]),

      query() {
        this[EventTypes.GIFTAPPLICATIONTYPE](this.formItem).then(() => {
          this.formItem.total = this.$store.state.GIFT.data.total;
        })
      },
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
      getByPage(val) {
        this.formItem.current = val;
        this.query()
      },
      pageSizeChange(size) {
        this.formItem.size = size;
        this.query()
      },
    },
  };
</script>

<style>

</style>
