<template>
  <div>
    <Row>
      <Col :sm="{span: 24}" class="tr">
        <Button type="primary">添加</Button>
        <Button type="error">删除</Button>
      </Col>
    </Row>
    <Table border class="mt20" :columns="statusColumns" :data="data.statusData"></Table>

    <Collapse v-model="collapseInfo" class="mt20">
      <Panel name="1">
        <div slot="content">
          <Form :label-width=150 ref="operatorSearchData" :model="operatorSearchData">
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="办理方式：" prop="handleMethodValue">
                  <Select v-model="operatorSearchData.handleMethodValue" style="width: 100%;" transfer>
                    <Option v-for="item in handleMethodList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="账号分类：" prop="SSAccountCategoryValue">
                  <Select v-model="operatorSearchData.SSAccountCategoryValue" style="width: 100%;" transfer>
                    <Option v-for="item in SSAccountCategoryList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="任务：" prop="taskValue">
                  <Select v-model="operatorSearchData.taskValue" style="width: 100%;" transfer>
                    <Option v-for="item in taskList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="序号：" prop="SSIndex">
                  <Input v-model="operatorSearchData.SSIndex" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="起缴月份：" prop="startPayMonth">
                  <DatePicker v-model="operatorSearchData.startPayMonth" type="daterange" placement="bottom" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="截至月份：" prop="endPayMonth">
                  <DatePicker v-model="operatorSearchData.endPayMonth" type="daterange" placement="bottom" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
                </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span: 24}" class="tr">
                <Form-item label="备注：" prop="notes">
                  <Input v-model="operatorSearchData.notes" type="textarea" :rows="3" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>
    <Row class="mt20">
      <Col :sm="{span:24}" class="tr">
        <Button type="warning" @click="goBack">返回</Button>
      </Col>
    </Row>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import EventType from '../../../store/event_types'

  export default {
    data() {
      return {
        collapseInfo: [1],
        operatorSearchData: {
          handleMethodValue: 0,
          SSAccountCategoryValue: 0,
          taskValue: 2,
          SSIndex: '',
          startPayMonth: '',
          endPayMonth: '',
          notes: ''
        },
        handleMethodList: [
          {label: "网上申报", value: 0},
          {label: "柜面办理", value: 1}
        ],
        SSAccountCategoryList: [
          {label: '中智大库1', value: 0},
          {label: '中智大库2', value: 1},
          {label: '独立户客户1', value: 2},
          {label: '独立户客户2', value: 3}
        ],
        taskList: [
          {label: '新进', value: 0},
          {label: '转入', value: 1},
          {label: '新进转出', value: 2},
          {label: '转入转出', value: 3},
        ],
        statusColumns: [
          {title: '', align: 'center', width: 60, type: 'selection', fixed: 'left'},
          {title: '任务单编号', key: 'ticketNumber', align: 'center',  fixed: 'left', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.ticketNumber),
              ]);
            }
          },
          {title: '公司名称', key: 'companyName', align: 'center', fixed: 'left', width: 250,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.companyName),
              ]);
            }
          },
          {title: '雇员姓名', key: 'employeeName', align: 'center', fixed: 'left', width: 120,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.employeeName),
              ]);
            }
          },
          {title: '入职日期', key: 'entryDate', align: 'center', fixed: 'left', width: 120,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.entryDate),
              ]);
            }
          },
          {title: '处理方式', key: 'handleMethod', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('Select', {
                  props: {
                    value: params.row.handleMethod
                  },
                },[
                  h('Option', {props: {label: '网上申报', value: 0}}),
                  h('Option', {props: {label: '柜面办理', value: 1}})
                ], params.row.handleMethod),
              ]);
            }
          },
          {title: '账户类型', key: 'companySSAccountCategory', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('Select', {
                  props: {
                    value: params.row.companySSAccountCategory
                  },
                },[
                  h('Option', {props: {label: '中智大库1', value: 0}}),
                  h('Option', {props: {label: '中智大库2', value: 1}}),
                  h('Option', {props: {label: '独立户客户1', value: 2}}),
                  h('Option', {props: {label: '独立户客户2', value: 3}})
                ], params.row.companySSAccountCategory),
              ]);
            }
          },
          {title: '任务', key: 'task', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'task'}}, [
                h('Select', {
                  props: {
                    value: params.row.task
                  },
                },[
                  h('Option', {props: {label: '新进', value: 0}}),
                  h('Option', {props: {label: '转入', value: 1}}),
                  h('Option', {props: {label: '新进转出', value: 2}}),
                  h('Option', {props: {label: '转出转入', value: 3}})
                ], params.row.task),
              ]);
            }
          },
          {title: '序号', key: 'SSIndex', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'task'}}, [
                h('Input', {
                  props: {
                    value: params.row.SSIndex
                  },
                }, params.row.SSIndex),
              ]);
            }
          },
          {title: '基数', key: 'base', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'task'}}, [
                h('Input', {
                  props: {
                    value: params.row.base
                  },
                }, params.row.base),
              ]);
            }
          },
          {title: '起始月份', key: 'SSStartMonth', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'task'}}, [
                h('DatePicker', {
                  props: {
                    value: params.row.SSStartMonth
                  },
                }, params.row.SSStartMonth),
              ]);
            }
          },
          {title: '截止月份', key: 'SSEndMonth', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'task'}}, [
                h('DatePicker', {
                  props: {
                    value: params.row.SSEndMonth
                  },
                }, params.row.SSEndMonth),
              ]);
            }
          },
          {title: '备注', key: 'notes', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'task'}}, [
                h('Input', {
                  props: {
                    value: params.row.notes
                  },
                }, params.row.notes),
              ]);
            }
          }
        ]
      }
    },
    mounted() {
      this[EventType.FUNDYEARADJUSTSTATUS]()
    },
    computed: {
      ...mapState('fundYearAdjustStatus',{
        data:state => state.data
      })
    },
    methods: {
      ...mapActions('fundYearAdjustStatus',[EventType.FUNDYEARADJUSTSTATUS]),
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
      goBack() {
        this.$router.go(-1);
      }
    }
  }
</script>
