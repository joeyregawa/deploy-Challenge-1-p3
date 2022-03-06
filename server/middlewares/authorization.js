const { Product } = require("../models/index");
const { Category } = require("../models/index");

const authorization = async (req, res, next) => {
  try {
    const authorId = req.loginUser.id;
    const { id } = req.params;
    // console.log(id, "ini di authorization");

    const data = await Product.findOne({
      where: { id },
    });
    // console.log(data, " ini data <><><><><><><><><><><><>");

    if (!data) {
      throw {
        code: 404,
        name: "notFound",
        message: "Data not found",
      };
    }

    if (data.authorId !== authorId) {
      throw {
        name: "ReferenceError",
      };
    }
    next();
  } catch (err) {
    next(err);
  }
};
module.exports = {
  authorization,
}
