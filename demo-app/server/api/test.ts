export default defineCachedEventHandler(async (event) => {
  return new Date()
}, {
  swr: false,
  maxAge: 10
})