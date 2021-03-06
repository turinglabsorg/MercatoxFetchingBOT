const Nightmare = require('nightmare')
const axios = require('axios')
const nightmare = Nightmare({ show: false })
const htmlparser = require('htmlparser')
require('dotenv').config()

const mercatox_pair = process.env.MERCATOX_PAIR

console.log('FETCHING ' + mercatox_pair + ' BUY ORDERS');

nightmare
  .goto('https://mercatox.com/exchange/KLKS/BTC')
  .wait('#mCSB_3')
  .evaluate(() => document.querySelector('#mCSB_3').innerHTML)
  .end()
  .then(dom => {
    var handler = new htmlparser.DefaultHandler(function (error, dom) {
      if (!error){
        ordersObj = dom[0].children;
        orders = [];
        for (var i = 0, len = ordersObj.length; i < len; i++) {
          if(ordersObj[i].attribs && ordersObj[i].attribs.price){
            //console.log(JSON.stringify(ordersObj[i].attribs.amount + ' KLKS at ' + ordersObj[i].attribs.price + ' BTC'));
            orders.push(
              {
                price: ordersObj[i].attribs.price,
                amount: ordersObj[i].attribs.amount
              }
            )
          }
        }
      }
    });

    var parser = new htmlparser.Parser(handler);
    parser.parseComplete(dom);
    
  })
  .catch(error => {
    console.error('Search failed:', error)
  })
