// This is the HTML code for the navigation bar
// Scripted for all the HTML pages

var token = localStorage.getItem('token');
var currentPage = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
var fixedPages = ['index.html', ''];

function constructLoginNavButton() {
    if (!token){
        let loginNavButton = document.createElement('a');
        loginNavButton.setAttribute('class', 'navigation-button navigation-text');
        loginNavButton.setAttribute('href', 'login.html');
        loginNavButton.setAttribute('id', 'navigation-login');
        loginNavButton.innerHTML = 'Login';
        return loginNavButton;
    }
    else{
        let logoutNavButton = document.createElement('a');
        logoutNavButton.setAttribute('class', 'navigation-button navigation-text');
        logoutNavButton.setAttribute('href', 'logout.html');
        logoutNavButton.setAttribute('id', 'navigation-login');
        logoutNavButton.innerHTML = 'Logout';
        return logoutNavButton;
    } 
}

function constructCommunityCatalystLogo(isMobile) {
    let communityCatalystLogoLink = document.createElement('a');
    communityCatalystLogoLink.setAttribute('href', 'index.html');
    let communityCatalystLogoImg = document.createElement('img');
    communityCatalystLogoImg.setAttribute('src', 'Photos/CClogo.png');
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
    subjectAndCareerPathButton.setAttribute('href', 'service-search');
    subjectAndCareerPathButton.innerHTML = 'Subject and Career Path';
    subNavBar.appendChild(subjectAndCareerPathButton);

    let clubsAndCommunitiesButton = document.createElement('a');
    clubsAndCommunitiesButton.setAttribute('class', 'navigation-button navigation-text');
    clubsAndCommunitiesButton.setAttribute('href', 'service-search');
    clubsAndCommunitiesButton.innerHTML = 'Clubs and Communities';
    subNavBar.appendChild(clubsAndCommunitiesButton);

    let volunteerAndCommunityServiceButton = document.createElement('a');
    volunteerAndCommunityServiceButton.setAttribute('class', 'coming-soon navigation-button navigation-text');
    clubsAndCommunitiesButton.setAttribute('href', 'service-search');
    volunteerAndCommunityServiceButton.innerHTML = 'Volunteer & Community Service';
    subNavBar.appendChild(volunteerAndCommunityServiceButton);

    let internshipAndWorkExperienceButton = document.createElement('a');
    internshipAndWorkExperienceButton.setAttribute('class', 'coming-soon navigation-button navigation-text');
    clubsAndCommunitiesButton.setAttribute('href', 'service-search');
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
var topNavBar = navBarWrapper.appendChild(constructNavigationBarElement());
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