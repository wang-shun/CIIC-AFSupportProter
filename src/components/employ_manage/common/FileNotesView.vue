<template>
  <div>
    <Table border :columns="fileNotesViewColumns" :data="fileNotesView" class="mt20"></Table>
  </div>
</template>
<script>
  export default {
    props: {
      fileNotesViewData: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        fileNotesViewColumns: [
          {title: '操作员', key: 'operator', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.remarkMan),
              ]);
            }
          },
          {title: '操作日期', key: 'operateDate', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.remarkDate),
              ]);
            }
          },
          {title: '备注', key: 'notes', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.remarkContent),
              ]);
            }
          },
        ]
      }
    },
    computed: {
      fileNotesView() {
        return this.fileNotesViewData;
      }
    }
  }
</script>
