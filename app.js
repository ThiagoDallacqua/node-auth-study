const app = require('./config/express')();
const port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`Server Running at port ${port}`);
});
