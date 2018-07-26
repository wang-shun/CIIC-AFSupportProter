<template>
  <div>
    <Form :label-width=150 >
      <Row class="mt20" type="flex" justify="start">
        <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Table border width="1300" :columns="originEmpTaskColumns"
               :data="originEmpTask"></Table>
        </Col>
      </Row>
    </Form>

    <Modal v-model="showOrigin" :width="950" :mask-closable="false" :closable="false">
      <div style="margin-bottom: 20px">
        <span style="font-weight: bold">任务单办理信息</span>
      </div>
      <div style="margin-bottom: 25px">
        <Form :label-width=150 >
          <Row class="mt20" type="flex" justify="start">
            <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
            <Table border width="900" :columns="handledTaskListColumns"
                   :data="handledTask"></Table>
            </Col>
          </Row>
        </Form>
      </div>
      <div slot="footer">
        <button type="button" class="ivu-btn ivu-btn-text ivu-btn-large" @click="close"><span>关闭</span></button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import api from '../../../api/house_fund/employee_operator'

  export default {
    name: 'origin-emp-task-info',
    props: {
      companyId: {
        require: true,
        type: String,
        default() {
          return ''
        }
      },
      employeeId: {
        require: true,
        type: String,
        default() {
          return ''
        }
      },
      hfType: {
        require: true,
        type: Number,
        default() {
          return 1
        }
      },
    },
    data() {
      return {
        showOrigin: false,
        handledTask: [],
        handledTaskListColumns:[
          {
            title: '任务单类型', key: 'taskCategoryName', align: 'center', width: 100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.taskCategoryName),
              ]);
            }
          },
          {
            title: '起始月份',
            key: 'startMonth',
            align: 'center',
            width: 100,
            render: (h, params) => {
              return h('span', params.row.startMonth);
            }
          },
          {
            title: '截止月份',
            key: 'endMonth',
            align: 'center',
            width: 100,
            render: (h, params) => {
              return h('span', params.row.endMonth)
            }
          },
          {
            title: '基数',
            key: 'empBase',
            align: 'center',
            width: 100,
            render: (h, params) => {
              return h('span',params.row.empBase)
            }
          },
          {
            title: '办理月份',
            key: 'hfMonth',
            align: 'center',
            width: 100,
            render: (h, params) => {
              return h('div', [
                h('span', params.row.hfMonth),
              ]);
            }
          },
          {
            title: '办理状态',
            key: 'taskStatusName',
            align: 'center',
            width: 100,
            render: (h, params) => {
              return h('div', [
                h('span', params.row.taskStatusName),
              ]);
            }
          },
          {
            title: '操作提示',
            key: 'operationRemindName',
            align: 'center',
            width: 200,
            render: (h, params) => {
              return h('div', [
                h('span', params.row.operationRemindName),
              ]);
            }
          },
          {
            title: '操作提示日期',
            key: 'operationRemindDateFormat',
            align: 'center',
            width: 120,
            render: (h, params) => {
              return h('div', [
                h('span', params.row.operationRemindDateFormat),
              ]);
            }
          },
          {
            title: '办理时间',
            key: 'modifiedTime',
            align: 'center',
            width: 150,
            render: (h, params) => {
              return h('div', [
                h('span', params.row.modifiedTime),
              ]);
            }
          },
          {
            title: '办理人',
            key: 'modifiedDisplayName',
            align: 'center',
            width: 100,
            render: (h, params) => {
              return h('div', [
                h('span', params.row.modifiedDisplayName),
              ]);
            }
          },
        ],
        originEmpTaskColumns: [
          {
            title: '任务单类型', key: 'taskCategory', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.taskCategoryName),
              ]);
            }
          },
          {
            title: '起始月份',
            key: 'startMonth',
            align: 'center',
            width: 100,
            render: (h, params) => {
              return h('span', params.row.startMonth);
            }
          },
          {
            title: '截止月份',
            key: 'endMonth',
            align: 'center',
            width: 100,
            render: (h, params) => {
              return h('span', params.row.endMonth)
            }
          },
          {
            title: '基数',
            key: 'empBase',
            align: 'center',
            width: 150,
            render: (h, params) => {
              return h('span',params.row.empBase)
            }
          },
          {
            title: '企业比例',
            key: 'ratioCom',
            align: 'center',
            width: 100,
            render: (h, params) => {
              return h('span',params.row.ratioCom)
            }
          },
          {
            title: '个人比例',
            key: 'ratioEmp',
            align: 'center',
            width: 100,
            render: (h, params) => {
              return h('span',params.row.ratioEmp)
            }
          },
          {
            title: '金额',
            key: 'amount',
            align: 'center',
            width: 100,
            render: (h, params) => {
              return h('span',params.row.amount)
            }
          },
          {
            title: '发起时间',
            key: 'createdTime',
            align: 'center',
            width: 200,
            render: (h, params) => {
              return h('span',params.row.createdTime)
            }
          },
          {
            title: '发起人',
            key: 'createdDisplayName',
            align: 'center',
            width: 150,
            render: (h, params) => {
              return h('span',params.row.createdDisplayName)
            }
          },
          {
            title: '任务单办理信息',
            key: 'empTaskId',
            align: 'center',
            width: 150,
            render: (h, params) => {
              let empTaskId = params.row.empTaskId;
              let taskStatus = params.row.taskStatus;
              if (taskStatus == 1) {
                return h('span', '未办理');
              } else {
                return h('a', {
                  style: {textAlign: 'right'},
                  on: {
                    click: () => {
                      this.showOrigin = true;
                      this.queryHistoryEmpTask(empTaskId);
                    }
                  }
                }, '查看');
              }
            }
          },
        ],
        originEmpTask: [],
      }
    },
    created() {
    },
    mounted() {
      this.getOriginEmpTaskList();
    },
    computed: {
    },
    methods: {
      close() {
        this.showOrigin = false
      },
      queryHistoryEmpTask(empTaskId) {
        api.queryHistoryEmpTask({
          empTaskId: empTaskId
        }).then(data => {
          if (data.code == 200) {
            if (data.data) {
              this.handledTask = [data.data];
            }
          } else {
            this.$Message.error(data.message);
          }
        })
      },
      getOriginEmpTaskList() {
        api.getOriginEmpTaskList({
          companyId: this.companyId,
          employeeId: this.employeeId,
          hfType: this.hfType
        }).then(data => {
          console.log(data)
          if (data.code == 200) {
            if (data.data) {
              this.originEmpTask = data.data;
            }
          } else {
            this.$Message.error(data.message);
          }
        })
      }
    }
  }
</script>
