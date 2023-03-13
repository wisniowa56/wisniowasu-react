import React from "react";
import { ImageLoader, getThumbURL } from '../../../reusables/ImageLoader/ImageLoader'

export class WiFIDetailsCardComponent extends React.Component
{
    render()
    {
        return(
            <section className="info-card slideable">
                <div className="info-card__image rounded">
                    <ImageLoader className="info-card-image" style={{
                        'object-position': this.props.align == 'bottom'? 'bottom': this.props.align == 'top'? 'top' : ''
                    }} src={this.props.img} thumb={getThumbURL(this.props.img)}/>
                </div>
                <p className="info-card__image-caption">
                    {this.props.caption}<br/>
                </p>
                <article className="info-card__content">
                    <h3 className="info-card__header">{this.props.title}</h3>
                    <p className="info-card__text">{this.props.text}</p>
                </article>
            </section>
        );
    }
}