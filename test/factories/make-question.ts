import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question';
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug';

export function makeQuestion(override: Partial<QuestionProps> = {}): Question {
  const question = Question.create({
    title: 'Title of the question',
    slug: Slug.create('title-of-the-question'),
    authorId: new UniqueEntityID('author-id'),
    content: 'Content of the question',
    ...override,
  });

  return question;
}
