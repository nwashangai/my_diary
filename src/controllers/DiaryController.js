import DiaryModel from '../models/DiaryModel';
exports.getDiary = (request, response) => {
  response.status(200).json(DiaryModel.data);
}
