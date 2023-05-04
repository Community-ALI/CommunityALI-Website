// This is the HTML code for the navigation bar
// Scripted for all the HTML page

var token = localStorage.getItem('token');
var currentPage = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
var fixedPages = ['index.html', ''];

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

console.log(distanceFromPublicRoot);
console.log(pathToRoot);

function constructLoginNavButton() {
    if (!token){
        let loginNavButton = document.createElement('a');
        loginNavButton.setAttribute('class', 'navigation-button navigation-text');
        loginNavButton.setAttribute('id', 'navigation-login');
        loginNavButton.innerHTML = 'Login';
        loginNavButton.addEventListener('click', function(){
            loginPopupMenu.classList.remove('hidden');
            loginOutside.classList.remove('hidden');        
        })
        return loginNavButton;
    }
    else{
        let logoutNavButton = document.createElement('a');
        logoutNavButton.setAttribute('class', 'navigation-button navigation-text');
        logoutNavButton.setAttribute('href', pathToRoot + 'components/logout.html');
        logoutNavButton.setAttribute('id', 'navigation-login');
        logoutNavButton.innerHTML = 'Logout';
        return logoutNavButton;
    } 
}

function constructCommunityCatalystLogo(isMobile) {
    let communityCatalystLogoLink = document.createElement('a');
    communityCatalystLogoLink.setAttribute('href', pathToRoot + 'index.html');
    let communityCatalystLogoImg = document.createElement('img');
    communityCatalystLogoImg.setAttribute('src', pathToRoot + 'Photos/CommunityCatalyst_Transparent.png');
    communityCatalystLogoImg.setAttribute('class', 'navbar-logo');
    if (isMobile)
    {
        communityCatalystLogoImg.classList.add('mobileLogo');
    }
    communityCatalystLogoLink.appendChild(communityCatalystLogoImg);
    return communityCatalystLogoLink;
}

function constructNavigationBarElement() {
    let navigationMenu = document.createElement('nav');
    navigationMenu.setAttribute('class', 'navigation-menu');

    navigationMenu.appendChild(constructCommunityCatalystLogo(false));

    let searchBar = document.createElement('input');
    searchBar.setAttribute('placeholder', 'Search...');
    searchBar.setAttribute('id', 'nav-menu-search-bar');
    navigationMenu.appendChild(searchBar);

    let homeNavButton = document.createElement('a');
    homeNavButton.setAttribute('class', 'navigation-button navigation-text');
    homeNavButton.setAttribute('href', pathToRoot + 'index.html');
    homeNavButton.innerHTML = 'Home';
    navigationMenu.appendChild(homeNavButton);

    let serviceSearchNavButton = document.createElement('a');
    serviceSearchNavButton.setAttribute('class', 'navigation-button navigation-text');
    serviceSearchNavButton.setAttribute('href', pathToRoot + 'explore-services/main-page');
    serviceSearchNavButton.innerHTML = 'Explore';
    navigationMenu.appendChild(serviceSearchNavButton);

    if (token){
        let myServicesNavButton = document.createElement('a');
        myServicesNavButton.setAttribute('class', 'navigation-button navigation-text');
        myServicesNavButton.setAttribute('href', pathToRoot + 'my-services/main-page.html');
        myServicesNavButton.setAttribute('id', 'applicants');
        myServicesNavButton.innerHTML = 'My Services';
        navigationMenu.appendChild(myServicesNavButton);
    }

    let mjcNavButton = document.createElement('a');
    mjcNavButton.setAttribute('class', 'navigation-button navigation-text');
    mjcNavButton.setAttribute('href', 'https://www.mjc.edu/');
    mjcNavButton.setAttribute('target', '_blank');
    mjcNavButton.innerHTML = 'MJC';
    navigationMenu.appendChild(mjcNavButton);
  
    navigationMenu.appendChild(constructLoginNavButton());

    return(navigationMenu);
}

function constructSubNavBar() {
    let subNavBar = document.createElement('div');
    subNavBar.setAttribute('class', 'navigation-sub-menu navigation-menu');

    let subjectAndCareerPathButton = document.createElement('a');
    subjectAndCareerPathButton.setAttribute('class', 'navigation-button navigation-text');
    subjectAndCareerPathButton.setAttribute('href', pathToRoot + 'explore-services/main-page');
    subjectAndCareerPathButton.innerHTML = 'Subject and Career Path';
    subNavBar.appendChild(subjectAndCareerPathButton);

    let clubsAndCommunitiesButton = document.createElement('a');
    clubsAndCommunitiesButton.setAttribute('class', 'navigation-button navigation-text');
    clubsAndCommunitiesButton.setAttribute('href', pathToRoot + 'explore-services/main-page');
    clubsAndCommunitiesButton.innerHTML = 'Clubs and Communities';
    subNavBar.appendChild(clubsAndCommunitiesButton);

    let volunteerAndCommunityServiceButton = document.createElement('a');
    volunteerAndCommunityServiceButton.setAttribute('class', 'coming-soon navigation-button navigation-text');
    clubsAndCommunitiesButton.setAttribute('href', pathToRoot + 'explore-services/main-page');
    volunteerAndCommunityServiceButton.innerHTML = 'Volunteer & Community Service';
    subNavBar.appendChild(volunteerAndCommunityServiceButton);

    let internshipAndWorkExperienceButton = document.createElement('a');
    internshipAndWorkExperienceButton.setAttribute('class', 'coming-soon navigation-button navigation-text');
    clubsAndCommunitiesButton.setAttribute('href', pathToRoot + 'explore-services/main-page');
    internshipAndWorkExperienceButton.innerHTML = 'Internship & Work Experience';
    subNavBar.appendChild(internshipAndWorkExperienceButton);

    /* TEMPORARILY TAKING THIS OUT UNTIL A FURTHER CATEGORY IS MADE
    let inDevelopmentButton = document.createElement('a');
    inDevelopmentButton.setAttribute('class', 'coming-soon navigation-button navigation-text');
    clubsAndCommunitiesButton.setAttribute('href', 'service-search');
    inDevelopmentButton.innerHTML = 'In Development';
    subNavBar.appendChild(inDevelopmentButton); */

    return subNavBar;
}

