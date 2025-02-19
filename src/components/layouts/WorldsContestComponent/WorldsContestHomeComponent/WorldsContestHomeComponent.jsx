import React from "react";

import Loading from "../../../reusables/LoadingComponent/Loading";
import Error from "../../../reusables/ErrorComponent/Error";
import { cms } from "../../../../CMS";
import { title } from "../../../../index";

import './worldscontest.scss';
import {slide} from "../../../../slide";

export class WorldsContestHomeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logo: undefined,
            date: undefined,
            description: undefined,
            instructions: [],
            rules: [],
            note: undefined,
            loaded: false,
            error: false,
        };
    }

    count = () =>
    {
        if(!this.countdown)
        {
            clearInterval(this.interval);
            return;
        }
        var updatedText = 'Pozostały czas na zgłoszenia: ';
        var currentDate = new Date().getTime();

        var timeLeft = this.state.deadline - currentDate;

        var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        var hours = Math.floor(
            (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        var minutes = Math.floor(
            (timeLeft % (1000 * 60 * 60)) / (1000 * 60)
        );
        var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        if (days > 2) {
            updatedText += days + ' dni';
        } else if (days > 0) {
            if (days === 1) {
            updatedText += days + ' dzień ' + hours + 'h ' + minutes + 'm';
            } else {
            updatedText += days + ' dni ' + hours + 'h ' + minutes + 'm';
            }
        } else if (hours > 0) {
            updatedText += hours + 'h ' + minutes + 'm ' + seconds + 's';
        } else if (minutes > 0) {
            updatedText += minutes + 'm ' + seconds + 's';
        } else {
            updatedText += seconds + 's';
        }

        this.countdown.innerHTML = updatedText;

        if (timeLeft < 0) {
            this.countdown.innerHTML =
            'Czas na zgłoszenia minął!';
        }
    }

    componentDidMount() {
        document.title = `WORLDS | ${title}`;
        fetch(`${cms}/api/worlds?` + new URLSearchParams({
            'populate[0]':'worlds_main',
            'populate[1]':'worlds_main.logo'
        })).then(res => {
            res.json().then(value => {
                this.setState({
                    logo: `${cms}${value.data.worlds_main.logo.url}`,
                    deadline: new Date(value.data.worlds_main.deadline),
                    description: value.data.worlds_main.description,
                    instructions: value.data.worlds_main.instructions,
                    rules: value.data.worlds_main.rules,
                    note: value.data.worlds_main.note,
                    loaded: true,
                    error: false
                });
            }).catch((e) => this.setState({error: e}))
        }).catch((e) => this.setState({error: e}))
        .finally(() => this.setState({loaded: true}));
    }

    componentDidUpdate() {
        if(this.state.loaded && !this.state.error) {
            this.count();
            this.interval = setInterval(() => {this.count()}, 1000);
        }
        slide();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        if(this.state.error) return(<Error message={this.state.error.toString()} />)
        if(!this.state.loaded) return(<Loading />)
        return (
            <div className="worlds-contest">
                <div className="section_topic alt-mobile-anim" id="countdown" ref={node => {
                    this.countdown = node
                }}></div>
                <div className="pageblock-full" id="description-container">
                    <div className="minicard slideable" id="worlds_description">
                        <img className="minicard-icon lazyload" id="worlds-logo" alt="Logo WORLDS" src={this.state.logo}/>
                        <div className="minicard-title" id="worlds_description_title">
                            Wiśniowy Oryginalny Ranking Legendarnych Dzieł Satyrycznych
                        </div>
                        <div className="minicard-text">
                            <p>{this.state.description}</p>
                        </div>
                    </div>
                </div>
                <div className="section_topic">Przydatne informacje</div>
                <div className="pageblock-full">
                    <div className="cardgroup" id="instructions-container" ref={node => {
                        this.about_container = node
                    }}>
                        <div className="minicard slideable">
                            <div className="minicard-title">
                                Jak dołączyć?
                            </div>
                            <div className="minicard-text">
                                <ol>
                                    {this.state.instructions.map((instruction, index) => {
                                        return <li key={index}>{instruction}</li>
                                    })}
                                </ol>
                            </div>
                        </div>
                        <div className="minicard slideable">
                            <div className="minicard-title">
                                Zasady
                            </div>
                            <div className="minicard-text">
                                <ul>
                                    {this.state.rules.map((rule, index) => {
                                        return <li key={index}>{rule}</li>
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className="minicard slideable" id="worlds_note">
                            <div className="minicard-title">Dlaczego warto?</div>
                            <div className="minicard-text">
                                <p>{this.state.note}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}