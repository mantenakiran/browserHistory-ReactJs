import {Component} from 'react'
import HistoryItem from '../HistoryItems'
import './index.css'

class History extends Component {
  state = {
    searchInput: '',
    historyList: [],
  }

  componentDidMount() {
    const {initialHistoryList} = this.props
    this.setState({historyList: initialHistoryList})
  }

  filterHistoryList = () => {
    const {searchInput, historyList} = this.state
    const updatedHistoryList = historyList.filter(eachHistory =>
      eachHistory.title.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return updatedHistoryList
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onDeleteHistory = id => {
    const {historyList} = this.state
    const updatedHistoryList = historyList.filter(
      eachHistory => eachHistory.id !== id,
    )
    this.setState({historyList: updatedHistoryList})
  }

  render() {
    const {searchInput} = this.state
    const filteredHistoryList = this.filterHistoryList()

    return (
      <div>
        <div className="top-container">
          <img
            alt="app logo"
            className="history-logo"
            src="https://assets.ccbp.in/frontend/react-js/history-website-logo-img.png"
          />
          <div className="input-container">
            <div>
              <img
                alt="search"
                className="search-logo"
                src="https://assets.ccbp.in/frontend/react-js/search-img.png"
              />
            </div>
            <div>
              <input
                value={searchInput}
                onChange={this.onChangeSearchInput}
                className="inputEl"
                type="search"
              />
            </div>
          </div>
        </div>

        <div>
          <div>
            {filteredHistoryList.length === 0 ? (
              <p className="para">There is no history to show</p>
            ) : (
              <ul className="bottom-container">
                {filteredHistoryList.map(eachItem => (
                  <HistoryItem
                    onDeleteHistory={this.onDeleteHistory}
                    key={eachItem.id}
                    historyDetails={eachItem}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default History
