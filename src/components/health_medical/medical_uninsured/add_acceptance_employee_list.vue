<template>
    <div class="addAcceptanceEmployeeList">
        <Collapse v-model="value1" accordion>
            <Panel name="1">
                <div slot="content">
                    <Row>
                         <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
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
                                    <Form-item label="证件号码">
                                    <Input v-model="formItem.code" placeholder="请输入"></Input>
                                </Form-item>
                            </Form>

                        </Col>
                        <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                                <Form :model="formItem" :label-width="100">
                                    <Form-item label="连带人">
                                    <Input v-model="formItem.code" placeholder="请输入"></Input>
                                </Form-item>
                            </Form>

                        </Col>
                    </Row>
                </div>
            </Panel>
        </Collapse>
        <div class="create">
          <router-link to="/acceptanceList">
            <Button type="primary">返回受理单列表</Button>
          </router-link>
         <row>
          <Col >
          <Form :model="formItem" :label-width="100">
            <Form-item label="">
              <Table width="1000" offset="8" :columns="columns7" :data="data6"></Table>
              <Page :total="100" show-sizer show-elevator  l></Page>


             </Form-item>
           </Form>
          </Col>

          </Row>

        </div>

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
                        title: '是否中止',
                        sortable: true,
                        key: 'IsLeave'
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
                        title: '公司编号',
                        sortable: true,
                        key: 'companyId'
                    },
                  {
                    title: '公司名称',
                    sortable: true,
                    key: 'companyName'
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
                                                name:'addAcceptance',
                                                params:{
                                                    data:params.row
                                                }
                                            });
                                        }
                                    }
                                }, '新增受理')
                            ]);
                     }
                    }
                ],
                data6: [
                    {
                        IsLeave:'是',
                        employeeId: '11L2674',
                        employeeName: '戴敏',
                        companyId:'13684',
                        companyName:'苹果公司'

                    },
                    {
                        IsLeave:'是',
                        employeeId: '11L2674',
                        employeeName: '戴敏',
                        companyId:'13684',
                        companyName:'苹果公司'
                    }
                ],
                money:[
                    {
                        label:'人民币-CNY',
                        value:'CNY'
                    },
                    {
                        label:'美元-USD',
                        value:'USD'
                    },
                    {
                        label:'欧元-EUR',
                        value:'EUR'
                    },
                    {
                        label:'日元-JPY',
                        value:'JPY'
                    },
                    {
                        label:'港币-HKD',
                        value:'HKD'
                    },
                    {
                        label:'加拿大元-CAD',
                        value:'CAD'
                    },
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
