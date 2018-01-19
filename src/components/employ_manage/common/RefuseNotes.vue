<template>
  <div>
    <Table border :columns="refuseNotesColumns" :data="refuseNotes" class="mt20"></Table>
    <Row type="flex" justify="start" class="mt20">
      <Col :sm="{span: 24}" class="tr">
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
      refuseNotesData: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        refuseNotesColumns: [
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
      refuseNotes() {
        return this.refuseNotesData;
      }
    }
  }
</script>