function checkIfNavBarShouldBeFixed() {
    return fixedPages.includes(currentPage);
}

var navBarWrapper = document.createElement('div');
navBarWrapper.setAttribute('class', 'navigation-bar');
var topNavBarWrapper = document.createElement('div');
topNavBarWrapper.setAttribute('class', 'navigation-bar wrapper');
var topNavBar = topNavBarWrapper.appendChild(constructNavigationBarElement());
var topNavBar = navBarWrapper.appendChild(topNavBarWrapper);
var bottomNavBar = navBarWrapper.appendChild(constructSubNavBar());

if (!checkIfNavBarShouldBeFixed()) {
    navBarWrapper.classList.add('class', 'not-fixed');
}
document.body.insertBefore(navBarWrapper, document.body.firstElementChild);

window.addEventListener('scroll', () => {
    if (checkIfNavBarShouldBeFixed()){
        if (window.scrollY > 0){
            topNavBar.classList.add('scrolled');
        }
        else {
            topNavBar.classList.remove('scrolled');
        }
    
        /* TEMPORARILY TAKING THIS OUT UNTIL FEATURE IS NECESSARY
        if (window.scrollY > 720) {
            bottomNavBar.classList.add('scrolled');
        }
        else {
            bottomNavBar.classList.remove('scrolled');
        }
        */
        }
})

async function login(event) {
    event.preventDefault()
    const usernameOrEmail = document.getElementById('usernameOrEmail').value;
    // const username = document.getElementById('usernameOrEmail').value
    const password = document.getElementById('password').value
    const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    let authData
    if (validEmailRegex.test(usernameOrEmail)) {
        authData = { usernameOrEmail, password }
    } else {
        authData = { usernameOrEmail, password }
    }

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(authData)
        });
        const result = await response.json();

        if (result.status === 'ok') {
            //everything is a okay
            console.log('Got the token: ', result.data);
            localStorage.setItem('token', result.data);
            const decodedToken = JSON.parse(atob(result.data.split('.')[1]));
            alert('signed in as: '+ decodedToken.username);
            window.location.href = '/'
        } else {
            alert(result.error);
        }
    } catch (error) {
        console.error(error);
        alert('An error ocurred while logging in.');
    }
}

function constructNavigationHamburger() {
    let navigationHamburgerWrapper = document.createElement('div');
    navigationHamburgerWrapper.setAttribute('class', 'navigation-hamburger navigation-menu');

    let navigationHamburger = document.createElement('div');
    for (var i = 0; i < 3; i++){
        let navigationLine = document.createElement('rect');
        navigationLine.setAttribute('class', 'navigation-line');
        navigationHamburger.appendChild(navigationLine);
    }

    let communityCatalystLogoMobileWrappper = document.createElement('div');
    communityCatalystLogoMobileWrappper.setAttribute('class', 'center-content');
    communityCatalystLogoMobileWrappper.appendChild(constructCommunityCatalystLogo(true));

    navigationHamburgerWrapper.appendChild(navigationHamburger);
    navigationHamburgerWrapper.appendChild(communityCatalystLogoMobileWrappper); 

    document.body.appendChild(navigationHamburgerWrapper);
}

constructNavigationHamburger();
//constructPopupLoginMenu();

function constructLoginPopup() {

    let loginContainer = document.createElement('div');
    loginContainer.setAttribute('class', 'container-login hidden');
    loginContainer.innerHTML = `
    <div class="container">
      <h1>Login</h1>
      <form id="login">

        <div class="txt_field">
          <input id="usernameOrEmail" required="">
          <span></span>
          <label>Username or Email</label>
        </div>

        <div class="txt_field">
          <input type="password" id="password" required="">
          <span></span>
          <label>Password</label>
        </div>

        <!-- <div class="pass">Forgot Password?</div> -->
        <input type="submit" value="Login" id='login-submission'>
        <!-- <div class="signup_link">
          Don't have an account? <a href="signup.html">Sign-up</a>
        </div> -->
		<div class="signup_link">
			Do you own a club and can't log into your account? Contact us - communityalis@gmail.com
		  </div>
      </form>
    </div>
    `;
    return loginContainer;
}

let loginOutside = document.createElement('div');
loginOutside.classList.add('hidden');
loginOutside.id = 'login-popup-background';
var loginPopupBackground = document.body.insertBefore(loginOutside, document.body.firstElementChild);

var loginPopupMenu = document.body.appendChild(constructLoginPopup())

// listen for the user to select this button
const form = document.getElementById('login')
form.addEventListener('submit', login)


loginOutside.addEventListener('click', function() {
    loginPopupMenu.classList.add('hidden');
    loginOutside.classList.add('hidden');
    console.log('click');
})

constructLoginPopup();
