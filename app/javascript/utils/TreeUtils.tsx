import Node from "./models_utils/Node";

class TreeUtils {
    nodes: Object
    edges: Object[]
    unpolished_nodes: Object[]

    constructor(unpolished_nodes: Object[], edges: Object[]) {
        this.unpolished_nodes = unpolished_nodes
        this.edges = edges
    }

    process(){
        if (!this.unpolished_nodes || this.unpolished_nodes.length == 0){
            throw new Error("Nothing to process")
        }
        this.nodes = {}

        this.unpolished_nodes.forEach((node) => this.nodes[node['id']] = new Node(node['id'],parseInt(node['timestamp']), [], []))
        this.edges.forEach((edge) => {
            this.nodes[edge['from']].children.push(this.nodes[edge['to']])
            this.nodes[edge['to']].parents.push(this.nodes[edge['from']])
        })

        var root = this.nodes[this.unpolished_nodes[0]['id']] // TODO: Check if it is possible to have more than one root


        this.reproduce_branches(root, 1, 0)
    }

    reproduce_branches(root: Node, branch_index: number, parent_y: number){
        if(root == undefined || root == null || root.branch_index != null){
            return
        }

        root.setBranchIndex(branch_index)

        root.x = root.branch_index * 200
        root.y = parent_y + 100
        if(root.parents.length > 1){
            root.y += 200
        }

        // TODO: Make sure we can order by timestamp within the same parent
        const temp_nodes =  root.children.sort((n1,n2) => {
            if (n1.timestamp > n1.timestamp ) {
                return -1;
            }

            if (n1.timestamp < n1.timestamp) {
                return 1;
            }

            return 0;
        }).reverse()

        this.reproduce_branches(temp_nodes[0], branch_index, root.getY())
        let count = 1
        temp_nodes.forEach((child, index) => {
            if(index != 0){
                this.reproduce_branches(child, root.branch_index  + count, root.getY())
                count++
            }

        })
    }
}

export default  TreeUtils