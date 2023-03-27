const applyLink = document.querySelectorAll('.jobApplyLink');
applyLink.forEach(item => {
    item.addEventListener('click', function(e){
        
      // get job data in  siblings
        const possitionEl = item.nextElementSibling
        const descEl      = possitionEl.nextElementSibling;
        const refNoEl     = descEl.nextElementSibling;
        
        // Set session storage to pass job data
        sessionStorage.setItem("refNo",refNoEl.value);
        sessionStorage.setItem("jobPoss",refNoEl.value);
        sessionStorage.setItem("jobDesc",refNoEl.value);

       
    })
})
//apply.html data fill
const jobRefNo= document.querySelector("#job-reference-no");
window.addEventListener('load',function(e){
    if(sessionStorage.getItem("refNo") && jobRefNo){
        console.log(sessionStorage.getItem("refNo"));
        jobRefNo.value=sessionStorage.getItem("refNo");
    }
    
});
//apply.html form 
const applyForm     = document.querySelector('#apply-form');
//initialize variable and assign elements 
const firstName     = document.querySelector("#first-name");
const lastName      = document.querySelector("#last-name");
const dob           = document.querySelector("#date-of-birth");
const genderM       = document.querySelector("#genderm");
const genderf       = document.querySelector("#genderf");
const streetAddress = document.querySelector("#street-address");
const sturbTown     = document.querySelector("#suburb-town");
const state         = document.querySelector("#state");
const postcode      = document.querySelector("#postcode");
const emailAddress  = document.querySelector("#email-address");
const phoneNumber   = document.querySelector("#phone-number");
const skills        = document.querySelectorAll("input[type='checkbox'][name='skills[]']");
const otherSkillsText   = document.querySelector("#other-skills");
//pre-fill on load
window.addEventListener('load',fillApplyForm(checkSessionStorage()));
// prevent form submtion and check validity and save from data and  submit
applyForm.addEventListener('submit', function(e){
    // get form data
    const fData=new FormData(applyForm);
    // check formData object
    console.log(fData);
    //get form values by key
    const [fname,laname,dobText,gender,strAdd,stuTown,stateText,postcodeText,email,pno,Skills,otherSkills] =   [
        fData.get('first_name'),
        fData.get('last_name'),
        fData.get('date_of_birth'),
        fData.get('gender'),
        fData.get('street_address'),
        fData.get('suburb_town'),
        fData.get('state'),
        fData.get('postcode'),
        fData.get('email_address'),
        fData.get('phone_number'),
        fData.getAll('skills[]'),
        fData.get('other_skills')
    ];
 
     
    
    // prevent form submition
     e.preventDefault();

        
     // check cform validity
     if(isVaildForm()){
        // form data store in session 
        setSessionStorage(fname,laname,dobText,gender,strAdd,stuTown,stateText,postcodeText,email,pno,Skills,otherSkills);
        // submit form data to server
        applyForm.submit();
    }
     
 });
//check if exist in session storage
function checkSessionStorage(){
    //Check for session values by keys 
    if(sessionStorage.getItem("firstName") 
    && sessionStorage.getItem("lastName")
    && sessionStorage.getItem("dob")
    && sessionStorage.getItem("streeetAddress")
    && sessionStorage.getItem("sturbTown")
    && sessionStorage.getItem("state")
    && sessionStorage.getItem("postcode")
    && sessionStorage.getItem("emailAddress")
    && sessionStorage.getItem("phoneNumber"))
        return true;
    return false;
}
//pre-fill application form
function fillApplyForm(isExists){
    // check sesstion storage
    if (!isExists) 
        return

    // set values of input boxes
    firstName.value = sessionStorage.getItem("firstName");
    lastName.value  = sessionStorage.getItem("lastName");
    dob.value       = sessionStorage.getItem("dob");
    streetAddress.value= sessionStorage.getItem("streeetAddress");
    sturbTown.value    = sessionStorage.getItem("sturbTown");
    state.value        = sessionStorage.getItem("state");
    postcode.value     = sessionStorage.getItem("postcode");
    emailAddress.value = sessionStorage.getItem("emailAddress");
    phoneNumber.value  = sessionStorage.getItem("phoneNumber");

    // get gender
    const gender =sessionStorage.getItem("gender");
    if(gender === "Female"){
        genderf.checked=true;
    }
    else{
        genderM.checked=true;
    }

    otherSkillsText.value=sessionStorage.getItem("otherSkills");
    // get skills array
    const skillArr=sessionStorage.getItem("skillArray");
    //set selected check boxes according to skills array
    skills.forEach((input)=>{
        if(skillArr.includes(input.value,0)){
            input.checked=true;
        }
    })

    return;
}
// set session storeage
function setSessionStorage(fname,lname,dobText,gender,strAdd,stuTown,stateText,postcodeText,email,pno,skillsArray,otherSkills){
    sessionStorage.setItem("firstName",fname);
    sessionStorage.setItem("lastName",lname);
    sessionStorage.setItem("dob",dobText);
    sessionStorage.setItem("gender",gender);
    sessionStorage.setItem("streeetAddress",strAdd);
    sessionStorage.setItem("sturbTown",stuTown);
    sessionStorage.setItem("state",stateText);
    sessionStorage.setItem("postcode",postcodeText);
    sessionStorage.setItem("emailAddress",email);
    sessionStorage.setItem("phoneNumber",pno);
    sessionStorage.setItem("skillArray",skillsArray);
    sessionStorage.setItem("otherSkills",otherSkills);
}
//valdition part
const errMsgFirstName     = document.querySelector('#first-name-err');
const errMsgLastName      = document.querySelector('#last-name-err');
const errMsgdob           = document.querySelector("#birthday-err");
const errMsgStreetAddress = document.querySelector('#street-err');
const errMsgSturbTown     = document.querySelector("#Suburb-town-err");
const errMsgpostcode      = document.querySelector("#postcode-err")
const errMsgemailAddress  = document.querySelector("#email-err");
const errMsgphoneNumber   = document.querySelector("#phoneno-err");
const errMsgotherSkillsText   = document.querySelector("#other-skill-err");


