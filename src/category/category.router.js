const router = require("express").Router();

const categorieServices = require("./category.services");

router.route("/").get(categorieServices.getAllCategorie);
router.route("/new").post(categorieServices.postNewCategorie);
router.route("/:id").get(categorieServices.getCategorieById);
router.route("/update/:id").patch(categorieServices.patchCategorie);
router.route("/delete/:id").delete(categorieServices.deleteCategorie);

module.exports = router;
