import faker from 'faker'
import isFunction from 'lodash/fp/isFunction'

export default function createStreamerFrom(generator, range) {
  return new Streamer(generator, range)
}

const DEFAULT_TIME_RANGE_IN_MS = [1000, 5000]

class Streamer {
  generator
  timeRange
  isStreaming = false
  timer
  handlers = []

  constructor(dataGenerator, timeRange = DEFAULT_TIME_RANGE_IN_MS) {
    if (!isFunction(dataGenerator)) {
      throw new Error('Streamer: Data generator must be a factory function')
    }
    this.generator = dataGenerator
    this.timeRange = timeRange
  }

  start() {
    this.isStreaming = true
    this.runTriggers()
  }

  stop() {
    this.isStreaming = false
  }

  runTriggers() {
    const [min, max] = this.timeRange
    const timeout = faker.random.number({ min, max })
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      if (this.isStreaming) {
        this.trigger()
        this.runTriggers()
      }
    }, timeout)
  }

  subscribe(handler) {
    this.handlers.push(handler)
  }

  removeHandler(handler) {
    this.handlers = this.handlers.filter(h => h !== handler)
  }

  trigger() {
    const record = this.generator()
    this.handlers.forEach(h => h(record))
  }
}
