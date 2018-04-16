<template>
  <div>
    <Form :label-width="150">
      <Row type="flex" justify="start">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="用工反馈：">
            {{fileInfo1.employFeedback === '0' ? '空' : fileInfo1.employFeedback === '3' ? '用工成功' :
             fileInfo1.employFeedback === '10' ? '用工已办查无档' : fileInfo1.employFeedback === '4' ? '用工失败' 
             : fileInfo1.employFeedback === '11' ? 'Ukey外借' : fileInfo1.employFeedback === '5' ? '前道要求撤销用工'
              : fileInfo1.employFeedback === '12' ? '用工成功,重复任务单' : 
              fileInfo1.employFeedback === '13' ? '用工已办,前道已中止' : ''}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="用工反馈日期：">
            {{fileInfo1.employFeedbackOptDate}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="调档反馈：">
            {{fileInfo1.diaodangFeedback}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="调档反馈日期：">
          {{fileInfo1.diaodangFeedbackOptDate}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="UKey外借日期：">
          {{fileInfo1.ukeyBorrowDate}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="UKey返回日期：">
          {{fileInfo1.ukeyReturnDate}}
          </Form-item>
        </Col>
      </Row>
      
    </Form>
  </div>
</template>
<script>
import api from '../../../api/employ_manage/hire_operator'
  export default {
    props: {
      fileInfo1: {
        type: Object
      }
    },
    computed: {
      file1() {
        return this.fileInfo1;
      }
    }
  }
</script>
