<template>
  <div class="smList">
    <Card>
      <Form :model="formItem" :label-width="120">
        <row>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
          <Form-item label="礼品名称：" prop="name">
            <Input v-model="formItem.giftname" placeholder="请输入"/>
          </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
          <Form-item label="价格：">
            <Input v-model="formItem.price" placeholder="请输入"/>
          </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
          <Form-item label="适用人群：">
            <Select v-model="formItem.rightperson" placeholder="请选择">
              <Option v-for="item in rightpersonTypes" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
          <Form-item label="礼品类型:">
            <Select v-model="formItem.gifttype" placeholder="请选择">
              <Option v-for="item in giftTypeProperties" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
          <Form-item label="颜色：">
            <Input v-model="formItem.color" placeholder="白色，黑色，红色"/>
          </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
          <Form-item label="礼品数量：">
            <Input v-model="formItem.number" placeholder="请输入"/>
          </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
          <Form-item label="最大申请数：">
            <Input v-model="formItem.applymaxnum" placeholder="填入0则为无限制"/>
          </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
          <Form-item label="礼品图片：">
            <Input v-model="formItem.pictureurl" placeholder="浏览"/>
          </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
          <Form-item label="是否New：">
            <Checkbox v-model="formItem.isnew">是</Checkbox>
          </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 1 }">
          <Form-item label="礼品介绍：">
            <Input v-model="formItem.remarks" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="礼品介绍不超过200个字"/>
          </Form-item>
          </Col>
        </row>
        <row>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
          备注:
          </Col>
        </row>
        <row>
          <Col :xs="{ span: 6, offset: 2 }" :lg="{ span: 6, offset: 0 }">
          1.库存为0，礼品自动下架
          </Col>
        </row>
        <row>
          <Col :xs="{ span: 6, offset: 2 }" :lg="{ span: 6, offset: 0 }">
          2.礼品在前道申请时的排序规则：
          先按是否有new标识排序，有则排在前面
          然后按创建时间排序，最新的排在前面
          </Col>
        </row>
        <row>
          <Col :xs="{ span: 6, offset: 2 }" :lg="{ span: 6, offset: 0 }">
          3. 礼品介绍不超过200个字
          </Col>
        </row>
      </Form>
      <row>
        <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
        <div class="floatRightBtns">
          <Button type="primary" @click="addGift()">提交</Button>
          <Button type="warning" @click="back">返回</Button>
        </div>
        </Col>
      </row>
    </Card>
  </div>
</template>

<script>
  import {mapState, mapActions, mapGetters} from "vuex"
  import EventTypes from "../../store/EventTypes"

  export default {
    data() {
      return {
        addResult: "1",
        formItem: {
          giftname: "",//礼品名称
          price: "",//价格
          rightperson: "",//使用人群
          gifttype: "",//礼品类型
          color: "",//颜色
          number: "",//数量
          applymaxnum: "",//最大申请数量
          pictureurl: "",//图片
          isnew: "",//是否new,
          remarks: "",//礼品介绍
        },

        rightpersonTypes: [{
          value: '0', label: '男士适用'
        }, {
          value: '1', label: '女士适用'
        }, {
          value: '2', label: '男女通用'
        }],

        giftTypeProperties: [{
          value: '0', label: '票券'
        }, {
          value: '1', label: '办公用品'
        }, {
          value: '2', label: '生活用品'
        }, {
          value: '3', label: '食品'
        }, {
          value: '4', label: '饰品'
        }, {
          value: '5', label: '数码周边'
        }, {
          value: '6', label: '儿童用品'
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
      };
    },
    methods: {
      ...mapActions("GIFT", [EventTypes.GIFTINSERTTYPE]),
      addGift() {
        this[EventTypes.GIFTINSERTTYPE]({
          data: this.formItem,
          callback: (res) => {
            if (res.data == 1) {
              this.$router.push({path: '/giftApplicationManager'})
            } else {
              this.$Message.error("服务器异常，请稍后再试");
            }
          },
          errCallback: () => {
            this.$Message.error("服务器异常，请稍后再试");
          }
        });
      },
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
      }
    },
    watch: {

    },
    created() {
    },
  }

</script>

<style>

</style>
