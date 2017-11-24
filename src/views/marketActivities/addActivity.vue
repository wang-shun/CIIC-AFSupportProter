<template>
  <div class="smList">
    <Card>
      <Form :model="formItem" :label-width="120">
        <row>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
            <Form-item label="活动主题：" prop="name">
              <Input v-model="formItem.name" placeholder="请输入"/>
            </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
            <Form-item label="发布人：" prop="name">
              <Input v-model="formItem.name" placeholder="请输入"/>
            </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
            <Form-item label="礼品形式：" prop="name">
              <CheckboxGroup v-model="fruit">
                <Checkbox label="实物"></Checkbox>
                <Checkbox label="纸质票券"></Checkbox>
                <Checkbox label="电子票券"></Checkbox>
              </CheckboxGroup>
            </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
            <Form-item label="派送方式：" prop="name">
              <CheckboxGroup v-model="fruit">
                <Checkbox label="送至中心"></Checkbox>
                <Checkbox label="委托快递"></Checkbox>
              </CheckboxGroup>
            </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
            <Form :model="formItem" :label-width="100">
              <Form-item label="活动时间：">
                <DatePicker type="date" style="width: 130px;" placeholder="选择日期" ></DatePicker>
                <span style="width: 5px;" >-</span>
                <DatePicker type="date" style="width: 135px;"  placeholder="选择日期" ></DatePicker>
              </Form-item>
            </Form>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
            <Form-item label="详细内容：">
              <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."/>
            </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
          <Form-item label="状态：" prop="name">
            <Select v-model="formItem.code" style="width:200px">
              <Option value="0">进行中</Option>
              <Option value="1">已结束</Option>
            </Select>
          </Form-item>
          </Col>
        </row>
      </Form>
      <row>
        <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
          <div class="floatRightBtns">
            <router-link to="/giftApplication">
              <Button type="primary">提交</Button>
            </router-link>
            <Button type="warning" @click="back">返回</Button>
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
        peopleTypes: [
          {
            value: '1',
            label: '常规礼品申请'
          },
          {
            value: '2',
            label: '公司礼品申请'
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
