<template>
  <div>
    <Card dis-hover>
      <p solt="title">雇员信息录入</p>
      <Form ref="empAddForm" :model="formItem" :rules="ruleValidate" :label-width="120">
        <Row justify="start">
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="客户：" prop="companyId">
              <input-company-name v-model="formItem.companyId"></input-company-name>
            </Form-item>    
          </i-col>
        </Row>
        <Row justify="start" style="margin-top:10px">
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="雇员姓名：" prop="employeeName">
              <Input v-model="formItem.employeeName" placeholder="请输入"/>
            </Form-item>    
          </i-col>
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="性别：" prop="gender">
              <Select v-model="formItem.gender" placeholder="请选择" transfer>
                <Option value="1">男</Option>
                <Option value="0">女</Option>
              </Select>
            </Form-item>
          </i-col>
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="国籍：" prop="countryCode">
              <Select v-model="formItem.countryCode" placeholder="请选择" transfer>
                <Option v-for="item in countrys" :value="item.countryCode" :key="item.countryCode">{{item.countryName}}</Option>
              </Select>
            </Form-item>    
          </i-col>
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" style="margin-top:10px">
            <Form-item label="证件类型：" prop="idCardType">
              <Select v-model="formItem.idCardType" placeholder="请选择" transfer>
                <Option v-for="(value,key) in this.baseDic.idCardType" :value="key" :key="key">{{ value }}</Option>
              </Select>
            </Form-item>    
          </i-col>
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" style="margin-top:10px">
            <Form-item label="证件号码：" prop="idNum">
              <Input v-model="formItem.idNum" placeholder="请输入"/>
            </Form-item>    
          </i-col>
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" style="margin-top:10px">
            <Form-item label="出生日期：" prop="birthday">
             <DatePicker type="date" v-model="formItem.birthday" placeholder="请输入" style="width: 57%" transfer/>
            </Form-item> 
          </i-col>
        </Row>
        <Row justify="start" style="margin-top:10px">
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="备注：" prop="remark">
              <Input v-model="formItem.remark" type="textarea" :autosize="{minRows: 3,maxRows: 6}" placeholder="请输入"/>
            </Form-item>
          </i-col>
        </Row>
        <Row justify="start" class="tr">
          <i-col :sm="{span: 24}">
            <Button type="primary" @click="submit('empAddForm')" class="ml10" >保存</Button>
            <Button type="warning" @click="back" class="ml10">取消</Button>
          </i-col>
        </Row>
      </Form>
    </Card>
  </div>
</template>

<script>
import InputCompanyName from '../../common_control/form/input_company/InputCompanyName.vue'
import axios from 'axios'
import Tools from '../../../lib/tools'

const host = process.env.SITE_HOST
export default {
  components:{InputCompanyName},
  data () {
    return {
      countrys:{},
      formItem: {
        companyId: '',
        employeeName: '',
        gender: '',
        countryCode: '',
        idCardType: '',
        idNum: '',
        birthday: '',
        remark: ''
      },
      empAddForm: {
        companyId: '',
        employeeName: '',
        gender: '',
        countryCode: '',
        idCardType: '',
        idNum: '',
        birthday: ''
      },
      ruleValidate: {
        companyId: [{ required: true, message: '请选择客户', trigger: 'change' }],
        employeeName: [{ required: true, message: '雇员姓名不能为空', trigger: 'blur' }],
        gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
        countryCode: [{ required: true, message: '请选择国籍', trigger: 'change' }],
        idCardType: [{ required: true, message: '请选择证件类型', trigger: 'change' }],
        idNum: [{ required: true, message: '证件号码不能为空', trigger: 'blur' }],
        birthday: [{ required: true, type: 'date', message: '请选择出生日期', trigger: 'change' }]
      }
    }
  },
  created() {
    this.getCountry()
  },
  methods: {
    submit (value) {
      this.$refs[value].validate((valid) => {
        if (valid) {
          let params = {}
          params = {...this.formItem}
          params.birthday = Tools.formatDate(params.birthday,"YYYY-MM-DD hh:mm")
          axios.post(host + '/api/emp/add',params).then((response) => {
            if (response.data.errCode === "0"){
               this.$Notice.success({
                  title: '保存成功',
                  desc: ''
                })
                this.find()
                this.$router.push({name:"empList"})
            } else {
              this.$Notice.error({
                title: '保存失败',
                desc: ''
              })
            }
          })
        } else {
          this.$Message.error('校验失败!')
        }
      })
    },
    back () {
      this.$router.go(-1)
    },
    getCountry() {
      axios.get(host + '/api/baseData/getCountry').then((response) => {
        if (response.data.errCode == "0") {
          this.countrys = response.data.data
        }
      })
    }
  }
}
</script>

<style scoped>

</style>


