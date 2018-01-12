<template>
  <div>
    <div class="smList">
      <Collapse v-model="collapseInfo">
        <Panel name="1">
          雇员信息
          <div slot="content">
            <Form :label-width="150">
              <Row justify="start">
                <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                  <Form-item label="雇员编号：">
                    {{employeeInfo.employeeNumber}}
                  </Form-item>
                </Col>
                <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                  <Form-item label="雇员姓名：">
                    {{employeeInfo.employeeName}}
                  </Form-item>
                </Col>
              </Row>
            </Form>
          </div>
        </Panel>
        <Panel name="2">
          材料使用
          <div slot="content">
            <Row class="mt20">
              <Col :sm="{span: 24}" class="tr">
                <Button type="primary">新增</Button>
                <Button type="error">删除</Button>
                <Button type="primary">提交</Button>
              </Col>
            </Row>
            <Table border :columns="matrialsUseColumns" :data="matrialsUseData" class="mt20"></Table>
          </div>
        </Panel>
        <Panel name="3">
          材料借出
          <div slot="content">
            <Row class="mt20">
              <Col :sm="{span: 24}" class="tr">
                <Button type="primary">新增</Button>
                <Button type="error">删除</Button>
                <Button type="primary">提交</Button>
              </Col>
            </Row>
            <Table border :columns="matrialsUseColumns" :data="matrialsUseData" class="mt20"></Table>
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
  export default {
    data() {
      return {
        collapseInfo: [1, 2, 3],
        employeeInfo: {
          employeeNumber: "10001",
          employeeName: "林子晖"
        },
        matrialsUseColumns: [
          {title: '使用材料', key: 'useMatrials', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('Select', [
                  h('Option', {props: {value: 0}}, '')
                ], params.row.useMatrials),
              ]);
            }
          },
          {title: '用途', key: 'useful', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('Select', [
                  h('Option', {props: {value: 0}}, '')
                ], params.row.useful),
              ]);
            }
          },
          {title: '使用材料人', key: 'matrialsUser', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.matrialsUser),
              ]);
            }
          },
          {title: '使用日期', key: 'useDate', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('DatePicker', {props: {value: params.row.useDate}}),
              ]);
            }
          },
          {title: '材料使用经办人', key: 'matrialsManager', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.matrialsManager),
              ]);
            }
          },
          {title: '备注', key: 'notes', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('Input', {props: {value: params.row.notes}}),
              ]);
            }
          },
        ],
        matrialsUseData: [
          {useMatrials: 0, useful: 0, matrialsUser: "", useDate: "", matrialsManager: "", notes: ""}
        ],

        matrialsBorrowColumns: [
          {title: '借出材料', key: 'borrowMatrials', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('Select', [
                  h('Option', {props: {value: 0}}, '')
                ], params.row.borrowMatrials),
              ]);
            }
          },
          {title: '用途', key: 'useful', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('Select', [
                  h('Option', {props: {value: 0}}, '')
                ], params.row.useful),
              ]);
            }
          },
          {title: '借出材料人', key: 'matrialsBorrower', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.matrialsBorrower),
              ]);
            }
          },
          {title: '使用日期', key: 'borrowDate', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('DatePicker', {props: {value: params.row.borrowDate}}),
              ]);
            }
          },
          {title: '借出经办人', key: 'borrowManager', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.borrowManager),
              ]);
            }
          },
          {title: '备注', key: 'notes', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('Input', {props: {value: params.row.notes}}),
              ]);
            }
          },
        ],
        matrialsBorrowData: [
          {borrowMatrials: 0, useful: 0, matrialsBorrower: "", borrowDate: "", borrowManager: "", notes: ""}
        ],
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      }
    }
  }
</script>
