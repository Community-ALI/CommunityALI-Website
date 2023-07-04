// database
const models = require("../connect-to-database");
const Services = models.Services;

exports.get_clubs_and_communites = async function (sortingType) {
    try {
        var sort;
        switch (sortingType) {
            case 'reverse_alphabetical':
                sort = -1;
                break;
            default:
                sort = 1;
        }
        services = await Services.find({ serviceType: "Club" })
            .sort({ title: sort });
        return services;
    } catch (err) {
        console.log(err);
        return { success: false, error: 'internal database error' };
    }
}