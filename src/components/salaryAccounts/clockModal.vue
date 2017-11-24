<template>
	<div>
		<Icon v-if="isPlanBatch == true" type="ios-alarm" @click.native="modal1 = true" :style="{fontSize: fontSize + 'px'}"/>
		<Modal v-model="modal1" title="计划批次设置" width="728">
	        <Row>
	        	<Col>
					<Form v-model="modalForm" :label-width="100">
						<Form-item label="调度类型：">
		                  <Select v-model="modalForm.dispatchType" placeholder="请选择"  @on-change="changeDispatchType">
		                    <Option v-for="item in dispatchTypes" :value="item.value" :key="item.value" >{{item.label}}</Option>
		                  </Select>
	              		</Form-item>
	              		<template class="showUnlessTypeSoon" v-if="modalForm.dispatchType != 'soon'">
	              			<template v-if="modalForm.dispatchType === 'oneTime'">
	              				<Form-item label="运行时间：">
									<Date-picker type="datetime" v-model="modalForm.calTime" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间" key="calTime"></Date-picker>
			              		</Form-item>
	              			</template>
	              			<template v-else>
	              				<Form-item label="有效期：">
	              				<DatePickerWithPrepend type="date" prepend="开始日期" style="width: 35%" @dateChanged="startDate = $event"></DatePickerWithPrepend>
							    <DatePickerWithPrepend type="date" prepend="结束日期" style="width: 35%" @dateChanged="endDate = $event"></DatePickerWithPrepend>
							    <span>(为空表示无结束日期)</span>
			              		</Form-item>

			              		<Form-item label="调度周期：">
				                  <Select v-model="modalForm.dispatchCycle.type" placeholder="请选择" class="dispatchCycle">
				                    <Option v-for="item in dispatchCycles" :value="item.value" :key="item.value" >{{item.label}}</Option>
				                  </Select>
				                  <Row v-if="modalForm.dispatchCycle.type === 'byDay'">
				                  	<Col span="5">
				                  		<div class="cycleTimeInput">
						                  	<span>每</span>
						                  	<Input v-model="modalForm.dispatchCycle.cycleDays" number ></Input>
										    <span>日</span>
								    	</div>
								    </Col>
				                  </Row>
				                  <Row v-else-if="modalForm.dispatchCycle.type === 'byWeek'">
				                  	<Col span="5">
				                  		<div class="cycleTimeInput">
						                  	<span>每</span>
						                  	<Input v-model="modalForm.dispatchCycle.cycleWeeks" number ></Input>
										    <span>周的</span>
								    	</div>
								    </Col>
								    <Col span="19">
									    <div class="weekDaySelect">
									    	<Checkbox-group v-model="modalForm.dispatchCycle.cycleWeekDays">
										    	<Checkbox v-for="item in weekDays" :label="item.value" :key="item.value">
										            <span>{{item.label}}</span>
										        </Checkbox>
									   		</Checkbox-group>
									    </div>
									</Col>
				                  </Row>
				                  <Row :gutter="24" v-else>
				                  	<Col span="5">
				                  		<div class="cycleTimeInput">
						                  	<span>每</span>
						                  	<Input v-model="modalForm.dispatchCycle.cycleMonths" number ></Input>
										    <span>月的</span>
								    	</div>
								    </Col>
								    <Col span="19">
								    	<Radio-group v-model="modalForm.dispatchCycle.cycleMonthDayFlag" style="width: 100%">
								    		<div class="radioOption1">
								    			<Radio label="1"><div></div></Radio>
							                  	某日
								                <Input v-model="modalForm.dispatchCycle.cycleMonthDay" number ></Input>
												日(1~31)
								    		</div>
								    		<div class="radioOption2">
												<Radio label="2"><div></div></Radio>
							                  	特殊日
						                  		<Select v-model="modalForm.dispatchCycle.cycleMonthSpecialDay.appoint" placeholder="请选择">
							                      <Option v-for="item in appointDays" :value="item.value" :key="item.value" >{{item.label}}</Option>
							                    </Select>
								                -
												<Select v-model="modalForm.dispatchCycle.cycleMonthSpecialDay.day" placeholder="请选择">
							                      <Option v-for="item in weekDays" :value="item.value" :key="item.value" >{{item.label}}</Option>
							                    </Select>
							                </div>
									    </Radio-group>
				                  	</Col>
				                  </Row>
			              		</Form-item>
			              		<Form-item label="当日频率：">
			              			<Radio-group v-model="modalForm.dailyFrequency.type">
			              				<Radio label="oneTime"><span>一次性</span></Radio>
			              				<Radio label="recursion"><span>循环运行</span></Radio>
			              			</Radio-group>
			              			<Row v-if="modalForm.dailyFrequency.type === 'oneTime'">
			              				<TimePickerWithPrepend prepend="运行时间" style="width: 35%" 
			              				@timeChanged="modalForm.dailyFrequency.startTime = $event"></TimePickerWithPrepend>
			              			</Row>
			              			<Row v-else>
				              			<Col span="14">
				              				<TimePickerWithPrepend prepend="开始时间" style="width: 49%" 
				              				@timeChanged="modalForm.dailyFrequency.startTime = $event"></TimePickerWithPrepend>
				              				<TimePickerWithPrepend prepend="结束时间" style="width: 49%" 
				              				@timeChanged="modalForm.dailyFrequency.endTime = $event"></TimePickerWithPrepend>
				              			</Col>
				              			<Col span="10">
				              				<div class="frequency">
				              					每
					              				<Input v-model="modalForm.dailyFrequency.frequency.unit" placeholder="请输入"></Input>
					              				<Select v-model="modalForm.dailyFrequency.frequency.unitPeriod" placeholder="请选择">
							                      <Option v-for="item in unitPeriods" :value="item.value" :key="item.value" >{{item.label}}</Option>
							                    </Select>
							                    运行一次
						                    </div>
				              			</Col>
			              			</Row>
			              		</Form-item>
	              			</template>
	              			
		              		<Form-item label="调度参数：">
		              		  <Input v-model="modalForm.dispatchParam" placeholder="请输入"></Input>
		              		</Form-item>
		              		<Form-item label="规则描述：">
		              		  <Input v-model="modalForm.ruleDescribe" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
		              		</Form-item>
	              		</template>
					</Form>
	        	</Col>
	        </Row>

	        <div slot="footer">
	        	<Button type="primary" size="large" @click="ok">保存</Button>
            	<Button type="error" size="large" @click="cancel">取消</Button>
        	</div>
	    </Modal>
	</div>
