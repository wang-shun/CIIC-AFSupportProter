<template>
  <Form label-width=150>
    <Row>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
      <Form-item label="公积金类型：">
        {{fundOperator.fundType}}
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
      <Form-item label="任务：">
        {{fundOperator.taskType}}
        </Form-item>
      </Col>
    </Row>
    <Row>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="补缴原因：">
          <Select v-model="fundOperator.reasonValue" style="width: 100%;" :disabled="disabled" transfer>
            <Option v-for="item in reasonList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="操作提示：">
          <Select v-model="fundOperator.operatorTipValue" style="width: 100%;" :disabled="disabled" transfer>
            <Option v-for="item in operatorTipsList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="操作提示日期">
          <DatePicker v-model="fundOperator.operatorTipDate" placement="bottom-end" placeholder="选择日期" :disabled="disabled" style="width: 100%;" transfer></DatePicker>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="客户汇缴月份">
          <DatePicker v-model="fundOperator.customerPayDate" placement="bottom-end" placeholder="选择日期" :disabled="disabled" style="width: 100%;" transfer></DatePicker>
        </Form-item>
      </Col>
    </Row>
    <Row>
      <Col :sm="{span: 24}">
        <Table border :columns="operatorListColumns" :data="fundOperator.operatorListData"></Table>
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
        reasonList: [
          {value: 0, label: '漏缴补缴'},
          {value: 1, label: '少缴补缴'},
          {value: 2, label: '欠款单位补缴'},
          {value: 3, label: '外省市转入补缴'},
          {value: 4, label: '错缴更正补缴'},
          {value: 5, label: '特殊补缴'},
          {value: 6, label: '账外补缴'},
        ],

        operatorTipsList: [
          {value: 0, label: '要做'},
          {value: 1, label: '中心'},
          {value: 2, label: '中智'},
          {value: 3, label: '原单位'},
          {value: 4, label: '外服'},
          {value: 5, label: '不做'},
          {value: 6, label: '外包'},
          {value: 7, label: '其他独立开户公司'}
        ],
        operatorListColumns: [
          {title: '补缴起始年月', key: 'startDate', align: 'center',
            render: (h, params) => {
              return h('div', [
                h('i-input', {
                  props: {value: params.row.startDate, disabled: this.disabled},
                }, params.row.startDate)
              ]);
            }
          },
          {title: '补缴截止年月', key: 'endDate', align: 'center',
            render: (h, params) => {
              return h('div', [
                h('i-input', {
                  props: {value: params.row.endDate, disabled: this.disabled},
                }, params.row.endDate)
              ]);
            }
          },
          {title: '补缴基数', key: 'base', align: 'center',
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
          {title: '每月金额', key: 'price', align: 'center',
            render: (h, params) => {
              return h('div', [
                h('i-input', {
                  props: {value: params.row.price, disabled: this.disabled},
                }, params.row.price)
              ]);
            }
          },
          {title: '合计补缴金额', key: 'count', align: 'center',
            render: (h, params) => {
              return h('div', [
                h('i-input', {
                  props: {value: params.row.count, disabled: this.disabled},
                }, params.row.count)
              ]);
            }
          },
          // {title: '操作', key: '', align: 'center', width: 130,
          //   render: (h, params) => {
          //     return h('div', [
          //       h('Button', {
          //         props: {type: 'default', shape: 'circle', icon: 'edit', size: 'small', disabled: this.disabled},
          //         style: {marginRight: '5px'},
          //         on: {
          //           click: () => {
          //             params.row.disabled = false;
          //           }
          //         }
          //       }),
          //       h('Button', {
          //         props: {type: 'default', shape: 'circle', icon: 'minus', size: 'small', disabled: this.disabled},
          //         style: {marginRight: '5px'},
          //         on: {
          //           click: () => {
          //             this.remove(params.index);
          //           }
          //         }
          //       }),
          //       h('Button', {
          //         props: {type: 'default', shape: 'circle', icon: 'plus', size: 'small', disabled: this.disabled},
          //         on: {
          //           click: () => {
          //             this.insert(params.index);
          //           }
          //         }
          //       })
          //     ]);
          //   }
          // }
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
