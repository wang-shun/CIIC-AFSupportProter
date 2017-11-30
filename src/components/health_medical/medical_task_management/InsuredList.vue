<template>
    <div class="insuredList">
        <Collapse v-model="value1" accordion>
            <Panel name="1">
                <div slot="content">
                  <row>
                      <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
                      <Form :model="formItem" :label-width="100">
                        <Form-item label="保险公司">
                          <Select placeholder="请选择">
                            <Option value="1" v-for="item in insurecompany" :value="item.value" :key="item.value" >{{item.label}}</Option>
                          </Select>
                        </Form-item>
                      </Form>
                      </Col>
                      <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
                            <Form :model="formItem" :label-width="100">
                                <Form-item label="项目">
                                    <Select placeholder="请选择">
                                        <Option value="1" v-for="item in insureproject" :value="item.value" :key="item.value" >{{item.label}}</Option>
                                    </Select>
                                </Form-item>
                            </Form>
                      </Col>
                      <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
                      <Form :model="formItem" :label-width="100">
                        <Form-item label="状态">
                          <Select placeholder="请选择">
                            <Option value="1" v-for="item in insureStatus" :value="item.value" :key="item.value" >{{item.label}}</Option>
                          </Select>
                        </Form-item>
                      </Form>
                      </Col>
                    </row>
                  <row>
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
                      <Form-item label="证件号码">
                        <Input v-model="formItem.code" placeholder="请输入"></Input>
                      </Form-item>
                    </Form>
                    </Col>
                  </row>
                  <row>
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
                      <Form-item label="标的">
                        <Select placeholder="请选择" style="width: 80px;" >
                          <Option value="1" v-for="item in insureStatus1" :value="item.value" :key="item.value" >{{item.label}}</Option>
                        </Select>
                        <Input v-model="formItem.code" style="width: 90px;" placeholder="请输入"></Input>
                        <span class="expand-value">-</span>
                        <Input v-model="formItem.code" style="width: 90px;" placeholder="请输入"></Input>
                      </Form-item>
                      </Form>
                    </Col>
                    </row>
                  <row>
                    <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                    <Form :model="formItem" :label-width="100">
                      <Form-item label="投保日期">
                        <DatePicker type="date" placeholder="选择日期" style="width: 131px;"  ></DatePicker>
                        <span class="expand-value">-</span>
                        <DatePicker type="date" placeholder="选择日期" style="width: 131px;"  ></DatePicker>
                      </Form-item>
                    </Form>
                    </Col>
                    <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                    <Form :model="formItem" :label-width="100">
                      <Form-item label="退保日期">
                        <DatePicker type="date" placeholder="选择日期" style="width: 131px;"  ></DatePicker>
                        <span class="expand-value">-</span>
                        <DatePicker type="date" placeholder="选择日期" style="width: 131px;"  ></DatePicker>
                      </Form-item>
                    </Form>
                    </Col>
                        <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                            <Button type="primary" size="large">查询</Button>
                        </Col>
                    </Row>
                </div>
            </Panel>
        </Collapse>
        <div class="create">
           <Button type="primary"  @click="exportData(1)"><Icon type="ios-download-outline"></Icon> 导出数据</Button>
        </div>
        <Table border :columns="columns7" :data="data6" ref="table"></Table>
        <Page :total="100" show-sizer show-elevator></Page>
    </div>
</template>
<script>
    import expandRow from './ExpandRow.vue';
    export default {
        data() {
            return {
                modal1: false,
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
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            return h(expandRow, {
                                props: {
                                    row: params.row
                                }
                            })
                        }
                    },
                    {
                        title: '险种名称',
                        sortable: true,
                        key: 'column1'
                    },
                    {
                        title: '雇员编号',
                        sortable: true,
                        key: 'column2'
                    },
                    {
                        title: '雇员姓名',
                        sortable: true,
                        key: 'column3'
                    },
                    {
                        title: '是否在保',
                        sortable: true,
                        key: 'column4'
                    }
                ],
                data6: [
                    {
                        column1: '家庭财产险',
                        column2: '11L2674',
                        column3: '戴敏',
                        column4:'在保'
                    },
                    {
                        column1: '二十种重大疾病保险',
                        column2: '11L2674',
                        column3: '戴敏',
                        column4:'在保'
                    }
                ],
                insureproject:[
                    {
                        label:'全部',
                        value:'p0'
                    },
                    {
                        label:'家庭财产险',
                        value:'p1'
                    },
                    {
                        label:'二十种重大疾病险',
                        value:'p2'
                    },
                    {
                        label:'补充医疗险',
                        value:'p3'
                    },

                ],
                insureStatus:[
                {
                  label:'全部',
                  value:'p1'
                },
                {
                  label:'在保',
                  value:'p2'
                },
                  {
                    label:'退保',
                    value:'p2'
                  }
              ],
              insureStatus1:[
                {
                  label:'区间',
                  value:'p1'
                },
                {
                  label:'比例',
                  value:'p2'
                }
              ],
                insurecompany:[
                {
                  label:'全部',
                  value:'p0'
                },
                {
                  label:'中智',
                  value:'p1'
                },
                {
                  label:'中国平安保险',
                  value:'p2'
                },
                {
                  label:'中国大地保险',
                  value:'p3'
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
            },
          // 导出csv
          exportData (type) {
            if (type === 1) {
              this.$refs.table.exportCsv({
                filename: '原始数据'
              });
            } else if (type === 2) {
              this.$refs.table.exportCsv({
                filename: '排序和过滤后的数据',
                original: false
              });
            } else if (type === 3) {
              this.$refs.table.exportCsv({
                filename: '自定义数据',
                columns: this.columns7.filter((col, index) => index < 4),
                data: this.data6.filter((data, index) => index < 4)
              });
            }
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
