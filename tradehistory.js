const Nightmare = require('nightmare')
const axios = require('axios')
const nightmare = Nightmare({ show: false })
const htmlparser = require('htmlparser')
require('dotenv').config()

const mercatox_pair = process.env.MERCATOX_PAIR

console.log('FETCHING ' + mercatox_pair + ' TRADE HISTORY');

nightmare
  .goto('https://mercatox.com/exchange/' + mercatox_pair)
  .wait('#mCSB_4')
  .evaluate(() => document.querySelector('#mCSB_4').innerHTML)
  .end()
  .then(dom => {
    var handler = new htmlparser.DefaultHandler(function (error, dom) {
      if (!error){
        ordersObj = dom[0].children[1].children;
        //console.log(JSON.stringify(ordersObj));
        trades = [];
        for (var i = 0, len = ordersObj.length; i < len; i++) {
          if(ordersObj[i].attribs && ordersObj[i].attribs.data == 'order'){
            var date = ordersObj[i].children[1].children[0].raw
            var type = ordersObj[i].children[3].children[0].children[0].raw
            var price = ordersObj[i].children[5].children[0].raw
            var amount = ordersObj[i].children[7].children[0].raw
            trades.push(
              {
                price: price,
                amount: amount,
                type: type,
                date: date
              }
            )
          }
        }
        console.log(trades)
      }
    });

    var parser = new htmlparser.Parser(handler);
    parser.parseComplete(dom);
    
  })
  .catch(error => {
    console.error('SOMETHING GOES WRONG', error)
  })
