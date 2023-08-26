const Series = require("../models/series")
const ApiError = require("../api-error");


class SeriesService{
    async createSeries(newSeriesInfor){
        const existedSeries = await Series.findOne({name: newSeriesInfor.name});

        if(existedSeries){
            throw new ApiError(400, 'Đã tồn tại series này');
        }

        newSeriesInfor.followerCount = 0;

        const newSeries = new Series(newSeriesInfor);

        await newSeries.save();

        return newSeries;
    }
}

module.exports = SeriesService;