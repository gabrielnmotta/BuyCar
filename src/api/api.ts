import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,

});


export const returnHeaders = () => {
  return {
    headers: {
      Authorization: localStorage.getItem('token_type') + ' ' + localStorage.getItem('token'),
    },
  };
};


export const Get = async (url: string, urlParams?: string) => {
  return await api.get(`${url}?company_id=${localStorage.getItem('company_id')}&${urlParams ? urlParams : ''}`, returnHeaders()).then(
    (res) => {
      if (res.status >= 200 && res.status < 300) {
        return { data: res.data, status: true };
      } else {
        return { data: res.data, status: false };
      }
    }
  ).catch((err) => {
    return { data: err, status: false };
  })
}
export const Post = async (url: string, data: any, urlParams?: string) => {
  return await api.post(`${url}${urlParams ? urlParams : ''}`, data, returnHeaders()).then(
    (res) => {
      if (res.status >= 200 && res.status < 300) {
        return { data: res.data, status: true };
      } else {
        return { data: res.data, status: false };
      }
    }
  ).catch((err) => {
    return { data: err, status: false };
  })
}
export const Put = async (url: string, data: any, urlParams?: string) => {
  return await api.put(`${url}${urlParams ? urlParams : ''}`, data, returnHeaders()).then(
    (res) => {
      if (res.status >= 200 && res.status < 300) {
        return { data: res.data, status: true };
      } else {
        return { data: res.data, status: false };
      }
    }
  ).catch((err) => {
    return { data: err, status: false };
  })
}
