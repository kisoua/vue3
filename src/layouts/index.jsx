import { Layout } from 'ant-design-vue'
import PropTypes from 'ant-design-vue/es/_util/vue-types'
import { h } from 'vue'
import HeaderView, { HeaderViewProps } from './Header'
import Basic, { SiderMenuProps } from './SiderMenu'
export const BasicLayoutProps = {
  ...SiderMenuProps,
  ...HeaderViewProps,
  contentWidth: PropTypes.oneOf(['Fluid', 'Fixed']).def('Fluid'),
  // contentWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).def('Fluid'),
  locale: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).def('en-US'),
  breadcrumbRender: PropTypes.func,
  disableMobile: PropTypes.bool.def(false),
  mediaQuery: PropTypes.object.def({}),
  handleMediaQuery: PropTypes.func,
  footerRender: PropTypes.func
}

const getPaddingLeft = (hasLeftPadding, collapsed = undefined, siderWidth) => {
  if (hasLeftPadding) {
    return collapsed ? 80 : siderWidth
  }
  return 0
}

const headerRender = (h, props) => {
  if (props.headerRender === false) {
    return null
  }
  return <HeaderView {...props} />
}

export default {
  name: 'ProLayout',
  props: BasicLayoutProps,
  data() {
    return {
      menus: [],
      theme: 'dark',
      title: 'hahds'
    }
  },
  created() {
    const route = this.$route.matched.find(item => item.path === '/')
    this.menus = (route && route.children) || []
  },
  render() {
    const {
      menus,
      theme,
      title,
      fixSiderbar,
      layout,
      isMobile,
      collapsed,
      siderWidth,
      contentWidth,
      menuHeader = true
    } = this
    const isTopMenu = layout === 'topmenu'
    const hasSiderMenu = !isTopMenu
    const hasLeftPadding = fixSiderbar && !isTopMenu && !isMobile
    const cdProps = {
      ...this.props,
      hasSiderMenu,
      menuHeader
    }

    return (
      <Layout>
        <Basic title={title} theme={theme} menus={menus}></Basic>
        <Layout
          style={{
            paddingLeft: hasSiderMenu
              ? `${getPaddingLeft(!!hasLeftPadding, collapsed, siderWidth)}px`
              : undefined,
            minHeight: '100vh'
          }}
        >
          {headerRender(h, {
            ...cdProps,
            mode: 'horizontal'
          })}
          <Layout.Content>
            <router-view></router-view>
          </Layout.Content>
        </Layout>
      </Layout>
    )
  }
}
