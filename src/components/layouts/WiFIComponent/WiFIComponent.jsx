import React from 'react';
import { WiFIYearPickerComponent } from './WiFIYearPickerComponent';
import { WiFIYearComponent } from './WiFIYearComponent';
import { Routes, Route } from 'react-router-dom';

import { cms } from '../../../CMS';
import Loading from '../../reusables/LoadingComponent/Loading';
import Error from '../../reusables/ErrorComponent/Error';
import { title } from '../../..';

export class WiFIComponent extends React.Component
{
    constructor(props)
    {
        super(props);

        // Mockup values!!!
        this.state = {
            years: [],
            loaded: false,
            error: false
        }
    }

    componentDidMount()
    {
        fetch(`${cms}/api/wifis`).then(value => 
            value.json().then(
                value => {
                    this.setState({
                        years: value.data.map((v) => {
                                return v.attributes.year;
                            }),
                        // loaded: true,
                        error: false,
                    });
                }
            ).catch(e => this.setState({error: e}))
        ).catch(e => this.setState({error:e}))
        .finally(() => this.setState({loaded: true}));

        document.title = `WiFI | ${title}`;
    }
    
    render()
    {
        if(this.state.error) return(<Error message={this.state.error.toString()} />)
        if(!this.state.loaded) return (<Loading />)
        return(
            <div id="wifi">
                <Routes>
                    <Route key={65535} exact path="/*" element={<WiFIYearComponent year={this.state.years.reduce((l,r) => l > r ? l : r)}/>}/>
                    {this.state.years.map(i => 
                        <Route key={i} exact path={`${i}/*`} element={<WiFIYearComponent year={i}/>}/>    
                    )}
                </Routes>
                <WiFIYearPickerComponent years={this.state.years}/>
            </div>
        );
    }
}