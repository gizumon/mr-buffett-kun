# mr-buffett-kun
![buffett-kun](https://www.buffett-code.com/assets/buffett-ad484457d1a61cd9f12540ea763ee0ea90581757ae67b4cbc23ff7980d671a66.png)  
Line chatbot Mr.Buffett-kun

## About this app
Mr.Buffett-kun can answer your inquiry. If you ask something to Mr.Buffett-kun from your line, you can get answer from him. He can access to my google spreadsheet that manage my stock information and reply to you using the stock information. Currentlly, Mr.buffett-kun can the following things.
* Show the daily report (Keyword: daily)
* Show the all stocks I have (Keyword: all)
* Show the detail for a stock that I have (Keyword: [9999])
* Show the list of stocks (Keyword: 銘柄)
* Show the closing day (Keyword: 決算)
* Show the summary that I have (Keyword: summary)

## Used web technology
### main
* Node.js v10.15.3
* Google App Script v8.0
* [Line Messaging API](https://developers.line.biz/ja/services/messaging-api/)

### using library
* @line/bot-sdk v6.8.4
* axios v0.19.2
* config v3.3.1
* express v4.16.4
* underscore v1.10.2

## How to deploy
### GAS
* Using clasp or project UI
* CLI
  * clasp login
  * clasp push
  * clasp deploy

### Heroku
* git remote add heroku [https://XXXX.XXXX.XXXX]
* git push heroku HEAD
