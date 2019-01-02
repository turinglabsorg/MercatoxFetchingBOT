# MercatoxFetchingBOT
With this bot you can easily obtain all trade history data and order book from www.mercatox.com.

Just download the scripts and install the dependencies with npm install and simply use it:

```
node tradehistory.js
node buyorders.js
node sellorders.js
```

If you need to use it in a web server with Ubuntu you need to install these dependencies first:

```
sudo apt-get install -y xvfb x11-xkb-utils xfonts-100dpi xfonts-75dpi xfonts-scalable xfonts-cyrillic x11-apps clang libdbus-1-dev libgtk2.0-dev libnotify-dev libgnome-keyring-dev libgconf2-dev libasound2-dev libcap-dev libcups2-dev libxtst-dev libxss1 libnss3-dev gcc-multilib g++-multilib
```

And then use it as follows

```
xvfb-run node tradehistory.js
xvfb-run node buyorders.js
xvfb-run node sellorders.js
```

The web server integration detailed article is here:
https://www.linode.com/docs/development/nodejs/use-nightmarejs-to-automate-headless-browsing/

This is NOT an official Mercatox tool, use it at your own risk.
