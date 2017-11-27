<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        发放管理查询
        <div slot="content">
          <Form :label-width=120 ref="searchCondition" :model="searchCondition">
            <Row>
              <Col :xs="{span: 8, offset: 1}" :lg="{ span: 8, offset: 1}">
              <Form-item label="类型：">
                <Select v-model="searchCondition.customerName">
                  <Option value="beijing">全部</Option>
                  <Option value="shanghai">礼物</Option>
                  <Option value="shenzhen">市场活动</Option>
                </Select>
              </Form-item>
              </Col>
              <Col :xs="{span: 8, offset: 1}" :lg="{ span: 8, offset: 1}">
              <Form-item label="审批状态：">
                <Select v-model="searchCondition.customerNumber">
                  <Option v-for="item in examineList" :value="item.value" :key="item.value">{{item.label}}</Option>
                </Select>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :xs="{span: 8, offset: 1}" :lg="{ span: 8, offset: 1}">
              <Form-item label="发放状态：">
                <Select v-model="searchCondition.customerNumber">
                  <Option v-for="item in grantStateList" :value="item.value" :key="item.value">{{item.label}}</Option>
                </Select>
              </Form-item>
              </Col>
              <Col :xs="{span: 8, offset: 1}" :lg="{ span: 8, offset: 1}">
              <Form-item :label-width="160" label="申请人所属部门:">
                <Select v-model="searchCondition.customerNumber">
                  <Option v-for="item in deptList" :value="item.value" :key="item.value">{{item.label}}</Option>
                </Select>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :xs="{span: 3, offset: 16}" :lg="{ span: 3, offset: 16}">
              <Button type="primary" @click="" icon="ios-search">查询</Button>
              <Button type="warning" @click="resetSearchCondition('searchCondition')">重置</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>
    <div class="create">
      <Table border :columns="grantManagerColumns" :data="grantManagerData" ref="table"></Table>
    </div>
    <Page :total="100" show-sizer show-elevator></Page>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import EventTypes from '../../store/EventTypes'

  export default {
    data() {
      return {
        collapseInfo: [1, 2, 3], //展开栏
        searchCondition: {
          serviceCenterValue: "",
          customerNumber: '',
          customerName: '',
          companyAccountType: '',
          region: '',
          accountTypeValue: '',
          employeeNumber: '',
          employeeName: '',
          idNumber: '',
          sSecurityState: '',
          personTypeValue: ''
        },
        grantManagerColumns: [{
          title: '编号',
          key: 'date1',
          align: 'center',
        }, {
          title: '申请人',
          key: 'date2',
          align: 'center',
        }, {
          title: '项目主题',
          key: 'date3',
          align: 'center',
        }, {
          title: '申请时间',
          key: 'date4',
          align: 'center',
        }, {
          title: '申请类型',
          key: 'date5',
          align: 'center',
        }, {
          title: '审批状态',
          key: 'date6',
          align: 'center',
        }, {
          title: '发放状态',
          key: 'date7',
          align: 'center',
        }, {
          title: '操作',
          key: 'action',
          width: 200,
          align: 'center',
          render: (h, params) => {
            if (params.row.date8 == '1') {
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
                        name: 'marketExamine',
                        params: {
                          data: params.row
                        }
                      });
                    }
                  }
                }, '审批')
              ]);
            }else if (params.row.date8 == '2'){
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
                        name: 'marketGrant',
                        params: {
                          data: params.row
                        }
                      });
                    }
                  }
                }, '发放')
              ]);
            }else if (params.row.date8 == '3'){
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
                        name: 'giftExamine',
                        params: {
                          data: params.row
                        }
                      });
                    }
                  }
                }, '审批')
              ]);
            }else if (params.row.date8 == '4'){
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
                        name: 'giftExamine',
                        params: {
                          data: params.row
                        }
                      });
                    }
                  }
                }, '审批')
              ]);
            }else if (params.row.date8 == '5'){
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
                        name: 'giftGrant',
                        params: {
                          data: params.row
                        }
                      });
                    }
                  }
                }, '同意')
              ]);
            }
          }
        }],
        grantManagerData: [{
          date1: '5702',
          date2: '前道客服1',
          date3: '儿童节礼品',
          date4: '2017-11-14 17:53:58',
          date5: '市场活动',
          date6: '审批中',
          date7: '',
          date8: '1'
        }, {
          date1: '5702',
          date2: '前道客服2',
          date3: '儿童节礼品',
          date4: '2017-11-14 17:53:58',
          date5: '市场活动',
          date6: '同意',
          date7: '',
          date8: '2'
        }, {
          date1: '5702',
          date2: '前道客服3',
          date3: '施华洛世奇水晶笔',
          date4: '2017-11-14 17:53:58',
          date5: '礼品',
          date6: '未审批',
          date7: '',
          date8: '3'
        }, {
          date1: '5702',
          date2: '前道客服4',
          date3: '施华洛世奇水晶笔',
          date4: '2017-11-14 17:53:58',
          date5: '礼品',
          date6: '未审批',
          date7: '',
          date8: '4'
        }, {
          date1: '5702',
          date2: '前道客服5',
          date3: '施华洛世奇水晶笔',
          date4: '2017-11-14 17:53:58',
          date5: '礼品',
          date6: '同意',
          date7: '',
          date8: '5'
        }],
        examineList:[{
          value: '0',
          label: '全部'
        },{
          value: '1',
          label: '审批中'
        },{
          value: '2',
          label: '同意'
        },{
          value: '3',
          label: '不同意'
        },{
          value: '3',
          label: '部分同意'
        }],
        grantStateList:[{
          value: '0',
          label: '全部'
        },{
          value: '1',
          label: '未发放'
        },{
          value: '1',
          label: '已发放'
        },{
          value: '1',
          label: '已批退'
        }],
        deptList:[{
          value: '0',
          label: '中智'
        },{
          value: '1',
          label: '外企部门组织结构树'
        }],
      }
    },
    methods: {

    }
  }
</script>

<style scoped>
  .mt20 {
    margin-top: 20px;
  }
</style>
