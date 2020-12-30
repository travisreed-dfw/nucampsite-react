import React, { Component } from "react";
import {
    Card,
    CardImg,
    CardImgOverlay,
    CardText,
    CardBody,
    CardTitle,
} from "reactstrap";

class CampsiteInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCampsite: null,
        };
    }

    renderCampsite(campsite) {
        if (campsite) {
            return (
                <div className='col-md-5 m-1'>
                    <Card>
                        <CardImg top src={campsite.image} alt={campsite.name} />
                        <CardBody>
                            <CardTitle>{campsite.name}</CardTitle>
                            <CardText>{campsite.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        }
        return <div />;
    }

    renderComments(comments) {
        if (comments) {
            return (
                <div className='col-md-5 m-1'>
                    <h4>Comments</h4>
                    {comments.map((comment) => (
                        <div key={comment.id}>
                            {comment.text} <br />
                            -- {comment.author},{" "}
                            {new Intl.DateTimeFormat("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "2-digit",
                            }).format(new Date(Date.parse(comment.date)))}
                        </div>
                    ))}
                </div>
            );
        }
        return <div />;
    }

    render() {
        if (this.props.campsite) {
            return (
                <div className='row'>
                    {this.renderCampsite(this.props.campsite)}
                    {this.renderComments(this.props.campsite.comments)}
                </div>
            );
        } else {
            return <div></div>;
        }
    }
}

export default CampsiteInfo;
