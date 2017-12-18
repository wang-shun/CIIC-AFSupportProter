<template>
  <Form :label-width=150 v-model="socialSecurityPayOperator" ref="handleWay">
    <Row class="mt20" type="flex" justify="start">
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
      <Form-item label="办理方式：" prop="handleWay">
        <Select v-model="socialSecurityPayOperator.handleWay" style="width: 100%;" transfer>
          <Option value="1" label="网上申报"></Option>
          <Option value="2" label="柜面办理"></Option>
        </Select>
      </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
      <Form-item label="办理月份：" prop="handleMonth">
        <DatePicker v-model="socialSecurityPayOperator.handleMonth" type="month" placeholder="办理年月" style="width: 100%;"
                    transfer></DatePicker>
      </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
      <Form-item label="变更类型：" prop="taskCategory">
        <span v-if="operatorType === '1'">调整</span>
        <span v-else-if="operatorType === '4'">补缴</span>
        <Select v-model="socialSecurityPayOperator.taskCategory" style="width: 100%;" transfer v-else>
          <Option v-for="item in taskCategoryType" :value="item.value" :key="item.value" :label="item.label"></Option>
        </Select>
      </Form-item>
      </Col>
      <!-- 仅新增 -->
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}" v-show="operatorType === '0'">
      <Form-item label="社保序号：" prop="empSsSerial">
        <Input v-model="socialSecurityPayOperator.empSsSerial" placeholder="请输入..."></Input>
      </Form-item>
      </Col>
      <!-- 仅转出 -->
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}" v-show="operatorType === '2'">
      <Form-item label="特殊变更类型：" prop="taskCategorySpecial">
        <Select v-model="socialSecurityPayOperator.taskCategorySpecial" style="width: 100%;" transfer>
          <Option v-for="item in specialChangeType" :value="item.value" :key="item.value">
            {{item.label}}
          </Option>
        </Select>
      </Form-item>
      </Col>
      <!-- 仅新增 -->
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}" v-show="operatorType === '0'">
      <Form-item label="起缴月份：" prop="startMonth">
        <DatePicker v-model="socialSecurityPayOperator.startMonth" type="month" placeholder="选择年月" style="width: 100%;"
                    transfer></DatePicker>
      </Form-item>
      </Col>
      <!-- 仅转出 -->
      <!-- 仅新增 -->
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}" v-show="operatorType === '0' || operatorType === '2'">
      <Form-item label="截至月份：" prop="endMonth">
        <DatePicker v-model="socialSecurityPayOperator.endMonth" type="month" placement="bottom-end" placeholder="选择日期"
                    style="width: 100%;" transfer></DatePicker>
      </Form-item>
      </Col>
      <Col :sm="{span:24}" v-if="operatorType !== '2'">
      <Table border width="100%" :columns="operatorListColumns"
             :data="operatorListData"></Table>
      </Col>
    </Row>
    <Row class="mt20">
      <Col span="16">
      <Form-item label="办理备注：" prop="handleRemark">
        <Input v-model="socialSecurityPayOperator.handleRemark" placeholder="请输入..."></Input>
      </Form-item>
      </Col>
      <Col span="4">
      <Form-item label="备注人：">
        <label>{{socialSecurityPayOperator.handleRemarkMan}}</label>
      </Form-item>
      </Col>
      <Col span="4">
      <Form-item label="备注时间：">
        <label>{{socialSecurityPayOperator.handleRemarkDate}}</label>
      </Form-item>
      </Col>
      <Col span="16">
      <Form-item label="批退备注：" prop="rejectionRemark">
        <Input v-model="socialSecurityPayOperator.rejectionRemark" placeholder="请输入..."></Input>
      </Form-item>
      </Col>
      <Col span="4">
      <Form-item label="备注人：">
        <label>{{socialSecurityPayOperator.rejectionRemarkMan}}</label>
      </Form-item>
      </Col>
      <Col span="4">
      <Form-item label="备注时间：">
        <label>{{socialSecurityPayOperator.rejectionRemarkDate}}</label>
      </Form-item>
      </Col>
    </Row>
  </Form>
