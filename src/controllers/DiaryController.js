import DiaryModel from '../models/DiaryModel';
exports.getDiary = (request, response) => {
  if (request.params.id) {
    response.status(200).json(DiaryModel.data[request.params.id]);
  } else {
    response.status(200).json(DiaryModel.data);
  }
}
