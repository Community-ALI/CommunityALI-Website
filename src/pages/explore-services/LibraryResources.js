import React, { useState, useEffect } from "react";
import "./LibraryResources.css";
import librimage from "@Photos/librimage.jpg";

function Header() {
  return (
    <div className="bg-ali-darkblue rounded mx-auto  text-white p-2 text-center tlg:w-[80%] t2xl:w-[80%]   t3xl:h-20  t3xl:mt-4">
      <div className="t3xl:flex t3xl:justify-center t3xl:items-center t3xl:text-5xl t3xl:font-bold t3xl:mt-2">
        MJC Library Resources
      </div>
    </div>
  );
}
function ImageSection({ imageSrc, altText, children }) {
  return (
    <div className="mt-6 mb-10 flex flex-col tsm:gap-10 tsm:items-center tsm:flex-row tsm:justify-center tmd:gap-20 tlg:flex tlg:flex-row tlg:items-center tlg:justify-center tlg:gap-20 tlg:h-[176px] txl:gap-48 t3xl:gap-56 t3xl:h-[400px] t3xl:mt-16  ">
      <div className="flex justify-center">
        <img
          src={imageSrc}
          alt={altText}
          className="h-32 w-64 rounded-lg object-cover tsm:h-36 tmd:h-44 tmd:w-80 tlg:w-80 tlg:h-44  txl:h-44 txl:w-96 t3xl:h-[400px] t3xl:w-[800px]"
        />
      </div>
      <div className="flex justify-center mt-4 tmd:mt-0 tlg:mt-0">
        {children}
      </div>
    </div>
  );
}

function InfoBox({ title, children, extraClass, titleClass, innerClass }) {
  return (
    <div
      className={`bg-ali-lightblue text-white p-2 rounded-xl  ${extraClass}`}
    >
      {title && <p className={`font-semibold ${titleClass}`}>{title}</p>}
      {children && (
        <div className={`mt-2 break-words ${innerClass}`}>{children}</div>
      )}
    </div>
  );
}

