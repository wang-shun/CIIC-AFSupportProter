<template>
  <div>
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        雇员日常操作
        <div slot="content">
          <Form :label-width=150 ref="operatorSearchData" :model="operatorSearchData">
            <Row type="flex" justify="start">
                 <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="社保月份：" prop="socialsecuritymonth">
                  <Input v-model="operatorSearchData.socialsecuritymonth" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
               <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="企业社保账户：" prop="companyAccountType">
                  <Input v-model="operatorSearchData.companyAccountType" @on-focus="operatorSearchData.isShowAccountType = true" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
               <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="服务中心：" prop="serviceCenterValue">
                  <Cascader :data="operatorSearchData.serviceCenterData" v-model="operatorSearchData.serviceCenterValue" trigger="hover" transfer></Cascader>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="变更汇总表类型：" prop="changeTableTypeValue">
                  <Select v-model="operatorSearchData.changeTableTypeDefaultVal" style="width: 100%;" transfer>
                    <Option v-for="item in operatorSearchData.changeTableTypeValueList" :value="item.value" :key="item.value" >{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="差异数范围：" prop="differenceRange">
                  <Input v-model="operatorSearchData.differenceRange" placeholder="请输入..."></Input>
                </Form-item>
              </Col> 
            </Row>
            <Row>
              <Col :sm="{span: 24}" class="tr">
                <Button type="primary" icon="ios-search">查询</Button>
                <Button type="warning" @click="resetSearchCondition('operatorSearchData')">重置</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>

    <Row class="mt20">
      <Col :sm="{span: 24}">
        <Button type="info" @click="batchUpload">批量导入社保变更汇总表</Button>
        <Button type="info" @click="">导出</Button>
      </Col>
    </Row>

    <Row class="mt20">
      <Col :sm="{span:24}">
        <Table border  :columns="employeeResultColumns" :data="data.tableData"></Table>
        <Page :total="4" :page-size="5" :page-size-opts="[5, 10]" show-sizer show-total  class="pageSize"></Page>
      </Col>
    </Row>

    <!-- 企业社保账户分类 模态框 -->
    <Modal
      v-model="operatorSearchData.isShowAccountType"
      title="企业社保账户分类"
      @on-ok="ok"
      @on-cancel="cancel">
      <company-account-search-modal :sSocialSecurityTypeData="data.sSocialSecurityTypeData"></company-account-search-modal>
    </Modal>
    <!-- 批量上传-->
    <Modal
      v-model="isUpload"
      @on-ok="ok"
      @on-cancel="cancel">
      <div style="text-align: center;">
        <Form :label-width=150 ref="operatorSearchData" :model="operatorSearchData">
        <Row type="flex" justify="start">
                <Col :sm="{span:15}">
                  <Form-item label="社保月份：" prop="socialsecuritymonthOfUpload">
                  <Input v-model="socialsecuritymonthOfUpload" placeholder="请输入..."></Input>
                </Form-item>
                </Col>
          </Row>
          <Row type="flex" justify="start">
             <Col :sm="{span:15}" >
                <Form-item label="变更汇总表类型：" prop="changeTableTypeValueOfUpload">
                  <Select v-model="changeTableTypeDefaultValOfUpload" style="width: 100%;" transfer>
                    <Option v-for="item in changeTableTypeValueListOfUpload" :value="item.value" :key="item.value" >{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
            </Row>
            <Row type="flex" justify="start">
            <Col :sm="{span:15}">
             <Form-item label="批量上传：" prop="">
              <Upload action="">
                <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
              </Upload>
               </Form-item>
            </Col>
          </Row>
          </Form>
      </div>
    </Modal>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import customerModal from '../../commoncontrol/customermodal.vue'
  import companyAccountSearchModal from '../../commoncontrol/companyaccountsearchmodal.vue'
  import EventType from '../../../store/EventTypes'

  export default {
    components: {customerModal, companyAccountSearchModal},
    data() {
      return {
        isUpload:false,
        socialsecuritymonthOfUpload:'',//批量上传模块社保月份
        changeTableTypeDefaultValOfUpload: 1,//变更汇总类型下拉默认选项
           changeTableTypeValueListOfUpload: [
             {value: 1,label:'YYY(养医失)',isSelect: true},
             {value: 2, label: 'GGY(工生育)',isSelect: false}
           ],//变更汇总表类型
        collapseInfo: [1], //展开栏
        operatorSearchData: {
          serviceCenterValue: [],
          serviceCenterData: [
            {value: 1, label: '大客户', children: [{value: '1-1', label: '大客户1'}, {value: '1-2', label: '大客户2'}]},
            {value: 2, label: '日本客户'},
            {value: 3, label: '虹桥'},
            {value: 4, label: '浦东'},
            {value: 5, label: '东区1'},
            {value: 6, label: '东区2'}
          ], //客服中心
           changeTableTypeDefaultVal: 1,//变更汇总类型下拉默认选项
           changeTableTypeValueList: [
             {value: 1,label:'YYY(养医失)',isSelect: true},
             {value: 2, label: 'GGY(工生育)',isSelect: false}
           ],//变更汇总表类型
          differenceRange: '',//差异数范围
          socialsecuritymonth:'',//社保月份
          companyAccountType: '', //企业社保账户分类
          isShowAccountType: false, //社保账户模糊块的显示      
        },

        employeeResultColumns: [
           
          {title: '查看结果', key: 'getResult',  width: 100, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {props: {type: 'success', size: 'small'}, style: {margin: '0 auto'},
                  on: {
                    click: () => {
                      this.$router.push({name:'socialsecurityreconcilatedetail'});
                    }
                  }
                }, '查看'),
              ]);
            }
          },
          {title: '导入', key: 'export', width: 100, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('A', {props: {type: 'success', size: 'small'}, style: {margin: '0 auto'},
                  on: {
                    click: () => {
                      
                    }
                  }
                }, '导入'),
              ]);
            }
          },
          {title: '社保月份', key: 'SocialSecurityMonth', width: 100, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.SocialSecurityMonth),
              ]);
            }
          },
          {title: '企业社保账户分类', key: 'companySocialSecurityType', width: 250, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.companySocialSecurityType),
              ]);
            }
          },
          {title: '下载月度变更', key: 'downloadChanngeOfMonth', width: 200, align: 'center',
            render: (h, params) => {
              let changeTableType = params.row.changeTableType;
               if(changeTableType=='YYS(养医失)'){
                  return h('div', [
                        h('A', {props: {type: 'success', size: 'small'}, style: {margin: '0 auto'},
                          on: {
                            click: () => {
                              
                            }
                          }
                           },'下载养医失'),
                        ])
                   }else{
                     return h('div', [
                        h('A', {props: {type: 'success', size: 'small'}, style: {margin: '0 auto'},
                          on: {
                            click: () => {
                              
                            }
                          }
                           },'下载工生育'),
                        ])
                   }
              
            }
          },
          {title: '社保导入文件', key: 'importFileOfSocialSecurity', width: 197, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.importFileOfSocialSecurity),
              ]);
            }
          },
          {title: '变更汇总表类型', key: 'changeTableType', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.changeTableType),
              ]);
            }
          },
          {title: '差异数（按雇员）', key: 'differenceNumber', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.differenceNumber),
              ]);
            }
          },
          {title: '对账操作人', key: 'reconciliationOperator', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.reconciliationOperator),
              ]);
            }
          },
          {title: '最近对账时间', key: 'recentReconciliationTime', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.recentReconciliationTime),
              ]);
            }
          }
        ]
      }
    },
    mounted() {
      this[EventType.SOCIALSECURITYRECONCILATE]()
    },
    computed: {
      ...mapState('socialSecurityReconcilate',{
          data:state => state.data
      })
    },
    methods: {
      ...mapActions('socialSecurityReconcilate',[EventType.SOCIALSECURITYRECONCILATE]),
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
      ok () {

      },
      cancel () {

      },
      batchUpload(){
        this.isUpload=true
      }
    }
  }
</script>
