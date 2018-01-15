<template>
  <div>
    <Collapse v-model="value1" accordion>
      <Panel name="1">
        <div slot="content">
          <Form ref="queryItem" :model="queryItem" :label-width="120"> 
            <Row type="flex" justify="start">
              <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">                      
                <Form-item label="客户编号：" prop="companyCode">
                  <Input v-model="queryItem.companyCode" placeholder="请输入"/>
                </Form-item>   
              </i-col>  
              <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">                                                                                   
                <Form-item label="客户姓名：" prop="companyName">
                  <Input v-model="queryItem.companyName" placeholder="请输入"/>
                </Form-item>
              </i-col>                                   
            </Row>   
            <Row type="flex" justify="start" class="tr">  
              <i-col :sm="{span: 24}">
                <Button type="primary" @click="query" class="ml10" icon="ios-search">查询</Button>
                <Button type="warning" @click="$refs['queryItem'].resetFields()" class="ml10">重置</Button>
              </i-col>
            </Row>                                  
          </Form>                                 
        </div>           
      </Panel>
    </Collapse>

    <div class="create"></div>

    <Table border :columns="colums1" :data="companyPage" ></Table>
    <Page :current="1" :total="100" show-total show-sizer show-elevator></Page>

  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import eventType from '../../../store/event_types'

export default {
  data () {
    return {
      value1: '1',
      queryItem: {
        companyCode: '',
        companyName: ''
      },
      colums1: [
        {
          title: '客户编号',
          key: 'companyCode',
          sortable: true
        },
        {
          title: '客户名称',
          key: 'companyName'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: '200',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                style: {
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    this.$router.push({name: 'companyEdit', id: params.row.id})
                  }
                }
              }, '编辑')
            ])
          }
        }
      ]
    }
  },
  mounted () {
  },
  created () {
    this.find()
  },
  computed: {
    ...mapGetters({
      companyPage: eventType.COMPANY_PAGE_GET
    })
  },
  methods: {
    ...mapActions({
      getCompanyPage: eventType.COMPANY_PAGE_SET
    }),
    find () {
      var param = {}
      this.getCompanyPage(param)
    },
    query () {}
  }
}
</script>

<style scoped>

</style>
