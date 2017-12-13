import {giftValidator} from './gift_validator'
import {marketValidate} from './market_validator'

const validator = {
  giftValidator,
  marketValidate,
};
export default {
  install(Vue) {
    Vue.prototype.$Validator = validator
  }
}
