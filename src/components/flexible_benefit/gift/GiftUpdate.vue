<template>
  <div class="smList">
    <Card>
      <Form :model="formItem" ref="formItem" :rules="giftValidator" :label-width="140">
        <row justify="start" type="flex" class="mt20 mr10">
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="礼品名称：" prop="giftName">
            <Input v-model="formItem.giftName" placeholder="请输入"/>
          </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="价格：" prop="price">
            <Input v-model="formItem.price" placeholder="请输入"/>
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
          <Form-item label="礼品类型：" prop="giftType">
            <Select v-model="formItem.giftType" placeholder="请选择" transfer>
              <Option v-for="item in giftTypeProperties" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="规格：" prop="color">
            <Input v-model="formItem.color"/>
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
          <Form-item label="状态" prop="status">
            <Select v-model="formItem.status" placeholder="请选择">
              <Option v-for="item in statusProperties" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
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
          <Form-item label="是否New：" prop="newTag">
            <Checkbox v-model="formItem.newTag">是</Checkbox>
          </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="礼品介绍：" prop="remarks">
            <Input v-model="formItem.remarks" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="礼品介绍不超过200个字"/>
          </Form-item>
          </Col>
        </row>
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
        id: null,
        addResult: "1",
        file: null,
        formItem: {},
        rightPersonTypes: dataSource.rightPersonTypes,

        giftTypeProperties: dataSource.giftTypeProperties,
        statusProperties: dataSource.statusProperties,
        giftValidator: this.$Validator.giftValidator,
      };
    },

    created() {
      this.formItem = this.$route.params.data;
      this.initData();
    },
    watch: {
      formItem: function (val, oldval) {
        if (this.formItem) {
          sessionStorage.setItem('updateGiftFormItem', JSON.stringify(this.formItem));
        }
      }
    },

    methods: {
      ...mapActions("GIFT", [EventTypes.GIFTUPDATETYPE]),
      initData() {
        if (!this.formItem) {
          this.formItem = JSON.parse(sessionStorage.getItem('updateGiftFormItem'));
        }
      },
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
            /**传输文件的数据*/
            let data = this.formItem;
            data.file = this.file;
            this[EventTypes.GIFTUPDATETYPE]({
              data: data,
              callback: (res) => {
                if (res.data.code === 0) {
                  this.$router.push({name: 'giftApplicationManager'})
                } else {
                  this.$Message.error("服务器异常，请稍后再试:");
                }
              },
              errCallback: (error) => {
                console.info(error.message)
                this.$Message.error("服务器异常，请稍后再试");
              }
            });
          }
        })
      },
      back() {
        this.$local.back();
      },
    }
  }

</script>

<style>

</style>
