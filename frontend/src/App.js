import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import api from './api';
import PostView from './Components/PostView';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      content: '',
      results: [],
    }
  }

  componentDidMount() {
    this.getPosts()
  }

  async getPosts() {
    let _results = await api.getAllPosts()
    this.setState({ results: _results.data })
  }

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value,
    })
  }

  handleSubmit = async evt => {
    evt.preventDefault()
    await api.createPost({
      title: this.state.title,
      content: this.state.content,
    })
    this.setState({
      title: '',
      content: '',
    })
    this.getPosts()
  }

  handleDelete = async id => {
    await api.deletePost(id)
    this.getPosts()
  }

  render() {
    return (
      <div className="App">
        <div className="PostingSection">
          <form className="" onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="title"
              onChange={this.handleChange}
              value={this.state.title}
            />
            <textarea
              name="content"
              onChange={this.handleChange}
              value={this.state.content}></textarea>
            <button type="submit">제출하기</button>
          </form>
        </div>
        <div className="ViewSection">
          {this.state.results.map(post => (
            <div>
              <PostView
                key={post.id}
                id={post.id}
                title={post.title}
                content={post.content}
              />
              <button
                type="submit"
                onClick={event => this.handleDelete(post.id)}>
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  }
};
