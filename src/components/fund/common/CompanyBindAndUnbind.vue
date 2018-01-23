<template>
  <div>
    <Form :label-width=150>
      <h3>雇员转移操作</h3>
      <Row type="flex" justify="start">
        <Col :sm="{span:12}">
          <Form-item label="公司名称：">
            {{companyFundAccount.companyName}}
          </Form-item>
        </Col>
        <Col :sm="{span:12}">
          <Form-item label="开户银行：">
            {{companyFundAccount.openAccountBank}}
          </Form-item>
        </Col>
        <Col :sm="{span:12}">
          <Form-item label="企业基本公积金账号：">
            {{companyFundAccount.companyBasicFundAccount}}
          </Form-item>
        </Col>
        <Col :sm="{span:12}">
          <Form-item label="企业补充公积金账号：">
            {{companyFundAccount.companyAddFundAccount}}
          </Form-item>
        </Col>
        <Col :sm="{span:12}">
          <Form-item label="公积金企业U盾：">
            {{companyFundAccount.UKey}}
          </Form-item>
        </Col>
        <Col :sm="{span:12}">
          <Form-item label="付款方式：">
            <Select v-model="companyFundAccount.payMethodValue" style="width: 100%;" transfer>
              <Option v-for="item in payMethodList" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span:12}">
          <Form-item label="转入日期：">
            {{companyFundAccount.transferInDate}}
          </Form-item>
        </Col>
        <Col :sm="{span:12}">
          <Form-item label="终止日期：">
            {{companyFundAccount.endDate}}
          </Form-item>
        </Col>
      </Row>
      <h3>绑定与解绑公司操作</h3>
      <Row>
        <Col :sm="{span: 24}">
          <Table border class="mt10" :columns="bindAndUnbindCompanyColumns" :data="bindAndUnbindCompany"></Table>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<script>
  export default {
    props: {
      companyFundAccountInfo: {
        type: Object
      },
      bindAndUnbindCompanyData: {
        type: Array
      }
    },
    data() {
      return {
        payMethodList: [
          {label: '我司付款, 账单到他司', value: 0},
          {label: '自己付款, 账单到我司', value: 1},
          {label: '自己付款, 账单到他司', value: 2},
          {label: '我司付款, 账单到我司', value: 3},
          {label: '垫付', value: 4},
        ],
        bindAndUnbindCompanyColumns: [
          {title: '公司编号', key: 'companyNumber', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.companyNumber),
              ]);
            }
          },
          {title: '公司名称', key: 'companyName', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.companyName),
              ]);
            }
          },
          {title: '绑定时间', key: 'bindDate', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.bindDate),
              ]);
            }
          },
          {title: '操作', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('Button', {
                  props: {
                    type: 'success',
                    shape: 'circle',
                    size: 'small',
                    icon: 'plus'
                  },
                  on: {
                    click: () => {
                      this.addRow(params);
                    }
                  }
                }),
                h('Button', {
                  props: {
                    type: 'error',
                    shape: 'circle',
                    size: 'small',
                    icon: 'minus'
                  },
                  style: {
                    marginLeft: '10px'
                  },
                  on: {
                    click: () => {
                      this.delRow(params);
                    }
                  }
                }),
              ]);
            }
          },
        ]
      }
    },
    methods: {
      addRow(params) {
        let row = {companyNumber: '', companyName: '', bindDate: ''};
        this.bindAndUnbindCompanyData.splice((params.index + 1), 0, row);
      },
      delRow(params) {
        this.bindAndUnbindCompanyData.splice(params.index, 1);
      }
    },
    computed: {
      companyFundAccount() {
        return this.companyFundAccountInfo;
      },
      bindAndUnbindCompany() {
        return this.bindAndUnbindCompanyData;
      }
    }
  }
</script>
