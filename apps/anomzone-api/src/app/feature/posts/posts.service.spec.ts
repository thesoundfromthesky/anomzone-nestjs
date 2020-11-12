// /* eslint-disable @typescript-eslint/no-empty-function */
// import { Test, TestingModule } from '@nestjs/testing';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';

// import { PostsService } from './posts.service';

// // import { CreatePostDto } from './create-post.dto';
// import { Post } from '@typeorm/index';

// class PostsRepositoryFake {
//   public create(): void {}
//   public async save(): Promise<void> {}
//   public async remove(): Promise<void> {}
//   public async findOne(): Promise<void> {}
// }

// describe('PostsService', () => {
//   let postsService: PostsService;
//   // let postsRepository: Repository<Post>;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         PostsService,
//         {
//           provide: getRepositoryToken(Post),
//           useClass: PostsRepositoryFake,
//         },
//       ],
//     }).compile();

//     postsService = module.get<PostsService>(PostsService);
//     // postsRepository = module.get(getRepositoryToken(Post));
//   });

//   it('should be defined', () => {
//     expect(postsService).toBeDefined();
//   });

//   it('should create', async () => {
//     // const post: Post = {
//     //   id: 1,
//     //   createdAt: new Date(),
//     //   updatedAt: new Date(),
//     //   title: 'hello',
//     //   content: 'content',
//     //   ip:"0.0.0.0"
//     // };

//     // const repositoryCreateSpy = jest
//     //   .spyOn(postsRepository, 'create')
//     //   .mockReturnValue(post);

//     // const repositorySaveSpy = jest
//     //   .spyOn(postsRepository, 'save')
//     //   .mockResolvedValue(post);

//     // const result = await postsService.create(post);

//     // expect(repositoryCreateSpy).toBeCalledWith(post);
//     // expect(repositorySaveSpy).toBeCalledWith(post);
//     // expect(result).toEqual(post);
//   });
// });
