import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question';
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug';

export function makeQuestion(
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityID
): Question {
  const question = Question.create(
    {
      authorId: new UniqueEntityID(),
      title: 'Title of the question',
      slug: Slug.create('title-of-the-question'),
      content: 'Content of the question',
      ...override,
    },
    id
  );

  return question;
}
