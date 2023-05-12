function sendMail() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;
    
    // Check if email is valid
    if (!isValidEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }
  
    var params = {
      name: name,
      email: email,
      message: message
    };
  
    const serviceID = "service_gv6i9wn";
    const templateID = "template_zn2vook";
  
    emailjs.send(serviceID, templateID, params)
    .then(res=>{
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";
      console.log(res);
      alert("Your message sent successfully!!");
    })
    .catch(err=>console.log(err));
  }
  
function isValidEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}
