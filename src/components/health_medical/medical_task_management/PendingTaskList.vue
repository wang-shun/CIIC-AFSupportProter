<template>
  <div class="pendingTaskList">
    <Collapse v-model="value1" accordion>
      <Panel name="1">
        待处理任务单查询
        <div slot="content">
          <Form ref="formItem" :model="formItem" :label-width="150">
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="任务单状态" prop="status">
                <Select v-model="formItem.status" :clearable="true">
                  <Option v-for="item in taskStatus" :value="item.value" :key="item.value">
                    {{item.label}}
                  </Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="任务单类型" prop="taskType">
                <Select v-model="formItem.taskType" :clearable="true">
                  <Option v-for="item in taskTypeProperties" :value="item.value" :key="item.value">
                    {{item.label}}
                  </Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="保险公司" prop="insuranceCompany">
                <Select v-model="formItem.insuranceCompany" :clearable="true"
                        @on-change="queryIcProductRelationInfo(formItem.insuranceCompany)">
                  <Option v-for="item in insuranceCompanyProperties" :value="item.insuranceCompanyId"
                          :key="item.insuranceCompanyId">
                    {{item.insuranceCompanyName}}
                  </Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="保单" prop="afProductId">
                <Select v-model="formItem.afProductId" :clearable="true">
                  <Option v-for="item in taskTypeItem" :value="item.insurancePolicyId" :key="item.insurancePolicyId">
                    {{item.insurancePolicyName}}
                  </Option>
                </Select>
              </Form-item>
              </Col>
              <Col v-if="formItem.taskType === '1'" :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="起始日期" prop="startConfirmDateRange">
                <DatePicker v-model="formItem.startConfirmDateRange" type="daterange" placement="bottom"
                            placeholder="选择日期" style="width: 100%;"
                            transfer></DatePicker>
              </Form-item>
              </Col>
              <Col v-if="formItem.taskType === '2'" :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="截止日期" prop="endConfirmDateRange">
                <DatePicker v-model="formItem.endConfirmDateRange" type="daterange" placement="bottom"
                            placeholder="选择日期" style="width: 100%;"
                            transfer></DatePicker>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="保额类型">
                <Select v-model="formItem.keyType" :clearable="true">
                  <Option v-for="item in keyTypeProperties" :value="item.value" :key="item.value">{{item.label}}
                  </Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="大于" prop="keyValueLarge">
                <InputNumber v-model="formItem.keyValueLarge" style="width: 100%"></InputNumber>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="小于" prop="keyValueSmall">
                <InputNumber v-model="formItem.keyValueSmall" style="width: 100%"></InputNumber>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="管理方编号" prop="managementId">
                <Input v-model="formItem.managementId" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="管理方名称" prop="managementName">
                <Input v-model="formItem.managementName" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="雇员编号" prop="employeeId">
                <Input v-model="formItem.employeeId" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="雇员姓名" prop="employeeName">
                <Input v-model="formItem.employeeName" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="证件号码" prop="idNum">
                <Input v-model="formItem.idNum" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="公司编号" prop="companyId">
                <Input v-model="formItem.companyId" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="公司名称" prop="companyName">
                <Input v-model="formItem.companyName" placeholder="请输入"/>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span:24}" class="tr">
              <Button type="primary" icon="ios-search" @click="getByPage(1)">查询</Button>
              <Button type="warning" @click="resetSearchCondition('formItem')" class="ml10">重置</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>

    <div class="tr m20">
      <Button type="info" @click="modal1 = true">审核</Button>
      <Button type="info" @click="modal2 = true">暂缓</Button>
      <Button type="info" @click="modal3 = true">恢复</Button>
      <Button type="info" @click="modal5 = true">更新在保库</Button>
      <Button type="info" @click="exportData()" icon="ios-download-outline">导出数据</Button>
    </div>

    <Modal class="warn-back"
           v-model="modal1"
           title="审核"
           @on-ok="updateTpaTaskList(4)"
           ok-text="审核通过"
           @on-cancel="updateTpaTaskList(6)"
           cancel-text="退回">
      <Input v-model="dealMsg.remark" placeholder="请输入操作说明："/>
    </Modal>

    <Modal v-model="modal2"
           title="暂缓"
           @on-ok="updateTpaTaskList(3)"
           ok-text="暂缓">
      <Input v-model="dealMsg.remark" placeholder="请输入暂缓原因："/>
    </Modal>

    <Modal v-model="modal3"
           title="恢复"
           @on-ok="updateTpaTaskList(2)"
           ok-text="确认恢复">
    </Modal>

    <Modal class="warn-back"
           v-model="modal5"
           title="更新在保库"
           @on-ok="syncToWarranty"
           ok-text="确认更新">
      <DatePicker v-model="syncDate" type="date" placeholder="保险确认时间" style="width: 100%"></DatePicker>
    </Modal>

    <Table border
           stripe
           ref="taskTable"
           :columns="taskColumns"
           :data="taskData"
           @on-selection-change="selectTableData"></Table>
    <Page show-sizer show-elevator
          @on-change="getByPage"
          @on-page-size-change="pageSizeChange"
          :total="formItem.total"
          :current="formItem.current"
          :page-size="formItem.size"></Page>
  </div>
