
const { getprofile } = require("../services/profile.service");


const getSingleProfile = async (req, res) => {
    const { username } = req.params;
    const response = await getprofile(username);
    if (response) {
    }



}


// module.exports.deleteProfile = async (req, res) => {
//     try {
//         const profile = deleteprofile(req.params.id);
//         res.status(200).send("deleted successfully");
//     } catch (error) {
//         console.log(error);
//     }
// }

// module.exports.updateProfile = async (req, res) => {
//     const { email, password } = user.body;
//     try {
//         await updateprofile(req.params.id, email, password);
//         res.status(200).send("profile updated successfully");
//     } catch (error) {
//         console.log(error);
//     }
// }



module.exports = {
    getSingleProfile
};
