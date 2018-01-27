<template>
  <div>
    <Table border :columns="employmentViewColumns" :data="employmentView" class="mt20"></Table>
  </div>
</template>
<script>
  export default {
    props: {
      employmentViewData: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        employmentViewColumns: [
          {title: '操作员', key: 'operator', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.operator),
              ]);
            }
          },
          {title: '操作日期', key: 'operateDate', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.operateDate),
              ]);
            }
          },
          {title: '备注', key: 'notes', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.notes),
              ]);
            }
          },
        ]
      }
    },
    computed: {
      employmentView() {
        return this.employmentViewData;
      }
    }
  }
</script>
