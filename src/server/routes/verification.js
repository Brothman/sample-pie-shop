const verification = {
    get: (req, res, next) => {
      //grab URL from the request and remove the leading slash
      res.send(`google-site-verification: ${req.url.slice(1)}`)
    }
  };
  
export default verification;  