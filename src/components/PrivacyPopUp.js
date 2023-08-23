import React from "react";

// make a react component that contains a privacy policy pop up which you can scroll through
export default function PrivacyPopUp() {
  return (
    <div
      className="fixed z-10 top-[30vh] left-[50vw] translate-x-[-50%] inset-0 overflow-y-auto w-[50vw] h-[50vh]
    "
    >
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="mt-3 text-left text-gray-500 sm:mt-0 sm:text-left flex flex-col">
          <TermlyPrivacyHeader />
          <TermlyPrivacyKeyPoints />
        </div>
      </div>
    </div>
  );
}

function TermlyPrivacyHeader() {
  return (
    <div>
      <strong>
        <span className="text-2xl">
          <span data-custom-class="title">
            <div className="block-component"></div>
            <h1 className="question">PRIVACY POLICY</h1>
            <div className="statement-end-if-in-editor"></div>
          </span>
        </span>
      </strong>
      <div>
        <br />
      </div>
      <div>
        <span className="text-gray-500">
          <strong>
            <span className="text-base">
              <span data-custom-class="subtitle">
                Last updated <div className="question">August 18, 2023</div>
              </span>
            </span>
          </strong>
        </span>
      </div>
      <div>
        <br />
      </div>
      <div>
        <br />
      </div>
      <div className="line-height-6">
        <span className="text-gray-500">
          <span className="text-gray-600 text-base">
            <span className="body_text">
              This privacy notice for{" "}
              <b className="question">
                Community ALI<b className="block-component"></b>
              </b>
              (
              <b className="block-component">
                "<strong>we</strong>," "<strong>us</strong>," or "
                <strong>our</strong>"
                <b className="statement-end-if-in-editor"></b>
              </b>
            </span>
            <span className="body_text">
              ), describes how and why we might collect, store, use, and/or
              share (
              <b className="block-component">
                "<strong>process</strong>"
                <b className="statement-end-if-in-editor"></b>
              </b>
              ) your information when you use our services (
              <b className="block-component">
                "<strong>Services</strong>"
                <b className="statement-end-if-in-editor"></b>
              </b>
              ), such as when you:
            </span>
          </span>
        </span>
        <span className="text-base">
          <span className="text-gray-500">
            <span className="body_text">
              <b className="block-component"></b>
            </span>
          </span>
        </span>
      </div>
      <ul>
        <li className="line-height-6">
          <span className="text-base text-gray-600">
            <span className="text-base text-gray-600">
              <span className="body_text">
                Visit our website
                <b className="block-component">
                  {" "}
                  at{" "}
                  <b className="question">
                    <a
                      href="https://www.communityali.org"
                      target="_blank"
                      className="link"
                    >
                      https://www.communityali.org
                    </a>
                  </b>
                  <span className="text-base">
                    <span className="text-gray-600">
                      <span className="body_text">
                        <span className="text-base text-gray-600">
                          <b className="statement-end-if-in-editor">
                            , or any website of ours that links to this privacy
                            notice
                          </b>
                        </span>
                      </span>
                    </span>
                  </span>
                </b>
              </span>
            </span>
          </span>
        </li>
      </ul>
      <div>
        <b className="block-component">
          <span className="text-base">
            <span className="text-base">
              <span className="text-gray-500">
                <span className="body_text">
                  <b className="block-component"></b>
                </span>
              </span>
            </span>
          </span>
        </b>
      </div>
      <ul>
        <li className="line-height-6">
          <span className="text-base text-gray-600">
            <span className="text-base text-gray-600">
              <span className="body_text">
                Engage with us in other related ways, including any sales,
                marketing, or events
                <span className="text-base">
                  <span className="text-gray-600">
                    <span className="body_text">
                      <span className="text-base text-gray-600">
                        <span className="text-gray-600">
                          <b className="statement-end-if-in-editor"></b>
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </span>
        </li>
      </ul>
      <div className="line-height-6">
        <span className="text-base">
          <span className="text-gray-500">
            <span className="body_text">
              <strong>Questions or concerns? </strong>
              Reading this privacy notice will help you understand your privacy
              rights and choices. If you do not agree with our policies and
              practices, please do not use our Services. If you still have any
              questions or concerns, please contact us at{" "}
              <b className="question">communityaliprivacy@gmail.com</b>.
            </span>
          </span>
        </span>
      </div>
      <div className="line-height-6">
        <br />
      </div>
      <div className="line-height-6">
        <br />
      </div>
    </div>
  );
}

