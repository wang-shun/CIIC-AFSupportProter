<template>
  <div>
    <Table border :columns="colums1" :data="emp" @on-row-click="clickRow" :highlight-row="highlight"></Table>
    <Card>
       <Form ref="formItem" :model="formItem"  :label-width="120">
        <h4>办理与收费信息</h4>
        <Row type="flex" justify="start">
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="办理机构：" prop="name">
              <a href="#/org_policy_maintenance/org_policy_list">
                {{formItem.name}}
              </a>
            </Form-item> 
          </i-col>
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="操作方式：" prop="operateType">
              {{formItem.operateTypeN}}
            </Form-item> 
          </i-col>
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="支付方式：" prop="payType">
              {{formItem.payTypeN}}
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
              {{formItem.chargeTypeN}}
            </Form-item> 
          </i-col>
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="特殊收费备注：" prop="specialChargeRemark" v-if="formItem.chargeTypeN === '特殊收费'">
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
              <Checkbox v-model="formItem.onlineContactIdCard" disabled>网上联系人身份证复印件</Checkbox>
            </Form-item>
          </i-col>
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item >
              <Checkbox v-model="formItem.onlineContactIsSecretariat" disabled>网上联系人是否秘书台人员</Checkbox>
            </Form-item>
          </i-col>
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="网上联系人：">
              <Input v-model="formItem.onlineContact" placeholder="请输入" disabled/>
            </Form-item>
          </i-col>
        </Row>
        <Row type="flex" justify="start">
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item >
              <Checkbox v-model="formItem.businessLicence" disabled>营业执照复印件或三证合一复印件</Checkbox>
            </Form-item>
          </i-col>
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item >
              <Checkbox v-model="formItem.organizationCode" disabled>机构代码证复印件</Checkbox>
            </Form-item>
          </i-col>
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item >
              <Checkbox v-model="formItem.foreignBusinessApprovalCertificate" disabled>外商企业批准证书复印件</Checkbox>
            </Form-item>
          </i-col>
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item >
              <Checkbox v-model="formItem.businessRenameNotice" disabled>工商局企业更名通知复印件</Checkbox>
            </Form-item>
          </i-col>
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="特殊情况备注：">
              <Input v-model="formItem.specialMaterialRemark" placeholder="请输入" type="textarea" disabled/>
            </Form-item>
          </i-col>
        </Row>
        <CredentialsMaterial :meterials="meterials"></CredentialsMaterial>
       </Form>
    </Card>
    <Modal v-model="taskFollow" title="任务跟进" @on-ok="ok" @on-cancel="cancel">
      <Form ref="formItem" :model="formItem"  :label-width="120">
        <Row >
          <i-col span="12">
            <Form-item label="跟进说明：" prop="name"  style="width:400px;">
              <Input v-model="followDescription" placeholder="请输入" type="textarea" :autosize="{minRows: 2,maxRows: 5}"/>
            </Form-item> 
          </i-col>
        </Row>
        <h3>跟进历史</h3>
        <Table border :columns="columns2" :data="data2"></Table>
      </Form>
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
      emp: {
        type: Array,
        default() {
          return {}
        }
      }
    },
    data () {
      return {
        highlight: true,
        taskFollow: false,
        followDescription:'',
        taskId: '',
        meterials: null,
        formItem: {
          name: '',
          operateTypeN: '',
          operateAccount: '',
          operatePwd: '',
          chargeTypeN: '',
          payTypeN: '',
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
            key: 'credentialsTypeN'
          },
          {
            title: '证件办理类型',
            key: 'credentialsDealTypeN'
          },
          {
            title: '经办人',
            key: 'createdBy'
          },
          {
            title: '办理时间',
            key: 'createdTime'
          },
          {
            title: '操作',
            key: 'action',
            width: '150',
            align: 'center',
            render: (h, params) => {
              if (params.row.action == null || params.row.action == ""){
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
                      this.taskId = params.row.taskId
                      this.taskFollowShow(params.row.taskId);
                    }
                  }
                }, '跟进')
              ])
            }
          }
          }
        ],
        data1: [],
        columns2: [
          {
            title: '跟进人',
            width:100,
            key: 'createdBy'
          },
          {
            title: '跟进时间',
            width:150,
            key: 'createdTime'
          },
          {
            title: '跟进说明',
            key: 'followDescription'
          }
        ],
        data2: []
      }
    },
    mounted () {
    },
    created () {
    },
    methods: {
      save () {},
      back () {
        this.$router.go(-1)
      },
      clickRow (value) {
        if (value !== null) {
          this.$emit("backRow", value)
          this.selectCompanyExt(value.credentialsType,value.companyId)
          this.findMeterials(value.taskId.toString())
        }
      },
      findMeterials(taskId) {
        axios.get(host + '/api/empCredentialsDeal/find/meterials/' + taskId).then(response => {
          this.meterials = response.data.data
        })
      },
      taskFollowShow(taskId) {
        if( taskId != null) {
          axios.get(host + '/api/empCredentialsDeal/find/taskFollow/'+taskId).then((response) =>{
            if (response.data.errCode == "0"){
              this.data2 = response.data.data
              this.followDescription = ""
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
        }
      },
      selectCompanyExt (credentialsType,companyId) {
        axios.get(host + '/api/empCredentialsDeal/find/companyExt/'+companyId+'/'+credentialsType).then(response => {
          this.formItem = response.data.data
        })
      },
      ok () {
        if (this.followDescription != "" && this.followDescription != null) {
          var params = {}
          params.followDescription = this.followDescription
          params.taskId = this.taskId
          params.createdBy = 'gu'
          axios.post(host + '/api/empCredentialsDeal/saveOrUpdate/taskFollow', params).then(response => {
            if (response.data.errCode === '0'){
              this.$Notice.success({
                title: '保存成功',
                desc: ''
              })
              this.modal1 = false
            } else {
              this.$Notice.error({
                title: '保存失败',
                desc: ''
              })
            }
          }).catch((error) => {
            this.$Notice.error({
              title: '保存失败',
              desc: ''
            })
          })
        }
      },
      cancel() {} 
    },
    watch: {

    }
  }
</script>

<style scoped>

</style>
