// React
import React from 'react'
import ReactDOM from 'react-dom'

// Entry-points
import { SketchUIDrawer } from 'entrypoints';

class SketchUI {
  options = [];
  elements = {
    drawer: undefined,
    icon: undefined
  };
  defaultOpenValue = undefined;
  logger = undefined;

  constructor({ options, open = false, elements: { drawer, icon }, logger }, render = true) {
    this.logger = logger;
    this.options = options;

    this.setter = undefined;
    this.getter = undefined;

    this.defaultOpenValue = open;
    this.elements.drawer = document.querySelector(drawer);
    this.elements.icon = document.querySelector(icon);
    render && this.render();
  }

  render() {
    ReactDOM.render(
      <React.StrictMode>
        <SketchUIDrawer
          values={ this.values }
          options={ this.options }
          defaultOpenValue={ this.defaultOpenValue }

          setter={ setter => this.setter = setter }
          getter={ getter => this.getter = getter }
        />
      </React.StrictMode>,
      this.elements.drawer
    )
  }

  getValue(id) {
    return this.getter(id);
  }

  setValue(id, value) {
    this.setter(id, value);
  }
}

export default SketchUI;
