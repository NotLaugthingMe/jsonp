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
