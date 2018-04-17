import axios from 'axios'
import { stub, spy } from 'sinon'
import {
  getForm,
  updateForm,
  deleteForm,
  createForm,
  getMessages,
  updateMessages
} from '../../lib/forms'

beforeEach(() => {
  stub(axios, 'request').returns({})
})

afterEach(() => {
  axios.request.restore()
})

test('getForm sends the correct UID', () => {
  getForm(axios, { uid: 'abc123' })
  expect(axios.request.args[0][0].url).toBe('/forms/abc123')
})

test('getForm sets get method', () => {
  getForm(axios, { uid: 'abc123' })
  expect(axios.request.args[0][0].method).toBe('get')
})

test('updateForm sends the correct UID and data', () => {
  updateForm(axios, {
    uid: 'abc123',
    data: {
      title: 'hola'
    }
  })
  expect(axios.request.args[0][0].url).toBe('/forms/abc123')
  expect(axios.request.args[0][0].data.title).toBe('hola')
})

test('updateForm sets patch method in request by default', () => {
  updateForm(axios, {
    uid: 'abc123',
    data: {}
  })

  expect(axios.request.args[0][0].method).toBe('patch')
})

test('updateForm sets put method in request when override option is set', () => {
  updateForm(axios, {
    uid: 'abc123',
    data: {},
    override: true
  })

  expect(axios.request.args[0][0].method).toBe('put')
})

test('deleteForm removes the correct uid form ', () => {
  deleteForm(axios, {
    uid: 'abc123'
  })

  expect(axios.request.args[0][0].method).toBe('delete')
  expect(axios.request.args[0][0].url).toBe('/forms/abc123')
})

test('create form has the correct path and method ', () => {
  createForm(axios, {})

  expect(axios.request.args[0][0].method).toBe('post')
  expect(axios.request.args[0][0].url).toBe('/forms')
})

test('get messages has the correct path and method ', () => {
  getMessages(axios, {
    uid: 'abc123'
  })

  expect(axios.request.args[0][0].method).toBe('get')
  expect(axios.request.args[0][0].url).toBe('/forms/abc123/messages')
})

test('update messages has the correct path and method ', () => {
  updateMessages(axios, {
    uid: 'abc123'
  })

  expect(axios.request.args[0][0].method).toBe('put')
  expect(axios.request.args[0][0].url).toBe('/forms/abc123/messages')
})
