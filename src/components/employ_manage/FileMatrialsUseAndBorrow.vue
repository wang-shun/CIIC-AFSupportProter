<template>
  <div>
    <div class="smList">
      <Collapse v-model="collapseInfo">
        <Panel name="1">
          雇员信息
          <div slot="content">
            <Form :label-width="150">
              <Row justify="start">
                <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                  <Form-item label="雇员编号：">
                    {{employeeInfo.employeeNumber}}
                  </Form-item>
                </Col>
                <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                  <Form-item label="雇员姓名：">
                    {{employeeInfo.employeeName}}
                  </Form-item>
                </Col>
              </Row>
            </Form>
          </div>
        </Panel>
        <Panel name="2">
          材料使用
          <div slot="content">
            <Row class="mt20">
              <Col :sm="{span: 24}" class="tr">
                <Button type="primary" @click="add">新增</Button>
                <Button type="error">删除</Button>
                <Button type="primary" @click="instance">提交</Button>
              </Col>
            </Row>
            <Table border :columns="matrialsUseColumns" :data="matrialsUseData" class="mt20"></Table>
          </div>
        </Panel>
        <Panel name="3">
          材料借出
          <div slot="content">
            <Row class="mt20">
              <Col :sm="{span: 24}" class="tr">
                <Button type="primary">新增</Button>
                <Button type="error">删除</Button>
                <Button type="primary">提交</Button>
              </Col>
            </Row>
            <Table border :columns="matrialsUseColumns" :data="matrialsBorrowData" class="mt20"></Table>
          </div>
        </Panel>
      </Collapse>
    </div>
    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <Button type="warning" @click="goBack">返回</Button>
      </Col>
    </Row>
  </div>
</template>
<script>
import api from '../../api/employ_manage/hire_operator'
  export default {
    data() {
      return {
        collapseInfo: [1, 2, 3],
        employeeInfo: {
          employeeNumber: "10001",
          employeeName: "林子晖"
        },
        matrialsUseColumns: [
          {title: '使用材料', key: 'material', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('Select', [
                      h('Option', {props: {value: '档案'}},'档案'),
                      h('Option', {props: {value: '党员材料'}},'党员材料'),
                      h('Option', {props: {value: '学籍资料'}},'学籍资料'),
                      h('Option', {props: {value: '职工登记表'}},'职工登记表'),
                      h('Option', {props: {value: '劳动力登记表'}},'劳动力登记表'),
                      h('Option', {props: {value: '学生登记表'}},'学生登记表'),
                      h('Option', {props: {value: '职称评定表'}},'职称评定表'),
                      h('Option', {props: {value: '上家退工单'}},'上家退工单'),
                ], params.row.material),
              ]);
            }
          },
          {title: '用途', key: 'purpose', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('Select', [
                  h('Option', {props: {value: '归档材料'}}, '归档材料'),
                  h('Option', {props: {value: '政审'}}, '政审'),
                  h('Option', {props: {value: '档案借阅'}}, '档案借阅'),
                  h('Option', {props: {value: '认定工龄'}}, '认定工龄')
                  
                ], params.row.purpose),
              ]);
            }
          },
          {title: '使用材料人', key: 'useMan', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                 h('i-input', {props: {value: params.row.useMan}}),
              ]);
            }
          },
          {title: '使用日期', key: 'useDate', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('DatePicker', {props: {value: params.row.useDate}}),
              ]);
            }
          },
          {title: '材料使用经办人', key: 'handleMan', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('i-input', {props: {value: params.row.handleMan}}),
              ]);
            }
          },
          {title: '备注', key: 'remark', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('Input', {props: {value: params.row.remark}}),
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
            
                                this.remove(params.index,params.row.archiveUseId)
                            }
                        }
                    }, '删除')
                ]);
            }
         }
        ],
        matrialsUseData: [ ],

        matrialsBorrowColumns: [
          {title: '借出材料', key: 'borrowMatrials', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('Select', [
                   h('Option', {props: {value: '1'}},'材料不齐全'),
                      h('Option', {props: {value: '2'}},'未签收'),
                      h('Option', {props: {value: '3'}},'已签收'),
                ], params.row.borrowMatrials),
              ]);
            }
          },
          {title: '用途', key: 'useful', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('Select', [
                  h('Option', {props: {value: 0}}, '')
                ], params.row.useful),
              ]);
            }
          },
          {title: '借出材料人', key: 'matrialsBorrower', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.matrialsBorrower),
              ]);
            }
          },
          {title: '使用日期', key: 'borrowDate', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('DatePicker', {props: {value: params.row.borrowDate}}),
              ]);
            }
          },
          {title: '借出经办人', key: 'borrowManager', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.borrowManager),
              ]);
            }
          },
          {title: '备注', key: 'notes', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('Input', {props: {value: params.row.notes}}),
              ]);
            }
          },
        ],
        matrialsBorrowData: [],
        handleInfo: {
          material: '',
          remarkManw: '',
          remarkDatew:'',
          materialw:''
        }
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1);
        },add(){
            var fromData = this.$utils.clear(this.handleInfo,'');
            this. matrialsUseData.push(fromData);
        },remove (index,archiveUseId) {
                if(!archiveUseId){
                  this.matrialsUseData.splice(index, 1);
              
                }else{
                     this.$Modal.confirm({
                      title: '',
                      content: '确认删除吗?',
                      onOk:function(){

                        let params = {archiveUseId:archiveUseId}

                        api.deleteAmArchiveUse(params).then(data=>{
                              history.go(-1);
                      })
                       
                      },
                      error:function(error){
                        self.$Modal.remove();
                    }
                    });
                }
                
       },instance() {
        
            api.saveAmArchiveUse(this.matrialsUseData).then(data => {
                  if (data.data.data == true) {
                    this.$Message.success("保存成功");
                    history.go(-1);
                  } else {
                    this.$Message.error("保存失败！");
                  }
            })
          
       }
    }
  }
</script>
