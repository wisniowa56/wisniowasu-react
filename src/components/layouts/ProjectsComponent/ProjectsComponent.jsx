import React, { Suspense } from 'react';
import { ProjectsTimelineCardComponent } from './ProjectsTimelineCardComponent'
import Loading from '../../reusables/LoadingComponent/Loading';
import Error from '../../reusables/ErrorComponent/Error';

import './projects.scss'

import { cms } from '../../../CMS';
import { title } from '../../..';
import { slide } from '../../../slide';

export class ProjectsComponent extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            cards: [],
            loaded: false,
            error: false
        }
    }

    componentDidMount()
    {
        fetch(`${cms}/api/projects?` + new URLSearchParams({'populate[0]':'projects', 'populate[1]':'projects.image'})).then(
            res => {res.json().then(
                value => {
                    this.setState({
                        cards: value.data.attributes.projects.map((v) => {
                            return {
                                title: v.title,
                                date: v.date,
                                img: `${cms}${v.image.data.attributes.url}`,
                                text: v.text,
                            }
                        }),
                        // loaded: true,
                        error: false
                    });
                }
            ).catch((e) => this.setState({error: e}))}
        ).catch((e) => this.setState({error: e}))
        .finally(() => this.setState({loaded: true}));

        document.title = `Projekty | ${title}`;
    }

    componentDidUpdate()
    {
        slide();
    }

    render()
    {
        if(this.state.error) return(<Error message={this.state.error.toString()} />)
        if (!this.state.loaded) return (<Loading />)
        return (
            <div className="projects">
                <div className="title_box">
                    <h1 className="title_box_text">PROJEKTY</h1>
                </div>
                <div className="pageblock_timeline">
                    <div id="timeline_line"></div>
                    <div id="timeline_container">
                        <div className="timeline_card" ref={node => {this.cards = node}}>
                                {this.state.cards.map((value, index) => 
                                        <ProjectsTimelineCardComponent key={index} date={value.date} img={value.img} title={value.title} text={value.text} /> 
                                )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}