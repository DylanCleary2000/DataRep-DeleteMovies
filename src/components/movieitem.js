import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import  Button  from 'react-bootstrap/Button';
import axios from 'axios';

export class MovieItem extends React.Component {

    constructor(){
    super();

    //Must bind.
    this.DeleteMovie = this.DeleteMovie.bind(this);
    }

    DeleteMovie(e)
    {
        //Prevents method from going into database and deleting randomly.
        e.preventDefault();
        console.log("Delete: "+this.props.movie._id);
        axios.delete("http://localhost:4000/api/movies/"+ this.props.movie._id)
        .then(()=>{
            //Calls ReloadData on movies.js,then calls ReloadData on read.js,updates list.
            this.props.ReloadData();
        })
        .catch();
    }

    render() {
        return (
            <div>

                <Card>
                    <Card.Header>{this.props.movie.title}</Card.Header>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                            <img src={this.props.movie.poster} width="200" height="200"></img>
                            <footer className="blockquote-footer">
                                {this.props.movie.year}
                            </footer>
                        </blockquote>
                    </Card.Body>
                   <Link to={"/edit/"+ this.props.movie._id} className="btn btn-primary">Edit</Link>
                   {/* Button with event handler to trigger DeleteMovie method */}
                   <Button variant="danger" onClick={this.DeleteMovie}>Delete</Button>
                </Card>

            </div>
        );
    }
}