import {Component} from 'react'

import './index.css'

const initialState = {
  isTimerRunning: false,
  timeElapsedInSeconds: 0,
  timerLimitInMinutes: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount = () => {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  decreaseTime = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timeLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  increaseTime = () => {
    this.setState(prevState => ({
      timeLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  onResetTime = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementTimeElapsedInSeconds = () => {
    const {timeElapsedInSeconds, timerLimitInMinutes} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {
      isTimerRunning,
      timeElapsedInSeconds,
      timeLimitInMinutes,
    } = this.state
    const isTimerCompleted = timeElapsedInSeconds === timeLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setInterval(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timeElapsedInSeconds, timeLimitInMinutes} = this.state
    const totalRemainingSeconds = timeLimitInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {
      isTimerRunning,
      timerLimitInMinutes,
      timeElapsedInSeconds,
    } = this.state
    const isBtnDisabled = timeElapsedInSeconds > 0
    const startOrPauseImgUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'
    const pausedOrRunningText = isTimerRunning ? 'Running' : 'Paused'
    const formattedTime = this.getElapsedSecondsInTimeFormat()

    return (
      <div className="bg-container">
        <h1 className="main-heading">Digital Timer</h1>
        <div className="main-container">
          <div className="timer-container">
            <div className="timer-inner-container">
              <h1 className="timer">{formattedTime}</h1>
              <p className="timer-pause">{pausedOrRunningText}</p>
            </div>
          </div>
          <div className="timer-description-container">
            <div className="start-reset-container">
              <div className="start-reset-sub-container">
                <button
                  className="start-reset-btn"
                  type="button"
                  onClick={this.onStartOrPauseTimer}
                >
                  <img
                    className="start-reset-icon"
                    src={startOrPauseImgUrl}
                    alt={startOrPauseAltText}
                  />
                </button>
                <p className="start-reset">Start</p>
              </div>
              <div className="start-reset-sub-container">
                <button
                  className="start-reset-btn"
                  type="button"
                  onClick={this.onResetTime}
                >
                  <img
                    className="start-reset-icon"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                  />
                </button>
                <p className="start-reset">Reset</p>
              </div>
            </div>
            <p className="timer-reset-description">Set Timer limit</p>
            <div className="timer">
              <button
                className="timer-increase-decrease-btn"
                type="button"
                onClick={this.increaseTime}
                disabled={isBtnDisabled}
              >
                +
              </button>
              <p className="timer-increase-decrease-description">
                {timerLimitInMinutes}
              </p>
              <button
                className="timer-increase-decrease-btn"
                type="button"
                onClick={this.decreaseTime}
                disabled={isBtnDisabled}
              >
                -
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
