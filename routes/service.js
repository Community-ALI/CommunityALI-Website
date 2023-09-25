const express = require("express");
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const sanitizeHtml = require("sanitize-html");

const service_data = require("../controllers/service-data");
const applicant_data = require("../controllers/applicant-data");

router.get(
  "get-clubs-and-communites/:sort/:service_type/:categories",
  (req, res) => {
    res.send(
      service_data(
        req.params.sort,
        req.params.service_type,
        req.params.categories
      )
    );
  }
);

// send the user one service
router.get("/get-one-service", async function (req, res) {
  try {
    const service_name = req.query.service;
    const service = await service_data.get_one_service(service_name);
    console.log("sending service:", service_name);
    res.json(service);
  } catch (error) {
    console.log(error);
    res.json({ success: false, error: "internal server error" });
  }
});

// send the user every service
router.get(
  "/get-all-services/:sorting/:serviceType/:categories/:users",
  async function (req, res) {
    //updateServicesWithThumbnails();
    try {
      console.log(req.params);
      var keywords = req.query.keyword;
      const all_services = await service_data.get_services(
        keywords,
        "title thumbnail pages",
        req.params.sorting,
        req.params.serviceType,
        req.params.categories,
        req.params.users
      );
      res.json(all_services);
      console.log("filtered services sent");
    } catch (error) {
      console.log(error);
      res.json({ success: false, error: "internal server error" });
    }
  }
);

router.post("/delete-service", async function (req, res) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const username = decodedToken.username;

    const service_name = req.query.service;
    const service = await service_data.get_one_service(service_name);

    if (service.user == username) {
      const success = await service_data.delete_service(service_name);
      console.log(success);
      if (success) {
        console.log("service deleted by", username);
        res.json({ success: true });
      } else {
        console.log("problem deleting service from database");
        res.json({ success: false, error: "internal detabase error" });
      }
    } else {
      console.log(service.user, username);
      console.log("user does not own service!");
      res.json({ success: false, error: "unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, error: "internal server error" });
  }
  // authorize user
});

function sanitizeService(req, res, next) {
  if (!sanitizeHtml(req.body.title).length > 0) {
    res.json({
      success: false,
      error: "title required or detected injection attack",
    });
    return;
  }
  if (!sanitizeHtml(req.body.description).length > 0) {
    res.json({
      success: false,
      error: "description required or detected injection attack",
    });
    return;
  }
  next();
}

router.post(
  "/edit-service",
  upload.single("image"),
  storeEditService
);
async function storeEditService(req, res) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const username = decodedToken.username;
    const user_id = decodedToken._id;
    const service_name = req.query.service;
    const service = await service_data.get_one_service(service_name);
    if (service.user == username || service.Editors.includes(user_id)) {
      const result = await service_data.editService(req, username);
      if (result.success) {
        console.log("service edited by", username);
        res.json({ success: true });
      } else {
        console.log(result.error);
        if (result.error.code === 11000) {
          res.json({
            success: false,
            error: `We're sorry, but another service with the name "${req.body.title}" already exists.  Please choose a different name, or use your original service name.`,
          });
        } else {
          res.json({
            success: false,
            error:
              "An error occurred while updating the service. Please try again later!",
          });
        }
      }
    } else {
      console.log(service.user, username);
      console.log("user is not authorized to edit service!");
      res.json({ success: false, error: "unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error:
        "An error occurred while updating the service. Please try again later!",
    });
  }
}

router.post(
  "/upload-service",
  upload.single("image"),
  async function (req, res) {
    console.log("service uploading...");
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, JWT_SECRET);
      const username = decodedToken.username;
      const account = await User.findOne({ username });
      if (account) {
        const requestedServiceType = req.body.serviceType;
        if (
          (requestedServiceType == "Club" && account.clubAdmin) ||
          (requestedServiceType == "Internship" && account.internshipAdmin) ||
          (requestedServiceType == "Program" && account.programAdmin)
        ) {
          const result = await service_data.store_add_service(req, username);
          if (result.success) {
            console.log(`new ${req.body.serviceType} added by ${username}`);
            res.json({ success: true });
          } else {
            console.log(result.error.code);
            if (result.error.code === 11000) {
              res.status(400).json({
                success: false,
                error: `We're sorry, but another service with the name "${req.body.title}" already exists.  Please choose a different name.`,
              });
            } else {
              res.status(500).json({
                success: false,
                error:
                  "An error occurred while adding the service. Please try again later.",
              });
            }
          }
        } else {
          console.error(
            `${account.username} is not authorized to post ${requestedServiceType} services`
          );
          res.json({ success: false, error: "unauthorized" });
        }
      } else {
        console.error("account does not exist");
        res.json({ success: false, error: "unauthorized" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        error:
          "An error occurred while adding the service. Please try again later.",
      });
    }
  }
);

