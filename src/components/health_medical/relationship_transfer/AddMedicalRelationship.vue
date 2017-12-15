<template>
  <div class="smList">
    <Card>
      <Form :model="transferItem" :label-width="120">
        <row>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
          <Form-item label="雇员编号：" prop="name">
            <Input v-model="transferItem.name" placeholder="请输入"/>
          </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
          <Form-item label="雇员姓名：" v-if="!onlyNum" prop="dataTypes">
            <span class="expand-value">戴敏</span>
          </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
          <Form-item label="证件号码：">
            <span class="expand-value">3100011989070101568</span>
          </Form-item>
          </Col>
        </row>
        <row>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
          <Form-item label="公司编号：">
            <span class="expand-value">29198</span>
          </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
          <Form-item label="公司名称：">
            <span class="expand-value">东莞瑞德丽邦基数咨询服务有限公司</span>
          </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
          <Form-item label="客户经理：">
            <span class="expand-value">张丽玲</span>
          </Form-item>
          </Col>
        </row>
        <row>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
          <Form-item label="转出日期：">
            <Input v-model="transferItem.name" placeholder="请输入"/>
          </Form-item>
          </Col>

          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
          <Form-item label="转出地点：">
            <Input v-model="transferItem.name" placeholder="请输入"/>
          </Form-item>
          </Col>
        </row>
        <row>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
          <Form-item label="转回日期：">
            <Input v-model="transferItem.name" placeholder="请输入"/>
          </Form-item>
          </Col>

          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
          <Form-item label="备注：">
            <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."/>

          </Form-item>
          </Col>
        </row>
      </Form>
      <row>
        <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
        <div class="floatRightBtns">
          <router-link to="/medicalRelationTransform">
            <Button type="primary">新增</Button>
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
        transferItem: {
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
        this.transferItem.disabled = false;
        if (this.transferItem.types == "computed" || this.transferItem.types == "seniorComputed" || this.transferItem.types == "fixed") {
          this.onlyNum = true;
        } else {
          this.onlyNum = false;
        }
      },
    },
  }


</script>
