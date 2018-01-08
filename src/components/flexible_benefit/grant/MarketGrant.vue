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

    <div class="create">
      申请明细:
      <Table stripe border :columns="applyDetailColumns" :data="applyDetailData" ref="applyDetailTable"></Table>
    </div>

    <Collapse v-model="collapseInfo">
      <Panel name="2">
        审批
        <div slot="content">
          <Row>
            <Col :xs="{span: 8, offset: 1}" :lg="{ span: 8, offset: 1}">
            <Form :label-width=120>
              <Form-item label="审批意见：">
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
            title: '公司名称', key: 'date3', align: 'center',
          },
          {
            title: '联系人', key: 'date4', align: 'center',
          },
          {
            title: '部门', key: 'date5', align: 'center',
          },
          {
            title: '职位', key: 'date6', align: 'center',
          },
          {
            title: '客户服务', key: 'date7', align: 'center',
          },
          {
            title: '数量', key: 'date8', align: 'center',
          },
          {
            title: '审批后数量', key: 'date9', align: 'center',
          },
          {
            title: '审批意见', key: 'date10', align: 'center',
          },
          {
            title: '状态', key: 'date11', align: 'center',
          }
        ],
        applyDetailData: [
          {
            date1: 'AF类型',
            date2: '2942',
            date3: '白金软件',
            date4: '程杰',
            date5: '人事部',
            date6: '专员',
            date7: '何晓东',
            date8: '1',
            date9: '5',
            date10: '同意',
            date11: '已审批',
            examineData: [
              {
                date0: '21',
                date1: '何晓东',
                date2: '2017-11-15 10:56:02',
                date3: '同意申请',
                date4: '同意'
              },
              {
                date0: '22',
                date1: '赫鲁晓夫',
                date2: '2017-11-15 10:56:06',
                date3: '222',
                date4: '同意'
              }
            ],
          }, {
            date1: 'AF类型',
            date2: '5106',
            date3: '先灵葆雅',
            date4: '唐继宏',
            date5: '人事部',
            date6: '总监',
            date7: '何晓东',
            date8: '1',
            date9: '1',
            date10: '同意',
            date11: '已审批',
            examineData: [
              {
                date0: '21',
                date1: '何晓东',
                date2: '2017-11-15 10:56:02',
                date3: '同意申请',
                date4: '同意'
              },
              {
                date0: '22',
                date1: '赫鲁晓夫',
                date2: '2017-11-15 10:56:06',
                date3: '222',
                date4: '同意'
              }
            ],
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
          this.marketActivity = response.data.object.marketActivity;
          this.recordDetailList = response.data.object.recordDetailList;
          this.applyMarketActivityRecordList = response.data.object.applyMarketActivityRecordList;
        }).catch(e => {
          console.info(e.message);
          this.$Message.error("服务器异常，请稍后再试");
        });
      },
      grantMarket(val) {
        let applyInformation = {};
        applyInformation.sendStatus = val;
        applyInformation.sendRemark = this.sendRemark;
        apiAjax.grantUpdate(applyInformation).then(response => {
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
