import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import type { HabitLean } from '../models/habit';
import type { HabitLogLean } from '../models/habit-log';
import type { UserLean } from '../models/user';
import type { GraphQLContext } from '../types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: string; output: string; }
  ObjectId: { input: string; output: string; }
};

export type CreateHabit = {
  description?: InputMaybe<Scalars['String']['input']>;
  regularity?: InputMaybe<Regularity>;
  title: Scalars['String']['input'];
  userId: Scalars['ObjectId']['input'];
};

export type CreateUser = {
  email: Scalars['String']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
};

export type Habit = {
  __typename?: 'Habit';
  createdAt: Scalars['Date']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ObjectId']['output'];
  logs: Array<HabitLog>;
  regularity?: Maybe<Regularity>;
  title: Scalars['String']['output'];
  userId: Scalars['ObjectId']['output'];
};

export type HabitLog = {
  __typename?: 'HabitLog';
  createdAt: Scalars['Date']['output'];
  habitId: Scalars['ObjectId']['output'];
  id: Scalars['ObjectId']['output'];
  status?: Maybe<Status>;
};

export type HabitLogAlreadyExists = {
  __typename?: 'HabitLogAlreadyExists';
  logId?: Maybe<Scalars['ObjectId']['output']>;
  message: Scalars['String']['output'];
};

export type LogHabitUnion = HabitLog | HabitLogAlreadyExists | NotFoundError;

export type Mutation = {
  __typename?: 'Mutation';
  createHabit: Habit;
  createUser: User;
  deleteUser: UserUnion;
  logHabit: LogHabitUnion;
  updateUser: UserUnion;
};


export type MutationCreateHabitArgs = {
  input: CreateHabit;
};


export type MutationCreateUserArgs = {
  input: CreateUser;
};


export type MutationDeleteUserArgs = {
  id: Scalars['ObjectId']['input'];
};


export type MutationLogHabitArgs = {
  habitId: Scalars['ObjectId']['input'];
  status?: InputMaybe<Status>;
  userId: Scalars['ObjectId']['input'];
};


