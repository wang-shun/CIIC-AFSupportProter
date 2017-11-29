
<template>
    <div class="supplementaryMedicalList">
        <Collapse v-model="value1">
            <Panel name="1">
              <div slot="content">
                  <row>
                    <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
                    <Form :model="formItem" :label-width="100">
                      <Form-item label="状态">
                        <Select placeholder="请选择">
                          <Option value="1" v-for="item in taskStatus" :value="item.value" :key="item.value">{{item.label}}</Option>
                        </Select>
                      </Form-item>
                    </Form>
                    </i-col>
                    <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
                    <Form :model="formItem" :label-width="100">
                      <Form-item label="分类">
                        <Select placeholder="请选择">
                          <Option value="1" v-for="item in category" :value="item.value" :key="item.value">{{item.label}}</Option>
                        </Select>
                      </Form-item>
                    </Form>
                    </i-col>
                  </row>
                  <row>
                  <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
                     <Form :model="formItem" :label-width="100">
                    <Form-item label="管理方编号">
                      <Input v-model="formItem.code" placeholder="请输入"></Input>
                    </Form-item>
                  </Form>
                  </i-col>
                  <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                     <Form :model="formItem" :label-width="100">
                    <Form-item label="管理方名称">
                      <Input v-model="formItem.code" placeholder="请输入"></Input>
                    </Form-item>
                  </Form>
                  </i-col>
                  </row>
                  <row>
                        <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
                            <Form :model="formItem" :label-width="100">
                                <Form-item label="连带人">
                                   <Input v-model="formItem.code" placeholder="请输入"></Input>
                                </Form-item>
                            </Form>
                        </i-col>
                        <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                                <Form :model="formItem" :label-width="100">
                                    <Form-item label="雇员编号">
                                    <Input v-model="formItem.code" placeholder="请输入"></Input>
                                </Form-item>
                            </Form>

                        </i-col>
                        <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                                <Form :model="formItem" :label-width="100">
                                    <Form-item label="雇员姓名">
                                    <Input v-model="formItem.code" placeholder="请输入"></Input>
                                </Form-item>
                            </Form>
                        </i-col>
                      </row>
                  <row>
                        <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                                <Form :model="formItem" :label-width="100">
                                    <Form-item label="案卷号">
                                    <Input v-model="formItem.code" placeholder="请输入"></Input>
                                </Form-item>
                            </Form>

                        </i-col>
                        <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                                <Form :model="formItem" :label-width="100">
                                    <Form-item label="公司编号">
                                    <Input v-model="formItem.code" placeholder="请输入"></Input>
                                </Form-item>
                            </Form>

                        </i-col>
                       <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                                <Form :model="formItem" :label-width="100">
                                    <Form-item label="公司名称">
                                    <Input v-model="formItem.code" placeholder="请输入"></Input>
                                </Form-item>
                            </Form>
                        </i-col>
                     </row>
                  <row>
                    <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                    <Form :model="formItem" :label-width="100">
                      <Form-item label="付款日期">
                        <DatePicker type="date" style="width: 130px;" placeholder="选择日期" ></DatePicker>
                        <span style="width: 5px;" >-</span>
                        <DatePicker type="date" style="width: 135px;"  placeholder="选择日期" ></DatePicker>
                      </Form-item>
                    </Form>
                    </i-col>
                  <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                  <Form :model="formItem" :label-width="100">
                    <Form-item label="保单号">
                      <Input v-model="formItem.code" placeholder="请输入"></Input>
                    </Form-item>
                  </Form>
                  </i-col>
                    <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                    <Form :model="formItem" :label-width="100">
                      <Form-item label="受理编号">
                        <Input v-model="formItem.code" placeholder="请输入"></Input>
                      </Form-item>
                    </Form>
                    </i-col>
                  </row>
                  <row>
                    <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                    <Form :model="formItem" :label-width="100">
                      <Form-item label="导入日期">
                        <DatePicker type="date" style="width: 130px;" placeholder="选择日期" ></DatePicker>
                        <span style="width: 5px;" >-</span>
                        <DatePicker type="date" style="width: 135px;"  placeholder="选择日期" ></DatePicker>
                      </Form-item>
                    </Form>
                    </i-col>
                    <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                    <Form :model="formItem" :label-width="100">
                      <Form-item label="审核日期">
                        <DatePicker type="date" style="width: 130px;" placeholder="选择日期" ></DatePicker>
                        <span style="width: 5px;" >-</span>
                        <DatePicker type="date" style="width: 135px;"  placeholder="选择日期" ></DatePicker>
                      </Form-item>
                    </Form>
                    </i-col>
                    <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                    <Form :model="formItem" :label-width="100">
                      <Form-item label="">

                      </Form-item>
                    </Form>
                    </i-col>
                    <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                    <Form :model="formItem" :label-width="100">
                      <Form-item label="">
                        <Button type="primary" size="large">查询</Button>
                      </Form-item>
                    </Form>
                    </i-col>
                  </row>
              </div>
            </Panel>
        </Collapse>
        <Collapse v-model="value2">
            <Panel name="2">
            <div slot="content">
              <row>
                <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 4, offset: 0 }" class="checkBtn">
                <Form :model="formItem" :label-width="100">
                  <Form-item label="记录总数：">
                    <span class="expand-value">2行</span>
                  </Form-item>
                </Form>
                </i-col>
                <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 4, offset: 0 }" class="checkBtn">
                <Form :model="formItem" :label-width="120">
                  <Form-item label="公司理赔金额总计：">
                    <span class="expand-value">180</span>
                  </Form-item>
                </Form>
                </i-col>
                <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 4, offset: 0 }" class="checkBtn">
                <Form :model="formItem" :label-width="150">
                  <Form-item label="保险公司理赔金额总计：">
                    <span class="expand-value">200</span>
                  </Form-item>
                </Form>
                </i-col>
                <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 4, offset: 0 }" class="checkBtn">
                <Form :model="formItem" :label-width="100">
                  <Form-item label="发票张数：">
                    <span class="expand-value">200</span>
                  </Form-item>
                </Form>
                </i-col>
              </row>
              <row>
                <i-col span="2" style="margin-left: 30px;">
                   <Button type="primary" ref="rmb" @click="modal1 = true">审核通过</Button>
                   <Modal
                  v-model="modal1"
                  title="审核操作对话框"
                  @on-ok="ok" >
                  <Input v-model="formItem.code" placeholder="备注："></Input>
                </Modal>
                </i-col>
                <i-col span="17">
                   <Button type="primary" ref="rmb" @click="modal1 = true">批退</Button>
                   <Modal
                  v-model="modal1"
                  title="批退操作对话框"
                  @on-ok="ok" >
                  <Input v-model="formItem.code" placeholder="备注："></Input>
                </Modal>
                </i-col>
                <i-col span="1">
                   <Button type="primary"  @click="exportData(1)"><Icon type="ios-download-outline"></Icon> 导出数据</Button>
                </i-col >
              </row>
            </div>
            </Panel>
        </Collapse>
        <Table border :columns="columns7" :data="data6" ref="table"></Table>
        <Page :total="100" show-sizer show-elevator></Page>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              modal1:false,
                value1:'1',
                value2:'2',
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
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '受理编号',
                        sortable: true,
                        key: 'acceptanceId'
                    },
                    {
                        title: '案卷号',
                        sortable: true,
                        key: 'employeeId'
                    },
                    {
                        title: '导入日期',
                        sortable: true,
                        key: 'employeeName'
                    },
                    {
                        title: '雇员编号',
                        sortable: true,
                        key: 'companyId'
                    },
                    {
                        title: '雇员姓名',
                        sortable: true,
                        key: 'Type'
                    },
                    {
                        title: '公司编号',
                        sortable: true,
                        key: 'MoneyType'
                    },
                    {
                        title: '公司名称',
                        sortable: true,
                        key: 'jointandseveralPeople'
                    },
                    {
                        title: '状态',
                        sortable: true,
                        key: 'status'
                    },
                    {
                        title: '处理日期',
                        sortable: true,
                        key: 'handletime'
                    },
                    {
                        title: '发票合计',
                        sortable: true,
                        key: 'acceptancePeople'
                    },
                    {
                        title: '公司理赔金额',
                        sortable: true,
                        key: 'acceptanceDate'
                    },
                    {
                        title: '保险公司理赔金额',
                        sortable: true,
                        key: 'acceptanceMoney'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 240,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                    marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                                this.$Modal.info({
                                     title: '补充医疗理赔受理',
                                     content: `审核通过`
                                            });
                                        }
                                    }
                                }, '审核通过'),
                              h('Button', {
                                props: {
                                  type: 'primary',
                                  size: 'small'
                                },
                                style: {
                                  marginRight: '5px'
                                },
                                on: {
                                  click: () => {
                                    this.$Modal.info({
                                      title: '补充医疗理赔受理',
                                      content: `审核通过`
                                    });
                                  }
                                }
                              }, '批退'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                  on: {
                                    click: () => {
                                      this.$router.push({
                                        name:'invoiceList',
                                        params:{
                                          data:params.row
                                        }
                                      });
                                    }
                                  }
                                }, '发票明细')
                            ]);
                    }
                  }
                ],
                data6: [
                    {
                        acceptanceId: '20151218583',
                        employeeId: 'CIICYBQ20160126002',
                        employeeName: '2016-01-06',
                        companyId:'15C2446',
                        Type: '段嘉晨',
                        MoneyType: '13684',
                        jointandseveralPeople: '基伊埃热有限公司',
                        status:'未审核',
                        handletime:'',
                        acceptancePeople:'3',
                        acceptanceDate: '300',
                        acceptanceMoney: '150'
                    },
                    {
                        acceptanceId: '20151218584',
                        employeeId: 'CIICYBQ20160126002',
                        employeeName: '2016-01-06',
                        companyId:'15C2446',
                        Type: '段嘉晨',
                        MoneyType: '13684',
                        jointandseveralPeople: '基伊埃热有限公司',
                        status:'已审核',
                        handletime:'2017-09-17',
                        acceptancePeople:'3',
                        acceptanceDate: '300',
                        acceptanceMoney: '150'
                    }
                ],
                taskStatus: [
                {
                  value: 'status3',
                  label: '全部'
                },
                {
                  value: 'status0',
                  label: '未审核'
                },
                {
                  value: 'status1',
                  label: '已审核未付'
                },
                {
                  value: 'status2',
                  label: '已审核已付'
                },
                {
                    value: 'status4',
                    label: '已批退'
                }
              ],
                category: [
                {
                  value: 'status3',
                  label: '全部'
                },
                {
                  value: 'status4',
                  label: '补充医疗'
                },
                {
                  value: 'status0',
                  label: '保前保后'
                },
                {
                  value: 'status1',
                  label: '特需'
                },
                {
                  value: 'status2',
                  label: '本部特需'
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
