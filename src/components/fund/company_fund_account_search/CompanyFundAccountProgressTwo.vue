<template>
  <div>
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        企业公积金账号信息
        <div slot="content">
         <Form :label-width=150>
    <Row type="flex" justify="start">
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="缴费银行：">
          <Select v-model="companyFundAccount.payBankValue" style="width: 100%;" transfer>
            <Option v-for="item in payBankList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="付款方式：">
          <Select v-model="companyFundAccount.payMethodValue" style="width: 100%;" transfer>
            <Option v-for="item in payMethodList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="企业基本公积金账户：">
          <Input v-model="companyFundAccount.companyFundAccount" placeholder="请输入..."></Input>
        </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="企业补充公积金账户：">
          <Input v-model="companyFundAccount.companyAddFundAccount" placeholder="请输入..."></Input>
        </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="U盾代管情况：">
          <Select v-model="companyFundAccount.UKeyValue" style="width: 100%;" transfer>
            <Option v-for="item in UKeyList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="每月关账日：">
          <DatePicker v-model="companyFundAccount.closeAccountDate" type="daterange" placement="bottom" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
        </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="缴费起始年月：">
          <DatePicker v-model="companyFundAccount.payStartDate" type="daterange" placement="bottom" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
        </Form-item>
      </Col>
      
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="备注：">
          <Input v-model="companyFundAccount.remark" placeholder="请输入..."></Input>
        </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="">
          <CheckboxGroup v-model="companyFundAccount.tmpStore">
            <Checkbox label="基本暂保管"></Checkbox>
            <Checkbox label="补充暂保管"></Checkbox>
          </CheckboxGroup>
        </Form-item>
      </Col>
    </Row>
  </Form>
        </div>
      </Panel>
      <Panel name="2">
        企业公积金账号绑定公司列表
        <div slot="content">
          <company-fund-account-bind-list :accountBindCompanyData="data.accountBindCompanyData"></company-fund-account-bind-list>
        </div>
      </Panel>
    </Collapse>
    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <Button type="warning" @click="goBack">返回</Button>
      </Col>
    </Row>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import EventType from '../../../store/event_types'

  import companyFundAccountInfoAndOperate from "../common/CompanyFundAccountInfoAndOperate.vue"
  import companyFundAccountBindList from "../common/CompanyFundAccountBindList.vue"

  export default {
    components: {companyFundAccountInfoAndOperate, companyFundAccountBindList},
    data() {
      return {
        collapseInfo: [1, 2],
        payBankList: [
          {label: "全部", value: ''},
          {label: "建行徐汇支行", value: 0},
          {label: "建行静安支行", value: 1},
          {label: "建行长宁支行", value: 2},
        ],
        payMethodList: [
          {label: "全部", value: ''},
          {label: "自开发票", value: 0},
          {label: "我司垫付(客户预付)", value: 1},
          {label: "垫付", value: 2}
        ],
        UKeyList: [
          {label: "全部", value: ''},
          {label: "有(中智代办)", value: 0},
          {label: "有(客户自办)", value: 1},
          {label: "没有", value: 2}
        ],
        companyFundAccount:{}
      }
    },
    mounted() {
      this[EventType.COMPANYFUNDACCOUNTPROGRESSTWO]()
    },
    computed: {
      ...mapState('companyFundAccountProgressTwo',{
        data:state => state.data
      })
    },
    methods: {
      ...mapActions('companyFundAccountProgressTwo',[EventType.COMPANYFUNDACCOUNTPROGRESSTWO]),
      goBack() {
        this.$router.go(-1);
      }
    }
  }
</script>