router.get("/get-service-notifications", async function (req, res) {
  try {
    const service_name = req.query.service;
    const service = await service_data.get_one_service(service_name);

    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const username = decodedToken.username;
    if (service && username && username == service.user) {
      // the user owns this service
      const applicants =
        await applicant_data.get_service_applicants_notifications(
          service.title
        );
      res.json(applicants);
      console.log(applicants.length, "applications sent for", service.title);
    } else {
      console.log("unauthorized request");
      res.json({ success: false, error: "unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.json({
      dataServices: [],
      tokenUsername: "not logged in",
    });
  }
});

// add a new member to the service
router.post("/add-member", async (req, res) => {
  try {
    const service_name = req.query.service;
    const service = await service_data.get_one_service(service_name);

    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const username = decodedToken.username;
    if (service && username && username == service.user) {
      // the user owns this service
      const result = await service_data.add_member(req, service.title);

      if (result.success) {
        // if the user was added successfully then remove the applicant with the same username
        await applicant_data.remove_applicant(service.title, req.body.username);
        //TODO: email the new member that they have been added to the service
        res.json({ success: true });
      } else {
        console.log(result.error);
        res.json({ success: false, error: "internal server error" });
      }
    } else {
      console.log("unauthorized request");
      res.json({ success: false, error: "unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, error: "internal server error" });
  }
});

// add a new member to the service
router.post("/add-member", async (req, res) => {
  try {
    const service_name = req.query.service;
    const service = await service_data.get_one_service(service_name);

    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const username = decodedToken.username;
    if (service && username && username == service.user) {
      // the user owns this service
      const result = await service_data.add_member(req, service.title);

      if (result.success) {
        // if the user was added successfully then remove the applicant with the same username
        await applicant_data.remove_applicant(service.title, req.body.username);
        res.json({ success: true });
      } else {
        console.log(result.error);
        res.json({ success: false, error: "internal server error" });
      }
    } else {
      console.log("unauthorized request");
      res.json({ success: false, error: "unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, error: "internal server error" });
  }
});

// add an editor to the service
router.post("/assign-member-permissions", async (req, res) => {
  try {
      // make sure the user is authorized to change permissions (only the service owner can do this)
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, JWT_SECRET);
      const username = decodedToken.username;
      const service_name = req.query.service;
      const service = await service_data.get_one_service(service_name);
      console.log(req.body);
      if (service && username && username == service.user) { // the user owns this service
        console.log(req.body)
          var result = {success: false, error: 'internal server error'};
          // FIXME: do this in a better way (result gets overwritten each time leading to possible errors)
          if (req.body.isEditor) {
              result = await service_data.add_editor(req, service);
          }
          else{
              result = await service_data.remove_editor(req, service);
          }
          if (req.body.isManager) {
              result = await service_data.add_application_manager(req, service);
          }
          else {
              result = await service_data.remove_application_manager(req, service);
          }
          if (req.body.isUpdateSender) {
              result = await service_data.add_update_sender(req, service);
          }
          else {
              result = await service_data.remove_update_sender(req, service);
          }
          if (result.success) {
              res.json({ success: true });
          }
          else {
              console.log(result.error);
              res.json({ success: false, error: 'internal server error' });
          }
      }
      else {
          console.log('unauthorized request')
          res.json({ success: false, error: 'unauthorized' });
      }
  }
  catch (error) {
      console.log(error);
      res.json({ success: false, error: 'internal server error' });
  }
});

// get the member's permissions
router.post('/get-member-permissions', async (req, res) => {
  try{
    // make sure the user is authorized to view permissions
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const username = decodedToken.username;

    const service_name = req.query.service;
    const service = await service_data.get_one_service(service_name);
    if (!(service.user == username)) { // the user does not own this service
        console.log('unauthorized request')
        res.json({ success: false, error: 'unauthorized' });
        return;
    }
    // get the member's id and check if they have certain permissions
    const member_id = req.body.user_id;

    const isEditor = (service.Editors && service.Editors.includes(member_id));
    const isManager = (service.ApplicationManagers && service.ApplicationManagers.includes(member_id));
    const isUpdateSender = (service.UpdateSenders && service.UpdateSenders.includes(member_id));
    res.json({isEditor, isManager, isUpdateSender});
  }
  catch (error) {
      console.log(error);
      res.json({ success: false, error: 'internal server error' });
  }
});



router.get("/get-service-members/:serviceTitle", async function (req, res) {
  try {
    users = await service_data.get_service_users(req.params.serviceTitle);
    console.log(users);
    if (users) {
      console.log(`Members for: ${req.params.serviceTitle} sent`);
      res.json(users);
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, error: "Failed to fetch service members" });
  }
});

module.exports = router;
