import React, { Suspense } from "react";
import { TeamPersonComponent } from './TeamPersonComponent';
import Loading from "../../reusables/LoadingComponent/Loading";
import Error from "../../reusables/ErrorComponent/Error";

import { cms } from "../../../CMS";

import { slide } from '../../../slide'
export class TeamYearComponent extends React.Component
{
    constructor(props)
    {
        super(props);

        // Mockup values!!!
        this.state = {
            year: this.props.url.replace('-', '/'),
            management: [],
            sections: [],
            loaded: false,
            error: false
        }
    }

    componentDidMount()
    {
        fetch(`${cms}/api/teams?` + new URLSearchParams({
            'filters[year][$eq]': `${this.props.url}`,
            'populate[0]': 'management',
            'populate[1]': 'management.photo',
            'populate[2]': 'management.icon',
            'populate[3]': 'sections',
            'populate[4]': 'sections.photo',
            'populate[5]': 'sections.icon'
        })).then(value => 
            value.json().then(
                value => {
                    this.setState({
                        management: value.data[0].attributes.management.map(v => {
                            return {
                                photo: `${cms}${v.photo.data.attributes.url}`,
                                icon: `${cms}${v.icon.data.attributes.url}`,
                                name: v.name,
                                role: v.role,
                                text: v.text
                            }
                        }),
                        sections: value.data[0].attributes.sections.map(v => {
                            return {
                                photo: `${cms}${v.photo.data.attributes.url}`,
                                icon: `${cms}${v.icon.data.attributes.url}`,
                                name: v.name,
                                role: v.role,
                                text: v.text
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

    componentDidUpdate()
    {
        slide();
    }

    render()
    {
        if(this.state.error) return (<Error message={this.state.error.toString()} />)
        if(!this.state.loaded) return (<Loading />)
        return (
            <div className="team_year">
                <div className="title_box">
                <h1 className="title_box_text">
                    ZESPÓŁ <span className="title_box_date">{this.state.year}</span>
                </h1>
            </div>
            <div className="fullpadding" id="teamcontainer">
                <p className="category">Zarząd</p>
                <div className="human-cardcontainer" ref={node => {this.management_cards = node}}>
                    {this.state.management.map((value, index) => 
                        <TeamPersonComponent key={index} photo={value.photo} icon={value.icon} name={value.name} role={value.role} text={value.text}/>
                    )}
                </div>
                <div className="spacer"></div>
                <p className="category">Przewodniczący Sekcji</p>
                <div className="human-cardcontainer" ref={node => {this.section_cards = node}}>
                    {this.state.sections.map((value, index) => 
                        <TeamPersonComponent key={index} photo={value.photo} icon={value.icon} name={value.name} role={value.role} text={value.text}/>
                    )}
                </div>
            </div>
        </div>
        );
    }
}