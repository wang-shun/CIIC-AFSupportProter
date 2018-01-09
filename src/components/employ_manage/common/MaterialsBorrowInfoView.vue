<template>
  <div>
    <Table border :columns="MaterialsBorrowColumns" :data="MaterialsBorrow" class="mt20"></Table>
  </div>
</template>
<script>
  export default {
    props: {
      MaterialsBorrowData: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        MaterialsBorrowColumns: [
          {title: '借出材料', key: 'borrowMaterials', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.borrowMaterials),
              ]);
            }
          },
          {title: '用途', key: 'use', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.operateDate),
              ]);
            }
          },
          {title: '借材料人', key: 'borrower', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.borrower),
              ]);
            }
          },
        ]
      }
    },
    computed: {
      MaterialsBorrow() {
        return this.MaterialsBorrowData;
      }
    }
  }
</script>
