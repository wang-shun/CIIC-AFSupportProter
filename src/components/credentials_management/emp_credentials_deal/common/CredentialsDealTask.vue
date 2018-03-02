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
        <div class="create"></div>
        <h3>材料收缴</h3>
        <div v-if="formItem.credentialsType === 1 && formItem.credentialsDealType === 1">
          <CredentialsMaterial1 :meterials="meterials" @materialsIds="childBack" ></CredentialsMaterial1>
        </div>
        <div v-if="formItem.credentialsType === 1 && formItem.credentialsDealType === 2">
          <CredentialsMaterial2 :meterials="meterials" @materialsIds="childBack" ></CredentialsMaterial2>
        </div>
        <div v-if="formItem.credentialsType === 1 && formItem.credentialsDealType === 3">
          <CredentialsMaterial3 :meterials="meterials" @materialsIds="childBack" ></CredentialsMaterial3>
        </div>
        <div v-if="formItem.credentialsType === 1 && formItem.credentialsDealType === 4">
          <CredentialsMaterial4 :meterials="meterials" @materialsIds="childBack" ></CredentialsMaterial4>
        </div>
        <div v-if="formItem.credentialsType === 2 && formItem.credentialsDealType === 5">
          <CredentialsMaterial5 :meterials="meterials" @materialsIds="childBack" ></CredentialsMaterial5>
        </div>
        <div v-if="formItem.credentialsType === 2 && formItem.credentialsDealType === 6">
          <CredentialsMaterial6 :meterials="meterials" @materialsIds="childBack" ></CredentialsMaterial6>
        </div>
        <div v-if="formItem.credentialsType === 2 && formItem.credentialsDealType === 7">
          <CredentialsMaterial7 :meterials="meterials" @materialsIds="childBack" ></CredentialsMaterial7>
        </div>
        <div v-if="formItem.credentialsType === 2 && formItem.credentialsDealType === 8">
          <CredentialsMaterial8 :meterials="meterials" @materialsIds="childBack" ></CredentialsMaterial8>
        </div>
        <div v-if="formItem.credentialsType === 2 && formItem.credentialsDealType === 9">
          <CredentialsMaterial9 :meterials="meterials" @materialsIds="childBack" ></CredentialsMaterial9>
        </div>
        <div v-if="formItem.credentialsType === 2 && formItem.credentialsDealType === 10">
          <CredentialsMaterial10 :meterials="meterials" @materialsIds="childBack" ></CredentialsMaterial10>
        </div>
        <div v-if="formItem.credentialsType === 3">
          <CredentialsMaterial14 :meterials="meterials" @materialsIds="childBack" ></CredentialsMaterial14>
        </div>
        <div v-if="formItem.credentialsType === 4">
          <CredentialsMaterial11 :meterials="meterials" @materialsIds="childBack" ></CredentialsMaterial11>
        </div>
        <div v-if="formItem.credentialsType === 5">
          <CredentialsMaterial13 :meterials="meterials" @materialsIds="childBack" ></CredentialsMaterial13>
        </div>
        <div v-if="formItem.credentialsType === 6">
          <CredentialsMaterial12 :meterials="meterials" @materialsIds="childBack" ></CredentialsMaterial12>
        </div>
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
  import CredentialsMaterial1 from './CredentialsMaterial1'
  import CredentialsMaterial2 from './CredentialsMaterial2'
  import CredentialsMaterial3 from './CredentialsMaterial3'
  import CredentialsMaterial4 from './CredentialsMaterial4'
  import CredentialsMaterial5 from './CredentialsMaterial5'
  import CredentialsMaterial6 from './CredentialsMaterial6'
  import CredentialsMaterial7 from './CredentialsMaterial7'
  import CredentialsMaterial8 from './CredentialsMaterial8'
  import CredentialsMaterial9 from './CredentialsMaterial9'
  import CredentialsMaterial10 from './CredentialsMaterial10'
  import CredentialsMaterial11 from './CredentialsMaterial11'
  import CredentialsMaterial12 from './CredentialsMaterial12'
  import CredentialsMaterial13 from './CredentialsMaterial13'
  import CredentialsMaterial14 from './CredentialsMaterial14'
  import axios from 'axios'

  const host = process.env.SITE_HOST
  export default {
    components: {
      CredentialsMaterial1,
      CredentialsMaterial2,
      CredentialsMaterial3,
      CredentialsMaterial4,
      CredentialsMaterial5,
      CredentialsMaterial6,
      CredentialsMaterial7,
      CredentialsMaterial8,
      CredentialsMaterial9,
      CredentialsMaterial10,
      CredentialsMaterial11,
      CredentialsMaterial12,
      CredentialsMaterial13,
      CredentialsMaterial14
    },
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
        materialsIds: '',
        meterials: {
          info: {},
          menu: null
        },
        rowdata: {},
        formItem: {
          credentialsType: '',
          credentialsDealType: '',
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
            width: 100,
            key: 'createdBy'
          },
          {
            title: '跟进时间',
            width: 150,
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
    methods: {
      clickRow (value) {
        this.formItem.name = ""
        this.formItem.operateTypeN = ""
        this.formItem.chargeTypeN = ""
        this.formItem.operateAccount = ""
        this.formItem.operatePwd = ""
        this.formItem.payTypeN = ""
        this.formItem.specialChargeRemark = ""
        this.formItem.introduceMail = false
        this.formItem.onlineContactIdCard = false
        this.formItem.onlineContactIsSecretariat = false
        this.formItem.onlineContact = ""
        this.formItem.businessLicence = false
        this.formItem.organizationCode = false
        this.formItem.foreignBusinessApprovalCertificate = false
        this.formItem.businessRenameNotice = false
        this.formItem.specialMaterialRemark = ""
        if (value !== null) {
          this.formItem.credentialsType = value.credentialsType
          this.formItem.credentialsDealType = value.credentialsDealType
          this.rowdata = {...value}
          this.$emit("backRow", this.rowdata)
          this.selectCompanyExt(value.credentialsType,value.companyCode)
          if (value.credentialsDealType != null && value.credentialsDealType != ""){
            this.createMeterialsMenu(value.credentialsType.toString(),value.credentialsDealType.toString())
          } else {
            this.createMeterialsMenu(value.credentialsType.toString(),"")
          }
          this.findMaterials(value.taskId)
        }
      },
      findMaterials(taskId) {
          axios.get(host + '/api/materials/find/'+taskId).then(response => {
            if (response.data.errCode == '0') {
              this.meterials.info = response.data.data
            }
            console.log("meterials："+this.meterials.info)
          }).catch((error) => {
            this.meterials.info = response.data.data
          })
      },
      createMeterialsMenu(credentialsType,credentialsDealType) {
        axios.get(host + '/api/materials/create?credentialsType='+credentialsType+'&credentialsDealType='+credentialsDealType).then(response => {
          if (response.data.errCode == '0') {
            this.meterials.menu = response.data.data
          }
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
          Object.assign(this.formItem, response.data.data);
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
      cancel() {},
      childBack (ids) {
        this.materialsIds = ids
        this.rowdata.materialIds = this.materialsIds
        this.$emit("backRow", this.rowdata)        
      }
    }
  }
</script>

<style scoped>

</style>
