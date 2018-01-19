<template>
  <Table border :columns="historyTaskColumns" :data="historyTask" class="mt20"></Table>
</template>
<script>
  export default {
    props: {
      historyTaskData: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        historyTaskColumns: [
          {title: '客户编号', key: 'customerNumber', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.customerNumber),
              ]);
            }
          },
          {title: '客户名称', key: 'customerName', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.customerName),
              ]);
            }
          },
          {title: '用工日期', key: 'employDate', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.employDate),
              ]);
            }
          },
          {title: '退工日期', key: 'refuseDate', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.refuseDate),
              ]);
            }
          },
          {title: '操作', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('Button', {props: {type: 'success', size: 'small'}}, '查看'),
                h('Button', {style: {'margin-left': '5px'}, props: {type: 'success', size: 'small'}}, '修改'),
              ]);
            }
          },
        ]
      }
    },
    computed: {
      historyTask() {
        return this.historyTaskData;
      }
    }
  }
</script>
