<template>
  <div>
    <Collapse v-model="value1" accordion>
      <Panel name="1">
        <div slot="content">
          <Form ref="queryItem" :model="queryItem" :label-width="120"> 
            <Row type="flex" justify="start">
              <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="证件类型" prop="type">
                  <Select v-model="queryItem.type" placeholder="请选择" transfer>
                    <Option v-for="(value,key) in this.baseDic.credentialsType" :value="value" :key="key">{{ value }}</Option>
                  </Select>
                </Form-item>    
              </i-col>
              <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="办理机构：" prop="name">
                  <Select v-model="queryItem.name" placeholder="请选择" transfer>
                    <Option v-for="(value,key) in this.baseDic.DealOrg" :value="value" :key="key">{{ value }}</Option>
                  </Select>
                </Form-item>     
              </i-col>                            
            </Row>   
            <Row type="flex" justify="start" class="tr">  
              <i-col :sm="{span: 24}">
                <Button type="primary" @click="query" class="ml10" icon="ios-search">查询</Button>
                <Button type="warning" @click="$refs['queryItem'].resetFields();" class="ml10">重置</Button>
              </i-col>
            </Row>                                  
          </Form>                                 
        </div>           
      </Panel>
    </Collapse>

    <div class="create">
       <div style="display:inline-block">
        <Button type="primary" @click="add">新增政策</Button>
      </div>
    </div>

    <Table border :columns="colums1" :data="orgPolicyPage" ></Table>
    <Page :current="1" :total="100" show-total show-sizer show-elevator></Page>

    <Modal
      v-model="modal1"
      title="办理机构政策">
      <Form ref="policyForm" :model="formItem" :rules="ruleValidate" :label-width="120"> 
        <Row type="flex" justify="start">
          <i-col span="12">
            <Form-item label="证件类型：" style="width:400px;" prop="type">
              <Select v-model="formItem.type" placeholder="请选择" style="width:260px" transfer>
                <Option v-for="(value,key) in this.baseDic.credentialsType" :value="value" :key="key">{{ value }}</Option>
              </Select>
            </Form-item>    
          </i-col>
        </Row>
        <Row type="flex" justify="start">
           <i-col span="12">
            <Form-item label="办理机构：" style="width:400px;" prop="name">
              <Select v-model="formItem.name" placeholder="请选择" style="width:260px" transfer>
                <Option v-for="(value,key) in this.baseDic.DealOrg" :value="value" :key="key">{{ value }}</Option>
              </Select>
            </Form-item>    
          </i-col> 
        </Row>
        <Row type="flex" justify="start">
           <i-col span="12">
            <Form-item label="政策内容：" style="width:400px;" prop="policyDescription">
              <Input v-model="formItem.policyDescription" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="请输入" style="width:260px" />
            </Form-item>    
          </i-col> 
        </Row>
      </Form>
      <div slot="footer">
        <Row type="flex" justify="start" class="tr">  
          <i-col :sm="{span: 24}">
            <Button type="primary" @click="ok('policyForm')" class="ml10">确定</Button>
            <Button type="warning" @click="modal1 = false" class="ml10">取消</Button>
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
      queryItem: {
        type: '',
        name: ''
      },
      formItem: {
        type: '',
        name: '',
        policyDescription: ''
      },
      policyForm: {
        type: '',
        name: '',
        policyDescription: ''
      },
      ruleValidate: {
        type: [{ required: true, message: '请选择证件类型', trigger: 'change' }],
        name: [{ required: true, message: '请选择办理机构', trigger: 'change' }],
        policyDescription: [{ required: true, message: '政策内容不能为空', trigger: 'change' }]
      },
      colums1: [
        {
          title: '办理机构',
          key: 'name',
          sortable: true
        },
        {
          title: '证件类型',
          key: 'type'
        },
        {
          title: '创建人',
          key: 'createdBy'
        },
        {
          title: '创建日期',
          key: 'createdTime',
          sortable: true
        },
        {
          title: '政策内容',
          width: '400',
          key: 'policyDescription',
          ellipsis: true
        },
        {
          title: '操作',
          key: 'action',
          width: '150',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.formItem.name = params.row.name
                    this.formItem.type = params.row.type
                    this.formItem.policyDescription = params.row.policyDescription
                    this.modal1 = true
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: '警告',
                      content: '您真的要删除吗？',
                      okText: '删除',
                      onOk: () => {
                      }
                    })
                  }
                }
              }, '删除')
            ])
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
      orgPolicyPage: eventType.ORG_POLICY_PAGE_GET
    })
  },
  methods: {
    ...mapActions({
      getorgPolicyPage: eventType.ORG_POLICY_PAGE_SET
    }),
    find () {
      var param = {}
      this.getorgPolicyPage(param)
    },
    add () {
      this.$refs['policyForm'].resetFields()
      this.modal1 = true
    },
    query () {},
    reset () {},
    ok (value) {
      this.$refs[value].validate((valid) => {
        if (valid) {
          this.$Message.success('保存成功!')
          this.modal1 = false
        } else {
          this.$Message.error('保存失败!')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
