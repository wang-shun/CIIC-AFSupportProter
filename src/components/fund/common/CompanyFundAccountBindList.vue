<template>
  <div>
    <Table border :columns="accountBindCompanyColumns" :data="accountBindCompany"></Table>
  </div>
</template>
<script>
  export default {
    props: {
      accountBindCompanyData: {
        type: Array
      }
    },
    data() {
      return {
        accountBindCompanyColumns: [
          {title: '公司编号', key: 'companyNumber', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.companyNumber),
              ]);
            }
          },
          {title: '公司名称', key: 'companyName', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.companyName),
              ]);
            }
          },
          {title: '客服经理', key: 'serviceManager', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.serviceManager),
              ]);
            }
          },
          {title: '绑定时间', key: 'bindDate', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.bindDate),
              ]);
            }
          }
        ]
      }
    },
    computed: {
      accountBindCompany() {
        return this.accountBindCompanyData;
      }
    }
  }
</script>
