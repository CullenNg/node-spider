function getEN(){
    var arr = [];
 
    for(var i = 65; i < 91; i++){
        arr.push(String.fromCharCode(i));
    }
 
    return arr;
}
const az = getEN();

const key = 'vivan';


az.map(x => {
    az.map(y => {
        const result = key + x + y +'.com';
        console.log(result.toLowerCase());
    })
})
 

