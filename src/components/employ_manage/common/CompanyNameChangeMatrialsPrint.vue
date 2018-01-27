<template>
  <div>
    <Table border :columns="companyNameChangeMatrialsPrintColumns" :data="companyNameChangeMatrialsPrint" class="mt20"></Table>
  </div>
</template>
<script>
  export default {
    props: {
      companyNameChangeMatrialsPrintInfo: {
        type: Array
      }
    },
    data() {
      return {
        companyNameChangeMatrialsPrintColumns: [
          {title: '默认打印', type: 'selection'},
          {title: '原公司名称', key: 'originCompanyName', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.originCompanyName),
              ]);
            }
          },
          {title: '更名日期', key: 'changeDate', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.changeDate),
              ]);
            }
          },
          {title: '默认打印', key: 'defaultPrint', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.defaultPrint),
              ]);
            }
          }
        ]
      }
    },
    computed: {
      companyNameChangeMatrialsPrint() {
        return this.companyNameChangeMatrialsPrintInfo
      }
    }
  }
</script>
