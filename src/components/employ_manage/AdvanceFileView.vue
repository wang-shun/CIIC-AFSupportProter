<template>
<div>
  <div class="smList">
    <Collapse v-model="collapseInfo">
    <Panel name="1">
        档案预增管理 查看
        <div slot="content">
          <Form :label-width=120>
            <Row class="mt20" type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="档案类型：">
                  <label>{{$route.query.reservedArchiveType}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="档案编号：">
                  <label>{{$route.query.reservedArchiveNo}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="雇员姓名：">
                  <label>{{$route.query.employeeName}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="身份证号：">
                  <label>{{$route.query.employeeIdcardNo}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="入库日期：">
                  <label>{{$route.query.enteringDate}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="档案来源：">
                  <label>{{$route.query.archiveSource}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="存档地：">
                  <label>{{$route.query.archivePlace}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 16}">
                <Form-item label="备注：">
                  <label>{{$route.query.remark}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="退回寄出地日期：">
                  <label>{{$route.query.exitThePlaceDate}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="档案操作人：">
                  <label>{{$route.query.createdBy}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="档案操作时间：">
                  <label>{{$route.query.createdTime}}</label>
                </Form-item>
              </Col>
            </Row>
            <Row class="mt20">
              <Col :sm="{span: 24}" class="tr">
                <Button type="warning" @click="goBack">返回</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>
  </div>
</div>
</template>
<script>


 
  export default {
    data () {
      return {
        collapseInfo: [1], //展开栏
      }
    },
    mounted(){
      
    },
    methods: {
      
      goBack () {
        this.$router.go(-1)
      },
    }
  }
</script>

