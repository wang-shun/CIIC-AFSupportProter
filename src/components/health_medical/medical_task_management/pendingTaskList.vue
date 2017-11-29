<template>
    <div class="pendingTaskList">
        <Collapse v-model="value1" accordion>
            <Panel name="1">
                <div slot="content">
                  <Form :label-width=150 ref="searchCondition" :model="searchCondition">
                    <Row type="flex" justify="start">
                      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                                <Form-item label="任务单状态">
                                    <Select placeholder="请选择">
                                        <Option value="1" v-for="item in taskStatus" :value="item.value" :key="item.value">{{item.label}}</Option>
                                    </Select>
                                </Form-item>
                      </Col>
                      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                                    <Form-item label="任务单类型">
                                    <Select placeholder="请选择">
                                         <Option value="1" v-for="item in taskType" :value="item.value" :key="item.value" >{{item.label}}</Option>
                                    </Select>
                                </Form-item>
                      </Col>
                      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                        <Form-item label="管理方编号">
                          <Input v-model="formItem.code" placeholder="请输入"></Input>
                        </Form-item>
                      </Col>
                      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                        <Form-item label="管理方名称">
                          <Input v-model="formItem.code" placeholder="请输入"></Input>
                        </Form-item>
                      </Col>
                      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                                    <Form-item label="雇员编号">
                                    <Input v-model="formItem.code" placeholder="请输入"></Input>
                                </Form-item>
                      </Col>
                      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                                    <Form-item label="雇员姓名">
                                    <Input v-model="formItem.code" placeholder="请输入"></Input>
                                </Form-item>
                        </Col>
                      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                                    <Form-item label="证件号码">
                                    <Input v-model="formItem.code" placeholder="请输入"></Input>
                                </Form-item>
                        </Col>
                      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                                    <Form-item label="公司编号">
                                    <Input v-model="formItem.code" placeholder="请输入"></Input>
                                </Form-item>
                      </Col>
                      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                                    <Form-item label="公司名称">
                                       <Input v-model="formItem.code" placeholder="请输入"></Input>
                                    </Form-item>
                      </Col>
                      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                      <Form-item label="保险开始日期">
                        <DatePicker type="daterange" placement="bottom" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
                      </Form-item>
                    </Col>
                      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                      <Form-item label="保险结束日期">
                        <DatePicker type="daterange" placement="bottom" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
                      </Form-item>
                     </Col>
                      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                      <Form-item label="保险公司">
                        <Select placeholder="请选择" transfer>
                          <Option value="1" v-for="item in taskStatuscom" :value="item.value" :key="item.value">{{item.label}} </Option>
                        </Select>
                      </Form-item>
                    </Col>
                    <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                      <Form-item label="保险项目" >
                        <Select  v-model="model10" multiple placeholder="请选择" transfer>
                          <Option value="1" v-for="item in taskTypeitem" :value="item.value" :key="item.value" >{{item.label}}</Option>
                        </Select>
                      </Form-item>
                    </Col>
                    <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                      <Form-item label="标的" >
                        <Select placeholder="请选择" style="width: 80px;" transfer>
                          <Option value="1" v-for="item in insureStatus1" :value="item.value" :key="item.value" >{{item.label}}</Option>
                        </Select>
                        <Input v-model="formItem.code" style="width: 90px;" placeholder="请输入"></Input>
                        <span class="expand-value">-</span>
                        <Input v-model="formItem.code" style="width: 90px;" placeholder="请输入"></Input>
                      </Form-item>
                    </Col>
                    </Row>
                    <Row>
                    <Col :sm="{span:24}" class="tr">
                       <Button type="primary" icon="ios-search" @click="selectresult">查询</Button>
                       <Button type="warning" @click="resetSearchCondition('searchCondition')" class="ml10">重置</Button>
                    </Col>
                  </Row>
                  </Form>
                </div>
            </Panel>
        </Collapse>
        <div class="create">
          <Row :gutter="18">
            <Col span="1">
                <Button type="primary" ref="rmb" @click="modal1 = true">审核</Button>
                <Modal
                  v-model="modal1"
                  title="审核对话框"
                  @on-ok="ok"
                  ok-text="审核通过"
                  @on-cancel="cancel"
                  cancel-text="批退">
                  <Input v-model="formItem.code" placeholder="请输入操作说明："></Input>
                </Modal>
            </Col>
            <Col span="1">
                <Button type="primary" @click="modal2 = true">暂缓</Button>
                <Modal
                v-model="modal2"
                title="暂缓对话框"
                @on-ok="delay"
                ok-text="暂缓"
                cancel-text="返回">
                <Input v-model="formItem.code" placeholder="请输入暂缓原因："></Input>
                </Modal>
            </Col>
            <Col span="1">
               <Button type="primary" @click="modal3 = true">恢复</Button>
               <Modal
              v-model="modal3"
              title="恢复对话框"
              @on-ok="recovery"
              ok-text="确认恢复"
              cancel-text="返回">
            </Modal>
            </Col>
            <Col span="2">
               <Button type="primary" @click="modal4 = true">同步至中盈</Button>
               <Modal
              v-model="modal4"
              title="同步至中盈对话框"
              @on-ok="ok"
              @on-cancel="cancel">
              <DatePicker type="date" style="width: 125px;"  placeholder="选择投保日期" ></DatePicker>
              <br>
              <br>
              <Select placeholder="选择保单">
                <Option value="1">补充医疗大保单</Option>
                <Option value="2">补充医疗弹性福利保单</Option>
                <Option value="3">补充医疗50%保单</Option>
              </Select>
            </Modal>
            </Col>
            <Col span="1">
               <Button type="primary" @click="modal10 = true">同步至中智</Button>
               <Modal
              v-model="modal10"
              title="同步至中智对话框"
              @on-ok="ok"
              @on-cancel="cancel">
              <DatePicker type="date" style="width: 125px;"  placeholder="选择投保日期" ></DatePicker>
              <br>
              <br>
              <Select placeholder="选择保险产品">
                <Option value="1">重大疾病</Option>
                <Option value="2">补充医疗险</Option>
                <Option value="3">环球医疗</Option>
              </Select>
            </Modal>
            </Col>
            <Col span="1">
            <Button type="primary" style="margin-left: 35px;" @click="modal5 = true">更新在保库</Button>
            <Modal
              v-model="modal5"
              title="更新在保库对话框"
              @on-ok="toubao"
              ok-text="确认更新"
              cancel-text="返回">
            </Modal>
            </Col>

            <Col span="1">
            <Button type="primary" style="margin-left: 70px;" @click="modal6 = true">失败处理</Button>
            <Modal
              v-model="modal6"
              title="失败处理对话框"
              @on-ok="toubao"
              ok-text="更新为待投保"
              cancel-text="批退">
            </Modal>
            </Col>

            <Col span="1">
            <Button type="info" style="margin-left: 135px;" @click="exportData(1)">导出</Button>
            </Col>
          </Row>
        </div>

        <Table width="2700" border :columns="columns7" :data="data6"></Table>
        <Page :total="100" show-sizer show-elevator></Page>
    </div>
