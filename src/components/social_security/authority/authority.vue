<template>
<div>
<div>
  <div class="smList">
    <Collapse v-model="collapseInfo">
    <Panel name="1">
        雇员信息
        <div slot="content">
          <Form :label-width=120>
            <Row class="mt20" type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="员工ID：">
                  <label>{{$route.query.userId}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="姓名：">
                  <label>{{$route.query.displayName}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="工号：">
                  <label>{{$route.query.employeeNumber}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="用户状态：">
                  <label>{{$route.query.userStatus === '1' ? '未启用' : $route.query.userStatus === '2' ? '启用' : '禁用'}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="邮箱：">
                  <label>{{$route.query.email}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="用户类型：">
                  <label>{{$route.query.userType === '1' ? '后台管理用户' : $route.query.userType === '2' ? '公有云用户' : '系统普通用户'}}</label>
                </Form-item>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>
    <br/>
    <div class="smList">
    <Tabs v-model="currentTab" @on-click='changeTab' :animated="false">
      <TabPane label="客户" name="1">
      </TabPane>
      <TabPane label="任务单类型" name="2">
      </TabPane>
      <TabPane label="福利办理方" name="3">
      </TabPane>
    </Tabs>
  </div>
  <div v-if="currentTab === '1'">
      <Form>
        <Row class="mt20">
          <Col :sm="{span: 24}" class="tr">
            <Button type="primary" @click="saveAuth">保存</Button>
            <Button type="warning" @click="goBack">返回</Button>
          </Col>
        </Row>
        <br/>
      <Row type="flex" justify="start">
        <Col :sm="{span: 8}">
          <Card>
            <p slot="title">客户中心</p>
            <Tree :data="baseData" @on-select-change="changeTree"></Tree>
          </Card>
        </Col>
        <Col :sm="{span: 16}">
          <Card>
            <Table border :columns="authorityListColumns" :data="authorityListData" ref="authorityListSelection"></Table>
          </Card>
        </Col>
      </Row>
        <Row class="mt20">
          <Col :sm="{span: 24}" class="tr">
            <Button type="primary" @click="saveAuth">保存</Button>
            <Button type="warning" @click="goBack">返回</Button>
          </Col>
        </Row>
      </Form>
    </div>
  </div>
  <div v-if="currentTab === '2'">
      <Form>
      <Row type="flex" justify="start">
        <Col :sm="{span: 4}">
          <Card>
            <Form-item prop="taskCategorys">
              <CheckboxGroup v-model="taskCategorys" >
                <Checkbox label="1">新进</Checkbox>
                <br/>
                <Checkbox label="2">转入</Checkbox>
                <br/>
                <Checkbox label="3">调整</Checkbox>
                <br/>
                <Checkbox label="4">补缴</Checkbox>
                <br/>
                <Checkbox label="5">转出</Checkbox>
                <br/>
                <Checkbox label="6">封存</Checkbox>
                <br/>
                <Checkbox label="12">翻排新进</Checkbox>
                <br/>
                <Checkbox label="13">翻排转入</Checkbox>
                <br/>
                <Checkbox label="14">翻牌转出</Checkbox>
                <br/>
                <Checkbox label="15">翻牌封存</Checkbox>
              </CheckboxGroup>
            </Form-item>
          </Card>
        </Col>
      </Row>
      <br/>
      <Row type="flex" justify="start">
          <Col :sm="{span: 2}" class="tr">
            <Button type="primary" @click="saveAuth2">保存</Button>
            <Button type="warning" @click="goBack">返回</Button>
          </Col>
      </Row>
      </Form>
    </div>
  </div>
  <div v-if="currentTab === '3'">
      <Form>
      <Row type="flex" justify="start">
        <Col :sm="{span: 4}">
          <Card>
            <Form-item prop="welfareUnits">
              <CheckboxGroup v-model="welfareUnits" >
                <Checkbox label="3">独立户</Checkbox>
                <br/><br/>
                <Checkbox label="1">中智大库</Checkbox>
                <br/><br/>
                <Checkbox label="2">中智外包</Checkbox>
              </CheckboxGroup>
            </Form-item>
          </Card>
        </Col>
      </Row>
      <br/>
      <Row type="flex" justify="start">
          <Col :sm="{span: 2}" class="tr">
            <Button type="primary" @click="saveAuth3">保存</Button>
            <Button type="warning" @click="goBack">返回</Button>
          </Col>
      </Row>
      </Form>
    </div>
  </div>
</div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import api from '../../../api/social_security/employee_operator'
  import Utils from '../../../lib/utils';
  import dict from '../../../api/dict_access/social_security_dict'

 
  export default {
    data () {
      return {
        welfareUnits: [],
        taskCategorys: [],
        currentTab: '1',
        collapseInfo: [1], //展开栏
        baseData: [],
        currentNode: '1',
        authorityListData:[],//列表数据
        authorityListColumns: [
          {
            title: '序号',
            align: 'center',
            key: 'index',
            width: 70,
            render: (h, params) => {
              return h('div', [
                h('span', {
                  style: {textAlign: 'left'},
                }, params.index+1)
              ]);
            }
          },
          {
            title: '客户名称',
            align: 'center',
            key: 'companyName',
            width: 200,
            render: (h, params) => {
              return h('div', [
                h('span', {
                  style: {textAlign: 'left'},
                }, params.row.companyName)
              ]);
            }
          },
          {
            title: '客户编号',
            align: 'center',
            key: 'companyId',
            width: 200,
            render: (h, params) => {
              return h('div', [
                h('span', {
                  style: {textAlign: 'center'},
                }, params.row.companyId)
              ]);
            }
          },
          {
            title: '所属管理方',
            align: 'center',
            key: 'managementName',
            width: 230,
            render: (h, params) => {
              return h('div', [
                h('span', {
                  style: {textAlign: 'center'},
                }, params.row.managementName)
              ]);
            }
          },
          {
            title: '服务中心',
            align: 'center',
            key: 'serviceCenter',
            width: 230,
            render: (h, params) => {
              return h('div', [
                h('span', {
                  style: {textAlign: 'center'},
                }, params.row.serviceCenter)
              ]);
            }
          },
          {
                 key: 'companyIdss',
                 type: 'selection',
                 width: 60,
                 align: 'center',
                 fixed: 'right'
          },
        ],
      }
    },
    mounted(){
      this.loadTree();
    },
    methods: {
      changeTab(tabName) {
        switch (tabName) {
          case '1':
            this.authorityListData = [];
            this.loadTree();
            break;
          case '2':
            this.loadTaskCategory();
            break;
          case '3':
            this.loadWelfareUnit();
            break;
        }
      },

      /**
       * 加载 菜单数据
       */
      async loadTree(){
        var params = {};
        this.baseData = [];
        let self =this
        api.authorityDeptNodes({
          params: params,
        }).then(data => {
        this.baseData = data.data;
        this.shrinkTree(this.baseData, 2);
        })
      },

      shrinkTree(data, level) {
        for (let i = 0, len = data.length; i < len; i++) {
          // 展开的层数
          if (parseInt(data[i].data.departmentLevel) > level) {
            data[i]['expand'] = false;
          }
          if (data[i]['disabled']) {
            delete data[i]['disabled'];
          }
          if (data[i].children.length > 0) {
            this.shrinkTree(data[i].children, level);
          }
        }
      },
      changeTree(n){
        var node = n[0];
        // 取消选中
        if (!node) {
          return null;
        }
        this.currentNode = node.id;
        this.authorityListData = [];
        let self =this
        api.authority({
          serviceCenterId: node.id,
          userId: this.$route.query.userId,
        }).then(data => {
            if(data.data!=null){
              this.authorityListData = data.data.dtoList;
              var cids = data.data.companyIds;
              this.authorityListData.forEach(item => {
                cids.forEach(cid => {
                  if(item.companyId === cid){
                      item._checked = true;
                  }
                });
             });
            }
        })
      },
      saveAuth(){
        let getRows = this.$refs.authorityListSelection.getSelection();
          var companyIdList = [];
          getRows.forEach(row => {
            companyIdList.push(row.companyId);
          });
          let self =this
          api.saveAuthority({
            userId: this.$route.query.userId,
            serviceCenterId: this.currentNode,
            companyIds: companyIdList,
          }).then(data => {
              this.$Message.success(data.message);
          })
      },
      saveAuth3(){
        api.saveAuthorityWelfareUnit({
            userId: this.$route.query.userId,
            welfareUnits: this.welfareUnits,
          }).then(data => {
              this.$Message.success(data.message);
          })
      },
      saveAuth2(){
        api.saveAuthorityTaskCategory({
            userId: this.$route.query.userId,
            welfareUnits: this.taskCategorys,
          }).then(data => {
              this.$Message.success(data.message);
          })
      },
      loadWelfareUnit(){
        api.queryAuthorityWelfareUnit({
            userId: this.$route.query.userId,
          }).then(data => {
              this.welfareUnits = data.data.welfareUnits;
          })
      },
      loadTaskCategory(){


        
        dict.getDictData().then(data => {
          if (data.code == 200) {

            // data.data.SocialSecurityAccountType  福利办理方 字典表
            //data.data.HFLocalTaskCategory;
            //this.taskTypeList.splice(7, 1); // 去除转移任务
            
            //console.info(data.data.HFLocalTaskCategory);
            //console.info(data.data.SocialSecurityAccountType);
            //console.info(data.data.SocialSecurityStatus);
            //console.info(data.data.SocialSecurityEmployeeClassify);
            
          }
      });

        api.queryAuthorityTaskCategory({
            userId: this.$route.query.userId,
          }).then(data => {
              this.taskCategorys = data.data.welfareUnits;
          })
      },
      goBack () {
        this.$router.go(-1)
      },
    }
  }
</script>

