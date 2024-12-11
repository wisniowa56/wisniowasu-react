import React from 'react';
import './menu.scss'

export class MenuComponent extends React.Component // DOKUMENTACJA
{
    constructor(props)
    {
        super(props);
        this.state = {
            active: false
        };
    }

    componentDidMount()
    {
        window.addEventListener('click', (e) => {
            if(!this.root.contains(e.target))
            this.setState({active:false});
        });

        this.nav_list.childNodes.forEach((node) => {
            if(node.firstChild.pathname === '/' && this.props.active === '')
                node.classList.add('active-nav');
            if(node.firstChild.pathname === `/${this.props.active}/`)
                node.classList.add('active-nav');
        })
    }

    toggle = () =>
    {
        if (this.state.active) {
            this.setState({active:false});
        } else {
            this.setState({active:true});
        }
    }

    render()
    {
        return (
            <header className={`cd-header ${this.state.active ? 'active-header' : ''}`} ref={node => {this.root = node}}>
                <div className="nav-logo">
                    <div className="nav-logo-image"></div>
                </div>
                <div className="nav-but-wrap" onClick={this.toggle}>
                    <div className="menu-icon hover-target">
                        <span className="menu-icon__line menu-icon__line-left"></span>
                        <span className="menu-icon__line"></span>
                        <span className="menu-icon__line menu-icon__line_last menu-icon__line-right"></span>
                    </div>
                </div>
                <div className="nav">
                    <div className="nav__content">
                        <ul className="nav__list" ref={node => {this.nav_list = node}}>
                            <li className={'nav__list-item'}><a href="/" className="hover-target">Strona
                                    główna</a></li>
                            <li className={`nav__list-item`}><a href="/team/"
                                    className="hover-target">Zespół</a></li>
                            <li className={`nav__list-item`}><a href="/merch/"
                                    className="hover-target">Merch</a></li>
                            <li className={`nav__list-item`}><a href="/projects/"
                                    className="hover-target">Projekty</a></li>
                            <li className={`nav__list-item`}><a href="/forstudent/"
                                    className="hover-target">Dla ucznia</a></li>
                            <li className={`nav__list-item`}><a href="/wifi/"
                                    className="hover-target">WiFI</a></li>
                            <li className={`nav__list-item`}><a href="/documents/"
                                    className="hover-target">Dokumenty</a></li>
                            <li className={`nav__list-item`}><a href="/contact/"
                                    className="hover-target">Kontakt</a></li>
                        </ul>
                    </div>
                </div>
            </header>
        );
    }
}