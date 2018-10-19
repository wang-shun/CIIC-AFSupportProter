<template>
  <div>
    <Table border :width="628" :columns="notesColumns" :data="archiveNote" class="mt20"></Table>
  </div>
  
</template>
<script>
export default {
  props: {
    archiveNote: {
      type: Array
    },
    userInfo: {
      type: Object
    }
  },
  data() {
    return {
      
      notesColumns: [
        {
          title: "档案类别",
          key: "docType",
          align: "center",
          width: 100,
          render: (h, params) => {
            return h("div", { style: { textAlign: "center" } }, [
              h("span", params.row.docType)
            ]);
          }
        },
        {
          title: "档案编号",
          key: "docNum",
          align: "center",
          width: 100,
          render: (h, params) => {
            return h("div", { style: { textAlign: "center" } }, [
              h("span", params.row.docNum)
            ]);
          }
        },
        {
          title: "用工反馈",
          key: "employFeedback",
          align: "center",
          width: 225,
          render: (h, params) => {
            return h("div", { style: { textAlign: "center" } }, [
              h("span", params.row.employFeedback)
            ]);
          }
        },
        {
          title: "保存时间",
          key: "createdTime",
          align: "center",
          width: 200,
          render: (h, params) => {
            return h("div", { style: { textAlign: "center" } }, [
              h("span", params.row.createdTime)
            ]);
          }
        }
      ]
    };
  },
  methods: {
   
  }
};
</script>
