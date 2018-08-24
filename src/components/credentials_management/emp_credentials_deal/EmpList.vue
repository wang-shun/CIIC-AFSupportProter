<template>
  <div>
    <Collapse v-model="value1" accordion>
      <Panel name="1">
        <div slot="content">
          <Form ref="queryItem" :model="queryItem" :label-width="120">
            <Row type="flex" justify="start" prop="empCode">
              <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户编号：" prop="companyCode">
                  <Input v-model="queryItem.companyCode" placeholder="请输入"/>
                </Form-item>
              </i-col>
              <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="雇员编号：" prop="empCode">
                  <Input v-model="queryItem.empCode" placeholder="请输入"/>
                </Form-item>
              </i-col>
              <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="雇员姓名：" prop="empName">
                  <Input v-model="queryItem.empName" placeholder="请输入"/>
                </Form-item>
              </i-col>
              <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="证件号码：" prop="IDNum">
                  <Input v-model="queryItem.IDNum" placeholder="请输入"/>
                </Form-item>
              </i-col>
              <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="入离职状态：" prop="status">
                  <Cascader v-model="queryItem.status" :data="statusList" trigger="hover" style="width: 57%;hight:100px" transfer></Cascader>
                </Form-item>
              </i-col>
            </Row>
          </Form>
          <Row type="flex" justify="start" class="tr">
            <i-col :sm="{span: 24}">
              <Button type="primary" @click="handleCurrentChange(1)" class="ml10" icon="ios-search">查询</Button>
              <Button type="warning" @click="reset('queryItem')" class="ml10">重置</Button>
            </i-col>
          </Row>
        </div>
      </Panel>
    </Collapse>

    <Row style="margin: 10px 0px 5px 0px">
      <i-col style="text-align: right">
        <Button type="primary" @click="add">新增雇员</Button>
      </i-col>
    </Row>

    <Table border :columns="colums" :data="employeePage" ></Table>
    <Page @on-change="handleCurrentChange"
    :current="pageNum"
    :page-size="pageSize"
    :total="total" show-elevator show-total></Page>

    <Modal
      v-model="modal1"
      title="证件办理">
      <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="120">
        <Row type="flex" justify="start">
          <i-col span="12">
            <Form-item label="客户名称：" style="width:400px;">
             {{formItem.companyName}}
            </Form-item>
          </i-col>
        </Row>
        <Row type="flex" justify="start">
          <i-col span="12">
            <Form-item label="雇员姓名：" style="width:400px;">
              {{formItem.empName}}
            </Form-item>
          </i-col>
        </Row>
        <Row type="flex" justify="start">
          <i-col span="12">
            <Form-item label="证件类型：" style="width:400px;" prop="type">
              <Select v-model="formItem.type" placeholder="请选择" style="width:260px" :label-in-value="labelinvalue" @on-change="taskTypeChange" transfer>
                <Option v-for="item in this.taskType" :value="item.taskTypeId" :key="item.taskTypeId">{{item.taskTypeName}}</Option>
              </Select>
            </Form-item>
          </i-col>
        </Row>
        <Row type="flex" justify="start">
           <i-col span="12">
            <Form-item label="证件办理类型：" style="width:400px;" prop="dealType" v-if="formItem.type === '1' || formItem.type === '2'">
              <Select v-model="formItem.dealType" placeholder="请选择" style="width:260px" :label-in-value="labelinvalue" transfer>
                <Option v-for="item in this.taskDealType" :value="item.taskTypeId" :key="item.taskTypeId">{{item.taskTypeName}}</Option>
              </Select>
            </Form-item>
          </i-col>
        </Row>
      </Form>
      <div slot="footer">
        <Row type="flex" justify="start" class="tr">
          <i-col :sm="{span: 24}">
            <Button type="primary" @click="ok('formItem',formItem.data)" class="ml10">确定</Button>
            <Button type="warning" @click="modal1=false;" class="ml10">取消</Button>
          </i-col>
        </Row>
      </div>
    </Modal>
  </div>
</template>

