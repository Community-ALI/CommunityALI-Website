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

function TermlySection01InformationCollection() {
  return (
    <div className="py-6">
      {/* Section: WHAT INFORMATION DO WE COLLECT? */}
      <div id="infocollect" className="line-height-[1.5]">
        <span className="text-gray-500 text-base font-bold">
          <strong>1. WHAT INFORMATION DO WE COLLECT?</strong>
        </span>
      </div>
      <div className="line-height-[1.5] mt-2">
        <br />
      </div>
      {/* Subsection: Personal information you disclose to us */}
      <div id="personalinfo" className="line-height-[1.5]">
        <span className="text-black text-base">
          <strong>Personal information you disclose to us</strong>
        </span>
      </div>
      <div>
        <div>
          <br />
        </div>
        <div className="line-height-[1.5]">
          <span className="text-gray-500 text-base">
            <strong>In Short:</strong>
          </span>
          <span className="text-gray-500 text-base">
            We collect personal information that you provide to us.
          </span>
        </div>
        <div className="line-height-[1.5]">
          <br />
        </div>
        <div className="line-height-[1.5]">
          <span className="text-gray-500 text-base">
            We collect personal information that you voluntarily provide to us
            when you register on the Services, express an interest in obtaining
            information about us or our products and Services, when you
            participate in activities on the Services, or otherwise when you
            contact us.
          </span>
        </div>
        <div className="line-height-[1.5]">
          <br />
        </div>
        <div className="line-height-[1.5]">
          <span className="text-gray-500 text-base">
            All personal information that you provide to us must be true,
            complete, and accurate, and you must notify us of any changes to
            such personal information.
          </span>
        </div>
        <div className="line-height-[1.5]">
          <br />
        </div>
      </div>
      {/* Subsection: Sensitive Information */}
      <div id="sensitiveinfo" className="line-height-[1.5]">
        <span className="text-base">
          <strong>Sensitive Information.</strong> We do not process sensitive
          information.
        </span>
      </div>
      <div className="line-height-[1.5]">
        <br />
      </div>
      {/* Section: Information automatically collected */}
      <div className="line-height-[1.5]">
        <div className="line-height-[1.5]">
          <span className="text-gray-500 text-base">
            <strong>In Short:</strong>
          </span>
          <span className="text-gray-500 text-base">
            Some information — such as your Internet Protocol (IP) address
            and/or browser and device characteristics — is collected
            automatically when you visit our Services.
          </span>
        </div>
        <div className="line-height-[1.5]">
          <br />
        </div>
        <div className="line-height-[1.5]">
          <span className="text-gray-500 text-base">
            We automatically collect certain information when you visit, use, or
            navigate the Services. This information does not reveal your
            specific identity (like your name or contact information) but may
            include device and usage information, such as your IP address,
            browser and device characteristics, operating system, language
            preferences, referring URLs, device name, country, location,
            information about how and when you use our Services, and other
            technical information. This information is primarily needed to
            maintain the security and operation of our Services, and for our
            internal analytics and reporting purposes.
          </span>
        </div>
        <div className="line-height-[1.5]">
          <br />
        </div>
        <div className="line-height-[1.5]">
          <span className="text-gray-500 text-base">
            Like many businesses, we also collect information through cookies
            and similar technologies.
          </span>
        </div>
        <div className="line-height-[1.5]">
          <br />
        </div>
        <div className="line-height-[1.5]">
          <span className="text-gray-500 text-base">
            The information we collect includes:
          </span>
        </div>
        <ul className="list-disc list-inside ml-4">
          <li className="line-height-[1.5]">
            <span className="text-gray-500 text-base">
              <em>Log and Usage Data.</em> Log and usage data is
              service-related, diagnostic, usage, and performance information
              our servers automatically collect when you access or use our
              Services and which we record in log files. Depending on how you
              interact with us, this log data may include your IP address,
              device information, browser type, and settings and information
              about your activity in the Services (such as the date/time stamps
              associated with your usage, pages and files viewed, searches, and
              other actions you take such as which features you use), device
              event information (such as system activity, error
              reports(sometimes called "crash dumbs"), and hardware settings).
            </span>
          </li>
          <li className="line-height-[1.5]">
            <span className="text-gray-500 text-base">
              <em>Location Data.</em> We collect location data such as
              information about your device's location, which can be either
              precise or imprecise. How much information we collect depends on
              the type and settings of the device you use to access the
              Services. For example, we may use GPS and other technologies to
              collect geolocation data that tells us your current location
              (based on your IP address). You can opt out of allowing us to
              collect this information either by refusing access to the
              information or by disabling your Location setting on your device.
              However, if you choose to opt out, you may not be able to use
              certain aspects of the Services.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

function TermlySection02InformationProcessing() {
  return (
    <div className="py-6">
      {/* Section: HOW DO WE PROCESS YOUR INFORMATION? */}
      <div id="infouse" className="line-height-[1.5]">
        <span className="text-gray-500 text-base font-bold">
          <strong>2. HOW DO WE PROCESS YOUR INFORMATION?</strong>
        </span>
      </div>
      <div className="line-height-[1.5] mt-2">
        <br />
      </div>
      {/* Subsection: In Short */}
      <div className="line-height-[1.5]">
        <span className="text-gray-500 text-base">
          <strong>In Short:</strong>
        </span>
        <span className="text-gray-500 text-base">
          We process your information to provide, improve, and administer our
          Services, communicate with you, for security and fraud prevention, and
          to comply with the law. We may also process your information for other
          purposes with your consent.
        </span>
      </div>
      <div className="line-height-[1.5]">
        <br />
      </div>
      {/* Reasons for processing */}
      <div className="line-height-[1.5]">
        <span className="text-base">
          <strong>
            We process your personal information for a variety of reasons,
            depending on how you interact with our Services, including:
          </strong>
        </span>
      </div>
      <ul className="list-disc list-inside ml-4">
        <li className="line-height-[1.5]">
          <span className="text-gray-500 text-base">
            <strong>
              To facilitate account creation and authentication and otherwise
              manage user accounts.
            </strong>{" "}
            We may process your information so you can create and log in to your
            account, as well as keep your account in working order.
          </span>
        </li>
        <li className="line-height-[1.5]">
          <span className="text-gray-500 text-base">
            <strong>
              To respond to user inquiries/offer support to users.
            </strong>{" "}
            We may process your information to respond to your inquiries and
            solve any potential issues you might have with the requested
            service.
          </span>
        </li>
        <li className="line-height-[1.5]">
          <span className="text-gray-500 text-base">
            <strong>To send administrative information to you.</strong> We may
            process your information to send you details about our products and
            services, changes to our terms and policies, and other similar
            information.
          </span>
        </li>
        <li className="line-height-[1.5]">
          <span className="text-gray-500 text-base">
            <strong>To enable user-to-user communications.</strong> We may
            process your information if you choose to use any of our offerings
            that allow for communication with another user.
          </span>
        </li>
        <li className="line-height-[1.5]">
          <span className="text-gray-500 text-base">
            <strong>To protect our Services.</strong> We may process your
            information as part of our efforts to keep our Services safe and
            secure, including fraud monitoring and prevention.
          </span>
        </li>
        <li className="line-height-[1.5]">
          <span className="text-gray-500 text-base">
            <strong>
              To evaluate and improve our Services, products, marketing, and
              your experience.
            </strong>{" "}
            We may process your information to identify usage trends, determine
            the effectiveness of our promotional campaigns, and to evaluate and
            improve our offerings and your experience.
          </span>
        </li>
        <li className="line-height-[1.5]">
          <span className="text-gray-500 text-base">
            <strong>To comply with our legal obligations.</strong> We may
            process your information to respond to legal requests, comply with
            our legal obligations, and exercise, establish, or defend our legal
            rights.
          </span>
        </li>
      </ul>
    </div>
  );
}

function TermlySection03InformationSharing() {
  return (
    <div className="py-6">
      {/* Section: WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION? */}
      <div id="whoshare" className="line-height-[1.5]">
        <span className="text-gray-500 text-base font-bold">
          <strong>
            3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
          </strong>
        </span>
      </div>
      <div className="line-height-[1.5] mt-2">
        <br />
      </div>
      {/* Subsection: In Short */}
      <div className="line-height-[1.5]">
        <span className="text-gray-500 text-base">
          <strong>In Short:</strong>
        </span>
        <span className="text-gray-500 text-base">
          We may share information in specific situations described in this
          section and/or with third parties.
        </span>
      </div>
      <div className="line-height-[1.5]">
        <br />
      </div>
      {/* Sharing situations */}
      <div className="line-height-[1.5]">
        <span className="text-base">
          <strong>
            We may need to share your personal information in the following
            situations:
          </strong>
        </span>
      </div>
      <ul className="list-disc list-inside ml-4">
        <li className="line-height-[1.5]">
          <span className="text-gray-500 text-base">
            <strong>Business Transfers.</strong> We may share or transfer your
            information in connection with, or during negotiations of, any
            merger, sale of company assets, financing, or acquisition of all or
            a portion of our business to another company.
          </span>
        </li>
        <li className="line-height-[1.5]">
          <span className="text-gray-500 text-base">
            <strong>Other Users.</strong> When you share personal information
            (for example, by posting comments, contributions, or other content
            to the Services) or otherwise interact with public areas of the
            Services, such personal information may be viewed by all users and
            may be publicly made available outside the Services in perpetuity.
            Similarly, other users will be able to view descriptions of your
            activity, communicate with you within our Services, and view your
            profile.
          </span>
        </li>
      </ul>
    </div>
  );
}

function TermlySection04Cookies() {
  return (
    <div className="py-6">
      {/* Section: DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES? */}
      <div id="cookies" className="line-height-[1.5]">
        <span className="text-gray-500 text-base font-bold">
          <strong>4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</strong>
        </span>
      </div>
      <div className="line-height-[1.5] mt-2">
        <br />
      </div>
      {/* Subsection: In Short */}
      <div className="line-height-[1.5]">
        <span className="text-gray-500 text-base">
          <strong>In Short:</strong>
        </span>
        <span className="text-gray-500 text-base">
          We may use cookies and other tracking technologies to collect and
          store your information.
        </span>
      </div>
      <div className="line-height-[1.5]">
        <br />
      </div>
      {/* Cookies and other tracking technologies */}
      <div className="line-height-[1.5]">
        <span className="text-base">
          <strong>
            We may use cookies and similar tracking technologies (like web
            beacons and pixels) to access or store information. Specific
            information about how we use such technologies and how you can
            refuse certain cookies is set out in our Cookie Notice.
          </strong>
        </span>
      </div>
    </div>
  );
}

function TermlySection05InformationRetention() {
  return (
    <div className="py-6">
      {/* Section: HOW LONG DO WE KEEP YOUR INFORMATION? */}
      <div id="inforetain" className="line-height-[1.5]">
        <span className="text-gray-500 text-base font-bold">
          <strong>5. HOW LONG DO WE KEEP YOUR INFORMATION?</strong>
        </span>
      </div>
      <div className="line-height-[1.5] mt-2">
        <br />
      </div>
      {/* Subsection: In Short */}
      <div className="line-height-[1.5]">
        <span className="text-gray-500 text-base">
          <strong>In Short:</strong>
        </span>
        <span className="text-gray-500 text-base">
          We keep your information for as long as necessary to fulfill the
          purposes outlined in this privacy notice unless otherwise required by
          law.
        </span>
      </div>
      <div className="line-height-[1.5]">
        <br />
      </div>
      {/* Information retention */}
      <div className="line-height-[1.5]">
        <span className="text-base">
          We will only keep your personal information for as long as it is
          necessary for the purposes set out in this privacy notice, unless a
          longer retention period is required or permitted by law (such as tax,
          accounting, or other legal requirements). No purpose in this notice
          will require us keeping your personal information for longer than the
          period of time in which users have an account with us.
        </span>
      </div>
      <div className="line-height-[1.5]">
        <br />
      </div>
      {/* Data deletion or storage */}
      <div className="line-height-[1.5]">
        <span className="text-base">
          When we have no ongoing legitimate business need to process your
          personal information, we will either delete or anonymize such
          information, or, if this is not possible (for example, because your
          personal information has been stored in backup archives), then we will
          securely store your personal information and isolate it from any
          further processing until deletion is possible.
        </span>
      </div>
      <div className="line-height-[1.5]">
        <br />
      </div>
    </div>
  );
}

function TermltSection06InformationSafety() {
  return (
    <div className="py-6">
      {/* Section: HOW DO WE KEEP YOUR INFORMATION SAFE? */}
      <div id="infosafe" className="line-height-[1.5]">
        <span className="text-gray-500 text-base font-bold">
          <strong>6. HOW DO WE KEEP YOUR INFORMATION SAFE?</strong>
        </span>
      </div>
      <div className="line-height-[1.5] mt-2">
        <br />
      </div>
      {/* Subsection: In Short */}
      <div className="line-height-[1.5]">
        <span className="text-gray-500 text-base">
          <strong>In Short:</strong>
        </span>
        <span className="text-gray-500 text-base">
          We aim to protect your personal information through a system of
          organizational and technical security measures.
        </span>
      </div>
      <div className="line-height-[1.5]">
        <br />
      </div>
      {/* Information security */}
      <div className="line-height-[1.5]">
        <span className="text-base">
          We have implemented appropriate and reasonable technical and
          organizational security measures designed to protect the security of
          any personal information we process. However, despite our safeguards
          and efforts to secure your information, no electronic transmission
          over the Internet or information storage technology can be guaranteed
          to be 100% secure, so we cannot promise or guarantee that hackers,
          cybercriminals, or other unauthorized third parties will not be able
          to defeat our security and improperly collect, access, steal, or
          modify your information. Although we will do our best to protect your
          personal information, transmission of personal information to and from
          our Services is at your own risk. You should only access the Services
          within a secure environment.
        </span>
      </div>
      <div className="line-height-[1.5]">
        <br />
      </div>
    </div>
  );
}

function TermlySection07InformationMinors() {
  return (
    <div className="py-6">
      {/* Section: DO WE COLLECT INFORMATION FROM MINORS? */}
      <div id="infominors" className="line-height-[1.5]">
        <span className="text-gray-500 text-base font-bold">
          <strong>7. DO WE COLLECT INFORMATION FROM MINORS?</strong>
        </span>
      </div>
      <div className="line-height-[1.5] mt-2">
        <br />
      </div>
      {/* Subsection: In Short */}
      <div className="line-height-[1.5]">
        <span className="text-gray-500 text-base">
          <strong>In Short:</strong>
        </span>
        <span className="text-gray-500 text-base">
          We do not knowingly collect data from or market to children under 18
          years of age.
        </span>
      </div>
      <div className="line-height-[1.5]">
        <br />
      </div>
      {/* Information about minors */}
      <div className="line-height-[1.5]">
        <span className="text-base">
          We do not knowingly solicit data from or market to children under 18
          years of age. By using the Services, you represent that you are at
          least 18 or that you are the parent or guardian of such a minor and
          consent to such minor dependent’s use of the Services. If we learn
          that personal information from users less than 18 years of age has
          been collected, we will deactivate the account and take reasonable
          measures to promptly delete such data from our records. If you become
          aware of any data we may have collected from children under age 18,
          please contact us at{" "}
          <span className="text-gray-500 font-semibold">
            <span className="block-component">
              <span className="question">communityaliprivacy@gmail.com</span>
            </span>
          </span>
          .
        </span>
      </div>
      <div className="line-height-[1.5]">
        <br />
      </div>
    </div>
  );
}

function TermlySection08PrivacyRights() {
  return (
    <div className="py-6">
      {/* Section: WHAT ARE YOUR PRIVACY RIGHTS? */}
      <div id="privacyrights" className="line-height-[1.5]">
        <span className="text-gray-500 text-base font-bold">
          <strong>8. WHAT ARE YOUR PRIVACY RIGHTS?</strong>
        </span>
      </div>
      <div className="line-height-[1.5] mt-2">
        <br />
      </div>
      {/* Subsection: In Short */}
      <div className="line-height-[1.5]">
        <span className="text-gray-500 text-base">
          <strong>In Short:</strong>
        </span>
        <span className="text-gray-500 text-base">
          You may review, change, or terminate your account at any time.
        </span>
      </div>
      <div className="line-height-[1.5]">
        <br />
      </div>
      {/* Information about privacy rights */}
      <div className="line-height-[1.5]">
        <span className="text-base">
          If you are located in the EEA or UK and you believe we are unlawfully
          processing your personal information, you also have the right to
          complain to your{" "}
          <a
            href="https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            Member State data protection authority
          </a>{" "}
          or{" "}
          <a
            href="https://ico.org.uk/make-a-complaint/data-protection-complaints/data-protection-complaints/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            UK data protection authority
          </a>
          .
        </span>
      </div>
      <div className="line-height-[1.5]">
        <br />
      </div>
      {/* Information for users in Switzerland */}
      <div className="line-height-[1.5]">
        <span className="text-base">
          If you are located in Switzerland, you may contact the{" "}
          <a
            href="https://www.edoeb.admin.ch/edoeb/en/home.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            Federal Data Protection and Information Commissioner
          </a>
          .
        </span>
      </div>
      <div className="line-height-[1.5]">
        <br />
      </div>
      {/* Withdrawing consent */}
      <div id="withdrawconsent" className="line-height-[1.5]">
        <span className="text-base font-semibold underline">
          Withdrawing your consent:
        </span>
        <span className="text-base">
          If we are relying on your consent to process your personal
          information, which may be express and/or implied consent depending on
          the applicable law, you have the right to withdraw your consent at any
          time. You can withdraw your consent at any time by contacting us using
          the contact details provided in the section{" "}
          <a href="#contact" className="text-blue-500">
            HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
          </a>{" "}
          below.
        </span>
      </div>
      <div className="line-height-[1.5]">
        <br />
      </div>
      <div className="line-height-[1.5]">
        <span className="text-base">
          However, please note that this will not affect the lawfulness of the
          processing before its withdrawal nor, when applicable law allows, will
          it affect the processing of your personal information conducted in
          reliance on lawful processing grounds other than consent.
        </span>
      </div>
      <div className="line-height-[1.5]">
        <br />
      </div>
      {/* Account Information */}
      <div className="line-height-[1.5]">
        <span className="text-base font-semibold">
          <strong>Account Information</strong>
        </span>
      </div>
      <div className="line-height-[1.5]">
        <br />
      </div>
      <div className="line-height-[1.5]">
        <span className="text-base">
          If you would like to review, change, or terminate your account, you
          can:
        </span>
      </div>
      <ul className="list-disc list-inside">
        <li className="line-height-[1.5]">
          <span className="text-base">
            Log in to your account settings and update your user account.
          </span>
        </li>
        <li className="line-height-[1.5]">
          <span className="text-base">
            Contact us using the contact information provided.
          </span>
        </li>
      </ul>
      <div className="line-height-[1.5]">
        <span className="text-base">
          Upon your request to terminate your account, we will deactivate or
          delete your account and information from our active databases.
          However, we may retain some information in our files to prevent fraud,
          troubleshoot problems, assist with any investigations, enforce our
          legal terms, and/or comply with applicable legal requirements.
        </span>
      </div>
      <div className="line-height-[1.5]">
        <br />
      </div>
      <div className="line-height-[1.5]">
        <span className="text-base">
          <strong>Withdrawal of Consent:</strong> If we rely on your consent to
          process your personal information, you have the right to withdraw your
          consent at any time. Please note that withdrawing consent will not
          affect the processing done before withdrawal or processing based on
          other legal grounds.
        </span>
      </div>
      <div className="line-height-[1.5]">
        <br />
      </div>
      <div className="line-height-[1.5]">
        <span className="text-base">
          <strong>Cookies and Similar Technologies:</strong> Most web browsers
          accept cookies by default. You can set your browser to remove or
          reject cookies, but this may affect certain features or services on
          our website. You can also{" "}
          <a
            href="http://www.aboutads.info/choices/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            opt out of interest-based advertising by advertisers
          </a>{" "}
          on our website.
        </span>
      </div>
      <div className="line-height-[1.5]">
        <br />
      </div>
      <div className="line-height-[1.5]">
        <span className="text-base">
          If you have questions or comments about your privacy rights, you may
          email us at{" "}
          <a
            href="mailto:communityaliprivacy@gmail.com"
            className="text-blue-500"
          >
            communityaliprivacy@gmail.com
          </a>
          .
        </span>
      </div>
      <div className="line-height-[1.5]">
        <br />
      </div>
    </div>
  );
}

function TermlySection09DNT() {
  return (
    <div className="py-6">
      {/* Section: CONTROLS FOR DO-NOT-TRACK FEATURES */}
      <div id="DNT" className="line-height-[1.5]">
        <span className="text-gray-500 text-base font-bold">
          <strong>9. CONTROLS FOR DO-NOT-TRACK FEATURES</strong>
        </span>
      </div>
      <div className="line-height-[1.5] mt-2">
        <br />
      </div>
      <div className="line-height-[1.5]">
        <span className="text-base">
          Most web browsers and some mobile operating systems and mobile
          applications include a Do-Not-Track (<strong>DNT</strong>) feature or
          setting you can activate to signal your privacy preference not to have
          data about your online browsing activities monitored and collected. At
          this stage, no uniform technology standard for recognizing and
          implementing DNT signals has been finalized. As such, we do not
          currently respond to DNT browser signals or any other mechanism that
          automatically communicates your choice not to be tracked online. If a
          standard for online tracking is adopted that we must follow in the
          future, we will inform you about that practice in a revised version of
          this privacy notice.
        </span>
      </div>
      <div className="line-height-[1.5]">
        <br />
      </div>
    </div>
  );
}

function TermlySection10CCPAHeader() {
  return (
    <div className="py-6">
      {/* Section: DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS? */}
      <div id="caresidents" className="line-height-[1.5]">
        <span className="text-gray-500 text-base font-bold">
          <strong>
            10. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
          </strong>
        </span>
      </div>
      <div className="line-height-[1.5] mt-2">
        <br />
      </div>
      <div className="line-height-[1.5]">
        <span className="text-base">
          <strong>
            <em>In Short:</em>
          </strong>{" "}
          Yes, if you are a resident of California, you are granted specific
          rights regarding access to your personal information.
        </span>
      </div>
      <div className="line-height-[1.5] mt-2">
        <br />
      </div>
      <div className="line-height-[1.5]">
        <span className="text-base">
          California Civil Code Section 1798.83, also known as the{" "}
          <strong>"Shine The Light"</strong> law, permits our users who are
          California residents to request and obtain from us, once a year and
          free of charge, information about categories of personal information
          (if any) we disclosed to third parties for direct marketing purposes
          and the names and addresses of all third parties with which we shared
          personal information in the immediately preceding calendar year. If
          you are a California resident and would like to make such a request,
          please submit your request in writing to us using the contact
          information provided below.
        </span>
      </div>
      <div className="line-height-[1.5] mt-2">
        <br />
      </div>
      <div className="line-height-[1.5]">
        <span className="text-base">
          If you are under 18 years of age, reside in California, and have a
          registered account with Services, you have the right to request
          removal of unwanted data that you publicly post on the Services. To
          request removal of such data, please contact us using the contact
          information provided below and include the email address associated
          with your account and a statement that you reside in California. We
          will make sure the data is not publicly displayed on the Services, but
          please be aware that the data may not be completely or comprehensively
          removed from all our systems (e.g., backups, etc.).
        </span>
      </div>
      <div className="line-height-[1.5] mt-2">
        <br />
      </div>
    </div>
  );
}

function TermlySection10CCPAInformationCollection() {
  
}
