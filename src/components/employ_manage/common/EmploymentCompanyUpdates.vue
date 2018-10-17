<template>
  <div>
    <Table border :columns="employmentViewColumns" :data="companyNameList" class="mt20"></Table>
  </div>
</template>
<script>
export default {
  props: {
    companyNameList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      employmentViewColumns: [
        {
          title: "原公司名称",
          key: "companyName",
          align: "center",
          render: (h, params) => {
            return h("div", { style: { textAlign: "center" } }, [
              h("span", params.row.companyName)
            ]);
          }
        },
        {
          title: "变更日期",
          key: "changeDate",
          align: "center",
          render: (h, params) => {
            return h("div", { style: { textAlign: "center" } }, [
              h("span", moment(Number(params.row.changeDate)).format("YYYY-MM-DD"))
            ]);
          }
        },
        {
          title: "备注",
          key: "remark",
          align: "center",
          render: (h, params) => {
            return h("div", { style: { textAlign: "center" } }, [
              h("span", params.row.remark)
            ]);
          }
        }
      ]
    };
  },
  computed: {
    employmentView() {
      console.info("query");
      // return this.employmentViewData;
    }
  }
};
</script>
