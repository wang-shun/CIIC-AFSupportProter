<!--礼品发放Tab-->
<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        礼品管理查询
        <div slot="content">
          <Form :model="searchCondition" ref="searchCondition" :label-width=120>
            <Row class="mt20 mr10">
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="审批状态：" prop="approvalStatus">
                  <Select v-model="searchCondition.approvalStatus" :clearable="true">
                    <Option v-for="item in examineList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="发放状态：" prop="sendStatus">
                  <Select v-model="searchCondition.sendStatus" :clearable="true">
                    <Option v-for="item in grantStateList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" :clearable="true">
                <Form-item label="申请时间：" prop="applyTimeRange">
                  <DatePicker v-model="searchCondition.applyTimeRange" type="daterange" show-week-numbers
                              placement="bottom-end" placeholder="选择时间"
                              style="width: 100%"></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="所属中心：" prop="departmentId">
                  <Select v-model="searchCondition.departmentId" :clearable="true">
                    <Option v-for="item in centerList" :value="item.departmentId" :key="item.departmentId">
                      {{item.departmentName}}
                    </Option>
                  </Select>
                </Form-item>
              </Col>
            </Row>
            <Row type="flex" justify="start">
              <Col :sm="{span: 24}" class="tr">
                <Button type="primary" @click="getByPage(1)" icon="ios-search">查询</Button>
                <Button type="warning" @click="resetSearchCondition('searchCondition')">重置</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>

    <div class="tr m20">
      <Button type="info" @click="exportData()" icon="ios-download-outline">导出数据</Button>
    </div>

    <Table stripe
           border
           :columns="grantManagerColumns"
           :data="grantManagerData"
           ref="grantManagerTable"></Table>
    <Page show-elevator
          @on-change="getByPage"
          @on-page-size-change="pageSizeChange"
          :total="searchCondition.total"
          :current="searchCondition.current"
          :page-size="searchCondition.size"></Page>
  </div>
</template>

<script>
  import apiAjax from "../../../data/flexible_benefit/grant/grant_manager.js";
  import qs from "qs";

  export default {
    data() {
      return {
        collapseInfo: [1, 2, 3], //展开栏
        searchCondition: {
          approvalStatus: '', //审批状态
          sendStatus: '',  //发放状态
          applyType: 1,//申请类型：1-礼品 2-市场活动
          applyTimeRange: [],
          departmentId: null,
          current: 1,
          size: 10,
          total: 0,
        },
        grantManagerColumns: [
          {
            title: '申请单号', key: 'applyRecordId', align: 'center',
          },
          {
            title: '申请人', key: 'applicant', align: 'center',
          },
          {
            title: '项目主题', key: 'projectTopics', align: 'center',
          },
          {
            title: '申请时间', key: 'applyTime', align: 'center',
            render: (h, params) => {
              return h("div", this.$utils.formatDate(params.row.applyTime, 'YYYY-MM-DD'));
            }
          },
          {
            title: '审批状态', key: 'approvalStatus', align: 'center',
            render: (h, params) => {
              return h("div", this.getApprovalStatusName(params.row.approvalStatus));
            }
          },
          {
            title: '发放状态', key: 'sendStatus', align: 'center',
            render: (h, params) => {
              return h("div", this.getSendStatusName(params.row.sendStatus))
            }
          },
          {
            title: '操作', key: 'action', width: 200, align: 'center',
            render: (h, params) => {
              if (params.row.approvalStatus === 2 && params.row.sendStatus === 1) {
                return h('div', [
                  h('Button', {
                    props: {type: 'success', size: 'small'},
                    on: {
                      click: () => {
                        //将数据暂存在sessionStorage
                        sessionStorage.setItem('giftGrantFormItem', JSON.stringify(params.row));
                        this.$router.push({name: 'giftGrant'});
                      }
                    }
                  }, '发放')
                ]);
              }
            }
          }
        ],
        grantManagerData: [],

        examineList: [
          {
            value: '1', label: '审批中'
          },
          {
            value: '2', label: '同意'
          },
          {
            value: '3', label: '不同意'
          },
          {
            value: '4', label: '部分同意'
          }
        ],

        grantStateList: [
          {
            value: '1', label: '未处理'
          },
          {
            value: '2', label: '已发放'
          },
          {
            value: '3', label: '已批退'
          },
          {
            value: '4', label: '部分发放'
          }
        ],

        centerList: [],
      }
    },
    created() {
      this.getByPage(1);
      this.getSubDepartmentsOfLevel();
    },
    methods: {
      queryApplyList() {
        apiAjax.grantList(this.searchCondition).then(response => {
          this.grantManagerData = response.data.object.records;
          this.searchCondition.total = response.data.object.total;
        }).catch(e => {
          console.info(e.message);
          this.$Message.error("服务器异常，请稍后再试");
        });
      },
      getSubDepartmentsOfLevel() {
        apiAjax.getSubDepartmentsOfLevel().then(response => {
          this.centerList = response.data.object;
        }).catch(e => {
          console.info(e.message);
          this.$Message.error("服务器异常，请稍后再试");
        });
      },
      exportData() {
        window.location = apiAjax.fbqBasePaths + "/grantQueryService/exportApplyList?" + qs.stringify(this.searchCondition);
      },
      resetSearchCondition(name) {
        this.$refs[name].resetFields();
      },
      getByPage(val) {
        this.searchCondition.current = val;
        this.queryApplyList()
      },
      pageSizeChange(size) {
        this.searchCondition.size = size;
        this.queryApplyList()
      },
      getApprovalStatusName(approvalStatus) {
        switch (approvalStatus) {
          case 1:
            return '审批中';
          case 2:
            return '同意';
          case 3:
            return '不同意';
          case 4:
            return '部分同意';
        }
      },
      getSendStatusName(val) {
        switch (val) {
          case 1:
            return "未处理";
            break;
          case 2:
            return "已发放";
            break;
          case 3:
            return "已批退";
            break;
          case 4:
            return "部分发放";
            break;
        }
      }
    }
  }
</script>
