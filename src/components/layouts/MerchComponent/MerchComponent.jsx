import React from "react";

import Loading from "../../reusables/LoadingComponent/Loading";
import Error from "../../reusables/ErrorComponent/Error";
import { cms } from "../../../CMS";
import { title } from "../../../index";

import './merch.scss';
import { MerchCardComponent } from "./MerchCardComponent";


export class MerchComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            merch: [],
            loaded: true,
            error: false,
        };
    }

    componentDidMount() {
        document.title = `Merch | ${title}`;
        fetch(`${cms}/api/merch?populate=deep,product.img`).then(value =>
            value.json().then(
                value => {
                    this.setState({
                        merch: value.data.attributes.product,
                        loaded: true,
                        error: false,
                    });
                }
            ).catch(e => this.setState({error: e}))
        ).catch(e => this.setState({error:e}))
        .finally(() => this.setState({loaded: true}));
    }

    render() {
        if (this.state.error) return <Error message={this.state.error} />;
        if (!this.state.loaded) return <Loading />;
        return (
            <div className="merch">
                <div className="title_box">
                    <h1 className="title_box_text">
                        MERCH
                    </h1>
                </div>
                <div id="merch_container">
                    <div className="product-card-container">
                        {this.state.merch.map((item, index) => (
                            <MerchCardComponent
                                key={index}
                                name={item.name}
                                desc={item.description}
                                colors={item.colors}
                                sizes={item.sizes}
                                price={item.price}
                                img={item.img.data.map((image) => `${cms}${image.attributes.url}`)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}