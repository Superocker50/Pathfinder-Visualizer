import React from 'react'
import Node from './Node'
import "./Grid.css"
import Line from "./Line"
import { dijkstra } from "./Graph"
import InputChange from "./InputChange"

const width = 30
const height = 10

const defaultStartX = 2
const defaultStartY = 2

const defaultEndX = 22
const defaultEndY = 6

let startNodeAnimate = 0
let animatedNormalNodes = []
let endNodeAnimate = 0
let startPathAnimate = 0
let animatedPath = []
let endPathAnimate = 0
let animationStarted = false

// I see here you use class components, but elsewhere functional components.
// Please keep things consistent! Dr. Fraser taught you better.
class Grid extends React.Component {
    constructor() {
        super()
        this.state = {
            startRow: defaultStartY,
            startCol: defaultStartX,
            endRow: defaultEndY,
            endCol: defaultEndX,
            grid: null,
        }
    }

    componentDidMount() {
        this.setState({
            grid: this.createGrid()
        })
    }

    resetState = () => {
        let { startRow, startCol, endRow, endCol } = this.state

        animatedNormalNodes.forEach((nodeAnimation) => clearTimeout(nodeAnimation))
        animatedPath.forEach((nodeAnimation) => clearTimeout(nodeAnimation))

        clearTimeout(startNodeAnimate)
        clearTimeout(endNodeAnimate)
        clearTimeout(startPathAnimate)
        clearTimeout(endPathAnimate)

        this.resetGrid(startRow, startCol, endRow, endCol)

        animationStarted = false
    }

    validInput = () => {
        const { startRow, startCol, endRow, endCol } = this.state
        let validInput = true
        if (document.getElementById(`node-${startRow - 1}-${startCol - 1}`) === null) {
            validInput = false
        }
        if (document.getElementById(`node-${endRow - 1}-${endCol - 1}`) === null) {
            validInput = false
        }
        return validInput
    }

    resetGrid = (startRow, startCol, endRow, endCol) => {

        let validInput = false
        if (this.validInput()) {
            startRow = parseInt(startRow - 1)
            startCol = parseInt(startCol - 1)
            endRow = parseInt(endRow - 1)
            endCol = parseInt(endCol - 1)
            validInput = true
        }

        for (let col = 0; col < width && validInput; col++) {
            for (let row = 0; row < height && validInput; row++) {
                if (row === startRow && col === startCol) {
                    document.getElementById(`node-${row}-${col}`)
                        .className = "dot startNode"
                }
                else if (row === endRow && col === endCol) {
                    document.getElementById(`node-${row}-${col}`)
                        .className = "dot endNode"
                }
                else {
                    console.log("NODE IS: ", row, ",", col)
                    document.getElementById(`node-${row}-${col}`).className = "dot"
                }
            }
        }
    }

    edgeNode = (col, row) => {

        const { startRow, startCol, endRow, endCol } = this.state
        if (col === startCol - 1 && row === startRow - 1) {
            return <div>
                <Node id={`node-${row}-${col}`}
                    distance={Infinity}
                    previous={null}
                    row={row}
                    col={col}
                    isStart={true} />
            </div>
        }
        else if (col === endCol - 1 && row === endRow - 1) {
            return <div>
                <Node id={`node-${row}-${col}`}
                    distance={Infinity}
                    previous={null}
                    row={row}
                    col={col}
                    isEnd={true} />
            </div>
        }
        else {
            return <div>
                <Node id={`node-${row}-${col}`}
                    distance={Infinity}
                    previous={null}
                    row={row}
                    col={col} />
            </div>
        }
    }

    normalNode = (col, row) => {
        const { startRow, startCol, endRow, endCol } = this.state
        if (col === startCol - 1 && row === startRow - 1) {
            return <div>
                <Line row={row} col={col} />
                <Node id={`node-${row}-${col}`}
                    distance={Infinity}
                    previous={null}
                    row={row}
                    col={col}
                    isStart={true} />
            </div>
        }
        else if (col === endCol - 1 && row === endRow - 1) {
            return <div>
                <Line row={row} col={col} />
                <Node id={`node-${row}-${col}`}
                    distance={Infinity}
                    previous={null}
                    row={row}
                    col={col}
                    isEnd={true} />
            </div>
        }
        else {
            return <div>
                <Line row={row} col={col} />
                <Node id={`node-${row}-${col}`}
                    distance={Infinity}
                    previous={null}
                    row={row}
                    col={col} />
            </div>
        }
    }

    visualize = () => {
        const { startRow, startCol, endRow, endCol } = this.state

        if (!animationStarted && this.validInput()) {
            animationStarted = true
            let animatedNodes = dijkstra(width, height, startCol - 1,
                startRow - 1, endCol - 1, endRow - 1)

            startNodeAnimate = animatedNodes[0]
            animatedNormalNodes = animatedNodes[1]
            endNodeAnimate = animatedNodes[2]
            startPathAnimate = animatedNodes[3][0]
            animatedPath = animatedNodes[3][1]
            endPathAnimate = animatedNodes[3][2]
        }
        else if (!this.validInput()) {
            window.alert("Invaid input!\nRow Range: [1,10]\nColumn Range: [1,30]")
        }
    }

    createGrid = () => {
        let grid = [[]]
        for (let col = 0; col < width; col++) {
            grid[col] = []
            for (let row = 0; row < height; row++) {
                if (col === width - 1 || row === height - 1) {
                    grid[col][row] = this.edgeNode(col, row)
                }
                else {
                    grid[col][row] = this.normalNode(col, row)
                }
            }
        }
        return grid
    }

    handleRowColChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        }, () => this.resetState())
    }

    render() {
        return (
            <React.Fragment>
                <header
                    className="header">
                    Dijkstra's Shortest Path Algorithm Visualization
                </header>
                <div>
                    {this.state.grid}
                </div>

                <button className="startButton"
                    onClick={this.visualize}>
                    Start Visualization
                </button>

                <button className="resetButton"
                    onClick={this.resetState}>
                    Reset
                </button>

                <InputChange
                    startCol={this.state.startCol}
                    startRow={this.state.startRow}
                    endCol={this.state.endCol}
                    endRow={this.state.endRow}
                    handleRowColChange={this.handleRowColChange}
                />
            </React.Fragment>
        )
    }
}

export default Grid 
