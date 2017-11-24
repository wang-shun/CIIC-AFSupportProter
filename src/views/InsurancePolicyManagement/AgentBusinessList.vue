<template>
    <div class="AgentBusinessList">
        <Collapse v-model="value1" accordion>
            <Panel name="1">
                <div slot="content">
                    <Row>
                      <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
                      <Form :model="formItem" :label-width="100">
                        <Form-item label="保险公司">
                          <Select placeholder="选择保险公司">
                            <Option value="0">全部</Option>
                            <Option value="1">中国人民财产保险股份有限公司苏州市分公司</Option>
                            <Option value="2">平安养老保险股份有限公司上海分公司</Option>
                            <Option value="3">中国平安财产保险股份有限公司上海分公司</Option>
                          </Select>
                        </Form-item>
                      </Form>
                      </Col>
                      <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                          <Form :model="formItem" :label-width="100">
                            <Form-item label="保单名称">
                                <Select placeholder="选择保单">
                                   <Option value="0">全部</Option>
                                   <Option value="1">惠氏公司商业保险保费</Option>
                                   <Option value="2">爱茉莉公司-平安团体险保单</Option>
                                   <Option value="3">伊顿公司实习生意外险保费</Option>
                                </Select>
                            </Form-item>
                          </Form>
                      </Col>
                      <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 20, offset: 0 }" class="checkBtn">
                      <router-link to="/AddAgentBusiness">
                        <Button type="primary">
                          新增代收代付
                        </Button>
                      </router-link>
                      </Col>
                    </Row>
                </div>
            </Panel>
        </Collapse>
        <br>
        <Table border :columns="columns7" :data="data6"></Table>

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
                        title: '保险公司',
                        sortable: true,
                        key: 'column1'
                    },
                    {
                        title: '保单名称',
                        sortable: true,
                        key: 'column2'
                    },
                    {
                        title: '保单开始日期',
                        sortable: true,
                        key: 'column3'
                    },
                    {
                        title: '保单结束日期',
                        sortable: true,
                        key: 'column4'
                    },
                    {
                        title: '缴费周期',
                        sortable: true,
                        key: 'column6'
                    },
                    {
                        title: '最新缴费年月',
                        sortable: true,
                        key: 'column5'
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
                                name:'AgentBusinessBatchList',
                                params:{
                                  data:params.row
                                }
                              });
                            }
                          }
                        }, '查看')
                      ]);
                    }
                  }
                ],
                data6: [
                  {
                    column1: '中国人民财产保险股份有限公司苏州市分公司',
                    column2: '平安财产指定商业保险保费',
                    column3: '2016-01-01',
                    column4:'2016-12-31',
                    column5:'201708',
                    column6: '月缴'
                  },
                  {
                    column1: '平安养老保险股份有限公司上海分公司',
                    column2: '惠氏公司商业保险保费',
                    column3: '2016-01-01',
                    column4:'2016-12-31',
                    column5:'201709',
                    column6: '月缴'
                  },
                  {
                    column1: '平安养老保险股份有限公司上海分公司',
                    column2: '爱茉莉公司-平安团体险保单',
                    column3: '2016-01-01',
                    column4:'2016-12-31',
                    column5:'201708',
                    column6: '月缴'
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
