import React from "react";
import Loader from "react-loader-spinner";

import '../../assets/stylesheets/Modal.css'

const DiffModal = ({ handleClose, show, git_node, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    if(!git_node){
        return (
            <div className={showHideClassName}>
                <section className="modal-main">
                    <center>
                        <Loader
                            type="Puff"
                            color="#00BFFF"
                            height={100}
                            width={100} //3 secs
                        />
                    </center>

                </section>
            </div>)
    }else{
        return (
            <div className={showHideClassName}>

                <section className="modal-main">
                    <button id = "x" onClick={handleClose}>
                            X
                    </button>

                    <p><span className="display-block">Commit ID: {git_node.id} </span></p>

                    { console.log(git_node.diff.split('\n')) }
                    <p>
                    {
                            git_node.diff.split('\n').map((line) => {
                            return spanDecorate(line)
                        })
                    }
                    </p>
                    <br />
                </section>
            </div>
        );
    }

}

const spanDecorate = (text) =>{
    let spanClass = "diff-line display-block"

    if(text.startsWith('+') && (text.length == 1 || text.charAt(1) != '+')){
        spanClass += ' added'
    }else if(text.startsWith('-') && (text.length == 1 || text.charAt(1) != '-')){
        spanClass += ' removed'
    }
    console.log(spanClass)
    return <span className={spanClass}> { text } </span>
}

export default DiffModal