<template>
  <Form label-width=150>
    <Row type="flex" justify="start">
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="公积金类型：">
          {{fundOperator.fundType}}
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="基本/补充公积金账户：">
          <Input v-model="fundOperator.fundAccount" placeholder="请输入..." :disabled="disabled"></Input>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="">
          <Checkbox v-model="fundOperator.isCreateSealingTicket">创建封存任务单</Checkbox>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="雇员起缴月份">
          <DatePicker v-model="fundOperator.startPayDate" placement="bottom-end" placeholder="选择日期" :disabled="disabled" style="width: 100%;" transfer></DatePicker>
        </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="操作提示：">
          <Select v-model="fundOperator.operatorTipValue" style="width: 100%;" :disabled="disabled" transfer>
            <Option v-for="item in operatorTipList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="操作提示日期">
          <DatePicker v-model="fundOperator.operatorTipDate" placement="bottom-end" placeholder="选择日期" :disabled="disabled" style="width: 100%;" transfer></DatePicker>
        </Form-item>
      </Col>
    </Row>
    <Row>
      <Col :sm="{span: 24}">
        <Table border :columns="operatorListColumns" :data="fundOperatorInfo.operatorListData"></Table>
      </Col>
    </Row>
    <Row class="mt20">
      <Col :sm="{span: 24}">
        <Form-item label="办理备注：">
          <Input v-model="fundOperator.doRemark" placeholder="请输入..." :disabled="disabled"></Input>
        </Form-item>
      </Col>
      <Col :sm="{span: 24}">
        <Form-item label="批退备注：">
          <Input v-model="fundOperator.refuseRemark" placeholder="请输入..." :disabled="disabled"></Input>
        </Form-item>
      </Col>
    </Row>
  </Form>
</template>
<script>
  export default {
    props: {
      fundOperatorInfo: {
        type: Object,
        default() {
          return {}
        }
      },
      disabled: {
        type: Boolean,
        default() {
          return false
        }
      }
    },
    data() {
      return {
        operatorTipList: [
          {label: '要做', value: 0},
          {label: '中心', value: 1},
          {label: '中智', value: 2},
          {label: '原单位', value: 3},
          {label: '外服', value: 4},
          {label: '不做', value: 5},
          {label: '外包', value: 6},
          {label: '其他独立开户公司', value: 7},
        ],
        operatorListColumns: [
          {title: '汇缴类型', key: 'payType', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('Select', {props: {value: params.row.payType, disabled: this.disabled}},
                  [
                    h('Option', {props: {value: 0}},'正常汇缴'),
                    h('Option', {props: {value: 1}},'补缴'),
                  ]
                )]
              );
            }
          },
          {title: '起缴月份', key: 'startMonth', align: 'center',
            render: (h, params) => {
              return h('div', [
                h('i-input', {
                  props: {value: params.row.startMonth, disabled: this.disabled},
                }, params.row.startMonth)
              ]);
            }
          },
          {title: '截止月份', key: 'endMonth', align: 'center',
            render: (h, params) => {
              return h('div', [
                h('i-input', {
                  props: {value: params.row.endMonth, disabled: this.disabled},
                }, params.row.endMonth)
              ]);
            }
          },
          {title: '客户汇缴月', key: 'customerPayMonth', align: 'center',
            render: (h, params) => {
              return h('div', [
                h('i-input', {
                  props: {value: params.row.customerPayMonth, disabled: this.disabled},
                }, params.row.customerPayMonth)
              ]);
            }
          },
          {title: '基数', key: 'base', align: 'center',
            render: (h, params) => {
              return h('div', [
                h('i-input', {
                  props: {value: params.row.base, disabled: this.disabled},
                }, params.row.base)
              ]);
            }
          },
          {title: '比例', key: 'percent', align: 'center',
            render: (h, params) => {
              return h('div', [
                h('i-input', {
                  props: {value: params.row.percent, disabled: this.disabled},
                }, params.row.percent)
              ]);
            }
          },
          {title: '金额', key: 'price', align: 'center',
            render: (h, params) => {
              return h('div', [
                h('i-input', {
                  props: {value: params.row.price, disabled: this.disabled},
                }, params.row.price)
              ]);
            }
          },
          {title: '补缴原因', key: 'reason', align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Select', {props: {value: params.row.reason, disabled: this.disabled}},
                  [
                    h('Option', {props: {value: 0}},'漏缴补缴'),
                    h('Option', {props: {value: 1}},'少缴补缴'),
                    h('Option', {props: {value: 2}},'欠款单位补缴'),
                    h('Option', {props: {value: 3}},'外省市转入补缴'),
                    h('Option', {props: {value: 4}},'错缴更正补缴'),
                    h('Option', {props: {value: 5}},'特殊补缴'),
                    h('Option', {props: {value: 6}},'账外补缴'),
                  ]
                )
              ]);
            }
          },
          {title: '操作', key: 'base', align: 'center', width: 130,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {type: 'default', shape: 'circle', icon: 'edit', size: 'small', disabled: this.disabled},
                  style: {marginRight: '5px'},
                  on: {
                    click: () => {
                      params.row.disabled = false;
                    }
                  }
                }),
                h('Button', {
                  props: {type: 'default', shape: 'circle', icon: 'minus', size: 'small', disabled: this.disabled},
                  style: {marginRight: '5px'},
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                }),
                h('Button', {
                  props: {type: 'default', shape: 'circle', icon: 'plus', size: 'small', disabled: this.disabled},
                  on: {
                    click: () => {
                      this.insert(params.index);
                    }
                  }
                })
              ]);
            }
          }
        ],
      }
    },
    computed: {
      fundOperator() {
        return this.fundOperatorInfo
      }
    }
  }
</script>
