const Series = require('../models/series');
const ApiError = require('../api-error');

class SeriesService {
  async getAllSeries() {
    const series = await Series.find({});
    return series;
  }

  async getSeriesByName(name) {
    name = new RegExp(name, 'i');
    const series = await Series.find({name: {$regex: name}})
    return series;
  }

  async createSeries(newSeriesInfor) {
    const existedSeries = await Series.findOne({ name: newSeriesInfor.name });

    if (existedSeries) {
      throw new ApiError(400, 'Đã tồn tại series này');
    }
    newSeriesInfor.followerCount = 0;

    const newSeries = new Series(newSeriesInfor);

    await newSeries.save();

    return newSeries;
  }

  async addBookToSeries(bookId, seriesId) {
    await Series.findByIdAndUpdate(seriesId, { $push: { book: bookId } });
  }
}

module.exports = SeriesService;
