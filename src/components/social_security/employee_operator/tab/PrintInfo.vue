<template>
  <div class="smList" style="height: 850px;margin-left: 1px">
    <Collapse value="1">
      <Panel name="1">
        查询条件
        <div slot="content">
          <Form :model="queryForm" :label-width=150>
            <Row justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="变更内容：" prop="changeContent">
                <Select filterable clearable v-model.trim="queryForm.changeContent">
                  <Option v-for="item in changeContentList" :value="item" :key="item"
                          :label="item">
                  </Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="完成日期起" prop="finishDateStart">
                <DatePicker v-model.trim="queryForm.finishDateStart" type="date" format="yyyy-MM-dd"
                            placeholder="选择日期"></DatePicker>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="完成日期止" prop="finishDateEnd">
                <DatePicker v-model.trim="queryForm.finishDateEnd" type="date" format="yyyy-MM-dd"
                            placeholder="选择日期"></DatePicker>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="养老金账号起" prop="pensionAccountStart">
                <Input placeholder="请输入" v-model.trim="queryForm.pensionAccountStart" :maxlength="20"></Input>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="养老金账号止" prop="pensionAccountEnd">
                <Input placeholder="请输入" v-model.trim="queryForm.pensionAccountEnd" :maxlength="20"></Input>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="公司编号" prop="companyCode">
                <Input placeholder="请输入" v-model.trim="queryForm.companyCode" :maxlength="20"></Input>
              </FormItem>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="社保状态：" prop="socialSecurityStatus">
                <Select filterable clearable v-model.trim="queryForm.socialSecurityStatus">
                  <Option v-for="item in socialSecurityStatusList" :value="item" :key="item"
                          :label="item">
                  </Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="操作员：" prop="operator">
                <Select filterable clearable v-model.trim="queryForm.operator">
                  <Option v-for="item in operatorList" :value="item" :key="item"
                          :label="item">
                  </Option>
                </Select>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span:24}" class="tr">
              <Button type="primary" @click="exportRegisterForm">导出个人社会保险登记表</Button>
              <Button type="primary" @click="exportChangeDeclarationForm">导出社会保险业务变更项目申报表</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>
  </div>
</template>
<script>
  import api from '../../../../api/social_security/employee_operator'

  export default {
    data() {
      return {
        changeContentList: [],
        socialSecurityStatusList: [],
        operatorList: [],
        queryForm: {
          changeContent: null,
          finishDateStart: null,
          finishDateEnd: null,
          pensionAccountStart: null,
          pensionAccountEnd: null,
          companyCode: null,
          socialSecurityStatus: null,
          operator: null
        }
      }
    },
    mounted() {
    },
    methods: {
      exportRegisterForm() {
        api.exportRegisterForm(this.queryForm)
      },
      exportChangeDeclarationForm() {
        api.exportChangeDeclarationForm(this.queryForm)
      }
    }
  }
</script>
