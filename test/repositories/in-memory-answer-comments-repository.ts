import { PaginationParams } from '@/core/repositories/pagination.params';
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository';
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment';

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public items: AnswerComment[] = [];

  async findById(id: string) {
    const answerComment = this.items.find((item) => item.id.toString() === id);

    if (!answerComment) {
      return null;
    }

    return answerComment;
  }

  async findManyByAnswerId(questionId: string, { page }: PaginationParams) {
    const answerComment = this.items
      .filter((item) => item.answerId.toString() === questionId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20);

    return answerComment;
  }

  async create(answerComments: AnswerComment) {
    this.items.push(answerComments);
  }

  async delete(answerComments: AnswerComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === answerComments.id
    );

    this.items.splice(itemIndex, 1);
  }
}
