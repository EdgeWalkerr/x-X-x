import React, { useState, useReducer, useRef } from 'react';
import ReactDOM from "react-dom";
import { set } from "little_bit";
import Component1 from "./component1";

export default function APP() {
    // const [todos, setTodos] = useReducer();
    // const typingTodo = useRef("");
    // const inputRef = useRef();
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: window.innerWidth, height: window.innerHeight, backgroundColor: "#f4f3f3" }}>
            <p style={{ color: "rgba(175, 47, 47, 0.15)", fontWeight: 100, fontFamily: "Helvetica Neue", fontSize: "100px" }}>todos</p>
            {/* <input ref={inputRef as any} style={{ fontSize: "24px", padding: "16px 16px 16px 60px", fontStyle: ReactDOM.findDOMNode(inputRef.current) === document.activeElement ? "italic" : "normal" }} value={typingTodo.current === "" ? "What needs to be done?" : typingTodo.current} /> */}
            <Component1 />
        </div>
    );
}

const a = APP();

a.props.children; /*?*/
