export default {
  user: {
    authenticated: false
  },
  readmePage (context) {
    return context.$resource('https://raw.githubusercontent.com/TensorflowUI/web/master/README.md').get()
  }
}
