<template>
  <div class="layout" :class="{'layout-hide-text': spanLeft < 4}">
    <div class="layout-ceiling layoutMenuLeft">
      <Row type="flex" class="topFlex">
        <i-col :span="spanLeft" class="layout-menu-left"></i-col>
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
              <!--<li>-->
                <!--<a href="http://172.16.9.25:8100/#/pending_approves">-->
                  <!--<Badge dot>-->
                    <!--<Tooltip content="" placement="bottom" transfer>-->
                      <!--<Icon type="ios-compose-outline" :size="size"></Icon>-->
                      <!--<div slot="content">-->
                        <!--<p>我的审批</p>-->
                      <!--</div>-->
                    <!--</Tooltip>-->
                  <!--</Badge>-->
                <!--</a>-->
              <!--</li>-->
              <!--<li>-->
                <!--<Badge dot>-->
                  <!--<Poptip trigger="hover" title="" placement="bottom" transfer>-->
                    <!--<Icon type="ios-list-outline" :size="size"></Icon>-->
                    <!--<div slot="content">-->
                      <!--<a class="inPoptip" href="javascript:;"-->
                      <!--&gt;我的任务单</a>-->
                      <!--&lt;!&ndash; <div :class="[isActive ? 'changeToH' : 'changeToZ', 'myTaskList']">-->
                        <!--<a :href="task.url" v-for="(task, index) in taskList" :key="index">{{task.label}}</a>-->
                      <!--</div> &ndash;&gt;-->
                    <!--</div>-->
                  <!--</Poptip>-->
                <!--</Badge>-->
              <!--</li>-->
              <!--<li>-->
                <!--<a href="javascript:;" >-->
                  <!--<Badge count="3" overflow-count="99">-->
                    <!--<Tooltip trigger="hover" title="" content="站内信" placement="bottom" transfer>-->
                      <!--<Icon type="ios-email-outline" :size="size"></Icon>-->
                    <!--</Tooltip>-->
                  <!--</Badge>-->
                <!--</a>-->
              <!--</li>-->
              <!--<li>-->
                <!--<Badge>-->
                  <!--<Tooltip trigger="hover" title="" content="用户手册" placement="bottom" transfer>-->
                    <!--<Icon type="ios-help-outline" :size="size" ></Icon>-->
                  <!--</Tooltip>-->
                <!--</Badge>-->
              <!--</li>-->
              <li>
                <div class="user-panel user">
                  <Dropdown @on-click="userCenterHandler" transfer>
                    <div>
                      <div class="image">
                        <img :src="(userInfo.headPortrait !== undefined && userInfo.headPortrait !== null) ? userInfo.headPortrait : 'static/img/defaultPortal.jpg'" alt="" />
                        <span>欢迎您！{{(userInfo.displayName !== undefined && userInfo.displayName !== null) ? userInfo.displayName : ''}}</span>
                      </div>
                    </div>
                    <Dropdown-menu slot="list">
                      <Dropdown-item name="modifyPassword">修改密码</Dropdown-item>
                      <Dropdown-item divided name="logout">退出</Dropdown-item>
                    </Dropdown-menu>
                  </Dropdown>
                </div>
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
              <router-link :to="{name:subitem.crouter}" v-menuInner="{set:set}" @click.native="getMenu(subitem)">
                {{subitem.ckey}}
              </router-link>
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
        <div class="layout-breadcrumb">
          <Breadcrumb separator="">
            <Breadcrumb-item class="breadcrumbItem" @click="setIndex">
              <Icon type="ios-home"></Icon>
              <router-link to="/main" id="level1" v-menuInner="{set:setIndex}" class="breadcrumbLink">{{breadCrumb1}}</router-link>
            </Breadcrumb-item>
            <Breadcrumb-item v-show="breadCrumbBoolean2" id="level2" class="breadcrumbItem">
              <Icon type="ios-arrow-right"></Icon>{{breadCrumb2}}
            </Breadcrumb-item>
            <Breadcrumb-item v-show="breadCrumbBoolean3" id="level3" class="breadcrumbItem">
              <Icon type="ios-location"></Icon>{{breadCrumb3}}
            </Breadcrumb-item>
          </Breadcrumb>
        </div>
        <div class="layout-content" >
          <div class="layout-content-main">
            <router-view :key="key"></router-view>
          </div>
          <div class="layout-copy">
            <span>2017 &copy; 中智上海经济技术合作有限公司</span>
          </div>
        </div>
      </i-col>
    </Row>
    <iframe id="crossFrame" class="crossFrame" src="#"></iframe>
  </div>
