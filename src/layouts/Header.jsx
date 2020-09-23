import GlobalHeader, { GlobalHeaderProps } from '@/components/GlobalHeader'
import BaseMenu from '@/components/RouteMenu'
import { Layout } from 'ant-design-vue'
import PropTypes from 'ant-design-vue/es/_util/vue-types'
import { h } from 'vue'
import './header.less'
import { defaultRenderLogoAntTitle, SiderMenuProps } from './SiderMenu'
const { Header } = Layout
function isFun(obj) {
  return typeof obj === 'function'
}
export const HeaderViewProps = {
  ...GlobalHeaderProps,
  ...SiderMenuProps,
  isMobile: PropTypes.bool.def(false),
  collapsed: PropTypes.bool,
  logo: PropTypes.any,
  hasSiderMenu: PropTypes.bool,
  autoHideHeader: PropTypes.bool,
  menuRender: PropTypes.any,
  headerRender: PropTypes.any,
  rightContentRender: PropTypes.any,
  visible: PropTypes.bool.def(true)
}

const renderContent = (h, props) => {
  const isTop = props.layout === 'topmenu'
  const maxWidth = 1200 - 280 - 120
  const contentWidth = props.contentWidth === 'Fixed'
  const baseCls = 'ant-pro-top-nav-header'
  const {
    logo,
    title,
    theme,
    isMobile,
    headerRender,
    rightContentRender,
    menuHeaderRender,
    collapsed,
    fixedHeader,
    menuRender
  } = props
  const rightContentProps = { theme, isTop, isMobile }
  let defaultDom = (
    <GlobalHeader
      logo={logo}
      collapsed={collapsed}
      isMobile={isMobile}
      fixedHeader={fixedHeader}
      menuRender={menuRender}
    />
  )
  if (isTop && !isMobile) {
    defaultDom = (
      <div class={[baseCls, theme]}>
        <div class={[`${baseCls}-main`, contentWidth ? 'wide' : '']}>
          {menuHeaderRender && (
            <div class={`${baseCls}-left`}>
              <div class={`${baseCls}-logo`} key="logo" id="logo">
                {defaultRenderLogoAntTitle(h, {
                  logo,
                  title,
                  menuHeaderRender
                })}
              </div>
            </div>
          )}
          <div
            class={`${baseCls}-menu`}
            style={{ maxWidth: `${maxWidth}px`, flex: 1 }}
          >
            <BaseMenu {...{ props: props }} />
          </div>
          {(isFun(rightContentRender) &&
            rightContentRender(h, rightContentProps)) ||
            rightContentRender}
        </div>
      </div>
    )
  }
  if (headerRender) {
    return headerRender(h, props)
  }
  return defaultDom
}

const HeaderView = {
  name: 'HeaderView',
  props: HeaderViewProps,
  render() {
    const {
      visible,
      isMobile,
      layout,
      collapsed,
      siderWidth,
      fixedHeader,
      hasSiderMenu
    } = this
    const isTop = layout === 'topmenu'

    const needSettingWidth = fixedHeader && hasSiderMenu && !isTop && !isMobile

    const className = {
      'ant-pro-fixed-header': fixedHeader,
      'ant-pro-top-menu': isTop
    }

    // 没有 <></> 暂时代替写法
    return visible ? (
      <div>
        {fixedHeader && <Header />}
        <Header
          style={{
            padding: 0,
            width: needSettingWidth
              ? `calc(100% - ${collapsed ? 80 : siderWidth}px)`
              : '100%',
            zIndex: 9,
            right: fixedHeader ? 0 : undefined
          }}
          class={className}
        >
          {renderContent(h, this)}
        </Header>
      </div>
    ) : null
  }
}

export default HeaderView
