import React from 'react'
import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarNavigationIcon,
  TopAppBarTitle,
  TopAppBarActionItem,
  TopAppBarFixedAdjust
} from '@rmwc/top-app-bar'
import {
  Drawer,
  DrawerHeader,
  DrawerTitle,
  DrawerSubtitle,
  DrawerContent
} from '@rmwc/drawer'
import {
  List,
  ListItem,
  ListItemGraphic
} from '@rmwc/list'
import {
  MenuSurfaceAnchor,
  MenuSurface,
  MenuItem
} from '@rmwc/menu'
import { Link } from 'react-router-dom'

const getIsMobile = () => {
  const width = window.innerWidth
  return width < 840
}

const TopBar = ({ children }) => {
  const [ drawerOpen, setDrawerOpen ] = React.useState(false)
  const [ menuOpen, setMenuOpen ] = React.useState(false)
  const [ isMobile, setIsMobile ] = React.useState(getIsMobile())
  React.useEffect(() => {
    const handleResize = () => setIsMobile(getIsMobile())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  })
  return (
    <>
      {isMobile ? <Drawer modal open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <DrawerHeader>
          <DrawerTitle>Snippets</DrawerTitle>
          <DrawerSubtitle>Made with <span role='img' aria-label='Heart'>❤️</span> by Helloyunho</DrawerSubtitle>
        </DrawerHeader>
        <DrawerContent>
          <List>
            <ListItem tag={Link} to='/'>
              <ListItemGraphic icon='home' />
              Home
            </ListItem>
            <ListItem tag={Link} to='/login'>
              <ListItemGraphic icon='perm_identity' />
              Login
            </ListItem>
            <ListItem tag={Link} to='/register'>
              <ListItemGraphic icon='person_add' />
              Register
            </ListItem>
          </List>
        </DrawerContent>
      </Drawer> : null}
      <TopAppBar fixed>
        <TopAppBarRow>
          <TopAppBarSection>
            {isMobile
              ? <TopAppBarNavigationIcon icon='menu' onClick={() => setDrawerOpen(true)} />
              : <TopAppBarNavigationIcon icon='home' tag={Link} to='/' />}
            <TopAppBarTitle>Snippers</TopAppBarTitle>
          </TopAppBarSection>
          {!isMobile ? <TopAppBarSection alignEnd>
            <MenuSurfaceAnchor>
              <MenuSurface anchorCorner='bottomLeft' open={menuOpen} onClose={() => setMenuOpen(false)}>
                <MenuItem tag={Link} to='/login'>Login</MenuItem>
                <MenuItem tag={Link} to='/register'>Register</MenuItem>
              </MenuSurface>
              <TopAppBarActionItem icon='perm_identity' onClick={() => setMenuOpen(true)} />
            </MenuSurfaceAnchor>
          </TopAppBarSection> : null}
        </TopAppBarRow>
      </TopAppBar>
      <TopAppBarFixedAdjust>
        { children }
      </TopAppBarFixedAdjust>
    </>
  )
}

export default TopBar
