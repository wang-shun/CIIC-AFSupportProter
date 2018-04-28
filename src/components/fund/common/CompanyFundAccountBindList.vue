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
          {title: '客户编号', key: 'companyId', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.companyId),
              ]);
            }
          },
          {title: '客户名称', key: 'companyName', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.companyName),
              ]);
            }
          },
          {title: '客服经理', key: 'leaderShipName', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.leaderShipName),
              ]);
            }
          },
          {title: '绑定时间', key: 'bindedTime', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.bindedTime),
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
