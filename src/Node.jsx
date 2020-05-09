import React from "react"
import "./Node.css"

const marginFactor = 45

class Node extends React.Component {
    constructor(props) {
        super(props)
         this.state = {
            isVisited: this.props.isVisited,
            isStart: this.props.isStart,
            isEnd: this.props.isEnd,
        }
    }

    dotStyle = [
        { height: 25 },
        { width: 25 },
    ]

    getNodeType = (nodeState) => {
        let nodeType = ""
        if (this.state.isStart) {
            nodeType = "startNode"
        }
        else if (this.state.isEnd) {
            nodeType = "endNode"
        }
        else if (this.state.isVisited) {
            nodeType = "visitedNode"
        }
        return nodeType
    }

    render() {
        return (
            <React.Fragment>
                <span id={this.props.id}
                    className={`dot ${this.getNodeType()}`}
                    style={{
                        left: this.props.row * marginFactor,
                        top: this.props.col * marginFactor
                    }}
                >
                </span>
            </React.Fragment>
        )
    }
}
export default Node 