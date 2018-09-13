<template>
  <div>
    <Form :label-width="150">
      <Row type="flex" justify="start">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="雇员编号：">
            {{employee.employeeId}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="雇员姓名：">
            {{employee.employeeName}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="证件号码：">
            {{employee.idNum}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="性别：">
            {{employee.sex}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="手机号：">
            {{employee.mobile}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="户口地址：">
            {{employee.residenceAddress}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="首次进中智日期：">
            {{employee.firstInDateStr}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="合同起始日期：">
            {{employee.laborStartDateStr}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="合同截至日期：">
            {{employee.laborEndDateStr}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="首月合同生效日期：">
            {{employee.firstInCompanyDateStr}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="岗位：">
            {{employee.position}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="是否无期限合同：">
            {{employee.isUnlimitedContract}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="单位性质：">
            {{employee.companyType}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="派遣年限：">
            {{employee.sendCondemnationYears}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="用工属性：">
            {{employee.employProperty}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="档案费：">
            {{employee.fileFee}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="人员性质：">
            {{employee.employeeNature}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="档案方向：">
            {{employee.archiveDirection}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="公司社保帐户维护日期：">
            {{employee.accountRepairDate}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="公司社保缴费区县：">
          {{employee.settlementArea}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="公司社保登记码：">
            {{employee.ssAccount}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="组织机构代码：">
            {{employee.organizationCode}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="UKey状态：">
            {{employee.keyStatus}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="UKey编号：">
            {{employee.keyType}}{{employee.keyCode}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="UKey密码(档案部)：">
            {{employee.keyPwd}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="UKey密码(福利部)：">
            {{employee.ssPwd}}
          </Form-item>
        </Col>
         <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" v-show="employee.show">
          <Form-item label="寄退工单：" >
              <Checkbox  v-model="employee.mailContinue"  :disabled="true"></Checkbox>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" v-show="employee.show">
          <Form-item label="邮寄退工单地址：">
            {{employee.mailAdress}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}"  v-show="employee.show">
          <Form-item label="邮寄退工单收件人：">
            {{employee.recipient}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" v-show="employee.show">
          <Form-item label="邮寄退工单邮编：">
            {{employee.postCode}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" v-show="employee.show">
          <Form-item label="邮寄退工单电话：">
            {{employee.phone}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 16}">
          <Form-item label="公司特殊情况：">
            <RadioGroup v-model="employee.speacilStr" type="button" >
               <Radio v-for="item in employee.speacilStr" :label="item" :key="item" :disabled=true></Radio>
            </RadioGroup>
          </Form-item>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<script>
export default {
  props: {
    employeeInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {
    employee() {
      return this.employeeInfo;
    }
  }
};
</script>
