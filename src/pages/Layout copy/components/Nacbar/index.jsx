import { Link, useLocation } from "react-router-dom"
import styled from "styled-components"
import logo from "@/assets/image/logo.png"
import styles from "./index.module.scss"
const NavWrapper = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #08121b;
  @media (max-width: 768px) {
    align-items: stretch;
  }
`

const MenuList = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    align-items: stretch;
  }
`

const MenuItem = styled.li`
  list-style: none;
  margin: 0 1rem;
  margin-top: 6px;

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }

  @media (max-width: 768px) {
    margin: 1rem 0;
  }
`

const NavLink = styled(Link)`
  display: block;
  color: #fff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  vertical-align: middle;

  &:hover,
  &.active {
    background-color: black;
    color: #333;
  }
`

function Navbar({ menus }) {
  const location = useLocation()

  return (
    <div className={styles.root}>
      <NavWrapper>
        <MenuList>
          <Link to="/">
            <img
              style={{
                width: 50,
                height: 50,
                display: "inline-block",
                verticalAlign: "middle",
              }}
              alt="量子"
              className="logo"
              src={logo}
            />
            <span
              style={{ color: "#fff", height: 50, paddingLeft: 10 }}
              className="logoName"
            >
              太元量子计算
            </span>
          </Link>
          {menus?.map(({ label, path }) => (
            <MenuItem key={path}>
              <NavLink
                to={path}
                className={location.pathname === path ? "active" : ""}
              >
                {label}
              </NavLink>
            </MenuItem>
          ))}
        </MenuList>
      </NavWrapper>
    </div>
  )
}

export default Navbar
