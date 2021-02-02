import axios from 'axios';

export default class GitGraphApi {

    static async getNode(hash){
        return axios.get(`api/v1/git_graph/${hash}`)
    }

    static async sendMergeCommand(sourceHash, targetHash, message){
        return axios.post(`api/v1/git_graph/merge/${sourceHash}/${targetHash}`, message)
    }
}