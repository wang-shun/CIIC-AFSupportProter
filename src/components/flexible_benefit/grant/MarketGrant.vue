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
            <span>活动申请</span>
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

    <div class="create">
      申请明细:
      <Table stripe border :columns="applyDetailColumns" :data="recordDetailList" ref="applyDetailTable"></Table>
    </div>

    <Collapse v-model="collapseInfo">
      <Panel name="2">
        审批
        <div slot="content">
          <Row>
            <Col :xs="{span: 8, offset: 1}" :lg="{ span: 8, offset: 1}">
            <Form :label-width=120>
              <Form-item label="发放备注：">
                <Input v-model="sendRemark" type="textarea" :autosize="{minRows: 3,maxRows: 5}"
                       placeholder=""/>
              </Form-item>
            </Form>
            </Col>
          </Row>
          <Row>
            <Col :xs="{span: 3, offset: 3}" :lg="{ span: 3, offset: 3}">
            <Button type="warning" @click="back()">返回</Button>
            <Button type="primary" @click="grantMarket(2)">发放</Button>
            <Button type="error" @click="grantMarket(3)">批退</Button>
            </Col>
          </Row>
        </div>
      </Panel>
    </Collapse>
  </div>
</template>

<script>
  import apiAjax from "../../../data/flexible_benefit/grant/grant_manager.js";
  import marketTableExpand from './MarketTableExpand.vue';

  export default {
    components: {marketTableExpand},
    data() {
      return {
        collapseInfo: [1, 2, 3], //展开栏
        marketActivity: {},
        applyRecord: {},
        recordDetailList: [],
        applyMarketActivityRecordList: [],
        sendRemark: "",
        applyDetailColumns: [
          {
            type: 'selection', width: 60, align: 'center'
          },
          {
            type: 'expand', width: 60, align: 'center',
            render: (h, params) => {
              return h(marketTableExpand, {
                props: {
                  examineData: params.row.examineData
                }
              })
            }
          },
          {
            title: '公司名称', key: 'companyName', align: 'center',
          },
          {
            title: '联系人', key: 'contactName', align: 'center',
          },
          {
            title: '部门', key: 'contactDeptName', align: 'center',
          },
          {
            title: '职位', key: 'contactPosition', align: 'center',
          },
          {
            //客服中心数据
            title: '客户服务', key: 'date7', align: 'center',
          },
          {
            title: '数量', key: 'number', align: 'center',
          },
          {
            title: '审批后数量', key: 'approvalNumber', align: 'center',
          },
          {
            title: '状态', key: 'approvalStatus', align: 'center',
            render: (h, params) => {
              switch (params.row.approvalStatus) {
                case 0:
                  return "审批中";
                  break;
                case 1:
                  return "同意";
                  break;
                case 2:
                  return "不同意";
                  break;
              }
            }
          }
        ],
      }
    },
    created() {
      let queryData = JSON.parse(sessionStorage.getItem('marketGrantFormItem'));
      this.selectMarketGrantInformation(queryData);
    },
    methods: {
      selectMarketGrantInformation(val) {
        apiAjax.queryMarketInformation(val).then(response => {
          this.applyRecord = response.data.object.applyRecord;
          this.recordDetailList = response.data.object.recordDetailList;
        }).catch(e => {
          console.info(e.message);
          this.$Message.error("服务器异常，请稍后再试");
        });
      },
      grantMarket(val) {
        /**
         * 遍历数据赋值
         */
        this.recordDetailList.forEach(item => {
          item.sendStatus = val;
          item.sendTime = new Date();
          item.sendRemark = this.sendRemark;
        });
        apiAjax.marketGrantUpdate(this.recordDetailList).then(response => {
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
    }
  }
</script>

<style>

</style>