</template>
<script>
import { CommonApi } from '../api/common_service'
import dropMenuList from '../data/dropMenu'

const COUNT_OUT = 10

export default {
  data () {
    return {
      leftNavigates: [],
      spanLeft: 4,
      spanRight: 20,
      size: 24,
      layoutOut: true,
      breadCrumb1: "首页",
      breadCrumb2: "",
      breadCrumb3: "",
      breadCrumbBoolean2: false,
      breadCrumbBoolean3: false,
      ipPrefix: '',
      openNames: ["1"],
      activeName: '1-1',
      userInfo: {},
      isActive: false,
      platformIds: new Set(),
      postMessageInterval: {},
      postCount: 1
    }
  },
  created () {
    this.openNames = localStorage.getItem("openNames").split("")
  },
  watch: {
    $route () {
      this.getBreadCrumb()
    },
  },
  mounted () {
    this.ipPrefix = process.env.LOCAL_URL
    this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
    this.getPlatformAuth()
    this.getMenuAuth()
    this.getBreadCrumb()
  },
  computed: {
    key () {
      return this.$route.path.replace(/\//g, '_')
    },
    drops () {
      let dropMenus = []
      if (this.platformIds && [...this.platformIds].length > 0) {
        const platformIds = [...this.platformIds]
        for (let i = 0, len = platformIds.length; i < len; i++) {
          if (dropMenuList[platformIds[i]] !== undefined) {
            dropMenus.push(dropMenuList[platformIds[i]])
          }
        }
      }
      return dropMenus
    }
  },
  methods: {
    getPlatformAuth () {
      CommonApi.getPlatformAuth(this.userInfo.userId).then(res => {
        if (res.data.code === 0) {
          this.platformIds = new Set(res.data.data.replace(/\[|\]/g, '').replace(/ /g, '').split(','))
        }
      })
    },
    getMenuAuth () {
      const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
      CommonApi.getMenuAuth(userInfo.userId).then(res => {
        this.leftNavigates = this.creatMenu(res.data)
      }, e => {
        this.$Message.error('获取角色授权失败')
      })
    },
    postRouteApply (url) {
      const _self = this
      window.localStorage.setItem('currentGoTo', url)
      document.getElementById('crossFrame').src = url
      this.postMessageInterval = setInterval(() => {
        if (_self.postCount >= COUNT_OUT) {
          clearInterval(_self.postMessageInterval)
        }
        window.frames[0].postMessage(JSON.stringify(_self.userInfo), url)
        _self.postCount++
      }, 1000)
    },
    creatMenu (allMenu) {
      let menuTree = allMenu.filter(menu => {
        return menu.menuLevel === 1
      });
      let tmpLevel2 = allMenu.filter(menu => {
        return menu.menuLevel === 2
      });
      menuTree.forEach(level => {
        level['children'] = []
      });
      for (let i = 0, level1Length = menuTree.length; i < level1Length; i++) {
        menuTree[i]['id'] = i + 1
        menuTree[i]['key'] = menuTree[i].menuName
        menuTree[i]['icon'] = menuTree[i].imageUrl
        for (let j = 0, level2Length = tmpLevel2.length; j < level2Length; j++) {
          if (menuTree[i].menuCode === tmpLevel2[j].parentMenuCode) {
            tmpLevel2[j]['cid'] = `${i + 1}-${j + 1}`
            tmpLevel2[j]['ckey'] = tmpLevel2[j].menuName
            tmpLevel2[j]['crouter'] = tmpLevel2[j].linkUrl
            menuTree[i]['children'].push(tmpLevel2[j])
          }
        }
      }
      return menuTree
    },
    set (breadCrumb3) {
      this.breadCrumbBoolean2 = true
      this.breadCrumbBoolean3 = true
    },
    setIndex () {
      this.breadCrumbBoolean2 = false
      this.breadCrumbBoolean3 = false
    },
    getBreadCrumb () {
      if (localStorage.getItem('level2') != "undefined" && localStorage.getItem('level3') != "undefined") {
        this.breadCrumb2 = localStorage.getItem('level2')
        if (!this.$local.edits) {
          this.breadCrumb3 = localStorage.getItem('level3')
        } else {
          this.$local.edits = !this.$local.edits
          this.breadCrumb3 = localStorage.getItem('level4')
        }
        this.breadCrumbBoolean2 = this.breadCrumbBoolean3 = true
      }
    },
    routerToCenter (url) {
      this.postRouteApply(url)
    },
    backToHome () {
      window.location.href = process.env.TOKEN_URL
    },
    userCenterHandler (name) {
      switch (name) {
        case 'modifyPassword':
          this.modifyPassword()
          break
        case 'logout':
          this.logout()
          break
      }
    },
    modifyPassword() {
      window.location.href = `${this.ipPrefix}:8070/#/changePassword`
    },
    logout() {
      CommonApi.logout({token: this.userInfo.token}).then(res => {
        if (res.data.code === 0) {
          window.localStorage.clear()
          window.localStorage.removeItem('userInfo')
          window.location = process.env.LOGIN_URL
        }
      })
    },
    toggleClick () {
      if (this.spanLeft === 4) {
        this.spanLeft = 1
        this.spanRight = 23
        this.size = 26
        this.layoutOut = true //隐藏
      } else {
        this.spanLeft = 4
        this.spanRight = 20
        this.size = 16
        this.layoutOut = false
      }
    },
    onSelect (name) {
    },
    onOpenChange (name) {
      this.openNames = name
      if (this.size == 26) {
        this.spanLeft = 4
        this.spanRight = 20
        this.size = 16
        this.layoutOut = false
      } else {
        return false
      }
    },
    getMenu (obj) {
      //社保账户管理 清除页面缓存
      if (obj.crouter == 'companysocialsecuritymanage') {
        let sessionPageNum = sessionStorage.managerPageNum
        let sessionPageSize = sessionStorage.managerPageSize
        if (typeof(sessionPageNum) != 'undefined') {
          sessionStorage.removeItem("managerPageNum")
        }
        if (typeof(sessionPageSize) != "undefined") {
          sessionStorage.removeItem("managerPageSize")
        }
      }
      //企业任务单页面缓存清除
      if (obj.crouter == 'companyTaskList') {
        let tab = sessionStorage.companyTaskTab
        let sessionPageNum = sessionStorage.taskFiPageNum
        let sessionPageSize = sessionStorage.taskFiPageSize
        if (typeof(tab) != 'undefined') {
          sessionStorage.removeItem("companyTaskTab")
        }
        if (typeof(sessionPageNum) != "undefined") {
          sessionStorage.removeItem("taskFiPageNum")
        }
        if (typeof(sessionPageSize) != "undefined") {
          sessionStorage.removeItem("taskFiPageSize")
        }
      }
      //雇员日常操作任务单页面缓存清除
      if (obj.crouter == 'employeeOperatorView') {
        let tab = sessionStorage.employeeOperatorTab
        let sessionPageNum = sessionStorage.taskFiPageNum
        let sessionPageSize = sessionStorage.taskFiPageSize
        if (typeof(tab) != 'undefined') {
          sessionStorage.removeItem("employeeOperatorTab")
        }
      }
    },
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
.crossFrame {display: none; position: absolute; z-index: 999; top: -999px; left: -999px;}
</style>