<script>
import ajax from "../../../lib/ajax";
import axios from "axios";
const host = process.env.SITE_HOST;
const AJAX = ajax.ajaxCM;
export default {
  data() {
    return {
      value1: "1",
      modal1: false,
      labelinvalue: true,
      pageNum: 1,
      pageSize: 10,
      total: null,
      idCardType: "",
      templateType: "",
      productId: "",
      basicProductId: "",
      taskType: {
        taskTypeId: "",
        taskTypeName: "",
        basicProductId: ""
      },
      taskDealType: {
        taskTypeId: "",
        taskTypeName: "",
        basicProductId: ""
      },
      queryItem: {
        empCode: "",
        empName: "",
        IDNum: "",
        status: ["",""],
        companyCode: ""
      },
      formItem: {
        companyName: "",
        companyCode: "",
        empName: "",
        empCode: "",
        type: "",
        dealType: "",
        data: ""
      },
      ruleValidate: {
        type: [
          { required: true, message: "请选择证件类型", trigger: "change" }
        ],
        dealType: [
          { required: true, message: "请选择证件办理类型", trigger: "change" }
        ]
      },
      statusList: [
        {
          value: "1",
          label: "af",
          children: [
            {
              value: "0",
              label: "预录用"
            },
            {
              value: "1",
              label: "雇员信息确认中"
            },
            {
              value: "2",
              label: "在职"
            },
            {
              value: "3",
              label: "离职"
            },
            {
              value: "4",
              label: "取消入职"
            }
          ]
        },
        {
          value: "2",
          label: "bpo",
          children: [
            {
              value: "0",
              label: "预增"
            },
            {
              value: "1",
              label: "报入职"
            },
            {
              value: "2",
              label: "在职"
            },
            {
              value: "3",
              label: "报离职"
            },
            {
              value: "4",
              label: "离职"
            }
          ]
        },
        {
          value: "3",
          label: "fc",
          children: [
            {
              value: "0",
              label: "离职"
            },
            {
              value: "1",
              label: "在职"
            }
          ]
        }
      ],
      colums: [
        {
          title: "雇员编号",
          key: "employeeId",
          sortable: true
        },
        {
          title: "雇员姓名",
          key: "employeeName"
        },
        {
          title: "证件号码",
          key: "idNum"
        },
        {
          title: "客户编号",
          key: "companyId",
          sortable: true
        },
        {
          title: "客户名称",
          key: "companyName"
        },
        {
          title: "入离职状态",
          key: "statusUI"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            const renderDiv = [];
            renderDiv.push(
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.findTaskType(params.row.companyId);
                      this.formItem.data = { ...params.row };
                      this.formItem.empName = params.row.employeeName;
                      this.formItem.companyName = params.row.companyName;
                      this.formItem.companyCode = params.row.companyId;
                      this.modal1 = true;
                    }
                  }
                },
                "证件办理"
              )
            );
            renderDiv.push(
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.lookInfo(params.row);
                    }
                  }
                },
                "编辑"
              )
            );
            return h("div", renderDiv);
          }
        }
      ],
      employeePage: []
    };
  },
  created() {
    this.find();
  },
  methods: {
    find() {
      var params = {};
      params.pageNum = this.pageNum;
      params.pageSize = this.pageSize;
      params.employeeId = this.queryItem.empCode;
      params.employeeName = this.queryItem.empName;
      params.idNum = this.queryItem.IDNum;
      params.companyId = this.queryItem.companyCode;
      params.type = this.queryItem.status[0];
      params.status = this.queryItem.status[1];
      AJAX.postJSON(`${host}/api/emp/find`, params).then(response => {
        this.employeePage = response.data.data.records;
        this.total = response.data.data.total;
      });
    },
    findTaskType(companyId) {
      AJAX.get(host + "/api/emp/findTaskType?pid=0&companyId="+companyId).then(response => {
        this.taskType = response.data.data;
      });
    },
    taskTypeChange(val) {
      AJAX.get(host + "/api/emp/findTaskType?pid=" + val.value+"&companyId="+this.formItem.companyCode).then(response => {
        this.taskDealType = response.data.data;
      });
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.find();
    },
    reset(value) {
      this.$refs[value].resetFields();
      this.queryItem.status = status
    },
    add() {
      this.$router.push({ name: "empAdd" });
    },
    lookInfo(v) {
      let credentialsTaskData = {}
      credentialsTaskData.data = v
      credentialsTaskData.type = ""
      credentialsTaskData.dealType = ""
      credentialsTaskData.isDeal = false
      sessionStorage.setItem('credentialsTaskData', JSON.stringify(credentialsTaskData))
      this.$router.push({
        name: "empCredentialsTask",
      });
    },
    ok(value, data) {
      this.$refs[value].validate(async valid => {
        await this.findTaskTypeDetial(
          this.formItem.dealType == null || this.formItem.dealType == ""
            ? this.formItem.type
            : this.formItem.dealType
        );
        if (valid) {
          this.$router.push({
            name: "empCredentialsTask",
          });
          let credentialsTaskData = {}
          credentialsTaskData.data = data,
          credentialsTaskData.type = parseInt(this.formItem.type),
          credentialsTaskData.typeN = this.$decode.sel_type(parseInt(this.formItem.type)),
          credentialsTaskData.dealType = parseInt(this.formItem.dealType),
          credentialsTaskData.dealTypeN = this.$decode.deal_type(
            parseInt(this.formItem.dealType)
          ),
          credentialsTaskData.companyId = data.companyCode,
          credentialsTaskData.productId = this.productId,
          credentialsTaskData.basicProductId = this.basicProductId,
          credentialsTaskData.isDeal = true

          sessionStorage.setItem('credentialsTaskData', JSON.stringify(credentialsTaskData))
          this.modal1 = false;
        } else {
          this.$Message.error("请选择办证类型!");
        }
      });
    },
    async findTaskTypeDetial(id) {
      await AJAX
        .get(
          host + "/api/empCredentialsDeal/findTaskTypeDetial?taskTypeId=" + id
        )
        .then(response => {
          this.productId = response.data.data.productId;
          this.basicProductId = response.data.data.basicProductId;
          console.log(response.data.data)
        });
    }
  }
};
</script>

<style scoped>

</style>
