<template>
  <div class="smList">
    <Steps :current="2">
      <Step title="选择联系人"></Step>
      <Step title="选择礼品"></Step>
      <Step title="确认信息"></Step>
    </Steps>
    <div class="create">
      <p>申请礼品列表：</p><br/>
      <Table border stripe :columns="columns1" :data="data2" ref="table"></Table>
    </div>

    <Collapse v-model="collapseInfo">
      <Panel name="1">
        确认信息
        <div slot="content">
          <Form :model="formItem" :label-width="100">
            <row>
              <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
              <Form-item label="分机号：" prop="name">
                <Input v-model="formItem.code" placeholder="请输入"/>
              </Form-item>
              </Col>
            </row>
            <row>
              <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
              <Form-item label="申请事由：" prop="name">
                <Input v-model="formItem.types" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                       placeholder="请备注礼品颜色和型号信息"/>
              </Form-item>
              </Col>
            </row>
            <row>
              <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
              <Button type="warning" @click="back">上一步</Button>
              <router-link to="/giftApplicationManager">
                <Button type="primary">提交</Button>
              </router-link>
              </Col>
            </row>
          </Form>
        </div>
      </Panel>
    </Collapse>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        collapseInfo: [1, 2, 3], //展开栏
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
        columns1: [{
          title: '礼品名称',
          sortable: true,
          key: 'employeeId'
        }, {
          title: '礼品类型',
          sortable: true,
          key: 'sss1'
        }, {
          title: '价格',
          sortable: true,
          key: 'sss2'
        }, {
          title: '数量',
          sortable: true,
          key: 'sss3'
        }],
        data2: [{
          employeeId: "中智礼品丝巾",
          sss1: "饰品",
          sss2: "300",
          sss3: "10",
        }],
        peopleTypes: [
          {
            value: '1',
            label: '票券'
          },
          {
            value: '2',
            label: '办公用品'
          },
          {
            value: '3',
            label: '生活用品'
          },
          {
            value: '4',
            label: '食品'
          },
          {
            value: '5',
            label: '饰品'
          },
          {
            value: '6',
            label: '数码周边'
          },
          {
            value: '7',
            label: '儿童用品'
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

<style>

</style>
