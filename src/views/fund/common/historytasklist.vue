<template>
  <Form label-width=150>
    <Row>
      <Col :sm="{span: 24}">
        <Table border class="mt20" :columns="taskListColumns" :data="taskList"></Table>
      </Col>
    </Row>
  </Form>
</template>
<script>
  export default {
    props: {
      taskListInfo: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        taskListColumns: [
          {title: '公积金类型', key: 'fundType', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.fundType),
              ]);
            }
          },
          {title: '任务单编号', key: 'taskNumber', align: 'center',
            render: (h, params) => {
              return h('div', [
                h('a', {
                  on: {
                    click: () => {
                      this.$router.push({name: 'employeefundhistorydetail', query: {taskType: params.row.taskType}})
                    }
                  }
                }, params.row.taskNumber),
              ]);
            }
          },
          {title: '任务', key: 'task', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.task),
              ]);
            }
          },
          {title: '变更类型', key: 'changeType', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.changeType),
              ]);
            }
          },
          {title: '任务发起人', key: 'taskCreater', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.taskCreater),
              ]);
            }
          },
          {title: '前道执行日期', key: 'beforeDoDate', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.beforeDoDate),
              ]);
            }
          },
          {title: '办理结果', key: 'doResult', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.doResult),
              ]);
            }
          }
        ]
      }
    },
    computed: {
      taskList() {
        return this.taskListInfo
      }
    }
  }
</script>
