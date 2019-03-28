import React, { Component } from 'react'
import createStreamerFrom from '../../api/streamer'
import generateCarData from '../../api/data-generator'
import { getSubmitVinErrorText, eventColors } from '../../utils'
import VinsForm from '../VinsForm'
import EventsList from '../EventsList'

import './index.scss'

export default class OtonomoPage extends Component {
  streamers = {}
  state = {
    text: '',
    errorText: '',
    carsData: [],
    filteredCarsData: [],
    isFilterChecked: false,
  }

  updateState = carsData => {
    this.setState({ carsData })
  }

  updateIsFilterChecked = () => {
    this.setState(({ isFilterChecked }) => ({
      isFilterChecked: !isFilterChecked,
    }))
  }

  handleOnChange = ({ target: { value = '' } }) => {
    const { carsData } = this.state
    const filteredCarsData = value
      ? carsData.filter(data => data.vin.match(value))
      : carsData
    this.setState({
      errorText: '',
      text: value.toUpperCase(),
      filteredCarsData,
    })
  }

  updateCardsData = carData => {
    const { carsData: oldData } = this.state
    const carsData = oldData.map(data => {
      return data.vin === carData.vin
        ? {
            ...carData,
            color: data.color,
            checked: data.checked,
          }
        : data
    })
    this.setState({ carsData })
  }

  handleOnSubmit = () => {
    const { text, carsData, filteredCarsData } = this.state
    const errorText = getSubmitVinErrorText(text, filteredCarsData.length)
    if (!errorText) {
      const streamer = createStreamerFrom(() => generateCarData(text))
      const data = streamer.generator()

      streamer.subscribe(this.updateCardsData)

      this.streamers[data.vin] = streamer
      const color = eventColors[carsData.length & eventColors.length]
      const carData = { ...data, color, checked: false }
      const newCarsData = [...carsData, carData]

      this.setState({
        text: '',
        carsData: newCarsData,
        filteredCarsData: newCarsData,
      })
    } else {
      this.setState({ errorText })
    }
  }

  handleOnCheck = vin => {
    const { carsData: oldCarData } = this.state
    const carsData = oldCarData.map(el => {
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
    this.setState({ carsData, filteredCarsData: carsData })
  }

  render() {
    const {
      text,
      errorText,
      filteredCarsData,
      carsData,
      isFilterChecked,
    } = this.state
    return (
      <div className="otonomo-wrapper">
        <VinsForm
          list={filteredCarsData}
          text={text}
          errorText={errorText}
          handleOnChange={this.handleOnChange}
          handleOnSubmit={this.handleOnSubmit}
          handleOnCheck={this.handleOnCheck}
        />
        <EventsList
          cars={carsData}
          isFilterChecked={isFilterChecked}
          onFilterHandler={this.updateIsFilterChecked}
        />
      </div>
    )
  }
}
