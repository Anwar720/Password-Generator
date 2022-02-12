// Default password length
let length = 8;
let upper = document.querySelector('.upper')
let number = document.querySelector('.number')
let special = document.querySelector('.special')
let lower = document.querySelector('.lower')

// Displays selected password length 
const range = document.getElementById("range");
range.oninput = (()=>{
        document.getElementById("val").innerHTML = range.value;
        //assigns password length as value of range
        length = range.value;
});
//validation to make sure at least one choice is selected
function valid(){
        if(upper.checked || lower.checked || number.checked || special.checked){
                return true;
        }else{
                alert("Please make a selection.");
                return false;
        }
}
//generates random number
let generate_random = (add_number,add_special,add_upper,add_lower)=>{
        
        let random;
        // checks if numbers and special characters is checked
        if((add_upper || add_lower) && add_number && add_special ){
                return Math.floor(Math.random()*100 % 3);
        }else if(!add_number){          //checks if numbers is not checked
                if(!add_special){       // if numbers is not checked and special character is not checked
                        return 1;       // return 1 which will be a letter
                }
                else if (add_lower && add_special){                   // numbers is not checked but special character is checked
                        do{
                        random = Math.floor(Math.random()*100 % 3);
                        }while(random ===  0 ) // generate a new number if random equals 0
                        return random;  // return letter or symbol
                }else if(add_special && !add_lower){
                        return 2;
                }
        }else if (!add_special){
                // numbers and letters
                if(add_number && (add_lower || upper.checked)){
                        do{
                        random = Math.floor(Math.random()*100 % 3);
                        }while(random ===  2 ) // generate new number if random equals 2 
                        return random; 
                }
                // only numbers
                else if(add_number && !add_lower){ 
                        return random = 0; 
                }
        }else if(!add_lower){
                //uppercase and numbers
                if(add_upper){
                        return 1;
                }
                //numbers and symbols
                else if(add_number && add_special){
                        do{
                        random = Math.floor(Math.random()*100 % 3);
                        }while(random ===  1 ) // generate new number if random equals 2 
                        return random; 
                }
        }
}

// Generates Password
function generate_password(){
        const num = [0,1,2,3,4,5,6,7,8,9];
        const alpha = "abcdefghijklmnopqrstuvwxyz";
        const symbols = "!@#$%^&*()_+=-?/<>";
        
        //checkbox values
        const add_number = number.checked;
        const add_special = special.checked
        const add_lower = lower.checked;
        const add_upper = upper.checked;

        // used to display the password
        const text = document.getElementById("field");

        //stores the password
        let pass = "";
        //loop continues for the length of the password
        for(let i = length; i > 0; i--){
                // Randomly selects a number from 0 to 2
                let random_choice = generate_random(add_number,add_special,add_upper,add_lower);
                switch(random_choice){
                        //if choice is 0 then add a random digit from the num array
                        case 0:
                                pass+=num[Math.floor(Math.random()*10) ];
                        break;
                        // if choice is 1 then add a random letter from the alpha array
                        case 1:
                                if(upper.checked && !lower.checked ){
                                        pass += (alpha[Math.floor(Math.random()*26)]).toUpperCase();   
                                }else if (lower.checked && !upper.checked){
                                        pass+=alpha[Math.floor(Math.random()*26) ];
                                }
                                else if(upper.checked && lower.checked){
                                        if(Math.floor(Math.random()*100 % 2) === 0){
                                                pass+=alpha[Math.floor(Math.random()*26) ];
                                        }else{
                                                pass += (alpha[Math.floor(Math.random()*26)]).toUpperCase(); 
                                        }
                                }
                        break;
                        // if choice is 2 then add a random special character from the symbols array
                        case 2:
                                pass+=symbols[Math.floor(Math.random()*18) ];
                }
        }
        // displays the password 
        text.innerText = pass;
}

//calls the generate function on click to display password
const btn = document.querySelector(".btn");
btn.addEventListener("click",()=>{
        if(valid()){
                generate_password();
        }
        
});


