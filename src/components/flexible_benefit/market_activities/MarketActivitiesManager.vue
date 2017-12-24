<template>
  <div class="smList">
    <Collapse v-model="collapseInfo" accordion>
      <Panel name="1">
        市场活动查询
        <div slot="content">
          <Form :model="formItem" ref="formItem" :label-width="100">
            <Row>
              <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
              <Form-item label="活动主题" prop="activityTitle">
                <Input v-model="formItem.activityTitle" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
              <Form-item label="状态" prop="status">
                <Select v-model="formItem.status" :clearable="true" placeholder="请选择">
                  <Option v-for="item in statusTypes" :value="item.value" :key="item.value">{{item.label}}</Option>
                </Select>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :xs="{ span: 3, offset: 12 }" :lg="{ span: 3, offset: 12 }">
              <Button type="primary" @click="getByPage(1)" icon="ios-search">查询</Button>
              <Button type="warning" @click="resetSearchCondition('formItem')">重置</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>
    <div class="tr" style="margin: 20px auto">
      <router-link to="/addActivity">
        <Button type="info">新增活动</Button>
      </router-link>
    </div>
    <Table border :columns="marketListColumns" :data="marketListData" ref="marketManagerTable"></Table>
    <Page show-sizer
          show-elevator
          @on-change="getByPage"
          @on-page-size-change="pageSizeChange"
          :current.sync="formItem.current"
          :total="formItem.total"
          :page-size="formItem.size"></Page>

  </div>
</template>
<script>
  import {mapState, mapActions, mapGetters} from "vuex"
  import EventTypes from "../../../store/EventTypes"

  export default {
    data() {
      return {
        collapseInfo: [1, 2, 3], //展开栏
        formItem: {
          activityTitle: '',
          status: '',
          current: 1,
          size: 10,
          total: 0,
        },
        marketListColumns: [
          {
            title: '主题', sortable: true, key: 'activityTitle', align: "center",
          },
          {
            title: '发布人', sortable: true, key: 'publisher', align: "center",
          },
          {
            title: '开始时间', sortable: true, key: 'beginTime', align: "center",
            render: (h, params) => {
              return this.$utils.formatDate(params.row.beginTime, 'YYYY-MM-DD');
            }
          },
          {
            title: '结束时间', sortable: true, key: 'endTime', align: "center",
            render: (h, params) => {
              return this.$utils.formatDate(params.row.endTime, 'YYYY-MM-DD');
            }
          },
          {
            title: '状态', sortable: true, key: 'status', align: "center",
            render: (h, params) => {
              switch (params.row.status) {
                case 0:
                  return "进行中";
                  break;
                case 1:
                  return "已结束";
                  break;
              }
            }
          },
          {
            title: '内容', sortable: true, key: 'content', align: "center",
          },
          {
            title: '操作', align: 'center', key: 'action', align: "center",
            width: 240,
            render: (h, params) => {
              if (params.row.status == '0') {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'success',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        /*处理数据*/
                        let updateData = params.row;
                        delete updateData._index;
                        delete updateData._rowKey;
                        delete updateData.page;
                        delete updateData.createTime;
                        updateData.status = updateData.status + '';
                        updateData.giftForm = updateData.giftForm.split(',');
                        updateData.sendWay = updateData.sendWay.split(',');
                        /*拼接活动时间数组*/
                        let time = [];
                        time.push(this.$utils.formatDate(updateData.beginTime, 'YYYY-MM-DD HH:mm:ss'));//先转换为时间格式的字符串，不然时间会对应不上
                        time.push(this.$utils.formatDate(updateData.endTime, 'YYYY-MM-DD HH:mm:ss'));
                        updateData.marketTime = time;

                        this.$router.push({
                          name: 'updateActivity',
                          params: {
                            data: updateData
                          }
                        });
                      }
                    }
                  }, '编辑'),
                  h('Button', {
                    props: {
                      type: 'success',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.$router.push({
                          name: 'marketPersonChoose',
                          params: {
                            data: params.row
                          }
                        });
                      }
                    }
                  }, '申请'),
                  h('Button', {
                    props: {
                      type: 'success',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.$router.push({
                          name: 'addActivity',
                          params: {
                            data: params.row
                          }
                        });
                      }
                    }
                  }, '申请历史')
                ]);
              } else {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'success', size: 'small'
                    },
                    on: {
                      click: () => {
                        this.$router.push({
                          name: 'addActivity',
                          params: {
                            data: params.row
                          }
                        });
                      }
                    }
                  }, '申请历史')
                ]);
              }
            }
          }
        ],
        peopleTypes: [
          {
            value: '0', label: '全部'
          }, {
            value: '1', label: '雇员'
          }, {
            value: '2', label: '子女'
          }, {
            value: '3', label: '配偶'
          }],
        statusTypes: [
          {
            value: '0', label: '进行中'
          }, {
            value: '1', label: '已结束'
          }],
      }
    },
    computed: {
      ...mapState("MARKET", {
        marketListData: state => state.data.marketListData,
      }),
    },
    created() {
      this.getByPage(1);
    },
    methods: {
      ...mapActions("MARKET", [EventTypes.MARKETAPPLICATIONTYPE]),
      query() {
        this[EventTypes.MARKETAPPLICATIONTYPE](this.formItem).then(() => {
          this.formItem.total = this.$store.state.MARKET.data.total;
        });
      },
      resetSearchCondition(name) {
        this.$refs[name].resetFields();
      },
      getByPage(val) {
        this.formItem.current = val;
        this.query()
      },
      pageSizeChange(size) {
        this.formItem.pageSize = size;
        this.query()
      },
    },


  }
</script>

<style>
</style>
