<template>
  <div>
     <Collapse v-model="value1" >
      <Panel name="1">
        客户信息
        <Form :label-width="120" slot="content">
          <Row type="flex" justify="start">
            <i-col :sm="{span: 24}" :md="{span: 20}" :lg="{span: 10}">
              <Form-item label="客户编号：">
                {{companyCode}}
              </Form-item> 
            </i-col>
            <i-col :sm="{span: 24}" :md="{span: 20}" :lg="{span: 10}">
              <Form-item label="客户名称：">
                {{companyName}}
              </Form-item> 
            </i-col>
            <i-col :sm="{span: 24}" :md="{span: 20}" :lg="{span: 10}">
              <Form-item label="客户地址：">
                {{companyAddr}}
              </Form-item> 
            </i-col>
            <i-col :sm="{span: 24}" :md="{span: 20}" :lg="{span: 10}">
              <Form-item label="客户电话：">
                {{companyTel}}
              </Form-item> 
            </i-col>
          </Row>
        </Form>
      </Panel>
      <Panel name="2">
        雇员信息
        <Form :label-width="120" slot="content">
          <Row type="flex" justify="start">
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="雇员编号：">{{empCode}}</Form-item> 
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="雇员姓名：">{{empName}}</Form-item> 
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="证件号码：">{{IDCardNum}}</Form-item> 
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="学历：">{{education}}</Form-item> 
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="婚姻状况：">{{marriage}}</Form-item> 
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="性别：">{{sex}}</Form-item> 
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="出生日期：">{{birthday}}</Form-item> 
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="联系地址：">{{address}}</Form-item> 
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="首次进入日期：">{{firstInTime}}</Form-item> 
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="合同开始日期：">{{contractStartTime}}</Form-item> 
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="合同结束日期：">{{contractEndTime}}</Form-item> 
            </i-col>
          </Row>
        </Form>
      </Panel>
      <Panel name="3">
        证件办理
         <div slot="content">
          <CredentialsDealInfo :emp="empInfo" @backRow="callBack"> </CredentialsDealInfo>
        </div>
      </Panel>
      <Panel name="4">
        基础操作
        <Form :model="formItem" :label-width="120" slot="content">
          <Row type="flex" justify="start">
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="学历：" prop="">
                <Select v-model="formItem.education" placeholder="请选择" transfer>
                  <Option v-for="(value,key) in this.baseDic.educations" :value="key" :key="key">{{ value }}</Option>
                </Select>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="材料退回时间：" prop="">
                <DatePicker v-model="formItem.materialBackTime" type="date" placeholder="请输入" style="width: 100%" transfer/>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="催交日期：" prop="">
                <DatePicker v-model="formItem.callsTime" type="date" placeholder="请输入" style="width: 100%" transfer/>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="申报日期：" prop="">
                <DatePicker v-model="formItem.applyTime" type="date" placeholder="请输入" style="width: 100%" transfer/>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="居住年限：" prop="">
                <Input v-model="formItem.liveAgeLimit" placeholder="请输入"/>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="调档函开出时间：" prop="">
                <DatePicker v-model="formItem.shiftLetterSendTime" type="date" placeholder="请输入" style="width: 100%" transfer/>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="人才退回时间：" prop="">
                <DatePicker v-model="formItem.talentBackTime" type="date" placeholder="请输入" style="width: 100%" transfer/>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="人才退回原因：" prop="">
                <Select v-model="formItem.talentBackReason" placeholder="请选择" transfer>
                  <Option v-for="(value,key) in this.baseDic.talentBackReason" :value="key" :key="key">{{ value }}</Option>
                </Select>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="办理日期：" prop="">
                <DatePicker v-model="formItem.dealTime" type="date" placeholder="请输入" style="width: 100%" transfer/>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="收费日期：" prop="">
                <DatePicker v-model="formItem.chargeTime" type="date" placeholder="请输入" style="width: 100%" transfer/>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="到档时间：" prop="">
                <DatePicker v-model="formItem.receiveFileTime" type="date" placeholder="请输入" style="width: 100%" transfer/>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="原件退回时间：" prop="">
                <DatePicker v-model="formItem.originalBackTime" type="date" placeholder="请输入" style="width: 100%" transfer/>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="原件退回原因：" prop="">
                <Input v-model="formItem.originalBackReason" placeholder="请输入"/>
              </Form-item>
            </i-col>
             <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="积分单打印日期：" prop="">
                <DatePicker v-model="formItem.integralBillPrintTime" type="date" placeholder="请输入" style="width: 100%" transfer/>
              </Form-item>
            </i-col>
             <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="收费金额：" prop="">
                <Input v-model="formItem.chargeAmount" placeholder="请输入"/>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="付款方式：" prop="payType" >
                <Select v-model="formItem.payType" transfer>
                  <Option value="台账">台账</Option>
                  <Option value="现金">现金</Option>
                  <Option value="转账">转账</Option>
                  <Option value="POS机">POS机</Option>
                </Select>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="办证公司名称：" prop="">
                <Input v-model="formItem.perCompanyName" placeholder="请输入"/>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="手机：" prop="">
                <Input v-model="formItem.telephone" placeholder="请输入"/>
              </Form-item>
            </i-col>
            <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="备注：" prop="">
                <Input v-model="formItem.remark" type="textarea" :autosize="{minRows: 3,maxRows: 6}" placeholder="请输入"/>
              </Form-item>
            </i-col>
          </Row>
        </Form>
      </Panel>
     </Collapse>
      <Row type="flex" justify="start" class="tr" style="margin-top:10px">  
        <i-col :sm="{span: 24}">
          <Button type="primary" @click="save" class="ml10">保存</Button>
          <Button type="warning" @click="back" class="ml10">返回</Button>
        </i-col>
      </Row>
  </div>
