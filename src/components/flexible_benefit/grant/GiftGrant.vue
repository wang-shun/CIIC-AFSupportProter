<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        申请信息
        <div slot="content">
          <Form :model="applyInformation" ref="applyInformation" :label-width="140">
            <Row>
              <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
              <Form-item label="申请单号：">
                {{applyInformation.applyRecordId}}
              </Form-item>
              </Col>
              <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
              <Form-item label="填报人：">
                {{applyInformation.contactName}}
              </Form-item>
              </Col>
              <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
              <Form-item label="申请人部门：">
                {{applyInformation.contactName}}
              </Form-item>
              </Col>
              <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
              <Form-item label="申请人职位：">
                {{applyInformation.contactPosition}}
              </Form-item>
              </Col>
              <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
              <Form-item label="审批状态：">
                {{applyInformation.approvalStatus}}
              </Form-item>
              </Col>
              <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
              <Form-item label="申请时间：">
                {{this.$utils.formatDate(applyInformation.applyTime, 'YYYY-MM-DD HH:mm:ss')}}
              </Form-item>
              </Col>
              <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
              <Form-item label="主题：">
                {{applyInformation.projectTopics}}
              </Form-item>
              </Col>
              <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
              <Form-item label="分机：">
                {{applyInformation.applicantExtension}}
              </Form-item>
              </Col>
              <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
              <Form-item label="公司名称：">
                {{applyInformation.companyName}}
              </Form-item>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>

    <div class="create">
      <Card style="width: 100%">
        申请明细:
        <Form :model="applyInformation" ref="applyInformation" :label-width="140">
          <Row>
            <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
            <Form-item label="礼品名称：">
              {{applyInformation.giftName}}
            </Form-item>
            </Col>
            <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
            <Form-item label="数量：">
              {{applyInformation.number}}
            </Form-item>
            </Col>
          </Row>
          <Row>
            <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
            <Form-item label="需求时间：">
              {{applyInformation.price}}
            </Form-item>
            </Col>
            <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
            <Form-item label="单价：">
              {{applyInformation.price}}
            </Form-item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>

    <Collapse v-model="collapseInfo">
      <Panel name="2">
        审批列表
        <div slot="content">
          <Form :model="applyInformation" ref="applyInformation" :label-width="140">
            <Row>
              <Col :xs="{span: 12, offset: 1}" :lg="{ span: 12, offset: 1}">
              <Card style="width: 100%">
                <Form :model="applyInformation" ref="applyInformation" :label-width="140">
                  <Row>
                    <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
                    <Form-item label="审批人：">
                      {{applyInformation.giftName}}
                    </Form-item>
                    </Col>
                    <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
                    <Form-item label="审批时间：">
                      {{applyInformation.number}}
                    </Form-item>
                    </Col>
                  </Row>
                  <Row>
                    <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
                    <Form-item label="审批意见：">
                      {{applyInformation.price}}
                    </Form-item>
                    </Col>
                    <Col :xs="{span: 6, offset: 1}" :lg="{ span: 6, offset: 1}">
                    <Form-item label="审批标志：">
                      {{applyInformation.price}}
                    </Form-item>
                    </Col>
                  </Row>
                </Form>
              </Card>
              </Col>
              <Col :xs="{span: 8, offset: 1}" :lg="{ span: 8, offset: 1}">
              <Form-item label="发放备注：">
                <Input v-model="applyInformation.contactEmail" type="textarea" :autosize="{minRows: 3,maxRows: 5}"
                       placeholder=""/>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :xs="{span: 3, offset: 16}" :lg="{ span: 3, offset: 16}">
              <Button type="warning" @click="back()">返回</Button>
              <Button type="primary" @click="grantGift(2)">发放</Button>
              <Button type="error" @click="grantGift(3)">退批</Button>
              </Col>
            </Row>
          </Form>
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
        applyInformation: {
          giftPO: {},
          applyRecordPO: {},
          applyGiftRecordPO: {},
          applyRecordDetailPO: {},
        },
      }
    },
    created() {
      let queryData = JSON.parse(sessionStorage.getItem('giftGrantFormItem'));
      this.selectGiftGrantInformation(queryData);
    },
    methods: {
      selectGiftGrantInformation(val) {
        apiAjax.queryGiftInformation(val).then(response => {
          this.applyInformation = response.data.object;
        }).catch(e => {
          console.info(e.message);
          this.$Message.error("服务器异常，请稍后再试");
        });
      },
      grantGift(val) {
        this.applyInformation.sendStatus = val;
        apiAjax.grantGiftUpdate(this.applyInformation).then(response => {
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
    }
  }
</script>
