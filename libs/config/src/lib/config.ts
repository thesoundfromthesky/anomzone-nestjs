export const config = {
  entities: {
    post: {
      author: {
        minlength: 2,
        maxlength: 16,
        required: true,
        immutable: true,
      },
      password: {
        minlength: 8,
        maxlength: 16,
        required: true,
      },
      title: { minlength: 2, maxlength: 60, required: true },
      content: {
        minlength: 2,
        maxlength: 1024,
        required: true,
      },
    },
    comment: {
      author: {
        minlength: 2,
        maxlength: 16,
        required: true,
        immutable: true,
      },
      password: {
        minlength: 8,
        maxlength: 16,
        required: true,
      },
      content: {
        minlength: 2,
        maxlength: 200,
        required: true,
      },
    },
    reply: {
      author: {
        minlength: 2,
        maxlength: 16,
        required: true,
        immutable: true,
      },
      password: {
        minlength: 8,
        maxlength: 16,
        required: true,
      },
      content: {
        minlength: 2,
        maxlength: 200,
        required: true,
      },
    },
    websocket: {
      message: {
        minlength: 0,
        maxlength: 100,
      },
    },
  },
  query: {
    limit: 20,
  },
  categories: {
    planets: { mercury: 'mercury', venus: 'venus', earth: 'earth' },
    foods: {
      melon: 'melon',
      banana: 'banana',
      tomato: 'tomato',
      apple: 'apple',
    },
    sports: { kickball: 'kickball', boxing: 'boxing', marathon: 'marathon' },
    countries: { lebanon: 'lebanon', angola: 'angola' },
    names: { shirlee: 'shirlee', jackie: 'jackie' },
  },
};

export type Config = typeof config;
export type Categories = typeof config.categories;
export type KeyCategory = keyof Categories;

export type Entities = typeof config.entities;
export type Entity<T extends KeyEntity> = typeof config.entities[T];
export type KeyEntity = keyof Entities;
export type KeyColumn<T extends KeyEntity> = keyof Entity<T>;

export type EntityColumns = Record<
  'author' | 'password' | 'title' | 'content' | 'message',
  EntityValidators
>;
export type KeyEntityColumns = keyof EntityColumns;
export type EntityValidators = {
  minlength: number;
  maxlength: number;
  required: boolean;
  immutable: boolean;
};