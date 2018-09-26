<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        企业社保账户管理
        <div slot="content">
          <Form ref="comAccountSearch" :model="comAccountSearch" :label-width='150'>
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="企业社保账户名称：" prop="comAccountName">
                  <Input v-model="comAccountSearch.comAccountName" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="社保账户类型：" prop="ssAccountType">
                  <Select v-model="comAccountSearch.ssAccountType" style="width: 100%;" transfer>
                    <Option value="" label="全部"></Option>
                    <Option v-for="item in accountTypeList" :value="item.key" :key="item.key" :label="item.value"></Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="企业社保账号：" prop="ssAccount">
                  <input-account v-model="comAccountSearch.ssAccount"></input-account>
                  <!-- <Input v-model="comAccountSearch.ssAccount" placeholder="请输入..."></Input> -->
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="状态：" prop="state">
                  <Select v-model="comAccountSearch.state" style="width: 100%;" transfer>
                    <Option value="" >全部</Option>
                    <Option v-for="item in stateList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户编号:" prop="companyId">
                  <Input v-model="comAccountSearch.companyId" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span:24}" class="tr">
                <Button type="primary" @click="handlePageNum(1)" icon="ios-search">查询</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>

    <Form>
      <Row class="mt20">
        <Col :sm="{span:24}" class="tr">
          <Form-item class="ml10">
            <Button type="info" @click="accExport">导出</Button>
          </Form-item>
        </Col>
      </Row>

      <Row>
        <Col :sm="{span: 24}">
          <Table border :columns="accountManageColumns" :data="accountManageData"></Table>

            <Page
            class="pageSize"
            @on-change="handlePageNum"
            @on-page-size-change="handlePageSize"
            :total="resultPageData.total"
            :page-size="resultPageData.pageSize"
            :page-size-opts="resultPageData.pageSizeOpts"
            :current="resultPageData.pageNum"
            show-sizer show-total></Page>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import EventType from '../../../store/event_types'
  import InputAccount from '../../common_control/form/input_account'
  import dict from '../../../api/dict_access/social_security_dict'
  import sessionData from '../../../api/session-data'

  export default {
    components:{InputAccount},
    data() {
      return{
        collapseInfo: [1], //展开栏
        comAccountSearch: {
          comAccountName: '',
          ssAccountType: '',
          ssAccount: '',
          companyId: '',
          state: '',
        },
        accountTypeList: [],
        stateList: [
            {value: '1', label: '有效'},
            {value: '2', label: '终止'},
            {value: '3', label: '封存'},
        ],
        accountManageData: [],
        resultPageData: {
          total: 0,
          pageNum: 1,
          pageSize: this.$utils.DEFAULT_PAGE_SIZE,
          pageSizeOpts: this.$utils.DEFAULT_PAGE_SIZE_OPTS
        },
        accountManageColumns: [
          {title: '操作', key: 'action', fixed: 'left', width: 100, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {type: 'success', size: 'small'},
                  style: {margin: '0 auto'},
                  on: {
                    click: () => {
                      sessionData.setJsonDataToSession('ssCompanyManage.comAccountSearch', this.comAccountSearch);
                      sessionData.setJsonDataToSession('ssCompanyManage.resultPageData', this.resultPageData);
                      this.$router.push({name: 'companySocialSecurity',query:{comAccountId:params.row.comAccountId}})
                    }
                  }
                }, '查看|编辑'),
              ]);
            }
          },
          {title: '企业社保账户名称', key: 'comAccountName', width: 250, fixed: 'left', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.comAccountName),
              ]);
            }
          },
          {title: '社保账户类型', key: 'ssAccountType', width: 200, fixed: 'left', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', this.$decode.accountType(params.row.ssAccountType)),
              ]);
            }
          },
          {title: '状态', key: 'state', width: 100, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.state=='0'?'初始':params.row.state=='1'?'有效':params.row.state=='2'?'终止':'封存'),
              ]);
            }
          },
          {title: '企业社保账号', key: 'ssAccount', width: 180, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.ssAccount),
              ]);
            }
          },
          {title: '开户\\转入日期', key: 'intoDate', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.intoDate),
              ]);
            }
          },
          {title: '终止日期', key: 'endDate', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.endDate),
              ]);
            }
          },
          {title: '备注说明', key: 'remark', width: 596, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.remark),
              ]);
            }
          }
        ],
        ajax:{},
      }
    },
    mounted() {
      this.ajax = this.$ajax.ajaxSsc;
      this.loadDict();
      sessionData.getJsonDataFromSession('ssCompanyManage.comAccountSearch', this.comAccountSearch);
      sessionData.getJsonDataFromSession('ssCompanyManage.resultPageData', this.resultPageData);
      //this[EventType.COMPANYSOCIALSECURITYMANAGETYPE]()
      this.queryAccount();

    },
    computed: {
      ...mapState('companySocialSecurityManage',{
          data:state => state.data
      })
    },
    methods: {
      //...mapActions('companySocialSecurityManage', [EventType.COMPANYSOCIALSECURITYMANAGETYPE]),

      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
      loadDict(){
        dict.getDictData().then(data => {
          if (data.code == 200) {
            this.accountTypeList = data.data.SocialSecurityAccountType;
          }
        });
      },
      queryAccount() {

        var params = {
          pageNum:  this.resultPageData.pageNum ,
          pageSize:  this.resultPageData.pageSize,
          params:this.comAccountSearch
        };
        this.operatorQuery(params).then(data => {
          this.accountManageData = data.data;
          this.resultPageData.total = data.total;
        })
      },
      handlePageNum(val) {
        this.resultPageData.pageNum = val;
        this.queryAccount();
      },
      handlePageSize(val) {
        this.resultPageData.pageSize = val;
        this.queryAccount();
      },

      accExport(){
        let params = this.comAccountSearch;
        this.ajax.download('/api/soccommandservice/ssComAccount/accountExport', params);
      },

      async operatorQuery (params) {
        let response = await this.ajax.post('/api/soccommandservice/ssComAccount/accountQuery', params);
        return await response.data;
      },
      ok () {

      },
      cancel () {

      }
    }
  }
</script>
