import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/chat_actions';

class ChatBox extends Component {
  constructor() {
    super();
    this.state = { message: '' };
  }
  // //
  // // componentDidMount(){
  // //  this._handleMessageEvent()
  // // }
  // //
  // _handleMessageEvent(){
  //   deubb
  //   this.props.socket.on('chat message', (data) => {
  //     debugger
  //     this.setState({ messages: this.state.messages.concat([data]) })
  //   })
  // }

  handleTextChange(e) {
    this.setState({ message: e.target.value });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    if (this.state.message.trim() !== '') {
      const data = { sender: this.props.currentUser, receiver: this.props.targetUser, message: this.state.message };
      this.props.sendMessage(data);
    }
    this.setState({ message: '' });
  }

  renderMessages() {
    return this.props.messages.map((m) => {
      return (
        <div>
          <span>{m.sender.username}: </span>
          <span>{m.message}</span>
        </div>
      )
    });
  }

  render() {
    return (
      <div className={`${this.constructor.name}-component`}>
        <div className="header">
          <span className="header-avatar">
            <img src={this.props.targetUser.avatar_url} alt=""/>
          </span>
          <span className="header-username">{this.props.targetUser.username}</span>
        </div>
        <div className="messages">
          {this.renderMessages()}
        </div>
        <div className="compose-message">
          <form onSubmit={this.handleFormSubmit.bind(this)}>
              <div>
                <textarea placeholder="Compose your message" value={this.state.message} onChange={this.handleTextChange.bind(this)} />
              </div>
            <button type="submit" className="btn btn-primary">Send</button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.chatReducer.messages
  };
}

export default connect(mapStateToProps, actions)(ChatBox);
