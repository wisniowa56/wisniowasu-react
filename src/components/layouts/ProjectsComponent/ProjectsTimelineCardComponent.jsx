import React from "react";
import { ImageLoader, getThumbURL } from '../../reusables/ImageLoader/ImageLoader'

export class ProjectsTimelineCardComponent extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            active: false
        }
    }

    toggle = () => {
        if(!this.state.active)
        {
            const e = new Event('timeline-card-select'); 
            document.dispatchEvent(e); 
            this.setState({active:true});
            this.root.scrollIntoView({'block':'center', 'behavior':'smooth'})
        }
        else
        {
            this.setState({active:false});
        }
    }

    collapse = () => {
        this.setState({active:false});
    }

    componentDidMount()
    {
        document.addEventListener('timeline-card-select', () => {
            this.collapse();
        });
    }

    render()
    {
        return (
            <div className="timeline_card slideable" ref={node => {this.root = node}}>
                <div className="date">
                    {this.props.date}
                </div>
                <div className={`container ${this.state.active ? 'open' : ''}`}>
                    <div className="img_container" onClick={this.toggle}>
                        <ImageLoader src={this.props.img} thumb={getThumbURL(this.props.img)}/>
                    </div>
                    <div className="title">
                        {this.props.title}
                    </div>
                    <div className="text">
                        {this.props.text}
                    </div>
                </div>
            </div>
        );
    }
}