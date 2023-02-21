// React
import React from 'react'
import ReactDOM from 'react-dom'

// Entry-points
import { SketchUIDrawer } from 'entrypoints';

class SketchUI {
  options = [];
  elements = {
    drawer: undefined
  };
  defaultOpenValue = undefined;
  logger = undefined;

  constructor({ options, open = false, name, elements: { drawer }, logger }, render = true) {
    this.name = name;
    this.logger = logger;
    this.options = options;

    this.setter = undefined;
    this.getter = undefined;
    this.optionsSetter = undefined;

    this.defaultOpenValue = open;
    this.elements.drawer = document.querySelector(drawer);

    render && this.render();
  }

  render() {
    ReactDOM.render(
      <React.StrictMode>
        <SketchUIDrawer
          name={ this.name }
          values={ this.values }
          options={ this.options }
          defaultOpenValue={ this.defaultOpenValue }

          setter={ setter => this.setter = setter }
          getter={ getter => this.getter = getter }
          optionsSetter={ optionsSetter => this.optionsSetter = optionsSetter }
        />
      </React.StrictMode>,
      this.elements.drawer
    )
  }

  synchronize( options ) {
    this.optionsSetter( [...options] )
  }

  getValue(id) {
    return this.getter(id);
  }

  setValue(id, value) {
    this.setter(id, value);
  }
}

export default SketchUI;
