import React, { Component } from 'react';
import Post from '../../components/Post/Post';
import FullPost from '../FullPost/FullPost';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';
import './Posts.css';

class Posts extends Component {
    state = {
        posts:[]
    }

    componentDidMount() {
        axios.get('/posts')
             .then(response => {
                 const posts = response.data.slice(0,4).map( post => {
                    return {
                        ...post,
                        author:'Max'
                    }
                 }
                );
                this.setState({posts: posts});
             }).catch(error => {
                 console.log(error);
                 // this.setState({error: true});
             });
    }

    postSelectHandler = (id) => {
        this.setState({selectedPostId:id});
    }

    render() {
        let posts = <p style={{textAlign:'center'}}>Something went wrong!</p>;
        if(!this.state.error) {
            posts = this.state.posts.map(
                post => {
                    return <Link key={post.id} to={'/posts/' + post.id}>
                        <Post title={post.title} author={post.author} 
                        clicked={() => this.postSelectHandler(post.id)} />
                    </Link>
                }
            );
        }
        
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
            </div>
        );
    }
}

export default Posts;