function TermlyPrivacyKeyPoints() {
  return (
    <div className="py-6">
      <div className="text-xl font-semibold">
        <span className="text-base font-semibold">SUMMARY OF KEY POINTS</span>
      </div>
      <div className="mt-6">
        <span className="text-base">
          <strong>
            <em>
              This summary provides key points from our privacy notice, but you
              can find out more details about any of these topics by clicking
              the link following each key point or by using our{" "}
            </em>
          </strong>
        </span>
        <a className="text-blue-600" href="#toc">
          <strong>
            <em>table of contents</em>
          </strong>
        </a>
        <span className="text-base">
          <strong>
            <em> below to find the section you are looking for.</em>
          </strong>
        </span>
      </div>
      <div className="mt-6">
        <span className="text-base">
          <strong>What personal information do we process?</strong> When you
          visit, use, or navigate our Services, we may process personal
          information depending on how you interact with us and the Services,
          the choices you make, and the products and features you use. Learn
          more about{" "}
        </span>
        <a className="text-blue-600" href="#personalinfo">
          personal information you disclose to us
        </a>
        <span className="text-base">.</span>
      </div>
      <div className="mt-6">
        <span className="text-base">
          <strong>Do we process any sensitive personal information?</strong> We
          do not process sensitive personal information.
        </span>
      </div>
      <div className="mt-6">
        <span className="text-base">
          <strong>Do we receive any information from third parties?</strong> We
          do not receive any information from third parties.
        </span>
      </div>
      <div className="mt-6">
        <span className="text-base">
          <strong>How do we process your information?</strong> We process your
          information to provide, improve, and administer our Services,
          communicate with you, for security and fraud prevention, and to comply
          with law. We may also process your information for other purposes with
          your consent. We process your information only when we have a valid
          legal reason to do so. Learn more about{" "}
        </span>
        <a className="text-blue-600" href="#infouse">
          how we process your information
        </a>
        <span className="text-base">.</span>
      </div>
      <div className="mt-6">
        <span className="text-base">
          <strong>
            In what situations and with which parties do we share personal
            information?
          </strong>{" "}
          We may share information in specific situations and with specific
          third parties. Learn more about{" "}
        </span>
        <a className="text-blue-600" href="#whoshare">
          when and with whom we share your personal information
        </a>
        <span className="text-base">.</span>
      </div>
      <div className="mt-6">
        <span className="text-base">
          <strong>How do we keep your information safe?</strong> We have
          organizational and technical processes and procedures in place to
          protect your personal information. However, no electronic transmission
          over the internet or information storage technology can be guaranteed
          to be 100% secure, so we cannot promise or guarantee that hackers,
          cybercriminals, or other unauthorized third parties will not be able
          to defeat our security and improperly collect, access, steal, or
          modify your information. Learn more about{" "}
        </span>
        <a className="text-blue-600" href="#infosafe">
          how we keep your information safe
        </a>
        <span className="text-base">.</span>
      </div>
      <div className="mt-6">
        <span className="text-base">
          <strong>What are your rights?</strong> Depending on where you are
          located geographically, the applicable privacy law may mean you have
          certain rights regarding your personal information. Learn more about{" "}
        </span>
        <a className="text-blue-600" href="#privacyrights">
          your privacy rights
        </a>
        <span className="text-base">.</span>
      </div>
      <div className="mt-6">
        <span className="text-base">
          <strong>How do you exercise your rights?</strong> The easiest way to
          exercise your rights is by{" "}
        </span>
        <a
          className="text-blue-600"
          href="https://app.termly.io/notify/92ff0b3b-4d13-4c72-9f6e-78d02e40c39e"
          rel="noopener noreferrer"
          target="_blank"
        >
          data subject access request
        </a>
        <span className="text-base">
          {" "}
          or by contacting us. We will consider and act upon any request in
          accordance with applicable data protection laws.
        </span>
      </div>
      <div className="mt-6">
        <span className="text-base">
          Want to learn more about what we do with any information we collect?{" "}
        </span>
        <a className="text-blue-600" href="#toc">
          Review the privacy notice in full
        </a>
        <span className="text-base">.</span>
      </div>
      <div className="mt-6">
        <br />
      </div>
    </div>
  );
}

function TermlyPrivacyTableOfContents() {
  const tableOfContents = [
    { title: "WHAT INFORMATION DO WE COLLECT?", id: "infocollect" },
    { title: "HOW DO WE PROCESS YOUR INFORMATION?", id: "infouse" },
    {
      title: "WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?",
      id: "whoshare",
    },
    {
      title: "DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?",
      id: "cookies",
    },
    { title: "HOW LONG DO WE KEEP YOUR INFORMATION?", id: "inforetain" },
    { title: "HOW DO WE KEEP YOUR INFORMATION SAFE?", id: "infosafe" },
    { title: "DO WE COLLECT INFORMATION FROM MINORS?", id: "infominors" },
    { title: "WHAT ARE YOUR PRIVACY RIGHTS?", id: "privacyrights" },
    { title: "CONTROLS FOR DO-NOT-TRACK FEATURES", id: "DNT" },
    {
      title: "DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?",
      id: "caresidents",
    },
    {
      title: "DO VIRGINIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?",
      id: "virginia",
    },
    { title: "DO WE MAKE UPDATES TO THIS NOTICE?", id: "policyupdates" },
    { title: "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?", id: "contact" },
    {
      title:
        "HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?",
      id: "request",
    },
  ];
  return (
    <div className="py-6">
      <div id="toc" className="line-height-[1.5]">
        <span className="text-base font-bold">
          <span className="text-gray-500">
            <span className="text-black">
              <strong>
                <span className="heading_1">TABLE OF CONTENTS</span>
              </strong>
            </span>
          </span>
        </span>
      </div>
      <div className="line-height-[1.5] mt-2">
        <br />
      </div>
      {tableOfContents.map((item, index) => (
        <div key={index} className="line-height-[1.5]">
          <span className="text-base">
            <a className="link" href={`#${item.id}`}>
              <span className="text-gray-600">{`${index + 1}. ${
                item.title
              }`}</span>
            </a>
          </span>
        </div>
      ))}
      <div className="line-height-[1.5] mt-2">
        <br />
      </div>
      <div className="line-height-[1.5]">
        <br />
      </div>
    </div>
  );
}
