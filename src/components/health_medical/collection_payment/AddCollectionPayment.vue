<template>
  <div class="AddAgentBusiness">
    <Card>
      <Form :model="formItem" :label-width="120">
        <row>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
          <Form-item label="保险产品：" prop="types">
            <Select placeholder="选择保险公司">
              <Option value="1">中国人民财产保险股份有限公司苏州市分公司</Option>
              <Option value="2">平安养老保险股份有限公司上海分公司</Option>
              <Option value="3">中国平安财产保险股份有限公司上海分公司</Option>
            </Select>
          </Form-item>
          </Col>
        </row>
        <row>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
          <Form-item label="保单名称：" prop="types">
            <Select placeholder="选择保单">
              <Option value="1">惠氏公司商业保险保费</Option>
              <Option value="2">爱茉莉公司-平安团体险保单</Option>
              <Option value="3">伊顿公司实习生意外险保费</Option>
            </Select>
          </Form-item>
          </Col>
        </row>
        <row>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
          <Form-item label="缴费年月：" prop="types">
            <Select placeholder="选择年月">
              <Option value="1">201708</Option>
              <Option value="2">201709</Option>
              <Option value="3">201710</Option>
            </Select>
          </Form-item>
          </Col>
        </row>
        <row>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
          <Table border :columns="columns7" :data="data6"></Table>
          </Col>
          <Col span="3" style="margin-left: 10px;">
          <Button type="primary" @click="modal1 = true">新增付费</Button>
          </Col>
          <Col span="3">
          <router-link to="/AddPayRate">
            <Button type="primary">导入付费</Button>
          </router-link>
          </Col>
        </row>
        <br>
        <row>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
          <div class="tc">
            <Button type="warning" @click="back">返回</Button>
            <router-link to="/CollectionPayment">
              <Button type="primary">提交</Button>
            </router-link>
          </div>
          </Col>
        </row>
      </Form>
    </Card>

    <Modal
      v-model="modal1"
      title="新增付费对话框"
      @on-ok="ok">
      <Input v-model="formItem.code1" placeholder="公司编号："/>
      <br> <br>
      <Input v-model="formItem.code2" placeholder="公司名称："/>
      <br> <br>
      <Input v-model="formItem.code3" placeholder="保费："/>
      <br> <br>
      <Input v-model="formItem.code4" placeholder="人数："/>
      <br> <br>
      <Input v-model="formItem.code5" placeholder="备注："/>
    </Modal>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        modal1: false,
        onlyNum: false,
        formItem: {
          name: null,
          code: null,
          types: "",
          typeVal: "请选择",
          disabled: true,
          routerChanged: false,
          note: "雇员的名称"
        },
        columns7: [
          {
            title: '公司编号', sortable: true, key: 'column1'
          },

          {
            title: '公司名称', sortable: true, key: 'column2'
          },
          {
            title: '保费', sortable: true, key: 'column3'
          },

          {
            title: '人数', sortable: true, key: 'column4'
          }
        ],
        data6: [
          {
            column1: '2215',
            column2: '苹果公司',
            column3: '100，000',
            column4: '5000'
          },
          {
            column1: '2216',
            column2: '脸书公司',
            column3: '80，000',
            column4: '4000'
          }
        ],
        liandairens: [
          {
            value: '1',
            label: '戴敏一'
          },
          {
            value: '2',
            label: '戴敏二'
          },
          {
            value: '3',
            label: '戴敏三'
          }
        ],
        ruleValidate: {
          name: [
            {required: true, message: '薪资项模板名称不能为空', trigger: 'blur'}
          ],
          types: [
            {required: true, message: '请选择薪资项模板类别', trigger: 'change'}
          ],
          dataTypes: [
            {required: true, message: '请选择数据类型', trigger: 'change'}
          ],

        }
      }
    },
    methods: {

      back() {
        this.$local.back();
      },

    },

  }


</script>
