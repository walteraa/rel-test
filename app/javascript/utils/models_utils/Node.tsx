class Node{
    id: string
    parents: Node[]
    children: Node[]

    branch_index: number
    level: number
    x: number
    y: number

    _color = {
        0: "#1E72D1",
        1: "#99C115",
        2: "#C19415",
        3: "#C11555",
        4: "#7115C1",
        5: "#15C1B6"
    }

    constructor(id: string, parents: Node[], children: Node[] ) {
        if (!id){
            throw new Error("Invalid id")
        }
        this.id = id
        this.parents = parents
        this.children = children
    }


    setLevel(level: number){
        this.level = level
    }

    setBranchIndex(branch_index: number){
        this.branch_index = branch_index
    }

    getX(){
        return this.x
    }

    getY(){
        return this.y
    }

    getColor(){
        return this._color[this.branch_index % 4]
    }

}

export default Node