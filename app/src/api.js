// process.env is injected by Webpack
export const API_URI = process.env.API_URI
export const API_ENDPOINTS = {
  sample: `${API_URI}/sample`
}

export const PUBLIC_PATH = process.env.PUBLIC_PATH