const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState("xsm");

  useEffect(() => {
    const handleResize = () => {
      const width = document.documentElement.clientWidth;

      console.log("Width:", width);

      if (width <= 321) {
        setBreakpoint("txxs");
      } else if (width <= 415) {
        setBreakpoint("txsm");
      } else if (width <= 600) {
        setBreakpoint("tsm");
      } else if (width <= 780) {
        setBreakpoint("tmd");
      } else if (width <= 1024) {
        setBreakpoint("tlg");
      } else if (width <= 1280) {
        setBreakpoint("txl");
      } else if (width <= 1536) {
        setBreakpoint("t2xl");
      } else if (width <= 2570) {
        setBreakpoint("t3xl");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return breakpoint;
};

function computeCircleClass(index, breakpoint) {
  let positionClass = "";
  const baseClass =
    "circle bg-yellow-500 flex items-center justify-center w-24 h-24 rounded-full t3xl:w-52 t3xl:h-52 absolute z-1000 shadow-sm ";

  positionClass += "-left-2 top-10 ";

  if (breakpoint <= "txsm") {
    if (index === 1 || index === 3) {
      positionClass += " txsm:top-6 txsm: -left-2";
    }
  }

  if (breakpoint >= "txsm") {
    if (index === 1 || index === 3) {
      positionClass += " txsm:top-10 txsm: -left-2";
    }
  }

  if (breakpoint <= "tmd") {
    positionClass += " tmd:absolute tmd:left-4 tmd:top-8";
    if (index === 1 || index === 3) {
      positionClass += " tmd:absolute tmd:left-20 tmd:top-108px]";
    }
  }

  if (breakpoint >= "tlg") {
    positionClass += " tlg:absolute tlg:left-36 tlg:top-8";
    if (index === 1 || index === 3) {
      positionClass += " tlg:absolute tlg:left-36 tlg:top-[35px] ";
    }
  }

  if (breakpoint <= "txl") {
    positionClass += " txl:absolute txl:left-40 txl:top-8";
    if (index === 1 || index === 3) {
      positionClass += " txl:absolute txl:left-40 txl:top-[35px]";
    }
  }
  if (breakpoint >= "t2xl") {
    positionClass += " t2xl:absolute t2xl:left-52 t2xl:top-8";
    if (index === 1 || index === 3) {
      positionClass += " t2xl:absolute t2xl:left-52 t2xl:top-108px]";
    }
  }

  if (breakpoint >= "t3xl") {
    positionClass += " t3xl:absolute t3xl:left-96 t3xl:top-8";
    if (index === 1 || index === 3) {
      positionClass += " t3xl:absolute t3xl:left-52 t3xl:top-[108px]";
    }
  }

  if (breakpoint <= "t3xl") {
    positionClass += " t3xl:absolute t3xl:left-96 t3xl:top-[100px]";
    if (index === 1 || index === 3) {
      positionClass += " t3xl:absolute t3xl:left-52 t3xl:top-[80px]";
    }
  }
  const finalClass = `${baseClass} ${positionClass}`;

  return finalClass;
}

function ServicesList({ services }) {
  const breakpoint = useBreakpoint();
  return (
    <div className="space-y-4 mt-10 mx-auto flex flex-col  ">
      {services.map((service, index) => (
        <div
          key={index}
          className="relative flex items-start space-x-2 tsm:justify-center tlg:justify-center t2xl:justify-center t3xl:max-h-[500px]"
        >
          <div
            className={computeCircleClass(index, breakpoint)}
            style={{ boxShadow: "8px 0 6px -6px #000" }}
          >
            <img
              src={service.imageUrl}
              alt={service.title}
              className="object-cover w-14 h-14 tlg:w-14 tlg:h-14 t3xl:h-36 t3xl:w-36"
            />
          </div>
          <InfoBox
            title={service.title}
            titleClass="text-left pl-20 pt-2.5 t3xl:text-5xl t3xl:flex t3xl:justify-center  "
            innerClass={`pl-20 pb-2 p-auto text-sm whitespace-normal t3xl:text-4xl t3xl:mt-10  t3xl:ml-40 t3xl:leading-normal`}
            extraClass={`flex flex-col w-[100%] tsm:w-[90%] tlg:w-[70%] txl:w-[70%]  t2xl:w-[70%] tmd:h-[175px] t2xl:h-[150px] t3xl:h-[400px]   ${
              breakpoint === "txsm" && index === 0
                ? "txsm:h-[300px]"
                : breakpoint === "txsm" && index === 2
                ? "txsm:h-[150px]"
                : breakpoint === "txsm" && index === 3
                ? "txsm:h-[0px]"
                : // sm
                breakpoint === "tsm" && index === 0
                ? "tsm:h-[230px]"
                : breakpoint === "tsm" && index === 1
                ? "tsm:h-[275px]"
                : breakpoint === "tsm" && index === 2
                ? "tsm:h-[180px]"
                : breakpoint === "tsm" && index === 3
                ? "tsm:h-[300px]"
                : breakpoint === "tsm" && index === 4
                ? "tsm:h-[350px]"
                : //md
                breakpoint === "tmd" && index === 0
                ? "tmd:h-[200px]"
                : breakpoint === "tmd" && index === 1
                ? "tmd:h-[250px]"
                : breakpoint === "tmd" && index === 2
                ? "tmd:h-[200px]"
                : breakpoint === "tmd" && index === 3
                ? "tmd:h-[260px]"
                : breakpoint === "tmd" && index === 4
                ? "tmd:h-[335px]"
                : // Large
                breakpoint === "tlg" && index === 0
                ? "tlg:h-[170px]"
                : breakpoint === "tlg" && index === 1
                ? "tlg:h-[170px]"
                : breakpoint === "tlg" && index === 2
                ? "tlg:h-[130px]"
                : breakpoint === "tlg" && index === 4
                ? "tlg:h-[130px]"
                : //xl
                breakpoint === "txl" && index === 0
                ? "txl:h-[120px]"
                : breakpoint === "txl" && index === 1
                ? "txl:h-[230px]"
                : breakpoint === "txl" && index === 2
                ? "txl:h-[150px]"
                : breakpoint === "txl" && index === 3
                ? "txl:h-[250px]"
                : breakpoint === "txl" && index === 4
                ? "txl:h-[260px]"
                : // xxl
                breakpoint === "t2xl" && index === 0
                ? "t2xl:h-[350px]"
                : breakpoint === "t2xl" && index === 1
                ? "t2xl:h-[180px]"
                : breakpoint === "t2xl" && index === 2
                ? "t2xl:h-[130px]"
                : breakpoint === "t2xl" && index === 3
                ? "t2xl:h-[190px]"
                : breakpoint === "t2xl" && index === 4
                ? "t2xl:h-[200px]"
                : //3xl
                breakpoint === "t3xl" && index === 0
                ? "t3xl:h-[300px]"
                : breakpoint === "t3xl" && index === 1
                ? "t3xl:h-[400px]"
                : breakpoint === "t3xl" && index === 2
                ? "t3xl:h-[280px]"
                : breakpoint === "t3xl" && index === 3
                ? "t3xl:h-[420px]"
                : breakpoint === "t3xl" && index === 4
                ? "t3xl:h-[450px]"
                : "t3xl:h-[500px]"
            }`}
          >
            <div dangerouslySetInnerHTML={{ __html: service.description }} />
          </InfoBox>
        </div>
      ))}
    </div>
  );
}

function LibraryResources() {
  const services = [
    {
      title: "Circulation",
      description:
        'Borrow free materials that support the courses you’re taking (Textbooks, Calculators, Research books, Technology). Availability and diversity of materials vary. Use <a href="https://caccl-modesto.primo.exlibrisgroup.com/discovery/search?vid=01CACCL_MODESTO:MODESTO&lang=en" class="custom-link">Primo</a> to search for Books, eBooks, and Books on Reserve. If you’re looking for articles, then visit our <a href="https://libguides.mjc.edu/az.php" class="custom-link">database</a> page.',
      imageUrl: "/photos/supplies-icon.png",
    },

    {
      title: "Computer Labs",
      description:
        "Use computers, printers, scanners, and more. When you visit, there is no need to check in, just go straight to the technology you need to access!",
      imageUrl: "/photos/monitor-icon.png",
    },
    {
      title: "Research Help",
      description:
        'Receive expert guidance from Faculty for all of your research and citation needs. They will help you find, evaluate, and use resources for your academic work. Take advantage of this service by walking in or making an <a href="https://libcal.mjc.edu/appointments/online" class="custom-link">appointment</a>. You can also get Research Help from a librarian through chat, text (209) 710-5270, <a href="mailto:ask@mjc.libanswers.com" class="custom-link">email</a>, phone East (209) 575-6230 / West (209) 575-6949, or by accessing <a href="https://libguides.mjc.edu/videos" class="custom-link">How-To Videos</a>.',
      imageUrl: "/photos/file-icon.png",
    },

    {
      title: "Study Rooms",
      description:
        '<a href="https://libguides.mjc.edu/studyrooms" class="custom-link">Reserve</a> a Study Room to work on your own or with a group at either campus. Walk-in reservations can be made if there are rooms available.',
      imageUrl: "/photos/reading-icon.png",
    },

    {
      title: "Supplemental Instruction (SI)",
      description:
        'Access free academic help in traditionally challenging courses from students who passed with a high grade in out-of-class group study sessions as you integrate “what to learn” and “how to learn”. All students are encouraged to attend SI sessions, as it is a voluntary program. Participating students come from varying levels of academic preparedness; SI is a non-remedial offering. Learn more by visiting the <a href="https://libguides.mjc.edu/tutoring/supplementalinstruction" class="custom-link">SI page</a>.',
      imageUrl: "/photos/handshake-icon.png",
    },

    {
      title: "Tutoring",
      description:
        'Gain an academic advantage through tutoring. Tutoring is free at MJC and can pave the way to success in a wide variety of subjects including STEM, communication, English, chemistry, math and more! Our tutors already passed the course with high grades in the subjects they tutor. It\'s easy to make an appointment to meet with a tutor. Schedule your online or in-person appointment today through our <a href="https://nam02.safelinks.protection.outlook.com/?url=https%3A%2F%2Flibguides.mjc.edu%2Ftutoring&data=05%7C01%7Ckirill963940%40my.yosemite.edu%7C36fc32ecf36f43f1599a08dba2041862%7C3d35afe626ac437eb4b375b50d459e45%7C0%7C0%7C638281910765147985%7CUnknown%7CTWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D%7C3000%7C%7C%7C&sdata=UExSHMAYfCz4LV5HsC2TRq1qgCi96Y7hCVLR4cTudro%3D&reserved=0" class="custom-link">website</a>, visit in person, <a href="https://www.google.com/search?client=safari&rls=en&q=tutoring%40mjc.libanswers.com&ie=UTF-8&oe=UTF-8" class="custom-link">email</a>, or call us East Campus at 209-575-6346 or West Campus at 209-575-6676.',
      imageUrl: "/photos/teaching-icon.png",
    },
  ];

  return (
    <div className="bg-teal min-h-screen  p-4">
      <Header />
      <ImageSection imageSrc={librimage} altText="Library">
        <InfoBox
          title="Spring and Fall Open Hours"
          extraClass="w-80 h-36 tsm:h-36 tsm:w-72 tmd:h-44 tmd:w-80 txl:h-44 txl:w-96 t3xl:h-[400px] t3xl:w-[800px]" // Info box child div
          titleClass="text-center pt-2 text-sm t3xl:text-3xl t3xl:mt-6  " // Info box title
          innerClass="flex flex-col justify-between h-20 p-2 text-xs t3xl:text-3xl t3xl:mt-8 t3xl:ml-4" // Info box content
        >
          <p className="mb-2 sm:mb-1 t3xl:mb-4">
            <span className="text-ali-orange whitespace-nowrap">
              Monday - Friday:
            </span>{" "}
            7:30am - 8:30pm
          </p>
          <p className="mb-2 sm:mb-1 t3xl:mb-4">
            <span className="text-ali-orange whitespace-nowrap">Saturday:</span>{" "}
            8:30am - 5:00pm
          </p>
          <p className="mb-4 t3xl:mb-4">
            <span className="text-ali-orange whitespace-nowrap">Location:</span>
            <span className="font-semibold"> East Campus </span>
            Library & Learning Center Building Yosemite Hall Room 235
          </p>
        </InfoBox>
      </ImageSection>

      <ServicesList services={services} />
    </div>
  );
}

export default LibraryResources;
