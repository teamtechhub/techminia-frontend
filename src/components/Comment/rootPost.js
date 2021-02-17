import React from "react";

import PropTypes from "prop-types";
import Moment from "react-moment";
import ReactMarkdown from "react-markdown";
import { Container, Row, Col, Btn } from "./styles";
import MathJax from "react-mathjax2";
// import RMathJax from 'react-mathjax'
import { ArrowDown, ArrowUp } from "components/AllSvgIcon";
import Button from "components/Button/Button";
import RemarkMathPlugin from "remark-math";
import { ReplyForm } from "./replyForm";
import { EditForm } from "./editForm";
import { AlertDotIcon } from "components/AllSvgIcon";
// import { renderMathJs } from './utils'

const conf = window.DJEDDIT_CONFIG;

let DISPLAY_USERNAME_FIELD = "username";

if (conf) {
  ({ DISPLAY_USERNAME_FIELD } = conf);
}

// TODO move MarkdownMathRender to utils
const MarkdownMathRender = (props) => {
  const newProps = {
    ...props,
    plugins: [RemarkMathPlugin],
    renderers: {
      ...props.renderers,
      math: (_props) => <MathJax.Node>{_props.value}</MathJax.Node>,
      inlineMath: (_props) => (
        <MathJax.Node inline>{_props.value}</MathJax.Node>
      ),
    },
  };

  return (
    <MathJax.Context input="tex">
      <ReactMarkdown {...newProps} />
    </MathJax.Context>
  );
};

