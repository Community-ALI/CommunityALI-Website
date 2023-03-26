// This is the HTML code for the navigation bar
// Scripted for all the HTML pages

document.write("    <nav class=\"navigation-menu\">");
document.write("        <ul class = \"navigation-bar\"> ");
document.write("            <li class=\"navigation-button\"> <a class=\"navigation-text\" href=\"index.html\" > Home <\/a> <\/li>");
document.write("            <li class=\"navigation-button\"> <a class=\"navigation-text\" href=\"service-search\" > Services <\/a> <\/li>");


var token = localStorage.getItem('token');
if (token){
    document.write("            <li class=\"navigation-button\" id=\"applicants\"> <a class=\"navigation-text\" href=\"applicants.html\" > Applicants <\/a> <\/li>");
}


document.write("            <li class=\"navigation-button\"> <a class=\"navigation-text\" href=\"https:\/\/www.mjc.edu\/\" target=”_blank” > MJC <\/a> <\/li>");


if (!token){
    document.write("            <li class=\"navigation-button\"> <a class=\"navigation-text\" id =\"navigation-login\" href=\"login.html\" > Login <\/a> <\/li>");
}
else{
    document.write("            <li class=\"navigation-button\"> <a class=\"navigation-text\" id =\"navigation-login\" href=\"logout.html\" > Logout <\/a> <\/li>");
} 


document.write("        <\/ul>");
document.write("");
document.write("        <div class = \"navigation-hamburger\">");
document.write("            <span class=\"navigation-line\"> <\/span>");
document.write("            <span class=\"navigation-line\"> <\/span>");
document.write("            <span class=\"navigation-line\"> <\/span>");
document.write("        <\/div>");
document.write("    <\/nav>  ");