</template>

<script>
  import CredentialsDealInfo from './common/CredentialsDealTask'
  import Tools from '../../../lib/tools'
  import axios from 'axios'
  import Decode from '../../../lib/decode'

  const host = process.env.SITE_HOST
  export default {
    components: {CredentialsDealInfo},
    data () {
      return {
        value1: ['2', '3'],
        empInfo: [],
        companyCode: '',
        companyName: '',
        companyAddr: '',
        companyTel: '',
        empCode: '',
        empName: '',
        IDCardNum: '',
        education: '',
        marriage: '',
        sex: '',
        birthday: '',
        address: '',
        firstInTime: '',
        contractStartTime: '',
        contractEndTime: '',
        formItem: {
          education: '',
          materialBackTime: '',
          callsTime: '',
          applyTime: '',
          liveAgeLimit: '',
          shiftLetterSendTime: '',
          talentBackTime: '',
          talentBackReason: '',
          dealTime: '',
          chargeTime: '',
          receiveFileTime: '',
          originalBackTime: '',
          originalBackReason: '',
          integralBillPrintTime: '',
          payType: '',
          chargeAmount: '',
          perCompanyName: '',
          telephone: '',
          remark: ''
        }
      }
    },
    mounted () {
      let data = this.$route.params.data
      Tools.copy(data,this)
    },
    created () {
      this.findAll(this.$route.params.data.empCode)
    },
    computed: {
    },
    methods: {
      callBack(value){
        this.formItem = value
      },
      save () {},
      back () {
        this.$router.go(-1)
      },
      findAll(empCode) {
        axios.get(host + '/api/empCredentialsDeal//find/task/' + empCode).then(response => {
          if (response.data.errCode === "0") {
            let data = response.data.data
            for(let i in data) {
              data[i].empCode = this.empCode
              data[i].empName = this.empName
              data[i].companyCode = this.companyCode
              data[i].companyName = this.companyName
            }
            let temp ={}
            if (this.$route.params.isDeal == true) {
              let data = this.$route.params.data
              temp.empCode = data.empCode
              temp.empName = data.empName
              temp.companyCode = data.companyCode
              temp.companyName = data.companyName
              temp.credentialsTypeN = this.$route.params.type
              if (this.$route.params.dealType != "") {
                temp.credentialsDealTypeN = this.$route.params.dealType
              }
              temp.action = "1"
              response.data.data.splice(0,0,temp)
            }
            this.empInfo = data
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
