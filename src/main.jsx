// React
import React from 'react'
import ReactDOM from 'react-dom'

// Entry-points
import { SketchUIDrawer } from 'entrypoints';

class SketchUI {
  values = {};
  logger = undefined;
  options = undefined;
  elements = {
    drawer: undefined,
    icon: undefined
  };

  constructor({ options, elements: { drawer, icon }, logger }) {
    this.logger = logger;
    this.options = options;
    this.elements.drawer = document.querySelector(drawer);
    this.elements.icon = document.querySelector(icon);
  }

  render() {
    ReactDOM.render(
      <React.StrictMode>
        <SketchUIDrawer
          values={ this.values }
          options={ this.options }
          onChange={ (id, value) => this.onChange(id, value) }
        />
      </React.StrictMode>,
      this.elements.drawer
    )
  }

  onChange( id, value ) {
    this.setValue(id, value);
    this.logger && this.logger("onChange", id, value);
  }

  getValue(id) {
    return this.values[id];
  }

  setValue(id, value) {
    this.values[id] = value;
  }
}

export default SketchUI;
