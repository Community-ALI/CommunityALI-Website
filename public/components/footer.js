var pathToRoot = './';

console.log(location.pathname.lastIndexOf('/'));
console.log(location.pathname);

distanceFromPublicRoot = location.pathname;
distanceFromPublicRoot = distanceFromPublicRoot.substring(1);
while (distanceFromPublicRoot.lastIndexOf('/') != -1) {
    pathToRoot = '.' + pathToRoot;
    distanceFromPublicRoot = distanceFromPublicRoot.substring(0, location.pathname.lastIndexOf('/') - 1);
    console.log("hello world");
    console.log(distanceFromPublicRoot);
    console.log(pathToRoot);
}

tech_support = pathToRoot + '/contact-form.html'


document.write("    <footer>");
document.write("        <div class=\"footer-container\">");
document.write("            <a href=\"https:\/\/www.facebook.com\/profile.php?id=100089185347335&mibextid=ZbWKwL\" target=\"_blank\">");
document.write("                <i class=\"fa fa-facebook fa-lg white-text mr-md-5 mr-3 fa-4x\"><\/i>");
document.write("            <\/a>");
document.write("            <a href=\"https:\/\/twitter.com\/Community_ALIs\" target=\"_blank\">");
document.write("                 <i class=\"fa fa-twitter fa-lg white-text mr-md-5 mr-3 fa-4x\"><\/i>");
document.write("            <\/a>");
document.write("            <a href=\"https:\/\/www.instagram.com\/community_ali\/\" target=\"_blank\">");
document.write("            <i class=\"fa fa-instagram fa-lg white-text mr-md-5 mr-3 fa-4x\"><\/i>");
document.write("            <\/a>");
document.write('            <a id="tech-support" href="' + tech_support + '"> Technical Support </a>');
document.write("        <\/div>");
document.write("        <div class=\"footer-text\">");
document.write("            <p> Copyright © 2023 Community Catalyst. All Rights Reserved. Community Catalyst is not directly affiliated with MJC or any of its subsidiaries. <\/p>");
document.write("        <\/div>");
document.write("    <\/footer>");