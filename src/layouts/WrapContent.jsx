import GridContent from '@/components/GridContent'
import { ConfigProvider, Layout } from 'ant-design-vue'
import PropTypes from 'ant-design-vue/es/_util/vue-types'
const { Content } = Layout

const WrapContentProps = {
  isChildrenLayout: PropTypes.bool,
  location: PropTypes.any,
  contentHeight: PropTypes.number,
  contentWidth: PropTypes.oneOf(['Fluid', 'Fixed']).def('Fluid')
}

const WrapContent = {
  name: 'WrapContent',
  props: WrapContentProps,
  render() {
    const { isChildrenLayout = false, contentWidth } = this
    console.log('this: ', this)
    return (
      <Content>
        <ConfigProvider
          getPopupContainer={el => {
            if (isChildrenLayout) {
              return el.parentNode()
            }
            return document.body
          }}
        >
          <div class="ant-pro-basicLayout-children-content-wrap">
            <GridContent contentWidth={contentWidth}>
              <slot></slot>
            </GridContent>
          </div>
        </ConfigProvider>
      </Content>
    )
  }
}

export default WrapContent
