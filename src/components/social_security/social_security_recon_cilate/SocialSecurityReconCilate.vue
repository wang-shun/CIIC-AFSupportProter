<template>
  <div>
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        社保对账查询
        <div slot="content">
          <Form :label-width=150 ref="operatorSearchData" :model="operatorSearchData">
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="社保月份：" prop="ssMonth">
                  <Input v-model="operatorSearchData.ssMonth" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="企业社保账号：" prop="comAccountId">
                  <input-account v-model="operatorSearchData.comAccountId"></input-account>
                </Form-item>
              </Col>
              <!-- <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="服务中心：" prop="serviceCenterValue">
                  <Cascader :data="staticSearchData.serviceCenterData" v-model="operatorSearchData.serviceCenterValue" trigger="hover" transfer clearable></Cascader>
                </Form-item>
              </Col> -->
              <!-- <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="变更汇总表类型：" prop="impFileType">
                  <Select v-model="operatorSearchData.impFileType" clearable style="width: 100%;" transfer>
                    <Option v-for="item in staticSearchData.changeTableTypeValueList" :value="item.value" :key="item.value" >{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col> -->
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="差异数范围(按雇员)：">
                  <Row>
                    <Col span="10">
                      <Form-item prop="minDiffSumByEmp">
                        <Input v-model="operatorSearchData.minDiffSumByEmp" placeholder="请输最小差异数"></Input>
                      </Form-item>
                    </Col>
                    <Col span="2" offset="2">-</Col>
                    <Col span="10">
                    <Form-item prop="maxDiffSumByEmp">
                      <Input v-model="operatorSearchData.maxDiffSumByEmp" placeholder="请输入最大差异数"></Input>
                    </Form-item>
                    </Col>
                  </Row>
                </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span: 24}" class="tr">
                <Button type="primary" icon="ios-search" @click="handlePageNum(1)">查询</Button>
                <Button type="warning" @click="resetSearchCondition('operatorSearchData')">重置</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>

    <Row class="mt20">
      <Col :sm="{span: 24}">
        <!-- <Button type="info" @click="batchUpload">批量导入社保变更汇总表</Button> -->
        <Button type="info" @click="exportInfo">导出</Button>
      </Col>
    </Row>

    <Row class="mt20">
      <Col :sm="{span:24}">
        <Table stripe
          border ref="selection"
            :columns="statementColumns"
            :data="statementData"
            @on-selection-change="selectionChange">
        </Table>
        <Page
          class="pageSize"
          @on-change="handlePageNum"
          @on-page-size-change="handlePageSite"
          :total="statementPageData.total"
          :page-size="statementPageData.pageSize"
          :page-size-opts="statementPageData.pageSizeOpts"
          :current="statementPageData.pageNum"
          show-sizer show-total>
        </Page>
      </Col>
    </Row>

    <!-- 社保账户类型 模态框 -->
    <Modal
      v-model="staticSearchData.isShowAccountType"
      title="社保账户类型"
      @on-ok="ok"
      @on-cancel="cancel">
      <company-account-search-modal :sSocialSecurityTypeData="sSocialSecurityTypeData"></company-account-search-modal>
    </Modal>
    <!-- 批量上传-->
    <Modal
      v-model="isUpload"
      @on-ok="ok"
      @on-cancel="cancel">
      <div style="text-align: center;">
        <Form :label-width=150 ref="upLoadData" :model="upLoadData">
          <Row type="flex" justify="start">
            <Col :sm="{span:15}">
              <Form-item label="社保月份：" prop="ssMonth">
                <Input v-model="upLoadData.ssMonth" placeholder="请输入..."></Input>
              </Form-item>
            </Col>
          </Row>
          <Row type="flex" justify="start">
            <Col :sm="{span:15}" >
              <Form-item label="变更汇总表类型：" prop="fileType">
                <Select v-model="upLoadData.fileType" style="width: 100%;" transfer>
                  <Option v-for="item in changeTableTypeValueListOfUpload" :value="item.value" :key="item.value" >{{item.label}}</Option>
                </Select>
              </Form-item>
            </Col>
          </Row>
          <Row type="flex" justify="start">
            <Col :sm="{span:15}">
              <Form-item label="文件上传：" prop="uploadFile">
                <Upload ref="upload"
                  :show-upload-list="false"
                  :action="uploadAttr.actionUrl"
                  :data="upLoadData"
                  :before-upload="beforeUpload"
                  :accept="uploadAttr.acceptFileExtension"
                  :format="['xlsx','xls']"
                  :on-format-error="handleFormatError"
                  :on-error="handleError"
                >
                  <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
                </Upload>

              </Form-item>
            </Col>
          </Row>
        </Form>
      </div>
      <div slot="footer">
        <div v-if="this.upLoadData.file !== null">
          <Row type="flex" justify="start">
            上传文件名: {{ this.upLoadData.file.name }}
          </Row>
          <Button type="info" @click="doUpload">上传</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import customerModal from '../../common_control/CustomerModal.vue'
  import companyAccountSearchModal from '../../common_control/CompanyAccountSearchModal.vue'
  import EventType from '../../../store/event_types'
  import api from '../../../api/social_security/statement'
  import InputAccount from '../../common_control/form/input_account'

  export default {
    components: {customerModal, InputAccount,companyAccountSearchModal},
    data() {
      return {
        isUpload:false,
        changeTableTypeValueListOfUpload: [
          {value: '全部',label:'全部',isSelect: true},
          {value: 'YYS',label:'YYS(养医失)',isSelect: true},
          {value: 'GSY', label: 'GSY(工生育)',isSelect: false}
        ],//变更汇总表类型
        collapseInfo: [1], //展开栏
        //提交参数
        operatorSearchData: {
          //客服中心
          serviceCenterValue: [],
          minDiffSumByEmp: '',//最小差异数（按雇员）
          maxDiffSumByEmp: '',//最大差异数（按雇员）
          impFileType:'YYS',
          ssMonth:'',//社保月份
          comAccountId: '', //企业社保账户

        },
        sSocialSecurityTypeData: [
          {
            id: '34235329',
            name: '中智大库'
          },
          {
            id: '23434324',
            name: '中智外包'
          },
          {
            id: '56565659',
            name: '独立户-欧莱雅'
          },
          {
            id: '34543543',
            name: '独立户-迅达电梯'
          }
        ],
        //默认静态参数
        staticSearchData:{
          //客服中心选择框
          serviceCenterData: [
            {value: 1, label: '大客户', children: [{value: '1-1', label: '大客户1'}, {value: '1-2', label: '大客户2'}]},
            {value: 2, label: '日本客户'},
            {value: 3, label: '虹桥'},
            {value: 4, label: '浦东'},
            {value: 5, label: '东区1'},
            {value: 6, label: '东区2'}
          ],
          //变更汇总类型下拉默认选项
          changeTableTypeDefaultVal: 'YYS',
          //变更汇总表类型
          changeTableTypeValueList: [
            {value: '',label:'全部',isSelect: true},
            {value: 'YYS',label:'YYS(养医失)',isSelect: true},
            {value: 'GSY', label: 'GSY(工生育)',isSelect: false}
          ],
          isShowAccountType: false, //社保账户模糊块的显示
        },
        upLoadData: {
          ssMonth:'',//社保月份
          fileType:'YYS', //文件类型
          comAccountId: '', //企业社保账户
          file:''
        },
        uploadAttr: {
          actionUrl: '/api/soccommandservice/ssStatementImp/optImport',
          acceptFileExtension: '.xls,.xlsx',
        },
        statementColumns: [

          {title: '查看结果', key: 'getResult',  width: 100, align: 'center',
            render: (h, params) => {
              if (params.row.statementId && params.row.statementId != '') {
                return h('div', [
                  h('Button', {
                    props: {type: 'success', size: 'small'}, style: {margin: '0 auto'},
                    on: {
                      click: () => {
                        window.sessionStorage.setItem("statementId", params.row.statementId)
                        this.$router.push({name: 'socialSecurityReconCilateDetail'});

                        //window.sessionStorage.getItem("")
                      }
                    }
                  }, '查看'),
                ]);
              } else {
                return h('div', []);
              }
            }
          },
          {title: '导入', key: 'export', width: 100, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('A', {props: {type: 'success', size: 'small'}, style: {margin: '0 auto'},
                  on: {
                    click: () => {
                        this.batchUpload(params.row);
                    }
                  }
                }, '导入'),
              ]);
            }
          },
          {title: '社保导入文件', key: 'importFileOfSocialSecurity', width: 197, align: 'center',
            render: (h, params) => {
              //社保月份
              let ssMonth = params.row.ssMonth;
              //汇总表类型
              let changeTableType = params.row.impFileType;
              //企业账户编号
              let comAccountId = params.row.comAccountId;


              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.impFileName),
              ]);
            }
          },
          {title: '社保月份', key: 'ssMonth', width: 100, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.ssMonth),
              ]);
            }
          },
          {title: '企业社保账号名称', key: 'comAccountName', width: 250, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.comAccountName),
              ]);
            }
          },
          {title: '下载月度变更', key: 'downloadChanngeOfMonth', width: 200, align: 'center',
            render: (h, params) => {
              let changeTableType = params.row.impFileType;
              if(changeTableType=='YYS'){
                return h('div', [
                  h('A', {
                      props: {type: 'success', size: 'small'}, style: {margin: '0 auto'},
                        on: {
                          click: () => {
                              window.sessionStorage.setItem("statementId", params.row.statementId)
                              window.sessionStorage.setItem("monthEmpChangeId", params.row.monthEmpChangeId)
                              this.$router.push({name:'socialSecurityEmpChangeDetailYys'});
                          }
                        }
                      },'下载养医失'
                    ),
                ])
              }else{
                return h('div', [
                        h('A', {props: {type: 'success', size: 'small'}, style: {margin: '0 auto'},
                          on: {
                            click: () => {
                               window.sessionStorage.setItem("statementId", params.row.statementId)
                               window.sessionStorage.setItem("monthEmpChangeId", params.row.monthEmpChangeId)
                              this.$router.push({name:'socialSecurityEmpChangeDetailGsy'});
                            }
                          }
                           },'下载工生育'),
                ])
              }

            }
          },
          {title: '变更汇总表类型', key: 'impFileName', width: 150, align: 'center',
            render: (h, params) => {
              let changeTableType = params.row.impFileType;
              if(changeTableType=='YYS'){
                return h('div', {style: {textAlign: 'center'}}, [h('span', "YYS(养医失)"),]);
              }
              else{
                return h('div', {style: {textAlign: 'center'}}, [h('span', "GYS(工生育)"),]);
              }
            }
          },
          {title: '差异数（按雇员）', key: 'diffSumByEmp', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.diffSumByEmp),
              ]);
            }
          },
          {title: '对账操作人', key: 'statementUserId', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.statementUserId),
              ]);
            }
          },
          {title: '最近对账时间', key: 'statementTime', width: 160, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.statementTime),
              ]);
            }
          }
        ],
        statementData: [],
        statementPageData: {
          total: 0,
          pageNum: 1,
          pageSize: this.$utils.DEFAULT_PAGE_SIZE,
          pageSizeOpts: this.$utils.DEFAULT_PAGE_SIZE_OPTS
        }
      }
    },
    mounted() {
      //this[EventType.SOCIALSECURITYRECONCILATE]();
      this.handlePageNum(1);
    },
    computed: {
      ...mapState('socialSecurityReconcilate',{
          data:state => state.data
      })
    },
    methods: {
      ...mapActions('socialSecurityReconcilate',[EventType.SOCIALSECURITYRECONCILATE]),
      resetSearchCondition(name) {
        this.$refs[name].resetFields();
        //this.operatorSearchData.maxDiffSumByEmp = '';
      },
      ok () {

      },
      cancel () {

      },
      batchUpload(data){
        let me = this;
        me.isUpload=true
        me.upLoadData.comAccountId = data.comAccountId;
        me.upLoadData.fileType = data.impFileType;
        me.upLoadData.ssMonth = data.ssMonth;
        me.upLoadData.file = null;
      },

      beforeUpload(file) {
        this.upLoadData.file = file;
        return false;
      },
      doUpload(){
        if (this.upLoadData.comAccountId == '' || this.upLoadData.ssMonth == '') {
          this.$Message.error("请选择社保账户");
        }
        else{
          //this.upLoadData.file = file;
          api.statementBeforeUpload(this.upLoadData).then(data=>{
              if (data.code == 0) {
                this.$Message.info(data.message);
                this.isUpload=false;
                this.statementQuery();
              }
              else {
                this.$Message.error(data.message);
              }
          }).catch(error=>{
            this.$Message.error('系统异常！');
          });
          this.$refs['upload'].clearFiles();
        }
      },
      // onSuccess(response, file) {
      //   var data = response;
      //   if (data.code == 0) {
      //     this.$Message.info(data.message);
      //     this.isUpload=false;
      //     this.statementQuery();
      //   } else {
      //     this.$Message.error(data.message);
      //   }
      // },

      handleError(error, file){
        this.$Notice.warning({
          title: '文件上传失败',
          desc: '文件 ' + file.name + ' 上传失败！'
        });
      },

      handleFormatError (file) {
        this.$Notice.warning({
          title: '文件格式不正确',
          desc: '文件 ' + file.name + ' 格式不正确，请上传 xls 或 xlsx 格式的文档。'
        });
      },

      exportInfo(){
        let me = this;
        let params = {
          ssMonth:me.operatorSearchData.ssMonth,
          comAccountId:me.operatorSearchData.comAccountId,
          impFileType:me.operatorSearchData.impFileType,
          minDiffSumByEmp:me.operatorSearchData.minDiffSumByEmp,
          maxDiffSumByEmp:me.operatorSearchData.maxDiffSumByEmp
        };
        api.statementExport(params);
      },

      handlePageNum(val) {
        this.statementPageData.pageNum = val;
        this.statementQuery();
      },
      handlePageSite(val) {
        this.statementPageData.pageSize = val;
        this.statementQuery();
      },
      // 选中项发生变化时就会触发
      selectionChange(selection) {
        this.statementPageData = selection;
      },
      //查询页面数据
      statementQuery() {
        // 处理参数
        var params = {};
        {
          // 清除 '[全部]'
          params = this.$utils.clear(this.operatorSearchData);
          // 清除空字符串
          params = this.$utils.clear(params, '');
        }

        // var params = {
        //   pageSize: this.statementPageData.pageSize,
        //   pageNum: this.statementPageData.pageNum,
        //   param: this.operatorSearchData
        // };

        // 清除 '[全部]'
        //params = this.operatorSearchData;
        // 清除空字符串
        //params = this.$utils.clear(params, '');

        api.statementQuery({
          pageSize: this.statementPageData.pageSize,
          pageNum: this.statementPageData.pageNum,
          params: params,
        }).then(data => {
          this.statementData = data.data;
          this.statementPageData.total = data.total;
        })

        // api.statementQuery(params).then(data => {
        //   this.statementData = data.data;
        //   this.statementPageData.total = data.total;

        // })
      }

    }
  }
</script>
