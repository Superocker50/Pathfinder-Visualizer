import React from 'react'
import Node from './Node'
import "./Grid.css"
import Line from "./Line"
import Graph, { dijkstra } from "./Graph"

const width = 30
const height = 10

const startX = 2
const startY = 2

const endX = 22
const endY = 6

let startNodeAnimate = 0
let animatedNormalNodes = []
let endNodeAnimate = 0
let startPathAnimate = 0
let animatedPath = []
let endPathAnimate = 0

class Grid extends React.Component {
    constructor() {
        super()
        this.state = {
            grid: this.createGrid()
        }
    }

    resetState = () => {
        animatedNormalNodes.forEach((nodeAnimation) => clearTimeout(nodeAnimation))
        animatedPath.forEach((nodeAnimation) => clearTimeout(nodeAnimation))

        clearTimeout(startNodeAnimate)
        clearTimeout(endNodeAnimate)
        clearTimeout(startPathAnimate)
        clearTimeout(endPathAnimate)

        let grid = this.state.grid
        for (let row = 0; row < width; row++) {
            for (let col = 0; col < height; col++) {
                if (row === startX && col === startY) {
                    document.getElementById(`node-${row}-${col}`)
                        .className = "dot startNode"
                }
                else if (row === endX && col === endY) {
                    document.getElementById(`node-${row}-${col}`)
                        .className = "dot endNode"
                }
                else {
                    document.getElementById(`node-${row}-${col}`)
                        .className = "dot"
                }
            }
        }
    }

    edgeNode = (row, col) => {
        if (col === startY && row === startX) {
            return <div>
                <Node id={`node-${row}-${col}`}
                    distance={Infinity}
                    previous={null}
                    row={row}
                    col={col}
                    isStart={true} />
            </div>
        }
        else if (col === endY && row === endX) {
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

    normalNode = (row, col) => {
        if (col === startY && row === startX) {
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
        else if (col === endY && row === endX) {
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
        let animatedNodes = dijkstra(width, height, startX, startY, endX, endY)
        startNodeAnimate = animatedNodes[0]
        animatedNormalNodes = animatedNodes[1]
        endNodeAnimate = animatedNodes[2]
        startPathAnimate = animatedNodes[3][0]
        animatedPath = animatedNodes[3][1]
        endPathAnimate = animatedNodes[3][2]
    }

    createGrid = () => {
        let grid = [[]]
        for (let row = 0; row < width; row++) {
            grid[row] = []
            for (let col = 0; col < height; col++) {

                if (col === height - 1 || row === width - 1) {
                    grid[row][col] = this.edgeNode(row, col)
                }
                else {
                    grid[row][col] = this.normalNode(row, col)
                }
            }
        }
        return grid
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

            </React.Fragment>
        )
    }
}

export default Grid 