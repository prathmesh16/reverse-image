import React,{useState, useEffect } from 'react'
import "./Nav.css"
import logo from './logo.svg';

function Nav() {
    return (
        <div className="nav nav__black">
            <div className="nav__contents">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p className="App-title">
                    Mirror Image App
                </p>
            </header>
            </div>
            
        </div>
    )
}

export default Nav;