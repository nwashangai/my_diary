import DiaryModel from '../models/DiaryModel';

// search through an object
const search = (nameKey, obj) => {
  for (let i = 0; i < obj.length; i += 1) {
    if (obj[i].entryID === nameKey) {
      return obj[i];
    }
  }
  return false;
}

// update data
const update = (nameKey, obj, ent) => {
  for (let i = 0; i < obj.length; i += 1) {
    if (obj[i].entryID === nameKey) {
      DiaryModel.data[i].subject = ent.subject;
      DiaryModel.data[i].diary = ent.subject;
      DiaryModel.data[i].date = ent.subject;
      return true
    }
  }
  return false;
}

exports.getDiary = (request, response) => {
  if (request.params.id) {
    const data = search(request.params.id, DiaryModel.data)
    if (data) {
      response.status(200).json({ status: 'success', entry: data });
    } else {
      response.status(200).json({ status: 'error', message: 'No entry found' });
    }
  } else {
    response.status(200).json({ status: 'success', entries: DiaryModel.data });
  }
}

exports.setDiary = (request, response) => {
  if (!request.body.subject || !request.body.diary || request.body.subject.trim() === '' || request.body.diary.trim() === '') {
    response.json({ status: 'error', message: 'sorry please provide all fields' });
  } else {
    const userID = DiaryModel.data.length + 1;
    const entry = request.body;
    entry.entryID = userID;
    entry.date = new Date();
    DiaryModel.data.push(entry);
    response.json({ status: 'success', entry: search(userID, DiaryModel.data) });
  }
}

exports.updateDiary = (request, response) => {
  const userID = request.params.id;
  if (search(userID, DiaryModel.data) !== undefined) {
    if (!request.body.subject || !request.body.diary || request.body.subject.trim() === '' || request.body.diary.trim() === '') {
      response.json({ status: 'error', message: 'provide all fields' });
    } else {
      const entry = request.body;
      entry.date = new Date();
      const done = update(userID, DiaryModel.data, entry);
      if (done) {
        response.json({ status: 'success', entry: DiaryModel.data[userID] });
      } else {
        response.json({ status: 'error', message: 'no data was saved' });
      }
    }
  } else {
    response.json({ status: 'error', message: 'problem in saving data' });
  }
}
