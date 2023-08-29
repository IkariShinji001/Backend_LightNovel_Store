const SeriesService = require('../services/series.service');
const ApiError = require('../api-error');

class SeriesController {
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
  }

  async getSeries(req, res, next) {
    const { name } = req.query || null;
    const seriesService = new SeriesService();
    try {
      if (name) {
        const series = await seriesService.getSeriesByName(name);
        return res.status(200).json(series);
      }
      const series = await seriesService.getAllSeries();
      return res.status(200).json(series);
    } catch (error) {
      if (error instanceof ApiError) {
        return next(new ApiError(error.statusCode, error.message));
      }
      next(error);
    }
  }

  async addBookToSeries(req, res, next) {
    const { bookId } = req.body;
    const seriesId = req.params.id;
    const seriesService = new SeriesService();
    try {
      await seriesService.addBookToSeries(bookId, seriesId);
      return res
        .status(200)
        .json({ message: 'Thêm sách vào series thành công' });
    } catch (error) {
      if (error instanceof ApiError) {
        return next(new ApiError(error.statusCode, error.message));
      }
      next(error);
    }
  }
}

module.exports = SeriesController;
