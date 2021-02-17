import React from "react";

import PropTypes from "prop-types";

import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";

import markdownConverter from "./markdownConverter";
import Button from "components/Button/Button";

const conf = window.DJEDDIT_CONFIG;

let DISPLAY_USERNAME_FIELD = "surname";

if (conf) {
  ({ DISPLAY_USERNAME_FIELD } = conf);
}

export class ReplyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      mdeTab: "write",
    };

    this.handleChangeContent = this.handleChangeContent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeContent(content) {
    this.setState({ content });
  }

  handleTabChange = (tab) => {
    this.setState({ mdeTab: tab });
  };

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmitPost({
      content: this.state.content,
      parent: this.props.parentPost.uid,
    });
    this.setState({ content: "" });
  }

  render() {
    return (
      <div>
        <div md={11}>
          <div className="post-container bs-callout">
            {this.props.parentPost.level === 0 ? (
              <div className="">
                <h6 style={{ display: "inline" }} className="">
                  Comment as{" "}
                </h6>
                {this.props.currentProfile ? (
                  <h5 className="" style={{ display: "inline" }}>
                    <a
                      href={this.props.currentProfile.get_absolute_url}
                      target="blank"
                    >
                      {this.props.currentProfile[DISPLAY_USERNAME_FIELD]}
                    </a>
                  </h5>
                ) : null}
              </div>
            ) : (
              <div className="">
                <h6 style={{ display: "inline" }} className="">
                  Reply to{" "}
                </h6>
                <h4 className="" style={{ display: "inline" }}>
                  {this.props.parentPost.created_by ? (
                    <a
                      href={this.props.parentPost.created_by.get_absolute_url}
                      target="blank"
                    >
                      {this.props.parentPost.created_by[DISPLAY_USERNAME_FIELD]}
                    </a>
                  ) : (
                    "Guest"
                  )}
                </h4>
              </div>
            )}
            <ReactMde
              onChange={this.handleChangeContent}
              value={this.state.content}
              selectedTab={this.state.mdeTab}
              onTabChange={this.handleTabChange}
              generateMarkdownPreview={(markdown) =>
                Promise.resolve(markdownConverter.makeHtml(markdown))
              }
            />
            <br />
            <form
              method="post"
              acceptCharset="utf-8"
              onSubmit={this.handleSubmit}
            >
              <div className="btn-group btn-group-xs" role="group">
                {this.props.parentPost.level === 0 ? (
                  <Button
                    disabled={this.state.content === ""}
                    type="submit"
                    title={"Comment"}
                  />
                ) : (
                  <span>
                    <Button
                      type="submit"
                      disabled={this.state.content === ""}
                      title={"Relpy"}
                    />
                    &nbsp;
                    <Button
                      type="reset"
                      onClick={this.props.onToggleForm}
                      title={`Cancel`}
                    />
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

ReplyForm.propTypes = {
  parentPost: PropTypes.object.isRequired,
  currentProfile: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onSubmitPost: PropTypes.func.isRequired,
  onToggleForm: PropTypes.func,
};
