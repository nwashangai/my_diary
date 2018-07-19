import DiaryModel from '../models/DiaryModel';
exports.getDiary = (request, response) => {
  if (request.params.id) {
    response.status(200).json(DiaryModel.data[request.params.id] || { warning: 'No entry found' });
  } else {
    response.status(200).json(DiaryModel.data);
  }
}

exports.setDiary = (request, response) => {
  if (!request.body.subject || !request.body.diary || request.body.subject.trim() === '' || request.body.diary.trim() === '') {
    response.json({ message: 'sorry please provide all fields' });
  } else {
    const userID = Object.keys(DiaryModel).length + 1;
    const entry = request.body;
    entry.date = new Date();
    DiaryModel.data.userID = entry;
    response.json({ res: DiaryModel.data });
  }
}