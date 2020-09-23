import { defaultRenderLogo } from '@/layouts/SiderMenu'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import { Icon } from 'ant-design-vue'
import PropTypes from 'ant-design-vue/es/_util/vue-types'
import debounce from 'lodash/debounce'
import { h } from 'vue'
import { inBrowser, isFun, triggerEvent } from '../../utils/util'
import './index.less'
export const GlobalHeaderProps = {
  collapsed: PropTypes.bool,
  handleCollapse: PropTypes.func,
  isMobile: PropTypes.bool.def(false),
  fixedHeader: PropTypes.bool.def(false),
  logo: PropTypes.any,
  menuRender: PropTypes.any,
  collapsedButtonRender: PropTypes.any,
  headerContentRender: PropTypes.any,
  rightContentRender: PropTypes.any
}

const defaultRenderCollapsedButton = (h, collapsed) => (
  <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
)

const GlobalHeader = {
  name: 'GlobalHeader',
  props: GlobalHeaderProps,
  render() {
    const {
      isMobile,
      logo,
      collapsed = false,
      handleCollapse,
      rightContentRender,
      headerContentRender,
      collapsedButtonRender = defaultRenderCollapsedButton,
      menuRender
    } = this
    const toggle = () => {
      if (handleCollapse) handleCollapse(!collapsed)
      this.triggerResizeEvent()
    }
    const renderCollapsedButton = () => {
      if (collapsedButtonRender !== false && menuRender !== false) {
        return (
          <span class="ant-pro-global-header-trigger" onClick={toggle}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </span>
        )
      }
      return null
    }

    const headerCls = 'ant-pro-global-header'

    return (
      <div class={headerCls}>
        {isMobile && (
          <a class={`${headerCls}-logo`} key="logo" href={'/'}>
            {defaultRenderLogo(h, logo)}
          </a>
        )}
        {renderCollapsedButton()}
        {headerContentRender && (
          <div class={`${headerCls}-content`}>
            {(isFun(headerContentRender) && headerContentRender(h, this)) ||
              headerContentRender}
          </div>
        )}
        {(isFun(rightContentRender) && rightContentRender(h, this)) ||
          rightContentRender}
      </div>
    )
  },
  methods: {
    triggerResizeEvent: debounce(() => {
      inBrowser && triggerEvent(window, 'resize')
    })
  },
  beforeUnmount() {
    this.triggerResizeEvent.cancel && this.triggerResizeEvent.cancel()
  }
}

export default GlobalHeader
