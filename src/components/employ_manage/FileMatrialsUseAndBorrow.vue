<template>
  <div>
    <div class="smList">
      <Collapse v-model="collapseInfo">
        <Panel name="2">
          材料使用
          <div slot="content">
            <Modal
              v-model="modal1"
              title="档案材料使用"
              @on-ok="instance()"
              @on-cancel="cancel">
              <Form :model="handleInfo" ref="handleInfo" :label-width="150">
               
                <Row type="flex" justify="start">
                  <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 18}">
                    <Form-item label="使用日期：" prop="useDatew">
                      <DatePicker type="date" v-model="handleInfo.useDatew" transfer></DatePicker>
                    </Form-item>
                  </Col>
                </Row>
                <Row type="flex" justify="start">
                  <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 18}">
                    <Form-item label="备注：" prop="remarkw" transfer>
                      <Input v-model="handleInfo.remarkw" placeholder="请输入" :maxlength="50"/>
                    </Form-item>
                  </Col>
                </Row>
                <Row type="flex" justify="start">
                  <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 18}">
                    <Form-item label="使用借出材料人：" prop="useManw" transfer>
                      <Input v-model="handleInfo.useManw" placeholder="请输入" :maxlength="50"/>
                    </Form-item>
                  </Col>
                </Row>
                <Row>
                  <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 18}">
                  <Form-item label="使用材料：">
                    <Select v-model="handleInfo.materialw" transfer>
                      <Option v-for="item in handleTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
                    </Select>
                   </Form-item>
                  </Col>
                </Row> 
                <Row>
                  <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 18}">
                  <Form-item label="用途：">
                    <Select v-model="handleInfo.purposew" transfer>
                      <Option v-for="item in handleTypeList1" :value="item.value" :key="item.value">{{item.label}}</Option>
                    </Select>
                   </Form-item>
                  </Col>
                </Row>   
               </Form>
            </Modal>
            <Table border :columns="matrialsUseColumns" :data="matrialsUseData"  ref="matrialsUseData" class="mt20"></Table>
            <Row class="mt20">
              <Col :sm="{span: 24}" class="tr">
                <Button type="primary" @click="modal1 = true">新增</Button>
                <Button type="primary"  @click="modify">修改</Button>
              </Col>
            </Row>
          </div>
        </Panel>
        <Panel name="3">
          材料借出
          <div slot="content">
            <Modal
              v-model="modal2"
              title="档案材料借出"
              @on-ok="ok1"
              @on-cancel="cancel1">
              <Form :model="handleInfo" ref="handleInfo" :label-width="150">
                <Row type="flex" justify="start">
                  <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 18}">
                    <Form-item label="借出日期：" prop="useDatew">
                      <DatePicker type="date" v-model="handleInfo.useDatew" transfer></DatePicker>
                    </Form-item>
                  </Col>
                </Row>
                <Row type="flex" justify="start">
                  <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 18}">
                    <Form-item label="备注：" prop="remarkw" transfer>
                      <Input v-model="handleInfo.remarkw" placeholder="请输入" :maxlength="50"/>
                    </Form-item>
                  </Col>
                </Row>
                <Row type="flex" justify="start">
                  <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 18}">
                    <Form-item label="借出材料人：" prop="useManw" transfer>
                      <Input v-model="handleInfo.useManw" placeholder="请输入" :maxlength="50"/>
                    </Form-item>
                  </Col>
                </Row>
                <Row>
                  <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 18}">
                  <Form-item label="借出材料：">
                    <Select v-model="handleInfo.materialw" transfer>
                      <Option v-for="item in  handleTypeList2" :value="item.value" :key="item.value">{{item.label}}</Option>
                    </Select>
                   </Form-item>
                  </Col>
                </Row> 
                <Row>
                  <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 18}">
                  <Form-item label="用途：">
                    <Select v-model="handleInfo.purposew" transfer>
                      <Option v-for="item in handleTypeList3" :value="item.value" :key="item.value">{{item.label}}</Option>
                    </Select>
                   </Form-item>
                  </Col>
                </Row>   
               </Form>
            </Modal>
            <Table border  :columns="matrialsBorrowColumns" :data="matrialsBorrowData"  ref="matrialsBorrowData" class="mt20"></Table>
            <Row class="mt20">
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span:18}">
                  归还日期：
                  <DatePicker  type="date" v-model="handleInfo.returnDate" transfer></DatePicker>
                  <Button type="primary"  @click="updateReturnDate">更新</Button>
              </Col>
              <Col :sm="{span: 24}" class="tr">
                <Button type="primary" @click="modal2 = true">新增</Button>
                <Button type="primary"  @click="modify1">修改</Button>
              </Col>
            </Row>
          </div>
        </Panel>
      </Collapse>
    </div>
    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <Button type="warning" @click="goBack">返回</Button>
      </Col>
    </Row>
  </div>
