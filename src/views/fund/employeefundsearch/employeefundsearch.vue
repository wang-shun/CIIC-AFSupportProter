<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        雇员社保查询
        <div slot="content">
          <Form :label-width=150 ref="searchCondition" :model="searchCondition">
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客服中心：" prop="serviceCenterValue">
                  <Cascader :data="serviceCenterData" v-model="searchCondition.serviceCenterValue" trigger="hover" transfer></Cascader>
                </Form-item>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'

  export default {
    data() {
      return {
        collapseInfo: [1], //展开栏
        searchCondition: {
          serviceCenterValue: [],
        },
        serviceCenterData: [
          {value: 1, label: '大客户', children: [{value: '1-1', label: '大客户1'}, {value: '1-2', label: '大客户2'}]},
          {value: 2, label: '日本客户'},
          {value: 3, label: '虹桥'},
          {value: 4, label: '浦东'},
          {value: 5, label: '东区1'},
          {value: 6, label: '东区2'}
        ], //服务中心
      }
    }
  }
</script>
