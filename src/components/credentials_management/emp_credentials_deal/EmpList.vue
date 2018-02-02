<template>
  <div>
    <Collapse v-model="value1" accordion>
      <Panel name="1">
        <div slot="content">
          <Form ref="queryItem" :model="queryItem" :label-width="120"> 
            <Row type="flex" justify="start" prop="empCode">
              <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户编号：" prop="companyCode"> 
                  <Input v-model="queryItem.companyCode" placeholder="请输入"/>                                                           
                </Form-item> 
              </i-col>
              <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">                      
                <Form-item label="雇员编号：" prop="empCode">
                  <Input v-model="queryItem.empCode" placeholder="请输入"/>
                </Form-item>   
              </i-col>  
              <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">                                                                                   
                <Form-item label="雇员姓名：" prop="empName">
                  <Input v-model="queryItem.empName" placeholder="请输入"/>
                </Form-item>
              </i-col>
              <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">   
                <Form-item label="身份证号码：" prop="IDNum">
                  <Input v-model="queryItem.IDNum" placeholder="请输入"/>                               
                </Form-item>                           
              </i-col>
              <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="入离职状态：" prop="status">
                  <Select v-model="queryItem.status" placeholder="请选择" transfer>
                    <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </Form-item>    
              </i-col>
              <!-- <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">                                       
                <Form-item label="办理日期：" prop="dealTime">
                  <DatePicker type="date" v-model="queryItem.dealTime" placeholder="请输入" style="width: 57%" transfer/>
                </Form-item>                                                
              </i-col>
              <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">                                       
                <Form-item label="申报日期：" prop="applyTime">
                  <DatePicker type="date" v-model="queryItem.applyTime" placeholder="请输入" style="width: 57%" transfer/>
                </Form-item>                                                
              </i-col>
              <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">                                       
                <Form-item label="材料退回日期：" prop="materialBackTime">
                  <DatePicker type="date" v-model="queryItem.materialBackTime" placeholder="请输入" style="width: 57%" transfer/>
                </Form-item>                                                
              </i-col>                                       -->
            </Row>   
          </Form>  
          <Row type="flex" justify="start" class="tr">  
            <i-col :sm="{span: 24}">
              <Button type="primary" @click="query" class="ml10" icon="ios-search">查询</Button>
              <Button type="warning" @click="reset('queryItem')" class="ml10">重置</Button>
            </i-col>
          </Row>                               
        </div>           
      </Panel>
    </Collapse>

    <Row style="margin: 10px; 0px; 5px; 0px;">
      <i-col style="text-align: right">
        <Button type="primary" @click="add">新增雇员</Button>
      </i-col>
    </Row>

    <Table border :columns="colums1" :data="employeePage" ></Table>
    <Page :current="1" :total="100" show-total show-sizer show-elevator></Page>

    <Modal
      v-model="modal1"
      title="证件办理">
      <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="120"> 
        <Row type="flex" justify="start">
          <i-col span="12">
            <Form-item label="客户名称：" style="width:400px;">
             {{formItem.companyName}}
            </Form-item>    
          </i-col>
        </Row>
        <Row type="flex" justify="start">
          <i-col span="12">
            <Form-item label="雇员姓名：" style="width:400px;">
              {{formItem.empName}}
            </Form-item>    
          </i-col>
        </Row>
        <Row type="flex" justify="start">
          <i-col span="12">
            <Form-item label="证件类型：" style="width:400px;" prop="type">
              <Select v-model="formItem.type" placeholder="请选择" style="width:260px" :label-in-value="labelinvalue" transfer>
                <Option v-for="(value,key) in this.baseDic.credentialsType" :value="key" :key="key">{{ value }}</Option>
              </Select>
            </Form-item>    
          </i-col>
        </Row>
        <Row type="flex" justify="start">
           <i-col span="12">
            <Form-item label="证件办理类型：" style="width:400px;" prop="dealType" v-if="formItem.type === '1'">
              <Select v-model="formItem.dealType" placeholder="请选择" style="width:260px" :label-in-value="labelinvalue" transfer>
                <Option v-for="(value,key) in this.baseDic.scoreDealType" :value="key" :key="key">{{ value }}</Option>
              </Select>
            </Form-item>
            <Form-item label="证件办理类型：" style="width:400px;" prop="dealType" v-if="formItem.type === '2'">
              <Select v-model="formItem.dealType" placeholder="请选择" style="width:260px" :label-in-value="labelinvalue" transfer>
                <Option v-for="(value,key) in this.baseDic.BCardDealType" :value="key" :key="key">{{ value }}</Option>
              </Select>
            </Form-item>    
          </i-col> 
        </Row>
      </Form>
      <div slot="footer">
        <Row type="flex" justify="start" class="tr">  
          <i-col :sm="{span: 24}">
            <Button type="primary" @click="ok('formItem',formItem.data)" class="ml10">确定</Button>
            <Button type="warning" @click="modal1=false;" class="ml10">取消</Button>
          </i-col>
        </Row> 
      </div>
    </Modal>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import eventType from '../../../store/event_types'

  export default {
    data () {
      return {
        value1: '1',
        modal1: false,
        labelinvalue: true,
        queryItem: {
          empCode: '',
          empName: '',
          IDNum: '',
          status: '',
          companyCode: '',
          dealTime: '',
          applyTime: '',
          materialBackTime: ''
        },
        formItem: {
          companyName: '',
          companyCode: '',
          empName: '',
          empCode: '',
          type: '',
          dealType: '',
          data: ''
        },
        ruleValidate: {
          type: [{ required: true, message: '请选择证件类型', trigger: 'change' }],
          dealType: [{ required: true, message: '请选择证件办理类型', trigger: 'change' }]
        },
        statusList: [
          {
            value: '0',
            label: '在职'
          },
          {
            value: '1',
            label: '离职'
          }
        ],
        colums1: [
          {
            title: '雇员编号',
            key: 'empCode',
            sortable: true
          },
          {
            title: '雇员姓名',
            key: 'empName'
          },
          {
            title: '身份证号码',
            key: 'IDCardNum'
          },
          {
            title: '客户编号',
            key: 'companyCode',
            sortable: true
          },
          {
            title: '客户名称',
            key: 'companyName'
          },
          {
            title: '入离职状态',
            key: 'status'
          },
          {
            title: '操作',
            key: 'action',
            width: '200',
            align: 'center',
            render: (h, params) => {
              const renderDiv = []
              renderDiv.push(h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.formItem.data = {...params.row}
                    this.formItem.empName = params.row.empName
                    this.formItem.companyName = params.row.companyName
                    this.modal1 = true
                  }
                }
              }, '证件办理'))
            // if (params.row.isShow === 'true') {
              renderDiv.push(h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.lookInfo(params.row)
                  }
                }
              }, '编辑'))
            // }
              return h('div', renderDiv)
            }
          }
        ]
      }
    },
    mounted () {
    },
    created () {
      this.find()
    },
    computed: {
      ...mapGetters({
        employeePage: eventType.EMPLOYEE_PAGE_GET
      })
    },
    methods: {
      ...mapActions({
        getEmployeePage: eventType.EMPLOYEE_PAGE_SET
      }),
      find () {
        var param = {}
        this.getEmployeePage(param)
      },
      query () {},
      reset (value) {
        this.$refs[value].resetFields()
      },
      add () {
        this.$router.push({name: 'empAdd'})
      },
      lookInfo (v) {
        this.$router.push({
          name: 'empCredentialsTask', 
          params: {
            data: v,
            type: '',
            dealType: '', 
            isDeal: false
          }
        })
      },
      ok (value, data) {
        this.$refs[value].validate((valid) => {
          if (valid) {
            if (this.formItem.type === '1'){
              this.$router.push({
                name: 'empCredentialsTask', 
                params: {
                  data: data,
                  type: this.formItem.type,
                  typeN: this.$decode.sel_type(parseInt(this.formItem.type)),
                  dealType: this.formItem.dealType,
                  dealTypeN: this.$decode.deal_type1(parseInt(this.formItem.dealType)), 
                  companyId: data.companyCode,
                  isDeal: true
                }
              })
            }else{
              this.$router.push({
                name: 'empCredentialsTask', 
                params: {
                  data: data,
                  type: parseInt(this.formItem.type),
                  typeN: this.$decode.sel_type(parseInt(this.formItem.type)),
                  dealType: parseInt(this.formItem.dealType),
                  dealTypeN: this.$decode.deal_type2(parseInt(this.formItem.dealType)), 
                  companyId: data.companyCode,
                  isDeal: true
                }
              })
            }
            console.log("传过来的信息："+this.$route.params.data.empCode)
            this.modal1 = false
          } else {
            this.$Message.error('请选择办证类型!')
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
