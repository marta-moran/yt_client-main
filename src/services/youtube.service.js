import axios from 'axios'

class YoutubeService {
    constructor() {
        this.api = axios.create({
            baseURL: "https://www.googleapis.com/youtube/v3"
        })
    }

    getChannels(value) {
        return this.api.get(`/search?key=${process.env.REACT_APP_API_KEY}&type=channel&q=${value}&part=id`).then(({ data }) => data)
    }

    getOneChannel(id) {
        console.log(id, "id")
        return this.api.get(`/channels?part=snippet&id=${id}&key=${process.env.REACT_APP_API_KEY}`).then(({ data }) => data)
    }

    getChannelVideos(channelId) {
        return this.api.get(`/search?key=${process.env.REACT_APP_API_KEY}&channelId=${channelId}&type=video&part=snippet,id&order=date&maxResults=50`).then(({ data }) => data)
    }

    getVideoInfo(videoId) {
        return this.api.get(`/videos?key=${process.env.REACT_APP_API_KEY}&id=${videoId}&part=snippet,contentDetails,player`).then(({ data }) => data)
    }


    static getInstance() {
        if (!this.instance) {
            this.instance = new YoutubeService()
        }

        return this.instance
    }
}

export default YoutubeService.getInstance()