export type MutationUpdateUserArgs = {
  firstName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ObjectId']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type NotFoundError = {
  __typename?: 'NotFoundError';
  id: Scalars['ObjectId']['output'];
  message: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  habit?: Maybe<Habit>;
  habits: Array<Maybe<Habit>>;
  habitsByUser: Array<Habit>;
  health: Scalars['String']['output'];
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryHabitArgs = {
  id: Scalars['ObjectId']['input'];
};


export type QueryHabitsByUserArgs = {
  userId: Scalars['ObjectId']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ObjectId']['input'];
};

export enum Regularity {
  Daily = 'DAILY',
  Monthly = 'MONTHLY',
  Weekly = 'WEEKLY'
}

export enum Status {
  Completed = 'COMPLETED',
  Failed = 'FAILED'
}

export type User = {
  __typename?: 'User';
  createdAt: Scalars['Date']['output'];
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  habits: Array<Habit>;
  id: Scalars['ObjectId']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  username: Scalars['String']['output'];
};

export type UserNotFoundError = {
  __typename?: 'UserNotFoundError';
  message: Scalars['String']['output'];
  userId: Scalars['ObjectId']['output'];
};

export type UserUnion = NotFoundError | User;



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes<_RefType extends Record<string, unknown>> = {
  LogHabitUnion: ( HabitLogLean ) | ( HabitLogAlreadyExists ) | ( NotFoundError );
  UserUnion: ( NotFoundError ) | ( UserLean );
};


/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateHabit: CreateHabit;
  CreateUser: CreateUser;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  Habit: ResolverTypeWrapper<HabitLean>;
  HabitLog: ResolverTypeWrapper<HabitLogLean>;
  HabitLogAlreadyExists: ResolverTypeWrapper<HabitLogAlreadyExists>;
  LogHabitUnion: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['LogHabitUnion']>;
  Mutation: ResolverTypeWrapper<{}>;
  NotFoundError: ResolverTypeWrapper<NotFoundError>;
  ObjectId: ResolverTypeWrapper<Scalars['ObjectId']['output']>;
  Query: ResolverTypeWrapper<{}>;
  Regularity: Regularity;
  Status: Status;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<UserLean>;
  UserNotFoundError: ResolverTypeWrapper<UserNotFoundError>;
  UserUnion: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['UserUnion']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  CreateHabit: CreateHabit;
  CreateUser: CreateUser;
  Date: Scalars['Date']['output'];
  Habit: HabitLean;
  HabitLog: HabitLogLean;
  HabitLogAlreadyExists: HabitLogAlreadyExists;
  LogHabitUnion: ResolversUnionTypes<ResolversParentTypes>['LogHabitUnion'];
  Mutation: {};
  NotFoundError: NotFoundError;
  ObjectId: Scalars['ObjectId']['output'];
  Query: {};
  String: Scalars['String']['output'];
  User: UserLean;
  UserNotFoundError: UserNotFoundError;
  UserUnion: ResolversUnionTypes<ResolversParentTypes>['UserUnion'];
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type HabitResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Habit'] = ResolversParentTypes['Habit']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  logs?: Resolver<Array<ResolversTypes['HabitLog']>, ParentType, ContextType>;
  regularity?: Resolver<Maybe<ResolversTypes['Regularity']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HabitLogResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['HabitLog'] = ResolversParentTypes['HabitLog']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  habitId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HabitLogAlreadyExistsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['HabitLogAlreadyExists'] = ResolversParentTypes['HabitLogAlreadyExists']> = {
  logId?: Resolver<Maybe<ResolversTypes['ObjectId']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LogHabitUnionResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['LogHabitUnion'] = ResolversParentTypes['LogHabitUnion']> = {
  __resolveType: TypeResolveFn<'HabitLog' | 'HabitLogAlreadyExists' | 'NotFoundError', ParentType, ContextType>;
};

export type MutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createHabit?: Resolver<ResolversTypes['Habit'], ParentType, ContextType, RequireFields<MutationCreateHabitArgs, 'input'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  deleteUser?: Resolver<ResolversTypes['UserUnion'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>;
  logHabit?: Resolver<ResolversTypes['LogHabitUnion'], ParentType, ContextType, RequireFields<MutationLogHabitArgs, 'habitId' | 'userId'>>;
  updateUser?: Resolver<ResolversTypes['UserUnion'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'id'>>;
};

export type NotFoundErrorResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['NotFoundError'] = ResolversParentTypes['NotFoundError']> = {
  id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface ObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjectId'], any> {
  name: 'ObjectId';
}

export type QueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  habit?: Resolver<Maybe<ResolversTypes['Habit']>, ParentType, ContextType, RequireFields<QueryHabitArgs, 'id'>>;
  habits?: Resolver<Array<Maybe<ResolversTypes['Habit']>>, ParentType, ContextType>;
  habitsByUser?: Resolver<Array<ResolversTypes['Habit']>, ParentType, ContextType, RequireFields<QueryHabitsByUserArgs, 'userId'>>;
  health?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
};

export type UserResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  habits?: Resolver<Array<ResolversTypes['Habit']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserNotFoundErrorResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['UserNotFoundError'] = ResolversParentTypes['UserNotFoundError']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserUnionResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['UserUnion'] = ResolversParentTypes['UserUnion']> = {
  __resolveType: TypeResolveFn<'NotFoundError' | 'User', ParentType, ContextType>;
};

export type Resolvers<ContextType = GraphQLContext> = {
  Date?: GraphQLScalarType;
  Habit?: HabitResolvers<ContextType>;
  HabitLog?: HabitLogResolvers<ContextType>;
  HabitLogAlreadyExists?: HabitLogAlreadyExistsResolvers<ContextType>;
  LogHabitUnion?: LogHabitUnionResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  NotFoundError?: NotFoundErrorResolvers<ContextType>;
  ObjectId?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserNotFoundError?: UserNotFoundErrorResolvers<ContextType>;
  UserUnion?: UserUnionResolvers<ContextType>;
};

