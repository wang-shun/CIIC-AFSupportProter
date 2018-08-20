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
            title: '审批编号', key: 'stepId', align: 'center',
          },
          {
            title: '审批人', key: 'approveName', align: 'center',
          },
          {
            title: '审批时间', key: 'approveTime', align: 'center',
            render: (h, params) => {
              return h('div', params.row.approveTime == null ? '' : this.$utils.formatDate(params.row.approveTime, 'YYYY-MM-DD HH:mm:ss'))
            }
          },
          {
            title: '审批意见', key: 'approveRemark', align: 'center',
          },
          {
            title: '审批标志', key: 'approveAction', align: 'center',
            render: (h, params) => {
              return h('div', this.getApprovalActionName(params.row.approveAction))
            }
          }
        ],
      }
    },
    methods: {
      getApprovalActionName(approvalAction) {
        switch (approvalAction) {
          case 1:
            return "审批中";
          case 2:
            return "同意";
          case 3:
            return "不同意";
        }
      }
    }

  };
</script>
