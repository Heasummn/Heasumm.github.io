import asyncComponent from 'containers/AsyncComponent'

const AsyncEditor = asyncComponent(() => import('containers/Editor'))

export default AsyncEditor;