import React from "react";
import { Routes, Route } from 'react-router-dom';
import { WiFIMenuComponent } from "./WiFIMenuComponent";
import { WiFIMainComponent } from './WiFIMainComponent/WiFIMainComponent';
import { WiFIDetailsComponent } from './WiFIDetailsComponent/WiFIDetailsComponent';
import { WiFIScheduleComponent } from './WiFIScheduleComponent/WiFIScheduleComponent';
import { WiFIContactComponent } from './WiFIContactComponent/WiFIContactComponent';

export class WiFIYearComponent extends React.Component
{
    render()
    {
        return(
            <div id="wifi-year">
                <div className="title_box">
                    <h1 className="title_box_text">
                        WiFI {this.props.year}
                    </h1>
                </div>
                <WiFIMenuComponent year={this.props.year}/>
                <Routes>
                    <Route exact path="/" element={<WiFIMainComponent year={this.props.year} key={1}/>}/>
                    <Route exact path="details" element={<WiFIDetailsComponent year={this.props.year} key={2}/>}/>
                    <Route exact path="schedule" element={<WiFIScheduleComponent year={this.props.year}/>} key={3}/>
                    <Route exact path="contact" element={<WiFIContactComponent year={this.props.year}/>} key={4}/>
                </Routes>
            </div>
        );
    }
}