import React from 'react';
import VanillaTilt from 'vanilla-tilt';

import './home.scss'

import { HomeMinicardComponent } from './HomeMinicardComponent';
import { HomeButtonComponent } from './HomeButtonComponent';
import Loading from '../../reusables/LoadingComponent/Loading';
import Error from '../../reusables/ErrorComponent/Error';

import { cms } from '../../../CMS';

import { slide } from '../../../slide'


export class HomeComponent extends React.Component
{
    constructor(props)
    {
        super(props);

        // Mockup values !!!
        this.state = {
            main_image: undefined,
            description_image: undefined,
            description: undefined,
            values: [],
            sections: [],
            buttons: [],
            loaded: false,
            error: false
        }
    }

    componentDidMount()
    {
        fetch(`${cms}/api/home?` + new URLSearchParams({
            'populate[0]': 'main_image', 
            'populate[1]': 'description_image', 
            'populate[2]': 'values', 
            'populate[3]': 'values.image', 
            'populate[4]': 'sections', 
            'populate[5]': 'sections.image', 
            'populate[6]': 'buttons',
            'populate[7]': 'buttons.image'
        })).then(
            res => {res.json().then(
                value => {
                    this.setState({
                        main_image: `${cms}${value.data.attributes.main_image.data.attributes.url}`,
                        description_image: `${cms}${value.data.attributes.description_image.data.attributes.url}`,
                        description: value.data.attributes.description,
                        values: value.data.attributes.values.map((v) => {
                            return {
                                img:`${cms}${v.image.data.attributes.url}`,
                                alt: v.image.data.attributes.alternativeText,
                                title: v.title,
                                text: v.text
                            }
                        }),
                        sections: value.data.attributes.sections.map((v) => {
                            return {
                                img:`${cms}${v.image.data.attributes.url}`,
                                alt: v.image.data.attributes.alternativeText,
                                title: v.title,
                                text: v.text
                            }
                        }),
                        buttons: value.data.attributes.buttons.map((v) => {
                            return {
                                img:`${cms}${v.image.data.attributes.url}`,
                                button_text: v.text,
                                href: v.href
                            }
                        }),
                        // loaded: true,
                        error: false
                    });
                }
            ).catch((e) => this.setState({error: e}))}
        ).catch((e) => this.setState({error: e}))
        .finally(() => this.setState({loaded: true}));

        window.addEventListener('scroll', (e) => {
            var viewH = window.innerHeight;
            var scrollPosition = document.scrollingElement.scrollTop;
            var body = document.body;

            if (scrollPosition / viewH > 0.7) {
                body.classList.add('nav-bg');
            } 
            else {
                if (body.classList.contains('nav-bg')) {
                    body.classList.remove('nav-bg');
                }
            }
        });
    }

    componentDidUpdate()
    {
        slide();

        VanillaTilt.init(this.logo, {
            reverse: true, // reverse the tilt direction
            max: 10, // max tilt rotation (degrees)
            perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
            speed: 1000, // Speed of the enter/exit transition
            transition: true, // Set a transition on enter/exit.
            reset: true, // If the tilt effect has to be reset on exit.
            'full-page-listening': true,
        });
    }

    render()
    {
        if(this.state.error) return(<Error message={this.state.error.toString()}/>)
        if(!this.state.loaded) return (<Loading />)
        return (
            <div id="home">
                <div id="logo_container" style={{'$imageurl': `url('/../public/img/team/2019_20/team.jpg?size=1920')`}}>
                    <div id="logo" ref={node => {this.logo = node}}></div>
                    <svg id="slide_down_icon" viewBox="0 0 247 390" version="1.1" xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink">
                        <path id="wheel" d="M123.359,79.775l0,72.843" style={{ fill:'none', stroke:'#fff', strokeWidth: '20px' }} />
                        <path id="mouse"
                            d="M236.717,123.359c0,-62.565 -50.794,-113.359 -113.358,-113.359c-62.565,0 -113.359,50.794 -113.359,113.359l0,143.237c0,62.565 50.794,113.359 113.359,113.359c62.564,0 113.358,-50.794 113.358,-113.359l0,-143.237Z"
                            style={{ fill:'none' ,stroke:'#fff', strokeWidth:'20px' }} />
                    </svg>
                    <div id="slide_down_text">Zjedź na dół by dowiedzieć się więcej</div>

                    <div id='team_image_container'>
                        <div id="moving_gradient"></div>
                        <div id='team_image' data-href={this.state.main_image} className="progressive replace">
                            <img src={this.state.main_image} alt="Zespół" className="team_image_l" />
                        </div>
                    </div>
                </div>
                <h1 className="section_topic">
                    O nas
                </h1>
                <div className="pageblock-full">
                    <div className="card slideable">
                        <div className="card-image">
                            <img src={this.state.description_image}/>
                        </div>
                        <h2 className="card-title">
                            O nas
                        </h2>
                        <h3 className="card-text">
                            {this.state.description}
                        </h3>
                    </div>
                </div>
                <h2 className="section_topic">
                    Warte uwagi
                </h2>
                <div className="pageblock-full">
                    <div className="buttonsgroup" ref={node => {this.buttons = node}}>
                        {this.state.buttons.map((value, index) => 
                            <HomeButtonComponent key={index} href={value.href} img={value.img} alt={value.alt} button_text={value.button_text}/>
                        )}
                    </div>
                </div>
                <h2 className="section_topic">
                    Nasze atuty
                </h2>
                <div className="pageblock-full">
                    <div className="cardgroup" ref={node => {this.values = node}}>
                        {this.state.values.map((value, index) => 
                            <HomeMinicardComponent key={index} img={value.img} alt={value.alt} title={value.title} text={value.text}/>
                        )}
                    </div>
                </div>
                <h2 className="section_topic">
                    Nasze sekcje
                </h2>
                <div className="pageblock-full">
                    <div className="cardgroup cardgroup-small" ref={node => {this.sections = node}}>
                        {this.state.sections.map((value, index) =>
                            <HomeMinicardComponent key={index} img={value.img} alt={value.alt} title={value.title} text={value.text}/>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}