<template>
  <div>
    <Table border ref="payComSelection" :width="700" :columns="notesColumns" :data="notesData" class="mt20"></Table>
    <Row type="flex" justify="start" class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <Button type="primary" @click="modal1 = true">新增</Button>
        <!-- <Button type="error" @click="del()">删除</Button> -->
        <Button type="primary"  @click="instance()">提交</Button>
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
          <Form-item label="操作员：" prop="remarkManw">
             <Input v-model="handleInfo.remarkManw" placeholder="请输入"/>
          </Form-item>
        </Col>
       </Row>
       <Row type="flex" justify="start">
         <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 18}">
          <Form-item label="操作日期：" prop="remarkDatew">
            <DatePicker type="date" v-model="handleInfo.remarkDatew" transfer></DatePicker>
          </Form-item>
         </Col>
      </Row>
      <Row type="flex" justify="start">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 18}">
          <Form-item label="备注：" prop="remarkContentw" transfer>
            <Input v-model="handleInfo.remarkContentw" placeholder="请输入"/>
          </Form-item>
        </Col>
       </Row>
    </Form>
    </Modal>
  </div>
  
</template>
<script>
  import api from '../../../api/employ_manage/hire_operator'
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
          {title: '操作员', key: 'remarkMan', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.remarkMan),
              ]);
            }
          },
          {title: '操作日期', key: 'remarkDate', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.remarkDate),
              ]);
            }
          },
          {title: '备注', key: 'remarkContent', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.remarkContent),
              ]);
          }
          },
          {
            title: '操作',
            key: 'action',
            width: 100,
            align: 'center',
            render: (h, params) => {
                return h('div', [
                    h('Button', {
                        props: {
                            type: 'error',
                            size: 'small'
                        },
                        on: {
                            click: () => {
                                this.remove(params.index,params.row.remarkId)
                            }
                        }
                    }, '删除')
                ]);
            }
          }
        ],
        handleInfo: {
          remarkContentw: '',
          remarkManw: '',
          remarkDatew:''
        },realHandInfo:{
           remarkContent: '',
           remarkMan: '',
           remarkDate:'',
           employeeId:'',
           remarkType:'1'
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
              var fromData = this.$utils.clear(this.realHandInfo,'');
              if(this.handleInfo.remarkManw==''){
                 this.$Message.info('操作员不能为空');
                  return;
               }
               if(this.handleInfo.remarkDatew==''){
                  this.$Message.info('操作日期不能为空');
                  return;
               }
               if(this.handleInfo.remarkContentw==''){
                 this.$Message.info('备注内容不能为空');
                  return;
               }
               fromData.remarkDate = this.$utils.formatDate(this.handleInfo.remarkDatew, 'YYYY-MM-DD');
               fromData.remarkContent = this.handleInfo.remarkContentw;
               fromData.remarkMan = this.handleInfo.remarkManw;
               fromData.employeeId = this.$route.query.employeeId;
               
               this.notesData.push(fromData);
            },
            cancel () {
                // this.$Message.info('Clicked cancel');
            },instance() {
            if(this.notesData.length==0){
              this.$Message.success("没有提交的数据行，请新增");
              return;
            }
            api.saveAmRemark(this.notesData).then(data => {
                  if (data.data.data == true) {
                    this.$Message.success("保存成功");
                    history.go(-1);
                  } else {
                    this.$Message.error("保存失败！");
                  }
            })
          
       },show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
                })
            },
            remove (index,remarkId) {
                if(!remarkId){
                  this.notesData.splice(index, 1);
              
                }else{
                     this.$Modal.confirm({
                      title: '',
                      content: '确认删除吗?',
                      onOk:function(){

                        let params = {amRemarkId:remarkId}

                        api.deleteAmRemark(params).then(data=>{
                              history.go(-1);
                      })
                       
                      },
                      error:function(error){
                        self.$Modal.remove();
                    }
                    });
                }
                
            },del(){
                 let selection = this.$refs.payComSelection.getSelection();
                  //判断条件
                  //是否有选中列
                  if(selection.length == 0){
                    alert("没有选中的列");
                    return;
                  }
                 
                  selection.some(item => {
                       var ff = item;
                     
                  });
            },clickRow (index) {
              
            }
        
    }
  }
</script>
