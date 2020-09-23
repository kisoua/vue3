import PropTypes from 'ant-design-vue/es/_util/vue-types'
import { layoutContentWidth } from '../../utils/util'
import './index.less'

const GridContent = {
  name: 'GridContent',
  functional: true,
  props: {
    children: PropTypes.any,
    contentWidth: PropTypes.oneOf(['Fluid', 'Fixed']).def('Fluid')
  },
  render() {
    const { contentWidth } = this
    console.log('this: ', this)
    const propsContentWidth = layoutContentWidth(contentWidth)
    const classNames = {
      ['ant-pro-grid-content']: true,
      ['wide']: propsContentWidth
    }
    return <div class={classNames}>{this.slots}</div>
  }
}

export default GridContent
