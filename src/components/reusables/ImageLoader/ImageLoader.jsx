import React from "react";
import './image_loader.css';

export const getThumbURL = (src) =>
{
    try
    {
        let url = new URL(src);
        let u = url.pathname.split('/')
        let thumbname = `thumbnail_${u.pop()}`

        return `${url.origin}/${u.join('')}/${thumbname}`
    }
    catch
    {}
}

export class ImageLoader extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            loaded: false
        }
    }

    imgLoaded = () =>
    {
        if(this.img.complete)
        {
            this.setState({loaded:true});
        }
        this.thumb.remove();
    }

    render()
    {
        return(
            <div className="image-loader">
                <img className={this.state.loaded ? 'collapsed' : ''} ref={node => { this.thumb = node}} src={this.props.thumb} alt={this.props.alt ? this.props.alt : ''}/>
                <img className={!this.state.loaded ? 'collapsed' : ''} ref={node => {this.img = node}} src={this.props.src} onLoad={() => {this.imgLoaded()}} alt={this.props.alt ? this.props.alt : ''}/>
            </div>
        );
    }
}