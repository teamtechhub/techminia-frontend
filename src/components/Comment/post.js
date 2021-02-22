import React from "react";

import PropTypes from "prop-types";
import Moment from "react-moment";
import ReactMarkdown from "react-markdown";
import MathJax from "react-mathjax2";

import RemarkMathPlugin from "remark-math";
import { ReplyForm } from "./replyForm";
import { EditForm } from "./editForm";
import { Container, Row, Col, Btn } from "./styles";
import { ArrowDown, ArrowUp } from "components/AllSvgIcon";
import Button from "components/Button/Button";

const conf = window.DJEDDIT_CONFIG;

let DISPLAY_USERNAME_FIELD = "surname";

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
export class Post extends React.Component {
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
    this.restoreComment = this.restoreComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
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
    if (alert("Are you sure you want to delete this comment?")) {
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
        {this.props.post ? (
          <Container fluid style={{ padding: 0 }}>
            <Col sm={11} md={11}>
              <Row>
                <Col sm={12} md={12}>
                  {/* darasa-forum part */}
                  <div className="postcol">
                    <div>
                      {/* fix for markdown editor */}
                      <div
                        style={{
                          display: this.state.editFormShow ? "block" : "none",
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
                            <MarkdownMathRender source={this.state.content} />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="darasa-forum-post-item-footer">
                      {this.props.currentProfile &&
                      !this.props.post.deleted_on ? (
                        <div
                          style={{
                            marginLeft: "auto",
                          }}
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
                          {!this.props.post.deleted_on && (
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
                          )}
                          {/* <button */}
                          {/* onClick={this.toggleReplyForm} */}
                          {/* className='btn btn-secondary'> */}
                          {/* Parent */}
                          {/* </button> */}
                          {this.props.post.user_can_delete && (
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
                          )}
                        </div>
                      ) : null}
                      {this.props.currentProfile &&
                      this.props.currentProfile.is_staff &&
                      this.props.post.deleted_on ? (
                        <div className="btn-group btn-group-xs" role="group">
                          <Btn
                            style={{
                              background: "#ef592b",
                              margin: "5px",
                              height: "25px",
                              padding: "0 10px",
                            }}
                            onClick={this.restoreComment}
                            className="btn btn-secondary"
                            title="Restore"
                          />
                        </div>
                      ) : null}
                      {!this.props.currentProfile &&
                      !this.props.post.deleted_on ? (
                        <span>Please register or login to post a comment</span>
                      ) : null}
                    </div>
                  </div>
                </Col>
              </Row>
              <Row
                style={{ borderTop: "1px solid #0000001a", fontSize: "11px" }}
              >
                <Col>
                  {!this.props.post.deleted_on && (
                    <div
                      className="darasa-forum-score"
                      style={{
                        display: "inline-flex",
                      }}
                    >
                      <Button
                        onClick={() => this.onVoteClick(1)}
                        style={{
                          cursor: "pointer",
                          margin: "0 .5rem",
                          background: "transparent",
                          padding: 0,
                          height: "auto",
                          color: this.props.post.user_vote === 1 && "blue",
                        }}
                        icon={<ArrowUp />}
                      />
                      <span className=" darasa-forum-score-number">
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
                          color: this.props.post.user_vote === -1 && "blue",
                        }}
                        icon={<ArrowDown />}
                      />
                    </div>
                  )}
                </Col>
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
                <div
                  style={{
                    display: "block",
                    minWidth: "120px",
                    padding: "5px",
                  }}
                >
                  <Col
                    style={{
                      marginLeft: "auto",
                      padding: 0,
                      textAlign: "right",
                    }}
                    md={2}
                    sm={3}
                    xs={4}
                  >
                    <Moment fromNow>{this.props.post.created_on}</Moment>
                  </Col>
                  <Col
                    style={{
                      marginLeft: "auto",
                      padding: 0,
                      textAlign: "right",
                    }}
                    md={2}
                    sm={3}
                    xs={4}
                  >
                    {this.props.post.modified_on ? (
                      <span>
                        edited{" "}
                        <Moment fromNow>{this.props.post.modified_on}</Moment>
                      </span>
                    ) : null}
                  </Col>
                </div>
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
          </Container>
        ) : null}
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  onSubmitReplay: PropTypes.func.isRequired,
  onSubmitEdit: PropTypes.func.isRequired,
  currentProfile: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  changePostVote: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
