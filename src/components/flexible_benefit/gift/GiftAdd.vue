<template>
  <div class="smList">
    <Card>
      <Form :model="formItem" ref="formItem" :rules="giftValidator" :label-width="140">
        <row justify="start" type="flex">
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
          <Form-item label="礼品名称：" prop="giftName">
            <Input v-model="formItem.giftName" placeholder="请输入"/>
          </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
          <Form-item label="价格：" prop="price">
            <Input v-model="formItem.price" placeholder="请输入"/>
          </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
          <Form-item label="适用人群：" prop="rightPerson">
            <Select v-model="formItem.rightPerson" placeholder="请选择">
            <Option v-for="item in rightpersonTypes" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
          <Form-item label="礼品类型:" prop="giftType">
            <Select v-model="formItem.giftType" placeholder="请选择" transfer>
              <Option v-for="item in giftTypeProperties" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
          <Form-item label="颜色：" prop="color">
            <Input v-model="formItem.color" placeholder="白色，黑色，红色"/>
          </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
          <Form-item label="礼品数量：" prop="number">
            <InputNumber :min="0" :precision="0" v-model="formItem.number" style="width: 100%"></InputNumber>
          </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
          <Form-item label="最大申请数：" prop="applyMaxnum">
            <InputNumber :min="0" :precision="0" v-model="formItem.applyMaxnum" style="width: 100%"></InputNumber>
          </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
          <Form-item label="礼品图片：" prop="pictureUrl">
            <Upload :before-upload="handleUpload" :format="['jpg','jpeg','png']" :max-size="2048"
                    action="//jsonplaceholder.typicode.com/posts/">
              <Button type="ghost" icon="ios-cloud-upload-outline">Upload file</Button>
            </Upload>
            <div v-if="file !== null">Upload file: {{file.name}}</div>
          </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
          <Form-item label="是否New：" prop="isNew">
            <Checkbox v-model="formItem.isNew">是</Checkbox>
          </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 1 }">
          <Form-item label="礼品介绍：" prop="remarks">
            <Input v-model="formItem.remarks" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="礼品介绍不超过200个字"/>
          </Form-item>
          </Col>
        </row>
      </Form>
      <div class="tc">
        <Button type="warning" @click="back">返回</Button>
        <Button type="primary" @click="addGift()">提交</Button>
      </div>
    </Card>
  </div>
</template>

<script>
  import {mapState, mapActions, mapGetters} from "vuex"
  import EventTypes from "../../../store/EventTypes"

  export default {
    data() {
      return {
        addResult: "1",
        file: null,
        formItem: {
          giftName: "",//礼品名称
          price: 0,//价格
          rightPerson: "",//使用人群
          giftType: "",//礼品类型
          color: "",//颜色
          number: null,//数量
          applyMaxnum: null,//最大申请数量
          pictureUrl: "",//图片
          isNew: "",//是否new,
          remarks: "",//礼品介绍
        },

        rightpersonTypes: [
          {
            value: '0', label: '男士适用'
          }, {
            value: '1', label: '女士适用'
          }, {
            value: '2', label: '男女通用'
          }],

        giftTypeProperties: [
          {
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
        giftValidator: this.$Validator.giftValidator,
      };
    },
    methods: {
      ...mapActions("GIFT", [EventTypes.GIFTINSERTTYPE]),
      handleUpload(file) {
        this.file = file;
        return false;
      },
      addGift() {
        this.$refs['formItem'].validate((valid) => {
          if (valid) {
            /**上传附件表单校验*/
            if (this.file == null) {
              this.$Message.error("请上传附件");
              return;
            }
            /**传输文件的数据*/
            let data = new FormData();
            Object.keys(this.formItem).forEach(v => {
              data.append(v, this.formItem[v])
            });
            data.append('file', this.file);
            this[EventTypes.GIFTINSERTTYPE]({
              data: data,
              callback: (res) => {
                if (res.data.errorcode === "200") {
                  this.$router.push({path: '/giftApplicationManager'})
                } else {
                  this.$Message.error("服务器异常，请稍后再试");
                }
              },
              errCallback: error => {
                this.$Message.error("服务器异常，请稍后再试");
              }
            });
          }
        })
      },
      back() {
        this.$local.back();
      },
    },
    watch: {},
    created() {
    },
  }
</script>

<style>

</style>
