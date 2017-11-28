<template>
	<Tabs type="card" class= "diyTabs">
        <Tab-pane :label="renderTab1">
          <Table :columns="columns1" :data="data1" :border="border"></Table>
        </Tab-pane>
        <Tab-pane :label="renderTab2">
          <Table :columns="columns1" :data="data1" :border="border"></Table>
        </Tab-pane>
      </Tabs>
</template>
<script>
export default {
	data() {
		return {
			tabs: 2,
			border: true,
			test: 'test',
			renderTab1:
				(createElement) => {
					return createElement(
						'div', [
							createElement('div', '星巴克1级薪资组'),
							createElement('div', {
								style: {
									'font-size': '12px',
									'text-align': 'center',
									'color': 'brown'
								}
							}, '薪资账套A'),
						]
					)
				},
			renderTab2:
				(createElement) => {
					return createElement(
						'div', [
							createElement('div', '星巴克2级薪资组'),
							createElement('div', {
								style: {
									'font-size': '12px',
									'text-align': 'center',
									'color': 'brown'
								}
							}, '薪资账套B'),
						]
					)
				},
			columns1: [{
				title: '员工编号',
				sortable: true,
				fixd:'left',
				key: 'employCode'
			}, {
				title: '员工姓名',
				sortable: true,
				key: 'name'
			}, {
				title: '部门',
				sortable: true,
				key: 'unit'
			}, {
				title: '岗位',
				sortable: true,
				key: 'position'
			}, {
				title: '入职日期',
				sortable: true,
				key: 'date'
			}, ],
			data1: [{
				employCode: 'EMP000006',
				name: '张三',
				unit: '行政部',
				position: '经理',
				date: '2015-09-28'
			}, {
				employCode: 'EMP000007',
				name: '李四',
				unit: '行政部',
				position: '经理',
				date: '2015-09-28'
			}, {
				employCode: 'EMP000008',
				name: '王五',
				unit: '财务部',
				position: '经理',
				date: '2015-09-28'
			}, {
				employCode: 'EMP000009',
				name: '钱孙',
				unit: '财务部',
				position: '经理',
				date: '2015-09-28'
			}, ]
		}
	}
}
</script>