<template>
  <div>
    <div>
    <Table border :columns="colums1" :data="data1" @on-row-click="selectedRow"></Table>
    </div>
    <div>
    <Card>
      <p slot="title" font-size="16px">{{title}}</p>
      <Form ref="formItem" :model="formItem"  :label-width="120">
        <h4>办理信息</h4>
        <Row type="flex" justify="start">
          <i-col :sm="{span: 24}" :md="{span: 20}" :lg="{span: 10}">
            <Form-item label="办理机构：" prop="name">
              <Select v-model="formItem.name" placeholder="请选择" transfer>
                <Option v-for="(value,key) in this.baseDic.DealOrg" :value="value" :key="key">{{ value }}</Option>
              </Select>
            </Form-item> 
          </i-col>
          <i-col :sm="{span: 24}" :md="{span: 20}" :lg="{span: 10}">
            <Form-item label="操作方式：" prop="operateType">
              <Select v-model="formItem.operateType" placeholder="请选择" transfer>
                <Option v-for="(value,key) in this.baseDic.operateType" :value="value" :key="key">{{ value }}</Option>
              </Select>
            </Form-item> 
          </i-col>
          <i-col :sm="{span: 24}" :md="{span: 20}" :lg="{span: 10}">
            <Form-item label="操作账号：" prop="operateAccount">
              <Input v-model="formItem.operateAccount" placeholder="请输入"/>
            </Form-item> 
          </i-col>
          <i-col :sm="{span: 24}" :md="{span: 20}" :lg="{span: 10}">
            <Form-item label="操作密码：" prop="operatePwd">
              <Input v-model="formItem.operatePwd" placeholder="请输入" />
            </Form-item> 
          </i-col>
        </Row>
        <h4>收费信息</h4>
        <Row type="flex" justify="start">
          <i-col :sm="{span: 24}" :md="{span: 20}" :lg="{span: 10}">
            <Form-item label="费用类型：" prop="chargeType">
              <Select v-model="formItem.chargeType" placeholder="请选择" transfer>
                <Option value="免费">免费</Option>
                <Option value="常规收费">常规收费</Option>
                <Option value="特殊收费">特殊收费</Option>
              </Select>
            </Form-item> 
          </i-col>
          <i-col :sm="{span: 24}" :md="{span: 20}" :lg="{span: 10}">
            <Form-item label="支付方式：" prop="payType">
              <Select v-model="formItem.payType" placeholder="请选择" transfer>
                <Option value="台账">台账</Option>
                <Option value="员工自付">员工自付</Option>
              </Select>
            </Form-item> 
          </i-col>
          <i-col :sm="{span: 24}" :md="{span: 20}" :lg="{span: 10}">
            <Form-item label="特殊收费备注：" prop="specialChargeRemark" v-if="formItem.chargeType === '特殊收费'">
              <Input v-model="formItem.specialChargeRemark" type="textarea" :autosize="{minRows: 3,maxRows: 6}" placeholder="请输入"/>
            </Form-item> 
          </i-col>
        </Row>
        <h4>留存材料信息</h4>
        <Row type="flex" justify="start">
          <i-col :sm="{span: 24}" :md="{span: 20}" :lg="{span: 10}">
            <Form-item >
              <Checkbox v-model="formItem.introduceMail">介绍信</Checkbox>
            </Form-item>
          </i-col>
          <i-col :sm="{span: 24}" :md="{span: 20}" :lg="{span: 10}">
            <Form-item >
              <Checkbox v-model="formItem.onlineContactIdCard">网上联系人身份证复印件</Checkbox>
            </Form-item>
          </i-col>
          <i-col :sm="{span: 24}" :md="{span: 20}" :lg="{span: 10}">
            <Form-item >
              <Checkbox v-model="formItem.onlineContactIsSecretariat">网上联系人是否秘书台人员</Checkbox>
            </Form-item>
          </i-col>
          <i-col :sm="{span: 24}" :md="{span: 20}" :lg="{span: 10}">
            <Form-item label="网上联系人：">
              <Input v-model="formItem.onlineContact" placeholder="请输入"/>
            </Form-item>
          </i-col>
        </Row>
        <Row type="flex" justify="start">
          <i-col :sm="{span: 24}" :md="{span: 20}" :lg="{span: 10}">
            <Form-item >
              <Checkbox v-model="formItem.businessLicence">营业执照复印件或三证合一复印件</Checkbox>
            </Form-item>
          </i-col>
          <i-col :sm="{span: 24}" :md="{span: 20}" :lg="{span: 10}">
            <Form-item >
              <Checkbox v-model="formItem.organizationCode">机构代码证复印件</Checkbox>
            </Form-item>
          </i-col>
          <i-col :sm="{span: 24}" :md="{span: 20}" :lg="{span: 10}">
            <Form-item >
              <Checkbox v-model="formItem.foreignBusinessApprovalCertificate">外商企业批准证书复印件</Checkbox>
            </Form-item>
          </i-col>
          <i-col :sm="{span: 24}" :md="{span: 20}" :lg="{span: 10}">
            <Form-item >
              <Checkbox v-model="formItem.businessRenameNotice">工商局企业更名通知复印件</Checkbox>
            </Form-item>
          </i-col>
          <i-col :sm="{span: 24}" :md="{span: 20}" :lg="{span: 10}">
            <Form-item label="特殊情况备注：">
              <Input v-model="formItem.specialMaterialRemark" placeholder="请输入" type="textarea"/>
            </Form-item>
          </i-col>
        </Row>
        <Row type="flex" justify="start" class="tr">  
          <i-col :sm="{span: 24}">
            <Button type="primary" @click="save" class="ml10">保存</Button>
            <Button type="warning" @click="back" class="ml10">取消</Button>
          </i-col>
        </Row> 
      </Form>
    </Card>
    </div>
  </div>