</template>
<script>
  import api from '../../api/social_security/employee_operator'

  export default {
    data() {
      return {
        operatorType: '0',
        empTaskId: '',

        taskCategoryType: [
          {value: '1', label: '新进'},
          {value: '2', label: '转入'},
          {value: '3', label: '新进转出'},
          {value: '4', label: '转入转出'},
        ], //变更方式
        specialChangeType: [
          {value: 1, label: '退休'},
          {value: 2, label: '终止'}
        ], //特殊变更类型：

        operatorListColumns: [
          {
            title: '', key: 'remitWay', align: 'center', width: 100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.remitWay),
              ]);
            }
          },
          {
            title: '起缴月份',
            key: 'startMonth',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('i-input', {
                  props: {value: params.row.startMonth, disabled: Boolean(params.row.disabled)},
                  on: {
                    'on-blur': (e) => {
                      this.setRow(params, 'startMonth', e.target.value);
                    }
                  }
                }, params.row.startMonth)
              ]);
            }
          },
          {
            title: '截止月份',
            key: 'endMonth',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('i-input', {
                  props: {value: params.row.endMonth, disabled: Boolean(params.row.disabled)},
                  on: {
                    'on-blur': (e) => {
                      this.setRow(params, 'endMonth', e.target.value);
                    }
                  }
                }, params.row.endMonth)
              ]);
            }
          },
          {
            title: '基数',
            key: 'baseAmount',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('i-input', {
                  props: {value: params.row.baseAmount, disabled: Boolean(params.row.disabled)},
                  on: {
                    'on-blur': (e) => {
                      this.setRow(params, 'baseAmount', e.target.value);
                    }
                  }
                }, params.row.baseAmount)
              ]);
            }
          },
          {
            title: '操作',
            key: 'base',
            align: 'center',
            width: 130,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {type: 'default', shape: 'circle', icon: 'edit', size: 'small'},
                  style: {marginRight: '5px'},
                  on: {
                    click: () => {
                      params.row.disabled = false;
                    }
                  }
                }),
                h('Button', {
                  props: {type: 'default', shape: 'circle', icon: 'minus', size: 'small'},
                  style: {marginRight: '5px'},
                  on: {
                    click: () => {
                      this.removeRow(params.index);
                    }
                  }
                }),
                h('Button', {
                  props: {type: 'default', shape: 'circle', icon: 'plus', size: 'small'},
                  on: {
                    click: () => {
                      this.insertRow(params.index);
                    }
                  }
                })
              ]);
            }
          }
        ],
        operatorListData: [
          {remitWay: '', startMonth: '', endMonth: '', baseAmount: '', disabled: false}
        ],
        socialSecurityPayOperator: {
          handleWay: '1',
          handleMonth: '',
          taskCategory: '1',
          empSsSerial: '',
          startMonth: '',
          endMonth: '',
          rejectionRemark: '',
          handleRemark: '',
          handleRemarkMan: '',
          handleRemarkDate: '',
          rejectionRemark: '',
          rejectionRemarkMan: '',
          rejectionRemarkDate: '',

          taskStatus: '',
          empTaskId: '',


        }
      }
    },
    mounted() {
    },
    computed: {},
    methods: {
      initData(data) {
        var empTaskId = data.empTaskId;
        this.socialSecurityPayOperator.empTaskId = empTaskId;
        api.queryEmpTaskById({
          empTaskId: empTaskId,
          operatorType: 1,// 任务单费用段
        }).then(data => {
          if (data.data.empTaskPeriods.length > 0) {
            this.operatorListData = data.data.empTaskPeriods;
          }
          this.$utils.copy(data.data, this.socialSecurityPayOperator);
        });
      },
      getData() {
        return {
          data: this.filterData(),
          form: this.socialSecurityPayOperator
        };
      },
      filterData() {
        var oldRows = this.getRows();
        var empTaskId = this.socialSecurityPayOperator.empTaskId;

        var newRows = [];
        for (var row of oldRows) {
          if (row.startMonth != '' || row.endMonth != '' || row.baseAmount != '') {
            newRows.push({
              empTaskId:empTaskId,
              startMonth:row.startMonth,
              endMonth:row.endMonth,
              baseAmount:row.baseAmount,
              remitWay:row.remitWay,
            });
          }
        }
        return newRows;
      },
      newRow() {
        return {
          remitWay: '',
          startMonth: '',
          endMonth: '',
          baseAmount: '',
          disabled: false
        };
      },
      getRows() {
        return this.operatorListData;
      },
      setRow(params, name, value) {
        this.getRows()[params.index][name] = value;
        params.row[name] = value;
      },
      insertRow(index) {
        this.getRows().splice(index, 0, this.newRow());
      },
      removeRow(index) {
        var data = this.getData();

        // 保留最后一个并清空
        if (data.length == 1) {
          this.$utils.copy(this.newRow(), data[0]);
        } else {
          data.splice(index, 1);
        }
      }
    },
  }
</script>