</template>
<script>
import api from "../../api/employ_manage/hire_operator";
export default {
  data() {
    return {
      modal1: false,
      modal2: false,
      userName: "",
      collapseInfo: [2, 3],
      matrialsUseColumns: [
        { title: "", type: "selection", width: 60 },
        {
          title: "雇员编号",
          key: "employeeId",
          align: "center",
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.employeeId)
            ]);
          }
        },
        {
          title: "雇员姓名",
          key: "employeeName",
          align: "center",
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.employeeName)
            ]);
          }
        },
        {
          title: "使用材料",
          key: "useMatrials",
          align: "center",
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.material)
            ]);
          }
        },
        {
          title: "用途",
          key: "useful",
          align: "center",
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.purpose)
            ]);
          }
        },
        {
          title: "使用材料人",
          key: "matrialsUser",
          align: "center",
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.useMan)
            ]);
          }
        },
        {
          title: "使用日期",
          key: "useDate",
          align: "center",
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.useDate)
            ]);
          }
        },
        {
          title: "材料使用经办人",
          key: "matrialsManager",
          align: "center",
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.handleMan)
            ]);
          }
        },
        {
          title: "备注",
          key: "notes",
          align: "center",
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.remark)
            ]);
          }
        }
      ],
      matrialsUseData: [],

      matrialsBorrowColumns: [
        { title: "", type: "selection", width: 60 },
        {
          title: "雇员编号",
          key: "employeeId",
          align: "center",
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.employeeId)
            ]);
          }
        },
        {
          title: "雇员姓名",
          key: "employeeName",
          align: "center",
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.employeeName)
            ]);
          }
        },
        {
          title: "借出材料",
          key: "useMatrials",
          align: "center",
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.material)
            ]);
          }
        },
        {
          title: "用途",
          key: "useful",
          align: "center",
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.purpose)
            ]);
          }
        },
        {
          title: "借出材料人",
          key: "matrialsUser",
          align: "center",
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.useMan)
            ]);
          }
        },
        {
          title: "借出日期",
          key: "useDate",
          align: "center",
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.useDate)
            ]);
          }
        },
        {
          title: "归还日期",
          key: "returnDate",
          align: "center",
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.returnDate)
            ]);
          }
        },
        {
          title: "借出经办人",
          key: "matrialsManager",
          align: "center",
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.handleMan)
            ]);
          }
        },
        {
          title: "备注",
          key: "notes",
          align: "center",
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.remark)
            ]);
          }
        }
      ],
      matrialsBorrowData: [],
      handleTypeList: [
        { value: "档案", label: "档案" },
        { value: "党员材料", label: "党员材料" },
        { value: "学籍资料", label: "学籍资料" },
        { value: "职工登记表", label: "职工登记表" },
        { value: "劳动力登记表", label: "劳动力登记表" },
        { value: "学生登记表", label: "学生登记表" },
        { value: "职称评定表", label: "职称评定表" },
        { value: "劳动手册", label: "劳动手册" },
        { value: "上家退工单", label: "上家退工单" },
        { value: "存档卡", label: "存档卡" },
        { value: "落户通知书", label: "落户通知书" },
        { value: "其他", label: "其他" }
      ],
      handleTypeList1: [
        { value: "归档材料", label: "归档材料" },
        { value: "政审", label: "政审" },
        { value: "档案借阅", label: "档案借阅" },
        { value: "认定工龄", label: "认定工龄" },
        { value: "查询信息", label: "查询信息" },
        { value: "复印材料", label: "复印材料" },
        { value: "扫描材料", label: "扫描材料" },
        { value: "开存档证明", label: "开存档证明" },
        { value: "其他", label: "其他" }
      ],
      handleTypeList2: [
        { value: "档案", label: "档案" },
        { value: "党员材料", label: "党员材料" },
        { value: "劳动手册", label: "劳动手册" },
        { value: "上家退工单", label: "上家退工单" },
        { value: "存档卡", label: "存档卡" },
        { value: "其他", label: "其他" }
      ],
      handleTypeList3: [
        { value: "党员转正", label: "党员转正" },
        { value: "社保核查", label: "社保核查" },
        { value: "公司查阅", label: "公司查阅" },
        { value: "私人事务", label: "私人事务" },
        { value: "其他", label: "其他" }
      ],
      handleInfo: {
        remarkContentw: "",
        remarkManw: "",
        remarkDatew: "",
        materialw: "",
        archiveUseId: ""
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
  async mounted() {
    let params = {
      employeeId: this.$route.query.employeeId,
      archiveId: this.$route.query.archiveId
    };

    api.queryArchiveUse(params).then(data => {
      this.userName = data.data.userName;
      if (data.data.amArchiveUsePageRows) {
        this.matrialsUseData = data.data.amArchiveUsePageRows.rows;
      }

      if (data.data.amArchiveUsePageRows1) {
        this.matrialsBorrowData = data.data.amArchiveUsePageRows1.rows;
      }
    });
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    instance() {
      if (this.handleInfo.materialw == "") {
        this.$Message.info("使用材料不能为空");
        return;
      }
      if (this.handleInfo.useDatew == "") {
        this.$Message.info("使用日期不能为空");
        return;
      }

      var fromData = this.$utils.clear(this.realHandInfo, "");

      fromData.useDate = this.$utils.formatDate(
        this.handleInfo.useDatew,
        "YYYY-MM-DD"
      );
      fromData.handleMan = this.userName;
      fromData.useMan = this.handleInfo.useManw;
      fromData.material = this.handleInfo.materialw;
      fromData.purpose = this.handleInfo.purposew;
      fromData.remark = this.handleInfo.remarkw;

      fromData.employeeId = this.$route.query.employeeId;
      fromData.archiveId = this.$route.query.archiveId;
      fromData.employeeName = this.$route.query.employeeName;

      fromData.useBorrow = 0;

      if (
        this.handleInfo.archiveUseId != undefined &&
        this.handleInfo.archiveUseId != ""
      ) {
        fromData.archiveUseId = this.handleInfo.archiveUseId;
      }

      api.saveAmArchiveUse(fromData).then(data => {
        if (data.code == 200) {
          this.$Message.success("保存成功");
          this.matrialsUseData = data.data.amArchiveUsePageRows.rows;
          this.handleInfo.useDatew = "";
          this.handleInfo.returnDate = "";
          this.handleInfo.useManw = "";
          this.handleInfo.materialw = "";
          this.handleInfo.purposew = "";
          this.handleInfo.remarkw = "";
          this.handleInfo.archiveUseId = "";
        } else {
          this.$Message.error("保存失败！");
        }
      });

      this.handleInfo.useDatew = "";
      this.handleInfo.returnDate = "";
      this.handleInfo.useManw = "";
      this.handleInfo.materialw = "";
      this.handleInfo.purposew = "";
      this.handleInfo.remarkw = "";
    },
    ok1() {
      var isE = false;
      if (this.handleInfo.materialw == "") {
        this.$Message.info("借出材料不能为空");
        return;
      }
      if (this.handleInfo.useDatew == "") {
        this.$Message.info("借出日期不能为空");
        return;
      }

      var fromData = this.$utils.clear(this.realHandInfo, "");

      fromData.useDate = this.$utils.formatDate(
        this.handleInfo.useDatew,
        "YYYY-MM-DD"
      );
      fromData.returnDate = this.$utils.formatDate(
        this.handleInfo.returnDate,
        "YYYY-MM-DD"
      );
      fromData.handleMan = this.userName;
      fromData.useMan = this.handleInfo.useManw;
      fromData.material = this.handleInfo.materialw;
      fromData.purpose = this.handleInfo.purposew;
      fromData.remark = this.handleInfo.remarkw;

      fromData.employeeId = this.$route.query.employeeId;
      fromData.archiveId = this.$route.query.archiveId;
      fromData.employeeName = this.$route.query.employeeName;


      fromData.useBorrow = 1;

      if (
        this.handleInfo.archiveUseId != undefined &&
        this.handleInfo.archiveUseId != ""
      ) {
        fromData.archiveUseId = this.handleInfo.archiveUseId;
      }

      api.saveAmArchiveUse(fromData).then(data => {
        if (data.code == 200) {
          this.$Message.success("保存成功");
          this.matrialsBorrowData = data.data.amArchiveUsePageRows.rows;
          this.handleInfo.useDatew = "";
          this.handleInfo.returnDate = "";
          this.handleInfo.useManw = "";
          this.handleInfo.materialw = "";
          this.handleInfo.purposew = "";
          this.handleInfo.remarkw = "";
          this.handleInfo.archiveUseId = "";
        } else {
          this.$Message.error("保存失败！");
        }
      });
    },

    cancel() {
      this.handleInfo.useDatew = "";
      this.handleInfo.returnDate = "";
      this.handleInfo.useManw = "";
      this.handleInfo.materialw = "";
      this.handleInfo.purposew = "";
      this.handleInfo.remarkw = "";
    },
    cancel1() {
      this.handleInfo.useDatew = "";
      this.handleInfo.returnDate = "";
      this.handleInfo.useManw = "";
      this.handleInfo.materialw = "";
      this.handleInfo.purposew = "";
      this.handleInfo.remarkw = "";
    },
    modify() {
      let selection = this.$refs.matrialsUseData.getSelection();
      if (selection.length == 0) {
        alert("没有选中的列");
        return;
      } else if (selection.length > 1) {
        alert("选择的列太多");
        return;
      }
      let archiveUseId;
      var fromData = this.$utils.clear(this.realHandInfo, "");
      selection.forEach(item => {
        this.handleInfo.archiveUseId = item.archiveUseId;
        this.handleInfo.useDatew = item.useDate;
        this.handleInfo.returnDate = item.returnDate;
        this.handleInfo.useManw = item.useMan;
        this.handleInfo.materialw = item.material;
        this.handleInfo.purposew = item.purpose;
        this.handleInfo.remarkw = item.remark;
      });

      this.modal1 = true;
    },
    modify1() {
      let selection = this.$refs.matrialsBorrowData.getSelection();
      if (selection.length == 0) {
        alert("没有选中的列");
        return;
      } else if (selection.length > 1) {
        alert("选择的列太多");
        return;
      }
      let archiveUseId;

      selection.forEach(item => {
        this.handleInfo.archiveUseId = item.archiveUseId;
        this.handleInfo.useDatew = item.useDate;
        this.handleInfo.returnDate = item.returnDate;
        this.handleInfo.useManw = item.useMan;
        this.handleInfo.materialw = item.material;
        this.handleInfo.purposew = item.purpose;
        this.handleInfo.remarkw = item.remark;
      });

      this.modal2 = true;
    },
    instance1() {
      api.saveAmArchiveUse(this.matrialsBorrowData).then(data => {
        if (data.data.data == true) {
          this.$Message.success("保存成功");
          history.go(-1);
        } else {
          this.$Message.error("保存失败！");
        }
      });
    },
    updateReturnDate() {
      let selection = this.$refs.matrialsBorrowData.getSelection();
      if (selection.length == 0) {
        alert("没有选中的列");
        return;
      } else if (selection.length > 1) {
        alert("选择的列太多");
        return;
      }
      let archiveUseId;
      var fromData = this.$utils.clear(this.realHandInfo, "");
      selection.forEach(item => {
        this.handleInfo.archiveUseId = item.archiveUseId;
      });

      var fromData = this.$utils.clear(this.realHandInfo, "");
      fromData.archiveUseId = this.handleInfo.archiveUseId;
      fromData.returnDate = this.$utils.formatDate(
        this.handleInfo.returnDate,
        "YYYY-MM-DD"
      );
      fromData.archiveId = this.$route.query.archiveId;
      fromData.useBorrow = 1;
      api.saveAmArchiveUse(fromData).then(data => {
        if (data.code == 200) {
          this.$Message.success("保存成功");
          this.matrialsBorrowData = data.data.amArchiveUsePageRows.rows;
         
          this.handleInfo.returnDate = "";
         
          this.handleInfo.archiveUseId = "";
        } else {
          this.$Message.error("保存失败！");
        }
      });
    }
  }
};
</script>
