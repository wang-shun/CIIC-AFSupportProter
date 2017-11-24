<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        礼品选择
        <div slot="content">
          <Form :model="formItem" :label-width="120">
            <Row>
              <Col :xs="{ span: 3, offset: 1 }" :lg="{ span: 3, offset: 1 }">
              <Form-item label="礼品类型：" prop="giftname">
                <Select v-model="formItem.giftname" placeholder="请选择">
                  <Option v-for="item in peopleTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </Form-item>
              </Col>
              <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
              <!--上下排序图标待定-->
              <Button type="info" :click="back" icon="arrow-up-c">按价格排序</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>

      <Panel name="2">
        礼品列表
        <div slot="content">
          <Form :model="formItem" :label-width="120">
            <row>
              <Col v-for="peopleType in peopleTypes" :sm="{ span: 6, offset: 1 }" :md="{ span: 3, offset: 0 }" :lg="{span: 8}">
                <Row>
                  <Col :sm="{span: 24}" style="text-align: center">
                  <img src="./u260.png"/></Col>
                </Row>
                <Row>
                  <Col :sm="{span: 24}" style="text-align: center">
                  <p class="expand-value">晨光经典按动笔</p>
                  </Col>
                </Row>
                <Row style="margin-top: 20px;">
                  <Col :sm="{span: 8}" style="text-align: center">
                  <p class="expand-value">白色，红色，黑色</p>
                  </Col>
                  <Col :sm="{span: 4}" style="text-align: center">
                  <p style="color: #ac2925">￥23.5</p>
                  </Col>
                  <Col :sm="{span: 4}" style="text-align: center">
                  <p class="expand-value">男女通用</p>
                  </Col>
                </Row>
                <Row>
                  <Col :sm="{span: 6}" style="text-align: center">
                  <Form-item label="数量：">
                    <InputNumber :max="10000" :min="1" v-model="formItem.status" style="width: 100%"></InputNumber>
                  </Form-item>
                  </Col>
                  <Col :xs="{ span: 3, offset: 6 }" :lg="{ span: 3, offset: 6 }" style="text-align: center">
                  <Button type="primary" @click="back">加入申请列表</Button>
                  </Col>
                </Row>
              </Col>
            </row>
            <row>
              <Col :xs="{ span: 3, offset: 12 }" :lg="{ span: 3, offset: 12 }">
              <Button type="warning" @click="back">返回</Button>
              <router-link to="/giftConfirm">
                <Button type="primary">下一步</Button>
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
        formItem: {
          giftname: "",
          status: 1
        },
        peopleTypes: [{
          value: '0', label: '全部'
        }, {
          value: '1', label: '票券'
        }, {
          value: '2', label: '办公用品'
        }, {
          value: '3', label: '生活用品'
        }, {
          value: '4', label: '食品'
        }, {
          value: '5', label: '饰品'
        }, {
          value: '6', label: '数码周边'
        }, {
          value: '7', label: '儿童用品'
        }],
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
    created() {
    },
    methods: {
      back() {
        this.$local.back();
      },
    },
    watch: {
      //监听路由变化 页面重载或路由跳转获取URL参数
      $route() {
        console.log("路由发生了变化");
      }
    },
  }


</script>

<style>

</style>
