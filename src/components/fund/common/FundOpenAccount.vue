<template>
  <Form label-width=150>
    <Row type="flex" justify="start">
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="变更类型：">
          <Select v-model="openAccount.changeTypeValue" style="width: 100%;" :disabled="disabled" transfer>
            <Option v-for="item in changeTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="缴费银行：">
          <Select v-model="openAccount.paymentBankValue" style="width: 100%;" :disabled="disabled" transfer>
            <Option v-for="item in paymentBankList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="付款方式：">
          <Select v-model="openAccount.payMethodValue" style="width: 100%;" :disabled="disabled" transfer>
            <Option v-for="item in payMethodList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="企业公积金账户：">
          <Input v-model="openAccount.companyFundAccount" placeholder="请输入..." :disabled="disabled"></Input>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="公积金企业U盾：">
          <Select v-model="openAccount.UKeyValue" style="width: 100%;" :disabled="disabled" transfer>
            <Option v-for="item in UKeyList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="客户缴费起始年月：">
          <DatePicker v-model="openAccount.customerPayStartDate" placement="bottom-end" placeholder="选择日期" :disabled="disabled" style="width: 100%;" transfer></DatePicker>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="每月关账日：">
          <Input v-model="openAccount.closeAccountEveryMonth" placeholder="请输入..." :disabled="disabled"></Input>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="专员操作起始年月：">
          <DatePicker v-model="openAccount.professionalOperateStartDate" placement="bottom-end" placeholder="选择日期" :disabled="disabled" style="width: 100%;" transfer></DatePicker>
        </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="任务状态：" prop="taskStatus">
            <Select  style="width: 100%;" transfer @on-change="taskTypeChange"	>
              <Option v-for="item in taskTypeList" :value="item.value" :key="item.value" :disabled="item.disabled">{{item.label}}</Option>
            </Select>
          </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="受理日期：">
          <DatePicker v-model="openAccount.accpetDate" placement="bottom-end" placeholder="选择日期" :disabled="disabled" style="width: 100%;" transfer></DatePicker>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="送审日期：">
          <DatePicker v-model="openAccount.deliveredDate" placement="bottom-end" placeholder="选择日期" :disabled="disabled" style="width: 100%;" transfer></DatePicker>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="完成日期：">
          <DatePicker v-model="openAccount.finishDate" placement="bottom-end" placeholder="选择日期" :disabled="disabled" style="width: 100%;" transfer></DatePicker>
        </Form-item>
      </Col>
    </Row>
    <Row type="flex" justify="start">
      <Col :sm="{span: 24}">
        <Form-item label="备注：">
          <Input v-model="openAccount.notes" placeholder="请输入..." :disabled="disabled"></Input>
        </Form-item>
      </Col>
    </Row>
  </Form>
</template>
<script>
  export default {
    props: {
      openAccountInfo: {
        type: Object
      }
    },
    data() {
      return {
        changeTypeList: [
          {label: "开户", value: 0},
          {label: "转入", value: 1}
        ],
        paymentBankList: [
          {label: "徐汇--X", value: 0},
          {label: "西郊--C", value: 1},
          {label: "东方路--P", value: 2},
          {label: "卢湾--L", value: 3},
          {label: "黄浦--H", value: 4},
        ],
        payMethodList: [
          {label: "客户自付", value: 0},
          {label: "我司付款(客户预付)", value: 1},
          {label: "垫付", value: 2},
        ],
        taskTypeList:[
          {value: '0',label: '初始(材料收缴)',disabled:false},
          {value: '1', label: '受理中',disabled:false},
          {value: '2', label: '送审中',disabled:false},
          {value: '3', label: '已完成',disabled:false},
        ],//任务状态类型
        UKeyList: [
          {label: "有(中智代办)", value: 0},
          {label: "有(客户自办)", value: 1},
          {label: "没有", value: 2},
        ]
      }
    },
    computed: {
      openAccount() {
        return this.openAccountInfo;
      }
    }
  }
</script>
