<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        企业社保账户管理
        <div slot="content">
          <Form ref="comAccountCdn" :model="comAccountCdn" :label-width=150>
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="养老金用公司名称：" prop="comAccountName">
                  <Input v-model="comAccountCdn.comAccountName" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="账户类型：" prop="accountTypeValue">
                  <Select v-model="comAccountCdn.accountTypeValue" style="width: 100%;" transfer>
                    <Option v-for="item in comAccountCdn.accountTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="开户日期：" prop="taskStartTime">
                  <DatePicker v-model="comAccountCdn.taskStartTime" type="daterange" placement="bottom" placeholder="选择日期" style="width: 100%" transfer></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="企业社保账号：" prop="taskNumber">
                  <Input v-model="comAccountCdn.taskNumber" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="状态：" prop="stateValue">
                  <Select v-model="comAccountCdn.stateValue" style="width: 100%;" transfer>
                    <Option v-for="item in comAccountCdn.stateList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span:24}" class="tr">
                <Button type="primary" @click="handleQueryAccount(1)" icon="ios-search">查询</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>

    <Form>
      <Row class="mt20">
        <Col :sm="{span:24}">
          <Form-item class="ml10">
            <Button type="info" @click="">导出</Button>
          </Form-item>
        </Col>
      </Row>

      <Row>
        <Col :sm="{span: 24}">
          <Table border :columns="accountManageColumns" :data="accountManageData"></Table>
 
            <Page
            @on-change="handleQueryAccount"
            @on-page-size-change="handleQueryAccount"
            :total="resultPageData.total"
            :page-size="resultPageData.pageSize"
            :page-size-opts="resultPageData.pageSizeOpts"
            :current="resultPageData.pageNum"
            
            show-sizer show-total class="pageSize"></Page>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import EventType from '../../../store/EventTypes'
  
  export default {
    data() {
      return{
        collapseInfo: [1], //展开栏
        comAccountCdn: {
          pensionCompanyName: '',
          accountTypeValue: '',
          accountTypeList: [
            {value: '1', label: '中智大库'},
            {value: '2', label: '中智独立库'},
            {value: '3', label: '独立户'},
          ],
          openAccountDate: '',
          companySocialSecurityAccount: '',
          stateValue: '',
          stateList: [
            {value: '1', label: '有效'},
            {value: '2', label: '封存'},
            {value: '3', label: '终止'},
          ]
        },
        accountManageData: [],
        resultPageData: {
          total: 0,
          //pageSize: this.$utils.DEFAULT_PAGE_SIZE,
          pageSize: 5,
          pageNum: 1,
          pageSizeOpts: [5, 10]
        },
        accountManageColumns: [
          {title: '操作', key: 'action', fixed: 'left', width: 80, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {type: 'success', size: 'small'},
                  style: {margin: '0 auto'},
                  on: {
                    click: () => {
                      this.$router.push({name: 'companysocialsecurity'})
                    }
                  }
                }, '查看'),
              ]);
            }
          },
          {title: '养老金用公司名称', key: 'comAccountName', width: 250, fixed: 'left', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.comAccountName),
              ]);
            }
          },
          {title: '账户类型', key: 'ssAccountType', width: 100, fixed: 'left', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.ssAccountType),
              ]);
            }
          },
          {title: '状态', key: 'state', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.state),
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
          {title: '开户\\转入日期', key: 'checkInDate', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.checkInDate),
              ]);
            }
          },
          {title: '终止日期', key: 'endDate', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.sponsor),
              ]);
            }
          },
          {title: '备注说明', key: 'notes', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.notes),
              ]);
            }
          }
        ],
      }
    },
    mounted() {
      this[EventType.COMPANYSOCIALSECURITYMANAGETYPE]()
      this.queryAccount();
    },
    computed: {
      ...mapState('companySocialSecurityManage',{
          data:state => state.data
      })
    },
    methods: {
      ...mapActions('companySocialSecurityManage', [EventType.COMPANYSOCIALSECURITYMANAGETYPE]),
      ajax(){
        return this.$ajax.ajaxSsc;
      },
      clickQuery(){
         this.loading=true;
        //获得页面条件参数
      let params = this.getParams(1)
      let self = this
        this.operatorQuery(params).then(data=>{
           self.refreash(data)
        }).catch(error=>{
          console.log(error)
        })
      },
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
      queryAccount() {
        var params = {
          pageSize: this.resultPageData.pageSize,
          pageNum: this.resultPageData.pageNum,
          params:{
              comAccountName: this.comAccountCdn.comAccountName

          }
          
        };

        //params.params = {};

        {
         console.log(params);
          // 处理 社保起缴月份
          if (params.startMonth) {
            params.startMonth = this.$utils.formatDate(params.startMonth, 'YYYYMM');
          }

        }
    
        this.operatorQuery(params).then(data => {
          this.accountManageData = data.data;
          this.resultPageData.total = data.total;
        })
      },
      handleQueryAccount(val) {
        this.resultPageData.pageNum = val;
        this.queryAccount();
      },
      async operatorQuery (params) {
        let response = await this.ajax().post('/api/soccommandservice/ssComAccount/accountQuery', params);
        return await response.data;
      },
      ok () {

      },
      cancel () {
 
      }
    }
  }
</script>
