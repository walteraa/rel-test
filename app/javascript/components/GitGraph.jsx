import React, { Component } from "react";
import ReactFlow from 'react-flow-renderer';
import TreeUtils from "../utils/TreeUtils";
import DiffModal from './DiffModal'
import GitGraphApi from '../integration/GitGraphApi'
import AlertDialog from './AlertDialog'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'

class GitGraph extends Component {
    constructor() {
        super();
        this.state = { data: {}, show: false,  git_node: null }
    }
    async componentDidMount() {
        try {
            const response = await fetch(`api/v1/git_graph`)
            const json = await response.json();
            const gitGraph = {
                nodes: json.git_graph.nodes.reverse().map((node) => {
                    return {
                        id: node.id,
                        label: node.id.slice(0, 7),
                        timestamp:  node.timestamp,
                    }
                }),
                edges: json.git_graph.edges.map((edge) => {
                    return {from: edge.source, to: edge.target}
                })
            }
            const treeUtils = new TreeUtils(gitGraph.nodes,  gitGraph.edges)
            treeUtils.process()

            let localNodes = []
            let localEdges = []
            for (const [_, node] of Object.entries(treeUtils.nodes)) {
                localNodes.push( { id: node.id,
                                    data: { label: node.id.slice(0, 7),
                                            branch_id: node.branch_index,
                                            title: node.title},
                                    position: { x: node.getX(), y: node.getY() },
                                    style: { color: node.getColor(), borderColor: node.getColor() }} )

            }

            treeUtils.edges.forEach((edge) => {
                localEdges.push({
                    id: edge['from'].slice(0,7) + "-" + edge['to'].slice(0,7),
                    source: edge['from'],
                    target: edge['to']
                })
            })

            this.setState(
                {
                    data: {
                        nodes: localNodes,
                        edges: localEdges
                    }
                })

            } catch (e) {
            console.log(e)
        }
    }

    isEmpty() {

        for(var key in this.state.data) {
            if(this.state.data.hasOwnProperty(key))
                return false;
        }

        return (this.state.data.nodes === undefined || this.state.data.nodes.length == 0);
    }

    async fetchDiff(commitHash){
        GitGraphApi.getNode(commitHash).then(({ data })=> {
            this.setState({
                git_node: data
            });
        }).catch((err)=> { console.log(err) })
    }

    async sendMergeCommand(sourceHash, targetHash, message){
        GitGraphApi.sendMergeCommand(sourceHash, targetHash, message).then(() => {
            this.setState({show_alert: true, severity: 'success', sourceCommit: sourceHash, targetCommit: targetHash  })
        }).catch(() =>{
            this.setState({show_alert: true, severity: 'danger', sourceCommit: sourceHash, targetCommit: targetHash  })
        })
    }

    hideDiffModal(){
        this.setState({ show: false})
    }

    showModal(element){
        this.setState({ show: true} )
        this.fetchDiff(element.id).then().catch((err) => console.log(err))
    }

    onNodeDragStop = (event, selectedNode) => {

        const nodeDiv = document.querySelector(`div[data-id='${selectedNode.id}']`)
        const selectedNodeBounding =  nodeDiv.getBoundingClientRect()
        const colisionNodes = this.state.data.nodes.filter((node) => {

            const div = document.querySelector(`div[data-id='${node.id}']`)

            if(!div || node.id == selectedNode.id)
                return false

            const nodeBounding = div.getBoundingClientRect()


            return (
                Math.abs(selectedNodeBounding.x - nodeBounding.x) <= nodeBounding.width &&
                Math.abs(selectedNodeBounding.y - nodeBounding.y) <= nodeBounding.height
            )
        })

        if(colisionNodes.length == 1){
            const sourceCommit = selectedNode.id.slice(0, 7)
            const targetCommit = colisionNodes[0].id.slice(0,7)

            confirmAlert({
                customUI: ({ onClose }) => {
                    return (
                        <div className='custom-ui'>
                            <h1>Are you sure?</h1>
                            <p>You want merge {sourceCommit} to {targetCommit}?</p>
                            <p>Please add a message below</p>
                            <p><input
                                name="message"
                                type="text"
                                value={this.state.message}
                                onChange={(event) => this.onInputchange(event)}
                            /></p>
                            <button onClick={onClose}>No</button>
                            <button
                                onClick={() => {
                                    this.sendMergeCommand(selectedNode.id, colisionNodes[0].id,this.state.message).then().catch((err) => console.log(err))
                                    onClose();
                                }}
                            >
                                Yes
                            </button>
                        </div>
                    );
                }
            })

        }
    }

    render() {
        return(

            <div>

                <div id='index-page'>
                    <header>
                        <h1>Reliant Test</h1>
                    </header>
                    <AlertDialog show={this.state.show_alert}
                                 severity={this.state.severity}
                                 onClose={() => this.setState({ show_alert: false, severity: null })}
                                 sourceCommit={this.state.sourceCommit}
                                 targetCommit={this.state.targetCommit}>
                    </AlertDialog>
                    { this.bodyBuild() }
                </div>
            </div>)
    }

    bodyBuild(){
        if(!this.isEmpty()){
            return(<div id='main-page'>

                <DiffModal git_node={this.state.git_node} show={this.state.show} handleClose={() => { this.hideDiffModal() }}>
                    "None"
                </DiffModal>
                <div id='git-graph'>
                    <div style={{ height: 1960 }}>
                        <ReactFlow
                            elements={ this.state.data.nodes.concat(this.state.data.edges) }
                            onElementClick = {(event, element) => this.showModal(element) }
                            onNodeDragStop={this.onNodeDragStop}
                        />
                    </div>
                </div>
            </div>)
        }
    }

    onInputchange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
}

export default GitGraph