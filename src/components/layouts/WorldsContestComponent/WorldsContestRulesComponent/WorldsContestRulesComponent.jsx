import React from "react";

import "../../DocumentsComponent/documents.css";

import Error from "../../../reusables/ErrorComponent/Error";
import Loading from "../../../reusables/LoadingComponent/Loading";
import DocumentCardComponent from "../../DocumentsComponent/DocumentCardComponent";

import { title } from "../../../../index";
import { cms } from "../../../../CMS";
import { slide } from "../../../../slide";

export class WorldsContestRulesComponent extends React.Component
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

    componentDidMount() {
        document.title = `WORLDS Regulaminy | ${title}`;

        fetch(`${cms}/api/worlds?` + new URLSearchParams({
            'populate[0]':'worlds_rules',
            'populate[1]':'worlds_rules.file',
            'populate[2]':'worlds_rules.thumb'
        })).then(
            res => {res.json().then(
                value => {
                    this.setState({
                        cards: value.data.worlds_rules.map((v) => {
                            return {
                                name: v.name,
                                link: `${cms}${v.file.url}`,
                                preview: `${cms}${v.thumb.url}`,
                                important: v.important
                            }
                        }),
                        error: false
                    });
                }
            ).catch((e) => this.setState({error: e}))}
        ).catch((e) => this.setState({error: e}))
        .finally(() => this.setState({loaded: true}));
    }

    componentDidUpdate()
    {
        slide();
    }

    render()
    {
        if(this.state.error) return(<Error message={this.state.error.toString()} />)
        if(!this.state.loaded) return(<Loading />)
        return(
            <div className="documents-container">
                <div className="section_topic">Regulamin</div>
                {this.state.cards
                    .filter(c => c.important)
                    .map((card, i) =>
                        <DocumentCardComponent
                            key={i}
                            name={card.name}
                            link={card.link}
                            preview={card.preview}
                            important
                        />
                    )}
                {this.state.cards
                    .filter(c => !c.important)
                    .map((card, i) =>
                        <DocumentCardComponent
                            key={i}
                            name={card.name}
                            link={card.link}
                            preview={card.preview}
                        />
                    )}
            </div>
        )
    }
}