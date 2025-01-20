import React from "react";
import { TeamPickerComponent } from './TeamPickerComponent'
import { TeamYearComponent } from './TeamYearComponent';
import Loading from "../../reusables/LoadingComponent/Loading";
import Error from "../../reusables/ErrorComponent/Error";

import { Routes, Route } from "react-router-dom";

import './team.scss';
import { title } from "../../..";
import { cms } from '../../../CMS';

export class TeamComponent extends React.Component
{
    constructor(props)
    {
        super(props);
        
        this.state = {
            years: [],
            loaded: false,
            error: false
        };
    }

    componentDidMount()
    {
        fetch(`${cms}/api/teams`).then(value => 
            value.json().then(
                value => {
                    this.setState({
                        years: value.data.map((v) => {
                                return v.year;
                            }),
                        // loaded: true,
                        error: false,
                    });
                }
            ).catch(e => this.setState({error: e}))
        ).catch(e => this.setState({error:e}))
        .finally(() => this.setState({loaded: true}));

        document.title = `Zespół | ${title}`;
    }

    render()
    {
        if(this.state.error) return(<Error message={this.state.error.toString()} />);
        if (!this.state.loaded) return (<Loading />)
        return (
            <div id="team">
                <Routes>
                    <Route path="/" element={
                        <TeamYearComponent url={this.state.years.reduce((l,r) => Number(l.slice(0,4)) > Number(r.slice(0,4)) ? l : r)} />
                        // Automatyczne wybieranie najnowszego teamu
                    }/>
                    {this.state.years.map((i, key) => 
                        <Route path={`${i}`} key={key} element={
                            <TeamYearComponent url={i}/>}
                        />
                    )}
                    
                </Routes>
                <TeamPickerComponent years={this.state.years.map(i => {return { year: i.replace('-', '/'), url: i }})} />
            </div>
        );
    }
}