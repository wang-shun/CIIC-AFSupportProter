<template>
  <Form label-width=150>
    <Row>
      <Col :sm="{span: 24}" class="tr">
        <Button type="primary">新增</Button>
      </Col>
    </Row>
    <Row>
      <Col :sm="{span: 24}">
        <Table border class="mt20" :columns="notesColumns" :data="notes"></Table>
      </Col>
    </Row>
  </Form>
</template>
<script>
  export default {
    props: {
      notesInfo: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        notesColumns: [
          {title: '备注内容', key: 'notesContent', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.notesContent),
              ]);
            }
          },
          {title: '备注人', key: 'noteWriter', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.noteWriter),
              ]);
            }
          },
          {title: '备注时间', key: 'noteDate', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.noteDate),
              ]);
            }
          }
        ]
      }
    },
    computed: {
      notes() {
        return this.notesInfo
      }
    },
  }
</script>
