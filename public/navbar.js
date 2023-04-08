// This is the HTML code for the navigation bar
// Scripted for all the HTML pages

var token = localStorage.getItem('token');

function constructNavigationBarElement() {
    let navigationMenu = document.createElement('nav');
    navigationMenu.setAttribute('class', 'navigation-menu');

    let homeNavButton = document.createElement('a');
    homeNavButton.setAttribute('class', 'navigation-button navigation-text');
    homeNavButton.setAttribute('href', 'index.html');
    homeNavButton.innerHTML = 'Home';
    navigationMenu.appendChild(homeNavButton);

    let serviceSearchNavButton = document.createElement('a');
    serviceSearchNavButton.setAttribute('class', 'navigation-button navigation-text');
    serviceSearchNavButton.setAttribute('href', 'service-search');
    serviceSearchNavButton.innerHTML = 'Explore';
    navigationMenu.appendChild(serviceSearchNavButton);

    if (token){
        let myServicesNavButton = document.createElement('a');
        myServicesNavButton.setAttribute('class', 'navigation-button navigation-text');
        myServicesNavButton.setAttribute('href', 'my-services.html');
        myServicesNavButton.setAttribute('id', 'applicants');
        myServicesNavButton.innerHTML = 'My Services';
        navigationMenu.appendChild(myServicesNavButton);
    }

    let mjcNavButton = document.createElement('a');
    mjcNavButton.setAttribute('class', 'navigation-button navigation-text');
    mjcNavButton.setAttribute('href', 'https://www.mjc.edu/');
    mjcNavButton.setAttribute('target', '_blank');
    mjcNavButton.innerHTML = 'Explore';
    navigationMenu.appendChild(mjcNavButton);

    if (!token){
        let loginNavButton = document.createElement('a');
        loginNavButton.setAttribute('class', 'navigation-button navigation-text');
        loginNavButton.setAttribute('href', 'login.html');
        loginNavButton.setAttribute('id', 'navifation-login');
        loginNavButton.innerHTML = 'Login';
        navigationMenu.appendChild(loginNavButton);
    }
    else{
        let logoutNavButton = document.createElement('a');
        logoutNavButton.setAttribute('class', 'navigation-button navigation-text');
        logoutNavButton.setAttribute('href', 'logout.html');
        logoutNavButton.setAttribute('id', 'navifation-login');
        logoutNavButton.innerHTML = 'Logout';
        navigationMenu.appendChild(logoutNavButton);
    } 
      
    return(navigationMenu);
}

document.body.insertBefore(constructNavigationBarElement(), document.body.firstElementChild);

document.write("        <\/ul>");
document.write("");
document.write("        <div class = \"navigation-hamburger\">");
document.write("            <span class=\"navigation-line\"> <\/span>");
document.write("            <span class=\"navigation-line\"> <\/span>");
document.write("            <span class=\"navigation-line\"> <\/span>");
document.write("        <\/div>");
document.write("    <\/nav>  ");