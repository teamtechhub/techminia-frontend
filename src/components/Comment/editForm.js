import Button from "components/Button/Button";
import React from "react";

import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";

import markdownConverter from "./markdownConverter";

const conf = window.DJEDDIT_CONFIG;

let DISPLAY_USERNAME_FIELD = "surname";

if (conf) {
  ({ DISPLAY_USERNAME_FIELD } = conf);
}

export class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: props.parentPost.content,
      mdeTab: "write",
    };

    this.handleChangeContent = this.handleChangeContent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeContent(content) {
    this.setState({ content });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmitPost({
      content: this.state.content,
      uid: this.props.parentPost.uid,
      // parent: this.props.parentPost.uid
    });
    // this.setState({ content: '' })
  }

  // componentWillReceiveProps(nextProps) {
  //   // refresh with reload
  //   this.setState({ content: nextProps.parentPost.content })
  // }

  handleTabChange = (tab) => {
    this.setState({ mdeTab: tab });
  };

  render() {
    return (
      <div>
        <div md={11}>
          <div className="post-container bs-callout">
            <div className="">
              <h6 style={{ display: "inline" }} className="">
                Comment as{" "}
              </h6>
              {this.props.currentProfile ? (
                <h4 className="" style={{ display: "inline" }}>
                  <a
                    href={this.props.currentProfile.get_absolute_url}
                    target="blank"
                  >
                    {this.props.currentProfile[DISPLAY_USERNAME_FIELD]}
                  </a>
                </h4>
              ) : null}
            </div>
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
                    title={`Comment`}
                  />
                ) : (
                  <span>
                    <Button
                      type="submit"
                      disabled={this.state.content === ""}
                      title={`Edit`}
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
