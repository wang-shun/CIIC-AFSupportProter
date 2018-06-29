<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        申请信息
        <div slot="content">
          <Form :label-width="150">
            <Row type="flex" justify="start">
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="申请单号:">{{ applyRecord.applyRecordId }}</Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="主题:">{{ applyRecord.projectTopics }}</Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="申请类别:">礼品申请</Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="申请人部门:">{{ applyRecord.contactDeptName }}</Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="申请人职位:">{{ applyRecord.contactPosition }}</Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="申请时间:">{{this.$utils.formatDate(applyRecord.applyTime, 'YYYY-MM-DD HH:mm:ss')}}</Form-item>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
      <Panel name="2">
        申请明细
        <div slot="content">
          <Form :model="gift" ref="gift" :label-width="150">
            <Row type="flex" justify="start">
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="礼品名称：">{{gift.giftName}}</Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="数量：">{{applyGiftRecord.applyNum}}</Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="单价：">{{gift.price}}</Form-item>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
      <Panel name="3" v-if="applyRecordDetail.presentingObjectType !== 4">
        赠送对象
        <div slot="content">
          <Form :label-width="150">
            <Row type="flex" justify="start">
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="对象类型：">{{this.presentingObjectTypeList(applyRecordDetail.presentingObjectType)}}</Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="姓名：">{{applyRecordDetail.contactName}}</Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="手机号：">{{applyRecordDetail.contactPhoneNum}}</Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="公司：">{{applyRecordDetail.companyName}}</Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="部门：">{{applyRecordDetail.contactDeptName}}</Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="职位：">{{applyRecordDetail.contactPosition}}</Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="公司地址：">{{applyRecordDetail.companyAddress}}</Form-item>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
      <Panel name="3" v-else>
        赠送对象
        <div slot="content">
          <Form :label-width="150">
            <Row type="flex" justify="start">
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="对象类型：">{{this.presentingObjectTypeList(applyRecordDetail.presentingObjectType)}}</Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="类型：">{{this.otherProperties(applyRecordDetail.applicantType)}}</Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="申请人：">{{applyRecordDetail.applicant}}</Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="申请人分机号：">{{applyRecordDetail.applicantExtension}}</Form-item>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
      <Panel name="4">
        审批列表
        <div slot="content">
          <Row type="flex" justify="start">
            <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Table stripe border :columns="approvalStepColumns" :data="approvalStepList" ref="approvalStepTable"></Table>
            </Col>
            <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form :model="applyRecordDetail" ref="applyRecordDetail" :label-width="150">
                <Form-item label="发放备注：">
                  <Input v-model="applyRecordDetail.sendRemark" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder=""/>
                </Form-item>
              </Form>
            </Col>
          </Row>
          <Row type="flex" justify="start">
            <Col :sm="{span: 24}" class="tr">
              <Button type="primary" @click="grantGift(2)">发放</Button>
              <Button type="error" @click="grantGift(3)">批退</Button>
              <Button type="warning" @click="back()">返回</Button>
            </Col>
          </Row>
        </div>
      </Panel>
    </Collapse>
  </div>
</template>

<script>
  import apiAjax from "../../../data/flexible_benefit/grant/grant_manager.js";

  export default {
    data() {
      return {
        collapseInfo: [1, 2, 3, 4], //展开栏
        gift: {},
        userInfo: {},
        applyRecord: {},
        applyGiftRecord: {},
        applyRecordDetail: {},
        approvalStepList: [],
        approvalStepColumns: [
          {
            title: '审批人', key: 'approverName', align: 'center',
          },
          {
            title: '审批时间', key: 'approveTime', align: 'center',
            render: (h, params) => {
              return h('div', this.$utils.formatDate(params.row.approveTime,'YYYY-MM-DD HH:mm:ss'))
            }
          },
          {
            title: '状态', key: 'approveAction', align: 'center',
          },
          {
            title: '审批意见', key: 'approveRemark', align: 'center',
          },
        ]
      }
    },
    created() {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
      let queryData = JSON.parse(sessionStorage.getItem('giftGrantFormItem'));
      this.selectGiftGrantInformation(queryData);
    },
    methods: {
      selectGiftGrantInformation(val) {
        apiAjax.queryGiftInformation(val).then(response => {
          this.gift = response.data.object.gift;
          this.applyRecord = response.data.object.applyRecord;
          this.applyGiftRecord = response.data.object.applyGiftRecord;
          this.applyRecordDetail = response.data.object.applyRecordDetail;
          this.approvalStepList = response.data.object.approvalStepList;
        }).catch(e => {
//          console.info(e.message);
          this.$Message.error("服务器异常，请稍后再试");
        });
      },
      grantGift(val) {
        this.applyRecordDetail.sendStatus = val;
        this.applyRecordDetail.sendTime = new Date();
        this.applyRecordDetail.modifiedBy = this.userInfo.loginName;
        apiAjax.giftGrantUpdate(this.applyRecordDetail).then(response => {
          if (response.data.code === 0) {
            this.$router.push({name: "grantManager"});
          } else {
            this.$Message.error("服务器异常，请稍后再试");
          }
        }).catch(e => {
//          console.info(e.message);
          this.$Message.error("服务器异常，请稍后再试");
        });
      },
      back() {
        this.$local.back();
      },
      giftTypeProperties(val) {
        switch (val) {
          case 0:
            return "票券";
            break;
          case 1:
            return "办公用品";
            break;
          case 2:
            return "生活用品";
            break;
          case 3:
            return "食品";
            break;
          case 4:
            return "饰品";
            break;
          case 5:
            return "数码周边";
            break;
          case 6:
            return "儿童用品";
            break;
        }
      },
      presentingObjectTypeList(val) {
        switch (val) {
          case 0:
            return "管理方";
            break;
          case 1:
            return "客户";
            break;
          case 2:
            return "联系人";
            break;
          case 3:
            return "雇员";
            break;
          case 4:
            return "其他";
            break;
        }
      },
      otherProperties(val) {
        switch (val) {
          case 0:
            return "个人";
            break;
          case 1:
            return "公司";
            break;
        }
      },
    }
  }
</script>
