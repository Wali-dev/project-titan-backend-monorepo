const profileModel = require("../models/profile.model");


module.exports.getprofile = async (username) => {

    console.log(username)
    // try {
    //     const profile = await profileModel.findById(id);
    //     if (!profile) return res.status(404).send("no such user found");
    // } catch (error) {
    //     console.log(error);
    // }
}

module.exports.deleteprofile = async (id) => {
    try {
        const profile = await profileModel.findById(id);
        if (!profile) return res.status(404).send("no such user found");
        profileModel.findByIdAndDelete(id);
        res.status(200).send("deleted successfully");
    } catch (error) {
        console.log(error);
    }
}

module.exports.updateprofile = async (id, email, password) => {
    try {
        await profileModel.findByIdAndUpdate(req.params.id, {
            ...req.body
        })
        res.status(200).send("profile updated successfully");
    } catch (error) {
        console.log(error);
    }
}