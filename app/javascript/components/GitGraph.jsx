import React, { Component } from "react";
import Graph from "react-graph-vis";

class GitGraph extends Component {
    options = {
        clickToUse: true,
        layout: {
            improvedLayout:true,
            hierarchical: {
                levelSeparation: 100,
                direction: "DU",
                blockShifting: false,
                edgeMinimization: false,
                parentCentralization: false,
                sortMethod: 'directed'
            }
         },
        edges: {
            color: "#000000",

        },
        height: "1920",
        physics: {
            enabled: false,

        }
    };

    events = {
        select: function(event) {
            var { nodes, edges } = event;
        },
        click: function (event) {
            console.log(event); // Open modal goes here
        },

    };

    constructor() {
        super();
        this.state = { data: {} };
    }

    isEmpty() {

        for(var key in this.state.data) {
            if(this.state.data.hasOwnProperty(key))
                return false;
        }

        return (this.state.data.nodes === undefined || this.state.data.nodes.length == 0);
    }

    async componentDidMount() {
        try {
            const response = await fetch(`api/v1/git_graph.json`)
            const json = await response.json();
            const git_graph = {
                nodes: json.git_graph.nodes.reverse().map((node) => {
                    return {
                        id: node.id,
                        label: node.id.slice(0, 7),
                        title:  (new Date(node.timestamp * 1000)).toDateString(),
                        fixed: {x: false, y: false }
                    }
                }),
                edges: json.git_graph.edges.map((edge) => {
                    return {from: edge.source, to: edge.target}
                })
            }
            this.setState({ data: git_graph })
        } catch (error) {
            console.log(error);
        }
    }



    render() {
        if(!this.isEmpty()){
            return(
                <div id='index-page'>
                    <header>
                        <h1>Reliant Test</h1>
                    </header>
                    <div id='git-graph'>
                        <Graph
                            graph={this.state.data}
                            options={this.options}
                            events={this.events}
                            getNetwork={network => {
                                //  if you want access to vis.js network api you can set the state in a parent component using this property
                            }}
                        />
                    </div>
                </div>
            )
        }else{
            return(
                <div id='index-page'>
                    <header>
                        <h1>Reliant Test</h1>
                    </header>
                </div>)
        }

    }

}

export default GitGraph