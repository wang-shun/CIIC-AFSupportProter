<template>
  <div class="pendingTaskList">
    <Collapse v-model="value1" accordion>
      <Panel name="1">
        待处理任务单查询
        <div slot="content">
          <Form ref="formItem" :model="formItem" :label-width="150">
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="任务单状态">
                <Select placeholder="请选择">
                  <Option value="1" v-for="item in taskStatus" :value="item.value" :key="item.value">{{item.label}}
                  </Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="任务单类型">
                <Select placeholder="请选择">
                  <Option value="1" v-for="item in taskType" :value="item.value" :key="item.value">{{item.label}}
                  </Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="保险公司">
                <Select placeholder="请选择" transfer>
                  <Option value="1" v-for="item in taskStatusCom" :value="item.value" :key="item.value">
                    {{item.label}}
                  </Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="保险项目">
                <Select v-model="model10" multiple placeholder="请选择" transfer>
                  <Option value="1" v-for="item in taskTypeItem" :value="item.value" :key="item.value">{{item.label}}
                  </Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="标的">
                <Select placeholder="请选择" style="width: 80px;" transfer>
                  <Option value="1" v-for="item in insureStatus" :value="item.value" :key="item.value">{{item.label}}
                  </Option>
                </Select>
                <Input v-model="formItem.code" style="width: 90px;" placeholder="请输入"/>
                <span class="expand-value">-</span>
                <Input v-model="formItem.code" style="width: 90px;" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="保险开始日期">
                <DatePicker type="daterange" placement="bottom" placeholder="选择日期" style="width: 100%;"
                            transfer></DatePicker>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="保险结束日期">
                <DatePicker type="daterange" placement="bottom" placeholder="选择日期" style="width: 100%;"
                            transfer></DatePicker>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="管理方编号">
                <Input v-model="formItem.code" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="管理方名称">
                <Input v-model="formItem.code" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="雇员编号">
                <Input v-model="formItem.code" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="雇员姓名">
                <Input v-model="formItem.code" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="证件号码">
                <Input v-model="formItem.code" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="公司编号">
                <Input v-model="formItem.code" placeholder="请输入"/>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="公司名称">
                <Input v-model="formItem.code" placeholder="请输入"/>
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
      <Button type="info" @click="modal6 = true">退回</Button>
      <Button type="info" @click="exportData(1)" icon="ios-download-outline">导出数据</Button>
    </div>

    <Modal
      v-model="modal1"
      title="审核对话框"
      @on-ok="ok"
      ok-text="审核通过"
      @on-cancel="cancel"
      cancel-text="批退">
      <Input v-model="formItem.code" placeholder="请输入操作说明："/>
    </Modal>

    <Modal
      v-model="modal2"
      title="暂缓对话框"
      @on-ok="delay"
      ok-text="暂缓"
      cancel-text="返回">
      <Input v-model="formItem.code" placeholder="请输入暂缓原因："/>
    </Modal>

    <Modal
      v-model="modal3"
      title="恢复对话框"
      @on-ok="recovery"
      ok-text="确认恢复"
      cancel-text="返回">
    </Modal>

    <Modal
      v-model="modal5"
      title="更新在保库对话框"
      @on-ok="toubao"
      ok-text="确认更新"
      cancel-text="返回">
    </Modal>

    <Modal
      v-model="modal6"
      title="失败处理对话框"
      @on-ok="toubao"
      ok-text="更新为待投保"
      cancel-text="批退">
    </Modal>

    <Table border
           stripe
           :columns="taskColumns"
           :data="taskData"></Table>
    <Page show-sizer show-elevator
          @on-change="getByPage"
          @on-page-size-change="pageSizeChange"
          :total="formItem.total"
          :current="formItem.current"
          :page-size="formItem.size"></Page>
  </div>
</template>
<script>
  import taskExpend from './TaskExpend.vue';
  import task from '../../../store/modules/health_medical/data_sources/medical_task.js'
  import apiAjax from "../../../data/health_medical/task_medica.js";

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
        model10: [],
        value1: '1',
        formItem: {
          total: 0,
          current: 1,
          size: 10,
        },
        taskColumns: [
          {
            type: 'selection', width: 60, align: 'center'
          },
          {
            type: 'expand', width: 50,
            render: (h, params) => {
              return h(taskExpend, {
                props: {
                  row: params.row
                }
              })
            }
          },
          {
            title: '雇员编号', sortable: true, key: 'employeeId', align: 'center'
          },
          {
            title: '雇员姓名', sortable: true, key: 'employeeName', align: 'center'
          },
          {
            title: '保险对象', sortable: true, align: 'center',
            render: (h, params) => {
              if (params.row.type === 1) {
                return params.row.employeeName;
              } else {
                return params.row.associatedInsurantName;
              }
            }
          },
          {
            title: '性别', sortable: true, key: 'gender', align: 'center',
            render: (h, params) => {
              return task.genderToChina(params.row.gender);
            }
          },
          {
            title: '出生日期', sortable: true, key: 'birthDate', align: 'center',
            render: (h, params) => {
              if (params.row.birthDate !== null) {
                return this.$utils.formatDate(params.row.birthDate, 'YYYY-MM-DD');
              }
            }
          },
          {
            title: '投保费用', sortable: true, key: 'price', align: 'center'
          },
          {
            title: '标的', sortable: true, key: 'keyType', align: 'center',
            render: (h, params) => {
              return task.keyTypeToChina(params.row.keyType);
            }
          },
          {
            title: '关系', sortable: true, key: 'type', align: 'center',
            render: (h, params) => {
              return task.typeToChina(params.row.type);
            }
          },
          {
            title: '中止日期', sortable: true, key: 'column12', align: 'center',
            render: (h, params) => {
              if (params.row.birthDate !== null) {
                return this.$utils.formatDate(params.row.column12, 'YYYY-MM-DD HH:mm:ss');
              }
            }
          }
        ],
        taskData: [],
        taskType: task.taskType,
        taskStatusCom: task.taskStatusCom,
        taskTypeItem: task.taskTypeItem,
        taskStatus: task.taskStatus,
        insureStatus: task.insureStatus
      };
    },
    created() {
      this.getByPage(1);
    },
    methods: {
      queryTaskPage() {
        apiAjax.queryTaskPage(this.formItem).then(response => {
          this.taskData = response.data.object.records;
          this.formItem.total = response.data.object.total;
        });
      },

      getByPage(val) {
        this.formItem.current = val;
        this.queryTaskPage()
      },
      pageSizeChange(size) {
        this.formItem.size = size;
        this.queryTaskPage()
      },
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
      ok() {
        this.$Message.info('已审核通过');
      },
      cancel() {
        this.$Message.info('已批退');
      },
      recovery() {
        this.$Message.info('已恢复');
      },
      toubao() {
        this.$Message.info('已投保');
      },
      selectresult() {
//            this.$refs.rmb.style.visibility='hidden';  隐藏按钮
      },
      delay() {
        this.$Message.info('已暂缓');
      }
    }
  }
</script>
