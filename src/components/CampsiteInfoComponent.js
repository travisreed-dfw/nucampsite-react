import React, { Component } from "react";
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    Breadcrumb,
    BreadcrumbItem,
    Label,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
        };

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
        });
    }
    handleSubmit(values) {
        console.log("Current state is: " + JSON.stringify(values));
        alert("Current state is: " + JSON.stringify(values));
    }
    render() {
        return (
            <React.Fragment>
                <Button
                    className='fa fa-lg fa-pencil'
                    outline
                    onClick={this.toggleModal}>
                    Submit Comment
                </Button>
                <Modal
                    isOpen={this.state.isModalOpen}
                    toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm
                            onSubmit={(values) => this.handleSubmit(values)}>
                            <div className='form-group'>
                                <Label htmlFor='rating'>Rating</Label>
                                <Control.select
                                    model='.rating'
                                    id='rating'
                                    name='rating'
                                    placeholder='rating'
                                    className='form-control'
                                    validators={{
                                        required,
                                    }}>
                                    <option value='1'>1</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                    <option value='4'>4</option>
                                    <option value='5'>5</option>
                                </Control.select>
                                <Errors
                                    className='text-danger'
                                    model='.rating'
                                    show='touched'
                                    component='div'
                                    messages={{
                                        required: "Required",
                                    }}
                                />
                            </div>
                            <Label htmlFor='author'>Your Name</Label>

                            <Control.text
                                model='.author'
                                id='author'
                                name='author'
                                placeholder='author'
                                className='form-control'
                                validators={{
                                    required,
                                    minLength: minLength(2),
                                    maxLength: maxLength(15),
                                }}
                            />
                            <Errors
                                className='text-danger'
                                model='.author'
                                show='touched'
                                component='div'
                                messages={{
                                    required: "Required",
                                    minLength: "Must be at least 2 characters",
                                    maxLength: "Must be 15 characters or less",
                                }}
                            />

                            <Label htmlFor='text'>Comment</Label>

                            <Control.textarea
                                model='.text'
                                id='text'
                                name='text'
                                placeholder='comment'
                                className='form-control'
                                rows='6'
                                validators={{
                                    required,
                                }}
                            />
                            <Errors
                                className='text-danger'
                                model='.text'
                                show='touched'
                                component='div'
                                messages={{
                                    required: "Required",
                                }}
                            />
                            <Button type='submit' color='primary' md={3}>
                                Submit
                            </Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

function RenderCampsite({ campsite }) {
    if (campsite) {
        return (
            <div className='col-md-5 m-1'>
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }
    return <div />;
}

function RenderComments({ comments }) {
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
                <CommentForm />
            </div>
        );
    }
    return <div />;
}

function CampsiteInfo(props) {
    if (props.campsite) {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to='/directory'>Directory</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>
                                {props.campsite.name}
                            </BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className='row'>
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        );
    }
    return <div />;
}

export default CampsiteInfo;
