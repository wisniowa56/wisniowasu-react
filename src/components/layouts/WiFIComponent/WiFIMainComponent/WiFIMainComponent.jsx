import React from "react";
import { WiFIMainMinicardComponent } from "./WiFIMainMinicardComponent";
import { WiFISponsorComponent } from "./WiFISponsorComponent";

import './wifi.scss';
import { WiFIPartnerComponent } from "./WiFIPartnerComponent";
import Loading from "../../../reusables/LoadingComponent/Loading";
import Error from "../../../reusables/ErrorComponent/Error";

import { cms } from "../../../../CMS";
import { slide } from '../../../../slide'

export class WiFIMainComponent extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            logo: undefined,
            date: undefined,
            description: undefined,
            about: [],
            sponsors: [],
            partners: [],
            loaded: false,
            error: false, 
        }
    }

    count = () => 
    {
        var updatedText = 'Czas do wydarzenia: ';
        var currentDate = new Date().getTime();

        var timeLeft = this.state.date - currentDate;

        if (timeLeft < -1000 * 60 * 60 * 12) {
            this.countdown.innerHTML =
            'Kolejna edycja już wkrótce!';
            return;
        }

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
            'Zapraszamy do wzięcia udziału!';
        }
    }

    componentDidMount()
    {
        fetch(`${cms}/api/wifis?` + new URLSearchParams({
            'filters[year][$eq]': `${this.props.year}`,
            'populate[0]': 'wifi_main',
            'populate[1]': 'wifi_main.logo',
            'populate[2]': 'wifi_main.date',
            'populate[3]': 'wifi_main.about',
            'populate[4]': 'wifi_main.partners',
            'populate[5]': 'wifi_main.partners.logo',
            'populate[6]': 'wifi_main.sponsors',
            'populate[7]': 'wifi_main.sponsors.img'
        })).then(value => 
            value.json().then(
                value => {
                    this.setState({
                        logo: `${cms}${value.data[0].attributes.wifi_main.data.attributes.logo.data.attributes.url}`,
                        logo_alt: value.data[0].attributes.wifi_main.data.attributes.logo.data.attributes.alternativeText,
                        date: new Date(value.data[0].attributes.wifi_main.data.attributes.date),
                        description: value.data[0].attributes.wifi_main.data.attributes.description,
                        video_link: value.data[0].attributes.wifi_main.data.attributes.video_link,
                        about: value.data[0].attributes.wifi_main.data.attributes.about.map(v => {
                            return {
                                title: v.title,
                                text: v.text
                            }
                        }),
                        sponsors: value.data[0].attributes.wifi_main.data.attributes.sponsors.map(v => {
                            return {
                                link: v.link,
                                img: `${cms}${v.img.data.attributes.url}`,
                                alt: v.img.data.attributes.alternativeText
                            }
                        }),
                        partners: value.data[0].attributes.wifi_main.data.attributes.partners.map(v => {
                            return {
                                title: v.title,
                                content: v.content,
                                facebook: v.facebook,
                                twitter: v.twitter,
                                discord: v.discord,
                                instagram: v.instagram,
                                youtube: v.youtube,
                                img: `${cms}${v.logo.data.attributes.url}`,
                                alt: v.logo.data.attributes.alternativeText
                            }
                        }),
                        // loaded: true,
                        error: false,
                    });
                    
                    if(this.state.loaded && !this.state.error) 
                    {   
                        this.count();
                        
                        this.interval = setInterval(() => {this.count()}, 1000);
                    }
                }
            ).catch(e => this.setState({error: e}))
        ).catch(e => this.setState({error:e}))
        .finally(() => this.setState({loaded: true}));
    }

    componentDidUpdate()
    {
        slide();
    }

    componentWillUnmount()
    {
        clearInterval(this.interval);
    }

    render()
    {
        if(this.state.error) return(<Error message={this.state.error.toString()} />)
        if(!this.state.loaded) return (<Loading />)
        return(
            <div>
                <div className="section_topic alt-mobile-anim" id="countdown" ref={node => {this.countdown = node}}></div>
                    <div className="pageblock-full" id="description-container">
                        <div className="minicard slideable" id="wifi_description">
                            <img className="minicard-icon lazyload" id="wifi-logo" alt={this.state.logo_alt}
                                src={this.state.logo} />
                            <h3 className="minicard-title" id="wifi_description_title">Wiśniowy Festiwal Inicjatyw</h3>
                            <h3 className="minicard-text">{this.state.description}
                            </h3>
                            {this.state.video_link ? <a href={this.state.video_link} className="gradient-button">Zobacz film promocyjny</a> : null}
                        </div>
                    </div>
                <div className="section_topic">O WiFI</div>
                <div className="pageblock-full">
                    <div className="cardgroup" id="about-container" ref={node => {this.about_container = node}}>
                        {this.state.about.map((value, key) => 
                            <WiFIMainMinicardComponent key={key} title={value.title} text={value.text}/>
                        )}
                    </div>
                </div>
                <div className="section_topic">Sponsorzy</div>
                <div className="sponsors" ref={node => {this.sponsors_container = node}}>
                    {this.state.sponsors.map((value, key) => 
                        <WiFISponsorComponent key={key} img={value.img} alt={value.alt} link={value.link} /> 
                    )}
                </div>
                <p className="sponsors__disclaimer">{this.state.sponsors_disclaimer}</p>
                <div className="section_topic">Partnerzy</div>
                <div className="pageblock-full" ref={node => {this.partners_container = node}} style={{'flexFlow': 'row wrap', 'alignItems': 'stretch'}}>
                    {this.state.partners.map((value, key) =>
                        <WiFIPartnerComponent key={key} img={value.img} alt={value.alt} title={value.title} content={value.content} 
                            facebook={value.facebook? value.facebook : undefined} discord={value.discord? value.discord : undefined}
                            twitter={value.twitter? value.twitter : undefined} instagram={value.instagram? value.instagram : undefined} 
                            youtube={value.youtube? value.youtube : undefined}
                        />
                    )}
                </div>
            </div>
        );
    }
}