// TODO rewrite with react functional component
// TODO extract buttons and voting to the new component
export class RootPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      replyFormShow: false,
      editFormShow: false,
      content: this.props.post.content,
    };

    this.onSubmitReplay = this.onSubmitReplay.bind(this);
    this.onSubmitEdit = this.onSubmitEdit.bind(this);
    this.toggleReplyForm = this.toggleReplyForm.bind(this);
    this.toggleEditForm = this.toggleEditForm.bind(this);
    this.onVoteClick = this.onVoteClick.bind(this);
    this.editComment = this.editComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.restoreComment = this.restoreComment.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.post && this.props.post.content !== prevProps.post.content) {
      this.setState({ content: this.props.post.content });
    }
  }

  onSubmitReplay(...args) {
    this.props.onSubmitReplay(...args);
    this.toggleReplyForm();
  }

  onSubmitEdit(...args) {
    this.props.onSubmitEdit(...args);
    this.toggleEditForm();
  }

  restoreComment() {
    const post = { uid: this.props.post.uid, deleted_on: null };
    this.props.onSubmitEdit(post);
  }

  toggleReplyForm() {
    this.setState({ replyFormShow: !this.state.replyFormShow });
  }

  toggleEditForm() {
    this.setState({ editFormShow: !this.state.editFormShow });
  }

  deleteComment() {
    // delete comment reload thread
    if (AlertDotIcon("Are you sure you want to delete this comment?")) {
      // TODO we can use Modal from react bootstrap if needed
      this.props.onDelete(this.props.post);
    }
  }

  editComment() {
    this.setState({ editFormShow: !this.state.editFormShow });
  }

  onVoteClick(value) {
    this.props.changePostVote(this.props.post, value);
  }

  render() {
    return (
      <div>
        {this.props.post &&
          (this.props.showReplyFormOnly ? (
            <Container fluid style={{ padding: 0 }}>
              <Row>
                <Col sm={11} md={11}>
                  <Row className="gray-text">
                    <Col md={1} sm={2} xs={4}>
                      {this.props.post.created_by ? (
                        <a
                          href={this.props.post.created_by.get_absolute_url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {this.props.post.created_by[DISPLAY_USERNAME_FIELD]}
                        </a>
                      ) : (
                        "Guest"
                      )}
                    </Col>
                    <Col md={2} sm={3} xs={4}>
                      <Moment fromNow>{this.props.post.created_on}</Moment>
                    </Col>
                    <Col md={2} sm={3} xs={4}>
                      {this.props.post.modified_on ? (
                        <span>
                          edited{" "}
                          <Moment fromNow>{this.props.post.modified_on}</Moment>
                        </span>
                      ) : null}
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} md={12}>
                      {/* djeddit part */}
                      <div className="postcol">
                        <div className="post-content">
                          {/* fix for markdown editor */}
                          <div
                            style={{
                              display: this.state.editFormShow
                                ? "block"
                                : "none",
                            }}
                          >
                            <EditForm
                              parentPost={this.props.post}
                              currentProfile={this.props.currentProfile}
                              onSubmitPost={(args) => {
                                this.setState({ content: args.content });
                                this.onSubmitEdit(args);
                              }}
                              onToggleForm={this.toggleEditForm}
                            />
                          </div>
                          {this.state.editFormShow ? null : (
                            <div className="mde-preview">
                              <div className="mde-preview-content">
                                <MarkdownMathRender
                                  source={this.state.content}
                                />
                              </div>
                            </div>
                          )}
                          {/* renderMathJs( */}
                          {/* <ReactMarkdown source={this.state.content} />, */}
                          {/* )} */}
                        </div>
                        <div className="djeddit-post-item-footer">
                          {!this.props.post.deleted_on && (
                            <div className="djeddit-score">
                              <Button
                                onClick={() => this.onVoteClick(1)}
                                style={{
                                  cursor: "pointer",
                                  margin: "0 .5rem",
                                  background: "transparent",
                                  padding: 0,
                                  height: "auto",
                                  color:
                                    this.props.post.user_vote === 1 && "blue",
                                }}
                                icon={<ArrowUp />}
                              />
                              <span className=" djeddit-score-number">
                                {this.props.post.score}
                              </span>
                              <Button
                                onClick={() => this.onVoteClick(-1)}
                                style={{
                                  cursor: "pointer",
                                  margin: "0 .5rem",
                                  background: "transparent",
                                  padding: 0,
                                  height: "auto",
                                  color:
                                    this.props.post.user_vote === -1 && "blue",
                                }}
                                icon={<ArrowDown />}
                              />
                            </div>
                          )}
                          {this.props.currentProfile &&
                          !this.props.post.deleted_on ? (
                            <div
                              className="btn-group btn-group-xs"
                              role="group"
                            >
                              {this.props.post.user_can_edit && (
                                <Btn
                                  style={{
                                    background: "#ef592b",
                                    margin: "5px",
                                    height: "25px",
                                    padding: "0 10px",
                                  }}
                                  onClick={this.toggleEditForm}
                                  title="Edit"
                                />
                              )}
                              <Btn
                                style={{
                                  background: "#652e8d",
                                  margin: "5px",
                                  height: "25px",
                                  padding: "0 10px",
                                }}
                                onClick={this.toggleReplyForm}
                                title="Reply"
                              />
                              {this.props.post.user_can_delete &&
                              !this.props.post.deleted_on ? (
                                <Btn
                                  style={{
                                    background: "#e90b0bbf",
                                    margin: "5px",
                                    height: "25px",
                                    padding: "0 10px",
                                  }}
                                  onClick={this.deleteComment}
                                  title="Delete"
                                />
                              ) : null}
                            </div>
                          ) : null}
                          {this.props.currentProfile &&
                          this.props.currentProfile.is_staff &&
                          this.props.post.deleted_on ? (
                            <div
                              className="btn-group btn-group-xs"
                              role="group"
                            >
                              <Btn
                                style={{
                                  background: "#ef592b",
                                  margin: "5px",
                                  height: "25px",
                                  padding: "0 10px",
                                }}
                                onClick={this.restoreComment}
                                title="Restore"
                              />
                            </div>
                          ) : null}
                          {!this.props.currentProfile &&
                          !this.props.post.deleted_on ? (
                            <span>
                              Please register or login to post a comment
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} md={12}>
                      <div className="btn-group btn-group-xs" role="group">
                        {/* <span className='pib-link' onClick={this.toggleReplyForm}>Reply</span> */}
                        {/* <span className='pib-link' onClick={this.toggleReplyForm}>Share</span> */}
                      </div>
                    </Col>
                  </Row>
                  {/* fix for markdown editor */}
                  <div
                    style={{
                      display: this.state.replyFormShow ? "block" : "none",
                    }}
                  >
                    <ReplyForm
                      parentPost={this.props.post}
                      currentProfile={this.props.currentProfile}
                      onSubmitPost={this.onSubmitReplay}
                      onToggleForm={this.toggleReplyForm}
                    />
                  </div>
                </Col>
              </Row>
            </Container>
          ) : (
            this.props.currentProfile && ( // show only for logged in user
              <ReplyForm
                parentPost={this.props.post}
                currentProfile={this.props.currentProfile}
                onSubmitPost={this.onSubmitReplay}
                onToggleForm={this.toggleReplyForm}
              />
            )
          ))}
      </div>
    );
  }
}

RootPost.propTypes = {
  post: PropTypes.object.isRequired,
  onSubmitReplay: PropTypes.func.isRequired,
  onSubmitEdit: PropTypes.func.isRequired,
  currentProfile: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  changePostVote: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  showReplyFormOnly: PropTypes.bool,
};
