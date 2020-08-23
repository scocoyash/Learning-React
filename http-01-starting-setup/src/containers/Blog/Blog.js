import React, { Component } from 'react';
import Posts from '../Posts/Posts';
import NewPost from '../NewPost/NewPost';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import './Blog.css';
class Blog extends Component {

    render () {
        
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink to="/posts">Posts</NavLink></li>
                            <li><NavLink to={{pathname:"/new-post"}}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    <Route path="/posts" component={Posts} />
                    <Route path="/new-post" component={NewPost} />
                    <Redirect from="/" to="/posts" />
                </Switch>
            </div>
        );
    }
}

export default Blog;