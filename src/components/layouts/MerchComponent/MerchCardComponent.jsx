import React from "react";

import ImageSlider from "../../reusables/ImageSlider/ImageSlider";

export class MerchCardComponent extends React.Component
{
    componentDidMount() { setTimeout(() => { window.dispatchEvent(new Event('resize')) }, 0); }
    render()
    {
        return (
            <div className="product-card slideable">
                <div className="price">{this.props.price} zł</div>
                <div className="preview"><ImageSlider images={this.props.img}/></div>
                <h2 className="name">{this.props.name}</h2>
                <div className="details">
                    <div className="desc">{this.props.desc}</div>
                    <ul className="colors">
                        <b>Dostępne kolory:</b>
                        {this.props.colors.map((color) => (
                            <li>{color}</li>
                        ))}
                    </ul>
                    {this.props.sizes && (
                        <table className="sizes">
                            <thead>
                                <tr>
                                    <th>Rozmiar</th>
                                    {this.props.sizes[0].map((dimension) => (
                                        <th>{dimension}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.sizes[1].map((sizeObj, index) =>
                                    Object.entries(sizeObj).map(([size, dimensions]) => (
                                        <tr>
                                            <td><b>{size}</b></td>
                                            {dimensions.map((d) => (
                                                <td>{d} cm</td>
                                            ))}
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        )
    }
}