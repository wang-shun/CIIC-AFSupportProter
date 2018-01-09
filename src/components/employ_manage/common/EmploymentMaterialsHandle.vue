<template>
  <div>
    <Form :model="handleInfo" ref="handleInfo" :label-width="150">
      <Row justify="start">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="预留档案编号：" prop="reservedFileNumberValue">
            <Select v-model="handle.reservedFileNumberValue" transfer>
              <Option v-for="(reservedFileNumber, index) in reservedFileNumberList" :key="index">{{reservedFileNumber}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="档案编号：" prop="fileNumberValue" transfer>
            <Select v-model="handle.fileNumberValue">
              <Option v-for="(fileNumber, index) in fileNumberList" :key="index">{{fileNumber}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="存档地：" prop="filePlaceValue">
            <Select v-model="handle.filePlaceValue" transfer>
              <Option v-for="(filePlace, index) in filePlaceList" :key="index">{{filePlace}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="存档地补充：" prop="filePlaceAddValue">
            <Select v-model="handle.filePlaceAddValue" transfer>
              <Option v-for="(filePlaceAdd, index) in filePlaceAddList" :key="index">{{filePlaceAdd}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="存档地状态：" prop="placeStateValue">
            <Select v-model="handle.placeStateValue" transfer>
              <Option v-for="(placeState, index) in placeStateList" :key="index">{{placeState}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="档案号：" prop="fileNumber">
            <Input v-model="handle.fileNumber" placeholder="请输入"/>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="档案来源：" prop="fileOriginValue">
            <Select v-model="handle.fileOriginValue" transfer>
              <Option v-for="(fileOrigin, index) in fileOriginList" :key="index">{{fileOrigin}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="用工反馈：" prop="employFeedbackValue">
            <Select v-model="handle.employFeedbackValue" transfer>
              <Option v-for="(employFeedback, index) in employFeedbackList" :key="index">{{employFeedback}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="用工反馈操作日期：" prop="employFeedbackDate">
            <DatePicker type="date" v-model="handle.employFeedbackDate" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="调档反馈：" prop="transferFeedbackValue">
            <Select v-model="handle.transferFeedbackValue" transfer>
              <Option v-for="(transferFeedback, index) in transferFeedbackList" :key="index">{{transferFeedback}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="调档反馈操作日期：" prop="transferFeedbackDate">
            <DatePicker type="date" v-model="handle.transferFeedbackDate" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="UKey外借日期：" prop="UKeyBorrowDate">
            <DatePicker type="date" v-model="handle.UKeyBorrowDate" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="UKey返回日期：" prop="UKeyFeedbackDate">
            <DatePicker type="date" v-model="handle.UKeyFeedbackDate" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="户口号：" prop="accountNumber">
            <Input v-model="handle.accountNumber" placeholder="请输入"/>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="用工档案缴费至：" prop="employFilePayDate">
            <DatePicker type="date" v-model="handle.employFilePayDate" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="入库日期：" prop="inStockDate">
            <DatePicker type="date" v-model="handle.inStockDate" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="" prop="employHandleEnd">
            <Checkbox v-model="handle.employHandleEnd">录用处理结束</Checkbox>
          </Form-item>
        </Col>
      </Row>
      <Row>
        <Col :sm="{span: 24}" class="tr">
          <Button type="warning" @click="resetForm('handleInfo')">重置</Button>
          <Button type="primary">保存</Button>
          <Button type="error">批退</Button>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<script>
  export default {
    props: {
      handleInfo: {
        type: Object
      }
    },
    data() {
      return {
        reservedFileNumberList: [],
        fileNumberList: [],
        filePlaceList: [],
        filePlaceAddList: [],
        placeStateList: [],
        fileOriginList: [],
        employFeedbackList: [],
        transferFeedbackList: []
      }
    },
    methods: {
      resetForm(form) {
        this.$refs[form].resetFields();
      }
    },
    computed: {
      handle() {
        return this.handleInfo;
      }
    }
  }
</script>
