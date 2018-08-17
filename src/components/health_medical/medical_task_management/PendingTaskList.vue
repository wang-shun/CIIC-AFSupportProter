<template>
  <div>
    <Collapse v-model="value1" accordion>
      <Panel name="1">
        待处理任务单查询
        <div slot="content">
          <Form ref="formItem" :model="formItem" :label-width="150">
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <FormItem label="任务单状态" prop="status">
                  <Select v-model="formItem.status" :clearable="true" @on-change="getByPage(1)">
                    <Option v-for="item in taskStatus" :value="item.value" :key="item.value">
                      {{item.label}}
                    </Option>
                  </Select>
                </FormItem>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <FormItem label="任务单类型" prop="taskType">
                  <Select v-model="formItem.taskType" :clearable="true">
                    <Option v-for="item in taskTypeProperties" :value="item.value" :key="item.value">
                      {{item.label}}
                    </Option>
                  </Select>
                </FormItem>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <FormItem label="保险公司" prop="insuranceCompany">
                  <Select v-model="formItem.insuranceCompany" :clearable="true"
                          @on-change="queryIcProductRelationInfo(formItem.insuranceCompany)">
                    <Option v-for="item in insuranceCompanyProperties" :value="item.insuranceCompanyId"
                            :key="item.insuranceCompanyId">
                      {{item.insuranceCompanyName}}
                    </Option>
                  </Select>
                </FormItem>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <FormItem label="保单" prop="afProductId">
                  <Select v-model="formItem.afProductId" :clearable="true"
                          @on-change="getByPage(1)">
                    <Option v-for="item in taskTypeItem" :value="item.insurancePolicyId" :key="item.insurancePolicyId">
                      {{item.insurancePolicyName}}
                    </Option>
                  </Select>
                </FormItem>
              </Col>
              <Col v-if="formItem.taskType === '1'" :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <FormItem label="起始日期" prop="startConfirmDateRange">
                  <DatePicker v-model="formItem.startConfirmDateRange" type="daterange" placement="bottom"
                              placeholder="选择日期" style="width: 100%;"
                              transfer></DatePicker>
                </FormItem>
              </Col>
              <Col v-if="formItem.taskType === '2'" :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <FormItem label="截止日期" prop="endConfirmDateRange">
                  <DatePicker v-model="formItem.endConfirmDateRange" type="daterange" placement="bottom"
                              placeholder="选择日期" style="width: 100%;"
                              transfer></DatePicker>
                </FormItem>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <FormItem label="保额类型">
                  <Select v-model="formItem.keyType" :clearable="true">
                    <Option v-for="item in keyTypeProperties" :value="item.value" :key="item.value">{{item.label}}
                    </Option>
                  </Select>
                </FormItem>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <FormItem label="大于" prop="keyValueLarge">
                  <InputNumber v-model="formItem.keyValueLarge" style="width: 100%"></InputNumber>
                </FormItem>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <FormItem label="小于" prop="keyValueSmall">
                  <InputNumber v-model="formItem.keyValueSmall" style="width: 100%"></InputNumber>
                </FormItem>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <FormItem label="管理方编号" prop="managementId">
                  <Input v-model="formItem.managementId" placeholder="请输入"></Input>
                </FormItem>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <FormItem label="管理方名称" prop="managementName">
                  <Input v-model="formItem.managementName" placeholder="请输入"></Input>
                </FormItem>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <FormItem label="雇员编号" prop="employeeId">
                  <Input v-model="formItem.employeeId" placeholder="请输入"></Input>
                </FormItem>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <FormItem label="雇员姓名" prop="employeeName">
                  <Input v-model="formItem.employeeName" placeholder="请输入"></Input>
                </FormItem>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <FormItem label="证件号码" prop="idNum">
                  <Input v-model="formItem.idNum" placeholder="请输入"></Input>
                </FormItem>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <FormItem label="公司编号" prop="companyId">
                  <Input v-model="formItem.companyId" placeholder="请输入"></Input>
                </FormItem>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <FormItem label="公司名称" prop="companyName">
                  <Input v-model="formItem.companyName" placeholder="请输入"></Input>
                </FormItem>
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
      <Button type="info" v-if="formItem.status===null || formItem.status==='' || formItem.status==='2'"
              @click="modal1 = true">审核
      </Button>
      <Button type="info"
              v-if="formItem.status===null || formItem.status==='' || formItem.status==='2' || formItem.status==='4'"
              @click="modal6 = true">批退
      </Button>
      <Button type="info"
              v-if="formItem.status===null || formItem.status==='' || formItem.status==='2' || formItem.status==='4'"
              @click="modal2 = true">暂缓
      </Button>
      <Button type="info" v-if="formItem.status===null || formItem.status==='' || formItem.status==='3'"
              @click="modal3 = true">恢复
      </Button>
      <Button type="info" v-if="formItem.status===null || formItem.status==='' || formItem.status==='4'"
              @click="modal5 = true">更新在保库
      </Button>
      <Button type="info"
              v-if="formItem.status===null || formItem.status==='' || formItem.status==='2' || formItem.status==='4'"
              @click="exportData()"
              icon="ios-download-outline">导出数据
      </Button>
    </div>

    <Modal class="warn-back"
           v-model="modal1"
           title="审核">
      <Form ref="dealMsg" :model="dealMsg" :rules="dealMsgRules" :label-width="80">
        <FormItem label="操作说明" prop="remark">
          <Input v-model="dealMsg.remark" placeholder="请输入" style="width: 100%;text-align: left"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancel(4)">取消</Button>
        <Button type="primary" @click="updateTpaTaskList(4)" :loading="loading">提交</Button>
      </div>
    </Modal>

    <Modal class="warn-back"
           v-model="modal6"
           title="批退">
      <Form ref="dealMsg" :model="dealMsg" :rules="dealMsgRules">
        <FormItem label="操作说明" prop="remark" :label-width="100">
          <Input v-model="dealMsg.remark" placeholder="请输入"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancel(6)">取消</Button>
        <Button type="primary" @click="updateTpaTaskList(6)" :loading="loading">批退</Button>
      </div>
    </Modal>

    <Modal v-model="modal2"
           title="暂缓">
      <Input v-model="dealMsg.remark" placeholder="请输入暂缓原因："></Input>
      <div slot="footer">
        <Button @click="cancel(3)">取消</Button>
        <Button type="primary" @click="updateTpaTaskList(3)" :loading="loading">提交</Button>
      </div>
    </Modal>

    <Modal v-model="modal3"
           title="恢复"
           @on-ok="updateTpaTaskList(2)"
           :loading="loading"
           ok-text="确认恢复">
      <div slot="footer">
        <Button @click="cancel(2)">取消</Button>
        <Button type="primary" @click="updateTpaTaskList(2)" :loading="loading">提交</Button>
      </div>
    </Modal>

    <Modal class="warn-back"
           v-model="modal5"
           title="更新在保库"
           @on-ok="syncToWarranty"
           :loading="loading"
           ok-text="确认更新">
      <DatePicker v-model="syncDate" type="date" placeholder="保险确认时间" style="width: 100%"></DatePicker>
    </Modal>

    <Table border
           stripe
           ref="taskTable"
           :columns="taskColumns"
           :data="taskData"
           @on-selection-change="selectTableData"></Table>
    <Page show-elevator
          @on-change="getByPage"
          @on-page-size-change="pageSizeChange"
          :total="formItem.total"
          :current="formItem.current"
          :page-size="formItem.size"></Page>
  </div>
