import React from 'react'
import Auth from './Auth'
import Notification from './Notification'
import { Link } from 'react-router-dom'
import { LANDING_PAGE } from '../../../routes'

const Header = () => {
  return (
    <header className="topbar" data-navbarbg="skin6">
      <nav className="navbar top-navbar navbar-expand-md">
        <div className="navbar-header" data-logobg="skin6">
          {/* This is for the sidebar toggle which is visible on mobile only */}
          <a className="nav-toggler waves-effect waves-light d-block d-md-none" href="#!"><i className="ti-menu ti-close" /></a>
          {/* ============================================================== */}
          {/* Logo */}
          {/* ============================================================== */}
          <div className="navbar-brand">
            {/* Logo icon */}
            <Link to={LANDING_PAGE}>
              <b className="logo-icon">
                {/* Dark Logo icon */}
                <img src="assets/images/logo-icon.png" alt="homepage" className="dark-logo" />
                {/* Light Logo icon */}
                <img src="assets/images/logo-icon.png" alt="homepage" className="light-logo" />
              </b>
              {/*End Logo icon */}
              {/* Logo text */}
              <span className="logo-text">
                {/* dark Logo text */}
                <h1 style={{ display: 'inline', fontSize: 'x-large', color: 'black' }}><span style={{ fontWeight: 'bold' }}>E</span>Tutor</h1>
                {/* Light Logo text */}
                {/* <img src="assets/images/logo-light-text.png" className="light-logo" alt="homepage" /> */}
              </span>
            </Link>
          </div>
          {/* ============================================================== */}
          {/* End Logo */}
          {/* ============================================================== */}
          {/* ============================================================== */}
          {/* Toggle which is visible on mobile only */}
          {/* ============================================================== */}
          <a className="topbartoggler d-block d-md-none waves-effect waves-light" href="#" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><i className="ti-more" /></a>
        </div>
        {/* ============================================================== */}
        {/* End Logo */}
        {/* ============================================================== */}
        <div className="navbar-collapse collapse" id="navbarSupportedContent">
          {/* ============================================================== */}
          {/* toggle and nav items */}
          {/* ============================================================== */}
          <ul className="navbar-nav float-left mr-auto ml-3 pl-1">
            <Notification />
            {/* ============================================================== */}
            {/* create new */}
            {/* ============================================================== */}
            {/* <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i data-feather="settings" className="svg-icon" />
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <div className="dropdown-divider" />
                <a className="dropdown-item" href="#">Something else here</a>
              </div>
            </li> */}
            {/* <li className="nav-item d-none d-md-block">
              <a className="nav-link" href="#">
                <div className="customize-input">
                  <select className="custom-select form-control bg-white custom-radius custom-shadow border-0" defaultValue="">
                    <option value="">EN</option>
                    <option value={1}>AB</option>
                    <option value={2}>AK</option>
                    <option value={3}>BE</option>
                  </select>
                </div>
              </a>
            </li> */}
          </ul>
          {/* ============================================================== */}
          {/* Right side toggle and nav items */}
          {/* ============================================================== */}
          <ul className="navbar-nav float-right">
            {/* ============================================================== */}
            {/* Search */}
            {/* ============================================================== */}
            <li className="nav-item d-none d-md-block">
              <a className="nav-link" href="#">
                <form>
                  <div className="customize-input">
                    <input className="form-control custom-shadow custom-radius border-0 bg-white" type="search" placeholder="Search" aria-label="Search" />
                    <i className="form-control-icon" data-feather="search" />
                  </div>
                </form>
              </a>
            </li>
            {/* ============================================================== */}
            {/* User profile and search */}
            {/* ============================================================== */}

            <Auth />

            {/* ============================================================== */}
            {/* User profile and search */}
            {/* ============================================================== */}
          </ul>
        </div>
      </nav>
    </header>

  )
}

export default Header
