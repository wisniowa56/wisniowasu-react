import React from 'react';

import {slide} from '../../../../slide'
import {title} from "../../../../index";
import {cms} from "../../../../CMS";
import Error from "../../../reusables/ErrorComponent/Error";
import Loading from "../../../reusables/LoadingComponent/Loading";

export class WorldsContestHelpComponent extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            faq: [],
            loaded: false,
            error: false
        }
    }
    componentDidMount()
    {
        document.title = `WORLDS Pomoc | ${title}`;
        fetch(`${cms}/api/worlds?`).then(
            res => {res.json().then(
                value => {
                    this.setState({
                        faq: value.data.worlds_faq,
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

    render()
    {
        if(this.state.error) return(<Error message={this.state.error.toString()} />)
        if(!this.state.loaded) return(<Loading />)
        return(
            <div>
                <h2 className="section_topic alt-mobile-anim">Często zadawane pytania</h2>
                <section className="contact-card slideable">
                    {this.state.faq.map((faq, index) => {
                        return (
                            <div key={index}>
                                <p>
                                    <b>Q: {faq[0]}</b>
                                    <br/>
                                    A: {faq[1]}
                                </p>
                            </div>
                        )
                    })}
                </section>
                <h2 className="section_topic alt-mobile-anim">Inne pytania? Napisz do nas</h2>
                <section className="contact-card slideable">
                    <h2 className="contact-card__title">Twojego pytania nie ma na liście?</h2>
                    <p className="contact-card__content">Nie wiesz co zrobić? Jeśli nie znalazłeś odpowiedzi na nurtujące Cię pytania wpadnij na długiej przerwie do pokoju Samorządu (23) albo napisz na adres <a href="mailto:samorzad@tm1.edu.pl">samorzad@tm1.edu.pl</a>.
                    </p>
                    <div className="contact-card__social">
                        <a href="https://instagram.wisniowasu.pl" title="Nasz Instagram" className="contact-card__social__instagram"></a>
                        <a href="https://facebook.wisniowasu.pl" title="Nasz Facebook" className="contact-card__social__facebook"></a>
                        <a href="https://youtube.wisniowasu.pl" title="Nasz YouTube" className="contact-card__social__youtube"></a>
                    </div>
                </section>
            </div>
        )
    }
}