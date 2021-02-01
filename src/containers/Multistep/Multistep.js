import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import "./animate.custom.css";
import "./styles.css";

export default class StepWizard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = this.initialState();
  }

  componentDidMount() {
    // Hash change listener - for back/forward button
    if (this.props.isHashEnabled) {
      window.addEventListener("hashchange", this.onHashChange);
    }

    // Provide instance to parent
    this.props.instance(this);
  }

  componentWillUnmount() {
    // Remove listener
    if (this.props.isHashEnabled) {
      window.removeEventListener("hashchange", this.onHashChange);
    }
  }

  /** Setup Steps */
  initialState = () => {
    const state = {
      activeStep: 0,
      icons: {},
      names: {},
      classes: {},
      hashKeys: {},
    };

    // Set initial classes
    // Get hash only in client side
    const hash = typeof window === "object" ? this.getHash() : "";
    const children = this.getSteps();
    children.forEach((child, i) => {
      // Create hashKey map
      state.hashKeys[i] =
        (child.props && child.props.hashKey) || `step${i + 1}`;
      state.hashKeys[state.hashKeys[i]] = i;
      state.icons[i] =
        (child.props && child.props.Icon) ||
        (child.props && child.props.name) ||
        `step ${i + 1}`;
      state.icons[state.icons[i]] = i;
      state.names[i] = (child.props && child.props.name) || `Step ${i + 1}`;
      state.names[state.names[i]] = i;
    });

    // Set activeStep to initialStep if exists
    const initialStep = this.props.initialStep - 1;
    if (initialStep && children[initialStep]) {
      state.activeStep = initialStep;
    }

    // Set activeStep from hash - trumps initialStep
    if (
      this.props.isHashEnabled &&
      hash &&
      state.hashKeys[hash] !== undefined
    ) {
      // References hashKey
      state.activeStep = state.hashKeys[hash];
    }

    // Give initial step an intro class
    if (this.props.transitions) {
      state.classes[state.activeStep] = this.props.transitions.intro || "";
    }

    return state;
  };

  // Get hash and remove #
  getHash = () => decodeURI(window.location.hash).replace(/^#/, "");

  getTransitions = () =>
    this.props.transitions || {
      enterRight: `animated fadeInRight`,
      enterLeft: `animated fadeInLeft`,
      exitRight: `animated fadeOutRight`,
      exitLeft: `animated fadeOutLeft`,
    };

  onHashChange = () => {
    const next = this.state.hashKeys[this.getHash()];

    if (next !== undefined) this.setActiveStep(next);
  };

  isInvalidStep = (next) => next < 0 || next >= this.totalSteps;

  setActiveStep = (next) => {
    const active = this.state.activeStep;
    if (active === next) return;
    if (this.isInvalidStep(next)) {
      console.error(`${next + 1} is an invalid step`);
      return;
    }

    // console.log(change, active, next);

    const { classes } = this.state;
    const transitions = this.getTransitions();

    if (active < next) {
      // slide left
      classes[active] = transitions.exitLeft;
      classes[next] = transitions.enterRight;
    } else {
      // slide right
      classes[active] = transitions.exitRight;
      classes[next] = transitions.enterLeft;
    }

    this.setState(
      {
        activeStep: next,
        currentIcon: this.props.currentIcon,
        classes,
      },
      () => {
        // Step change callback
        this.onStepChange({
          previousStep: active + 1,
          activeStep: next + 1,
        });
      }
    );
  };

  onStepChange = (stats) => {
    // User callback
    this.props.onStepChange(stats);

    // Update hash if prop set
    if (this.props.isHashEnabled) this.updateHash(this.state.activeStep);
    this.updateIcon(this.state.activeStep);
  };

  /** Getters */
  get currentStep() {
    return this.state.activeStep + 1;
  }
  get previousStepName() {
    return this.state.names[this.state.activeStep - 1]
      ? this.state.names[this.state.activeStep - 1]
      : null;
  }
  get nextStepName() {
    return this.state.names[this.state.activeStep + 1]
      ? this.state.names[this.state.activeStep + 1]
      : "Finish";
  }

  get totalSteps() {
    return this.getSteps().length;
  }

  getSteps = () => React.Children.toArray(this.props.children);

  /** Go to first step */
  firstStep = () => this.goToStep(1);

  /** Go to last step */
  lastStep = () => this.goToStep(this.totalSteps);

  /** Next Step */
  nextStep = () => this.setActiveStep(this.state.activeStep + 1);

  /** Previous Step */
  previousStep = () => this.setActiveStep(this.state.activeStep - 1);

  /** Go to step index */
  goToStep = (step) => this.setActiveStep(step - 1);

  updateHash = (activeStep) => {
    window.location.hash = this.state.hashKeys[activeStep];
  };
  updateIcon = (activeStep) => {
    this.currentIcon = this.state.icons[activeStep];
  };

  // Allows for using HTML elements as a step
  isReactComponent = ({ type }) =>
    typeof type === "function" || typeof type === "object";

  /** Render */
  render() {
    const props = {
      currentStep: this.currentStep,
      nextStepName: this.nextStepName,
      previousStepName: this.previousStepName,
      currentIcon: this.currentIcon,
      totalSteps: this.totalSteps,
      icons: this.state.icons,
      /** Functions */
      nextStep: this.nextStep,
      previousStep: this.previousStep,
      goToStep: this.goToStep,
      firstStep: this.firstStep,
      lastStep: this.lastStep,
    };

    const { classes } = this.state;
    const childrenWithProps = React.Children.map(
      this.getSteps(),
      (child, i) => {
        if (!child) return null;

        props.isActive = i === this.state.activeStep;
        props.transitions = classes[i];

        // Not Lazy Mount || isLazyMount && isActive
        if (
          !this.props.isLazyMount ||
          (this.props.isLazyMount && props.isActive)
        ) {
          return (
            <Step {...props}>
              {this.isReactComponent(child)
                ? React.cloneElement(child, props)
                : child}
            </Step>
          );
        }

        return null;
      }
    );

    return (
      <div className={this.props.className}>
        {this.props.nav && React.cloneElement(this.props.nav, props)}
        <div className={"step-wrapper"}>{childrenWithProps}</div>
      </div>
    );
  }
}

StepWizard.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  initialStep: PropTypes.number,
  instance: PropTypes.func,
  isHashEnabled: PropTypes.bool,
  isLazyMount: PropTypes.bool,
  nav: PropTypes.node,
  onStepChange: PropTypes.func,
  transitions: PropTypes.object,
};

StepWizard.defaultProps = {
  children: [],
  className: null,
  initialStep: 1,
  instance: () => {},
  isHashEnabled: false,
  isLazyMount: false,
  nav: null,
  onStepChange: () => {},
  transitions: undefined,
};

export const Step = ({ children, isActive, transitions }) => (
  <div className={`step ${transitions} ${isActive ? "active" : ""}`.trim()}>
    {children}
  </div>
);

if (process.env.NODE_ENV !== "production") {
  Step.propTypes = {
    children: PropTypes.node,
    isActive: PropTypes.bool,
    transitions: PropTypes.string,
  };
}

Step.defaultProps = {
  children: [],
  isActive: false,
  transitions: "",
};
