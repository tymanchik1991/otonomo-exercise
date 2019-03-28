import React from 'react'
import EventNotification from '../EventNotification'
import Checkbox from '../Checkbox'

import './index.scss'

const FILTER_TEXT = 'Filter events where fuel level is under 15%'
const FILTER_MIN_VALUE = 0.15

const getFilteredEvents = (carEvent, isFilterChecked) => {
  if (isFilterChecked) {
    return carEvent.fuel >= FILTER_MIN_VALUE ? (
      <EventNotification
        key={carEvent.vin}
        carEvent={carEvent}
        color={carEvent.color}
      />
    ) : null
  } else {
    return (
      <EventNotification
        key={carEvent.vin}
        carEvent={carEvent}
        color={carEvent.color}
      />
    )
  }
}

export default ({ cars, onFilterHandler, isFilterChecked }) => {
  const content = [...cars]
    .sort(carEvent => (carEvent.checked ? -1 : 0))
    .reduce((acc, carEvent) => {
      const result = getFilteredEvents(carEvent, isFilterChecked)
      return result ? [...acc, result] : acc
    }, [])

  return (
    <div className="event-list-wrapper">
      <div className="event-list-filter">
        <Checkbox
          checked={isFilterChecked}
          value={isFilterChecked}
          onChange={onFilterHandler}>
          {FILTER_TEXT}
        </Checkbox>
      </div>
      <div className="events-container">{content}</div>
    </div>
  )
}
