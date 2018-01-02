import React from 'react'
import ReactDOM from 'react-dom'
import Button from 'antd/lib/button'
import './index.css'

// functional components only consist of a render method
function Square(props) {
  return (
    <button className="square" onClick={ props.onClick }>
      {props.value}
    </button>
  )
}

class Board extends React.Component {

  // add constructor to the class to initialize the state
  constructor(props) {
    super(props) // need to call explicitly
    this.state = { // private to the component
      squares: Array(9).fill(null),
      xIsNext: true,
    }
  }

  handleClick(i) {
    const squares = this.state.squares.slice()  // to copy array for immutability. .slice() is shallow copy
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    })
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]} // passing down to Square
        onClick={() => this.handleClick(i)}
      />
    )
  }

  render() {
    const winner = calculateWinner(this.state.squares)
    let status
    if (winner) {
      status = 'Winner' + winner
    } else {
      status = 'Next player' + (this.state.xIsNext ? 'X' : 'O')
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>

        <div className="App">
          <Button type="primary">Button</Button>
        </div>
      </div>
    )
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}
// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
)
