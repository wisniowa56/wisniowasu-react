import React from "react";

import "./documents.css";

import Error from "../../reusables/ErrorComponent/Error";
import Loading from "../../reusables/LoadingComponent/Loading";
import DocumentCardComponent from "./DocumentCardComponent";

import { title } from "../../../index";
import { cms } from "../../../CMS";
import { slide } from "../../../slide";

export class DocumentsComponent extends React.Component
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
        document.title = `Dokumenty | ${title}`;

        fetch(`${cms}/api/document?` + new URLSearchParams({
            'populate[0]':'documents', 
            'populate[1]':'documents.file', 
            'populate[2]':'documents.thumb'
        })).then(
            res => {res.json().then(
                value => {
                    this.setState({
                        cards: value.data.attributes.documents.map((v) => {
                            return {
                                name: v.name,
                                link: `${cms}${v.file.data.attributes.url}`,
                                preview: `${cms}${v.thumb.data.attributes.url}`,
                                important: v.important
                            }
                        }),
                        // loaded: true,
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
            <div className="documents">
                <div className="title_box">
                    <h1 className="title_box_text">
                        DOKUMENTY
                    </h1>
                </div>
                <div className="documents-container">
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
            </div>
        )
    }
}