</template>
<script>
   import expandRow from './editTaskDetail.vue';

    export default {
        data() {
            return {
              modal1: false,
              modal2: false,
              modal3: false,
              modal4: false,
              modal5: false,
              modal6: false,
              modal10: false,
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
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '投保项目',
                        sortable: true,
                        key: 'column1',
                        fixed: 'fixed'
                    },
                    {
                        title: '雇员编号',
                        sortable: true,
                        key: 'column4'
                    },
                    {
                        title: '雇员姓名',
                        sortable: true,
                        key: 'column5'
                    },
                    {
                        title: '合同开始时间',
                        sortable: true,
                        key: 'column30'
                    },
                    {
                        title: '公司编号',
                        sortable: true,
                        key: 'column6'
                    },
                    {
                        title: '公司名称',
                        sortable: true,
                        key: 'column21'
                    },
                    {
                        title: '客户经理',
                        sortable: true,
                        key: 'column7'
                    },
                    {
                        title: '保险对象',
                        sortable: true,
                        key: 'column8'
                    },
                    {
                        title: '性别',
                        sortable: true,
                        key: 'column8'
                    },
                    {
                        title: '出生日期',
                        sortable: true,
                        key: 'column8'
                    },
                    {
                        title: '证件号码',
                        sortable: true,
                        key: 'column9'
                    },
                    {
                        title: '投保费用',
                        sortable: true,
                        key: 'column10'
                    },
                    {
                        title: '标的',
                        sortable: true,
                        key: 'column11'
                    },
                    {
                        title: '关系',
                        sortable: true,
                        key: 'column12'
                    },
                  {
                    title: '中止日期',
                    sortable: true,
                    key: 'column12'
                  },
                  {
                    title: '保险开始日期',
                    sortable: true,
                    key: 'column12'
                  },
                  {
                    title: '保险结束日期',
                    sortable: true,
                    key: 'column12'
                  },
                  {
                    title: '提交人',
                    sortable: true,
                    key: 'column12'
                  },
                {
                  title: '提交时间',
                  sortable: true,
                  key: 'column12'
                },
                {
                  title: '操作',
                  key: 'action',
                  width: 70,
                  align: 'center',
                  render: (h, params) => {
                    return h('div', [
                      h('Button', {
                        props: {type: 'success', size: 'small'},
                        style: {margin: '0 auto'},
                        on: {
                          click: () => {
                            this.showInfo(params.index)
                          }
                        }
                      }, '查看'),
                    ]);
                  }
                }],
              data6: [
                    {
                        column1: '中智公司-意外伤害',
                        column2: '否',
                        column3: '投保',
                        column4:'11L2674',
                        column5: '戴敏',
                        column6: '27376',
                        column21: '瑞德丽邦基数咨询服务有限公司',
                        column7: '段嘉晨',
                        column8:'戴敏',
                        column9: '150203199211161220',
                        column10: '150',
                        column11: '20万'
                    },
                    {
                        column1: '中盈保险-补充医疗',
                        column2: '否',
                        column3: '投保',
                        column4:'11L2674',
                        column5: '戴敏',
                        column6: '27376',
                        column21: '瑞德丽邦基数咨询服务有限公司',
                        column7: '段嘉晨',
                        column8:'戴敏',
                        column9: '150203199211161220',
                        column10: '200',
                        column11: '40万'
                    }
                ],
              taskType: [
                    {
                        value: 'type0',
                        label: '全部'
                    },
                    {
                        value: 'type1',
                        label: '投保任务单'
                    },
                    {
                        value: 'type2',
                        label: '退保任务单'
                    },
                    {
                        value: 'type3',
                        label: '变更任务单'
                    }
                ],
              taskType: [
                {
                  value: 'type0',
                  label: '全部'
                },
                {
                  value: 'type1',
                  label: '投保任务单'
                },
                {
                  value: 'type2',
                  label: '退保任务单'
                },
                {
                  value: 'type3',
                  label: '变更任务单'
                }
              ],
              taskStatuscom:[
                {
                  value: 'type1',
                  label: '全部'
                },
                {
                  value: 'type2',
                  label: '中智'
                },
                {
                  value: 'type3',
                  label: '中国平安保险公司'
                }
              ],
              taskTypeitem:[
                {
                  value: 'type0',
                  label: '全部'
                },
                {
                  value: 'type1',
                  label: '意外伤害险'
                },
                {
                  value: 'type2',
                  label: '环球医疗'
                },
                {
                  value: 'type3',
                  label: '补充医疗'
                },
                {
                  value: 'type4',
                  label: '重大疾病险'
                }
              ],
              model10: [],
              taskStatus: [
                    {
                        value: 'status0',
                        label: '全部'
                    },
                    {
                        value: 'status1',
                        label: '待审核'
                    },
                    {
                        value: 'status2',
                        label: '已处理'
                    },
                    {
                        value: 'status3',
                        label: '已暂缓'
                    },
                    {
                        value: 'status4',
                        label: '处理失败'
                    },
                    {
                        value: 'status5',
                        label: '处理成功'
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

            ok () {
              this.$Message.info('已审核通过');
            },
            cancel () {
              this.$Message.info('已批退');
            },
          recovery () {
            this.$Message.info('已恢复');
          },
          toubao () {
            this.$Message.info('已投保');
          },
            selectresult(){
//            this.$refs.rmb.style.visibility='hidden';  隐藏按钮
            },
            delay () {
            this.$Message.info('已暂缓');
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