firstName.addEventListener('keyup',function(e){
 
    if(!validateFirstName()){
        firstName.classList.add('err-input');
        errMsgFirstName.classList.remove('err-none-active');
    }else{
        firstName.classList.remove('err-input');
        errMsgFirstName.classList.add('err-none-active');

    }
    
});
lastName.addEventListener('keyup',function(e){
 
    if(!validateLastName()){
        lastName.classList.add('err-input');
        errMsgLastName.classList.remove('err-none-active');
    }else{
        lastName.classList.remove('err-input');
        errMsgLastName.classList.add('err-none-active');

    }
    console.log('validation')
});

 dob.addEventListener('keyup',function(e){
 
    if(!validateBirth()){
        dob.classList.add('err-input');
        errMsgdob.classList.remove('err-none-active');
    }else{
        dob.classList.remove('err-input');
        errMsgdob.classList.add('err-none-active');

    }
    console.log('validation')
});

streetAddress.addEventListener('keyup',function(e){
 
    if(!validateStreetAddress()){
        streetAddress.classList.add('err-input');
        errMsgStreetAddress.classList.remove('err-none-active');
    }else{
        streetAddress.classList.remove('err-input');
        errMsgStreetAddress.classList.add('err-none-active');

    }
    console.log('validation')
});
sturbTown.addEventListener('keyup',function(e){
 
    if(!validateSturbTown()){
        sturbTown.classList.add('err-input');
        errMsgSturbTown.classList.remove('err-none-active');
    }else{
        sturbTown.classList.remove('err-input');
        errMsgSturbTown.classList.add('err-none-active');

    }
    console.log('validation')
});
postcode.addEventListener('keyup',function(e){
 
    if(!validatePostcode()){
        postcode.classList.add('err-input');
        errMsgpostcode.classList.remove('err-none-active');
    }else{
        postcode.classList.remove('err-input');
        errMsgpostcode.classList.add('err-none-active');

    }
    console.log('validation')
});
emailAddress.addEventListener('keyup',function(e){
 
    if(!validateEmail()){
        emailAddress.classList.add('err-input');
        errMsgemailAddress.classList.remove('err-none-active');
    }else{
        emailAddress.classList.remove('err-input');
        errMsgemailAddress.classList.add('err-none-active');

    }
    console.log('validation')
})
phoneNumber .addEventListener('keyup',function(e){
 
    if(!validatePno()){
        phoneNumber .classList.add('err-input');
        errMsgphoneNumber.classList.remove('err-none-active');
    }else{
        phoneNumber .classList.remove('err-input');
        errMsgphoneNumber.classList.add('err-none-active');

    }
    console.log('validation')
});
otherSkillsText.addEventListener('keyup',function(e){
    if(!validateOtherSkills()){
        otherSkillsText.classList.add('err-input');
        errMsgotherSkillsText.classList.remove('err-none-active');
    }else{
        otherSkillsText .classList.remove('err-input');
        errMsgotherSkillsText.classList.add('err-none-active');

    }
});
state.addEventListener('click',function(e){
    if(!validatePostcode()){
        postcode.classList.add('err-input');
        errMsgpostcode.classList.remove('err-none-active');
    }else{
        postcode.classList.remove('err-input');
        errMsgpostcode.classList.add('err-none-active');

    }
});

const otherSkillCheckBox = document.querySelector('#other_skill_chbx');
otherSkillCheckBox.addEventListener('click',function(e){
    if(!validateOtherSkills()){
        otherSkillsText.classList.add('err-input');
        errMsgotherSkillsText.classList.remove('err-none-active');
    }else{
        otherSkillsText .classList.remove('err-input');
        errMsgotherSkillsText.classList.add('err-none-active');

    }
});

