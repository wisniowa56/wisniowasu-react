import React from 'react';

import {slide} from '../../../../slide'
import {title} from "../../../../index";
import {cms} from "../../../../CMS";
import Error from "../../../reusables/ErrorComponent/Error";
import Loading from "../../../reusables/LoadingComponent/Loading";

export class WorldsContestScheduleComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            schedule: [],
            loaded: false,
            error: false
        }
    }

    componentDidMount()
    {
        document.title = `WORLDS Harmonogram | ${title}`;
        fetch(`${cms}/api/worlds?`).then(
            res => {res.json().then(
                value => {
                    this.setState({
                        schedule: value.data.worlds_schedule,
                        error: false
                    });
                }
            ).catch((e) => this.setState({error: e}))}
        ).catch((e) => this.setState({error: e}))
        .finally(() => this.setState({loaded: true}));
    }

    componentDidUpdate() {
        slide();
    }

    render() {
        if(this.state.error) return(<Error message={this.state.error.toString()} />)
        if(!this.state.loaded) return(<Loading />)
        return (
            <div className="worlds-contest-schedule">
                <h2 className="section_topic alt-mobile-anim">Harmonogram</h2>
                <div className="pageblock-full">
                    <div className="worlds-minicard slideable" style={{width: "unset"}}>
                        <div className="worlds-minicard-text">
                            <ul>
                                {this.state.schedule.map((date, index) => {
                                    return <li key={index}>{date}</li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}