import React from "react";
import { WiFIScheduleEntryComponent } from "./WiFIScheduleEntryComponent";
import Loading from "../../../reusables/LoadingComponent/Loading";
import Error from "../../../reusables/ErrorComponent/Error";

import './schedule.scss'

import { cms } from "../../../../CMS";
import { slide } from "../../../../slide";

export class WiFIScheduleComponent extends React.Component
{
    constructor(props)
    {
        super(props);
        
        this.state = {
            entries: [],
            loaded: false,
            error: false
        }
    }

    componentDidUpdate()
    {
        slide();
    }
    
    componentDidMount()
    {
        fetch(`${cms}/api/wifis?` + new URLSearchParams({
            'filters[year][$eq]': `${this.props.year}`,
            'populate[0]': 'wifi_schedule',
            'populate[1]': 'wifi_schedule.entries',
            'populate[2]': 'wifi_schedule.entries.sections'
        })).then(value => 
            value.json().then(
                value => {
                    this.setState({
                        entries: value.data[0].attributes.wifi_schedule.data.attributes.entries.map((v) => {
                            return {
                                hour: v.hour,
                                title: v.title,
                                sections: v.sections.map((v) => {
                                    return {
                                        title: v.title,
                                        text: v.text
                                    }
                                })
                            }
                        }),
                        // loaded: true,
                        error: false,
                    });
                }
            ).catch(e => this.setState({error: e}))
        ).catch(e => this.setState({error:e}))
        .finally(() => this.setState({loaded: true}));
    }

    render()
    {
        if(this.state.error) return(<Error message={this.state.error.toString()} />)
        if(!this.state.loaded) return (<Loading />)
        return(
            <div className="page-container">
                <section className="schedule">
                    <div className="vertical-line" ref={node => {this.vl = node}}></div>
                    <div ref={node => {this.schedule = node}}>
                        {this.state.entries.map((value, key) => 
                            <WiFIScheduleEntryComponent key={key} hour={value.hour} title={value.title} sections={value.sections}/>
                        )}
                    </div>
                </section>
            </div>
        );
    }
}