</template>
<script>
  import task from "../../../store/modules/health_medical/data_sources/medical_task.js";
  import apiAjax from "../../../data/health_medical/task_medica.js";
  import qs from "qs";

  export default {
    data() {
      return {
        modal1: false,
        modal2: false,
        modal3: false,
        modal4: false,
        modal5: false,
        modal6: false,
        value1: "1",
        loading: false,
        formItem: {
          total: 0,
          current: 1,
          size: 10,
          status: null,
          taskType: null,
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
          insuranceCompany: null
        },
        syncDate: null,
        dealMsg: {
          remark: ''
        },
        dealMsgRules: {
          remark: [
            {required: true, message: '请输入操作说明', trigger: 'blur'},
            {type: 'string', pattern: !'/\s+/', message: '请输入文字', trigger: 'blur'}
          ]
        },
        taskColumns: [
          {
            type: "selection",
            width: 60,
            align: "center"
          },
          {
            title: "投保类型", sortable: true, key: "taskType", align: "center", width: 120,
            render: (h, params) => {
              return h('div', task.taskTypeToChinese(params.row.taskType));
            }
          },
          {
            title: "产品名称", sortable: true, key: "productName", align: "center", width: 150
          },
          {
            title: "雇员编号", sortable: true, key: "employeeId", align: "center", width: 150
          },
          {
            title: "雇员姓名", sortable: true, key: "employeeName", align: "center", width: 150
          },
          {
            title: "保险对象", sortable: true, align: "center", width: 150,
            render: (h, params) => {
              if (params.row.type === 3) {
                return h('div', params.row.employeeName);
              } else {
                return h('div', params.row.associatedInsurantName);
              }
            }
          },
          {
            title: "证件号码", sortable: true, key: "idNum", align: "center", width: 150
          },
          {
            title: "性别", sortable: true, key: "gender", align: "center", width: 150,
            render: (h, params) => {
              return h('div', task.genderToChina(params.row.gender));
            }
          },
          {
            title: "出生日期", sortable: true, key: "birthDate", align: "center", width: 150,
            render: (h, params) => {
              if (params.row.birthDate !== null) {
                return h('div', this.$utils.formatDate(params.row.birthDate, "YYYY-MM-DD"));
              }
            }
          },
          {
            title: "投保费用", sortable: true, key: "price", align: "center", width: 150
          },
          {
            title: "标的", sortable: true, key: "keyValue", align: "center", width: 150,
            render: (h, params) => {
              if (params.row.keyType === 2) {
                return h('div', params.row.keyValue * 100 + "%");
              } else {
                return h('div', params.row.keyValue);
              }
            }
          },
          {
            title: "关系", sortable: true, key: "type", align: "center", width: 150,
            render: (h, params) => {
              return h('div', task.typeToChina(params.row.type));
            }
          },
          {
            title: "状态", sortable: true, key: "status", align: "center", width: 150,
            render: (h, params) => {
              return h('div', task.statusToChina(params.row.status));
            }
          },
          {
            title: "审核时间", sortable: true, key: "hearTime", align: "center", width: 150,
            render: (h, params) => {
              if (params.row.hearTime != null) {
                return h('div', this.$utils.formatDate(params.row.hearTime, "YYYY-MM-DD HH:mm:ss"));
              }
            }
          },
          {
            title: "离职日期", sortable: true, key: "departuredDate", align: "center", width: 150,
            render: (h, params) => {
              if (params.row.departuredDate != null) {
                return h('div', this.$utils.formatDate(params.row.departuredDate, "YYYY-MM-DD"));
              }
            }
          },
          {
            // TODO: 合同开始时间数据待确认，等待数据源
            title: "合同开始时间", sortable: true, key: "diseaseName", align: "center", width: 150,
            render: (h, params) => {
              if (params.row.diseaseName != null) {
                return h('div', this.$utils.formatDate(params.row.diseaseName, "YYYY-MM-DD"));
              }
            }
          },
          {
            title: "公司编号", sortable: true, key: "companyId", align: "center", width: 150
          },
          {
            title: "公司名称", sortable: true, key: "companyName", align: "center", width: 150
          },
          {
            title: "保险起始日期", sortable: true, key: "startConfirmDate", align: "center", width: 150,
            render: (h, params) => {
              if (params.row.startConfirmDate != null) {
                return h('div', this.$utils.formatDate(params.row.startConfirmDate, "YYYY-MM-DD"));
              }
            }
          },
          {
            title: "保险截止日期", sortable: true, key: "endConfirmDate", align: "center", width: 150,
            render: (h, params) => {
              if (params.row.endConfirmDate != null) {
                return h('div', this.$utils.formatDate(params.row.endConfirmDate, "YYYY-MM-DD"));
              }
            }
          },
          {
            title: "提交人", sortable: true, key: "createdUser", align: "center", width: 150
          },
          {
            title: "提交时间", sortable: true, key: "createdTime", align: "center", width: 150,
            render: (h, params) => {
              if (params.row.createdTime != null) {
                return h('div', this.$utils.formatDate(params.row.createdTime, "YYYY-MM-DD"));
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
        userInfo: {},
        taskStatus: task.taskWaitStatus,
        keyTypeProperties: task.keyTypeProperties
      };
    },
    created() {
      this.getByPage(1);
      this.queryInsuranceCompanyInfo();
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
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
          if (val === 4) {
            item.hearTime = new Date();
          }
        });
        if (val === 4 || val === 6) {
          this.$refs['dealMsg'].validate((valid) => {
            if (valid) {
              this.loading = true;
              apiAjax.updateTpaTask(this.selectData).then(response => {
                this.loading = false;
                if (response.data.code === 200) {
                  this.getByPage(1);
                  this.cancel(val);
                  this.$Message.success("更新成功");
                }
              });
            }
          });
        } else {
          this.loading = true;
          apiAjax.updateTpaTask(this.selectData).then(response => {
            this.loading = false;
            if (response.data.code === 200) {
              this.getByPage(1);
              this.cancel(val);
              this.$Message.success("更新成功");
            }
          });
        }
      },
      cancel(val) {
        if (val === 4) {
          this.modal1 = false;
        } else if (val === 6) {
          this.modal6 = false;
        } else if (val === 2) {
          this.modal3 = false;
        } else if (val === 3) {
          this.modal2 = false;
        }
        this.dealMsg.remark = ''
      },
      syncToWarranty() {
        if (!this.syncDate) {
          this.$Message.error("请选择时间");
          return;
        }

        if (this.selectData.length === 0) {
          this.$Message.error("请选择数据");
          return;
        }
        for (let i = 0; i < this.selectData.length; i++) {
          if (this.selectData[i].status !== 4) {
            this.$Message.error("请选择已审核状态的数据");
            return;
          }
        }

        let syncData = {};
        syncData.afTpaTasks = this.selectData;
        syncData.date = this.syncDate;
        this.loading = true;
        apiAjax.syncToWarranty(syncData).then(response => {
          this.loading = false;
          if (response.data.object === 1) {
            this.$Message.success("更新成功");
            this.getByPage(1);
            this.dealMsg.remark = '';
            this.syncDate = null;
          } else if (response.data.object === 2) {
            this.$Message.error("投保任务单没有更新在保库");
          } else if (response.data.object === 3) {
            this.$Message.error("投保时间大于退保时间");
          } else if (response.data.object === 4) {
            this.$Message.error("投保任务单批退或者暂缓");
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
            this.queryIcProductRelationInfo(this.insuranceCompanyProperties[0].insuranceCompanyId);
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
        if (this.formItem.taskType === null || this.formItem.taskType === undefined || this.formItem.taskType === '') {
          this.$Message.error("导出数据请先选择任务单类型");
          return;
        }
        if (this.formItem.insuranceCompany === null || this.formItem.insuranceCompany === undefined || this.formItem.insuranceCompany === '') {
          this.$Message.error("导出数据请先选择保险公司");
          return;
        }
        if (this.formItem.afProductId === null || this.formItem.afProductId === undefined || this.formItem.afProductId === '') {
          this.$Message.error("导出数据请先选择保险项目");
          return;
        }
        window.location = apiAjax.basePaths + "/api/afsupportcenter/healthmedical/afTpaTask/exportWaitTaskPage?" + qs.stringify(this.formItem) + '&token=' + encodeURIComponent(this.userInfo.token);
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
  /*.warn-back .ivu-btn.ivu-btn-text.ivu-btn-large {
    color: #fff;
    background-color: #ed3f14;
    border-color: #ed3f14;
  }

  .warn-back .ivu-btn.ivu-btn-text.ivu-btn-large:hover {
    background-color: #f16543;
    border-color: #f16543;
  }*/
</style>
