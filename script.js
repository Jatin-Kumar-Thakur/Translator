let input_val=document.getElementById("input_type");
let output_val=document.getElementById("output_type");
let select_tag=document.querySelectorAll("select");
let input_text=document.getElementById("from_input");
let output_text=document.getElementById("to_input");
let btn=document.getElementById("sbmt");
let copy_1=document.getElementById("copy_input");
let copy_2=document.getElementById("copy_output");
let talk1=document.getElementById("speak_in");
let talk2=document.getElementById("speak_op");
// let select_tag=document.getElementsByClassName("select_common");
function swapValue(){
    let temp=input_val.value;
    input_val.value=output_val.value;
    output_val.value=temp;

    let temp2=output_text.value;
    output_text.value=input_text.value;
    input_text.value=temp2;
}

select_tag.forEach((key,id) => {
    for(const val in countries){
        let prevalue;
        if(id==0 && val=="en-GB"){
            prevalue="selected";
        }
        else if(id==1 && val=="hi-IN"){
            prevalue="selected";
        }
        let option=`<option value="${val}" ${prevalue}>${countries[val]}</option>`
        key.insertAdjacentHTML("beforeend",option)
    }
});

btn.addEventListener("click" ,()=>{
    let text=input_text.value;
    let translatefrom=input_type.value;
    let translateTo=output_type.value;
    let apiurl=`https://api.mymemory.translated.net/get?q=${text}&langpair=${translatefrom}|${translateTo}`;
    fetch(apiurl).then(res=>res.json()).then(data=>{
        // console.log(data);
        output_text.value=data.responseData.translatedText;
    });

});
input_text.addEventListener("keypress" ,()=>{
    let text=input_text.value;
    let translatefrom=input_type.value;
    let translateTo=output_type.value;
    let apiurl=`https://api.mymemory.translated.net/get?q=${text}&langpair=${translatefrom}|${translateTo}`;
    fetch(apiurl).then(res=>res.json()).then(data=>{
        // console.log(data);
        output_text.value=data.responseData.translatedText;
    });

});

copy_1.addEventListener("click",()=>{
    navigator.clipboard.writeText(input_text.value);
});
copy_2.addEventListener("click",()=>{
    navigator.clipboard.writeText(output_text.value);
});
talk1.addEventListener("click",()=>{
    let talk;
    talk=new SpeechSynthesisUtterance(input_text.value);
    speechSynthesis.speak(talk);
});
talk2.addEventListener("click",()=>{
    let t;
    // console.log(output_text.value)
    t=new SpeechSynthesisUtterance(output_text.value);
    speechSynthesis.speak(t);
});
