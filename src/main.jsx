// React
import React from 'react'
import ReactDOM from 'react-dom'

// Entry-points
import { SketchUIDrawer } from 'entrypoints';

// Third party
import { reduce } from 'lodash-es';

class SketchUI {
  values = {};
  values = {};
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
    this.defaultOpenValue = open;
    this.elements.drawer = document.querySelector(drawer);
    this.elements.icon = document.querySelector(icon);
    this.values = reduce(options, (values, option) => {
      values[option.id] = option.defaultValue;
      return values;
    }, {});

    render && this.render();
  }

  render() {
    ReactDOM.render(
      <React.StrictMode>
        <SketchUIDrawer
          values={ this.values }
          options={ this.options }
          defaultOpenValue={ this.defaultOpenValue }
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
