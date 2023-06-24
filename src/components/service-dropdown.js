import React, { useState } from 'react';

const ServiceDropdown = () => {
  const [isContentVisible, setContentVisible] = useState(false);
  const [isButtonCollapsed, setButtonCollapsed] = useState(true);
  const [isButton2Collapsed, setButton2Collapsed] = useState(true)
  const [isButton3Collapsed, setButton3Collapsed] = useState(true)
  const [isButton4Collapsed, setButton4Collapsed] = useState(true)
  const [isButton5Collapsed, setButton5Collapsed] = useState(true)
  const [sortBy, setSortBy] = useState('');

  const toggleContent = () => {
    setContentVisible(!isContentVisible);
  };

  const toggleButton = () => {
    setButtonCollapsed(!isButtonCollapsed);
  };

  const toggleButton2 = () => {
    setButton2Collapsed(!isButton2Collapsed);
  };

  const toggleButton3 = () => {
    setButton3Collapsed(!isButton3Collapsed);
  };

  const toggleButton4 = () => {
    setButton4Collapsed(!isButton4Collapsed);
  };

  const toggleButton5 = () => {
    setButton5Collapsed(!isButton5Collapsed);
  };

  const handleContentClick = (event) => {
    event.stopPropagation();
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };


    const[checkboxes, setCheckboxes] = useState({
      subjectAndCareerOriented:{
        agriculture: false,
        art: false,
        behavioral: false,
        business: false,
        fitness: false,
        industry: false,
        language: false,
        public: false,
        science: false,
        engineering: false
      },
      clubsAndCommunities:{
        computerScienceClub: false,
        mathAndEngineeringClub: false,
        youngFarmersClub: false,
        mannrrsClub: false,
        greatValleyAstronomyClub: false,
        aUnityClub: false,
        musciciansGuild: false,
        geologyClub: false,
        filmClub: false,
        electronicMusicClub: false,
        cheerClub: false,
        dungeonsAndDragonsClub: false,
        americanSignLanguaggeClub: false,
        parrotsClub: false,
        preHealthClub: false,
        internationalClub: false,
        freedomForumClub: false,
        businessClub: false,
        anthropologyClub: false,
      },
      volunteeriesandCommunityService:{
        test: false,
      },
      internshipsAndworkExperience:{
        test: false,
      },
      eventsAndOther:{
        test: false,
      },
    });

    const handleCheckboxChange = (category, checkbox) => {
      setCheckboxes(prevCheckboxes => ({
        ...prevCheckboxes,
        [category]: {
          ...prevCheckboxes[category],
          [checkbox]: !prevCheckboxes[category][checkbox]
        }
      }));
    };

    const sortItems = (items) => {
      switch (sortBy) {
        case 'alphabetical':
          return items.sort((a, b) => a.label.localeCompare(b.label));
        case 'reverse-alphabetical':
          return items.sort((a, b) => b.label.localeCompare(a.label));
        case 'nearest':
          return items.sort((a, b) => a.distance - b.distance);
        default:
          return items;
      }
    };
  
    const renderItems = (items) => {
      const sortedItems = sortItems(items);
      return sortedItems.map((item) => <label key={item.id}><input type="checkbox" /> {item.label}</label>);
    };
  
    const items = [
      { id: 1, label: 'Item A', distance: 5 },
      { id: 2, label: 'Item C', distance: 3 },
      { id: 3, label: 'Item B', distance: 7 },
    ];


  return (
    <>
      <div className="dropdown-container">
        <button className="add-service-button" onClick={toggleContent}>
          <b>Add a Service Category</b><span className={`arrow ${isContentVisible ? 'up' : 'down'}`}></span>
        </button>

        {isContentVisible && (
          <div className="content" onClick={handleContentClick}>
            <button className="collapsible-button" onClick={toggleButton}>
            <span className={`arrow ${isButtonCollapsed ? 'down' : 'up'}`}></span>Subject & Career Oriented 
            </button>
            {!isButtonCollapsed && (
              <div className="details">
            
                <label>
                  <input type="checkbox" 
                   checked={checkboxes.subjectAndCareerOriented.agriculture} 
                   onChange={() => handleCheckboxChange('subjectAndCareerOriented', 'agriculture')}/> Agriculture
                </label>
                <label>
                  <input type="checkbox"
                   checked={checkboxes.subjectAndCareerOriented.art} //add the checked attribute here 
                   onChange={() => handleCheckboxChange('subjectAndCareerOriented', 'art')} /> Art, Performances & Humanities
                </label>
                <label>
                  <input type="checkbox"
                   checked={checkboxes.subjectAndCareerOriented.behavioral} //add the checked attribute here
                   onChange={() => handleCheckboxChange('subjectAndCareerOriented', 'behavioral')} /> Behavioral & Social Sciences
                </label>
                <label>
                  <input type="checkbox"
                   checked={checkboxes.subjectAndCareerOriented.business} //add the checked attribute here
                   onChange={() => handleCheckboxChange('subjectAndCareerOriented', 'business')} /> Business & Computing
                </label>
                <label>
                  <input type="checkbox"
                   checked={checkboxes.subjectAndCareerOriented.fitness} //add the checked attribute here
                   onChange={() => handleCheckboxChange('subjectAndCareerOriented', 'fitness')} /> Fitness & Health Professions
                </label>
                <label>
                  <input type="checkbox"
                   checked={checkboxes.subjectAndCareerOriented.industry} //add the checked attribute here
                   onChange={() => handleCheckboxChange('subjectAndCareerOriented', 'industry')} /> Industry & Trades
                </label>
                <label>
                  <input type="checkbox" 
                   checked={checkboxes.subjectAndCareerOriented.language} //add the checked attribute here
                   onChange={() => handleCheckboxChange('subjectAndCareerOriented', 'language')}/> Language Arts & Education
                </label>
                <label>
                  <input type="checkbox" 
                   checked={checkboxes.subjectAndCareerOriented.public} //add the checked attribute here
                   onChange={() => handleCheckboxChange('subjectAndCareerOriented', 'public')}/> Public Safety
                </label>
                <label>
                  <input type="checkbox"
                   checked={checkboxes.subjectAndCareerOriented.science} //add the checked attribute here
                   onChange={() => handleCheckboxChange('subjectAndCareerOriented', 'science')} /> Science, Engineering & Mathematics
                </label>
                </div>
            
            )}

            <button className='collapsible-button' onClick={toggleButton2}> <span className={`arrow ${isButtonCollapsed ? 'down' : 'up'}`}></span>Clubs & Communities  </button>

            {!isButton2Collapsed && (
              <div className='details'>
                
                   <label><input type="checkbox"
                    checked={checkboxes.clubsAndCommunities.computerScienceClub} //add the checked attribute here
                    onChange={() => handleCheckboxChange('clubsAndCommunities', 'computerScienceClub')} /> Computer science Club
                   </label>
                   <label><input type="checkbox"
                   checked={checkboxes.clubsAndCommunities.mathAndEngineeringClub} //add the checked attribute here
                   onChange={() => handleCheckboxChange('clubsAndCommunities', 'mathAndEngineeringClub')} />  Math and Engineering Club
                   </label>
                   <label><input type="checkbox"
                   checked={checkboxes.clubsAndCommunities.youngFarmersClub} //add the checked attribute here
                   onChange={() => handleCheckboxChange('clubsAndCommunities', 'youngFarmersClub')} />  Young Farmers Club
                   </label>
                   <label><input type="checkbox"
                    checked={checkboxes.clubsAndCommunities.mannrrsClub} //add the checked attribute here
                    onChange={() => handleCheckboxChange('clubsAndCommunities', 'mannrrsClub')}/>  MANRRS Club
                   </label>
                   <label><input type="checkbox"
                   checked={checkboxes.clubsAndCommunities.greatValleyAstronomyClub} //add the checked attribute here
                   onChange={() => handleCheckboxChange('clubsAndCommunities', 'greatValleyAstronomyClub')} />  Great Valley Astronomy Club
                   </label>
                   <label><input type="checkbox"
                   checked={checkboxes.clubsAndCommunities.aUnityClub} //add the checked attribute here
                   onChange={() => handleCheckboxChange('clubsAndCommunities', 'aUnityClub')} />  A.C.E Unity Club
                   </label>
                   <label><input type="checkbox"
                   checked={checkboxes.clubsAndCommunities.musciciansGuild} //add the checked attribute here
                   onChange={() => handleCheckboxChange('clubsAndCommunities', 'musiciansGuild')} />  Musicians' Guild
                   </label>
                   <label><input type="checkbox"
                   checked={checkboxes.clubsAndCommunities.geologyClub} //add the checked attribute here
                   onChange={() => handleCheckboxChange('clubsAndCommunities', 'geologyClub')} />  Geology Club
                   </label>
                   <label><input type="checkbox"
                   checked={checkboxes.clubsAndCommunities.filmClub} //add the checked attribute here
                   onChange={() => handleCheckboxChange('clubsAndCommunities', 'filmClub')} />  Film Club
                   </label>
                   <label><input type="checkbox"
                   checked={checkboxes.clubsAndCommunities.electronicMusicClub} //add the checked attribute here
                   onChange={() => handleCheckboxChange('clubsAndCommunities', 'electronicMusicClub')} />  Electronic Music Club
                   </label>
                   <label><input type="checkbox"
                   checked={checkboxes.clubsAndCommunities.cheerClub} //add the checked attribute here
                   onChange={() => handleCheckboxChange('clubsAndCommunities', 'cheerClub')} />  Cheer Club
                   </label>
                   <label><input type="checkbox"
                   checked={checkboxes.clubsAndCommunities.dungeonsAndDragonsClub} //add the checked attribute here
                   onChange={() => handleCheckboxChange('clubsAndCommunities', 'dungeonsAndDragonsClub')} />  Dungeons and Dragons Club
                   </label>
                   <label><input type="checkbox"
                   checked={checkboxes.clubsAndCommunities.americanSignLanguaggeClub} //add the checked attribute here
                   onChange={() => handleCheckboxChange('clubsAndCommunities', 'americanSignLanguageClub')} />  American Sign Language Club
                   </label>
                   <label><input type="checkbox"
                   checked={checkboxes.clubsAndCommunities.parrotsClub} //add the checked attribute here
                   onChange={() => handleCheckboxChange('clubsAndCommunities', 'parrotsClub')} />  Parrots Club
                   </label>
                   <label><input type="checkbox"
                   checked={checkboxes.clubsAndCommunities.preHealthClub} //add the checked attribute here
                   onChange={() => handleCheckboxChange('clubsAndCommunities', 'preHealthClub')} />  Pre-Health Club
                   </label>
                   <label><input type="checkbox"
                   checked={checkboxes.clubsAndCommunities.internationalClub} //add the checked attribute here
                   onChange={() => handleCheckboxChange('clubsAndCommunities', 'internationalClub')} />  International Club
                   </label>
                   <label><input type="checkbox"
                   checked={checkboxes.clubsAndCommunities.freedomForumClub} //add the checked attribute here
                   onChange={() => handleCheckboxChange('clubsAndCommunities', 'freedomForumClub')} />  Freedom Forum Club
                   </label>
                   <label><input type="checkbox"
                   checked={checkboxes.clubsAndCommunities.businessClub} //add the checked attribute here
                   onChange={() => handleCheckboxChange('clubsAndCommunities', 'BusinessClub')} />  Business Club
                   </label>
                   <label><input type="checkbox"
                   checked={checkboxes.clubsAndCommunities.anthropologyClub} //add the checked attribute here
                   onChange={() => handleCheckboxChange('clubsAndCommunities', 'anthropologyClub')} />  Anthropology Club
                   </label>

                </div>
            )}

            <button className="collapsible-button" onClick={toggleButton3}> <span className={`arrow ${isButtonCollapsed ? 'down' : 'up'}`}></span>Volunteering & Community Service </button>

            {!isButton3Collapsed && (
              <div className='details'>
                <label><input type='checkbox' /> Test </label>
                </div>
            )}

            <button className='collapsible-button' onClick={toggleButton4}> <span className={`arrow ${isButtonCollapsed ? 'down' : 'up'}`}></span>Internships & Work Experience </button>

            {!isButton4Collapsed && (
              <div className='details'>
                <label><input type='checkbox' /> Test </label>

              </div>
            )}

            <button className='collapsible-button' onClick={toggleButton5}> <span className={`arrow ${isButtonCollapsed ? 'down' : 'up'}`}></span>Events & Other </button>

            {!isButton5Collapsed && (
              <div className='details'>
                <label><input type='checkbox' /> Test </label>

              </div>
            )}
          </div>
        )}
<div className="right-section">
          <div className="sort-by">
            <label>Sort by:</label>
            <select value={sortBy} onChange={handleSortByChange}>
              <option value="">None</option>
              <option value="alphabetical">Alphabetical</option>
              <option value="reverse-alphabetical">Reverse Alphabetical</option>
              <option value="nearest">Nearest to you</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceDropdown;