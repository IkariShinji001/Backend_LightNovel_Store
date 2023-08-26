const SeriesService = require('../services/series.service');
const ApiError = require('../api-error');

const seriesController = {
  async createNewSeries(req, res, next) {
    const newSeriesInfor = req.body;
    const seriesService = new SeriesService();
    try {
        const newSeries = await seriesService.createSeries(newSeriesInfor);
        return res.status(200).json(newSeries);
    } catch (error) {
      if (error instanceof ApiError) {
        return next(new ApiError(error.statusCode, error.message));
      }
      next(error);
    }
  },
};

module.exports = seriesController;