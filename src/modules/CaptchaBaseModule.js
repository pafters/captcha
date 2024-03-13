import axios from 'axios';
import CONFIG from '../conf';
class CaptchaBaseModule {

    async postRequest(request, props = null, headers) {
        try {
            const response = await axios.post(`${CONFIG.BACKEND_API}/${request}`, props);
            return response.data;
        } catch (error) {
            throw new Error(`Error getting data from API: ${error.message}`);
        }
    }

    async getRequest(request, props = null) {
        try {
            const response = await axios.get(`${CONFIG.BACKEND_API}/${request}`, props);
            return response.data;
        } catch (error) {
            throw new Error(`Error getting data from API: ${error.message}`);
        }
    }


    async getCaptcha(type) {
        const answer = await this.postRequest(`captchas`, { type: type, });
        if (answer) return answer;
    }

    async getServerStatus() {
        const answer = await this.getRequest(`health`);
        if (answer) return answer;
    }

    async checkCaptcha(req) {
        let answer = null;
        if (req.index)
            answer = await this.postRequest(`captchas/check`, req, true);
        else
            answer = await this.postRequest(`captchas/check`, req, true);
        if (answer) return answer;
    }



    // async post(endpoint, data = {}) {
    //     try {
    //         const response = await axios.post(`${this.baseUrl}/${endpoint}`, data);
    //         return response.data;
    //     } catch (error) {
    //         throw new Error(`Error posting data to API: ${error.message}`);
    //     }
    // }

    // Добавьте другие методы, такие как put(), delete() и т.д., если нужно.

}

export default CaptchaBaseModule;

