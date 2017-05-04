const express = require('express');
const app = express();
const customerRoute = require('./routes/customer.route');
const productRoute = require('./routes/products.route');
const photoRoute = require('./routes/customerPhoto.route');

app.use('/api/customers', customerRoute);
app.use('/api/products', productRoute);
app.use('/api/photos', photoRoute);

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
