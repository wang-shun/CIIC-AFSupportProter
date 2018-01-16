<template>
  <div>
    <Table border :columns="materialListColumns" :data="materialsList"></Table>
  </div>
</template>
<script>
  export default {
    props: {
      materialsListInfo() {
        type: Array
      }
    },
    data() {
      return {
        materialListColumns: [
          {title: '材料名称', key: 'materialName', align: 'center', className: 'mw100',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h(params.row.isLink ? 'a' : 'span', params.row.materialName)
              ])
            }
          },
          {title: '材料提交时间', key: 'submitTime', align: 'center', className: 'mw150',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.submitTime),
              ]);
            }
          },
          {title: '材料类型', key: 'materialType', align: 'center', className: 'mw100',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.materialType)
              ])
            }
          },
          {title: '材料收到时间', key: 'receiveTime', align: 'center', className: 'mw150',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.receiveTime),
              ]);
            }
          },
          {title: '操作', key: 'status', align: 'center', className: 'mw200',
            render: (h, params) => {
              let self = this
              return h('div', [
                h('Select', {props: {value: params.row.status == '0' ? '0' : params.row.status == '1' ? '1' : params.row.status == '2' ? '2' : ''},
                    on:{
                      input:function(event){
                        self.receiveMaterialListData[params.index].status = event
                      }
                    }
                  },
                  [
                    h('Option', {props: {value: '0'}},'未签收'),
                    h('Option', {props: {value: '1'}},'已签收'),
                    h('Option', {props: {value: '2'}},'材料不齐全'),
                  ]
                )]
              );
            }
          },
          {title: '备注说明', key: 'remark', className: 'mw300',
            render: (h, params) => {
              let self = this
              return h('div', [
                h('i-input', {
                    props: {value: params.row.remark},
                    on:{
                      input:function(event){

                        params.row.remark = event
                        self.receiveMaterialListData[params.index] = params.row
                      }
                    }
                  }
                )
              ]);
            }
          }
        ],
      }
    },
    computed: {
      materialsList() {
        return this.materialsListInfo
      }
    }
  }
</script>
