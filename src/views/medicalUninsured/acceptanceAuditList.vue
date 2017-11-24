<template>
    <div class="acceptanceAuditList">
        <Collapse v-model="value1" accordion>
            <Panel name="1">
                <div slot="content">
                  <Row>
                    <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
                    <Form :model="formItem" :label-width="100">
                      <Form-item label="款项类型">
                        <Select  placeholder="请选择">
                          <Option v-for="item in dataTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                      </Form-item>
                    </Form>
                    </Col>
                    <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
                    <Form :model="formItem" :label-width="100">
                      <Form-item label="受理类型">
                        <Select  placeholder="请选择">
                          <Option v-for="item in peopleTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                      </Form-item>
                    </Form>
                    </Col>

                    <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
                    <Form :model="formItem" :label-width="100">
                      <Form-item label="审核">
                        <i-switch size="large">
                          <span slot="open">开</span>
                          <span slot="close">关</span>
                        </i-switch>
                      </Form-item>
                    </Form>
                    </Col>
                  </Row>
                  <Row>
                    <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
                    <Form :model="formItem" :label-width="100">
                      <Form-item label="管理方编号">
                        <Input v-model="formItem.code" placeholder="请输入"></Input>
                      </Form-item>
                    </Form>
                    </Col>
                    <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
                    <Form :model="formItem" :label-width="100">
                      <Form-item label="管理方名称">
                        <Input v-model="formItem.code" placeholder="请输入"></Input>
                      </Form-item>
                    </Form>
                    </Col>
                  </Row>
                  <Row>
                        <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
                            <Form :model="formItem" :label-width="100">
                                <Form-item label="雇员编号">
                                   <Input v-model="formItem.code" placeholder="请输入"></Input>
                                </Form-item>
                            </Form>
                        </Col>
                        <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                                <Form :model="formItem" :label-width="100">
                                    <Form-item label="雇员姓名">
                                    <Input v-model="formItem.code" placeholder="请输入"></Input>
                                </Form-item>
                            </Form>

                        </Col>
                        <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                                <Form :model="formItem" :label-width="100">
                                    <Form-item label="证件号码">
                                    <Input v-model="formItem.code" placeholder="请输入"></Input>
                                </Form-item>
                            </Form>

                        </Col>
                      <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                      <Form :model="formItem" :label-width="100">
                        <Form-item label="公司编号">
                          <Input v-model="formItem.code" placeholder="请输入"></Input>
                        </Form-item>
                      </Form>

                      </Col>
                        <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                                <Form :model="formItem" :label-width="100">
                                    <Form-item label="公司名称">
                                    <Input v-model="formItem.code" placeholder="请输入"></Input>
                                </Form-item>
                            </Form>

                        </Col>
                          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                                <Form :model="formItem" :label-width="100">
                                    <Form-item label="受理编号">
                                    <Input v-model="formItem.code" placeholder="请输入"></Input>
                                </Form-item>
                            </Form>
                        </Col>
                      <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                      <Form :model="formItem" :label-width="100">
                        <Form-item label="审核日期">
                          <DatePicker type="date" style="width: 130px;" placeholder="选择日期" ></DatePicker>
                          <span style="width: 5px;" >-</span>
                          <DatePicker type="date" style="width: 135px;"  placeholder="选择日期" ></DatePicker>
                        </Form-item>
                      </Form>
                      </Col>
                      <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                      <Form :model="formItem" :label-width="100">
                        <Form-item label="受理日期">
                          <DatePicker type="date" style="width: 130px;" placeholder="选择日期" ></DatePicker>
                          <span style="width: 5px;" >-</span>
                          <DatePicker type="date" style="width: 135px;"  placeholder="选择日期" ></DatePicker>
                        </Form-item>
                      </Form>
                      </Col>
                        <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 6 }" class="checkBtn">
                            <Button type="primary" size="large">查询</Button>
                        </Col>
                    </Row>
                </div>
            </Panel>
        </Collapse>
        <div class="create">

        </div>
        <Table border :columns="columns7" :data="data6"></Table>
        <Page :total="100" show-sizer show-elevator></Page>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                value1:'1',
                formItem: {
                    input: '',
                    select: '',
                    select1: '',
                    radio: 'male',
                    checkbox: [],
                    switch: true,
                    date: '',
                    time: '',
                    slider: [20, 50],
                    textarea: ''
                },
                columns7: [
                    {
                        title: '受理编号',
                        sortable: true,
                        key: 'acceptanceId'
                    },
                    {
                        title: '公司编号',
                        sortable: true,
                        key: 'companyId'
                    },
                  {
                    title: '公司名称',
                    sortable: true,
                    key: 'companyname'
                  },
                    {
                        title: '雇员编号',
                        sortable: true,
                        key: 'employeeId'
                    },
                    {
                        title: '雇员姓名',
                        sortable: true,
                        key: 'employeeName'
                    },
                    {
                        title: '类型',
                        sortable: true,
                        key: 'Type'
                    },
                    {
                        title: '款项类型',
                        sortable: true,
                        key: 'MoneyType'
                    },
                    {
                        title: '连带人',
                        sortable: true,
                        key: 'jointandseveralPeople'
                    },
                    {
                        title: '性别',
                        sortable: true,
                        key: 'gender'
                    },
//                    {
//                        title: '报销年月',
//                        sortable: true,
//                        key: 'reimbursementYearMonth'
//                    },
                    {
                        title: '报销金额',
                        sortable: true,
                        key: 'reimbursementMoney'
                    },
                     {
                        title: '审核人',
                        sortable: true,
                        key: 'handler'
                    },
                    {
                        title: '审核日期',
                        sortable: true,
                        key: 'handlerTime'
                    },
                    {
                        title: '付款记录',
                        sortable: true,
                        key: 'PayID'
                    },
                  {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                      return h('div', [
                        h('Button', {
                          props: {
                            type: 'primary',
                            size: 'small'
                          },
                          on: {
                            click: () => {
                              this.$router.push({
                                name:'auditAcceptance',
                                params:{
                                  data:params.row
                                }
                              });
                            }
                          }
                        }, '审核')
                      ]);
                    }
                  }
                ],
                data6: [
                    {
                        acceptanceId: '20160215072',
                        employeeId: '11L2674',
                        employeeName: '戴敏',
                        companyId:'13684',
                        companyname:'苹果科技公司',
                        Type: '子女',
                        MoneyType: '托费',
                        jointandseveralPeople: '段嘉晨',
                        gender:'女',
                        reimbursementYearMonth: '2016-02',
                        reimbursementMoney: '1500',
                        handler:'王正微',
                        handlerTime:'2016-02-15',
                        PayID:'1983865'
                    },
                    {
                        acceptanceId: '20160215072',
                        employeeId: '11L2674',
                        employeeName: '戴敏',
                        companyId:'13684',
                        companyname:'苹果科技公司',
                        Type: '子女',
                        MoneyType: '托费',
                        jointandseveralPeople: '段嘉晨',
                        gender:'女',
                        reimbursementYearMonth: '2016-02',
                        reimbursementMoney: '1500',
                        handler:'王正微',
                        handlerTime:'2016-02-15',
                        PayID:'1983865'
                    }
                ],
              peopleTypes: [
                {
                  value: '1',
                  label: '雇员'
                },
                {
                  value: '2',
                  label: '子女'
                },
                {
                  value: '3',
                  label: '配偶'
                }
              ],
              dataTypes:[
                {
                  value: '1num',
                  label: '医疗费'
                },
                {
                  value: '2',
                  label: '体检费用'
                },
                {
                  value: '3',
                  label: '住院补贴'
                },
//                {
//                  value: '4',
//                  label: '托费'
//                },
                {
                  value: '5',
                  label: '大额理赔款'
                },
                {
                  value: '6',
                  label: '其他'
                }
              ]

            }
        },
        methods: {
            show(index) {
                this.$Modal.info({
                    title: '用户信息',
                    content: `姓名：${this.data6[index].name}<br>年龄：${this.data6[index].age}<br>地址：${this.data6[index].address}`
                })
            },
            remove(index) {
                this.data6.splice(index, 1);
            }
        }
    }

</script>
<style scoped>
    .ivu-card {
        background: rgba(246, 246, 246, 1);
    }
    .checkBtn .ivu-btn{
        float: right;
    }
</style>
