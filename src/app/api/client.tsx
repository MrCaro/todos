const timeToRefresh = 0 //optional

function refreshPage() {
  setTimeout(() => location.reload(), timeToRefresh)
}

const client = { refreshPage }
export default client