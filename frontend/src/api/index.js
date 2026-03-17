import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
})

export const sendChat = (message, mode, session_id = 'default') =>
  api.post('/chat/', { message, mode, session_id })

export const ingestFile = (file, doc_type = 'runbook') => {
  const form = new FormData()
  form.append('file', file)
  form.append('doc_type', doc_type)
  return api.post('/ingest/file', form)
}

export const ingestURL = (url, doc_type = 'runbook') =>
  api.post('/ingest/url', { url, doc_type })

export const ingestPaste = (content, filename, doc_type = 'runbook') =>
  api.post('/ingest/paste', { content, filename, doc_type })

export const generateTests = (requirements) =>
  api.post('/testgen/', { requirements })