<template>
  <div class="nonInsuranceMedical">
    <router-link :to="{name:'addCalBatchList'}">
      <Button type="primary">
          创建
      </Button>
    </router-link>
      <Table border :columns="columns7" :data="data6" :disabled-hover="disableHOver"></Table>
      <Page :total="100" show-sizer show-elevator></Page>
  </div>
</template>
<script>
import clockModal from '../../ClockModal.vue';
    export default {
        data () {
            return {
                disableHOver:true,
                columns7: [
                    {
                        title: '受理编号',
                        sortable: true,
                        width: '250',
                        align:'center',
                        key: 'code',
                        render: (h, params) => {
                            return h('div',{
                                style:{
                                    cursor:'pointer'
                                },
                                on:{
                                    click:()=>{
                                        params.row.btns=false;
                                        params.row.showCollapse=false;
                                        this.normalCal(params.row);
                                    }
                                }
                            },params.row.code);
                        }
                    },
                    {
                        title: '雇员编号',
                        sortable: true,
                        align:'center',
                        key: 'name',
                        render: (h, params) => {
                            if(params.row.isPlanBatch){
                                return h('div', [
                                    h(clockModal, {
                                        props: {
                                            isPlanBatch: true,
                                            fontSize: "10"
                                        },
                                        style: {
                                            marginRight: '5px',
                                            display: 'inline-block'
                                        },
                                    }),
                                    h('strong', params.row.name)
                                ]);
                            }else{
                                return h('div',
                                    [h('strong', params.row.name)]
                                );
                            }
                        }
                    },
                    {
                        title: '雇员姓名',
                        sortable: true,
                        align:'center',
                        key: 'salaryPeriod'
                    },
                    {
                        title: '公司编号',
                        sortable: true,
                        width:'150',
                        align:'center',
                        key: 'salaryPeriodType'
                    },
                    {
                        title: '类型',
                        sortable: true,
                        align:'center',
                        key: 'client'
                    },
                    {
                        title: '款项',
                        sortable: true,
                        align:'center',
                        key: 'start'
                    },
                    {
                        title: '连带人',
                        sortable: true,
                        align:'center',
                        key: 'end'
                    },
                    {
                        title: '受理人',
                        sortable: true,
                        align:'center',
                        key: 'whateverStatus'
                    },
                    {
                        title: '受理日期',
                        sortable: true,
                        align:'center',
                        key: 'status'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align:'center',
                        width: '100',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                           this.salaryTrial(params.row);
                                        }
                                    }
                                }, '试算')
                            ]);
                        }
                    }
                ],
                data6: [
                    {
                        name: '20170701a',
                        isPlanBatch: false,
                        code: '20160215072',
                        fromNormal:true,
                        salaryPeriod: '201707',
                        start: '2017-07-01',
                        end: '2017-07-31',
                        whateverStatus:"待发放",
                        status: '<span class="dot blue"></span><span>运行中</span>',
                        salaryPeriodType: '日薪',
                        client: '星巴克'
                    },
                    {
                        name: '20170701b',
                        isPlanBatch: true,
                        code: '20160215072',
                        fromNormal:true,
                        salaryPeriod: '201707',
                        start: '2017-07-01',
                        end: '2017-07-31',
                        whateverStatus:"已发放",
                        status: '<span class="dot green"></span><span>完成</span>',
                        salaryPeriodType: '周薪',
                        client: '星巴克'
                    },
                    {
                        name: '20170701c',
                        isPlanBatch: false,
                        code: '20160215072',
                        fromNormal:true,
                        salaryPeriod: '201707',
                        start: '2017-07-01',
                        end: '2017-07-31',
                        whateverStatus:"待发放",
                        status: '<span class="dot red"></span><span>失败</span>',
                        salaryPeriodType: '半月薪',
                        client: '星巴克'
                    },
                    {
                        name: '20170701d',
                        isPlanBatch: true,
                        code: 'CMY000001-20170727-0004',
                        fromNormal:true,
                        salaryPeriod: '201707',
                        start: '2017-07-01',
                        end: '2017-07-31',
                        whateverStatus:"已发放",
                        status: '<span class="dot blue"></span><span>运行中</span>',
                        salaryPeriodType: '月薪',
                        client: '星巴克'
                    },
                    {
                        name: '20170701e',
                        isPlanBatch: true,
                        code: 'CMY000001-20170727-0005',
                        fromNormal:true,
                        salaryPeriod: '201707',
                        start: '2017-07-01',
                        end: '2017-07-31',
                        whateverStatus:"待发放",
                        status: '<span class="dot blue"></span><span>运行中</span>',
                        salaryPeriodType: '月薪',
                        client: '星巴克'
                    },
                ]
            }
        },
        methods: {
            show (index) {
                this.$Modal.info({
                    title: '用户信息',
                    content: `姓名：${this.data6[index].name}<br>年龄：${this.data6[index].age}<br>地址：${this.data6[index].address}`
                })
            },
            remove (index) {
                this.data6.splice(index, 1);
            },
            normalCal(data){
                this.$router.push({name:'normalCal' , params: { data:data }});
            },
            salaryTrial(data){
                this.$router.push({name:'salaryTrial' , params: { data:data }});
            }
        }
    }
</script>
<style scoped>
  .calBatchList .ivu-btn{
    margin-bottom: 15px;
    display: block;
  }
  .calBatchList  .ivu-tag-dot{
    border:none;
  }

</style>
