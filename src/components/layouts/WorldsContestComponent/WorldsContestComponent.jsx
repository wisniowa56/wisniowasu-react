import React from 'react';
import {Routes, Route, Link} from 'react-router-dom';

import './worlds_header.scss';
import Loading from '../../reusables/LoadingComponent/Loading';
import Error from '../../reusables/ErrorComponent/Error';
import { title } from '../../..';
import {WorldsContestHomeComponent} from "./WorldsContestHomeComponent/WorldsContestHomeComponent";
import {WorldsContestHelpComponent} from "./WorldsContestHelpComponent/WorldsContestHelpComponent";
import {WorldsContestRulesComponent} from "./WorldsContestRulesComponent/WorldsContestRulesComponent";
import {WorldsContestScheduleComponent} from "./WorldsContestScheduleComponent/WorldsContestScheduleComponent";


export class WorldsContestComponent extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            loaded: false,
            error: false
        }
    }

    componentDidMount()
    {
        document.title = `WORLDS | ${title}`;
        this.setState({loaded: true});
    }

    render()
    {
        if(this.state.error) return(<Error message={this.state.error.toString()} />)
        if(!this.state.loaded) return (<Loading />)
        return(
            <div id="worlds">
                <div className="title_box">
                    <h1 className="title_box_text">
                        WORLDS
                    </h1>
                </div>

                <div className="worlds-header">
                    <Link className="worlds-header__home-button" to='.'></Link>
                    <span className="vertical-spacer"></span>
                    <Link className="worlds-header__button" to='schedule'>Harmonogram</Link>
                    <span className="vertical-spacer"></span>
                    <Link className="worlds-header__button" to='rules'>Regulamin</Link>
                    <span className="vertical-spacer"></span>
                    <Link className="worlds-header__button" to='help'>Pomoc</Link>
                </div>

                <Routes>
                    <Route exact path="/" element={<WorldsContestHomeComponent />} key={1}/>
                    <Route exact path="schedule" element={<WorldsContestScheduleComponent />} key={2}/>
                    <Route exact path="rules" element={<WorldsContestRulesComponent />} key={3}/>
                    <Route exact path="help" element={<WorldsContestHelpComponent />} key={4}/>
                </Routes>
            </div>
        );
    }
}