<template>
  <div>
    <Table border :width="601" :columns="notesColumns" :data="notes" class="mt20"></Table>
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
      notesData: {
        type: Array
      }
    },
    data() {
      return {
        notesColumns: [
          {title: '操作员', key: 'operator', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.operator),
              ]);
            }
          },
          {title: '操作日期', key: 'operatorDate', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.operatorDate),
              ]);
            }
          },
          {title: '备注', key: 'notes', align: 'center', width: 200,
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
      notes() {
        return this.notesData;
      }
    }
  }
</script>
