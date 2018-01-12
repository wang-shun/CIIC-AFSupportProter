<template>
  <Form label-width=150>
    <Row>
      <Col :sm="{span: 24}">
        <Table border class="mt20" :columns="fundColumns" :data="transferFund"></Table>
      </Col>
    </Row>
  </Form>
</template>
<script>
  export default {
    props: {
      transferFundInfo: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        fundColumns: [
          {title: '公积金类型', key: 'fundType', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.fundType),
              ]);
            }
          },
          {title: '转入地', key: 'intoPlace', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.intoPlace),
              ]);
            }
          },
          {title: '转出地', key: 'outerPlace', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.outerPlace),
              ]);
            }
          },
          {title: '转移日期', key: 'transferDate', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.transferDate),
              ]);
            }
          },
          {title: '状态', key: 'status', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.status),
              ]);
            }
          },
          {title: '操作日期', key: 'operatorDate', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.operatorDate),
              ]);
            }
          },
          {title: '打印日期', key: 'printDate', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.printDate),
              ]);
            }
          },
          {title: '回单日期', key: 'backDate', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.backDate),
              ]);
            }
          }
        ]
      }
    },
    computed: {
      transferFund() {
        return this.transferFundInfo
      }
    },
  }
</script>
