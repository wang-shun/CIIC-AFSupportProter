<template>
  <div>
    <Table border :width="601" :columns="notesColumns" :data="notes" class="mt20"></Table>
    <Row type="flex" justify="start" class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <Button type="primary" @click="modal1 = true">新增</Button>
        <Button type="error">删除</Button>
        <Button type="primary">提交</Button>
      </Col>
    </Row>
     <Modal
        v-model="modal1"
        title="新增用工备注"
        @on-ok="ok"
        @on-cancel="cancel">
      <Form :model="handleInfo" ref="handleInfo" :label-width="150">
      <Row type="flex" justify="start">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 18}">
          <Form-item label="操作员：" prop="remarkMan">
             <Input v-model="employNote.remarkMan" placeholder="请输入"/>
          </Form-item>
        </Col>
       </Row>
       <Row type="flex" justify="start">
         <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 18}">
          <Form-item label="操作日期：" prop="remarkDate">
            <DatePicker type="date" v-model="employNote.remarkDate" transfer></DatePicker>
          </Form-item>
         </Col>
      </Row>
      <Row type="flex" justify="start">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 18}">
          <Form-item label="备注：" prop="remarkContent" transfer>
            <Input v-model="employNote.remarkContent" placeholder="请输入"/>
          </Form-item>
        </Col>
       </Row>
    </Form>
    </Modal>
  </div>
  
</template>
<script>
  export default {
    props: {
      notesData: {
        type: Array
      }
    },
    data() {
      return {
         modal1: false,
        notesColumns: [
          {title: '操作员', key: 'operator', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.operator),
              ]);
            }
          },
          {title: '操作日期', key: 'operatorDate', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.operatorDate),
              ]);
            }
          },
          {title: '备注', key: 'notes', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.notes),
              ]);
            }
          },
        ],employNote: {
          remarkContent: '',
          remarkMan: '',
          remarkDate: ''
        }
      }
    },
    computed: {
      notes() {
        return this.notesData;
      }
    },
    methods: {
            ok () {
                this.$Message.info('Clicked ok');
            },
            cancel () {
                this.$Message.info('Clicked cancel');
            }
    }
  }
</script>
