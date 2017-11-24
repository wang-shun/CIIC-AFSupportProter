<template>
  <div class="smList">
    <Collapse v-model="collapseInfo" accordion>
      <Panel name="1">
        <div slot="content">
          <Form :model="formItem" :label-width="100">
            <Row>
              <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
              <Form-item label="活动主题">
                <Input v-model="formItem.activitytitle" placeholder="请输入"></Input>
              </Form-item>
              </Col>
              <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
              <Form-item label="状态">
                <Select v-model="formItem.status" placeholder="请选择">
                  <Option v-for="item in statusTypes" :value="item.value" :key="item.value">{{item.label}}</Option>
                </Select>
              </Form-item>
              </Col>
            </Row>
            <Row>
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
      <Row :gutter="16">
        <Col span="2">
        <router-link to="/addActivity">
          <Button type="info">新增活动</Button>
        </router-link>
        </Col>
      </Row>
    </div>
    <Table border :columns="marketListColumns" :data="marketListData" ref="table"></Table>
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
          activitytitle: '',
          status: '',
        },
        marketListColumns: [{
          title: '主题', sortable: true, key: 'activitytitle'
        }, {
          title: '发布人', sortable: true, key: 'publisher'
        }, {
          title: '开始时间', sortable: true, key: 'begintime'
        }, {
          title: '结束时间', sortable: true, key: 'endtime'
        }, {
          title: '状态', sortable: true, key: 'status'
        }, {
          title: '内容', sortable: true, key: 'content'
        }, {
          title: '操作', align: 'center',key: 'action',
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
                      this.$router.push({
                        name: 'addActivity',
                        params: {
                          data: params.row
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
        }],
        peopleTypes: [{
          value: '0', label: '全部'
        }, {
          value: '1', label: '雇员'
        }, {
          value: '2', label: '子女'
        }, {
          value: '3', label: '配偶'
        }],
        statusTypes: [{
          value: '4', label: '全部'
        }, {
          value: '0', label: '待审核'
        }, {
          value: '1', label: '进行中'
        }, {
          value: '2', label: '已结束'
        }],
      }
    },
    computed: {
      ...mapState("MARKET", {
        marketListData: state => state.data.marketListData,
      }),
    },
    created() {
      this[EventTypes.MARKETAPPLICATIONTYPE](this.formItem)
    },
    methods: {
      ...mapActions("MARKET", [EventTypes.MARKETAPPLICATIONTYPE]),
      query() {
        this[EventTypes.MARKETAPPLICATIONTYPE](this.formItem);
      },
      show(index) {
        this.$Modal.info({
          title: '用户信息',
          content: `姓名：${this.data6[index].name}<br>年龄：${this.data6[index].age}<br>地址：${this.data6[index].address}`
        })
      },
      remove(index) {
        this.data6.splice(index, 1);
      },
      // 导出csv
      exportData(type) {
        if (type === 1) {
          this.$refs.table.exportCsv({
            filename: '原始数据'
          });
        } else if (type === 2) {
          this.$refs.table.exportCsv({
            filename: '排序和过滤后的数据',
            original: false
          });
        } else if (type === 3) {
          this.$refs.table.exportCsv({
            filename: '自定义数据',
            columns: this.columns7.filter((col, index) => index < 4),
            data: this.data6.filter((data, index) => index < 4)
          });
        }
      }
    }
  }
</script>

<style scoped>
  .ivu-card {
    background: rgba(246, 246, 246, 1);
  }

  .checkBtn .ivu-btn {
    float: right;
  }
</style>
