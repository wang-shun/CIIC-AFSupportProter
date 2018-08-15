<template>
  <div>
    <Card>
      <Form :model="formItem" ref="formItem" :rules="giftValidator" :label-width="140">
        <Row justify="start" type="flex" class="mt20 mr10">
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="礼品名称：" prop="giftName">
              <Input v-model="formItem.giftName" placeholder="请输入"></Input>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="价格：" prop="price">
              <Input v-model="formItem.price" placeholder="请输入"></Input>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="适用人群：" prop="rightPerson">
              <Select v-model="formItem.rightPerson" placeholder="请选择">
                <Option v-for="item in rightPersonTypes" :value="item.value" :key="item.value">{{item.label}}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="礼品类型:" prop="giftType">
              <Select v-model="formItem.giftType" placeholder="请选择" transfer>
                <Option v-for="item in giftTypeProperties" :value="item.value" :key="item.value">{{item.label}}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="规格：" prop="color">
              <Input v-model="formItem.color"></Input>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="礼品数量：" prop="number">
              <InputNumber :min="0" :precision="0" v-model="formItem.number" style="width: 100%"></InputNumber>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="最大申请数：" prop="applyMaxnum">
              <InputNumber :min="0" :precision="0" v-model="formItem.applyMaxnum" style="width: 100%"></InputNumber>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="礼品图片：" prop="pictureUrl">
              <Upload :before-upload="handleUpload" :format="['jpg','jpeg','png']" :max-size="2048"
                      action="//jsonplaceholder.typicode.com/posts/">
                <Button type="ghost" icon="ios-cloud-upload-outline">Upload file</Button>
              </Upload>
              <div v-if="file !== null">Upload file: {{file.name}}</div>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="是否New：" prop="isNew">
              <Checkbox v-model="formItem.isNew">是</Checkbox>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="礼品介绍：" prop="remarks">
              <Input v-model="formItem.remarks" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                     placeholder="礼品介绍不超过200个字"></Input>
            </Form-item>
          </Col>
        </Row>
        <Row class="tc mt20">
          <Col :sm="{span: 24}" class="tr">
            <Button type="warning" @click="back">返回</Button>
            <Button type="primary" @click="addGift()">提交</Button>
          </Col>
        </Row>
      </Form>
    </Card>
  </div>
</template>

<script>
  import {mapState, mapActions, mapGetters} from "vuex"
  import EventTypes from "../../../store/event_types"
  import dataSource from '../../../store/modules/flexible_benefit/data_sources/gift'

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

        rightPersonTypes: dataSource.rightPersonTypes,

        giftTypeProperties: dataSource.giftTypeProperties,
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
            /**最大申请数量不能大于礼品数量*/
            if (this.formItem.applyMaxnum > this.formItem.number) {
              this.$Message.error("最大申请数量不能大于礼品数量");
              return;
            }
            this.formItem.file = this.file;
            this[EventTypes.GIFTINSERTTYPE]({
              data: this.formItem,
              callback: (res) => {
                if (res.data.code === 0) {
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
