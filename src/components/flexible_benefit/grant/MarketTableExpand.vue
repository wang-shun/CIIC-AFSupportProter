<!--市场活动发放界面-->
<template>
  <div>
    <Table border :columns="marketExpandColumns" :data="examineData" ref="table"></Table>
  </div>
</template>
<script>
  export default {
    props: {
      examineData: Array
    },
    data() {
      return {
        marketExpandColumns: [
          {
            title: '审批编号', key: 'date0', align: 'center',
          },
          {
            title: '审批人', key: 'date1', align: 'center',
          },
          {
            title: '审批时间', key: 'date2', align: 'center',
          },
          {
            title: '审批意见', key: 'date3', align: 'center',
          },
          {
            title: '审批标志', key: 'date4', align: 'center',
          }
        ],
      }
    }
  };
</script>
