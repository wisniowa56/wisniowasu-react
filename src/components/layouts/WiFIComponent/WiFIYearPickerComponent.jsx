import React from "react";
import { Link } from "react-router-dom";

export class WiFIYearPickerComponent extends React.Component
{
    render()
    {
        return(
            <div className="teampicker_dropdown wifi_picker">
                <button className="teampicker_dropdown_button">Zobacz poprzednie edycje WiFI</button>
                <div className="teampicker_dropdown_content">
                    {this.props.years.map((i) =>
                        {return (<div key={i}><a href={`/wifi/${i}`}>{`${i}`}</a></div>)}
                    )}
                </div>
            </div>
        );
    }
}