//check  form validation
function isVaildForm(){
    let validForm=true;
    // First name  Validity 
    if(!validateFirstName()){
        firstName.classList.add('err-input');
        errMsgFirstName.classList.remove('err-none-active');
        validForm=false;
    }else{
        firstName.classList.remove('err-input');
        errMsgFirstName.classList.add('err-none-active');

    }

    if(!validateLastName()){
        lastName.classList.add('err-input');
        errMsgLastName.classList.remove('err-none-active');
        validForm=false;
    }else{
        lastName.classList.remove('err-input');
        errMsgLastName.classList.add('err-none-active');

    }

    if(!validateBirth()){
        dob.classList.add('err-input');
        errMsgdob.classList.remove('err-none-active');
        validForm=false;
    }else{
        dob.classList.remove('err-input');
        errMsgdob.classList.add('err-none-active');

    }

    if(!validateStreetAddress()){
        streetAddress.classList.add('err-input');
        errMsgStreetAddress.classList.remove('err-none-active');
        validForm-false;
    }else{
        streetAddress.classList.remove('err-input');
        errMsgStreetAddress.classList.add('err-none-active');

    }

    if(!validateSturbTown()){
        sturbTown.classList.add('err-input');
        errMsgSturbTown.classList.remove('err-none-active');
        validForm=false;
    }else{
        sturbTown.classList.remove('err-input');
        errMsgSturbTown.classList.add('err-none-active');

    }

    if(!validatePostcode()){
        postcode.classList.add('err-input');
        errMsgpostcode.classList.remove('err-none-active');
        validForm=false;
    }else{
        postcode.classList.remove('err-input');
        errMsgpostcode.classList.add('err-none-active');

    }

    if(!validateEmail()){
        emailAddress.classList.add('err-input');
        errMsgemailAddress.classList.remove('err-none-active');
        validForm=false;
    }else{
        emailAddress.classList.remove('err-input');
        errMsgemailAddress.classList.add('err-none-active');

    }

    if(!validatePno()){
        phoneNumber .classList.add('err-input');
        errMsgphoneNumber.classList.remove('err-none-active');
        validForm=false;
    }else{
        phoneNumber .classList.remove('err-input');
        errMsgphoneNumber.classList.add('err-none-active');

    }

    if(!validateOtherSkills()){
        otherSkillsText.classList.add('err-input');
        errMsgotherSkillsText.classList.remove('err-none-active');
        validForm=false;
    }else{
        otherSkillsText .classList.remove('err-input');
        errMsgotherSkillsText.classList.add('err-none-active');

    }

    return validForm;
}
function validateFirstName(){
    const fName=firstName.value;
    var re = /^[a-zA-Z]+$/;

    
    return re.test(fName);

}
function validateLastName(){
    const lName=lastName.value;
    var re = /^[a-zA-Z]+$/;

    
    return re.test(lName);

}
function validateBirth(){
    const Bday=dob.value;
    const re=/(((0[1-9])|([12][0-9])|(3[01]))\/((0[0-9])|(1[012]))\/((20[012]\d|19\d\d)|(1\d|2[0123])))/  ;
    let BdateArr = Bday.split(/[/]/);
    //console.log(sentences); 
    var date1 = new Date(BdateArr[2],BdateArr[1],BdateArr[0]);
    var today = new Date();
    var diff = new Date(today.getTime() - date1.getTime())
    
    const yDif=diff.getUTCFullYear() - 1970; // Gives difference as year
    const mDif=(diff.getUTCMonth()+1); // Gives month count of difference
    console.log(mDif)
    const dDif=(diff.getUTCDate() +1); // Gives day count of difference 
    console.log(yDif)   
    if(yDif>=80)
        return false;
    else if(yDif==79 && ((mDif==12) || (mDif==0 && dDif>0)))
        return false;
    if(yDif<15)
        return false;

    return re.test(Bday);
}
function validateStreetAddress(){
    const strtAddress=streetAddress.value;
    var re = /^[a-zA-Z0-9,/ ]+$/;

    
    return re.test(strtAddress);

}
function validateSturbTown(){
    const stBtown=sturbTown .value;
    var re = /^[a-zA-Z0-9/]+$/;
    return re.test(stBtown);

}

function validatePostcode(){
    const Postcode= postcode.value;
    const State   = state.value;
    let re='';
    switch(State){
        case 'VIC':
            re=/(^3|^8)[0-9]{3}/
            break
        case 'NSW':
            re=/(^1|^2)[0-9]{3}/
            break
        case 'QLD':
            re=/(^4|^9)[0-9]{3}/
            break
        case 'NT':
            re=/^0[0-9]{3}/
            break
        case 'WA':
            re=/^6[0-9]{3}/
            break
        case 'SA':
            re=/^5[0-9]{3}/
            break
        case 'TAS':
            re=/^7[0-9]{3}/
            break
        case 'ACT':
            re=/^0[0-9]{3}/
            break
        default:
            re=''
            
    }
    return re.test(Postcode);

}

function validateEmail(){
    const email=emailAddress.value;
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);Pno()

}
function validatePno(){
    const pnumber= phoneNumber.value;
    var re =/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4,5})$/ ;
    
    return re.test(pnumber);

}
function validatePno(){
    const pnumber= phoneNumber.value;
    var re =/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4,5})$/ ;
    
    return re.test(pnumber);

}




function validateOtherSkills(){
  
   if(otherSkillCheckBox.checked && otherSkillsText.value==''){
    return false
   }
   return true
   
}