<template>
  <div>
    <h3>材料收缴</h3>
    <Card v-for="(lv,index) in meterials" :key="index">
      <Form :label-width="120">
      <Row v-if="index == 1" v-for="meterial in lv" :key="meterial.materialTypeRelationId">
        <i-col >
          <Form-item >
            <Checkbox v-model="formItem.a">{{meterial.materialName}}</Checkbox>
          </Form-item>
        </i-col>
      </Row>
      
      </Form>
    </Card>
    
  </div>
</template>

<script>
import axios from 'axios'
import Tools from '../../../../lib/tools'
import Decode from '../../../../lib/decode'

const host = process.env.SITE_HOST
export default {
  props: {
    meterials: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data () {
    return {
      formItem: {
        a: ''
      }
    }
  },
  methods: {
    
  }  
}
</script>

<style scoped>

</style>
