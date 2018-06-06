<template>
<div>
  <div class="smList">
    <Collapse v-model="collapseInfo">
    <Panel name="1">
        Ukey管理 查看
        <div slot="content">
          <Form :label-width=120>
            <Row class="mt20" type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="Ukey类别：">
                  <label>{{$route.query.keyType}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="Ukey编号：">
                  <label>{{$route.query.keyCode}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="档案部Ukey密码：">
                  <label>{{$route.query.keyPwd}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="Ukey状态：">
                  <label>{{$route.query.keyStatus}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="Ukey序列号：">
                  <label>{{$route.query.keySeq}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="费用：">
                  <label>{{$route.query.keyFee}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="已绑定客户编号：">
                  <label>{{$route.query.companyId}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="已绑定客户：">
                  <label>{{$route.query.companyName}}</label>
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

