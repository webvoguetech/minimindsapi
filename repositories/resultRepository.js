import Result from '../models/Result.js';

class ResultRepository {
  async getAllResults() {
    return Result.find();
  }

  async getResultById(resultId) {
    return Result.findById(resultId);
  }

  async createResult(resultData) {
    const result = new Result(resultData);
    return result.save();
  }

  async updateResult(resultId, updatedResultData) {
    return Result.findByIdAndUpdate(resultId, updatedResultData, { new: true });
  }

  async deleteResult(resultId) {
    return Result.findByIdAndDelete(resultId);
  }
}

export default new ResultRepository();
