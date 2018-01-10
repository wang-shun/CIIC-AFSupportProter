<template>
  <div>
    <Table border :columns="refuseReturnMaterialsSignColumns" :data="refuseReturnMaterialsSign" class="mt20"></Table>
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
      refuseReturnMaterialsSignInfo: {
        type: Array
      }
    },
    data() {
      return {
        refuseReturnMaterialsSignColumns: [
          {title: '提交', type: 'selection'},
          {title: '提交日期', key: 'commitDate', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.commitDate),
              ]);
            }
          },
          {title: '批退人', key: 'refuser', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.refuser),
              ]);
            }
          },
          {title: '批退日期', key: 'refuseDate', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.refuseDate),
              ]);
            }
          },
          {title: '收到人', key: 'reciever', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.reciever),
              ]);
            }
          },
          {title: '收到日期', key: 'recieveDate', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.recieveDate),
              ]);
            }
          },
        ]
      }
    },
    computed: {
      refuseReturnMaterialsSign() {
        return this.refuseReturnMaterialsSignInfo
      }
    }
  }
</script>
