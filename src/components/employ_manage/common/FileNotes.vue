<template>
  <div>
    <Table border :columns="fileNotesViewColumns" :width="700" :data="fileNotesView" class="mt20"></Table>
    <Row type="flex" justify="start" class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <Button type="primary" @click="add()">新增</Button>
      </Col>
    </Row>
    <Modal
        v-model="modal1"
        title="新增档案备注"
        @on-ok="ok"
        @on-cancel="cancel">
      <Form :model="handleInfo" ref="handleInfo" :label-width="150">
      <Row type="flex" justify="start">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 18}">
          <Form-item label="备注：" prop="remarkContentw" transfer>
            <Input v-model="handleInfo.remarkContentw" placeholder="请输入" :maxlength="50"/>
          </Form-item>
        </Col>
       </Row>
    </Form>
    </Modal>
  </div>
</template>
<script>
import api from "../../../api/employ_manage/hire_operator";
export default {
  props: {
    fileNotesViewData: {
      type: Array,
      required: true
    },
    userInfo: {
      type: Object
    }
  },
  data() {
    return {
      modal1: false,
      fileNotesViewColumns: [
        {
          title: "操作员",
          key: "remarkMan",
          align: "center",
          width: 200,
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.remarkMan)
            ]);
          }
        },
        {
          title: "操作日期",
          key: "remarkDate",
          align: "center",
          width: 200,
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.remarkDate)
            ]);
          }
        },
        {
          title: "备注",
          key: "remarkContent",
          align: "center",
          width: 200,
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.remarkContent)
            ]);
          }
        },
        {
          title: "操作",
          key: "action",
          width: 100,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index, params.row.remarkId);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      handleInfo: {
        remarkContentw: "",
        remarkManw: "",
        remarkDatew: ""
      },
      realHandInfo: {
        remarkContent: "",
        remarkMan: "",
        remarkDate: "",
        employeeId: "",
        remarkType: "2"
      }
    };
  },
  computed: {
    fileNotesView() {
      return this.fileNotesViewData;
    }
  },
  methods: {
    add() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      this.handleInfo.remarkDatew = currentdate;
      this.modal1 = true;
    },
    ok() {
      if (this.handleInfo.remarkContentw == "") {
        this.$Message.info("备注内容不能为空");
        return;
      }
      var fromData = this.$utils.clear(this.realHandInfo, "");

      fromData.remarkContent = this.handleInfo.remarkContentw;
      fromData.remarkMan = this.userInfo.userName;
      fromData.empTaskId = this.$route.query.empTaskId;

      api.saveAmRemark(fromData).then(data => {
        if (data.data.result == true) {
          this.$Message.success("保存成功");
          this.fileNotesView.push(data.data.data);
        } else {
          this.$Message.error("保存失败！");
        }

        this.handleInfo.remarkDatew = "";
        this.handleInfo.remarkManw = "";
        this.handleInfo.remarkContentw = "";
      });
    },
    cancel() {},
    show(index) {
      this.$Modal.info({
        title: "User Info",
        content: `Name：${this.data6[index].name}<br>Age：${
          this.data6[index].age
        }<br>Address：${this.data6[index].address}`
      });
    },
    remove(index, remarkId) {
      const _self = this;
      if (!remarkId) {
        this.fileNotesView.splice(index, 1);
      } else {
        this.$Modal.confirm({
          title: "",
          content: "确认删除吗?",
          onOk: function() {
            let params = { amRemarkId: remarkId };

            api.deleteAmRemark(params).then(data => {
              if (data.data) {
                _self.fileNotesView.splice(index, 1);
              } else {
                this.$Message.error("删除失败！请用创建人删除");
              }
            });
          },
          error: function(error) {
            self.$Modal.remove();
          }
        });
      }
    },
    del() {
      let selection = this.$refs.payComSelection.getSelection();
      //判断条件
      //是否有选中列
      if (selection.length == 0) {
        alert("没有选中的列");
        return;
      }

      selection.some(item => {
        var ff = item;
      });
    },
    clickRow(index) {}
  }
};
</script>
