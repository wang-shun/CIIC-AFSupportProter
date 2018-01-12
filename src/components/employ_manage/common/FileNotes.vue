<template>
  <div>
    <Table border :columns="fileNotesViewColumns" :data="fileNotesView" class="mt20"></Table>
    <Row type="flex" justify="start" class="mt20">
      <Col class="tr">
        <Button type="primary">新增</Button>
        <Button type="error">删除</Button>
        <Button type="primary">提交</Button>
      </Col>
    </Row>
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
      fileNotesView() {
        return this.fileNotesViewData;
      }
    }
  }
</script>
