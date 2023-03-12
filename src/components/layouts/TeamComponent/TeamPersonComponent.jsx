import React from "react";
import VanillaTilt from 'vanilla-tilt';
import { ImageLoader, getThumbURL } from '../../reusables/ImageLoader/ImageLoader'

export class TeamPersonComponent extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            active: false
        }
    }

    componentDidMount()
    {
        VanillaTilt.init(this.root, {
            reverse: true, // reverse the tilt direction
            max: 10, // max tilt rotation (degrees)
            perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
            speed: 1000, // Speed of the enter/exit transition
            transition: true, // Set a transition on enter/exit.
            reset: true, // If the tilt effect has to be reset on exit.
            scale: 1.1,
        });
    }

    toggle = () =>
    {
        if(!this.state.active)
        {
            this.setState({active:true});
        }
        else
        {
            this.setState({active:false})
        }
    }
    
    render()
    {
        return(
            <div className={`human-card slideable ${this.state.active ? 'disp open' : ''}`} onClick={this.toggle} onMouseLeave={() => {this.setState({active:false})}} ref={node => {this.root = node}} data-tilt>
                <ImageLoader className="personimg" src={this.props.photo} thumb={getThumbURL(this.props.photo)}/>
                <div className="info">
                    <img src={this.props.icon} />
                    <div className="box">
                        <p className="title">{this.props.role}</p>
                        <p className="name">{this.props.name}</p>
                    </div>
                </div>
                <div className="moreinfo">
                    {this.props.text}
                </div>
            </div>
        );
    }
}