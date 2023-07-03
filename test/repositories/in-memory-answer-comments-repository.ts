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
