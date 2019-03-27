import React, { Component } from 'react'
import VinsForm from './components/VinsForm';
import './App.css'
import createStreamerFrom from './api/streamer'
import generateCarData from './api/data-generator'

import { getSubmitVinErrorText } from './utils'

class App extends Component {
  streamers = {}
  state = {
    text: '',
    errorText: '',
    vins: [],
    filteredVins: [],
  }

  updateState = carData => {
    this.setState({ carData })
  }

  handleOnChange = ({ target: { value = '' } }) => {
    const { vins } = this.state;
    const filteredVins = value && vins.filter(data => data.vin.match(value)) || vins;
    this.setState({
      errorText: '',
      text: value.toUpperCase(),
      filteredVins
    });
  }

  handleOnSubmit = () => {
    const { text, vins, filteredVins } = this.state;
    const errorText = getSubmitVinErrorText(text, filteredVins.length)
    console.log(errorText)
    if (!errorText) {
      const streamer = createStreamerFrom(() => generateCarData(text))
      const data = streamer.generator()
      streamer.subscribe((d) => {
        console.log(d)
      })
      this.streamers[text] = streamer;

      const vin = { ...data, checked: false }
      const newVins = [...vins, vin];

      this.setState({
        text: '',
        vins: newVins,
        filteredVins: newVins,
      })
    } else {
      this.setState({ errorText })
    }
  }

  handleOnCheck = (vin) => {
    const { vins: oldVins } = this.state;
    const vins = oldVins.map(el => {
      if (el.vin === vin) {
        const streamer = this.streamers[vin]
        const checked = el.vin === vin ? !el.checked : el.checked
        checked ? streamer.start() : streamer.stop()
        return {
          ...el,
          checked,
        }
      } else {
        return el
      }
    })
    this.setState({ vins, filteredVins: vins })
  }

  render() {
    const { text, errorText, filteredVins } = this.state;
    return (
      <div className="App">
        <VinsForm
          list={filteredVins}
          text={text}
          errorText={errorText}
          handleOnChange={this.handleOnChange}
          handleOnSubmit={this.handleOnSubmit}
          handleOnCheck={this.handleOnCheck}
        />
      </div>
    )
  }
}

export default App
