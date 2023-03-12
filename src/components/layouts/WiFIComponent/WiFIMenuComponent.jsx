import React from "react";
import { Link } from 'react-router-dom';
import { WiFIYearPickerComponent } from './WiFIYearPickerComponent'
import './wifi_header.scss';

export class WiFIMenuComponent extends React.Component
{
    render()
    {
        return(
            <div className="wifi-header">
                <Link className="wifi-header__home-button" to='.'></Link>
                    <span className="vertical-spacer"></span>
                    <Link className="wifi-header__button" to='details'>Szczegóły wydarzenia</Link>
                    <span className="vertical-spacer"></span>
                    <Link className="wifi-header__button" to='schedule'>Harmonogram</Link>
                    <span className="vertical-spacer"></span>
                <Link className="wifi-header__button" to='contact'>Kontakt</Link>
            </div>
        );
    }
}