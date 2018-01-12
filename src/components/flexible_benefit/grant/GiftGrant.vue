<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        申请信息
        <div slot="content">
          <Row>
            <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
            <span>申请单号: </span>
            <span>{{ applyRecord.applyRecordId }}</span>
            </Col>
            <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
            <span>主题: </span>
            <span>{{ applyRecord.projectTopics }}</span>
            </Col>
            <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
            <span>申请类别:</span>
            <span>礼品申请</span>
            </Col>
            <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
            <span>申请人部门: </span>
            <span>{{ applyRecord.contactDeptName }}</span>
            </Col>
            <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
            <span>申请人职位: </span>
            <span>{{ applyRecord.contactPosition }}</span>
            </Col>
            <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
            <span>申请时间: </span>
            <span>{{this.$utils.formatDate(applyRecord.applyTime, 'YYYY-MM-DD HH:mm:ss')}}</span>
            </Col>
          </Row>
        </div>
      </Panel>
    </Collapse>

    <div>
      <Card style="width: 100%">
        申请明细:
        <Form :model="gift" ref="gift" :label-width="140">
          <Row>
            <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
            <Form-item label="礼品名称：">
              {{gift.giftName}}
            </Form-item>
            </Col>
            <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
            <Form-item label="数量：">
              {{gift.number}}
            </Form-item>
            </Col>
            <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
            <Form-item label="单价：">
              {{gift.price}}
            </Form-item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>

    <div v-if="applyRecordDetail.presentingObjectType !== 4">
      <Card style="width: 100%">
        赠送对象:
        <Row>
          <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
          <span>对象类型: </span>
          <span>{{this.presentingObjectTypeList(applyRecordDetail.presentingObjectType)}}</span>
          </Col>
          <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
          <span>姓名: </span>
          <span>{{applyRecordDetail.contactName}}</span>
          </Col>
          <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
          <span>手机号: </span>
          <span>{{applyRecordDetail.contactPhoneNum}}</span>
          </Col>
          <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
          <span>公司: </span>
          <span>{{applyRecordDetail.companyName}}</span>
          </Col>
          <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
          <span>部门: </span>
          <span>{{applyRecordDetail.contactDeptName}}</span>
          </Col>
          <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
          <span>职位: </span>
          <span>{{applyRecordDetail.contactPosition}}</span>
          </Col>
          <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
          <span>部门: </span>
          <span>{{applyRecordDetail.contactDeptName}}</span>
          </Col>
          <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
          <span>公司地址: </span>
          <span>{{applyRecordDetail.companyAddress}}</span>
          </Col>
        </Row>
      </Card>
    </div>

    <div v-else>
      <Card style="width: 100%">
        赠送对象:
        <Row>
          <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
          <span>对象类型: </span>
          <span>{{this.presentingObjectTypeList(applyRecordDetail.presentingObjectType)}}</span>
          </Col>
          <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
          <span>类型: </span>
          <span>{{this.otherProperties(applyRecordDetail.applicantType)}}</span>
          </Col>
          <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
          <span>申请人: </span>
          <span>{{applyRecordDetail.applicant}}</span>
          </Col>
          <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
          <span>申请人分机号: </span>
          <span>{{applyRecordDetail.applicantExtension}}</span>
          </Col>
        </Row>
      </Card>
    </div>

    <Collapse v-model="collapseInfo">
      <Panel name="2">
        审批列表
        <div slot="content">
          <Row>
            <Col :xs="{span: 12, offset: 1}" :lg="{ span: 12, offset: 1}">
            <Table stripe border :columns="approvalStepColumns" :data="approvalStepList"
                   ref="approvalStepTable"></Table>
            </Col>
            <Col :xs="{span: 8, offset: 1}" :lg="{ span: 8, offset: 1}">
            <Form :model="applyRecordDetail" ref="applyRecordDetail" :label-width="140">
              <Form-item label="发放备注：">
                <Input v-model="applyRecordDetail.sendRemark" type="textarea" :autosize="{minRows: 3,maxRows: 5}"
                       placeholder=""/>
              </Form-item>
            </Form>
            </Col>
          </Row>
          <Row>
            <Col :xs="{span: 3, offset: 16}" :lg="{ span: 3, offset: 16}">
            <Button type="warning" @click="back()">返回</Button>
            <Button type="primary" @click="grantGift(2)">发放</Button>
            <Button type="error" @click="grantGift(3)">退批</Button>
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
        collapseInfo: [1, 2, 3], //展开栏
        gift: {},
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
          console.info(e.message);
          this.$Message.error("服务器异常，请稍后再试");
        });
      },
      grantGift(val) {
        this.applyRecordDetail.sendStatus = val;
        this.applyRecordDetail.sendTime = new Date();
        apiAjax.giftGrantUpdate(this.applyRecordDetail).then(response => {
          if (response.data.code === 200) {
            this.$router.push({name: "grantManager"});
          } else {
            this.$Message.error("服务器异常，请稍后再试");
          }
        }).catch(e => {
          console.info(e.message);
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
