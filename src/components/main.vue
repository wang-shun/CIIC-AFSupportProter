<template>
  <div class="layout" :class="{'layout-hide-text': spanLeft < 4}">
    <div class="layout-ceiling layoutMenuLeft">
      <Row type="flex" class="topFlex">
        <i-col :span="spanLeft" class="layout-menu-left">
          <div data-v-3413f463="" class="layout-menu-left ivu-col ivu-col-span-4"></div>
        </i-col>
        <i-col :span="spanRight">
          <i-button type="text" @click="toggleClick">
            <Icon type="navicon" size="32"></Icon>
          </i-button>
          <i-button type="text" @click="backToHome">
            <Icon type="ios-home" size="32"></Icon>
          </i-button>
          <Dropdown transfer @on-click="routerToCenter">
            <Button type="primary">
              快速导航
              <Icon type="arrow-down-b"></Icon>
            </Button>
              <DropdownMenu slot="list">
                <DropdownItem :name="drop.url" v-for="(drop, index) in drops" :key="index">{{drop.label}}</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          <div class="layout-ceiling-main Badge">
            <ul>
              <li>
                <a :href="`${ipPrefix}:8100/#/pending_approves`">
                  <Badge dot>
                    <Tooltip content="" placement="bottom" transfer>
                      <Icon type="ios-compose-outline" :size="size"></Icon>
                      <div slot="content">
                        <p>我的审批</p>
                      </div>
                    </Tooltip>
                  </Badge>
                </a>
              </li>
              <li>
                <Badge dot>
                  <Poptip trigger="hover" title="" placement="bottom" transfer>
                    <Icon type="ios-list-outline" :size="size"></Icon>
                    <div slot="content">
                      <a class="inPoptip" href="javascript:;" @click="isActive = !isActive">我的任务单 {{isActive ? "▲" : "▼"}}</a>
                      <div :class="[isActive ? 'changeToH' : 'changeToZ', 'myTaskList']">
                        <a :href="task.url" v-for="(task, index) in tasks" :key="index">{{task.label}}</a>
                      </div>
                    </div>
                  </Poptip>
                </Badge>
              </li>
              <li>
                <a href="javascript:;" @click="openMessageBox">
                  <Badge count="3" overflow-count="99">
                    <Tooltip trigger="hover" title="" content="站内信" placement="bottom" transfer>
                      <Icon type="ios-email-outline" :size="size"></Icon>
                    </Tooltip>
                  </Badge>
                </a>
              </li>
              <li>
                <Badge>
                  <Tooltip trigger="hover" title="" content="用户手册" placement="bottom" transfer>
                    <Icon type="ios-help-outline" :size="size" @on-click="openMessageBox"></Icon>
                  </Tooltip>
                </Badge>
              </li>
              <li class="userCenter">
                <Dropdown placement="bottom-start" @on-click="userCenterHandler" transfer>
                  <div class="user-panel user">
                    <div class="image">
                      <img :src="(userInfo.headPortrait !== undefined && userInfo.headPortrait !== null) ? userInfo.headPortrait : ''" alt="User Image" class="img-circle">
                      <span>{{userInfo.displayName}}</span>
                    </div>
                  </div>
                  <Dropdown-menu slot="list">
                    <Dropdown-item name="modifyPassword">修改密码</Dropdown-item>
                    <Dropdown-item divided name="logout">退出</Dropdown-item>
                  </Dropdown-menu>
                </Dropdown>
              </li>
            </ul>
          </div>
        </i-col>
      </Row>
    </div>
    <Row type="flex">
      <i-col :span="spanLeft" class="layout-menu-left">
        <Menu theme="dark" width="auto" class="menuSet" :class="{'removeArror': spanLeft < 3}" accordion
              :open-names="openNames"
              @on-open-change="onOpenChange" @on-select="onSelect" :active-name="$route.meta.activeName">
          <Submenu v-for="(item, index) in leftNavigates" :name="item.id" :key="item.id">
            <template slot="title">
              <Icon :type="item.icon" :size="size"></Icon>
              <span :class="{'layout-text':layoutOut}">{{item.key}}</span>
            </template>
            <Menu-item v-for="subitem in item.children" :name="subitem.cid" :key="subitem.cid">
              <router-link :to="{name:subitem.crouter}" v-menuInner="{set:set}" @click.native="getMenu(subitem)">{{subitem.ckey}}</router-link>
            </Menu-item>
          </Submenu>

          <!--
                    <Submenu name="1">
                      <template slot="title">
                        <Icon type="ios-paper" :size="size"></Icon>
                        <span :class="{'layout-text':layoutOut}">薪资账套维护</span>
                      </template>
                      <Menu-item name="1-1" :class="{'layout-text':layoutOut}">
                        <router-link :to="{name:'sl'}" v-menuInner="{set:set}">薪资项模板列表</router-link>
                      </Menu-item>
                    </Submenu> -->
        </Menu>
      </i-col>
      <i-col :span="spanRight">
        <div class="layout-content">
          <div class="wrapper">
            <div class="layout-breadcrumb">
              <Breadcrumb separator="">
                <Breadcrumb-item class="breadcrumbItem" @click="setIndex">
                  <Icon type="ios-home"></Icon> <router-link to="/main" id="level1" v-menuInner="{set:setIndex}" class="breadcrumbLink">{{breadCrumb1}}</router-link>
                </Breadcrumb-item>
                <Breadcrumb-item v-show="breadCrumbBoolean2" id="level2" class="breadcrumbItem"><Icon type="ios-arrow-right"></Icon> {{breadCrumb2}}</Breadcrumb-item>
                <Breadcrumb-item v-show="breadCrumbBoolean3" id="level3" class="breadcrumbItem"><Icon type="ios-location"></Icon> {{breadCrumb3}}</Breadcrumb-item>
              </Breadcrumb>
            </div>
            <div class="layout-content-main">
              <!--<transition name="fade" mode="out-in">-->
                <router-view :key="key"></router-view>
              <!--</transition>-->
            </div>
          </div>
          <div class="layout-copy">
            <span>2017 &copy; 薪酬管理工资单</span>
          </div>
        </div>
      </i-col>
    </Row>
  </div>
