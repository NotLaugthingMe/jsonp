## jsonp
```text
Can be used to solve the mainstream browser cross domain data access problems
```
### how to use it
```text
npm install cross-jsonp --save-dev
```
```javascript
import getJsonpData from 'cross-jsonp';
getJsonpData(url,data).then(response=>{
    console.log(response);
})
```
### params
|  name        | description   |   |
| :--------:   | :-----:  | :----:  |
| url     | (String) url to fetch |      |
| data        |   name of the query string parameter to   |      |
| timeout         |     (Number) how long after a timeout error is emitted. 0 to disable (defaults to 10000)    |    |
| callbackName        |    (String) name of the global callback functions that handle jsonp responses     |     |

