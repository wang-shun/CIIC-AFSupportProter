<style>
.ivu-table .demo-table-error-row td span {
  color: #ff6600;
}
.ivu-table .demo-table-error-row td div {
  color: #ff6600;
}
</style>
<template>
  <div>
    <Form :label-width="150">
      <Row type="flex" justify="start">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="材料提交人：">
            {{materials.submitName}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="分机号：">
            {{materials.extension}}
          </Form-item>
        </Col>
      </Row>
      <Table border :row-class-name="rowClassName2" :columns="materialsColumns" :data="materials.materialsData" class="mt20"></Table>
      <Row type="flex" justify="start" class="mt20">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="材料批退原因：">
            <Select v-model="materials.reasonValue" transfer :disabled="getDisabled()">
              <Option v-for="item in reasonList" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </Form-item>
        </Col>
      </Row>
      <Row type="flex" justify="start">
        <Col :sm="{span: 24}" class="tr">
          <Button type="primary" :disabled="getDisabled()"  @click="instance()">材料全部签收</Button>
          <Button type="error" :disabled="getDisabled()" @click="refuseAll">材料全部批退</Button>
        </Col>
      </Row>
      <br/>
    </Form>
    <Collapse v-model="collapseInfo">
    <Form :label-width="150">
      <Panel name="1">
        材料流转记录
        <Table border :row-class-name="rowClassName2" :columns="materialsColumnsLog" :data="materials.logBOList" class="mt20"></Table>
      </Panel>
    </Form>
    </Collapse>
  </div>
</template>
<script>
import api from "../../../api/employ_manage/hire_operator";
export default {
  props: {
    materialsInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
    collapseInfo: [1], //展开栏
      materialsColumns: [
        {
          title: "材料名称",
          key: "materialName",
          align: "center",
          render: (h, params) => {
            return h("div", { style: { textAlign: "center" } }, [
              h("span", params.row.materialName)
            ]);
          }
        },
        {
          title: "前道提交时间",
          key: "beforeCommitDate",
          align: "center",
          render: (h, params) => {
            return h("div", { style: { textAlign: "center" } }, [
              h("span", params.row.submitterDate)
            ]);
          }
        },
        {
          title: "后道收到时间",
          key: "afterSignDate",
          align: "center",
          render: (h, params) => {
            return h("div", { style: { textAlign: "center" } }, [
              h("span", params.row.receiveDate)
            ]);
          }
        },
        {
          title: "批退日期",
          key: "rejectDate",
          align: "center",
          render: (h, params) => {
            return h("div", { style: { textAlign: "center" } }, [
              h(
                "span",
                this.$utils.formatDate(params.row.rejectDate, "YYYY-MM-DD")
              )
            ]);
          }
        }
      ],
      materialsColumnsLog: [
        {
          title: "操作类型",
          key: "operationType",
          align: "center",
          render: (h, params) => {
            return h("div", { style: { textAlign: "center" } }, [
              h("span", params.row.operationType==1?"签收":params.row.operationType==2?"批退":params.row.operationType==3?"提交":"其它")
            ]);
          }
        },
        {
          title: "操作人",
          key: "operationName",
          align: "center",
          render: (h, params) => {
            return h("div", { style: { textAlign: "center" } }, [
              h("span", params.row.operationName)
            ]);
          }
        },
        {
          title: "操作时间",
          key: "operationTime",
          align: "center",
          render: (h, params) => {
            return h("div", { style: { textAlign: "center" } }, [
              h(
                "span",
                params.row.operationTime
              )
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
      ],
      reasonList: [
        { value: "空", label: "空" },
        { value: "前道要求批退", label: "前道要求批退" },
        { value: "提交材料与AF库不一致", label: "提交材料与AF库不一致" },
        { value: "未提交联系单", label: "未提交联系单" },
        { value: "综保未退工", label: "综保未退工" },
        { value: "外来从业未退工", label: "外来从业未退工" },
        { value: "上家未退工", label: "上家未退工" },
        { value: "居住证用工时间错误", label: "居住证用工时间错误" },
        { value: "未审核雇员个人信息", label: "未审核雇员个人信息" },
        { value: "未审核档案方向", label: "未审核档案方向" },
        { value: "录用名册未盖章", label: "录用名册未盖章" },
        {
          value: "曾用名未提交户口本复印件",
          label: "曾用名未提交户口本复印件"
        },
        { value: "其他", label: "其他" },
        {
          value: "AF库提交日期与实际提交材料不符",
          label: "AF库提交日期与实际提交材料不符"
        },
        { value: "未审核实际录用日期", label: "未审核实际录用日期" },
        { value: "采集表信息不全", label: "采集表信息不全" },
        { value: "采集表照片不一致", label: "采集表照片不一致" },
        { value: "未提交独立开户公司材料", label: "未提交独立开户公司材料" },
        { value: "未到实际用工时间", label: "未到实际用工时间" },
        { value: "多领失业金", label: "多领失业金" },
        { value: "采集表提交错误", label: "采集表提交错误" }
      ]
    };
  },
  methods: {
    rowClassName2(row, index) {
        if(this.materials.logBOList!=null&&this.materials.logBOList!=undefined){
            if(this.materials.logBOList[0]!=null&&this.materials.logBOList[0]!=undefined){
              if(this.materials.logBOList[0].operationType == 2){
                return "demo-table-error-row";
              }
            }
        }
        return "";
    },
    getDisabled() {
        if(this.materials.logBOList!=null&&this.materials.logBOList!=undefined){
            if(this.materials.logBOList[0]!=null&&this.materials.logBOList[0]!=undefined){
              if(this.materials.logBOList[0].operationType == 3){
                return false;
              }
            }
        }
        return true;
    },
    refuseAll() {
      
      if(this.materialsInfo.materialsData == undefined){
        this.$Message.success("还没有材料");
        return;
      }
      if (
        this.materialsInfo.reasonValue == "" ||
        this.materialsInfo.reasonValue == undefined
      ) {
        this.$Message.success("请选择拒绝签收原因");
        return;
      }
      for (var i = 0; i < this.materialsInfo.materialsData.length; i++) {
        this.materialsInfo.materialsData[
          i
        ].rejectReason = this.materialsInfo.reasonValue;
        this.materialsInfo.materialsData[i].modifiedTime = "";
      }
      api.rejectMaterial(this.materialsInfo.materialsData).then(data => {
        for (var i = 0; i < this.materialsInfo.materialsData.length; i++) {
          this.materialsInfo.materialsData[i].modifiedTime = "";
        }
        if (data.data.data.result == "批退成功") {
          this.$Message.success("批退成功");
          this.materialsInfo.materialsData = data.data.data.data;
          this.materials.logBOList = data.data.data.logList;
        } else {
          this.$Message.error(data.data.data.result);
        }
      });
    },
    instance() {
      if(this.materialsInfo.materialsData == undefined){
        this.$Message.success("还没有材料");
        return;
      }
      for (var i = 0; i < this.materialsInfo.materialsData.length; i++) {
        this.materialsInfo.materialsData[i].modifiedTime = "";
        this.materialsInfo.materialsData[i].createdTime = "";
      }
      api.receiveMaterial(this.materialsInfo.materialsData).then(data => {
        for (var i = 0; i < this.materialsInfo.materialsData.length; i++) {
          this.materialsInfo.materialsData[i].modifiedTime = "";
          this.materialsInfo.materialsData[i].createdTime = "";
        }
        if (data.data.data.result == "签收成功") {
          this.$Message.success("签收成功");
          this.materialsInfo.materialsData = data.data.data.data;
          this.materials.logBOList = data.data.data.logList;
        } else {
          this.$Message.error(data.data.data.result);
        }
      });
    }
  },
  computed: {
    materials() {
      return this.materialsInfo;
    }
  }
};
</script>