</template>
<script>
  import taskExpend from "./TaskExpend.vue";
  import task from "../../../store/modules/health_medical/data_sources/medical_task.js";
  import apiAjax from "../../../data/health_medical/task_medica.js";
  import qs from "qs";

  export default {
    components: {taskExpend},
    data() {
      return {
        modal1: false,
        modal2: false,
        modal3: false,
        modal4: false,
        modal5: false,
        modal6: false,
        modal10: false,
        value1: "1",
        formItem: {
          total: 0,
          current: 1,
          size: 10,
          status: null,
          taskType: "1",
          keyType: null,
          keyValueLarge: null,
          keyValueSmall: null,
          afProductId: null,
          startConfirmDateRange: [],
          endConfirmDateRange: [],
          employeeId: null,
          employeeName: null,
          companyId: null,
          companyName: null,
          managementId: null,
          managementName: null,
          insuranceCompany: "1"
        },
        syncDate: null,
        dealMsg: {
          remark: null
        },
        taskColumns: [
          {
            type: "selection",
            width: 60,
            align: "center"
          },
          {
            type: "expand",
            width: 50,
            render: (h, params) => {
              return h(taskExpend, {
                props: {
                  row: params.row
                }
              });
            }
          },
          {
            title: "雇员编号",
            sortable: true,
            key: "employeeId",
            align: "center"
          },
          {
            title: "雇员姓名",
            sortable: true,
            key: "employeeName",
            align: "center"
          },
          {
            title: "保险对象",
            sortable: true,
            align: "center",
            render: (h, params) => {
              if (params.row.type === 3) {
                return params.row.employeeName;
              } else {
                return params.row.associatedInsurantName;
              }
            }
          },
          {
            title: "性别",
            sortable: true,
            key: "gender",
            align: "center",
            render: (h, params) => {
              return task.genderToChina(params.row.gender);
            }
          },
          {
            title: "出生日期",
            sortable: true,
            key: "birthDate",
            align: "center",
            render: (h, params) => {
              if (params.row.birthDate !== null) {
                return this.$utils.formatDate(params.row.birthDate, "YYYY-MM-DD");
              }
            }
          },
          {
            title: "投保费用",
            sortable: true,
            key: "price",
            align: "center"
          },
          {
            title: "标的",
            sortable: true,
            key: "keyType",
            align: "center",
            render: (h, params) => {
              return task.keyTypeToChina(params.row.keyType);
            }
          },
          {
            title: "关系",
            sortable: true,
            key: "type",
            align: "center",
            render: (h, params) => {
              return task.typeToChina(params.row.type);
            }
          },
          {
            title: "状态",
            sortable: true,
            key: "status",
            align: "center",
            render: (h, params) => {
              return task.statusToChina(params.row.status);
            }
          },
          {
            title: "中止日期",
            sortable: true,
            key: "column12",
            align: "center",
            render: (h, params) => {
              if (params.row.birthDate !== null) {
                return this.$utils.formatDate(
                  params.row.column12,
                  "YYYY-MM-DD HH:mm:ss"
                );
              }
            }
          }
        ],
        exportItem: [],
        taskData: [],
        selectData: [],
        taskTypeProperties: task.taskTypeProperties,
        insuranceCompanyProperties: [],
        taskTypeItem: [],
        taskStatus: task.taskWaitStatus,
        keyTypeProperties: task.keyTypeProperties
      };
    },
    created() {
      this.getByPage(1);
      this.queryInsuranceCompanyInfo();
      this.queryIcProductRelationInfo(this.formItem.insuranceCompany);
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    },
    methods: {
      queryTaskPage() {
        apiAjax.queryWaitTaskPage(this.formItem).then(response => {
          this.taskData = response.data.object.records;
          this.taskData.forEach(item => {
            if (item.status === 5 || item.status === 6) {
              item._disabled = true;
            }
          });
          this.formItem.total = response.data.object.total;
        });
      },
      updateTpaTaskList(val) {
        if (this.selectData.length === 0) {
          this.$Message.error("请选择数据");
          return;
        }
        this.selectData.forEach(item => {
          item.status = val;
          item.remark = this.dealMsg.remark;
          item.modifiedBy = this.userInfo.displayName;
        });
        apiAjax.updateTpaTask(this.selectData).then(response => {
          if (response.data.code === 200) {
            this.getByPage(1);
            this.dealMsg.remark = null;
            this.$Message.success("更新成功");
          }
        });
      },
      syncToWarranty() {
        if (this.selectData.length === 0) {
          this.$Message.error("请选择数据");
          return;
        }
        for (let i = 0; i < this.selectData.length; i++) {
          if (this.selectData[i].status !== 4) {
            this.$Message.error("请选择已处理状态的数据");
            return;
          }
        }

        let syncData = {};
        syncData.afTpaTasks = this.selectData;
        syncData.date = this.syncDate;
        apiAjax.syncToWarranty(syncData).then(response => {
          if (response.data.object) {
            this.getByPage(1);
            this.dealMsg.remark = null;
            this.$Message.success("更新成功");
            this.syncDate = null;
          } else {
            this.$Message.error("服务器异常，请稍后再试");
          }
        });
      },
      queryInsuranceCompanyInfo() {
        apiAjax.queryInsuranceCompany().then(response => {
          if (response.data.code === 200) {
            this.insuranceCompanyProperties = response.data.object;
            this.insuranceCompanyProperties.forEach(item => {
              item.insuranceCompanyId = item.insuranceCompanyId + "";
            });
          }
        });
      },
      queryIcProductRelationInfo(val) {
        apiAjax.queryIcProductRelation(val).then(response => {
          if (response.data.code === 200) {
            this.taskTypeItem = response.data.object;
            this.taskTypeItem.forEach(item => {
              item.insuranceProductId = item.insuranceProductId + "";
            });
          }
        });
      },
      exportData() {
        if (this.formItem.afProductId === null) {
          this.$Message.error("导出数据请先选择保险项目");
          return;
        }
        window.location =
          process.env.HOST_SUPPLEMENTMEDICAL +
          "/api/afsupportcenter/healthmedical/afTpaTask/exportWaitTaskPage?" +
          qs.stringify(this.formItem);
      },
      selectTableData(rows) {
        this.selectData = rows;
      },
      getByPage(val) {
        this.formItem.current = val;
        this.queryTaskPage();
      },
      pageSizeChange(size) {
        this.formItem.size = size;
        this.queryTaskPage();
      },
      resetSearchCondition(name) {
        this.$refs[name].resetFields();
      }
    }
  };
</script>

<style>
  .warn-back .ivu-btn.ivu-btn-text.ivu-btn-large {
    color: #fff;
    background-color: #ed3f14;
    border-color: #ed3f14;
  }

  .warn-back .ivu-btn.ivu-btn-text.ivu-btn-large:hover {
    background-color: #f16543;
    border-color: #f16543;
  }
</style>
