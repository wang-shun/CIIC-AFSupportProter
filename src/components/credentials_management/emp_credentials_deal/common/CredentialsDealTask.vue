<template>
  <div>
    <Table border :columns="colums1" :data="data1" highlight-row="true" @on-row-click="clickRow"></Table>
    <Card>
       <Form ref="formItem" :model="formItem"  :label-width="120">
        <h4>办理与收费信息</h4>
        <Row type="flex" justify="start">
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="办理机构：" prop="name">
              {{formItem.name}}
            </Form-item> 
          </i-col>
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="操作方式：" prop="operateType">
              {{formItem.operateType}}
            </Form-item> 
          </i-col>
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="支付方式：" prop="payType">
              {{formItem.payType}}
            </Form-item> 
          </i-col>
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="操作账号：" prop="operateAccount">
              {{formItem.operateAccount}}
            </Form-item> 
          </i-col>
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="操作密码：" prop="operatePwd">
              {{formItem.operatePwd}}
            </Form-item> 
          </i-col>
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="费用类型：" prop="chargeType">
              {{formItem.chargeType}}
            </Form-item> 
          </i-col>
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="特殊收费备注：" prop="specialChargeRemark" v-if="formItem.chargeType === '特殊收费'">
              {{formItem.specialChargeRemark}}
            </Form-item> 
          </i-col>
        </Row>
        <h4>留存材料信息</h4>
        <Row type="flex" justify="start">
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item >
              <Checkbox v-model="formItem.introduceMail" disabled>介绍信</Checkbox>
            </Form-item>
          </i-col>
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item >
              <Checkbox v-model="formItem.onlineContactIdCard">网上联系人身份证复印件</Checkbox>
            </Form-item>
          </i-col>
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item >
              <Checkbox v-model="formItem.onlineContactIsSecretariat">网上联系人是否秘书台人员</Checkbox>
            </Form-item>
          </i-col>
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="网上联系人：">
              <Input v-model="formItem.onlineContact" placeholder="请输入"/>
            </Form-item>
          </i-col>
        </Row>
        <Row type="flex" justify="start">
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item >
              <Checkbox v-model="formItem.businessLicence">营业执照复印件或三证合一复印件</Checkbox>
            </Form-item>
          </i-col>
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item >
              <Checkbox v-model="formItem.organizationCode">机构代码证复印件</Checkbox>
            </Form-item>
          </i-col>
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item >
              <Checkbox v-model="formItem.foreignBusinessApprovalCertificate">外商企业批准证书复印件</Checkbox>
            </Form-item>
          </i-col>
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item >
              <Checkbox v-model="formItem.businessRenameNotice">工商局企业更名通知复印件</Checkbox>
            </Form-item>
          </i-col>
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="特殊情况备注：">
              <Input v-model="formItem.specialMaterialRemark" placeholder="请输入" type="textarea"/>
            </Form-item>
          </i-col>
        </Row>
        <CredentialsMaterial></CredentialsMaterial>
       </Form>
    </Card>
    <Modal v-model="taskFollow" title="任务跟进" @on-ok="ok" @on-cancel="cancel">
      <Form ref="formItem" :model="formItem"  :label-width="120">
        <Row >
          <i-col span="12">
            <Form-item label="跟进说明：" prop="name"  style="width:400px;">
              <Input v-model="formItem.followDescription" placeholder="请输入" type="textarea" :autosize="{minRows: 2,maxRows: 5}"/>
            </Form-item> 
          </i-col>
        </Row>
      </Form>
      <h3>跟进历史</h3>
      <Table border :colums="formItem.columns2" :data="formItem.data2"></Table>
    </Modal>
  </div>
</template>

<script>
  import CredentialsMaterial from './CredentialsMaterial'
  import axios from 'axios'
  import Tools from '../../../../lib/tools'
  import Decode from '../../../../lib/decode'

  const host = process.env.SITE_HOST
  export default {
    components: {CredentialsMaterial},
    props: {
      fundInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data () {
      return {
        taskFollow: false,
        formItem: {
          name: '',
          operateType: '',
          operateAccount: '',
          operatePwd: '',
          chargeType: '',
          payType: '',
          specialChargeRemark: '',
          introduceMail: '',
          onlineContactIdCard: '',
          onlineContactIsSecretariat: '',
          onlineContact: '',
          businessLicence: '',
          organizationCode: '',
          foreignBusinessApprovalCertificate: '',
          businessRenameNotice: '',
          specialMaterialRemark: '',
          followDescription:'',
          taskId: ''
        },
        colums1: [
          {
            title: '雇员编号',
            key: 'empCode'
          },
          {
            title: '雇员姓名',
            key: 'empName'
          },
          {
            title: '客户编号',
            key: 'companyCode'
          },
          {
            title: '客户名称',
            key: 'companyName'
          },
          {
            title: '证件类型',
            key: 'type'
          },
          {
            title: '证件办理类型',
            key: 'dealType'
          },
          {
            title: '经办人',
            key: 'modifiedBy'
          },
          {
            title: '办理时间',
            key: 'modifiedTime'
          },
          {
            title: '操作',
            key: 'action',
            width: '200',
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
                      
                    }
                  }
                }, '查看'),
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
                      
                    }
                  }
                }, '编辑'),
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
                      this.taskFollowShow(params.row.taskId);
                     
                    }
                  }
                }, '跟进')
              ])
            }
          }
        ],
        data1: [{}],
        formItem: {
          columns2: [
            {
              title: '跟进人',
              key: 'createdBy'
            },
            {
              title: '跟进时间',
              key: 'createdTime'
            },
            {
              title: '跟进说明',
              key: 'followDescription'
            }
          ],
          data2: [{}]
        }
      }
    },
    mounted () {
    },
    created () {
    },
    computed: {
      fund() {
        return this.fundInfo
      }
    },
    methods: {
      save () {},
      back () {
        this.$router.go(-1)
      },
      clickRow (value) {
        if (value !== null) {
          console.log(value)
          this.formItem = value
        }
      },
      taskFollowShow(taskId) {
        // if( taskId!== "") {
           axios.get(host + '/api/empCredentialsDeal/find/taskFollow/1').then((response) =>{
             if (response.data.errCode == "0"){
               this.formItem.data2 = response.data.data
               this.taskFollow = true
             } else {
              this.$Notice.error({
                title: '查询失败',
                desc: ''
              })
            }
          }).catch((error) => {
            this.$Notice.error({
              title: '查询失败',
              desc: ''
            })
          })
        // }
      },
      ok () {},
      cancle() {}
    }
  }
</script>

<style scoped>

</style>
