import React from "react"
import "./Line.css"

const marginFactor = 45

class Line extends React.Component {
    render() {
        const { row, col } = this.props
        return (
            <span
                className="line"
                style={{
                    left: this.props.row * marginFactor + 12,
                    top: this.props.col * marginFactor + 13
                }}
            />
        )
    }
}

export default Line 