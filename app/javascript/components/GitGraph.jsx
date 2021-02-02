import React, { Component } from "react";
import ReactFlow from 'react-flow-renderer';
import TreeUtils from "../utils/TreeUtils";
import DiffModal from './DiffModal'
import GitGraphApi from '../integration/GitGraphApi'

class GitGraph extends Component {
    constructor(value) {
        super();
        this.state = { data: {}, show: false,  git_node: null }
        // console.log(value)
    }
    async componentDidMount() {
        try {
            const response = await fetch(`api/v1/git_graph`)
            const json = await response.json();
            const git_graph = {
                nodes: json.git_graph.nodes.reverse().map((node) => {
                    return {
                        id: node.id,
                        label: node.id.slice(0, 7),
                        title:  (new Date(node.timestamp * 1000)).toDateString() + " - " + node.message,
                        fixed: {x: false, y: false }
                    }
                }),
                edges: json.git_graph.edges.map((edge) => {
                    return {from: edge.source, to: edge.target}
                })
            }
            const tree_utils = new TreeUtils(git_graph.nodes,  git_graph.edges)
            tree_utils.process()

            let local_nodes = []
            let local_edges = []
            for (const [key, node] of Object.entries(tree_utils.nodes)) {
                local_nodes.push( { id: node.id,
                                    data: { label: node.id.slice(0, 7),
                                            branch_id: node.branch_index,
                                            level: node.level },
                                    position: { x: node.getX(), y: node.getY() },
                                    style: { color: node.getColor(), borderColor: node.getColor() }} )

            }

            tree_utils.edges.forEach((edge) => {
                local_edges.push({
                    id: edge['from'].slice(0,7) + "-" + edge['to'].slice(0,7),
                    source: edge['from'],
                    target: edge['to']
                })
            })

            this.setState(
                {
                    data: {
                        nodes: local_nodes,
                        edges: local_edges
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

    async fetchDiff(commit_hash){
        GitGraphApi.getNode(commit_hash).then(({ data })=> {
            this.setState({
                git_node: data
            });
        }).catch((err)=> { console.log(err) })
    }

    hideDiffModal(){
        this.setState({ show: false})
    }

    showModal(element){
        this.setState({ show: true} )
        this.fetchDiff(element.id).then().catch((err) => console.log(err))
    }
    render() {
        if(this.isEmpty()){
            return(<div id='index-page'>
                <header>
                    <h1>Reliant Test 2</h1>
                </header>
            </div>)
        }else{
            return(<div id='index-page'>
                <header>
                    <h1>Reliant Test 2</h1>
                </header>
                <DiffModal git_node={this.state.git_node} show={this.state.show} handleClose={() => { this.hideDiffModal() }}>
                    "None"
                </DiffModal>
                <div id='git-graph'>
                    <div style={{ height: 1960 }}>
                        <ReactFlow
                            elements={ this.state.data.nodes.concat(this.state.data.edges) }
                            onElementClick = {(event, element) => this.showModal(element) }
                        />
                    </div>
                </div>
            </div>)
        }

    }
}

export default GitGraph