</template>

<script>
  // import {mapGetters, mapActions} from 'vuex'
  // import * as eventType from '../../../store/event_types/credentials_management_type'

  export default {
    data () {
      return {
        title: '',
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
          specialMaterialRemark: ''
        },
        colums1: [
          {
            title: '证件类型',
            key: 'credentialsType'
          },
          {
            title: '办理机构',
            key: 'name'
          },
          {
            title: '操作账号',
            key: 'operateAccount'
          },
          // {
          //   title: '',
          //   key: ''
          // },
          {
            title: '操作方式',
            key: 'operateType'
          },
          {
            title: '费用类型',
            key: 'chargeType'
          },
          {
            title: '支付方式',
            key: 'payType'
          },
          {
            title: '特殊收费备注',
            width: '250',
            key: 'specialChargeRemark'
          },
          {
            title: '操作',
            key: 'action',
            width: '100',
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
                }, '编辑')
              ])
            }
          }
        ],
        data1: [
          {
            credentialsType: '积分办理',
            name: '梅园路',
            operateAccount: '1358231671',
            operateType: '待审代交',
            chargeType: '常规收费',
            payType: '台账',
            specialChargeRemark: '',
            introduceMail: true,
            onlineContactIdCard: true,
            onlineContactIsSecretariat: true,
            onlineContact: '李小白',
            businessLicence: true,
            organizationCode: false,
            foreignBusinessApprovalCertificate: false,
            businessRenameNotice: false,
            specialMaterialRemark: ''
          },
          {
            credentialsType: '居住证B证',
            name: '徐汇人才',
            operateAccount: '15370922638',
            operateType: '待审不代交',
            chargeType: '特殊收费',
            payType: '员工自付',
            specialChargeRemark: '常规+（服务费）10%常规',
            introduceMail: true,
            onlineContactIdCard: false,
            onlineContactIsSecretariat: false,
            onlineContact: '',
            businessLicence: false,
            organizationCode: true,
            foreignBusinessApprovalCertificate: false,
            businessRenameNotice: false,
            specialMaterialRemark: '特殊情况说明。。。。。。'
          },
          {
            credentialsType: '留学生落户'
          },
          {
            credentialsType: '居转户'
          },
          {
            credentialsType: '夫妻分居'
          },
          {
            credentialsType: '人才引进'
          }
        ]
      }
    },
    mounted () {
    },
    created () {
    },
    computed: {
    },
    methods: {
      save () {},
      back () {
        this.$router.go(-1)
      },
      selectedRow (value) {
        if (value !== null) {
          console.log(value)
          this.formItem = value
          this.title = value.credentialsType
        }
      }
    }
  }
</script>

<style scoped>
.ivu-card-head p, .ivu-card-head-inner {
  font-size: 20px
}
.ivu-input {
  background-color: #fff
}
</style>
