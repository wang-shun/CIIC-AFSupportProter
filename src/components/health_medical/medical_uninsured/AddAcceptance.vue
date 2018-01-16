<template>
  <div class="addAcceptance">
    <Card>
      <Form :model="formItem" :label-width="120">
        <row>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
          <Form-item label="受理编号：" prop="name">
            <span class="expand-value"></span>
          </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
          <Form-item label="客服经理：" prop="types">
            <span class="expand-value">周莉</span>
          </Form-item>
          </Col>
        </row>
        <row>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
          <Form-item label="雇员编号：" prop="name">
            <Input v-model="formItem.name" placeholder="请输入"></Input>
          </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
          <Form-item label="雇员姓名：" v-if="!onlyNum" prop="dataTypes">
            <span class="expand-value">戴敏</span>
          </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
          <Form-item label="证件号码：">
            <span class="expand-value">310105198505305026</span>
          </Form-item>
          </Col>
        </row>
        <row>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
          <Form-item label="款项类型：">
            <Select placeholder="请选择">
              <Option v-for="item in dataTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
          <Form-item label="中止日期：">
            <Input v-model="formItem.name" placeholder="请输入"></Input>
          </Form-item>
          </Col>
        </row>
        <row>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
          <Form-item label="受理类型：">
            <Select placeholder="请选择">
              <Option v-for="item in peopleTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
          <Form-item label="退保日期：">
            <Input v-model="formItem.name" placeholder="请输入"></Input>
          </Form-item>
          </Col>
        </row>
        <row>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
          <Form-item label="连带人：">
            <Select placeholder="请输入">
              <Option v-for="item in liandairens" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Form-item>
          </Col>

          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
          <Form-item label="连带人出生日期：">
            <Input v-model="formItem.name" placeholder="请输入"></Input>
          </Form-item>
          </Col>

          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
          <Form-item label="医疗备注：">
            <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
          </Form-item>
          </Col>
        </row>
        <row>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
          <Form-item label="受理金额：">
            <Input v-model="formItem.name" placeholder="请输入"></Input>
          </Form-item>
          </Col>

          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
          <Form-item label="发票张数：">
            <Input v-model="formItem.name" placeholder="请输入"></Input>
          </Form-item>
          </Col>
        </row>
      </Form>
      <row>

        <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
        <div class="floatRightBtns">
          <router-link to="/acceptanceList">
            <Button type="primary">提交</Button>
          </router-link>
          <Button type="success" @click="back">返回</Button>
        </div>
        </Col>
      </row>
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
        dataTypes: [
          {
            value: '1num',
            label: '医疗费'
          },
          {
            value: '2',
            label: '体检费用'
          },
          {
            value: '3',
            label: '住院补贴'
          },
          {
            value: '4',
            label: '托费'
          },
          {
            value: '5',
            label: '大额理赔款'
          },
          {
            value: '6',
            label: '其他'
          }
        ],
        peopleTypes: [
          {
            value: '1',
            label: '雇员'
          },
          {
            value: '2',
            label: '子女'
          },
          {
            value: '3',
            label: '配偶'
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
      selectChange() {
        this.formItem.disabled = false;
        if (this.formItem.types == "computed" || this.formItem.types == "seniorComputed" || this.formItem.types == "fixed") {
          this.onlyNum = true;
        } else {
          this.onlyNum = false;
        }
      },
      passData() {
        let data = this.$route.params.data;
        if (data) {
          this.editObj = data;
          this.formItem.name = data.name;
          this.formItem.code = data.code;
          this.formItem.types = createLookMap("label", "value", this.salaryType)[data.types];
          this.formItem.typeVal = createLookMap("label", "value", this.dataTypes)[data.typeVal];
        } else {
          data = ""
        }
      }
    },
    watch: {
      //监听路由变化 页面重载或路由跳转获取URL参数
      $route() {
        console.log("路由发生了变化");
        this.passData();
      }
    },
    created() {
      this.passData();
    },
  }

  function createLookMap(key, value, jsonArr) {
    let map = {}
    for (let i = 0; i < jsonArr.length; i++) {
      let item = jsonArr[i]
      let mapKey = item[key]
      let mapValue = item[value]
      map[mapKey] = mapValue
    }
    return map
  }

</script>