</template>

<script>
import datePickerWithPrepend from './datePickerWithPrepend.vue';
import timePickerWithPrepend from './timePickerWithPrepend.vue';

export default {

  name: 'clockModal',

  props: ['isPlanBatch','fontSize'],

  components: {
	 	'DatePickerWithPrepend' : datePickerWithPrepend,
	 	'TimePickerWithPrepend' : timePickerWithPrepend,
  },
  data () {
    return {
    	modal1: false,
    	open: false,
    	modalForm: {
    		test: '',
    		dispatchType: 'oneTime',
    		calTime: '',
    		dispatchParam: '',
    		ruleDescribe: '',
    		startDate: '',
    		endDate: '',
    		dispatchCycle: {
    			type: 'byDay',
    			cycleDays: 1,
    			cycleWeeks: 1,
    			cycleWeekDays: [],
    			cycleMonths: 1,
    			cycleMonthDayFlag : 1,
    			cycleMonthDay: 1,
    			cycleMonthSpecialDay : {
    				appoint: 1,
    				day: 'Mon'
    			}
    		},
    		dailyFrequency: {
    			type: 'oneTime',
    			startTime: '',
    			endTime: '',
    			frequency:{
    				unit: 1,
    				unitPeriod: 'minute'
    			}
    		}
    	},
    	unitPeriods: [
    		{
    			label: '小时',
    			value: 'hour'
    		},
    		{
    			label: '分钟',
    			value: 'minute'
    		},
    		{
    			label: '秒',
    			value: 'second'
    		}
    	],
    	appointDays: [
    		{
    			label: '第一个',
    			value: 1
    		},
    		{
    			label: '第二个',
    			value: 2
    		},
    		{
    			label: '第三个',
    			value: 3
    		},
    		{
    			label: '第四个',
    			value: 4
    		}
    	],
    	dispatchTypes: [
    		{
    			label: '一次性',
    			value: 'oneTime'
    		},
    		{
    			label: '多次循环',
    			value: 'recursion'
    		},
    		{
    			label: '启动任务时',
    			value: 'soon'
    		},
    	],
    	dispatchCycles: [
    		{
    			label: '按日',
    			value: 'byDay'
    		},
    		{
    			label: '按周',
    			value: 'byWeek'
    		},
    		{
    			label: '按月',
    			value: 'byMonth'
    		},
    	],
    	weekDays: [
    		{
    			label: '周一',
    			value: 'Mon'
    		},
    		{
    			label: '周二',
    			value: 'Tue'
    		},
    		{
    			label: '周三',
    			value: 'Wed'
    		},
    		{
    			label: '周四',
    			value: 'Thur'
    		},
    		{
    			label: '周五',
    			value: 'Fri'
    		},
    		{
    			label: '周六',
    			value: 'Sat'
    		},
    		{
    			label: '周日',
    			value: 'Sun'
    		},
    	]
    };
  },
  methods: {
  	handleClick () {
        this.open = !this.open;
    },
    handleChange (date) {
    	this.modalForm.startDate = date;
    	this.open = false;
    },
    ok () {
        this.$Message.info('点击了确定');
        this.modal1 = false;
    },
    cancel () {
        this.$Message.info('点击了取消');
        this.modal1 = false;
    },
    changeDispatchType() {
    	console.log(this.modalForm.dispatchType);
    }
  }
};
</script>

<style lang="css" scoped>
i {
	margin-top: 5px;
	margin-left: 5px;
	cursor: pointer;
}
.dispatchCycle {
	margin-bottom: 5px;
}
.cycleTimeInput {
	display: inline-block;
}
.weekDaySelect {
	display: inline-block;
}
.cycleTimeInput .ivu-input-wrapper {
	width: 50%;
}
.radioOption1 .ivu-input-wrapper {
	width: 30%;
}
.radioOption1 {
	width: 35%;
	display: inline-block;
}
.radioOption2 {
	width: 60%;
	display: inline-block;
}
.radioOption2 .ivu-select {
	width: 35%;
}
.ivu-radio-wrapper {
	margin-right: 0px;
}
.frequency .ivu-input-wrapper{
	width: 30%;
}
.frequency .ivu-select{
	width: 30%;
}
</style>