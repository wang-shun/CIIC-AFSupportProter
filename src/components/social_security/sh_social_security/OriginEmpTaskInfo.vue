<template>
  <div>
    <Form :label-width=150 >
      <Row class="mt20" type="flex" justify="start">
        <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Table border width="1000" :columns="originEmpTaskColumns"
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
  import api from '../../../api/social_security/employee_operator'
  export default {
    name: 'origin-emp-task-info',
    props: {
      empArchiveId: {
        require: true,
        type: String,
        default() {
          return ''
        }
      },
    },
    data() {
      return {
        showOrigin: false,
        handledTask: [],
        handledTaskListColumns:[
          {
            title: '任务单类型', key: 'taskCategory', align: 'center', width: 100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', this.$decode.taskCategory(params.row.taskCategory)),
              ]);
            }
          },
          {
            title: '办理方式',
            key: 'handleWay',
            align: 'center',
            width: 100,
            render: (h, params) => {
              return h('span', this.$decode.handle_way(params.row.handleWay));
            }
          },
          {
            title: '人员属性',
            key: 'empClassify',
            align: 'center',
            width: 100,
            render: (h, params) => {
              return h('span', this.$decode.empClassify(params.row.empClassify));
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
            title: '办理月份',
            key: 'handleMonth',
            align: 'center',
            width: 100,
            render: (h, params) => {
              return h('div', [
                h('span', params.row.handleMonth),
              ]);
            }
          },
          {
            title: '办理状态',
            key: 'taskStatus',
            align: 'center',
            width: 100,
            render: (h, params) => {
              return h('div', [
                h('span', this.$decode.empTaskStatus(params.row.taskStatus)),
              ]);
            }
          },
          {
            title: '办理时间',
            key: 'modifiedTime',
            align: 'center',
            width: 200,
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
                h('span', this.$decode.taskCategory(params.row.taskCategory)),
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
            key: 'empCompanyBase',
            align: 'center',
            width: 150,
            render: (h, params) => {
              return h('span',params.row.empCompanyBase)
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
        if (this.empArchiveId && this.empArchiveId != '') {
          api.getOriginEmpTaskList({
            empArchiveId: this.empArchiveId
          }).then(data => {
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
  }
</script>
