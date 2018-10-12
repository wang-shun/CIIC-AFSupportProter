<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        申请信息
        <div slot="content">
          <Form :label-width="150">
            <Row class="m10">
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="申请单号: ">{{ applyRecord.applyRecordId }}</Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="主题: ">{{ applyRecord.projectTopics }}</Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="申请类别: ">活动申请</Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="申请人部门: ">{{ applyRecord.contactDeptName }}</Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="申请人职位: ">{{ applyRecord.contactPosition }}</Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="申请时间: ">{{this.$utils.formatDate(applyRecord.applyTime, 'YYYY-MM-DD')}}
                </Form-item>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
      <Panel name="2">
        申请明细
        <div slot="content">
          <Table stripe border :columns="applyDetailColumns" :data="recordDetailList"
                 @on-selection-change="getSelection" @on-expand="getExpandStatus" ref="applyDetailTable"></Table>
        </div>
      </Panel>
      <Panel name="3">
        审批
        <div slot="content">
          <Row>
            <Col :xs="{span: 8, offset: 1}" :lg="{ span: 8, offset: 1}">
              <Form :label-width=120>
                <Form-item label="发放备注：">
                  <Input v-model="sendRemark" type="textarea" :autosize="{minRows: 3,maxRows: 5}"
                         placeholder=""></Input>
                </Form-item>
              </Form>
            </Col>
          </Row>
          <Row type="flex" justify="start">
            <Col :sm="{span: 24}" class="tr">
              <Button type="primary" @click="grantMarket(2)">发放</Button>
              <Button type="error" @click="grantMarket(3)">批退</Button>
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
                  examineData: params.row.approvalStepList
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
          // {
          //   //客服中心数据
          //   title: '客户服务', key: 'date7', align: 'center',
          // },
          {
            title: '数量', key: 'number', align: 'center',
          },
          {
            title: '审批后数量', key: 'approvalNumber', align: 'center',
            render: (h, params) => {
              return h("Input", {
                props: {value: params.row.approvalNumber},
                on: {
                  'on-change': (e) => {
                    const _self = this;
                    this.$set(this.recordDetailList[params.index], 'approvalNumber', e.target.value);
                    this.selection.forEach(selector => {
                      if (selector.index === params.index) {
                        selector.approvalNumber = parseInt(e.target.value);
                      }
                    });
                  }
                }
              });
            }
          },
          {
            title: '派送地址', key: 'deliveryAddress', align: 'center',
          },
          {
            title: '审批状态', key: 'approvalStatus', align: 'center',
            render: (h, params) => {
              return h('div', this.getApprovalStatusName(params.row.approvalStatus));
            }
          },
          {
            title: '发放状态', key: 'sendStatus', align: 'center',
            render: (h, params) => {
              return h('div', this.getApprovalStatusName(params.row.sendStatus));
            }
          }
        ],
        selection: []
      }
    },
    created() {
      let queryData = JSON.parse(sessionStorage.getItem('marketGrantFormItem'));
      this.selectMarketGrantInformation(queryData);
    },
    methods: {
      getApprovalStatusName(approvalStatus) {
        switch (approvalStatus) {
          case 1:
            return '审批中';
          case 2:
            return '同意';
          case 3:
            return '不同意';
          default:
            return approvalStatus;
        }
      },
      getSendStatusName(approvalStatus) {
        switch (approvalStatus) {
          case 1:
            return "未处理";
          case 2:
            return "已发放";
          case 3:
            return "已批退";
          default:
            return approvalStatus;
        }
      },
      getSelection(selection) {
        if (selection.length > 0) {
          const _self = this;
          this.selection = selection;
          selection.forEach(selector => {
            _self.recordDetailList[selector.index]._checked = true;
          });
        }
      },
      getExpandStatus(row, status) {
        this.recordDetailList[row.index]._expanded = status;
      },
      selectMarketGrantInformation(val) {
        const CURRENT_USER = JSON.parse(window.localStorage.getItem('userInfo'));
        apiAjax.queryMarketInformation(val).then(response => {
          this.applyRecord = response.data.object.applyRecord;
          this.recordDetailList = response.data.object.recordDetailList;
          for (let i = 0, len = this.recordDetailList.length; i < len; i++) {
            this.recordDetailList[i]['index'] = i;
            this.recordDetailList[i]['_expanded'] = false;
            this.recordDetailList[i]['_checked'] = false;
            this.recordDetailList[i]['_disabled'] = this.recordDetailList[i].approvalStatus !== 2 || this.recordDetailList[i].sendStatus !== 1;
          }//for
        }).catch(e => {
          // console.info(e.message);
          this.$Message.error("服务器异常，请稍后再试");
        });
      },
      grantMarket(val) {
        /**
         * 遍历数据赋值
         */
        if (!(this.selection.length > 0)) {
          this.$Message.error("至少勾选一条记录");
          return;
        }
        this.selection.forEach(item => {
          item.sendStatus = val;
          item.sendTime = new Date();
          item.sendRemark = this.sendRemark;
        });
        apiAjax.marketGrantUpdate(this.selection).then(response => {
          if (parseInt(response.data.code) === 0) {
            let queryData = JSON.parse(sessionStorage.getItem('marketGrantFormItem'));
            setTimeout(() => {
              this.selectMarketGrantInformation(queryData);
            }, 500)
          } else {
            this.$Message.error("服务器异常，请稍后再试");
          }
        }).catch(e => {
          // console.info(e.message);
          this.$Message.error("服务器异常，请稍后再试");
        });
      },
      back() {
        this.$local.back();
      },
    }
  }
</script>
