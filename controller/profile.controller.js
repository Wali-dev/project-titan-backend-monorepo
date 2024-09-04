const createProfile = require("../services/profile.service");


module.exports.create = (req, res) => {
    const { email, password } = req.body;
    const response = createProfile(email, password);
    res.status(201).send(response);
}


module.exports.seeprofile = async (req, res) => {
    try {
        const profile = getprofile(req.params.id);
        res.status(200).send(profile);
    } catch (error) {
        console.log(error);
    }
}
module.exports.deleteProfile = async (req, res) => {
    try {
        const profile = deleteprofile(req.params.id);
        res.status(200).send("deleted successfully");
    } catch (error) {
        console.log(error);
    }
}

module.exports.updateProfile = async (req, res) => {
    const { email, password } = user.body;
    try {
        await updateprofile(req.params.id, email, password);
        res.status(200).send("profile updated successfully");
    } catch (error) {
        console.log(error);
    }
}