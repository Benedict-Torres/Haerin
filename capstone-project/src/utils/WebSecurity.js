export function clearSensitiveData(){

window.addEventListener(
"pagehide",
()=>{

sessionStorage.clear()

}
)

}

export function secureRandom(max){

const arr=
new Uint32Array(1)

crypto.getRandomValues(arr)

return arr[0]%max

}