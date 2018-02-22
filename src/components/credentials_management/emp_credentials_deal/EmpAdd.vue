<template>
  <div>
    <Card dis-hover>
      <p solt="title">雇员信息录入</p>
      <Form ref="empAddForm" :model="formItem" :rules="ruleValidate" :label-width="120">
        <Row justify="start">
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="客户：" prop="company">
              <input-company-name v-model="formItem.company"></input-company-name>
            </Form-item>    
          </i-col>
        </Row>
        <Row justify="start" style="margin-top:10px">
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="雇员姓名：" prop="name">
              <Input v-model="formItem.name" placeholder="请输入"/>
            </Form-item>    
          </i-col>
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="性别：" prop="sex">
              <Select v-model="formItem.sex" placeholder="请选择" transfer>
                <Option value="1">男</Option>
                <Option value="0">女</Option>
              </Select>
            </Form-item>
          </i-col>
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="国籍：" prop="country">
              <Select v-model="formItem.country" placeholder="请选择" transfer>
                <Option v-for="(value,key) in this.baseDic.country" :value="key" :key="key">{{ value }}</Option>
              </Select>
            </Form-item>    
          </i-col>
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" style="margin-top:10px">
            <Form-item label="证件类型：" prop="IDCardType">
              <Select v-model="formItem.IDCardType" placeholder="请选择" transfer>
                <Option v-for="(value,key) in this.baseDic.idCardType" :value="key" :key="key">{{ value }}</Option>
              </Select>
            </Form-item>    
          </i-col>
          <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" style="margin-top:10px">
            <Form-item label="证件号码：" prop="IDCardNum">
              <Input v-model="formItem.IDCardNum" placeholder="请输入"/>
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

export default {
  components:{InputCompanyName},
  data () {
    return {
      formItem: {
        company: '',
        name: '',
        sex: '',
        country: '',
        IDCardType: '',
        IDCardNum: '',
        birthday: '',
        remark: ''
      },
      empAddForm: {
        company: '',
        name: '',
        sex: '',
        country: '',
        IDCardType: '',
        IDCardNum: '',
        birthday: ''
      },
      ruleValidate: {
        company: [{ required: true, message: '请选择客户', trigger: 'change' }],
        name: [{ required: true, message: '雇员姓名不能为空', trigger: 'blur' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        country: [{ required: true, message: '请选择国籍', trigger: 'change' }],
        IDCardType: [{ required: true, message: '请选择证件类型', trigger: 'change' }],
        IDCardNum: [{ required: true, message: '证件号码不能为空', trigger: 'blur' }],
        birthday: [{ required: true, type: 'date', message: '请选择出生日期', trigger: 'change' }]
      }
    }
  },
  methods: {
    submit (value) {
      this.$refs[value].validate((valid) => {
        if (valid) {
          this.$Message.success('保存成功!')
        } else {
          this.$Message.error('保存失败!')
        }
      })
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>


