<template>
  <div>
    <Card>
      <Form :model="formItem" :label-width="120">
        <row>
          <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
            <Form-item label="保险产品：" prop="types">
              <Select placeholder="选择产品">
                <Option value="0">全部</Option>
                <Option value="1">补充医疗保险</Option>
                <Option value="2">特需医疗保险</Option>
                <Option value="3">大中华医疗保险</Option>
              </Select>
            </Form-item>
          </i-col>
        </row>
        <row>
          <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
            <Form-item label="赔付比例：" prop="types">
              <Select placeholder="选择赔付比例">
                <Option value="1">100%</Option>
                <Option value="2">90%</Option>
                <Option value="3">80%</Option>
                <Option value="1">70%</Option>
                <Option value="2">60%</Option>
                <Option value="3">50%</Option>
                <Option value="2">免赔300后80%</Option>
                <Option value="3">免赔300后50%</Option>
              </Select>
            </Form-item>
          </i-col>
        </row>
        <row>
          <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
            <Form-item label="收费：" prop="name">
              <Input v-model="formItem.code" placeholder="20" style="width: 150px;padding-right: 10px;"></Input><span
              class="expand-value">元/人月</span>
            </Form-item>
          </i-col>
        </row>
        <row>
          <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
            <Form-item label="代理费：" prop="name">
              <Input v-model="formItem.code" placeholder="2" style="width: 150px;padding-right: 10px;"></Input><span
              class="expand-value">元/人月</span>
            </Form-item>
          </i-col>
        </row>
        <br>
        <row>
          <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
            <div class="floatRightBtns">
              <router-link to="/AddCollectionPayment">
                <Button type="primary">提交</Button>
              </router-link>
              <Button type="success" @click="back">返回</Button>
            </div>
          </i-col>
        </row>
      </Form>
    </Card>
  </div>
</template>
<script>
  export default {
    data() {
      return {
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
            title: '理赔比例', sortable: true, key: 'column1'
          },

          {
            title: '收费', sortable: true, key: 'column2'
          }
        ],
        data6: [
          {
            column1: '100%',
            column2: '20元/人月'
          },
          {
            column1: '100%',
            column2: '15元/人月'
          }
        ],
        liandairens: [
          {
            value: '1', label: '戴敏一'
          },
          {
            value: '2', label: '戴敏二'
          },
          {
            value: '3', label: '戴敏三'
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
