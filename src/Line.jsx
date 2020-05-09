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
                    left: row * marginFactor + 15,
                    top: col * marginFactor + 15
                }}
            />
        )
    }
}

export default Line 