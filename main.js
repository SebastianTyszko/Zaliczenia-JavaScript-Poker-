
let cards = new Array();
let aces = {"H":"Hearts", "D":"Diamonds", "C":"Clubs", "S":"Spades"};
let setHand = "";
let handAces = new Array();
let handCards = new Array();
//press "show answer" button and show answer then
function getAnswer(){
let counter= 0;
cards = new Array();
Object.keys(aces).forEach(function(value) {
	for(let i=1;i<=13;i++)
	{
		cards.push(i+value);
	}
});
for (i=0;i<52;i++)
{
	position1=parseInt(Math.random()*52);
	tmp=cards[i];
	cards[i]=cards[position1];
	cards[position1]=tmp;
}
let list=document.getElementById("list");
list.innerHTML = "";
card="<div class='fila'>";
i=0;
handAces = new Array();
handCards = new Array();
cards.forEach(function(value){
        if (counter <= 4){
            if(i++==5)
            {
                    card=card+"</div><div class='fila'>";
                    i=1;
            }
            card=card+"<div>";
            if((value.substring(0,value.length-1))==1){
                card=card+"A<br>";
                handCards.push(value.substring(0,value.length-1));
            }else if ((value.substring(0,value.length-1))==11){
                card=card+"J<br>";
                handCards.push(value.substring(0,value.length-1));
            }else if((value.substring(0,value.length-1))==12){
                card=card+"Q<br>";
                handCards.push(value.substring(0,value.length-1));
            }else if((value.substring(0,value.length-1))==13){
                card=card+"K<br>";
                handCards.push(value.substring(0,value.length-1));
            }else{
                card=card+value.substring(0,value.length-1)+"<br>";
                handCards.push(value.substring(0,value.length-1));
            }
        card=card+"<span>"+aces[value.substring(value.length-1,value.length)]+"</span>";
        handAces.push(value.substring(value.length-1,value.length));
            card=card+"</div>";
            counter ++;
        }
});
tellMeHand();
list.innerHTML=list.innerHTML+card+"</div>";
list.innerHTML=list.innerHTML+setHand+"</div>";
}
function clc(){
    let list=document.getElementById("list");
    list.innerHTML = "";
}
function tellMeHand(){
    setHand="<div  class='fila2'>";
    setHand=setHand+"<div>";
    if(StraingthFlush()){
    setHand=setHand+"Straight Flush";
    }else if(flush()){    
    setHand=setHand+"Flush";
    }else if(fullHouse()){
    setHand=setHand+"Full House";
    }else if(threeKind()){
    setHand=setHand+"Three of a Kind";
    }else if(onePair()){
    setHand=setHand+"One Pair";
    }else{
    //nothing    
    setHand=setHand+"Nothing";
    }

}
function onePair(){
    for(i=0; i<=4; i++){
        for(j=i+1; j<=4; j++){
            if(handCards[i] ==handCards[j]){
                return true;
            }
        }
    }
}
function threeKind(){
    for(i=0; i<=4; i++){
        for(j=i+1; j<=4; j++){
            if(handCards[i] ==handCards[j]){
                for(k=j+1; k<=4; k++){
                    if(handCards[j] ==handCards[k]){
                        return true;
                    }
                }
            }
        }
    }
}
function fullHouse(){
    let numberRemoved= "";
    let auxArrayCards = new Array();
    auxArrayCards = handCards;
    for(i=0; i<=4; i++){
        for(j=i+1; j<=4; j++){
            if(auxArrayCards[i] ==auxArrayCards[j]){
                for(k=j+1; k<=4; k++){
                    if(auxArrayCards[j] ==auxArrayCards[k]){
                        numberRemoved = auxArrayCards[k];
                        auxArrayCards.splice(k,1);
                        auxArrayCards.splice(j,1);
                        auxArrayCards.splice(i,1);
                        if((auxArrayCards[0] == auxArrayCards[1]) && (numberRemoved != auxArrayCards[0])){
                            return true;
                        }
                    }
                }
            }
        }
    }
}
function flush(){
        if(handAces[0] == handAces[1] == handAces[2] == handAces[3] == handAces[4]){
            return true;       
        }
}
function StraingthFlush(){
    if(flush()){
        handCards.sort(function(a, b){return a - b});
        if(handCards[0] == ( handCards[1] - 1)){
            if(handCards[1] == ( handCards[2] - 1)){
                if(handCards[2] == ( handCards[3] - 1)){
                    if(handCards[3] == ( handCards[4] - 1)){
                        return true;
                    }
                }
            }
        }
    }
}