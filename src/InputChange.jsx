import React from "react"
import "./InputChange.css"

function InputChange(props) {
    console.log("this.props: ", props)
    const { startRow, startCol, endRow, endCol, handleRowColChange } = props
    return (<footer>
        <label className="startRowText">
            {"Start Node Row:  "}
            <input type="text"
                value={startRow}
                name="startRow"
                onChange={handleRowColChange} />

        </label>

        <label className="startRowText startColText">
            {"Start Node Column:  "}
            <input type="text"
                value={startCol}
                name="startCol"
                onChange={handleRowColChange}
            />
        </label>
        <label className="endRowText">
            {"End Node Row:  "}
            <input type="text"
                value={endRow}
                name="endRow"
                onChange={handleRowColChange}
            />
        </label>

        <label className="endRowText endColText">
            {"End Node Column:  "}
            <input type="text"
                value={endCol}
                name="endCol"
                onChange={handleRowColChange}
            />
        </label>
    </footer>)
}

export default InputChange