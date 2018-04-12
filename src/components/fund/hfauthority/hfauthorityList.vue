<template>
    <div>
        <Table border :columns="authorityListColumns" :data="authorityListData" ref="authorityListData"></Table>
    </div>
</template>



<script>
    import api from '../../../api/house_fund/employee_operator'

    export default {

    data () {
      return {
        authorityListData:[],//列表数据
        authorityListColumns: [
          {
            title: '员工ID',
            align: 'center',
            key: 'userId',
            width: 230,
            render: (h, params) => {
              return h('div', [
                h('span', {
                  style: {textAlign: 'left'},
                }, params.row.userId)
              ]);
            }
          },
          {
            title: '姓名',
            align: 'center',
            key: 'displayName',
            width: 230,
            render: (h, params) => {
              return h('div', [
                h('span', {
                  style: {textAlign: 'center'},
                }, params.row.displayName)
              ]);
            }
          },
          {
            title: '工号',
            align: 'center',
            key: 'employeeNumber',
            width: 230,
            render: (h, params) => {
              return h('div', [
                h('span', {
                  style: {textAlign: 'center'},
                }, params.row.employeeNumber)
              ]);
            }
          },
          {
            title: '用户状态',
            align: 'center',
            width: 230,
            render: (h, params) => {
              return h('div', [
                h('span', {
                  style: {textAlign: 'center'},
                }, params.row.userStatus === '1' ? '未启用' : params.row.userStatus === '2' ? '启用' : '禁用')
              ]);
            }
          },
          {
            title: '邮箱',
            align: 'center',
            key: 'email',
            width: 270,
            render: (h, params) => {
              return h('div', [
                h('span', {
                  style: {textAlign: 'center'},
                }, params.row.email)
              ]);
            }
          },
          {
            title: '用户类型',
            align: 'center',
            width: 230,
            render: (h, params) => {
              return h('div', [
                h('span', {
                  style: {textAlign: 'center'},
                }, params.row.userType === '1' ? '后台管理用户' : params.row.userType === '2' ? '公有云用户' : '系统普通用户')
              ]);
            }
          },
          {
            title: '操作',
            align: 'center',
            width: 130,
            key: 'description',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {type: 'success', size: 'small'},
                  style: {margin: '0 auto'},
                  on: {
                    click: () => {

                      this.showInfo(params.row.userId,params.row.displayName,params.row.employeeNumber,params.row.userStatus,params.row.email,params.row.userType)
                    }
                  }
                }, '配置'),
              ]);
            }
          },
        ],
      }
    },

    mounted(){
      this.authorityListQuery({})
    },
    methods: {
      authorityListQuery(params){
        let self =this
        api.hfauthorityList({
          params: params,
        }).then(data => {
          self.authorityListData = data.data.rows;
        })
      },
        showInfo (userId,displayName,employeeNumber,userStatus,email,userType) {
        this.$router.push({name:'hfauthority', query: {userId: userId,displayName: displayName,employeeNumber: employeeNumber,userStatus: userStatus,email: email,userType: userType}});
      },
    }
}
</script>
