const controller = {};
const models = require("../models");

controller.show = async (req, res) => {
  res.locals.users = await models.User.findAll({
    attributes: [
      "id",
      "imagePath",
      "username",
      "firstName",
      "lastName",
      "mobile",
      "isAdmin",
    ],
    order: [["createdAt", "DESC"]],
  });
  res.render("user-management");
};

controller.addUser = async (req, res) => {
  // res.json(req.body);
  const { firstName, lastName, username, mobile, isAdmin } = req.body;
  try {
    await models.User.create({
      firstName,
      lastName,
      username,
      mobile,
      isAdmin: isAdmin ? true : false,
    });
    res.redirect("/users");
  } catch(error) {
    res.send("Cannot add user");
    console.error(error);
  }
}

controller.editUser = async(req, res) => {
  let { id, firstName, lastName, username, mobile, isAdmin } = req.body;
  try {
    await models.User.update({
      firstName,
      lastName,
      username,
      mobile,
      isAdmin: isAdmin ? true : false,
    }, {
      where: {
        id,
      },
    });
    res.send("User edited");
  } catch(error) {
    res.send("Cannot edit user");
    console.error(error);
  }
};

controller.deleteUser = async(req, res) => {
  let id = isNaN(req.params.id) ? 0 : parseInt(req.params.id);
  try {
    await models.User.destroy({
      where: {
        id,
      },
    });
    res.send("User deleted");
  } catch(error) {
    res.send("Cannot delete user");
    console.error(error);
  }
}

module.exports = controller; 