</template>
<script>
  import {CrossStorageClient} from 'cross-storage'
  import axios from 'axios'

  import leftN from '../data/left_navigation_data'

  const envAddress = {
    dev: 'http://localhost',
    sit: 'http://172.16.9.25',
    uat: 'http://172.16.9.60',
    prod: ''
  };
  const serverAddress = {
    dev: 'http://172.16.9.31',
    sit: 'http://172.16.9.24',
    uat: 'http://172.16.9.60',
    prod: ''
  };

  export default {
    data() {
      return {
        items: [],
        personOnline: true,
        spanLeft: 4,
        spanRight: 20,
        size: 24, //icon的大小
        layoutOut: true, //控制左側菜單的顯示隱藏,
        breadCrumb1: "首页",
        breadCrumb2: "",
        breadCrumb3: "",
        transfer: true,
        breadCrumbBoolean2: false,
        breadCrumbBoolean3: false,
        openNames: ["1"],
        activeName: '1-1',
        userName: '',
        ipPrefix: '',
        isActive: false,
        leftNavigates: {},
        userInfo: {}
      }
    },
    created() {
      this.openNames = localStorage.getItem("openNames").split("");
    },
    watch: {
      $route() {
        this.getBreadCrumb();
      },
    },
    mounted() {
      this.ipPrefix = envAddress[process.env.env];
      setTimeout(() => {
        this.userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
        this.getMenuAuth(this.userInfo.userId);
      }, 1000);
      this.getBreadCrumb();
    },
    computed: {
      drops() {
        const dropList = [
          {label: '销售中心', url: `${this.ipPrefix}:8100/#/`},
          {label: '客服中心', url: `${this.ipPrefix}:8103/#/`},
          {label: '代理中心', url: `${this.ipPrefix}:8109/#/`},
          {label: '雇员中心', url: `${this.ipPrefix}:8101/`},
          {label: '服务外包业务中心', url: `${this.ipPrefix}:8104/#/`},
          {label: '外企支持中心', url: `${this.ipPrefix}:8108/#/main/`},
          {label: '财务咨询业务中心', url: `${this.ipPrefix}:8112/#/`},
          {label: '账单中心', url: `${this.ipPrefix}:8110/#/`},
          {label: '结算中心', url: `${this.ipPrefix}:8111/#/`},
          {label: '财务咨询报表中心', url: `${this.ipPrefix}:8070/#/`},
          {label: '产品中心', url: `${this.ipPrefix}:8106/#/`},
          {label: '供应商管理中心', url: `${this.ipPrefix}:8105/#/`},
          {label: '外企内控中心', url: `${this.ipPrefix}:8107/dic_list`},
          {label: '财务咨询运营中心', url: `${this.ipPrefix}:8113/#/`}
        ];
        return dropList;
      },
      tasks() {
        const letters = [
          {label: "雇员预录用-预增", url: `${this.ipPrefix}:8101/workOrder/main/preEmploy`},
          {label: "雇员预录用-发放offer", url: `${this.ipPrefix}:8101/workOrder/main/preEmploy`},
          {label: "雇员预录用-入职体检", url: `${this.ipPrefix}:8101/workOrder/main/preEmploy`},
          {label: "雇员预录用-背景调查", url: `${this.ipPrefix}:8101/workOrder/main/preEmploy`},
          {label: "雇员新进-新入职", url: `${this.ipPrefix}:8101/workOrder/main/preEmploy`},
          {label: "雇员新进-集体转入,无需用工", url: `${this.ipPrefix}:8101/workOrder/main/preEmploy`},
          {label: "雇员变更-外地社保转上海", url: `${this.ipPrefix}:8101/workOrder/main/preEmploy`},
          {label: "雇员变更-上海社保转外地", url: `${this.ipPrefix}:8101/workOrder/main/preEmploy`},
          {label: "雇员变更-翻牌（更改用工单位）", url: `${this.ipPrefix}:8101/workOrder/main/preEmploy`},
          {label: "雇员变更-上海基数调整", url: `${this.ipPrefix}:8101/workOrder/main/preEmploy`},
          {label: "雇员变更-外地基数调整", url: `${this.ipPrefix}:8101/workOrder/main/preEmploy`},
          {label: "雇员变更-暂停缴费", url: `${this.ipPrefix}:8101/workOrder/main/preEmploy`},
          {label: "雇员变更-恢复缴费", url: `${this.ipPrefix}:8101/workOrder/main/preEmploy`},
          {label: "雇员终止-离职", url: `${this.ipPrefix}:8101/workOrder/main/preEmploy`},
          {label: "雇员终止-集体转出，无需退工", url: `${this.ipPrefix}:8101/workOrder/main/preEmploy`},
          {label: "雇员变更-人员性质转换", url: `${this.ipPrefix}:8101/workOrder/main/preEmploy`},
          {label: "雇员变更-修改用退工信息", url: `${this.ipPrefix}:8101/workOrder/main/preEmploy`}
        ];
        return letters;
      },
      key() {
        return this.$route.path.replace(/\//g, '_')
      },
      iconSize() {
        return this.spanLeft === 4 ? 24 : 24;
      }
    },
    methods: {
      toggleClick() {
        if (this.spanLeft === 4) {
          this.spanLeft = 1;
          this.spanRight = 23;
          this.size = 26;
          this.layoutOut = true; //隐藏
        } else {
          this.spanLeft = 4;
          this.spanRight = 20;
          this.size = 16;
          this.layoutOut = false;
        }
      },
      getMenu(obj){
        //社保账户管理 清除页面缓存
        if(obj.crouter=='companysocialsecuritymanage'){
            let sessionPageNum = sessionStorage.managerPageNum
            let sessionPageSize = sessionStorage.managerPageSize
          if(typeof(sessionPageNum)!='undefined'){
            sessionStorage.removeItem("managerPageNum")
          }
          if(typeof(sessionPageSize)!="undefined"){
            sessionStorage.removeItem("managerPageSize")
          }
        }
        //企业任务单页面缓存清除
        if(obj.crouter=='companyTaskList'){
          let tab = sessionStorage.companyTaskTab
          let sessionPageNum = sessionStorage.taskFiPageNum
          let sessionPageSize = sessionStorage.taskFiPageSize
          if(typeof(tab)!='undefined'){
            sessionStorage.removeItem("companyTaskTab")
          }
          if(typeof(sessionPageNum)!="undefined"){
            sessionStorage.removeItem("taskFiPageNum")
          }
          if(typeof(sessionPageSize)!="undefined"){
            sessionStorage.removeItem("taskFiPageSize")
          }
        }
        //雇员日常操作任务单页面缓存清除
        if(obj.crouter=='employeeOperatorView'){
          let tab = sessionStorage.employeeOperatorTab
          let sessionPageNum = sessionStorage.taskFiPageNum
          let sessionPageSize = sessionStorage.taskFiPageSize
          if(typeof(tab)!='undefined'){
            sessionStorage.removeItem("employeeOperatorTab")
          }
        }
      },
      onSelect(name) {
      },
      onOpenChange(name) {
        this.openNames = name;
        if (this.size == 26) {
          this.spanLeft = 4;
          this.spanRight = 20;
          this.size = 16;
          this.layoutOut = false;
        } else {
          return false;
        }
      },
      set(breadCrumb3) {
        this.breadCrumbBoolean2 = true;
        this.breadCrumbBoolean3 = true;
      },
      setIndex() {
        this.breadCrumbBoolean2 = false;
        this.breadCrumbBoolean3 = false;
      },
      getBreadCrumb() {
        if (localStorage.getItem('level2') != "undefined" && localStorage.getItem('level3') != "undefined") {
          this.breadCrumb2 = localStorage.getItem('level2');
          if (!this.$local.edits) {
            this.breadCrumb3 = localStorage.getItem('level3');
          } else {
            this.$local.edits = !this.$local.edits;
            this.breadCrumb3 = localStorage.getItem('level4');
          }
          this.breadCrumbBoolean2 = this.breadCrumbBoolean3 = true;
        }
      },
      userCenterHandler(name) {
        switch (name) {
          case 'logout':
            this.$router.push({
              name: 'login'
            });
            this.$local.save('userName', '');
            break;
        }
      },
      openMessageBox() {
        this.$Notice.open({
          desc: '<div style="max-height: 100px; overflow-y: auto;"><h3>标题1</h3><p>我是标题1的内容</p><br/><h3>标题2</h3><p>我是标题2的内容</p><br/><h3>标题3</h3><p>我是标题3的内容</p></div>',
          duration: 0
        });
      },
      backToHome() {
          window.location.href = `${this.ipPrefix}:8070/#/menu`;
      },
      routerToCenter: function(name) {
        console.log(name)
        if(name === '0')
          return;
        window.location.href = name;
      },
      getMenuAuth(userId) {
        axios({
          method: "GET",
          url: `${serverAddress[process.env.env]}:2003/api/authservice/auth/getMenuAuth/${userId}?platformId=6&hasElement=false`,
        }).then(response => {
          if(response.data.code !== 0) {
            this.$Message.error('获取角色授权失败');
          } else {
            // this.leftNavigates = leftN; // 调试时可放开此句，获得全部菜单
            this.leftNavigates = this.creatMenu(response.data.data);
          }
        })
      },
      // 此处将结构组织成满足iviewMenu的结构
      creatMenu(allMenu) {
        let menuTree = allMenu.filter(menu => {
          return menu.menuLevel === 1;
        });
        let tmpLevel2 = allMenu.filter(menu => {
          return menu.menuLevel === 2;
        });
        menuTree.forEach(level => {
          level['children'] = [];
        });
        for (let i = 0, level1Length = menuTree.length; i < level1Length; i++) {
          menuTree[i]['id'] = i + 1;
          menuTree[i]['key'] = menuTree[i].menuName;
          menuTree[i]['icon'] = menuTree[i].imageUrl;
          for (let j = 0, level2Length = tmpLevel2.length; j < level2Length; j++) {
            if (menuTree[i].menuCode === tmpLevel2[j].parentMenuCode) {
              tmpLevel2[j]['cid'] = `${i + 1}-${j + 1}`;
              tmpLevel2[j]['ckey'] = tmpLevel2[j].menuName;
              tmpLevel2[j]['crouter'] = tmpLevel2[j].linkUrl;
              menuTree[i]['children'].push(tmpLevel2[j]);
            }
          }
        }
        return menuTree;
      }
    },
    directives: {
      menuInner: {
        bind: function (el, binding, vnode, oldValue) {
          var s = JSON.stringify
          el.onclick = function () {
            //binding.value 获取data中绑定的值
            binding.value.set(s(el.innerText));
          };
        }
      }
    },
    beforeRouteEnter: (to, from, next) => {
      next((vm) => {
        vm.userName = vm.$local.fetch('userName');
        // console.log(data);
      })
    }
  }

</script>
<style scoped>
  .layout {
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

  .layout-logo {
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }

  .layout-header {
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
  }

  .layout-ceiling {
    /* overflow: hidden;  */
  }

  .layout-ceiling-main {
    float: right;
    /* margin-right: 15px; */
  }

  .layout-ceiling-main a {
    color: #fff;
  }

  .layout-breadcrumb {
    padding: 10px 15px 0;
  }

  .layout-content {
    min-height: 200px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
  }

  .layout-content-main {
    padding: 10px;
  }

  .layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }

  .layout-menu-left {
    background: #1a2226;
  }

  .layout-header {
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
  }

  .layout-logo-left {
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
  }

  .layout-hide-text .layout-text {
    /* animation:show 2s linear;
        -webkit-animation:show 2s linear;
        -webkit-transition: all 2s; */
    display: none;
  }

  @keyframes show {
    from {
      height: 100%;
    }
    to {
      height: 0;
    }
  }

  @-webkit-keyframes show {
    from {
      height: 100%;
    }
    to {
      height: 0;
    }
  }

  .ivu-col {
    transition: width .2s ease-in-out;
  }

  .ivu-col-span-4 {
    float: left;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto
  }

  .ivu-menu-dark {
    background: #222d32;
    border-left: 2px solid #222d32;
    border-right: none;
  }

  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu),
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu) {
    background: #1e282c;
    border-right: none;
    color: #fff;
  }

  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item:hover,
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title:hover,
  .ivu-menu-opened:hover {
    background: #1a2226;
    border-right: none;
  }

  .ivu-btn-text {
    color: #fff;
  }

  .layoutMenuLeft img {
    vertical-align: middle
  }

  .layoutMenuLeft .ivu-col {
    background: #3c8dbc;
  }

  .layoutMenuLeft .layout-menu-left {
    background: #367fa9 url(/static/img/support_center.jpg) no-repeat 100%
  }

  .ivu-badge {
    color: #fff;
    margin-right: 20px;
  }

  .logoFonts {
    color: #fff;
    font-size: 18px;
  }

  .wrapper {
    min-height: 94%;
    height: auto !important;
    height: 100%;
  }

  .bold {
    font-size: 16px;
  }

  .ivu-dropdown-item {
    width: 100%;
    text-align: center;
  }

  .ivu-tooltip-inner {
    min-width: inherit;
  }

  .breadcrumbItem {
    padding: 2px;
  }
  .breadcrumbLink {
    color: #2d8cf0;
  }


  .inPoptip {
    font-size: 12px;
    line-height: 30px;
    text-align: center;
    height: 30px;
    display: block;
    color: #666;
  }
  .inPoptip:hover {
    color: #2d8cf0;
  }

  .myTaskList {height: 0; overflow-y: auto;}
  .myTaskList a {font-size: 12px; line-height: 40px; text-align: center; color: #666; display: block; height: 40px; border-bottom: 1px dotted #eee; background: #eee;}
  .myTaskList a:hover {color: #2d8cf0;}
  .changeToH {animation: changeToHeight 0.5s ease 0s 1 alternate forwards;}
  .changeToZ {animation: changeToZero 0s ease 0s 1 alternate forwards;}
  @keyframes changeToHeight {
    from {height: 0;}
    to {height: 170px;}
  }
  @keyframes changeToZero {
    from {height: 170px;}
    to {height: 0;}
  }
</style>
