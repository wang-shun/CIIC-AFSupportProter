<template>
    <div class="auditAcceptance">
        <Card>
          <Form :model="formItem" :label-width="120" >
            <row >
              <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                <Form-item label="就诊医院：" prop="name">
                  <Input v-model="formItem.name" placeholder="201708160001"></Input>
                </Form-item>
              </i-col>
              <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                <Form-item label="受理金额：" prop="types">
                  <Input v-model="formItem.name" placeholder=""></Input>
                </Form-item>
              </i-col>
              <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                <Form-item label="付款方式：" prop="types">
                  <Select>
                    <Option value="1">打卡</Option>
                    <Option value="1">现金</Option>
                  </Select>
                </Form-item>
              </i-col>
            </row>
            <row >
              <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                <Form-item label="诊断：" prop="name">
                  <Input v-model="formItem.name" placeholder="11L2674"></Input>
                </Form-item>
              </i-col>

            </row >
            <row >
              <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
              <Form-item label="就诊日期：">
                <Date-picker v-model="formItem.deliveryDate" :type="dateType" placeholder="选择月份" :format="dateFormat" :key="formItem.salaryIntervalType"></Date-picker>
              </Form-item>
              </i-col>
            </row >
            <row >
              <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
              <Form-item label="附件：">
                <Input v-model="formItem.name" placeholder="请输入"></Input>
              </Form-item>
              </i-col>
            </row >
            <row >
              <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
              <Form-item label="住院天数：">
                <Input v-model="formItem.name" placeholder="请输入"></Input>
              </Form-item>
              </i-col>
              <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
              <Form-item label="审核金额：">
                <Input v-model="formItem.name" placeholder="请输入"></Input>
              </Form-item>
              </i-col>
            </row >
            <row >
              <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
              <Form-item label="住院开始日期：">
                <Date-picker v-model="formItem.deliveryDate" :type="dateType" placeholder="选择月份" :format="dateFormat" :key="formItem.salaryIntervalType"></Date-picker>
              </Form-item>
              </i-col>
              <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                <Form-item label="住院结束日期：">
                   <Date-picker v-model="formItem.deliveryDate" :type="dateType" placeholder="选择月份" :format="dateFormat" :key="formItem.salaryIntervalType"></Date-picker>
                </Form-item>
              </i-col>
            </row>
            <row >
              <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 13, offset: 0 }" class="checkBtn">
                <Form-item label="备注：">
                  <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
                </Form-item>
              </i-col>
            </row>
            <row>
                <i-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }" class="checkBtn">
                     <div class="floatRightBtns">
                        <router-link to="/acceptanceAuditList">
                            <Button type="primary">提交</Button>
                        </router-link>
                        <Button type="success" @click="back">返回</Button>
                     </div>
                </i-col>
            </row>
          </Form>
        </Card>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                onlyNum:false,
                formItem: {
                    name:null,
                    code:null,
                    types:"",
                    typeVal:"请选择",
                    disabled:true,
                    routerChanged:false,
                    note:"雇员的名称"
                },
                dataTypes:[
                    {
                        value: '1num',
                        label: '医疗费'
                    },
                    {
                        value: '2',
                        label: '体检费用'
                    },
                    {
                        value: '3',
                        label: '住院补贴'
                    },
                    {
                        value: '4',
                        label: '托费'
                    },
                    {
                        value: '5',
                        label: '大额理赔款'
                    },
                     {
                        value: '6',
                        label: '其他'
                    }
                ],
                peopleTypes: [
                    {
                        value: '1',
                        label: '雇员'
                    },
                    {
                        value: '2',
                        label: '子女'
                    },
                    {
                        value: '3',
                        label: '配偶'
                    }
                ]//,
                // ruleValidate: {   验证
                //     name: [
                //         { required: true, message: '薪资项模板名称不能为空', trigger: 'blur' }
                //     ],
                //     types: [
                //         { required: true, message: '请选择薪资项模板类别', trigger: 'change' }
                //     ],
                //     dataTypes: [
                //         { required: true, message: '请选择数据类型', trigger: 'change' }
                //     ],

                // }
            }
        },
        methods:{

            back () {
                 this.$local.back();
            },
            selectChange(){
                this.formItem.disabled=false;
                if(this.formItem.types == "computed" || this.formItem.types == "seniorComputed" || this.formItem.types == "fixed"){
                    this.onlyNum=true;
                }else{
                    this.onlyNum=false;
                }
            },
            passData(){
                let data=this.$route.params.data;
                if(data){
                    this.editObj=data;
                    this.formItem.name=data.name;
                    this.formItem.code=data.code;
                    this.formItem.types=createLookMap("label", "value", this.salaryType)[data.types];
                    this.formItem.typeVal=createLookMap("label", "value", this.dataTypes)[data.typeVal];
                }else{
                    data=""
                }
            }
        },
        watch:{
            //监听路由变化 页面重载或路由跳转获取URL参数
            $route(){
                console.log("路由发生了变化");
                this.passData();
            }
        },
        created(){
            this.passData();
        },
    }

    function createLookMap(key, value, jsonArr){
        let map = {}
        for (let i = 0; i < jsonArr.length; i++) {
            let item = jsonArr[i]
            let mapKey = item[key]
            let mapValue = item[value]
            map[mapKey] = mapValue
        }
        return map
    }

</script>
