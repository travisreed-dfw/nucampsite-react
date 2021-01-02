import React, { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardTitle } from "reactstrap";

function RenderDirectoryItem(props) {
    return <Card></Card>;
}

class Directory extends Component {
    render() {
        const directory = this.props.campsites.map((campsite) => {
            return (
                <div key={campsite.id} className='col-md-5 m-1'>
                    <RenderDirectoryItem campsite={campsite} />
                    <CardImg
                        width='100%'
                        src={campsite.image}
                        alt={campsite.name}
                    />
                    <CardImgOverlay>
                        <CardTitle>{campsite.name}</CardTitle>
                    </CardImgOverlay>
                </div>
            );
        });

        return (
            <div className='container'>
                <div className='row'>{directory}</div>
            </div>
        );
    }
}

export default Directory;
