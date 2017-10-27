const jsonp=function(option){
    if(!option.url||!option.data){
        throw new Error("Parameter  error")
    }
    const callbackName=option[callback]||"jsonp"+new Date().getTime();
    const timeout=option.timeout||10000;
    const param= formatData(option.data);
    const head=document.getElementsByTagName('head')[0];
    const script=document.createElement('script');
    script.src=option.url+(option.url.indexOf('?') === -1 ? '?' : '&')+param+"&"+"callback="+callbackName+"&"+new Date().getTime();
    script.id="id"+callbackName;
    
    if(timeout){
        script.timer=setTimeout(function () {
            window[callbackName]=null;
            const elem = document.getElementById("id" + callbackName);
            head.removeChild(elem);
            option.fail&&option.fail(new Error('Timeout'))
        },timeout)
    }
    
    window[callbackName]=function (response) {
        window[callbackName]=null;
        const elem = document.getElementById("id" + callbackName);
        head.removeChild(elem);
        if(script.timer) clearTimeout(script.timer);
        option.success&&option.success(response)
    };
    script.onerror=function () {
        callback && callback({error:"error"});
        const elem = document.getElementById("id" + callbackName);
        head.removeChild(elem);
        if(script.timer) clearTimeout(script.timer);
        window[callbackName]=null;
    };
    head.appendChild(script);
}


function formatData(data) {
    if(typeof data=="string"){
        return data
    }
    if(typeof data=="object"){
        let arr=[];
        for(let name in data){
            arr.push(encodeURIComponent(name)+"="+encodeURIComponent(data[name]))
        }
        return arr.join("&")
    }
    return data
}
const getJsonpData =function(url,data,timeout,callbackName){
    return new Promise((resolve,reject)=>{
        jsonp({
            url,
            data,
            timeout:timeout||"",
            callback:callbackName ||"",
            success:function (response) {
                resolve(response)
            },
            fail:function (error) {
                reject(error)
            }
        })
    })
}
export default getJsonpData
