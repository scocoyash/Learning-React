import React, { Component } from 'react';
import Post from '../../components/Post/Post';
import './Posts.css';
import axios from 'axios';

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
                    return <Post key={post.id} title={post.title} author={post.author} 
                    clicked={() => this.postSelectHandler(post.id)}/>
                }
            );
        }
        
        return (
            <section className="Posts">
                {posts}
            </section>
        );
    }
}

export default Posts;